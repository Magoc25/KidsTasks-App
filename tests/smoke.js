#!/usr/bin/env node
/**
 * Smoke-test do KidsTasks — padrão §35 do Guia de projetos (MGC Dev).
 *
 * Dois jsdom ("PC" e "celular") rodando o KidsTasks.html REAL contra UM Supabase falso
 * compartilhado (objeto Node, fora do jsdom). É o único arranjo que reproduz bug de
 * multi-device: com uma janela só, a config de dois aparelhos nunca entra em conflito.
 *
 * Uso:
 *   node tests/smoke.js                  # testa o KidsTasks.html do repo
 *   node tests/smoke.js caminho/old.html # baseline (ex.: git show HEAD:KidsTasks.html > old.html)
 *
 * Dependência: jsdom. O repo não tem package.json de propósito (r33 — node_modules em pasta de
 * nuvem trava o sync do OneDrive); o CI instala com `npm i --no-save --no-package-lock jsdom`.
 * SEM jsdom instalado, roda só o degrau estático (que não precisa de dependência nenhuma) — mas
 * no CI a ausência é falha: teste que "passa" por não ter rodado é pior que teste vermelho.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
let JSDOM = null;
try { ({ JSDOM } = require('jsdom')); } catch (e) { JSDOM = null; }

const ROOT = path.resolve(__dirname, '..');
const HTML_PATH = process.argv[2] || process.env.KT_HTML || path.join(ROOT, 'KidsTasks.html');
const HTML = fs.readFileSync(HTML_PATH, 'utf8');
const PAGE_URL = 'https://magoc25.github.io/KidsTasks-App/KidsTasks.html';
const SB_URL = 'https://fake-pessoal.supabase.co';
const SB_KEY = 'anon-de-teste';

// ───────────────────────── Supabase falso (compartilhado pelos 2 devices) ─────────────────────
// Query-builder encadeável e THENABLE: o app faz `await client.from(x).select().eq(...)`, então
// cada método devolve o próprio builder e o `then` resolve {data,error} — sem isso o await trava.
function createDb(seed) {
  const tables = Object.assign(
    { families: [], children: [], tasks: [], task_instances: [], goals: [], weekly_payments: [], app_config: [], app_pings: [], app_reviews: [] },
    seed || {}
  );
  let seq = 1;
  const newId = () => 'gen-' + seq++;

  function from(name) {
    if (!tables[name]) tables[name] = [];
    const q = { op: 'select', filters: [], inFilter: null, order: null, limit: null, payload: null, single: null, conflict: null };
    const rows = () => tables[name];
    const match = (r) =>
      q.filters.every(([c, v]) => r[c] === v) &&
      (!q.inFilter || q.inFilter[1].includes(r[q.inFilter[0]]));

    function run() {
      if (q.op === 'insert' || q.op === 'upsert') {
        const list = Array.isArray(q.payload) ? q.payload : [q.payload];
        const out = list.map((raw) => {
          const row = Object.assign({}, raw);
          let hit = null;
          if (q.op === 'upsert') {
            const keys = q.conflict ? q.conflict.split(',').map((s) => s.trim()) : ['id'];
            hit = rows().find((r) => keys.every((k) => r[k] === row[k]));
          }
          if (hit) { Object.assign(hit, row); return hit; }
          if (!row.id) row.id = newId();
          if (!row.created_at) row.created_at = new Date().toISOString();
          rows().push(row);
          return row;
        });
        return { data: q.single ? out[0] || null : out, error: null };
      }
      if (q.op === 'update') {
        const hits = rows().filter(match);
        hits.forEach((r) => Object.assign(r, q.payload));
        return { data: q.single ? hits[0] || null : hits, error: null };
      }
      if (q.op === 'delete') {
        const keep = rows().filter((r) => !match(r));
        const gone = rows().filter(match);
        tables[name] = keep;
        return { data: gone, error: null };
      }
      let out = rows().filter(match);
      if (q.order) {
        const [col, asc] = q.order;
        out = out.slice().sort((a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0) * (asc ? 1 : -1));
      }
      if (q.limit != null) out = out.slice(0, q.limit);
      if (q.single === 'one') {
        if (out.length !== 1) return { data: null, error: { message: 'JSON object requested, multiple (or no) rows returned' } };
        return { data: out[0], error: null };
      }
      if (q.single === 'maybe') return { data: out[0] || null, error: null };
      return { data: out, error: null };
    }

    const api = {
      select() { if (q.op === 'select') q.op = 'select'; return api; },
      insert(p) { q.op = 'insert'; q.payload = p; return api; },
      update(p) { q.op = 'update'; q.payload = p; return api; },
      upsert(p, o) { q.op = 'upsert'; q.payload = p; q.conflict = o && o.onConflict; return api; },
      delete() { q.op = 'delete'; return api; },
      eq(c, v) { q.filters.push([c, v]); return api; },
      in(c, v) { q.inFilter = [c, v]; return api; },
      order(c, o) { q.order = [c, !o || o.ascending !== false]; return api; },
      limit(n) { q.limit = n; return api; },
      maybeSingle() { q.single = 'maybe'; return api; },
      single() { q.single = 'one'; return api; },
      then(res, rej) {
        let out;
        try { out = run(); } catch (e) { out = { data: null, error: { message: String((e && e.message) || e) } }; }
        return Promise.resolve(out).then(res, rej);
      },
    };
    return api;
  }
  return { tables, from };
}

// Um banco por URL: o cliente da camada MGC (reviews/pings) cai num banco vazio e não polui o teste.
const shared = createDb({ families: [{ id: 'fam1', name: 'Família Teste', created_at: '2026-01-01' }] });
const byUrl = new Map([[SB_URL, shared]]);
function createClient(url) {
  let db = byUrl.get(url);
  if (!db) { db = createDb(); byUrl.set(url, db); }
  const chan = { on() { return chan; }, subscribe() { return chan; }, unsubscribe() { return chan; } };
  return { from: (t) => db.from(t), channel: () => chan, removeChannel() {} };
}
const cloudSettings = () => (shared.tables.families[0] || {}).settings || null;

// ───────────────────────────────────── boot de um device ──────────────────────────────────────
function stubWindow(w, initialState) {
  w.structuredClone = w.structuredClone || ((o) => JSON.parse(JSON.stringify(o)));
  w.supabase = { createClient };
  w.confetti = () => {};
  w.fetch = async () => ({ ok: true, status: 200, json: async () => ({}), text: async () => '' });
  const noop = () => {};
  w.AudioContext = w.webkitAudioContext = function () {
    return {
      currentTime: 0, destination: {}, close: noop,
      createOscillator: () => ({ connect: noop, start: noop, stop: noop, type: 'sine', frequency: { value: 0, setValueAtTime: noop } }),
      createGain: () => ({ connect: noop, gain: { value: 0, setValueAtTime: noop, exponentialRampToValueAtTime: noop, linearRampToValueAtTime: noop } }),
    };
  };
  w.HTMLCanvasElement.prototype.getContext = () => ({
    fillRect: noop, clearRect: noop, drawImage: noop, beginPath: noop, arc: noop, fill: noop,
    stroke: noop, save: noop, restore: noop, translate: noop, scale: noop, closePath: noop,
    getImageData: () => ({ data: [] }), putImageData: noop, createLinearGradient: () => ({ addColorStop: noop }),
  });
  w.HTMLCanvasElement.prototype.toDataURL = () => 'data:image/png;base64,';
  Object.defineProperty(w.navigator, 'serviceWorker', {
    configurable: true,
    value: { register: async () => ({ addEventListener: noop }), addEventListener: noop, ready: Promise.resolve({}), controller: null },
  });
  w.localStorage.setItem('ktm_supabase_url', SB_URL);
  w.localStorage.setItem('ktm_supabase_anon', SB_KEY);
  if (initialState) w.localStorage.setItem('ktmv0state', JSON.stringify(initialState));
}

// r57(a): DOMContentLoaded/load disparam DEPOIS do construtor do JSDOM — assertar logo após o
// `new JSDOM(...)` lê estado pré-boot e falha "do nada". Esperar o evento; o timeout também é sinal.
function onLoad(w, ms = 15000) {
  return new Promise((resolve, reject) => {
    if (w.document.readyState === 'complete') return resolve();
    const t = setTimeout(() => reject(new Error('boot travado: evento load não disparou em ' + ms + 'ms')), ms);
    w.addEventListener('load', () => { clearTimeout(t); resolve(); });
  });
}
const settle = (ms = 1200) => new Promise((r) => setTimeout(r, ms));

async function bootDevice(initialState) {
  const dom = new JSDOM(HTML, {
    url: PAGE_URL,
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    beforeParse: (w) => stubWindow(w, initialState),
  });
  await onLoad(dom.window);
  await settle(1500); // r38(b): cobre o debounce de 800ms do push de settings
  return dom;
}
// `const` de <script> clássico não vira propriedade do window: o eval global alcança.
const ev = (dom, expr) => dom.window.eval(expr);

// ─────────────────────────────────────── mini framework ───────────────────────────────────────
let pass = 0, fail = 0;
const failures = [];
function check(name, cond, extra) {
  if (cond) { pass++; console.log('  ✓ ' + name); }
  else { fail++; failures.push(name); console.log('  ✗ ' + name + (extra ? '\n      ' + extra : '')); }
}
async function suite(name, fn) {
  console.log('\n▸ ' + name);
  try { await fn(); }
  catch (e) { fail++; failures.push(name + ' (exceção)'); console.log('  ✗ exceção: ' + (e && e.stack || e)); }
}

// ─────────────────────────────────────────── testes ───────────────────────────────────────────
(async function main() {
  console.log('Smoke §35 — KidsTasks · ' + path.relative(ROOT, HTML_PATH));

  // ---- Degrau estático: sem dependência nenhuma, roda em qualquer máquina ---------------------
  const scripts = [...HTML.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  await suite('Estático — sintaxe e integridade', async () => {
    let erro = null;
    scripts.forEach((src) => { if (erro) return; try { new vm.Script(src); } catch (e) { erro = e.message; } });
    check(`os ${scripts.length} bloco(s) <script> inline compilam`, !erro, erro || '');

    // Função chamada só de um onclick some do radar de qualquer busca por referência.
    const KEYWORDS = new Set(['if', 'for', 'while', 'switch', 'return', 'typeof', 'catch', 'function']);
    const chamadas = new Set();
    for (const attr of HTML.matchAll(/\son[a-z]+="([^"]*)"/g)) {
      for (const c of attr[1].matchAll(/(^|[^.\w$])([A-Za-z_$][\w$]*)\s*\(/g)) chamadas.add(c[2]);
    }
    const orfas = [...chamadas].filter((n) => !KEYWORDS.has(n) && !new RegExp('function\\s+' + n + '\\s*\\(').test(HTML));
    check(`as ${chamadas.size} funções chamadas por handler inline existem`, orfas.length === 0, 'órfãs: ' + orfas.join(', '));

    // `${...}` = src montado em template string (QR code, avatar) — não é arquivo do repo.
    const locais = [...HTML.matchAll(/(?:src|href)="(?!https?:|data:|#|mailto:)([^"?#]+)"/g)]
      .map((m) => m[1]).filter((f) => !f.includes('${'));
    const sumidos = [...new Set(locais)].filter((f) => !fs.existsSync(path.join(ROOT, f)));
    check(`os ${new Set(locais).size} arquivos locais referenciados existem`, sumidos.length === 0, 'faltando: ' + sumidos.join(', '));
  });

  await suite('Estático — regras de CSS que o guia manda travar', async () => {
    check('r53b: [hidden] blindado com display:none!important',
      /\[hidden\]\s*\{[^}]*display\s*:\s*none\s*!important/.test(HTML),
      'sem isso, uma classe com display de autor derrota o atributo hidden');
    check('r67/§24: input não desce de 16px (iOS dá zoom automático abaixo disso)',
      /\.input\{[^}]*font-size:16px/.test(HTML) && !/@media[^{]*\{[\s\S]{0,4000}?\.input\{[^}]*font-size:1[0-5]px/.test(HTML));
    check('r63: existe a afordância de scroll (CSS + recálculo)',
      /\.table-scroll\.can-scroll::after/.test(HTML) && /function updateTableScrollHints/.test(HTML));
  });

  if (!JSDOM) {
    const dica = 'npm install --no-save --no-package-lock jsdom';
    if (process.env.CI) { console.log('\n✗ jsdom ausente no CI — o smoke completo NÃO rodou (`' + dica + '`)'); process.exit(1); }
    console.log(`\n────────────────────────────────\nDegrau estático: ${pass} ✓ · ${fail} ✗`);
    console.log('(jsdom ausente: as fases com DOM não rodaram — `' + dica + '` para o smoke completo.)');
    process.exit(fail ? 1 : 0);
  }

  // ---- Gate do r66(a): coleção nova no sync TEM de nascer com união por id --------------------
  const pc = await bootDevice({ familyId: 'fam1', familyName: 'Família Teste', childId: 'ana' });
  await suite('Gate r66(a) — toda config em forma de mapa está registrada como coleção', async () => {
    const orphans = ev(pc, `
      (function(){ try{
        return SYNCED_SETTINGS.filter(function(k){
          var d = defaultState[k];
          return d && typeof d==='object' && !Array.isArray(d) && !MAP_SETTINGS.has(k);
        });
      }catch(e){ return ['<sem MAP_SETTINGS: código anterior ao r66a>']; } })()`);
    check('nenhuma config de mapa fora de MAP_SETTINGS', orphans.length === 0,
      'fora da união por id: ' + JSON.stringify(orphans));
  });

  // r67(c): cobertura de sistema transversal se perde por OMISSÃO — a tela nova não se inscreve
  // sozinha. Barato de travar por teste: toda tabela rolável tem de estar dentro da casca.
  await suite('Cobertura — toda tabela rolável está inscrita na afordância de scroll', async () => {
    const total = ev(pc, "document.querySelectorAll('.table-wrap').length");
    const dentro = ev(pc, "document.querySelectorAll('.table-scroll > .table-wrap').length");
    check(`as ${total} tabelas roláveis têm a casca .table-scroll`, total > 0 && total === dentro,
      `${dentro} de ${total} inscritas`);
    check('recalcular a sombra não quebra', ev(pc, "(function(){try{updateTableScrollHints();return true}catch(e){return String(e)}})()") === true);
  });

  // ---- Regressão principal: dois aparelhos configurando crianças diferentes -------------------
  await suite('r66(a) — união por id em childGender (PC e celular, crianças diferentes)', async () => {
    const cel = await bootDevice({ familyId: 'fam1', familyName: 'Família Teste', childId: 'bruno' });

    // O PC configura a Ana. O celular já bootou e ainda não puxou nada — é a janela real do bug.
    ev(pc, "setChildGender('ana','f')");
    await settle(1400);
    check('nuvem tem a Ana depois do push do PC',
      JSON.stringify((cloudSettings() || {}).values && cloudSettings().values.childGender) === '{"ana":"f"}',
      'nuvem: ' + JSON.stringify(cloudSettings() && cloudSettings().values && cloudSettings().values.childGender));

    // O celular configura o Bruno sem nunca ter visto a Ana.
    ev(cel, "setChildGender('bruno','m')");
    await settle(1400);

    const cloud = (cloudSettings() || {}).values || {};
    check('nuvem preserva Ana E Bruno (ausência não apaga)',
      cloud.childGender && cloud.childGender.ana === 'f' && cloud.childGender.bruno === 'm',
      'nuvem: ' + JSON.stringify(cloud.childGender));
    const noCel = JSON.parse(ev(cel, 'JSON.stringify(state.childGender)'));
    check('o próprio celular passa a conhecer a Ana',
      noCel.ana === 'f' && noCel.bruno === 'm',
      'celular: ' + JSON.stringify(noCel));

    // E o PC, ao sincronizar, recebe o Bruno sem perder a Ana.
    await ev(pc, 'syncSettingsWithSupabase()');
    await settle(300);
    const noPc = JSON.parse(ev(pc, 'JSON.stringify(state.childGender)'));
    check('PC recebe o Bruno e mantém a Ana', noPc.ana === 'f' && noPc.bruno === 'm', 'PC: ' + JSON.stringify(noPc));
    check('carimbo virou por entrada (não escalar)',
      ev(pc, "typeof state.settingsMeta.childGender") === 'object' &&
      ev(pc, "!!(state.settingsMeta.childGender.ana && state.settingsMeta.childGender.bruno)"));

    cel.window.close();
  });

  await suite('r66(a) — mesma união vale para childPixKeys', async () => {
    const cel = await bootDevice({ familyId: 'fam1', familyName: 'Família Teste', childId: 'bruno' });
    ev(pc, "saveChildPixKey('ana','ana@pix.com')");
    await settle(1400);
    ev(cel, "saveChildPixKey('bruno','bruno@pix.com')");
    await settle(1400);
    const cloud = (cloudSettings() || {}).values || {};
    check('as duas chaves PIX sobrevivem',
      cloud.childPixKeys && cloud.childPixKeys.ana === 'ana@pix.com' && cloud.childPixKeys.bruno === 'bruno@pix.com',
      'nuvem: ' + JSON.stringify(cloud.childPixKeys));
    cel.window.close();
  });

  // ---- Compatibilidade com o formato anterior (carimbo escalar, envelope v1) ------------------
  await suite('Retrocompatibilidade — carimbo escalar de um aparelho na versão antiga', async () => {
    const antes = Date.now() - 60000;
    shared.tables.families[0].settings = { v: 1, values: { childGender: { ana: 'f' } }, meta: { childGender: antes } };
    const novo = await bootDevice({ familyId: 'fam1', familyName: 'Família Teste', childId: 'bruno' });
    check('lê o mapa publicado no formato v1',
      ev(novo, "state.childGender && state.childGender.ana") === 'f',
      'leu: ' + ev(novo, 'JSON.stringify(state.childGender)'));

    ev(novo, "setChildGender('bruno','m')");
    await settle(1400);
    const cloud = (cloudSettings() || {}).values || {};
    check('escreve por cima sem perder a entrada v1',
      cloud.childGender && cloud.childGender.ana === 'f' && cloud.childGender.bruno === 'm',
      'nuvem: ' + JSON.stringify(cloud.childGender));
    check('envelope publicado é v2', (cloudSettings() || {}).v === 2);
    novo.window.close();
  });

  await suite('r42 — aparelho no padrão não sobrescreve quem configurou', async () => {
    shared.tables.families[0].settings = {
      v: 2,
      values: { childGender: { ana: 'f' }, pointValueBRL: 0.5 },
      meta: { childGender: { ana: Date.now() }, pointValueBRL: Date.now() },
    };
    const virgem = await bootDevice({ familyId: 'fam1', familyName: 'Família Teste' });
    check('o device virgem adota a config da nuvem', ev(virgem, 'state.pointValueBRL') === 0.5);
    check('e não apaga o mapa da nuvem',
      (((cloudSettings() || {}).values || {}).childGender || {}).ana === 'f',
      'nuvem: ' + JSON.stringify(((cloudSettings() || {}).values || {}).childGender));
    virgem.window.close();
  });

  await suite('Valor escalar continua last-write-wins (não regredi o caminho normal)', async () => {
    ev(pc, 'state.pointValueBRL=0.25; saveState();');
    await settle(1400);
    check('valor do ponto do PC chega à nuvem', (((cloudSettings() || {}).values || {}).pointValueBRL) === 0.25,
      'nuvem: ' + JSON.stringify(((cloudSettings() || {}).values || {}).pointValueBRL));
  });

  await suite('r36(b) — coluna `settings` ausente degrada para local-only', async () => {
    const original = shared.from;
    shared.from = (t) => {
      if (t !== 'families') return original(t);
      const b = original(t);
      const boom = { then: (res) => Promise.resolve({ data: null, error: { message: 'column families.settings does not exist' } }).then(res) };
      return Object.assign({}, b, {
        select: () => Object.assign({}, b.select(), { eq: () => Object.assign({}, boom, { maybeSingle: () => boom }) }),
      });
    };
    const off = await bootDevice({ familyId: 'fam1', familyName: 'Família Teste' });
    check('app sobe e marca a coluna como ausente', ev(off, '_settingsColumnMissing') === true);
    check('o resto do app continua de pé', ev(off, "typeof state==='object' && !!document.getElementById('childPanel')"));
    shared.from = original;
    off.window.close();
  });

  pc.window.close();

  console.log('\n────────────────────────────────');
  console.log(`Resultado: ${pass} ✓ · ${fail} ✗`);
  if (fail) console.log('Falhas:\n  - ' + failures.join('\n  - '));
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error('Harness quebrou:', e); process.exit(1); });
