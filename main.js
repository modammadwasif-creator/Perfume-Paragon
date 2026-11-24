/* PERFUME PARAGON — shared UI: header/footer, search, sliders, shop, product page, forms */
document.documentElement.classList.add('js');

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const ICON = {
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 16l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 8V6a3 3 0 016 0v2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  left: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  right: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  zoom: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  crest: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l9 10-9 10L3 12z" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M12 7v10M8 12h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>'
};

const NAV = [
  { t: 'Home', h: 'index.html' },
  { t: 'Shop', h: 'shop.html', kids: [
    { t: 'All Fragrances', h: 'shop.html' },
    { t: "Men's Perfumes", h: 'shop.html?cat=men' },
    { t: "Women's Perfumes", h: 'shop.html?cat=women' },
    { t: 'Unisex Perfumes', h: 'shop.html?cat=unisex' },
    { t: 'Luxury Collection', h: 'shop.html?cat=luxury' },
    { t: 'Gift Sets', h: 'shop.html?cat=gift-sets' }
  ] },
  { t: 'New Arrivals', h: 'shop.html?tag=new' },
  { t: 'Best Sellers', h: 'shop.html?tag=bestseller' },
  { t: 'About', h: 'about.html', kids: [
    { t: 'Our Story', h: 'about.html' },
    { t: 'Delivery & Returns', h: 'about.html#delivery' },
    { t: 'FAQ', h: 'about.html#faq' }
  ] },
  { t: 'Contact', h: 'contact.html' }
];

function isActive(h) {
  const [path, query] = h.split('#')[0].split('?');
  const file = location.pathname.split('/').pop() || 'index.html';
  if (path !== file) return false;
  if (query) return location.search === '?' + query;
  if (path === 'shop.html') return !new URLSearchParams(location.search).has('tag') && !new URLSearchParams(location.search).has('cat');
  return true;
}

/* ---------- chrome ---------- */
function buildChrome() {
  const free = fmt(STORE.delivery.freeOver);
  const desktopNav = NAV.map(n => `<li class="${n.kids ? 'has-sub' : ''}"><a href="${n.h}" ${isActive(n.h) ? 'aria-current="page"' : ''}>${n.t}</a>` +
    (n.kids ? `<ul class="dropdown">${n.kids.map(k => `<li><a href="${k.h}">${k.t}</a></li>`).join('')}</ul>` : '') + '</li>').join('');
  const mobileNav = NAV.map(n => n.kids
    ? `<details class="m-sub"><summary>${n.t}</summary>${n.kids.map(k => `<a href="${k.h}">${k.t}</a>`).join('')}</details>`
    : `<a class="m-link" href="${n.h}" ${isActive(n.h) ? 'aria-current="page"' : ''}>${n.t}</a>`).join('');

  $('#site-header').innerHTML = `
  <div class="announce"><p>Free delivery on orders over ${free}</p></div>
  <header class="site-header" id="siteHeader">
    <div class="hdr-inner">
      <button class="icon-btn menu-btn" id="menuBtn" aria-label="Open menu" aria-controls="mobileNav" aria-expanded="false">${ICON.menu}</button>
      <nav class="main-nav" aria-label="Primary"><ul>${desktopNav}</ul></nav>
      <a class="logo" href="index.html" aria-label="Perfume Paragon — home"><span class="logo-mark">${ICON.crest}</span><span class="logo-text">PERFUME <em>PARAGON</em></span></a>
      <div class="hdr-actions">
        <button class="icon-btn" id="searchBtn" aria-label="Search">${ICON.search}</button>
        <button class="icon-btn cart-btn" id="cartBtn" aria-label="Open cart">${ICON.bag}<span class="cart-count" aria-hidden="true">0</span></button>
      </div>
    </div>
  </header>
  <div class="overlay" id="overlay"></div>
  <aside class="mobile-nav" id="mobileNav" aria-hidden="true" aria-label="Menu">
    <div class="drawer-head"><span class="drawer-title">Menu</span><button class="icon-btn" id="menuClose" aria-label="Close menu">${ICON.close}</button></div>
    <nav>${mobileNav}</nav>
  </aside>
  <aside class="cart-drawer" id="cartDrawer" role="dialog" aria-modal="true" aria-label="Shopping cart" aria-hidden="true">
    <div class="drawer-head"><span class="drawer-title">Your cart</span><button class="icon-btn" id="cartClose" aria-label="Close cart">${ICON.close}</button></div>
    <div class="drawer-body" id="cartDrawerBody"></div>
    <div class="drawer-foot" id="cartDrawerFoot" hidden></div>
  </aside>
  <div class="search-overlay" id="searchOverlay" role="dialog" aria-modal="true" aria-label="Search" aria-hidden="true">
    <div class="search-panel">
      <form id="searchForm" action="shop.html" role="search">
        <input type="search" name="q" id="searchInput" placeholder="Search fragrances, notes, collections" autocomplete="off" aria-label="Search the store">
        <button class="icon-btn" type="submit" aria-label="Submit search">${ICON.search}</button>
        <button class="icon-btn" type="button" id="searchClose" aria-label="Close search">${ICON.close}</button>
      </form>
      <div class="search-results" id="searchResults" aria-live="polite"></div>
    </div>
  </div>
  <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Product image" aria-hidden="true">
    <button class="icon-btn lb-close" id="lbClose" aria-label="Close image">${ICON.close}</button>
    <button class="icon-btn lb-prev" id="lbPrev" aria-label="Previous image">${ICON.left}</button>
    <img id="lbImg" alt="">
    <button class="icon-btn lb-next" id="lbNext" aria-label="Next image">${ICON.right}</button>
  </div>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>`;

  const social = Object.keys(STORE.social || {}).map(k => `<a href="${esc(STORE.social[k])}" rel="noopener" target="_blank">${esc(k)}</a>`).join('');
  $('#site-footer').innerHTML = `
  <footer class="site-footer">
    <div class="container foot-grid">
      <div class="foot-brand">
        <a class="logo logo-foot" href="index.html"><span class="logo-mark">${ICON.crest}</span><span class="logo-text">PERFUME <em>PARAGON</em></span></a>
        <p>Luxury perfumes for every occasion, from everyday eau de parfum to rare extraits.</p>
        <form class="newsletter" data-form="newsletter" novalidate>
          <label class="foot-label" for="fNl">Join our list</label>
          <div class="nl-row"><input id="fNl" type="email" name="email" placeholder="Your email" autocomplete="email" required><button class="btn btn-gold" type="submit">Subscribe</button></div>
          <p class="form-status" role="status"></p>
        </form>
      </div>
      <div><h3>Shop</h3><ul>
        <li><a href="shop.html">All Fragrances</a></li>
        <li><a href="shop.html?cat=men">Men's Perfumes</a></li>
        <li><a href="shop.html?cat=women">Women's Perfumes</a></li>
        <li><a href="shop.html?cat=unisex">Unisex Perfumes</a></li>
        <li><a href="shop.html?cat=luxury">Luxury Collection</a></li>
        <li><a href="shop.html?cat=gift-sets">Gift Sets</a></li>
      </ul></div>
      <div><h3>Help</h3><ul>
        <li><a href="about.html">Our Story</a></li>
        <li><a href="about.html#delivery">Delivery &amp; Returns</a></li>
        <li><a href="about.html#faq">FAQ</a></li>
        <li><a href="contact.html">Contact Us</a></li>
        <li><a href="cart.html">Your Cart</a></li>
      </ul></div>
      <div><h3>Contact</h3><ul class="foot-contact">
        <li><a href="mailto:${esc(STORE.email)}">${esc(STORE.email)}</a></li>
        ${STORE.phone ? `<li>${esc(STORE.phone)}</li>` : ''}
        ${social ? `<li class="foot-social">${social}</li>` : ''}
      </ul></div>
    </div>
    <div class="container foot-bottom"><p>&copy; ${new Date().getFullYear()} ${STORE.name}. All rights reserved.</p></div>
  </footer>`;
}

/* ---------- layers (drawers / overlay) ---------- */
function syncOverlay() {
  const open = ['cartDrawer', 'mobileNav', 'filterPanel'].some(id => { const e = document.getElementById(id); return e && e.classList.contains('open'); });
  const so = document.getElementById('searchOverlay');
  const lb = document.getElementById('lightbox');
  const ov = document.getElementById('overlay');
  if (ov) ov.classList.toggle('show', open);
  document.body.classList.toggle('no-scroll', open || (so && so.classList.contains('open')) || (lb && lb.classList.contains('open')));
}
function setLayer(id, on) {
  const e = document.getElementById(id); if (!e) return;
  e.classList.toggle('open', on);
  e.setAttribute('aria-hidden', on ? 'false' : 'true');
  syncOverlay();
}
function toast(msg) {
  const t = $('#toast'); if (!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ---------- search ---------- */
function searchProducts(q) {
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  return PRODUCTS.filter(p => {
    const hay = [p.name, categoryName(p.cat), p.concentration, p.desc, ...p.notes.top, ...p.notes.heart, ...p.notes.base, ...p.tags.map(t => t === 'new' ? 'new arrival' : 'best seller')].join(' ').toLowerCase();
    return tokens.every(t => hay.includes(t));
  });
}
function searchItemHTML(p) {
  return `<a class="s-item" href="product.html?id=${encodeURIComponent(p.id)}"><img src="${productImage(p, 0)}" alt="" width="56" height="70" loading="lazy"><span><strong>${esc(p.name)}</strong><small>${esc(categoryName(p.cat))}</small></span><span class="s-price">${fmt(p.price)}</span></a>`;
}
function renderSearch(q) {
  const box = $('#searchResults');
  q = q.trim();
  if (!q) {
    box.innerHTML = '<p class="s-head">Popular right now</p>' + PRODUCTS.filter(p => p.tags.includes('bestseller')).slice(0, 4).map(searchItemHTML).join('');
    return;
  }
  const res = searchProducts(q);
  if (!res.length) {
    box.innerHTML = `<div class="s-empty"><p>No fragrances found for &ldquo;${esc(q)}&rdquo;.</p><p class="muted small">Try a note such as <a href="shop.html?q=oud">oud</a>, <a href="shop.html?q=rose">rose</a> or <a href="shop.html?q=citrus">citrus</a>, or browse <a href="shop.html">all fragrances</a>.</p></div>`;
    return;
  }
  box.innerHTML = `<p class="s-head">${res.length} result${res.length > 1 ? 's' : ''}</p>` + res.slice(0, 6).map(searchItemHTML).join('') +
    `<a class="s-all" href="shop.html?q=${encodeURIComponent(q)}">See all results</a>`;
}
function openSearch() {
  const so = $('#searchOverlay'); so.classList.add('open'); so.setAttribute('aria-hidden', 'false');
  syncOverlay(); renderSearch($('#searchInput').value);
  setTimeout(() => $('#searchInput').focus(), 50);
}
function closeSearch() {
  const so = $('#searchOverlay'); so.classList.remove('open'); so.setAttribute('aria-hidden', 'true'); syncOverlay();
}

/* ---------- lightbox ---------- */
const LB = { urls: [], alts: [], i: 0 };
function openLightbox(urls, alts, i) {
  LB.urls = urls; LB.alts = alts; LB.i = i; showLB();
  const lb = $('#lightbox'); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); syncOverlay();
  $('#lbClose').focus();
}
function showLB() { const im = $('#lbImg'); im.src = LB.urls[LB.i]; im.alt = LB.alts[LB.i] || ''; }
function stepLB(d) { LB.i = (LB.i + d + LB.urls.length) % LB.urls.length; showLB(); }
function closeLightbox() { const lb = $('#lightbox'); lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); syncOverlay(); }

/* ---------- product cards ---------- */
function priceHTML(price, old) {
  return `<span class="price-now">${fmt(price)}</span>` + (old ? ` <s class="price-old">${fmt(old)}</s>` : '');
}
function badgeFor(p) {
  if (p.soldOut) return '<span class="badge badge-dark">Sold out</span>';
  if (p.oldPrice) return '<span class="badge badge-gold">Sale</span>';
  if (p.tags.includes('new')) return '<span class="badge">New</span>';
  if (p.tags.includes('bestseller')) return '<span class="badge badge-dark">Best seller</span>';
  return '';
}
function cardHTML(p, i) {
  const href = 'product.html?id=' + encodeURIComponent(p.id);
  const meta = p.cat === 'gift-sets' ? 'Gift set' : p.variants[p.def].size + ' · ' + p.concentration;
  return `<article class="card reveal" style="--d:${(i % 4) * 70}ms">
    <div class="card-media-wrap">
      <a class="card-media" href="${href}" aria-label="${esc(p.name)}">
        <img class="img-a" src="${productImage(p, 0)}" alt="${esc(productImageAlt(p, 0))}" width="400" height="500" loading="lazy">
        <img class="img-b" src="${productImage(p, 2)}" alt="" width="400" height="500" loading="lazy">
        ${badgeFor(p)}
      </a>
      <button type="button" class="quick-add" data-add="${esc(p.id)}" ${p.soldOut ? 'disabled' : ''}>${p.soldOut ? 'Sold out' : 'Quick add'}</button>
    </div>
    <div class="card-body">
      <p class="card-cat">${esc(categoryName(p.cat))}</p>
      <h3 class="card-title"><a href="${href}">${esc(p.name)}</a></h3>
      <p class="card-meta">${esc(meta)}</p>
      <p class="price">${priceHTML(p.price, p.oldPrice)}</p>
    </div>
  </article>`;
}
function renderGrid(el, list) { el.innerHTML = list.map(cardHTML).join(''); observeReveal(el); }

/* ---------- reveal on scroll ---------- */
let _io;
function observeReveal(root) {
  const els = $$('.reveal:not(.in)', root || document);
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  if (!_io) _io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); _io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  els.forEach(e => _io.observe(e));
}

/* ---------- generic image hydration ---------- */
function hydrateImages() {
  $$('[data-free]').forEach(e => { e.textContent = fmt(STORE.delivery.freeOver); });
  $$('[data-ship]').forEach(e => { e.textContent = fmt(STORE.delivery.flat); });
  $$('img[data-product]').forEach(im => {
    const p = getProduct(im.dataset.product); if (!p) return;
    const v = parseInt(im.dataset.view || '0', 10);
    im.src = productImage(p, v); if (!im.alt) im.alt = productImageAlt(p, v);
  });
}

/* ---------- forms (contact / newsletter) ---------- */
const validEmail = s => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
function initForms() {
  $$('form[data-form]').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const kind = form.dataset.form;
      const status = $('.form-status', form);
      const set = (m, ok) => { status.textContent = m; status.className = 'form-status ' + (ok ? 'ok' : 'err'); };
      const data = Object.fromEntries(new FormData(form).entries());
      $$('.invalid', form).forEach(x => x.classList.remove('invalid'));
      const bad = [];
      if (!validEmail((data.email || '').trim())) bad.push('email');
      if (kind === 'contact') {
        if ((data.name || '').trim().length < 2) bad.push('name');
        if ((data.message || '').trim().length < 10) bad.push('message');
        if (data.phone && data.phone.replace(/\D/g, '').length < 7) bad.push('phone');
      }
      if (bad.length) {
        bad.forEach(n => { const f = form.elements[n]; if (f) f.classList.add('invalid'); });
        set(bad.includes('email') ? 'Please enter a valid email address.' : 'Please check the highlighted fields.', false);
        const f = form.elements[bad[0]]; if (f) f.focus();
        return;
      }
      if (STORE.formEndpoint) {
        try {
          const r = await fetch(STORE.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(Object.assign({ form: kind }, data)) });
          if (!r.ok) throw new Error('bad status');
          set(kind === 'contact' ? 'Thank you. Your message has been sent.' : 'Thank you. You are on the list.', true);
          form.reset();
        } catch (err) { set('Sorry, that did not go through. Please try again or email us directly.', false); }
        return;
      }
      const subject = kind === 'contact' ? 'Message from ' + data.name.trim() : 'Newsletter subscription';
      const body = kind === 'contact'
        ? `Name: ${data.name.trim()}\nEmail: ${data.email.trim()}\nPhone: ${(data.phone || '').trim()}\n\n${data.message.trim()}`
        : `Please add ${data.email.trim()} to your email list.`;
      set('Opening your email app to send this. If nothing opens, write to ' + STORE.email + '.', true);
      location.href = 'mailto:' + STORE.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  });
}

/* ---------- home ---------- */
function initHome() {
  $$('[data-list]').forEach(el => {
    const [type, val] = el.dataset.list.split(':');
    const limit = parseInt(el.dataset.limit || '4', 10);
    let list = PRODUCTS.filter(p => type === 'tag' ? p.tags.includes(val) : p.cat === val);
    renderGrid(el, list.slice(0, limit));
  });
  const slider = $('#hero');
  if (!slider) return;
  const slides = $$('.slide', slider), dots = $$('.dot', slider);
  let i = 0, timer = null;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const show = n => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => { s.classList.toggle('active', k === i); s.setAttribute('aria-hidden', k === i ? 'false' : 'true'); $$('a', s).forEach(a => a.tabIndex = k === i ? 0 : -1); });
    dots.forEach((d, k) => { d.classList.toggle('active', k === i); d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
  };
  const play = () => { if (reduce) return; stop(); timer = setInterval(() => show(i + 1), 6000); };
  const stop = () => { if (timer) clearInterval(timer); timer = null; };
  $('.hero-prev', slider).addEventListener('click', () => { show(i - 1); play(); });
  $('.hero-next', slider).addEventListener('click', () => { show(i + 1); play(); });
  dots.forEach((d, k) => d.addEventListener('click', () => { show(k); play(); }));
  slider.addEventListener('mouseenter', stop); slider.addEventListener('mouseleave', play);
  slider.addEventListener('focusin', stop); slider.addEventListener('focusout', play);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : play());
  show(0); play();
}

/* ---------- shop ---------- */
function initShop() {
  const PAGE = 12;
  const prm = new URLSearchParams(location.search);
  const st = { cat: prm.get('cat') || '', tag: prm.get('tag') || '', q: prm.get('q') || '', sort: prm.get('sort') || 'featured', price: prm.get('price') || '', stock: prm.get('stock') === '1', shown: PAGE };
  if (!CATEGORIES.some(c => c.id === st.cat)) st.cat = '';
  if (!['new', 'bestseller'].includes(st.tag)) st.tag = '';
  const sorts = ['featured', 'bestselling', 'az', 'za', 'price-asc', 'price-desc', 'new'];
  if (!sorts.includes(st.sort)) st.sort = 'featured';
  const ranges = { '0-5000': [0, 5000], '5000-10000': [5000, 10000], '10000-15000': [10000, 15000], '15000+': [15000, 1e9] };
  if (!ranges[st.price]) st.price = '';

  const grid = $('#shopGrid'), count = $('#shopCount'), more = $('#loadMore');
  const sel = $('#sortSelect'); sel.value = st.sort;
  const searchField = $('#shopSearch'); searchField.value = st.q;

  function filtered() {
    let list = PRODUCTS.slice();
    if (st.cat) list = list.filter(p => p.cat === st.cat);
    if (st.tag) list = list.filter(p => p.tags.includes(st.tag));
    if (st.q) { const ids = new Set(searchProducts(st.q).map(p => p.id)); list = list.filter(p => ids.has(p.id)); }
    if (st.price) { const [a, b] = ranges[st.price]; list = list.filter(p => p.price >= a && p.price < b); }
    if (st.stock) list = list.filter(p => !p.soldOut);
    const tagRank = (p, t) => p.tags.includes(t) ? 0 : 1;
    const sorters = {
      featured: (a, b) => a.order - b.order,
      bestselling: (a, b) => tagRank(a, 'bestseller') - tagRank(b, 'bestseller') || a.order - b.order,
      az: (a, b) => a.name.localeCompare(b.name),
      za: (a, b) => b.name.localeCompare(a.name),
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      new: (a, b) => tagRank(a, 'new') - tagRank(b, 'new') || b.order - a.order
    };
    return list.sort(sorters[st.sort]);
  }
  function syncURL() {
    const p = new URLSearchParams();
    if (st.cat) p.set('cat', st.cat); if (st.tag) p.set('tag', st.tag); if (st.q) p.set('q', st.q);
    if (st.sort !== 'featured') p.set('sort', st.sort); if (st.price) p.set('price', st.price); if (st.stock) p.set('stock', '1');
    const s = p.toString();
    try { history.replaceState(null, '', location.pathname + (s ? '?' + s : '')); } catch (e) { /* file:// */ }
  }
  function heading() {
    let t = 'All Fragrances', d = 'Explore the full Perfume Paragon collection, from fresh everyday scents to rare extraits.';
    if (st.q) { t = 'Search results'; d = 'Showing fragrances matching “' + st.q + '”.'; }
    else if (st.tag === 'new') { t = 'New Arrivals'; d = 'The newest additions to the collection.'; }
    else if (st.tag === 'bestseller') { t = 'Best Sellers'; d = 'The fragrances our customers return to most.'; }
    else if (st.cat) { const c = CATEGORIES.find(c => c.id === st.cat); t = c.name; d = c.blurb; }
    $('#shopTitle').textContent = t; $('#shopDesc').textContent = d;
    document.title = t + ' | Perfume Paragon';
    const bc = $('#shopCrumb'); if (bc) bc.textContent = t;
  }
  function chips() {
    const out = [];
    if (st.cat) out.push(['cat', categoryName(st.cat)]);
    if (st.tag) out.push(['tag', st.tag === 'new' ? 'New arrivals' : 'Best sellers']);
    if (st.q) out.push(['q', '“' + st.q + '”']);
    if (st.price) out.push(['price', { '0-5000': 'Under ' + fmt(5000), '5000-10000': fmt(5000) + ' – ' + fmt(10000), '10000-15000': fmt(10000) + ' – ' + fmt(15000), '15000+': fmt(15000) + ' +' }[st.price]]);
    if (st.stock) out.push(['stock', 'In stock']);
    $('#activeFilters').innerHTML = out.map(([k, v]) => `<button type="button" class="chip" data-clear="${k}">${esc(v)} <span aria-hidden="true">&times;</span><span class="sr-only">Remove filter</span></button>`).join('') +
      (out.length ? '<button type="button" class="link-btn" data-clear="all">Clear all</button>' : '');
  }
  function sidebar() {
    const counts = {}; PRODUCTS.forEach(p => counts[p.cat] = (counts[p.cat] || 0) + 1);
    const catBtn = (id, label, n) => `<li><button type="button" data-cat="${id}" aria-pressed="${st.cat === id && !st.tag}">${esc(label)} <span>${n}</span></button></li>`;
    $('#filterCats').innerHTML = catBtn('', 'All fragrances', PRODUCTS.length) + CATEGORIES.map(c => catBtn(c.id, c.name, counts[c.id] || 0)).join('');
    const pr = [['', 'Any price'], ['0-5000', 'Under ' + fmt(5000)], ['5000-10000', fmt(5000) + ' – ' + fmt(10000)], ['10000-15000', fmt(10000) + ' – ' + fmt(15000)], ['15000+', fmt(15000) + ' and above']];
    $('#filterPrice').innerHTML = pr.map(([v, l]) => `<li><label><input type="radio" name="price" value="${v}" ${st.price === v ? 'checked' : ''}> ${l}</label></li>`).join('');
    $('#filterStock').checked = st.stock;
  }
  function render() {
    const list = filtered();
    heading(); chips();
    const shown = list.slice(0, st.shown);
    count.textContent = list.length ? `Showing ${shown.length} of ${list.length} fragrance${list.length > 1 ? 's' : ''}` : '0 fragrances';
    if (!list.length) {
      grid.innerHTML = `<div class="empty grid-empty"><h3>No fragrances match</h3><p>Try removing a filter or searching for something else.</p><button class="btn btn-dark" type="button" data-clear="all">Clear all filters</button></div>`;
    } else renderGrid(grid, shown);
    const left = list.length - shown.length;
    more.hidden = left <= 0; more.textContent = 'Load more (' + left + ' remaining)';
    $('#filterApply').textContent = 'Show ' + list.length + ' result' + (list.length === 1 ? '' : 's');
    sidebar(); syncURL();
  }
  const reset = () => { st.shown = PAGE; render(); };

  sel.addEventListener('change', () => { st.sort = sel.value; reset(); });
  more.addEventListener('click', () => { st.shown += PAGE; render(); });
  $('#filterCats').addEventListener('click', e => { const b = e.target.closest('[data-cat]'); if (!b) return; st.cat = b.dataset.cat; st.tag = ''; reset(); });
  $('#filterPrice').addEventListener('change', e => { st.price = e.target.value; reset(); });
  $('#filterStock').addEventListener('change', e => { st.stock = e.target.checked; reset(); });
  $('#shopSearchForm').addEventListener('submit', e => { e.preventDefault(); st.q = searchField.value.trim(); reset(); });
  document.addEventListener('click', e => {
    const c = e.target.closest('[data-clear]'); if (!c) return;
    const k = c.dataset.clear;
    if (k === 'all') { st.cat = st.tag = st.q = st.price = ''; st.stock = false; searchField.value = ''; }
    else if (k === 'stock') st.stock = false; else st[k] = '';
    if (k === 'q' || k === 'all') searchField.value = '';
    reset();
  });
  const panel = $('#filterPanel');
  $('#filterToggle').addEventListener('click', () => setLayer('filterPanel', true));
  $('#filterClose').addEventListener('click', () => setLayer('filterPanel', false));
  $('#filterApply').addEventListener('click', () => setLayer('filterPanel', false));
  render();
}

/* ---------- product page ---------- */
function starsHTML(n) { return '<span class="stars" aria-label="' + n + ' out of 5">' + '★'.repeat(n) + '☆'.repeat(5 - n) + '</span>'; }

function initProduct() {
  const root = $('#productRoot');
  const id = new URLSearchParams(location.search).get('id');
  const p = getProduct(id);
  if (!p) {
    root.innerHTML = `<div class="container empty"><h1 class="h2">Fragrance not found</h1><p>That product does not exist or the link is out of date.</p><a class="btn btn-dark" href="shop.html">Browse all fragrances</a></div>`;
    return;
  }
  document.title = p.name + ' | Perfume Paragon';
  const md = $('meta[name="description"]'); if (md) md.content = p.name + ' — ' + p.desc;

  const RV = 'pp_recent_v1';
  let recent = [];
  try { recent = JSON.parse(localStorage.getItem(RV) || '[]'); } catch (e) { recent = []; }
  const others = recent.filter(x => x !== p.id && getProduct(x));
  try { localStorage.setItem(RV, JSON.stringify([p.id, ...others].slice(0, 8))); } catch (e) { /* ignore */ }

  const n = productImageCount(p);
  const urls = Array.from({ length: n }, (_, i) => productImage(p, i));
  const alts = Array.from({ length: n }, (_, i) => productImageAlt(p, i));
  let size = p.variants[p.def].size, qty = 1, view = 0;
  const unit = () => p.variants.find(v => v.size === size).price;
  const notes = ['top', 'heart', 'base'].map(k => `<div class="note"><h4>${{ top: 'Top', heart: 'Heart', base: 'Base' }[k]}</h4><p>${p.notes[k].map(esc).join(', ')}</p></div>`).join('');
  const oldFor = () => p.oldPrice && size === p.variants[p.def].size ? p.oldPrice : 0;

  root.innerHTML = `
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="shop.html?cat=${p.cat}">${esc(categoryName(p.cat))}</a><span>/</span><span aria-current="page">${esc(p.name)}</span></nav>
    <div class="pdp">
      <div class="gallery">
        <div class="thumbs">${urls.map((u, i) => `<button type="button" class="thumb ${i === 0 ? 'active' : ''}" data-i="${i}" aria-label="Show image ${i + 1}"><img src="${u}" alt="" width="80" height="100"></button>`).join('')}</div>
        <div class="main-img" id="mainImg">
          <img id="mainPic" src="${urls[0]}" alt="${esc(alts[0])}" width="800" height="1000">
          ${n > 1 ? `<button type="button" class="icon-btn g-arrow g-prev" aria-label="Previous image">${ICON.left}</button><button type="button" class="icon-btn g-arrow g-next" aria-label="Next image">${ICON.right}</button>` : ''}
          <button type="button" class="icon-btn zoom-btn" id="zoomBtn" aria-label="Open larger view">${ICON.zoom}</button>
          ${badgeFor(p)}
        </div>
      </div>
      <div class="pinfo">
        <p class="eyebrow">${esc(categoryName(p.cat))}</p>
        <h1 class="h2 ptitle">${esc(p.name)}</h1>
        <p class="pconc">${esc(p.concentration)}</p>
        <p class="price price-lg" id="pPrice"></p>
        <p class="muted small">Delivery is calculated at checkout. Free over ${fmt(STORE.delivery.freeOver)}.</p>
        <p class="pdesc">${esc(p.desc)}</p>
        ${p.variants.length > 1 ? `<fieldset class="variants"><legend>Size</legend><div role="radiogroup" aria-label="Size">${p.variants.map(v => `<button type="button" role="radio" class="variant" data-size="${esc(v.size)}" aria-checked="${v.size === size}">${esc(v.size)}</button>`).join('')}</div></fieldset>` : ''}
        <div class="buy-row">
          <div class="qty qty-lg" role="group" aria-label="Quantity"><button type="button" id="qMinus" aria-label="Decrease quantity">&minus;</button><span id="qVal" class="qty-val" aria-live="polite">1</span><button type="button" id="qPlus" aria-label="Increase quantity">+</button></div>
          <button type="button" class="btn btn-dark btn-grow" id="addBtn" ${p.soldOut ? 'disabled' : ''}>${p.soldOut ? 'Sold out' : 'Add to cart'}</button>
        </div>
        <button type="button" class="btn btn-gold btn-block" id="buyBtn" ${p.soldOut ? 'disabled' : ''}>Buy now</button>
        <ul class="assure"><li>${p.soldOut ? 'Currently unavailable' : 'In stock'}</li><li>Delivery ${fmt(STORE.delivery.flat)}, free over ${fmt(STORE.delivery.freeOver)}</li></ul>
        <div class="acc">
          <details open><summary>Fragrance notes</summary><div class="acc-body notes">${notes}</div></details>
          <details><summary>Details</summary><div class="acc-body"><dl class="specs"><dt>Concentration</dt><dd>${esc(p.concentration)}</dd><dt>Collection</dt><dd>${esc(categoryName(p.cat))}</dd><dt>Sizes</dt><dd>${p.variants.map(v => esc(v.size)).join(', ')}</dd></dl></div></details>
          <details><summary>Delivery &amp; returns</summary><div class="acc-body"><p>Delivery is ${fmt(STORE.delivery.flat)} per order and free on orders over ${fmt(STORE.delivery.freeOver)}. If your order arrives damaged or incorrect, contact us and we will make it right. See <a href="about.html#delivery">Delivery &amp; Returns</a>.</p></div></details>
        </div>
      </div>
    </div>
  </div>
  <section class="section" id="reviewsSec"><div class="container narrow">
    <h2 class="h3 center">Reviews</h2>
    <div id="reviewList"></div>
    <form id="reviewForm" class="review-form" novalidate>
      <h3 class="h4">Write a review</h3>
      <div class="field-row">
        <div class="field"><label for="rvName">Name</label><input id="rvName" name="name" type="text" autocomplete="name"></div>
        <div class="field"><label for="rvRating">Rating</label><select id="rvRating" name="rating"><option value="5">5 – Excellent</option><option value="4">4 – Very good</option><option value="3">3 – Good</option><option value="2">2 – Fair</option><option value="1">1 – Poor</option></select></div>
      </div>
      <div class="field"><label for="rvText">Your review</label><textarea id="rvText" name="text" rows="4"></textarea></div>
      <button class="btn btn-dark" type="submit">Submit review</button>
      <p class="form-status" role="status"></p>
      <p class="muted small">Reviews you write are saved on this device.</p>
    </form>
  </div></section>
  <section class="section section-cream" id="relatedSec"><div class="container"><h2 class="h3 center">You may also like</h2><div class="grid grid-4" id="relatedGrid"></div></div></section>
  <section class="section" id="recentSec" hidden><div class="container"><h2 class="h3 center">Recently viewed</h2><div class="grid grid-4" id="recentGrid"></div></div></section>
  <div class="sticky-atc" id="stickyAtc" aria-hidden="true">
    <img src="${urls[0]}" alt="" width="48" height="60"><div><strong>${esc(p.name)}</strong><span id="stickyPrice"></span></div>
    <button type="button" class="btn btn-dark" id="stickyBtn" ${p.soldOut ? 'disabled' : ''} tabindex="-1">${p.soldOut ? 'Sold out' : 'Add to cart'}</button>
  </div>`;

  const setView = i => {
    view = (i + n) % n;
    const pic = $('#mainPic'); pic.src = urls[view]; pic.alt = alts[view];
    $$('.thumb').forEach((t, k) => t.classList.toggle('active', k === view));
  };
  const money = () => { $('#pPrice').innerHTML = priceHTML(unit(), oldFor()); $('#stickyPrice').textContent = fmt(unit() * qty); };
  money();
  $$('.thumb').forEach(t => t.addEventListener('click', () => setView(parseInt(t.dataset.i, 10))));
  const gp = $('.g-prev'), gn = $('.g-next');
  if (gp) { gp.addEventListener('click', () => setView(view - 1)); gn.addEventListener('click', () => setView(view + 1)); }
  const openLB = () => openLightbox(urls, alts, view);
  $('#zoomBtn').addEventListener('click', openLB);
  const mi = $('#mainImg'), pic = $('#mainPic');
  mi.addEventListener('click', e => { if (!e.target.closest('button')) openLB(); });
  if (window.matchMedia('(hover: hover)').matches) {
    mi.addEventListener('mousemove', e => { const r = mi.getBoundingClientRect(); pic.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%'; mi.classList.add('zooming'); });
    mi.addEventListener('mouseleave', () => mi.classList.remove('zooming'));
  }
  $$('.variant').forEach(b => b.addEventListener('click', () => {
    size = b.dataset.size;
    $$('.variant').forEach(x => x.setAttribute('aria-checked', x === b ? 'true' : 'false'));
    money();
  }));
  $('#qMinus').addEventListener('click', () => { qty = Math.max(1, qty - 1); $('#qVal').textContent = qty; money(); });
  $('#qPlus').addEventListener('click', () => { qty = Math.min(10, qty + 1); $('#qVal').textContent = qty; money(); });
  const add = () => { if (Cart.add(p.id, size, qty)) CartUI.open(); };
  $('#addBtn').addEventListener('click', add);
  $('#stickyBtn').addEventListener('click', add);
  $('#buyBtn').addEventListener('click', () => { if (Cart.add(p.id, size, qty)) location.href = 'checkout.html'; });

  const sticky = $('#stickyAtc');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(es => {
      const gone = !es[0].isIntersecting && es[0].boundingClientRect.top < 0;
      sticky.classList.toggle('show', gone); sticky.setAttribute('aria-hidden', gone ? 'false' : 'true');
      $('#stickyBtn').tabIndex = gone ? 0 : -1;
    }).observe($('#addBtn'));
  }

  // reviews (stored on this device only)
  const RK = 'pp_reviews_' + p.id;
  const loadR = () => { try { return JSON.parse(localStorage.getItem(RK) || '[]'); } catch (e) { return []; } };
  const drawR = () => {
    const rs = loadR();
    $('#reviewList').innerHTML = rs.length
      ? `<p class="center muted">${rs.length} review${rs.length > 1 ? 's' : ''} · average ${(rs.reduce((a, r) => a + r.rating, 0) / rs.length).toFixed(1)} / 5</p>` +
        rs.map(r => `<article class="review">${starsHTML(r.rating)}<h4>${esc(r.name)}</h4><p>${esc(r.text)}</p></article>`).join('')
      : '<p class="center muted">No reviews yet. Be the first to share your thoughts.</p>';
  };
  drawR();
  $('#reviewForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, st = $('.form-status', f);
    const name = f.elements.name.value.trim(), text = f.elements.text.value.trim(), rating = parseInt(f.elements.rating.value, 10);
    if (name.length < 2 || text.length < 10) { st.textContent = 'Please add your name and at least a short sentence.'; st.className = 'form-status err'; return; }
    const rs = loadR(); rs.unshift({ name, text, rating });
    try { localStorage.setItem(RK, JSON.stringify(rs.slice(0, 20))); } catch (err) { /* ignore */ }
    f.reset(); drawR(); st.textContent = 'Thank you for your review.'; st.className = 'form-status ok';
  });

  renderGrid($('#relatedGrid'), PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).concat(PRODUCTS.filter(x => x.cat !== p.cat && x.id !== p.id)).slice(0, 4));
  const rv = others.map(getProduct).slice(0, 4);
  if (rv.length) { $('#recentSec').hidden = false; renderGrid($('#recentGrid'), rv); }
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  buildChrome();
  CartUI.init();

  $('#menuBtn').addEventListener('click', () => { setLayer('mobileNav', true); $('#menuBtn').setAttribute('aria-expanded', 'true'); });
  const closeMenu = () => { setLayer('mobileNav', false); $('#menuBtn').setAttribute('aria-expanded', 'false'); };
  $('#menuClose').addEventListener('click', closeMenu);
  $('#cartBtn').addEventListener('click', () => CartUI.open());
  $('#cartClose').addEventListener('click', () => CartUI.close());
  $('#overlay').addEventListener('click', () => { closeMenu(); CartUI.close(); setLayer('filterPanel', false); });
  $('#searchBtn').addEventListener('click', openSearch);
  $('#searchClose').addEventListener('click', closeSearch);
  $('#searchOverlay').addEventListener('click', e => { if (e.target.id === 'searchOverlay') closeSearch(); });
  $('#searchInput').addEventListener('input', e => renderSearch(e.target.value));
  $('#searchForm').addEventListener('submit', e => { if (!$('#searchInput').value.trim()) e.preventDefault(); });
  $('#mobileNav').addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  $('#lbClose').addEventListener('click', closeLightbox);
  $('#lbPrev').addEventListener('click', () => stepLB(-1));
  $('#lbNext').addEventListener('click', () => stepLB(1));
  $('#lightbox').addEventListener('click', e => { if (e.target.id === 'lightbox') closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeLightbox(); closeSearch(); closeMenu(); CartUI.close(); setLayer('filterPanel', false); }
    if ($('#lightbox').classList.contains('open')) { if (e.key === 'ArrowLeft') stepLB(-1); if (e.key === 'ArrowRight') stepLB(1); }
  });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-add]');
    if (b && !b.disabled) { if (Cart.add(b.dataset.add)) CartUI.open(); }
  });

  const hdr = $('#siteHeader'); let tick = false;
  const onScroll = () => { hdr.classList.toggle('scrolled', window.scrollY > 30); tick = false; };
  window.addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  hydrateImages();
  initForms();
  const page = document.body.dataset.page;
  if (page === 'home') initHome();
  if (page === 'shop') initShop();
  if (page === 'product') initProduct();
  if (typeof initCheckout === 'function' && page === 'checkout') initCheckout();
  observeReveal();
});