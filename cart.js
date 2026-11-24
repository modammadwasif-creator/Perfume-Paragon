/* PERFUME PARAGON — cart store (localStorage), drawer and cart page rendering */

const fmt = n => STORE.currency + Math.round(n).toLocaleString('en-US');

const Cart = (() => {
  const KEY = 'pp_cart_v1';
  let items = [];

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
      items = Array.isArray(raw) ? raw.filter(i => i && getProduct(i.id) && i.qty > 0) : [];
    } catch (e) { items = []; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* storage unavailable */ }
    document.dispatchEvent(new CustomEvent('cart:change'));
  }
  function variantFor(p, size) {
    return p.variants.find(v => v.size === size) || p.variants[p.def];
  }
  function add(id, size, qty) {
    const p = getProduct(id);
    if (!p || p.soldOut) return false;
    const v = variantFor(p, size);
    qty = Math.max(1, Math.min(10, parseInt(qty, 10) || 1));
    const line = items.find(i => i.id === id && i.size === v.size);
    if (line) line.qty = Math.min(10, line.qty + qty); else items.push({ id, size: v.size, qty });
    save();
    return true;
  }
  function setQty(id, size, qty) {
    const line = items.find(i => i.id === id && i.size === size);
    if (!line) return;
    qty = parseInt(qty, 10) || 1;
    if (qty < 1) return remove(id, size);
    line.qty = Math.min(10, qty);
    save();
  }
  function remove(id, size) {
    items = items.filter(i => !(i.id === id && i.size === size));
    save();
  }
  function clear() { items = []; save(); }
  function lines() {
    return items.map(i => {
      const product = getProduct(i.id);
      const variant = variantFor(product, i.size);
      return { id: i.id, size: variant.size, qty: i.qty, product, unit: variant.price, total: variant.price * i.qty };
    });
  }
  const count = () => items.reduce((n, i) => n + i.qty, 0);
  const subtotal = () => lines().reduce((n, l) => n + l.total, 0);
  function shipping(sub) {
    if (sub === undefined) sub = subtotal();
    if (sub <= 0) return 0;
    return sub >= STORE.delivery.freeOver ? 0 : STORE.delivery.flat;
  }
  const total = () => subtotal() + shipping();
  load();
  return { add, setQty, remove, clear, lines, count, subtotal, shipping, total, reload: load };
})();

/* ---- shared line renderer ---- */
function cartLineHTML(l, compact) {
  const p = l.product;
  const href = 'product.html?id=' + encodeURIComponent(p.id);
  const sizeLabel = l.size === 'Gift set' ? 'Gift set' : l.size;
  return `<li class="cart-line" data-id="${esc(l.id)}" data-size="${esc(l.size)}">
    <a class="cart-thumb" href="${href}"><img src="${productImage(p, 0)}" alt="${esc(productImageAlt(p, 0))}" width="80" height="100" loading="lazy"></a>
    <div class="cart-info">
      <a class="cart-name" href="${href}">${esc(p.name)}</a>
      <p class="cart-variant">${esc(sizeLabel)} · ${fmt(l.unit)}</p>
      <div class="cart-controls">
        <div class="qty" role="group" aria-label="Quantity for ${esc(p.name)}">
          <button type="button" data-act="dec" aria-label="Decrease quantity">&minus;</button>
          <span class="qty-val" aria-live="polite">${l.qty}</span>
          <button type="button" data-act="inc" aria-label="Increase quantity">+</button>
        </div>
        <button type="button" class="link-btn" data-act="remove">Remove</button>
      </div>
    </div>
    <p class="cart-line-total">${fmt(l.total)}</p>
  </li>`;
}

function bindCartLines(root) {
  root.addEventListener('click', e => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const li = btn.closest('.cart-line');
    if (!li) return;
    const id = li.dataset.id, size = li.dataset.size;
    const line = Cart.lines().find(l => l.id === id && l.size === size);
    if (!line) return;
    if (btn.dataset.act === 'inc') Cart.setQty(id, size, line.qty + 1);
    else if (btn.dataset.act === 'dec') Cart.setQty(id, size, line.qty - 1);
    else if (btn.dataset.act === 'remove') Cart.remove(id, size);
  });
}

function shippingNote(sub) {
  const free = STORE.delivery.freeOver;
  if (sub <= 0) return '';
  if (sub >= free) return 'You have unlocked free delivery.';
  return 'Add ' + fmt(free - sub) + ' more for free delivery.';
}

/* ---- drawer ---- */
const CartUI = {
  init() {
    const body = document.getElementById('cartDrawerBody');
    const foot = document.getElementById('cartDrawerFoot');
    if (body) bindCartLines(body);
    document.addEventListener('cart:change', () => { this.updateCount(); this.renderDrawer(); this.renderPage(); });
    this.updateCount(); this.renderDrawer(); this.renderPage();
    const pageList = document.getElementById('cartPageList');
    if (pageList) bindCartLines(pageList);
  },
  updateCount() {
    const n = Cart.count();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = n;
      el.classList.toggle('has-items', n > 0);
    });
  },
  renderDrawer() {
    const body = document.getElementById('cartDrawerBody');
    const foot = document.getElementById('cartDrawerFoot');
    if (!body || !foot) return;
    const lines = Cart.lines();
    if (!lines.length) {
      body.innerHTML = `<div class="empty"><h3>Your cart is empty</h3><p>Discover a fragrance you will love.</p><a class="btn btn-dark" href="shop.html">Continue shopping</a></div>`;
      foot.hidden = true;
      return;
    }
    body.innerHTML = '<ul class="cart-lines">' + lines.map(l => cartLineHTML(l, true)).join('') + '</ul>';
    const sub = Cart.subtotal();
    foot.hidden = false;
    foot.innerHTML = `<p class="free-note">${shippingNote(sub)}</p>
      <div class="sum-row"><span>Subtotal</span><strong>${fmt(sub)}</strong></div>
      <p class="muted small">Delivery is calculated at checkout.</p>
      <a class="btn btn-gold btn-block" href="checkout.html">Checkout</a>
      <a class="btn btn-ghost btn-block" href="cart.html">View cart</a>`;
  },
  renderPage() {
    const list = document.getElementById('cartPageList');
    if (!list) return;
    const wrap = document.getElementById('cartPageWrap');
    const empty = document.getElementById('cartEmpty');
    const lines = Cart.lines();
    if (!lines.length) { wrap.hidden = true; empty.hidden = false; return; }
    wrap.hidden = false; empty.hidden = true;
    list.innerHTML = lines.map(l => cartLineHTML(l, false)).join('');
    const sub = Cart.subtotal(), ship = Cart.shipping(sub);
    document.getElementById('cartSub').textContent = fmt(sub);
    document.getElementById('cartShip').textContent = ship === 0 ? 'Free' : fmt(ship);
    document.getElementById('cartTotal').textContent = fmt(sub + ship);
    document.getElementById('cartFreeNote').textContent = shippingNote(sub);
  },
  open() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('no-scroll');
    document.getElementById('cartDrawer').setAttribute('aria-hidden', 'false');
    const c = document.getElementById('cartClose'); if (c) c.focus();
  },
  close() {
    const d = document.getElementById('cartDrawer');
    if (!d) return;
    d.classList.remove('open');
    d.setAttribute('aria-hidden', 'true');
    syncOverlay();
  }
};