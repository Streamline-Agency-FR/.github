// Génère les visuels SVG du README de l'organisation (profile/assets).
// Usage : node scripts/generate.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'profile', 'assets');
mkdirSync(out, { recursive: true });

const GOLD = '#F7C948';
const GOLD_DEEP = '#E0A800';
const INK = '#09090B';
const SURF = '#121214';
const LINE = '#27272A';
const TEXT = '#FAFAFA';
const MUTED = '#A1A1AA';
const CORAL = '#FF5C47';
const FONT = "'Inter','Segoe UI',system-ui,-apple-system,Helvetica,Arial,sans-serif";

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const b64 = (file, mime) => `data:${mime};base64,${readFileSync(file).toString('base64')}`;
const save = (name, svg) => writeFileSync(join(out, name), svg.trim() + '\n');

const baseStyle = `
  text { font-family: ${FONT}; }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
`;

const grid = (id, w, h) => `
  <pattern id="${id}" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/>
  </pattern>
  <radialGradient id="${id}-mask-g" cx="50%" cy="45%" r="65%">
    <stop offset="0" stop-color="#fff" stop-opacity="1"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </radialGradient>
  <mask id="${id}-mask"><rect width="${w}" height="${h}" fill="url(#${id}-mask-g)"/></mask>`;

const sparkle = (x, y, s, delay) => `
  <path class="spark" style="animation-delay:${delay}s" transform="translate(${x} ${y}) scale(${s})"
    d="M0 -10 C1 -3 3 -1 10 0 C3 1 1 3 0 10 C-1 3 -3 1 -10 0 C-3 -1 -1 -3 0 -10Z" fill="${GOLD}"/>`;

// ───────────────────────── Bannière ─────────────────────────
function banner() {
  const W = 1280, H = 440;
  const logo = b64(join(out, 'logo-text.png'), 'image/png');
  save('banner.svg', `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Streamline Agency — agence TikTok LIVE n°1 en France, n°1 Gaming en Europe">
  <style>${baseStyle}
    .glow { animation: drift 14s ease-in-out infinite alternate; transform-origin: center; }
    .glow2 { animation: drift2 18s ease-in-out infinite alternate; }
    .spark { animation: twinkle 3.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .dot { animation: pulse 1.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .ring { animation: ring 1.6s ease-out infinite; transform-box: fill-box; transform-origin: center; }
    .scan { animation: scan 6s linear infinite; }
    @keyframes drift { from { transform: translate(-120px,-20px); } to { transform: translate(140px,30px); } }
    @keyframes drift2 { from { transform: translate(100px,20px); } to { transform: translate(-160px,-10px); } }
    @keyframes twinkle { 0%,100% { opacity:.25; transform: scale(.7) } 50% { opacity:1; transform: scale(1.1) } }
    @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:.45 } }
    @keyframes ring { from { opacity:.8; transform: scale(1) } to { opacity:0; transform: scale(2.6) } }
    @keyframes scan { from { transform: translateX(-400px) } to { transform: translateX(${W + 400}px) } }
  </style>
  <defs>
    ${grid('g', W, H)}
    <radialGradient id="gl" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${GOLD}" stop-opacity=".30"/>
      <stop offset="1" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gl2" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${CORAL}" stop-opacity=".14"/>
      <stop offset="1" stop-color="${CORAL}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="line" x1="0" x2="1">
      <stop offset="0" stop-color="${GOLD}" stop-opacity="0"/>
      <stop offset=".5" stop-color="${GOLD}"/>
      <stop offset="1" stop-color="${GOLD}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="scanG" x1="0" x2="1">
      <stop offset="0" stop-color="${GOLD}" stop-opacity="0"/>
      <stop offset=".5" stop-color="${GOLD}" stop-opacity=".08"/>
      <stop offset="1" stop-color="${GOLD}" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="clip"><rect width="${W}" height="${H}" rx="24"/></clipPath>
  </defs>
  <g clip-path="url(#clip)">
    <rect width="${W}" height="${H}" fill="${INK}"/>
    <ellipse class="glow" cx="${W / 2}" cy="${H / 2}" rx="520" ry="260" fill="url(#gl)"/>
    <ellipse class="glow2" cx="${W * 0.78}" cy="${H * 0.7}" rx="360" ry="200" fill="url(#gl2)"/>
    <rect width="${W}" height="${H}" fill="url(#g)" mask="url(#g-mask)"/>
    <rect class="scan" x="0" y="0" width="400" height="${H}" fill="url(#scanG)"/>

    <!-- badge LIVE -->
    <g transform="translate(${W / 2 - 92} 46)">
      <rect width="184" height="34" rx="17" fill="#18181B" stroke="${LINE}"/>
      <circle class="ring" cx="22" cy="17" r="6" fill="none" stroke="${CORAL}" stroke-width="2"/>
      <circle class="dot" cx="22" cy="17" r="6" fill="${CORAL}"/>
      <text x="38" y="22" font-size="13" font-weight="700" letter-spacing="2.4" fill="${TEXT}">TIKTOK LIVE · EU</text>
    </g>

    <image href="${logo}" x="${W / 2 - 280}" y="98" width="560" height="188"/>

    ${sparkle(230, 120, 1.2, 0)}${sparkle(1060, 150, 0.9, 1.1)}${sparkle(170, 330, 0.7, 2)}${sparkle(1120, 330, 1.1, 0.6)}${sparkle(980, 80, 0.6, 1.6)}${sparkle(310, 250, 0.5, 2.4)}

    <rect x="${W / 2 - 260}" y="310" width="520" height="2" fill="url(#line)"/>
    <text x="${W / 2}" y="352" text-anchor="middle" font-size="26" font-weight="800" fill="${TEXT}" letter-spacing=".5">Agence TikTok LIVE <tspan fill="${GOLD}">n°1 en France</tspan> · <tspan fill="${GOLD}">n°1 Gaming en Europe</tspan></text>
    <text x="${W / 2}" y="388" text-anchor="middle" font-size="16" fill="${MUTED}" letter-spacing="1.2">Primée par TikTok LIVE en 2025 et en 2026</text>
  </g>
  <rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="24" fill="none" stroke="${LINE}"/>
</svg>`);
}

// ───────────────────────── Titres de section ─────────────────────────
function heading(file, num, title, sub) {
  const W = 1280, H = 110;
  save(file, `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}">
  <style>${baseStyle}
    .bar { animation: grow 2.4s cubic-bezier(.2,.8,.2,1) infinite alternate; transform-box: fill-box; transform-origin: left; }
    @keyframes grow { from { transform: scaleX(.35) } to { transform: scaleX(1) } }
  </style>
  <defs>
    <linearGradient id="l" x1="0" x2="1"><stop offset="0" stop-color="${GOLD}"/><stop offset="1" stop-color="${GOLD}" stop-opacity="0"/></linearGradient>
  </defs>
  <g transform="translate(8 22)">
    <rect width="64" height="64" rx="16" fill="#18181B" stroke="${LINE}"/>
    <text x="32" y="42" text-anchor="middle" font-size="22" font-weight="800" fill="${GOLD}">${num}</text>
    <text x="88" y="34" font-size="30" font-weight="800" fill="${GOLD}" letter-spacing=".3">${esc(title)}</text>
    <text x="88" y="60" font-size="15" fill="${MUTED}">${esc(sub)}</text>
    <rect class="bar" x="88" y="74" width="360" height="3" rx="1.5" fill="url(#l)"/>
  </g>
</svg>`);
}

// ───────────────────────── Cartes projet ─────────────────────────
const V = (f) => join(root, 'scripts', 'visuels', f);
const MIME = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp', svg: 'image/svg+xml' };
const img = (f) => b64(V(f), MIME[f.split('.').pop()]);

// cover : photo de couverture (jpg 1240×420) ; sinon art : visuel détouré sur fond doré
function card({ file, name, kicker, line, tags, cover, art, badge, status, accent = GOLD }) {
  const W = 620, H = 340, CH = 210;
  let x = 28;
  const pills = tags.map((t) => {
    const w = Math.round(t.length * 7.2 + 22);
    const g = `<g transform="translate(${x} 296)"><rect width="${w}" height="24" rx="6" fill="#18181B"/><text x="${w / 2}" y="16.5" text-anchor="middle" font-size="12" font-weight="600" fill="#A1A1AA">${esc(t)}</text></g>`;
    x += w + 6;
    return g;
  }).join('');
  const visual = cover
    ? `<image href="${img(cover)}" width="${W}" height="${CH}" preserveAspectRatio="xMidYMid slice" class="zoom"/>`
    : `<rect width="${W}" height="${CH}" fill="url(#bgArt)"/>
       <rect width="${W}" height="${CH}" fill="url(#dots)"/>
       <image href="${img(art)}" x="${W / 2 - 85}" y="18" width="170" height="170" class="float"/>`;
  const sw = status ? Math.round(status.length * 7 + 30) : 0;
  save(file, `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(name)} — ${esc(kicker)}">
  <style>${baseStyle}
    .zoom { animation: zoom 14s ease-in-out infinite alternate; transform-origin: 50% 50%; }
    .float { animation: float 4s ease-in-out infinite; }
    .dot { animation: blink 1.6s ease-in-out infinite; }
    @keyframes zoom { from { transform: scale(1) } to { transform: scale(1.07) } }
    @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
    @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:.3 } }
  </style>
  <defs>
    <clipPath id="c"><rect width="${W}" height="${H}" rx="16"/></clipPath>
    <clipPath id="cv"><rect width="${W}" height="${CH}"/></clipPath>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset=".45" stop-color="${INK}" stop-opacity="0"/><stop offset="1" stop-color="${INK}" stop-opacity=".92"/>
    </linearGradient>
    <radialGradient id="bgArt" cx="50%" cy="60%" r="70%">
      <stop offset="0" stop-color="${accent}" stop-opacity=".35"/><stop offset="1" stop-color="${INK}"/>
    </radialGradient>
    <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#fff" fill-opacity=".07"/></pattern>
  </defs>
  <g clip-path="url(#c)">
    <rect width="${W}" height="${H}" fill="${INK}"/>
    <g clip-path="url(#cv)">${visual}</g>
    <rect width="${W}" height="${CH}" fill="url(#fade)"/>
    ${status ? `<g transform="translate(${W - 20 - sw} 18)"><rect width="${sw}" height="26" rx="13" fill="${INK}" fill-opacity=".8"/><circle class="dot" cx="14" cy="13" r="4" fill="${accent}"/><text x="24" y="17.5" font-size="12" font-weight="700" fill="${TEXT}">${esc(status)}</text></g>` : ''}
    ${badge ? `<g transform="translate(28 ${CH - 36})"><rect width="64" height="64" rx="14" fill="${INK}" stroke="${LINE}"/><image href="${img(badge)}" x="10" y="10" width="44" height="44"/></g>` : ''}
    <text x="${badge ? 108 : 28}" y="${CH + 30}" font-size="24" font-weight="800" fill="${TEXT}">${esc(name)}</text>
    <text x="${badge ? 108 : 28}" y="${CH + 52}" font-size="11.5" font-weight="700" letter-spacing="1.8" fill="${accent}">${esc(kicker.toUpperCase())}</text>
    <text x="28" y="${badge ? CH + 78 : CH + 76}" font-size="14.5" fill="${MUTED}">${esc(line)}</text>
    ${pills}
  </g>
  <rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="16" fill="none" stroke="${LINE}"/>
</svg>`);
}

// ───────────────────────── Récompenses ─────────────────────────
function awards() {
  const W = 1280, H = 440;
  const list = [
    ['2026', 'French Best Agency', 'TikTok LIVE Agency Awards · Paris'],
    ['2026', 'French Gaming Best Agency', 'TikTok LIVE Agency Awards · Paris'],
    ['2026', 'Outstanding Gaming LIVE Creator Network', 'Global Summit · seule agence de l\'UE'],
    ['2026', 'Best Mature Upgrade Agency', 'TikTok LIVE Agency Awards · Paris'],
    ['2025', 'FR+ Gaming Best Agency', 'TikTok LIVE · Paris'],
  ];
  const rows = list.map(([y, t, s], i) => `
    <g transform="translate(0 ${i * 62})">
      <rect width="560" height="52" rx="12" fill="#18181B" fill-opacity=".85"/>
      <text x="18" y="33" font-size="15" font-weight="800" fill="${GOLD}">${y}</text>
      <text x="74" y="23" font-size="16" font-weight="700" fill="${TEXT}">${esc(t)}</text>
      <text x="74" y="42" font-size="12.5" fill="${MUTED}">${esc(s)}</text>
    </g>`).join('');
  save('awards.svg', `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Primée par TikTok LIVE en 2025 et 2026">
  <style>${baseStyle}
    .shine { animation: shine 5s ease-in-out infinite; }
    @keyframes shine { 0% { transform: translateX(-300px) } 60%,100% { transform: translateX(${W}px) } }
  </style>
  <defs>
    <clipPath id="c"><rect width="${W}" height="${H}" rx="20"/></clipPath>
    <linearGradient id="fade" x1="0" x2="1"><stop offset=".35" stop-color="${INK}" stop-opacity="0"/><stop offset=".58" stop-color="${INK}"/></linearGradient>
    <linearGradient id="sh" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".10"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>
  <g clip-path="url(#c)">
    <rect width="${W}" height="${H}" fill="${INK}"/>
    <image href="${img('c-trophees.jpg')}" x="0" y="0" width="${Math.round(H * 1200 / 514)}" height="${H}" preserveAspectRatio="xMidYMid slice"/>
    <rect width="${W}" height="${H}" fill="url(#fade)"/>
    <rect class="shine" x="0" y="0" width="240" height="${H}" fill="url(#sh)" transform="skewX(-12)"/>
    <g transform="translate(36 ${H - 58})">
      <rect width="250" height="34" rx="17" fill="${INK}" fill-opacity=".8"/>
      <text x="125" y="22" text-anchor="middle" font-size="12.5" font-weight="800" letter-spacing="1.6" fill="${GOLD}">PRIMÉE PAR TIKTOK LIVE</text>
    </g>
    <g transform="translate(690 64)">${rows}</g>
  </g>
  <rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="20" fill="none" stroke="${LINE}"/>
</svg>`);
}

// ───────────────────────── Cartes équipe ─────────────────────────
function member({ file, avatar, mime, first, handle, role, projects }) {
  const W = 400, H = 410;
  const img = b64(avatar, mime);
  let y = 340;
  const rows = projects.map((p) => {
    const g = `<text x="${W / 2}" y="${y}" text-anchor="middle" font-size="14" fill="#D4D4D8">${esc(p)}</text>`;
    y += 24;
    return g;
  }).join('');
  save(file, `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(first)} (${esc(handle)}) — ${esc(role)}">
  <style>${baseStyle}
    .spin { animation: spin 8s linear infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes spin { to { transform: rotate(360deg) } }
  </style>
  <defs>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${GOLD}"/><stop offset=".5" stop-color="${GOLD}" stop-opacity=".05"/><stop offset="1" stop-color="${GOLD_DEEP}"/></linearGradient>
    <radialGradient id="h" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${GOLD}" stop-opacity=".18"/><stop offset="1" stop-color="${GOLD}" stop-opacity="0"/></radialGradient>
    <clipPath id="av"><circle cx="${W / 2}" cy="130" r="74"/></clipPath>
    <clipPath id="c"><rect width="${W}" height="${H}" rx="22"/></clipPath>
  </defs>
  <g clip-path="url(#c)">
    <rect width="${W}" height="${H}" fill="${SURF}"/>
    <circle cx="${W / 2}" cy="130" r="170" fill="url(#h)"/>
    <circle class="spin" cx="${W / 2}" cy="130" r="86" fill="none" stroke="url(#ring)" stroke-width="4" stroke-dasharray="380 160" stroke-linecap="round"/>
    <image href="${img}" x="${W / 2 - 74}" y="56" width="148" height="148" clip-path="url(#av)" preserveAspectRatio="xMidYMid slice"/>
    <text x="${W / 2}" y="252" text-anchor="middle" font-size="30" font-weight="800" fill="${TEXT}">${esc(first)}</text>
    <text x="${W / 2}" y="278" text-anchor="middle" font-size="14" fill="${MUTED}">@${esc(handle)}</text>
    <g transform="translate(${W / 2} 296)">
      <rect x="${-(role.length * 7.6 + 32) / 2}" y="0" width="${role.length * 7.6 + 32}" height="28" rx="14" fill="${INK}" stroke="${GOLD}" stroke-opacity=".6"/>
      <text y="19" text-anchor="middle" font-size="12.5" font-weight="700" letter-spacing="1.2" fill="${GOLD}">${esc(role.toUpperCase())}</text>
    </g>
    ${rows.replace(/y="(\d+)"/g, (_, v) => `y="${+v + 14}"`)}
  </g>
  <rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="22" fill="none" stroke="${LINE}" stroke-width="1.5"/>
</svg>`);
}

// ───────────────────────── Pied de page ─────────────────────────
function footer() {
  const W = 1280, H = 150;
  save('footer.svg', `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Streamline Agency">
  <style>${baseStyle}
    .wave { animation: wave 6s ease-in-out infinite alternate; }
    @keyframes wave { from { transform: translateX(-60px) } to { transform: translateX(60px) } }
  </style>
  <defs>
    <linearGradient id="l" x1="0" x2="1"><stop offset="0" stop-color="${GOLD}" stop-opacity="0"/><stop offset=".5" stop-color="${GOLD}"/><stop offset="1" stop-color="${GOLD}" stop-opacity="0"/></linearGradient>
  </defs>
  <path class="wave" d="M-80 40 C 200 10, 420 70, 640 40 S 1080 10, 1360 40" fill="none" stroke="url(#l)" stroke-width="2"/>
  <text x="${W / 2}" y="96" text-anchor="middle" font-size="22" font-weight="800" fill="${TEXT}" letter-spacing="1">Streamline <tspan fill="${GOLD}">Agency</tspan></text>
  <text x="${W / 2}" y="126" text-anchor="middle" font-size="14" fill="${MUTED}" letter-spacing="2">FRANCE · STREAMLINEAGENCY.EU</text>
</svg>`);
}

// ───────────────────────── Contenu ─────────────────────────
banner();
awards();
heading('h-awards.svg', '01', 'Récompenses', 'Primée par TikTok LIVE en 2025 et en 2026');
heading('h-projects.svg', '02', 'Nos projets', 'Développés en interne');
heading('h-partner.svg', '03', 'Partenaire', 'Ceux avec qui on avance');
heading('h-team.svg', '04', 'L\'équipe dev', 'Les devs derrière nos outils');
heading('h-stack.svg', '05', 'Notre stack', 'Nos technos');

const projects = [
  { file: 'p-dashboard.svg', name: 'Dashboard', kicker: 'Le panel de l\'agence', cover: 'c-dashboard.jpg', badge: 'crown.png',
    line: 'Le cœur de l\'agence, pour l\'équipe et les créateurs.', tags: ['Laravel', 'Livewire', 'Tailwind'] },
  { file: 'p-overlay.svg', name: 'Overlay', kicker: 'Éditeur d\'overlays', cover: 'c-overlay.jpg', badge: 'crown.png',
    line: 'Des overlays de live sur mesure pour nos créateurs.', tags: ['Next.js', 'TypeScript'] },
  { file: 'p-fivem.svg', name: 'FiveM', kicker: 'Live interactif · GTA V', cover: 'c-fivem.jpg', status: 'Exclusif', accent: CORAL,
    line: 'Mont Chiliad et nos modes GTA où les viewers jouent en direct.', tags: ['Lua', 'Node.js'] },
  { file: 'p-minecraft.svg', name: 'Minecraft', kicker: 'Live interactif', cover: 'c-minecraft.jpg', accent: CORAL,
    line: 'Nos jeux et serveurs Minecraft pilotés par les viewers.', tags: ['Java'] },
  { file: 'p-sako.svg', name: 'SAKO', kicker: 'Outil interne', art: 'crown.png',
    line: 'Notre outil de gestion de projet.', tags: ['Laravel', 'Livewire'] },
  { file: 'p-bots.svg', name: 'Bots Discord', kicker: 'Communautés', art: 'mascot.webp',
    line: 'Les bots de nos serveurs Discord.', tags: ['discord.js'] },
  { file: 'p-infra.svg', name: 'Infra', kicker: 'Serveurs & mail', art: 'league-master.webp',
    line: 'Tout ce qui tourne en coulisses.', tags: ['Linux', 'Docker'] },
  { file: 'p-tikyline.svg', name: 'Tikyline', kicker: 'Outils de live TikTok', cover: 'c-tikyline.jpg', badge: 'tiky-logo.webp', status: 'Partenaire',
    line: 'Overlays, alertes et jeux pour les lives TikTok.', tags: ['tikyline.com'] },
];
projects.forEach(card);

const s = (f) => join(root, 'scripts', f);
member({ file: 'team-florentin.svg', avatar: s('cauctoflo.img'), mime: 'image/jpeg', first: 'Florentin', handle: 'cauctoflo', role: 'Lead dev',
  projects: ['Dashboard · Overlay', 'Minecraft'] });
member({ file: 'team-nailec.svg', avatar: s('naileclevrai.img'), mime: 'image/jpeg', first: 'Nailec', handle: 'naileclevrai', role: 'Dev full-stack',
  projects: ['SAKO · FiveM', 'Bots Discord'] });
member({ file: 'team-vincent.svg', avatar: s('Masdestructor.img'), mime: 'image/png', first: 'Vincent', handle: 'Masdestructor', role: 'Infra & back-end',
  projects: ['Infra · Webmail', 'Bots Discord'] });

footer();
console.log('Visuels générés dans', out);
