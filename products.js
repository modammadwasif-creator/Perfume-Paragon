/* PERFUME PARAGON — store config, catalogue and generated product artwork.
   Edit STORE below with your real details. Replace the generated artwork by
   setting `images: ['photo1.jpg', ...]` on a product (files in this folder). */

const STORE = {
  name: 'Perfume Paragon',
  currency: 'Rs.',
  delivery: { flat: 250, freeOver: 5000 },
  email: 'hello@perfumeparagon.example',   // replace with your real email
  whatsapp: '',                            // digits only incl. country code, e.g. 923001234567
  phone: '',
  formEndpoint: '',                        // optional: a form service URL (e.g. Formspree) for contact/newsletter
  social: {}                               // e.g. { Instagram: 'https://instagram.com/yourpage' }
};

const CATEGORIES = [
  { id: 'men', name: "Men's Perfumes", blurb: 'Bold woods, crisp citrus and warm spice.' },
  { id: 'women', name: "Women's Perfumes", blurb: 'Soft florals, luminous musk and warm amber.' },
  { id: 'unisex', name: 'Unisex Perfumes', blurb: 'Fragrances made to be shared.' },
  { id: 'luxury', name: 'Luxury Collection', blurb: 'Extrait de parfum in rare, concentrated blends.' },
  { id: 'gift-sets', name: 'Gift Sets', blurb: 'Curated sets, ready to give.' }
];

const roundTo = (n, step) => Math.round(n / step) * step;
const sizes3 = base => [
  { size: '30ml', price: roundTo(base * 0.62, 50) },
  { size: '50ml', price: base },
  { size: '100ml', price: roundTo(base * 1.75, 50) }
];
const sizes2 = base => [
  { size: '50ml', price: base },
  { size: '100ml', price: roundTo(base * 1.8, 100) }
];

// hues: [glass, glass-shadow, background-light, background-dark]
const RAW = [
  // Men
  ['noir-meridian', 'Noir Meridian', 'men', ['bestseller'], 5200, 0, 'v3', 'block', ['#1d2a3a', '#0c141d', '#d9dfe6', '#9fb0c2'],
    ['Bergamot', 'Black pepper'], ['Cedarwood', 'Lavender'], ['Vetiver', 'Amber'],
    'A confident evening scent. Bright bergamot and black pepper open onto cedar and lavender, settling into a dry vetiver and amber base.'],
  ['cedar-and-smoke', 'Cedar & Smoke', 'men', [], 4800, 0, 'v3', 'block', ['#4a3322', '#1e130b', '#e8dccb', '#b79b7c'],
    ['Pink pepper', 'Elemi'], ['Cedar', 'Incense'], ['Smoked wood', 'Tonka'],
    'Dry cedar wrapped in soft incense smoke. Calm, grounded and easy to wear from office to dinner.'],
  ['azure-voyager', 'Azure Voyager', 'men', ['new'], 4500, 5200, 'v3', 'block', ['#1f5b7a', '#0b2a3a', '#dff0f6', '#8fc3d8'],
    ['Sea salt', 'Grapefruit'], ['Sage', 'Geranium'], ['Driftwood', 'Musk'],
    'Fresh and mineral. Sea salt and grapefruit lift a clean sage heart over a light driftwood musk. Made for warm days.'],
  ['obsidian-spice', 'Obsidian Spice', 'men', [], 5800, 0, 'v3', 'block', ['#2a1620', '#10070c', '#e6d5da', '#a98391'],
    ['Cardamom', 'Cinnamon'], ['Leather', 'Rose'], ['Patchouli', 'Benzoin'],
    'Warm spice over dark leather and a hint of rose. A richer, slower fragrance for cooler evenings.'],
  // Women
  ['velvet-peony', 'Velvet Peony', 'women', ['bestseller'], 5400, 0, 'v3', 'round', ['#c9788f', '#7d3248', '#f8e4ea', '#e3a9ba'],
    ['Pear', 'Pink pepper'], ['Peony', 'Rose'], ['White musk', 'Cashmeran'],
    'A lush peony and rose bouquet softened by juicy pear and a creamy musk. Elegant, romantic and easy to love.'],
  ['rosewater-silk', 'Rosewater Silk', 'women', [], 4900, 0, 'v3', 'round', ['#d9a3a0', '#8a4f4d', '#faeceb', '#e6bcb8'],
    ['Lychee', 'Bergamot'], ['Damask rose', 'Violet'], ['Sandalwood', 'Vanilla'],
    'Rosewater with a silky sandalwood drydown. Airy at first, gently sweet as it settles on the skin.'],
  ['amber-blossom', 'Amber Blossom', 'women', ['new'], 5600, 0, 'v3', 'round', ['#c9822f', '#6e3d0a', '#f8ead3', '#e0b772'],
    ['Mandarin', 'Peach'], ['Orange blossom', 'Jasmine'], ['Amber', 'Vanilla'],
    'Golden and glowing. Orange blossom and jasmine rest on a warm amber and vanilla base.'],
  ['pearl-jasmine', 'Pearl Jasmine', 'women', [], 4600, 5400, 'v3', 'round', ['#e7dccd', '#9d8b72', '#fbf7f0', '#e8dcc6'],
    ['Green tea', 'Lemon'], ['Jasmine sambac', 'Tuberose'], ['Musk', 'Cedar'],
    'Clean, luminous jasmine with a green tea lift. A polished everyday white floral.'],
  // Unisex
  ['saffron-dusk', 'Saffron Dusk', 'unisex', ['bestseller'], 6200, 0, 'v3', 'tall', ['#b8651f', '#5c2a05', '#f5e1c8', '#d9a066'],
    ['Saffron', 'Cardamom'], ['Rose', 'Leather'], ['Oud', 'Amber'],
    'Saffron and rose over soft leather, finishing in a smooth, resinous oud and amber.'],
  ['oud-horizon', 'Oud Horizon', 'unisex', ['new'], 7400, 0, 'v3', 'tall', ['#3a2a1d', '#150e08', '#e4d6c3', '#a58b6c'],
    ['Nutmeg', 'Saffron'], ['Agarwood', 'Geranium'], ['Sandalwood', 'Labdanum'],
    'A smooth, polished oud. Warm spice leads to agarwood and creamy sandalwood.'],
  ['sandal-mist', 'Sandal Mist', 'unisex', [], 4400, 0, 'v3', 'tall', ['#a99273', '#5c4b33', '#f4ede0', '#d6c4a3'],
    ['Cardamom', 'Mandarin'], ['Sandalwood', 'Iris'], ['Cashmere wood', 'Musk'],
    'Soft, milky sandalwood with a powdery iris heart. Quiet, close to the skin and endlessly wearable.'],
  ['bergamot-veil', 'Bergamot Veil', 'unisex', [], 4300, 0, 'v3', 'tall', ['#7a9a55', '#34471f', '#eef3df', '#bfd193'],
    ['Bergamot', 'Neroli'], ['Petitgrain', 'Basil'], ['Vetiver', 'White musk'],
    'A bright, green citrus with a herbal heart and a clean vetiver finish. Crisp and refreshing.'],
  // Luxury
  ['paragon-royale', 'Paragon Royale Extrait', 'luxury', ['bestseller'], 14500, 0, 'v2', 'facet', ['#6b2a3a', '#2a0c15', '#ecd9c9', '#b28a6b'],
    ['Saffron', 'Bergamot', 'Pink pepper'], ['Bulgarian rose', 'Oud', 'Jasmine'], ['Amber', 'Sandalwood', 'Musk'],
    'Our signature extrait. Saffron-touched rose and oud over a deep amber and sandalwood base. Concentrated, long-lasting and unmistakable.'],
  ['black-oud-imperial', 'Black Oud Imperial', 'luxury', [], 18500, 0, 'v2', 'facet', ['#16110d', '#050403', '#e1d3bd', '#8c7552'],
    ['Cinnamon', 'Black pepper'], ['Aged oud', 'Leather'], ['Resins', 'Patchouli'],
    'Deep, dark oud with smoky leather and rich resins. A statement fragrance in extrait concentration.'],
  ['golden-iris', 'Golden Iris Extrait', 'luxury', ['new'], 12500, 0, 'v2', 'facet', ['#b79a4d', '#5e4a14', '#f7f0da', '#dcc687'],
    ['Mandarin', 'Cardamom'], ['Orris butter', 'Ambrette'], ['Suede', 'Benzoin'],
    'Powdery orris butter and soft suede, warmed with benzoin. A refined, quietly luxurious extrait.'],
  // Gift sets
  ['discovery-set', 'The Discovery Set', 'gift-sets', ['bestseller'], 7900, 0, 'set', 'set', ['#8a6a3a', '#3b2a10', '#f3e8d4', '#d1b585'],
    ['Four 10ml sprays'], ['Noir Meridian, Velvet Peony'], ['Saffron Dusk, Amber Blossom'],
    'Four 10ml travel sprays so you can find your signature before choosing a full size. Presented in a gift box.'],
  ['evening-duo', 'The Evening Duo', 'gift-sets', [], 9800, 11500, 'set', 'set', ['#4a2a3a', '#1c0d15', '#ecdbe0', '#b78a99'],
    ['Two 50ml bottles'], ['Obsidian Spice, Rosewater Silk'], ['A matched pair'],
    'A matched pair for two: a warm spiced evening scent and a soft rose, in one gift box.'],
  ['signature-trio', 'The Signature Trio', 'gift-sets', [], 13900, 0, 'set', 'set', ['#2d3a4f', '#0f1622', '#dde3ec', '#9aa8bf'],
    ['Three 50ml bottles'], ['Noir Meridian, Velvet Peony, Sandal Mist'], ['Our most-loved three'],
    'Three of our most-loved fragrances in 50ml, from fresh to warm to soft. A generous gift.']
];

const PRODUCTS = RAW.map((r, i) => {
  const [id, name, cat, tags, base, old, vt, shape, hues, top, heart, baseN, desc] = r;
  const variants = vt === 'v3' ? sizes3(base) : vt === 'v2' ? sizes2(base) : [{ size: 'Gift set', price: base }];
  const def = vt === 'v3' ? 1 : 0;
  return {
    id, name, cat, tags, shape, hues, desc, order: i,
    concentration: cat === 'luxury' ? 'Extrait de Parfum' : cat === 'gift-sets' ? 'Gift set' : 'Eau de Parfum',
    notes: { top, heart, base: baseN },
    variants, def,
    price: variants[def].price,
    oldPrice: old || 0,
    soldOut: false,
    images: null
  };
});

/* ---------- generated artwork (original SVG, no external files) ---------- */
function bottleGroup(shape, cx, base, s, glass, shade, label, gold) {
  const [g1, g2] = [glass, shade];
  const defs = `<linearGradient id="gl${cx}${s}" x1="0" x2="1"><stop offset="0" stop-color="${g2}"/><stop offset=".35" stop-color="${g1}"/><stop offset=".7" stop-color="${g1}"/><stop offset="1" stop-color="${g2}"/></linearGradient>`;
  let w, h, body, cap, capH, capW, capCol = gold ? '#c9a24e' : '#15110d';
  if (shape === 'round') { w = 190; h = 250; capH = 70; capW = 70; }
  else if (shape === 'tall') { w = 140; h = 330; capH = 90; capW = 66; }
  else if (shape === 'facet') { w = 200; h = 250; capH = 60; capW = 120; capCol = '#c9a24e'; }
  else { w = 170; h = 260; capH = 80; capW = 96; }
  const x = cx - w / 2, y = base - h;
  if (shape === 'round') body = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="80" fill="url(#gl${cx}${s})"/>`;
  else if (shape === 'facet') body = `<polygon points="${x + 36},${y} ${x + w - 36},${y} ${x + w},${y + 44} ${x + w},${base - 30} ${x + w - 30},${base} ${x + 30},${base} ${x},${base - 30} ${x},${y + 44}" fill="url(#gl${cx}${s})"/>`;
  else body = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${shape === 'tall' ? 18 : 12}" fill="url(#gl${cx}${s})"/>`;
  cap = shape === 'round'
    ? `<circle cx="${cx}" cy="${y - capH / 2 + 12}" r="${capW / 2}" fill="${capCol}"/>`
    : `<rect x="${cx - capW / 2}" y="${y - capH}" width="${capW}" height="${capH + 4}" rx="${shape === 'tall' ? 8 : 4}" fill="${capCol}"/>`;
  const ly = y + h * 0.4, lw = w * 0.62;
  const words = label.split(' ');
  const l1 = words[0], l2 = words.slice(1).join(' ');
  const fs = Math.max(11, Math.min(22, (lw * 1.55) / Math.max(l1.length, l2.length, 6)));
  const text = `<rect x="${cx - lw / 2}" y="${ly}" width="${lw}" height="${h * 0.3}" fill="#fbf7ef" opacity=".92"/>` +
    `<text x="${cx}" y="${ly + h * 0.3 * 0.42}" text-anchor="middle" font-family="Georgia,serif" font-size="${fs}" letter-spacing="2" fill="#1a140e">${l1.toUpperCase()}</text>` +
    (l2 ? `<text x="${cx}" y="${ly + h * 0.3 * 0.74}" text-anchor="middle" font-family="Georgia,serif" font-size="${fs * 0.8}" letter-spacing="1.5" fill="#6b5a3e">${l2.toUpperCase()}</text>` : '');
  const shine = `<rect x="${x + 14}" y="${y + 16}" width="10" height="${h - 50}" rx="5" fill="#fff" opacity=".28"/>`;
  return `<defs>${defs}</defs>${cap}${body}${text}${shine}`;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function artworkURI(p, view) {
  const [glass, shade, bg1, bg2] = p.hues;
  const W = 800, H = 1000;
  const bid = 'b' + p.order + view;
  let inner = '';
  const label = p.name.replace('&', 'and').replace(/^The /, '');
  const bottles = (cx, base, s, mono) => {
    if (p.shape === 'set') {
      const cols = [[glass, shade], ['#c7897d', '#6e382f'], ['#7a8f6b', '#2f3e26']];
      return [-150, 0, 150].map((dx, i) => `<g transform="translate(${cx + dx},${base}) scale(${s * (i === 1 ? 1 : 0.82)}) translate(${-(cx + dx)},${-base})">` +
        bottleGroup(i % 2 ? 'round' : 'block', cx + dx, base, i + 1, cols[i][0], cols[i][1], ['Day', 'Dusk', 'Night'][i], true) + '</g>').join('');
    }
    return `<g transform="translate(${cx},${base}) scale(${s}) translate(${-cx},${-base})">` + bottleGroup(p.shape, cx, base, 1, glass, shade, label, p.cat === 'luxury' || p.shape === 'round') + '</g>';
  };
  if (view === 0) {
    inner = `<ellipse cx="400" cy="800" rx="230" ry="26" fill="#000" opacity=".18"/>` + bottles(400, 790, 1.55);
  } else if (view === 1) {
    const all = [...p.notes.top, ...p.notes.heart, ...p.notes.base].slice(0, 3);
    const cols = ['#ffffff', shade, glass];
    const circles = [[210, 330, 150], [600, 420, 190], [330, 700, 120]].map((c, i) =>
      `<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="${cols[i]}" opacity="${i === 0 ? .35 : .22}"/>`).join('');
    const tags = all.map((n, i) => `<text x="${130 + i * 190}" y="910" font-family="Georgia,serif" font-size="22" letter-spacing="3" fill="${shade}" opacity=".85">${esc(n.toUpperCase()).slice(0, 14)}</text>`).join('');
    inner = circles + `<ellipse cx="400" cy="720" rx="150" ry="18" fill="#000" opacity=".15"/>` + bottles(400, 715, 1.2) + tags;
  } else {
    inner = `<rect width="800" height="1000" fill="${shade}"/>` +
      [0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${i * 100 + 10}" width="40" height="1000" fill="#fff" opacity=".04"/>`).join('') +
      `<ellipse cx="400" cy="840" rx="250" ry="40" fill="${bg2}" opacity=".9"/><rect x="150" y="840" width="500" height="110" fill="${bg2}" opacity=".9"/><ellipse cx="400" cy="950" rx="250" ry="40" fill="${bg2}"/>` +
      `<ellipse cx="400" cy="830" rx="200" ry="22" fill="#000" opacity=".25"/>` + bottles(400, 825, 1.35);
  }
  const bgGrad = view === 2 ? '' :
    `<defs><radialGradient id="${bid}" cx=".5" cy=".35" r=".9"><stop offset="0" stop-color="${view === 1 ? bg2 : bg1}"/><stop offset="1" stop-color="${view === 1 ? bg1 : bg2}"/></radialGradient></defs><rect width="800" height="1000" fill="url(#${bid})"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${bgGrad}${inner}</svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

const _imgCache = {};
function productImage(p, view) {
  if (p.images && p.images[view]) return p.images[view];
  const k = p.id + view;
  return _imgCache[k] || (_imgCache[k] = artworkURI(p, view));
}
function productImageCount(p) { return p.images ? p.images.length : 3; }
function productImageAlt(p, view) {
  return ['Bottle of ' + p.name, 'Fragrance notes for ' + p.name, p.name + ' on a display plinth'][view] || p.name;
}

function getProduct(id) { return PRODUCTS.find(p => p.id === id); }
function categoryName(id) { const c = CATEGORIES.find(c => c.id === id); return c ? c.name : id; }