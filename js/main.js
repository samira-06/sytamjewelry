// ==================== DATA ====================
function dbOpen(){
  return new Promise((resolve, reject) => {
    const r = indexedDB.open('sytam_imgs', 1);
    r.onupgradeneeded = e => e.target.result.createObjectStore('imgs', {keyPath: 'id'});
    r.onsuccess = e => resolve(e.target.result);
    r.onerror = e => reject(e.target.error);
  });
}
let imgCache = {};
function dbLoadAll(){
  return dbOpen().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction('imgs', 'readonly');
    const r = tx.objectStore('imgs').getAll();
    r.onsuccess = () => {
      r.result.forEach(item => imgCache[item.id] = item.data);
      resolve();
    };
    r.onerror = e => reject(e.target.error);
  })).catch(() => {});
}
function getImgSrc(p, idx){
  const i = idx || 0;
  if(p.images && p.images.length > i){
    const cached = imgCache['p'+p.id+'_'+i];
    if (cached && cached.length > 100) return cached;
    if (p.images[i] && p.images[i].length > 100) return p.images[i];
  }
  if(i===0){
    const cached = imgCache['p'+p.id];
    if (cached && cached.length > 100) return cached;
    if (p.image && p.image.length > 100) return p.image;
  }
  return '';
}
function getImgCount(p){
  if(p.images && p.images.length) return p.images.length;
  if(imgCache['p'+p.id] || (p.image && p.image.length > 100)) return 1;
  return 0;
}
// SVG icons (subset)
function ic(n,sz){
  const a={w:sz||16,h:sz||16};
  const i={
    diamond:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 12l10 10 10-10L12 2z"/><path d="M2 12h20"/><path d="M12 2l-4 10 4 10 4-10-4-10z"/></svg>',
    earrings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="12" r="4"/><circle cx="17" cy="12" r="4"/><path d="M7 16v-4"/><path d="M17 16v-4"/></svg>',
    bracelet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M3 12h18"/><circle cx="12" cy="12" r="4"/></svg>',
    necklace:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><path d="M12 8v3"/><path d="M12 11c-3 0-6 3-6 6v4"/><path d="M12 11c3 0 6 3 6 6v4"/></svg>',
    ring:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8 14l-2 7h12l-2-7"/></svg>',
    set:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="8" height="6"/><rect x="14" y="3" width="8" height="6"/><rect x="2" y="15" width="8" height="6"/><rect x="14" y="15" width="8" height="6"/></svg>',
    star:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    ankle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18c3-2 6-2 8 0s5 2 8 0"/><path d="M4 6c3 2 6 2 8 0s5-2 8 0"/><circle cx="12" cy="12" r="1"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    sparkles:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 5 5 1.5-5 1.5L12 16l-1.5-5-5-1.5 5-1.5L12 3z"/><circle cx="18" cy="6" r="1"/><circle cx="6" cy="18" r="1"/><circle cx="20" cy="18" r="1.5"/><circle cx="4" cy="8" r="1"/></svg>',
    gift:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
    edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>',
    wallet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg>',
    handshake:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>',
    hammer:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12l-8.5 8.5a2.12 2.12 0 0 1-3-3L12 9"/><path d="M17 7l-3 3"/><path d="M21 3l-3 3"/><path d="M9 15l3 3"/><path d="M4 20l3-3"/></svg>',
    phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    drop:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
    leaf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
    ribbon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  };
  const s=i[n]||'';
  return `<span class="ic" style="width:${a.w}px;height:${a.h}px">${s}</span>`;
}
dbLoadAll();
let products = (() => {
  try {
    const p = JSON.parse(localStorage.getItem('sytamProducts'));
    if (Array.isArray(p) && p.length) return p;
  } catch(e) {}
  return [
  { id:1,  name:"Spiral Twist",        category:"Boucles d'oreilles", price:2500,  stock:15, sold:8,  image:"", badge:null,       promo:null, colors:[] },
  { id:2,  name:"Bow Heart",           category:"Boucles d'oreilles", price:2500,  stock:12, sold:5,  image:"", badge:null,       promo:null, colors:[] },
  { id:3,  name:"Knot",                category:"Boucles d'oreilles", price:2500,  stock:20, sold:12, image:"", badge:"Populaire", promo:null, colors:["#C9A96E","#C0C0C8"] },
  { id:4,  name:"Petal",               category:"Boucles d'oreilles", price:2500,  stock:8,  sold:6,  image:"", badge:null,       promo:null, colors:[] },
  { id:5,  name:"Ball",                category:"Boucles d'oreilles", price:2500,  stock:18, sold:9,  image:"", badge:null,       promo:null, colors:["#C9A96E","#C0C0C8","#E8A0B4"] },
  { id:6,  name:"Half Hoop",           category:"Boucles d'oreilles", price:2500,  stock:14, sold:7,  image:"", badge:null,       promo:null, colors:[] },
  { id:7,  name:"Croissant",           category:"Boucles d'oreilles", price:2500,  stock:10, sold:11, image:"", badge:null,       promo:null, colors:[] },
  { id:8,  name:"Double Twist",        category:"Boucles d'oreilles", price:2500,  stock:16, sold:4,  image:"", badge:null,       promo:null, colors:["#C9A96E","#C0C0C8"] },
  { id:9,  name:"Bracelet Duo Gogo",   category:"Bracelets",          price:3000,  stock:7,  sold:15, image:"", badge:"Nouveau",  promo:null, colors:["#C9A96E","#C0C0C8"] },
  { id:10, name:"Bracelet Infini Duo", category:"Bracelets",          price:3000,  stock:9,  sold:10, image:"", badge:null,       promo:null, colors:[] },
  { id:11, name:"Van Cleef",           category:"Bracelets",          price:3000,  stock:5,  sold:18, image:"", badge:"Populaire",promo:null, colors:["#C9A96E","#4CAF50","#E8A0B4"] },
  { id:12, name:"Van Cleef Trio Vert", category:"Bracelets",          price:9000,  stock:4,  sold:6,  image:"", badge:null,       promo:null, colors:[] },
  { id:13, name:"Keykey",              category:"Colliers",           price:8500,  stock:6,  sold:8,  image:"", badge:null,       promo:null, colors:[] },
  { id:14, name:"Cheese",              category:"Colliers",           price:1300,  stock:3,  sold:20, image:"", badge:null,       promo:null, colors:[] },
  { id:15, name:"Burger",              category:"Colliers",           price:1300,  stock:2,  sold:14, image:"", badge:null,       promo:null, colors:[] },
  { id:16, name:"Drop",                category:"Colliers",           price:2500,  stock:11, sold:5,  image:"", badge:null,       promo:null, colors:[] },
  { id:17, name:"Baby Girl",           category:"Sets",               price:15000, stock:3,  sold:4,  image:"", badge:"Premium",  promo:null, colors:[] },
  { id:18, name:"Sugar Woman",         category:"Sets",               price:20000, stock:2,  sold:2,  image:"", badge:"Premium",  promo:null, colors:[] },
  { id:19, name:"Half Oval",           category:"Bagues",             price:2500,  stock:13, sold:7,  image:"", badge:null,       promo:null, colors:[], sizes:[{name:"50",stock:3},{name:"52",stock:3},{name:"54",stock:3},{name:"56",stock:2},{name:"58",stock:1},{name:"60",stock:1}] },
  { id:20, name:"Knot Ring",           category:"Bagues",             price:2500,  stock:10, sold:9,  image:"", badge:null,       promo:null, colors:[], sizes:[{name:"50",stock:2},{name:"52",stock:2},{name:"54",stock:2},{name:"56",stock:2},{name:"58",stock:1},{name:"60",stock:1}] },
  { id:21, name:"Chaîne Dorée Fine",   category:"Chaînes de cheville",price:2500,  stock:12, sold:6,  image:"", badge:"Nouveau",  promo:null, colors:[] },
  { id:22, name:"Cheville Perle",      category:"Chaînes de cheville",price:2500,  stock:8,  sold:3,  image:"", badge:null,       promo:null, colors:[] },
  { id:23, name:"Cheville Boule",      category:"Chaînes de cheville",price:2000,  stock:15, sold:9,  image:"", badge:null,       promo:null, colors:[] },
  { id:24, name:"Cheville Papillon",   category:"Chaînes de cheville",price:2500,  stock:10, sold:4,  image:"", badge:null,       promo:null, colors:[] }
  ];
})();

let orders = JSON.parse(localStorage.getItem('sytamOrders') || '[]');
let cart = [];
let currentDelivery = { zone:'Dakar Centre', price:2000 };
let currentPayment = 'wave';
let currentFilter = 'all';
let currentPriceMax = 25000;

function saveProducts() {
  localStorage.setItem('sytamProducts', JSON.stringify(products));
  fbSaveProducts(products).catch(e => console.warn('Product sync fail:', e));
}

const payIcons = {
  wave: '<img src="images/wave.png" style="height:28px;vertical-align:middle;margin-right:6px;object-fit:contain" alt="Wave">',
  orange: '<img src="images/orange.jpg" style="height:28px;vertical-align:middle;margin-right:6px;object-fit:contain" alt="Orange Money">',
  free: '<img src="images/free.png" style="height:28px;vertical-align:middle;margin-right:6px;object-fit:contain" alt="Free Money">',
};
const paymentInfos = {
  wave:  `<strong>${payIcons.wave}Paiement Wave</strong><br>Envoyez le montant au :<br><span class="num">77 478 98 75</span><div class="note">⚠️ Joignez une capture d'écran sur WhatsApp pour confirmation.</div>`,
  orange:`<strong>${payIcons.orange}Paiement Orange Money</strong><br>Envoyez le montant au :<br><span class="num">77 478 98 75</span><div class="note">⚠️ Tapez *144# → "Envoyer de l'argent". Envoyez le reçu sur WhatsApp.</div>`,
  free:  `<strong>${payIcons.free}Paiement Free Money</strong><br>Envoyez le montant au :<br><span class="num">76 443 02 18</span><div class="note">⚠️ Indiquez "Sytam Jewelry" en référence. Envoyez le reçu sur WhatsApp.</div>`,
};

function isValidPhone(v){
  return v.replace(/\D/g,'').length >= 8;
}

const categoryIcons = {
  "Boucles d'oreilles":ic('earrings',56),"Bracelets":ic('bracelet',56),"Colliers":ic('necklace',56),"Bagues":ic('ring',56),"Sets":ic('set',56),"Personnalisé":ic('star',56),"Chaînes de cheville":ic('ankle',56)
};
function catIcon(cat){ return categoryIcons[cat]||ic('diamond',56); }
const catLabels = {"Boucles d'oreilles":"Boucles","Bracelets":"Bracelet","Colliers":"Collier","Bagues":"Bague","Sets":"Set","Personnalisé":"Sur mesure","Chaînes de cheville":"Cheville"};
function catLabel(cat){ return catLabels[cat]||'Bijou'; }

const colorNames = {
  "#C9A96E":"Doré","#C0C0C8":"Argenté","#E8A0B4":"Rose Gold","#4CAF50":"Vert",
  "#FF6B6B":"Rouge","#74B9FF":"Bleu","#FDCB6E":"Jaune","#2D3436":"Noir","#FFFFFF":"Blanc","#A29BFE":"Violet"
};

// Track visit
const today2 = new Date().toISOString().slice(0,10);
let visits2 = JSON.parse(localStorage.getItem('sytamVisits') || '{}');
visits2[today2] = (visits2[today2]||0)+1;
localStorage.setItem('sytamVisits', JSON.stringify(visits2));

// ==================== NAVIGATION ====================
function toggleMobileNav(){
  document.querySelector('.nav-links').classList.toggle('open');
}
function showPage(name) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  const el = document.getElementById('nav-'+name);
  if(el) el.classList.add('active');
  document.querySelector('.nav-links').classList.remove('open');
  window.scrollTo(0,0);
  if(name==='shop'){ currentFilter='all'; document.querySelectorAll('.filter-btn').forEach(b=>b.classList.toggle('active',b.textContent.includes('Tous'))); renderProducts(); }
  if(name==='cart') renderCart();
}

function filterAndGoShop(cat) {
  currentFilter = cat;
  showPage('shop');
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.filter-btn').forEach(b=>{
    if(b.textContent.trim().startsWith(cat.substring(0,5))) b.classList.add('active');
  });
}

// ==================== PRODUCTS ====================
function effectivePrice(p) { return p.promo ? Math.round(p.price*(1-p.promo/100)) : p.price; }

function filterProducts(cat, el) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  if(el) el.classList.add('active');
  renderProducts();
}

function updatePriceFilter(val) {
  currentPriceMax = parseInt(val);
  document.getElementById('priceMax').textContent = parseInt(val).toLocaleString('fr')+' FCFA';
  renderProducts();
}

function sortProducts(val) { renderProducts(val); }

function renderProducts(sortBy) {
  let list = [...products];
  if(currentFilter !== 'all') list = list.filter(p=>p.category===currentFilter);
  list = list.filter(p=>effectivePrice(p)<=currentPriceMax);
  if(sortBy==='price-asc') list.sort((a,b)=>effectivePrice(a)-effectivePrice(b));
  else if(sortBy==='price-desc') list.sort((a,b)=>effectivePrice(b)-effectivePrice(a));
  else if(sortBy==='name') list.sort((a,b)=>a.name.localeCompare(b.name));

  const grid = document.getElementById('productsGrid');
  document.getElementById('shopCount').textContent = list.length+' produit'+(list.length>1?'s':'');

  if(!list.length){
    grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-light);">Aucun produit trouvé.</div>';
    return;
  }

  grid.innerHTML = list.map(p=>{
    const ep = effectivePrice(p);
    const src = getImgSrc(p); const imgContent = src
      ? `<img src="${src}" alt="${p.name}" style="width:100%;height:100%;object-fit:contain;" onerror="this.style.display='none'">`
      : `<span style="font-size:3.5rem;">${catIcon(p.category)}</span>`;
    return `
    <div class="product-card" onclick="openProduct(${p.id})">
      <div class="product-img">
        ${imgContent}
        ${p.badge?`<div class="product-badge">${p.badge}</div>`:''}
        ${p.promo?`<div class="product-badge" style="left:auto;right:10px;background:#E67E22;">-${p.promo}%</div>`:''}
        ${p.stock===0?`<div class="stock-badge" style="position:absolute;bottom:10px;left:10px;background:var(--danger);color:#fff;padding:4px 10px;border-radius:6px;font-size:.7rem;font-weight:700;">Rupture</div>`:''}
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-bottom">
          <div>
            <span class="product-price">${ep.toLocaleString('fr')} FCFA</span>
            ${p.promo?`<span style="font-size:0.78rem;color:var(--text-light);text-decoration:line-through;margin-left:4px;">${p.price.toLocaleString('fr')}</span>`:''}
          </div>
          ${p.stock>0
            ?`<button class="add-to-cart" onclick="event.stopPropagation();addToCart(${p.id})">+ Panier</button>`
            :`<span style="font-size:0.72rem;color:var(--danger);font-weight:600;">Rupture</span>`}
        </div>
      </div>
    </div>`;
  }).join('');
}

const selectedColors = {};
const selectedColorNames = {};
const selectedSizes = {};
function initFirstDefaults() {
  products.forEach(p => {
    if (p.colors && p.colors.length > 0) {
      const c = typeof p.colors[0] === 'object' ? p.colors[0] : { hex: p.colors[0], name: p.colors[0] };
      selectedColors[p.id] = c.hex;
      selectedColorNames[p.id] = c.name;
    }
    if (p.sizes && p.sizes.length > 0) {
      const first = typeof p.sizes[0]==='object' ? p.sizes[0].name : p.sizes[0];
      selectedSizes[p.id] = first;
    }
  });
}
initFirstDefaults();
function openProduct(id) {
  const p = products.find(x=>x.id===id);
  const ep = effectivePrice(p);
  const imgCount = getImgCount(p);
  if(!window._galIdx) window._galIdx = {};
  if(window._galIdx[id]===undefined) window._galIdx[id]=0;
  function galHtml(){
    const idx = window._galIdx[id]||0;
    const src = getImgSrc(p, idx);
    if(!src) return `<div style="font-size:5rem;text-align:center;padding:2rem;background:linear-gradient(135deg,var(--cream),rgba(74,15,27,0.1));border-radius:12px;">${catIcon(p.category)}</div>`;
    let dots = '';
    if(imgCount>1){
      dots = '<div style="display:flex;justify-content:center;gap:6px;margin-top:8px;">';
      for(let i=0;i<imgCount;i++){
        dots += '<span style="width:8px;height:8px;border-radius:50%;background:'+(i===idx?'var(--bordeaux)':'var(--border)')+';cursor:pointer" onclick="window._galIdx['+id+']='+i+';openProduct('+id+')"></span>';
      }
      dots += '</div>';
    }
    return `<div style="position:relative">
      <img src="${src}" alt="${p.name}" style="width:100%;height:200px;object-fit:contain;border-radius:12px;" onerror="this.remove()">
      ${imgCount>1?`
        <span onclick="window._galIdx[${id}]=(${idx}-1+${imgCount})%${imgCount};openProduct(${id})" style="position:absolute;left:4px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.8);border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;font-weight:700;box-shadow:0 2px 6px rgba(0,0,0,0.15);">‹</span>
        <span onclick="window._galIdx[${id}]=(${idx}+1)%${imgCount};openProduct(${id})" style="position:absolute;right:4px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.8);border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;font-weight:700;box-shadow:0 2px 6px rgba(0,0,0,0.15);">›</span>
      `:''}
      ${dots}
    </div>`;
  }
  let colorHtml = '';
  if(p.colors && p.colors.length > 0){
    const items = p.colors.map((c,i)=>{
      const hex = typeof c==='object' ? c.hex : c;
      const name = typeof c==='object' ? (c.name||hex) : hex;
      const sel = selectedColors[id] === hex;
      return `<span onclick="selectColor(${id},${i})" style="display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border:2px solid ${sel?'var(--bordeaux)':'var(--border)'};border-radius:8px;cursor:pointer;font-size:0.75rem;font-weight:600;background:${sel?'rgba(107,26,42,0.05)':'transparent'};transition:all 0.2s;"><span style="width:14px;height:14px;border-radius:3px;background:${hex};display:inline-block;border:1px solid rgba(0,0,0,0.1);flex-shrink:0;"></span>${name}</span>`;
    }).join(' ');
    colorHtml = `<div style="margin-bottom:0.8rem;"><div style="font-size:0.7rem;color:var(--text-light);letter-spacing:1px;text-transform:uppercase;font-weight:600;margin-bottom:6px;">Couleur</div><div style="display:flex;flex-wrap:wrap;gap:6px;">${items}</div></div>`;
  }
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h2>${p.name}</h2>
    ${galHtml()}
    <div style="margin:1rem 0 0.5rem;"><span style="font-size:0.65rem;color:var(--gold);letter-spacing:2px;font-weight:600;text-transform:uppercase;">${p.category}</span></div>
<p style="color:var(--text-light);font-size:0.85rem;line-height:1.7;margin-bottom:0.8rem;">${p.description||'Bijou fantaisie en acier inoxydable haute qualité. Anti-allergie, résistant à l\'eau. Parfait pour un port quotidien.'}</p>
    ${colorHtml}
    ${p.sizes && p.sizes.length > 0 ? `<div style="margin-bottom:0.8rem;"><div style="font-size:0.7rem;color:var(--text-light);letter-spacing:1px;text-transform:uppercase;font-weight:600;margin-bottom:6px;">Taille</div><div style="display:flex;flex-wrap:wrap;gap:6px;">${p.sizes.map(s=>{
      const sn = typeof s==='object' ? s.name : s;
      const ss = typeof s==='object' ? s.stock : 0;
      const sel = selectedSizes[id] === sn;
      const out = ss <= 0;
      return `<span onclick="${out?'':`selectSize(${id},'${sn}')`}" style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:38px;border:2px solid ${sel?'var(--bordeaux)':out?'var(--border)':'var(--border)'};border-radius:8px;cursor:${out?'not-allowed':'pointer'};font-size:0.85rem;font-weight:700;background:${sel?'rgba(107,26,42,0.08)':out?'rgba(0,0,0,0.04)':'transparent'};transition:all 0.2s;opacity:${out?'.4':'1'}">${sn}</span>`;
    }).join('')}</div></div>` : ''}
    <div style="display:flex;justify-content:space-between;align-items:center;padding:1rem 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:1rem;">
      <div>
        <span style="font-size:1.5rem;font-weight:700;color:var(--bordeaux);">${ep.toLocaleString('fr')} FCFA</span>
        ${p.promo?`<span style="font-size:0.9rem;color:var(--text-light);text-decoration:line-through;margin-left:0.5rem;">${p.price.toLocaleString('fr')}</span>`:''}
      </div>
      ${p.stock===0?`<span style="font-size:.75rem;color:var(--danger);font-weight:700;background:rgba(220,53,69,0.1);padding:4px 10px;border-radius:6px;">Rupture de stock</span>`:''}
    </div>
    ${p.stock>0
      ?`<button class="btn-primary" style="width:100%;border-radius:10px;" onclick="addToCartFromModal(${id})">Ajouter au panier</button>`
      :`<button style="width:100%;padding:0.9rem;border-radius:10px;background:var(--border);color:var(--text-light);border:none;font-weight:700;cursor:not-allowed;">Rupture de stock</button>`}
  `);
if(p.colors && p.colors.length > 0 && !selectedColors[id]){
  const first = typeof p.colors[0]==='object' ? p.colors[0] : {hex:p.colors[0], name:p.colors[0]};
  selectedColors[id] = first.hex;
  selectedColorNames[id] = first.name;
}
if(p.sizes && p.sizes.length > 0 && !selectedSizes[id]){
  const first = typeof p.sizes[0]==='object' ? p.sizes[0].name : p.sizes[0];
  selectedSizes[id] = first;
}}
function updateProductGallery(id){ openProduct(id); }
function addToCartFromModal(id) { addToCart(id); closeModal(); }
function selectSize(pid, size) {
  selectedSizes[pid] = size;
  openProduct(pid);
}
function selectColor(pid, idx) {
  const p = products.find(x=>x.id===pid);
  if(!p || !p.colors || !p.colors[idx]) return;
  const c = p.colors[idx];
  selectedColors[pid] = typeof c === 'object' ? c.hex : c;
  selectedColorNames[pid] = typeof c === 'object' ? (c.name || c.hex) : c;
  openProduct(pid);
}

// ==================== CUSTOM ORDER MODAL ====================
function openCustomOrderModal(type) {
  const configs = {
    'chaine-gold': { name:'Chaîne Dorée Gravée', price:15000, deposit:7000, desc:'Chaîne fine en acier inoxydable plaqué or', type:'chaine', defaultMat:'gold' },
    'bracelet':    { name:'Bracelet Gravé',        price:10000, deposit:5000,  desc:'Bracelet personnalisé doré ou argenté', type:'bracelet', defaultMat:'gold' },
    'set':         { name:'Set Complet Gravé',     price:22000, deposit:10000, desc:'Chaîne + bracelet assortis avec gravure', type:'set', defaultMat:'gold' },
  };
  const cfg = configs[type] || configs['chaine-gold'];
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h2><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;vertical-align:middle;margin-right:6px"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ${cfg.name}</h2>
    <div class="custom-modal-layout">
      <div>
        <div class="form-group"><label class="form-label">Votre nom *</label><input class="form-input" id="cust-name" placeholder="Votre nom complet"></div>
        <div class="form-group"><label class="form-label">Téléphone *</label><input class="form-input" id="cust-phone" placeholder="+221 7X XXX XX XX"></div>
        <div class="form-group">
          <label class="form-label">Texte à graver *</label>
          <input class="form-input" id="cust-text" placeholder="Prénom, initiales…" maxlength="20" oninput="this.value=this.value.replace(/\\s/g,'');updateLivePreview(this.value,'${cfg.type}')">
          <div style="font-size:0.68rem;color:var(--text-light);margin-top:3px;">Max. 20 caractères — sans espaces</div>
        </div>
        <div class="form-group">
          <label class="form-label">Style d'écriture</label>
          <div class="font-selector" id="fontSelector">
            <div class="font-option selected" onclick="selectFont(this,'Script')" data-font="Script">
              <div class="font-script" style="color:var(--bordeaux-dark);">Fatou</div>
              <div class="font-name">Calligraphie</div>
            </div>
            <div class="font-option" onclick="selectFont(this,'Serif')" data-font="Serif">
              <div class="font-serif" style="color:var(--bordeaux-dark);">FATOU</div>
              <div class="font-name">Serif Classique</div>
            </div>
            <div class="font-option" onclick="selectFont(this,'Block')" data-font="Block">
              <div class="font-block" style="color:var(--bordeaux-dark);">FATOU</div>
              <div class="font-name">Moderne</div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Couleur / Matière</label>
          <div class="material-selector">
            <div class="material-option selected" onclick="selectMaterial(this,'gold')" id="mat-gold">
              <div class="mat-swatch mat-gold"></div>
              <div class="mat-info"><div class="mat-name">Doré</div><div class="mat-sub">Plaqué or 18K</div></div>
            </div>
            <div class="material-option" onclick="selectMaterial(this,'silver')" id="mat-silver">
              <div class="mat-swatch mat-silver"></div>
              <div class="mat-info"><div class="mat-name">Argenté</div><div class="mat-sub">Acier inoxydable</div></div>
            </div>
          </div>
        </div>
        <div class="form-group"><label class="form-label">Précisions supplémentaires</label><textarea class="form-input" id="cust-note" rows="2" placeholder="Taille, longueur de chaîne, autre souhait…"></textarea></div>
      </div>
      <div>
        <div style="font-size:0.7rem;color:var(--text-light);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:0.6rem;">Aperçu en direct</div>
        ${cfg.type === 'bracelet' ? `
          <div class="live-preview-box" id="livePreviewBox">
            <div class="lpb-label">Votre bracelet</div>
            <div class="lpb-bracelet-ring"><div class="lpb-bracelet-text" id="livePreviewText">Votre texte</div></div>
            <div style="font-size:0.68rem;color:rgba(255,255,255,0.35);margin-top:0.5rem" id="livePreviewMat">✦ Doré</div>
          </div>
        ` : cfg.type === 'set' ? `
          <div class="live-preview-box" id="livePreviewBox">
            <div class="lpb-label">Votre set</div>
            <div class="lpb-chain"></div>
            <div class="lpb-text" id="livePreviewText">Votre texte</div>
            <div class="lpb-chain"></div>
            <div class="lpb-bracelet-ring" style="margin-top:6px;"><div class="lpb-bracelet-text" id="livePreviewText2" style="font-family:'Cormorant Garamond',serif;font-size:0.75rem;color:var(--gold-light);text-align:center;white-space:nowrap;">Votre texte</div></div>
            <div style="font-size:0.68rem;color:rgba(255,255,255,0.35);margin-top:0.5rem" id="livePreviewMat">✦ Doré</div>
          </div>
        ` : `
          <div class="live-preview-box" id="livePreviewBox">
            <div class="lpb-label">Votre chaîne</div>
            <div class="lpb-chain"></div>
            <div class="lpb-text" id="livePreviewText">Votre texte</div>
            <div class="lpb-chain"></div>
            <div style="font-size:0.68rem;color:rgba(255,255,255,0.35);margin-top:0.5rem" id="livePreviewMat">✦ Doré</div>
          </div>
        `}
        <div style="background:var(--cream);border-radius:12px;padding:1.2rem;margin-top:1rem;border:1px solid var(--border);">
          <div style="font-size:0.7rem;color:var(--text-light);letter-spacing:1px;text-transform:uppercase;margin-bottom:0.8rem;">Récapitulatif</div>
          <div style="display:flex;justify-content:space-between;font-size:0.82rem;margin-bottom:0.5rem;"><span>Bijou</span><span style="font-weight:600;">${cfg.name}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:0.82rem;margin-bottom:0.5rem;"><span>Prix total</span><span style="font-weight:700;color:var(--bordeaux-dark);">${cfg.price.toLocaleString('fr')} FCFA</span></div>
          <div style="display:flex;justify-content:space-between;font-size:0.82rem;border-top:1px solid var(--border);padding-top:0.5rem;margin-top:0.5rem;"><span>Acompte à payer</span><span style="font-weight:700;color:var(--success);">${cfg.deposit.toLocaleString('fr')} FCFA</span></div>
          <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--text-light);margin-top:0.3rem;"><span>Livraison</span><span id="custDeliveryCost">${currentCustDelivery.price.toLocaleString('fr')} FCFA</span></div>
          <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--text-light);margin-top:0.3rem;"><span>Solde restant</span><span>${(cfg.price-cfg.deposit).toLocaleString('fr')} FCFA</span></div>
          <div style="display:flex;justify-content:space-between;font-size:0.82rem;border-top:1px solid var(--border);padding-top:0.5rem;margin-top:0.5rem;font-weight:700;"><span>Total à payer</span><span id="custTotalPay" style="color:var(--bordeaux-dark);">${(cfg.deposit+currentCustDelivery.price).toLocaleString('fr')} FCFA</span></div>
          <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--text-light);margin-top:0.3rem;"><span>Délai de fabrication</span><span>2 à 4 semaines</span></div>
        </div>
        <div style="background:var(--cream);border-radius:12px;padding:1.2rem;margin-top:1rem;border:1px solid var(--border);">
          <div style="font-size:0.7rem;color:var(--text-light);letter-spacing:1px;text-transform:uppercase;margin-bottom:0.8rem;">Zone de livraison</div>
          <div class="cust-delivery-option selected" onclick="selectCustDelivery(this,2000,'Dakar Centre')" data-price="2000" style="display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0.6rem;margin-bottom:0.3rem;border-radius:8px;cursor:pointer;transition:all 0.2s;border:1px solid var(--border);background:var(--white);">
            <div><div style="font-weight:600;font-size:0.82rem;">Dakar Centre</div><div style="font-size:0.68rem;color:var(--text-light);">Plateau, Médina, Fann…</div></div>
            <div style="font-weight:700;font-size:0.85rem;color:var(--bordeaux-dark);">2 000 FCFA</div>
          </div>
          <div class="cust-delivery-option" onclick="selectCustDelivery(this,3000,'Dakar Banlieue')" data-price="3000" style="display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0.6rem;margin-bottom:0.3rem;border-radius:8px;cursor:pointer;transition:all 0.2s;border:1px solid var(--border);background:var(--white);">
            <div><div style="font-weight:600;font-size:0.82rem;">Dakar Banlieue</div><div style="font-size:0.68rem;color:var(--text-light);">Pikine, Guédiawaye, Keur Massar…</div></div>
            <div style="font-weight:700;font-size:0.85rem;color:var(--bordeaux-dark);">3 000 FCFA</div>
          </div>
          <div class="cust-delivery-option" onclick="selectCustDelivery(this,5000,'Hors Dakar')" data-price="5000" style="display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0.6rem;border-radius:8px;cursor:pointer;transition:all 0.2s;border:1px solid var(--border);background:var(--white);">
            <div><div style="font-weight:600;font-size:0.82rem;">Régions</div><div style="font-size:0.68rem;color:var(--text-light);">Thiès, Saint-Louis, Ziguinchor…</div></div>
            <div style="font-weight:700;font-size:0.85rem;color:var(--bordeaux-dark);">5 000 FCFA</div>
          </div>
        </div>
          <div class="payment-methods" id="custPaymentMethods" style="margin-top:0.8rem;">
          <div style="font-size:0.7rem;color:var(--text-light);letter-spacing:1px;text-transform:uppercase;margin-bottom:0.6rem;">Mode de paiement</div>
          <div class="payment-tab" style="display:flex;gap:4px;border-radius:10px;overflow:hidden;border:1px solid var(--border);">
            <button class="pay-btn active" onclick="selectCustPayment(this,'wave')" style="flex:1;border:none;background:var(--white);padding:0.5rem 0.3rem;font-size:0.72rem;font-weight:700;color:var(--text);cursor:pointer;transition:all 0.2s;"><span class="pay-icon"><img src="images/wave.png" style="height:18px;vertical-align:middle;margin-right:3px;object-fit:contain" alt="Wave"></span>Wave</button>
            <button class="pay-btn" onclick="selectCustPayment(this,'orange')" style="flex:1;border:none;background:var(--white);padding:0.5rem 0.3rem;font-size:0.72rem;font-weight:700;color:var(--text);cursor:pointer;transition:all 0.2s;"><span class="pay-icon"><img src="images/orange.jpg" style="height:18px;vertical-align:middle;margin-right:3px;object-fit:contain" alt="Orange Money"></span>Orange Money</button>
            <button class="pay-btn" onclick="selectCustPayment(this,'free')" style="flex:1;border:none;background:var(--white);padding:0.5rem 0.3rem;font-size:0.72rem;font-weight:700;color:var(--text);cursor:pointer;transition:all 0.2s;"><span class="pay-icon"><img src="images/free.png" style="height:18px;vertical-align:middle;margin-right:3px;object-fit:contain" alt="Free Money"></span>Free Money</button>
          </div>
          <div style="background:var(--cream);border-radius:12px;padding:0.8rem 1rem;margin-top:0.5rem;border:1px solid var(--border);font-size:0.78rem;" id="custPaymentInfo">
            <strong>Paiement Wave</strong><br>Envoyez le montant au :<br>
            <span style="font-weight:700;font-size:1rem;color:var(--bordeaux-dark);">77 478 98 75</span>
            <div style="font-size:0.7rem;color:var(--text-light);margin-top:0.3rem;">⚠️ Joignez une capture d'écran sur WhatsApp.</div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin:0.8rem 0;">
      <div onclick="var d=this.nextElementSibling,mh=d.style.maxHeight;if(mh==='0px'||!mh){d.style.maxHeight='800px';this.querySelector('.pol-icon').style.transform='rotate(90deg)'}else{d.style.maxHeight='0px';this.querySelector('.pol-icon').style.transform='rotate(0deg)'}" style="display:flex;align-items:center;gap:6px;font-size:0.68rem;color:var(--text-light);cursor:pointer;letter-spacing:0.5px;user-select:none;">
        <span class="pol-icon" style="display:inline-block;transition:transform 0.2s;">▶</span> Politique de remboursement
      </div>
      <div style="overflow-y:auto;max-height:0px;transition:max-height 0.3s ease;font-size:0.7rem;color:var(--text-light);line-height:1.6;background:var(--cream);border-radius:8px;margin-top:4px;">
        <div style="padding:0.6rem 0.7rem;">
          <strong>Politique de remboursement – SYTAM Jewelry</strong><br>
          Chez SYTAM Jewelry, nous mettons tout en œuvre pour garantir la qualité de nos produits et la satisfaction de nos clientes.<br><br>
          <strong>1. Retours et échanges</strong><br>
          Les clientes disposent d'un délai de 7 jours après réception de leur commande pour signaler un problème concernant un article reçu.<br><br>
          Pour être éligible à un retour ou un échange, l'article doit :<br>
          — Être non porté et non utilisé ;<br>
          — Être retourné dans son état d'origine ;<br>
          — Être accompagné de son emballage d'origine lorsque cela est possible.<br><br>
          <strong>2. Produits défectueux ou erreur de commande</strong><br>
          Si vous recevez un article défectueux, endommagé ou différent de celui commandé, veuillez nous contacter dans les 48 heures suivant la réception en joignant des photos du produit concerné.<br><br>
          Après vérification, SYTAM Jewelry pourra proposer :<br>
          — Le remplacement de l'article<br><br>
          <strong>3. Produits personnalisés</strong><br>
          Les bijoux personnalisés (prénom, date, initiales, texte personnalisé ou toute création sur mesure) ne sont ni remboursables ni échangeables, sauf en cas d'erreur de fabrication ou de défaut constaté.<br><br>
          Nous invitons les clientes à vérifier attentivement les informations fournies avant validation de leur commande.<br><br>
          <strong>4. Remboursements</strong><br>
          Lorsque le remboursement est approuvé, il est effectué via le même moyen de paiement utilisé lors de la commande lorsque cela est possible.<br><br>
          Les délais de traitement peuvent varier selon le mode de paiement utilisé.<br><br>
          <strong>5. Frais de retour</strong><br>
          Sauf erreur de notre part ou produit défectueux, les frais de retour restent à la charge de la cliente.<br><br>
          <strong>6. Contact</strong><br>
          Pour toute demande concernant un retour ou un remboursement, veuillez contacter notre service client en indiquant votre numéro de commande et les détails de votre demande.
        </div>
      </div>
    </div>
    <button id="cust-submit-btn" data-deposit="${cfg.deposit}" class="btn-primary" style="width:100%;border-radius:10px;margin-top:0.5rem;font-size:0.88rem;" onclick="submitCustomOrder('${cfg.name}','${cfg.deposit}')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;vertical-align:middle;margin-right:6px"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Envoyer ma demande de personnalisation →
    </button>
  `);
}

let selectedFont = 'Script';
let selectedMaterial = 'gold';

function selectFont(el, font) {
  selectedFont = font;
  document.querySelectorAll('.font-option').forEach(f=>f.classList.remove('selected'));
  el.classList.add('selected');
  const txt = document.getElementById('cust-text');
  if(txt) updateLivePreview(txt.value, null);
}

function selectMaterial(el, mat) {
  selectedMaterial = mat;
  document.querySelectorAll('.material-option').forEach(m=>m.classList.remove('selected'));
  el.classList.add('selected');
  const matEl = document.getElementById('livePreviewMat');
  if(matEl) matEl.textContent = mat==='gold' ? '✦ Doré — Plaqué or 18K' : '✦ Argenté — Acier inoxydable';
  const color = mat === 'gold' ? '#C9A96E' : '#C0C0C8';
  ['#livePreviewText','#livePreviewText2','.lpb-bracelet-text'].forEach(sel=>{
    const e=document.querySelector(sel);
    if(e) e.style.color = color;
  });
  const box = document.getElementById('livePreviewBox');
  if(box) {
    const chains = box.querySelectorAll('.lpb-chain');
    chains.forEach(c => c.style.background = `linear-gradient(to right, transparent, ${color}, transparent)`);
  }
}

function updateLivePreview(text, type) {
  const display = text || 'Votre texte';
  let fontStyle = '';
  if(selectedFont === 'Script') fontStyle = "font-family:'Great Vibes',cursive;letter-spacing:8px;font-size:2rem;";
  else if(selectedFont === 'Serif') fontStyle = "font-family:'Playfair Display',serif;font-size:1.3rem;text-transform:uppercase;";
  else fontStyle = "font-family:'Poppins',sans-serif;font-weight:600;font-size:1rem;text-transform:uppercase;";
  const matColor = selectedMaterial === 'silver' ? '#C0C0C8' : '#C9A96E';
  const shadow = selectedMaterial === 'silver' ? 'rgba(192,192,200,0.5)' : 'rgba(201,169,110,0.5)';
  const el = document.getElementById('livePreviewText');
  if(el) { el.setAttribute('style', fontStyle + 'color:'+matColor+';text-shadow:0 2px 15px '+shadow+';transition:all 0.3s;text-align:center;white-space:nowrap;'); el.textContent = display; }
  const el2 = document.getElementById('livePreviewText2');
  if(el2) { el2.style.color = matColor; el2.textContent = display; }
  const bt = document.querySelector('.lpb-bracelet-text');
  if(bt && type === 'bracelet') bt.textContent = display.length > 15 ? display.substring(0,15)+'…' : display;
}

function submitCustomOrder(name, depositStr) {
  const btn = document.getElementById('cust-submit-btn');
  if(btn && btn.disabled) return;
  if(btn) btn.disabled = true;
  const custName = document.getElementById('cust-name')?.value?.trim();
  const phone = document.getElementById('cust-phone')?.value?.trim();
  const text = document.getElementById('cust-text')?.value?.trim().replace(/\s/g,'');
  const note = document.getElementById('cust-note')?.value?.trim() || '';
  if(!custName || !phone || !text){ showNotif('⚠️ Remplissez tous les champs obligatoires'); if(btn) btn.disabled = false; return; }
  if(!isValidPhone(phone)){ showNotif('⚠️ Numéro invalide (min. 8 chiffres, ex: +221 77 XXX XX XX)'); if(btn) btn.disabled = false; return; }
  const deposit = parseInt(depositStr) || 5000;
  const orderId = 'CUST-'+Date.now().toString().slice(-6);
  const totalPayer = deposit + currentCustDelivery.price;
  const order = {
    id: orderId, customer: custName, phone, address: 'Personnalisation', isCustom: true,
    items: [{ name, category:'Personnalisé', price: deposit, qty:1 }],
    zone:currentCustDelivery.zone, deliveryCost:currentCustDelivery.price, payment:currentCustPayment,
    subtotal: deposit, total: totalPayer, status:'pending',
    date: new Date().toLocaleDateString('fr-FR'),
    time: new Date().toLocaleTimeString('fr-FR'),
    ts: Date.now(),
    note: `Texte: "${text}" | Police: ${selectedFont} | Matière: ${selectedMaterial==='gold'?'Doré':'Argenté'}${note?' | '+note:''}`
  };
  orders.unshift(order);
  localStorage.setItem('sytamOrders', JSON.stringify(orders));
  fbSaveOrders(orders).catch(e => {});
  const notifs = JSON.parse(localStorage.getItem('sytam_adminNotifs')||'[]');
  notifs.unshift({ order, time: new Date().toLocaleTimeString('fr-FR'), read: false });
  localStorage.setItem('sytam_adminNotifs', JSON.stringify(notifs));
  closeModal();
  notifyAdminWA(order);
  showNotif('✓ Demande envoyée ! Nous vous contacterons sous 24h.');
  openModal(`
    <div class="success-modal">
      <div class="success-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:40px;height:40px"><polyline points="20 6 9 17 4 12"/></svg></div>
      <h2>Demande reçue !</h2>
      <p>Merci <strong>${custName}</strong> ! Votre demande de <em>${name}</em> avec la gravure <strong>"${text}"</strong> a bien été enregistrée.</p>
      <div style="background:var(--cream);border-radius:12px;padding:1rem;margin:1rem 0;text-align:left;">
        <div style="font-size:0.78rem;color:var(--text-light);">Récapitulatif :</div>
        <div style="font-size:0.82rem;margin-top:0.4rem;"><strong>Police :</strong> ${selectedFont}</div>
        <div style="font-size:0.82rem;"><strong>Matière :</strong> ${selectedMaterial==='gold'?'Doré (plaqué or)':'Argenté'}</div>
        <div style="font-size:0.82rem;"><strong>Acompte :</strong> ${deposit.toLocaleString('fr')} FCFA</div>
        <div style="font-size:0.82rem;"><strong>Livraison :</strong> ${currentCustDelivery.zone} (${currentCustDelivery.price.toLocaleString('fr')} FCFA)</div>
        <div style="font-size:0.82rem;"><strong>Paiement :</strong> ${currentCustPayment==='wave'?'Wave':currentCustPayment==='orange'?'Orange Money':'Free Money'}</div>
      </div>
      <p>Nous vous contacterons au <strong>${phone}</strong> sous 24h pour confirmer. L'acompte est à payer après confirmation.</p>
      <button class="btn-primary" style="margin-top:1.5rem;border-radius:10px;" onclick="closeModal()">Fermer</button>
    </div>
  `);
  if(btn) btn.disabled = false;
}

let currentCustDelivery = { zone:'Dakar Centre', price:2000 };
let currentCustPayment = 'wave';

function selectCustDelivery(el,price,zone){
  document.querySelectorAll('.cust-delivery-option').forEach(d=>d.classList.remove('selected'));
  el.classList.add('selected');
  currentCustDelivery = { zone, price };
  document.getElementById('custDeliveryCost').textContent = price.toLocaleString('fr')+' FCFA';
  const dep = parseInt(document.getElementById('cust-submit-btn')?.getAttribute('data-deposit')) || 5000;
  document.getElementById('custTotalPay').textContent = (dep+price).toLocaleString('fr')+' FCFA';
}

function selectCustPayment(el,method){
  currentCustPayment = method;
  document.querySelectorAll('#custPaymentMethods .pay-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('custPaymentInfo').innerHTML = paymentInfos[method];
}

// ==================== CART ====================
function addToCart(id) {
  const p = products.find(x=>x.id===id);
  if(!p || p.stock<=0){ showNotif('⚠️ Ce produit est en rupture de stock'); return; }
  const selColor = selectedColors[id]||null;
  const selColorName = selectedColorNames[id]||null;
  const selSize = selectedSizes[id]||null;
  if(p.sizes && p.sizes.length > 0 && selSize){
    const sizeObj = p.sizes.find(s => (typeof s==='object' ? s.name : s) === selSize);
    const sizeStock = sizeObj ? (typeof sizeObj==='object' ? sizeObj.stock : 1) : 0;
    if(sizeStock <= 0){ showNotif('⚠️ Cette taille est en rupture de stock'); return; }
  }
  const existing = cart.find(x=>x.id===id && x.selectedColor===selColor && x.selectedSize===selSize);
  if(existing){ existing.qty++; }
  else { cart.push({...p, qty:1, effectivePrice:effectivePrice(p), selectedColor:selColor, selectedColorName:selColorName, selectedSize:selSize}); }
  updateCartCount();
  showNotif(`+ ${catLabel(p.category)} — ${p.name}${selSize?' (T. '+selSize+')':''}${selColorName?' ('+selColorName+')':''}`);
}

function updateCartCount() {
  document.getElementById('cartCount').textContent = cart.reduce((s,x)=>s+x.qty,0);
}

function renderCart() {
  const el = document.getElementById('cartItems');
  if(!cart.length){
    el.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--text-light);"><div style="margin-bottom:1rem;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:64px;height:64px;opacity:.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></div><p>Votre panier est vide.</p><button class="btn-primary" style="margin-top:1.5rem;border-radius:10px;" onclick="showPage(\'shop\')">Découvrir nos bijoux</button></div>';
  } else {
    el.innerHTML = cart.map(item=>{
      const itemSrc = getImgSrc(item); const imgContent = itemSrc
        ? `<img src="${itemSrc}" alt="${item.name}" style="width:100%;height:100%;object-fit:contain;border-radius:10px;">`
        : `<span style="font-size:2rem;">${catIcon(item.category)}</span>`;
    const colorInfo = item.selectedColor
  ? `<div style="font-size:0.72rem;color:var(--tl);margin-top:3px;font-weight:600;">Couleur : ${item.selectedColorName||item.selectedColor}</div>`
  : '';
    const sizeInfo = item.selectedSize
      ? `<div style="font-size:0.72rem;color:var(--tl);margin-top:3px;font-weight:600;">Taille : ${item.selectedSize}</div>`
      : '';
    const colorParam = item.selectedColor ? `'${item.selectedColor.replace(/'/g,'\\\'')}'` : 'null';
    const sizeParam = item.selectedSize ? `'${item.selectedSize}'` : 'null';
      return `<div class="cart-item">
        <div class="cart-item-img">${imgContent}</div>
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-cat">${item.category}</div>
          ${colorInfo}
          ${sizeInfo}
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(${item.id},${colorParam},${sizeParam},-1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id},${colorParam},${sizeParam},1)">+</button>
          </div>
        </div>
        <div style="text-align:right;">
          <div class="cart-item-price">${(item.effectivePrice*item.qty).toLocaleString('fr')} FCFA</div>
          <button class="remove-btn" onclick="removeFromCart(${item.id},${colorParam},${sizeParam})">Retirer</button>
        </div>
      </div>`;
    }).join('');
  }
  updateSummary();
}

function changeQty(id, color, size, delta){
  const item = cart.find(x=>x.id===id && x.selectedColor===(color||null) && x.selectedSize===(size||null));
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) cart = cart.filter(x=>!(x.id===id && x.selectedColor===(color||null) && x.selectedSize===(size||null)));
  updateCartCount(); renderCart();
}

function removeFromCart(id, color, size){
  cart = cart.filter(x=>!(x.id===id && x.selectedColor===(color||null) && x.selectedSize===(size||null)));
  updateCartCount(); renderCart();
}

function selectDelivery(el, price, zone){
  document.querySelectorAll('.delivery-option').forEach(d=>d.classList.remove('selected'));
  el.classList.add('selected');
  currentDelivery = { zone, price };
  updateSummary();
}

function selectPayment(el, method){
  currentPayment = method;
  document.querySelectorAll('.pay-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('paymentInfo').innerHTML = paymentInfos[method];
}

function updateSummary(){
  const sub = cart.reduce((s,x)=>s+x.effectivePrice*x.qty,0);
  document.getElementById('subtotal').textContent = sub.toLocaleString('fr')+' FCFA';
  document.getElementById('deliveryCost').textContent = currentDelivery.price.toLocaleString('fr')+' FCFA';
  document.getElementById('totalCost').textContent = (sub+currentDelivery.price).toLocaleString('fr')+' FCFA';
}

async function placeOrder(){
  try {
    const btn = document.getElementById('checkoutBtn');
    if(btn && btn.disabled) return;
    if(btn) btn.disabled = true;
    if(!cart.length){ showNotif('⚠️ Votre panier est vide !'); if(btn) btn.disabled = false; return; }
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    if(!name||!phone||!address){ showNotif('⚠️ Veuillez remplir tous les champs !'); if(btn) btn.disabled = false; return; }
    if(!isValidPhone(phone)){ showNotif('⚠️ Numéro invalide (min. 8 chiffres, ex: +221 77 XXX XX XX)'); if(btn) btn.disabled = false; return; }
    const sub = cart.reduce((s,x)=>s+x.effectivePrice*x.qty,0);
    const total = sub+currentDelivery.price;
    const orderId = 'SYT-'+Date.now().toString().slice(-6);
    const order = {
      id:orderId, customer:name, phone, address,
      items: cart.map(({ image, stock, sold, badge, promo, colors, description, sizes, ...rest }) => rest),
      zone:currentDelivery.zone,
      deliveryCost:currentDelivery.price, payment:currentPayment,
      subtotal:sub, total, status:'pending',
      date:new Date().toLocaleDateString('fr-FR'),
      time:new Date().toLocaleTimeString('fr-FR'),
      ts:Date.now()
    };
    // Tentative atomique Firestore (stock vérifié côté serveur)
    let usedAtomic = false;
    if (typeof fbPlaceOrderAtomic === 'function') {
      try {
        await fbPlaceOrderAtomic(order);
        usedAtomic = true;
        // Miroir local
        order.items.forEach(item=>{
          const p = products.find(x=>x.id===item.id);
          if(p){ p.stock=Math.max(0,p.stock-item.qty); p.sold+=item.qty; }
        });
        localStorage.setItem('sytamProducts', JSON.stringify(products));
      } catch(e){
        showNotif('⚠️ ' + e.message);
        return;
      }
    }
    if (!usedAtomic) {
      // Fallback localStorage
      order.items.forEach(item=>{
        const p = products.find(x=>x.id===item.id);
        if(p){ p.stock=Math.max(0,p.stock-item.qty); p.sold+=item.qty; }
      });
      localStorage.setItem('sytamProducts', JSON.stringify(products));
      fbSaveProducts(products).catch(e => {});
    }
    orders.unshift(order);
    localStorage.setItem('sytamOrders', JSON.stringify(orders));
    if (!usedAtomic) fbSaveOrders(orders).catch(e => console.warn('Order sync failed:', e));
    const notifs = JSON.parse(localStorage.getItem('sytam_adminNotifs')||'[]');
    notifs.unshift({ order, time: new Date().toLocaleTimeString('fr-FR'), read: false });
    localStorage.setItem('sytam_adminNotifs', JSON.stringify(notifs));
    const key = 'sytam_loyalty_'+phone.replace(/\D/g,'');
    let loy = JSON.parse(localStorage.getItem(key)||'null') || { phone, name, orders:0, totalSpent:0 };
    loy.orders++; loy.totalSpent += total; loy.name = name;
    localStorage.setItem(key, JSON.stringify(loy));
    cart = [];
    updateCartCount();
    ['customerName','customerPhone','customerAddress'].forEach(id=>{ const e=document.getElementById(id); if(e) e.value=''; });
    const itemsSummary = order.items.map(item => {
      const colorInfo = item.selectedColorName ? ` (${item.selectedColorName})` : '';
      const sizeInfo = item.selectedSize ? ` — Taille ${item.selectedSize}` : '';
      return `<div style="display:flex;justify-content:space-between;align-items:center;padding:.4rem 0;border-bottom:1px solid var(--border);font-size:.82rem">
        <div><strong>${item.name}</strong>${colorInfo}${sizeInfo} <span style="color:var(--text-light)">x${item.qty}</span></div>
        <div style="font-weight:600">${((item.effectivePrice||item.price)*item.qty).toLocaleString('fr')} FCFA</div>
      </div>`;
    }).join('');
    openModal(`
      <div class="success-modal">
        <div class="success-icon"><svg viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:48px;height:48px"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
        <h2>Commande confirmée !</h2>
        <p>Merci <strong>${name}</strong> ! Votre commande <strong>${orderId}</strong> a bien été enregistrée.</p>
        <div style="background:var(--cream);border-radius:12px;padding:1rem;margin:1rem 0;text-align:left;font-size:.82rem;">
          <div style="font-weight:600;margin-bottom:.8rem;color:var(--bordeaux-dark);">Récapitulatif</div>
          ${itemsSummary}
          <div style="display:flex;justify-content:space-between;padding:.4rem 0;border-top:1px solid var(--border);margin-top:.4rem;font-size:.82rem">
            <span>Livraison (${currentDelivery.zone})</span><span>${currentDelivery.price.toLocaleString('fr')} FCFA</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:.4rem 0;font-weight:700;font-size:.95rem;color:var(--bordeaux-dark);">
            <span>Total</span><span>${total.toLocaleString('fr')} FCFA</span>
          </div>
        </div>
        <div class="payment-info" style="font-size:.78rem;margin-bottom:.5rem;">${document.getElementById('paymentInfo').innerHTML}</div>
        <button class="btn-primary" style="width:100%;border-radius:10px;margin-top:.5rem;" onclick="closeModal()">Fermer</button>
      </div>
    `);
    notifyAdminWA(order);
    const btn2 = document.getElementById('checkoutBtn');
    if(btn2) btn2.disabled = false;
  } catch(e){
    showNotif('⚠️ Erreur : '+(e.message||'veuillez réessayer'));
    const btn2 = document.getElementById('checkoutBtn');
    if(btn2) btn2.disabled = false;
  }
}
function notifyAdminWA(order){
  try {
    let topic = (JSON.parse(localStorage.getItem('sytam_ntfySettings')||'{}').topic||'') || 'sytam-orders';
    const ttl = order.total.toLocaleString('fr');
    const itemsStr = order.items.map(i =>
      i.name+(i.selectedSize?' T.'+i.selectedSize:'')+(i.selectedColorName?' ('+i.selectedColorName+')':'')+' x'+i.qty
    ).join(', ');
    const body = 'Client: '+order.customer+' | '+order.phone+' | '+itemsStr+' | Total: '+ttl+' FCFA';
    const title = order.id+' — '+ttl+' FCFA';
    const url = 'https://ntfy.sh/'+topic+'?title='+encodeURIComponent(title)+'&priority=high';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send(body);
  } catch(e) {}
}

// ==================== CONTACT ====================
function sendContact(){
  const card = document.querySelector('.contact-form-card');
  const inputs = card.querySelectorAll('.form-input');
  const firstName = inputs[0].value.trim();
  const lastName = inputs[1].value.trim();
  const email = inputs[2].value.trim();
  const phone = inputs[3].value.trim();
  const message = inputs[4].value.trim();
  if(!firstName || !message){ showNotif('❌ Prénom et message requis'); return; }
  if(phone && !isValidPhone(phone)){ showNotif('⚠️ Numéro de téléphone invalide'); return; }
  const msg = { id: Date.now(), firstName, lastName, email, phone, message, date: new Date().toISOString(), read: false };
  const msgs = JSON.parse(localStorage.getItem('sytam_contactMessages') || '[]');
  msgs.push(msg);
  localStorage.setItem('sytam_contactMessages', JSON.stringify(msgs));
  try { if (isFirebaseReady()) fbAddMessage(msg); } catch(e) {}
  inputs.forEach(i => i.value = '');
  showNotif('✓ Message envoyé ! Nous vous répondrons sous 24h.');
}

// ==================== MODAL ====================
function openModal(html){ document.getElementById('modal').innerHTML = html; document.getElementById('modalOverlay').classList.add('open'); }
function closeModal(){ document.getElementById('modalOverlay').classList.remove('open'); }
function closeModalOnOverlay(e){ if(e.target===document.getElementById('modalOverlay')) closeModal(); }

// ==================== FAQ ====================
function toggleFaq(el){ el.closest('.faq-item').classList.toggle('open'); }

// ==================== NOTIF ====================
function showNotif(msg){
  const el = document.getElementById('notif');
  el.innerHTML = msg;
  el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'), 3000);
}

// Init
(async () => {
  try {
  await dbLoadAll();
  // Sauvegarder les images AVANT la sync Supabase qui pourrait les effacer
  var backupProds = G('sytamProducts');
  // Try Firebase sync
  const fbOk = await fbInit();
  // Preload ntfy topic in localStorage (for offline notification sending)
  if (fbOk) {
    try { await fbLoadNtfyTopic(); } catch(e) {}
    try {
      const data = await fbLoadAllData();
      if (data.products && data.products.length) {
        products = data.products.map(function(p){
          var local = backupProds ? backupProds.find(function(x){ return x.id===p.id; }) : null;
          if(local && (local.images||(local.image&&local.image.length>100)) && (!p.images||!p.images.length || (local.images && local.images.length > p.images.length))){
            p.images = local.images || [local.image];
            if(p.images.length) p.image = p.images[0];
          }
          return p;
        });
        try { localStorage.setItem('sytamProducts', JSON.stringify(products)); }
        catch(e) {
          const local = products.map(x => ({ ...x, image: '', images: [] }));
          localStorage.setItem('sytamProducts', JSON.stringify(local));
        }
      }
      if (data.orders && data.orders.length) {
        orders = data.orders;
        localStorage.setItem('sytamOrders', JSON.stringify(orders));
      }
    } catch(e) { console.warn('Firebase sync failed, using local data'); }
  }
  // Fallback si produits vides
  if (!products || !products.length) {
    products = [
      { id:1,  name:"Spiral Twist",        category:"Boucles d'oreilles", price:2500,  stock:15, sold:8,  image:"", badge:null,       promo:null, colors:[] },
      { id:2,  name:"Bow Heart",           category:"Boucles d'oreilles", price:2500,  stock:12, sold:5,  image:"", badge:null,       promo:null, colors:[] },
      { id:3,  name:"Knot",                category:"Boucles d'oreilles", price:2500,  stock:20, sold:12, image:"", badge:"Populaire", promo:null, colors:["#C9A96E","#C0C0C8"] },
      { id:4,  name:"Petal",               category:"Boucles d'oreilles", price:2500,  stock:8,  sold:6,  image:"", badge:null,       promo:null, colors:[] },
      { id:5,  name:"Ball",                category:"Boucles d'oreilles", price:2500,  stock:18, sold:9,  image:"", badge:null,       promo:null, colors:["#C9A96E","#C0C0C8","#E8A0B4"] },
      { id:6,  name:"Half Hoop",           category:"Boucles d'oreilles", price:2500,  stock:14, sold:7,  image:"", badge:null,       promo:null, colors:[] },
      { id:7,  name:"Croissant",           category:"Boucles d'oreilles", price:2500,  stock:10, sold:11, image:"", badge:null,       promo:null, colors:[] },
      { id:8,  name:"Double Twist",        category:"Boucles d'oreilles", price:2500,  stock:16, sold:4,  image:"", badge:null,       promo:null, colors:["#C9A96E","#C0C0C8"] },
      { id:9,  name:"Bracelet Duo Gogo",   category:"Bracelets",          price:3000,  stock:7,  sold:15, image:"", badge:"Nouveau",  promo:null, colors:["#C9A96E","#C0C0C8"] },
      { id:10, name:"Bracelet Infini Duo", category:"Bracelets",          price:3000,  stock:9,  sold:10, image:"", badge:null,       promo:null, colors:[] },
      { id:11, name:"Van Cleef",           category:"Bracelets",          price:3000,  stock:5,  sold:18, image:"", badge:"Populaire",promo:null, colors:["#C9A96E","#4CAF50","#E8A0B4"] },
      { id:12, name:"Van Cleef Trio Vert", category:"Bracelets",          price:9000,  stock:4,  sold:6,  image:"", badge:null,       promo:null, colors:[] },
      { id:13, name:"Keykey",              category:"Colliers",           price:8500,  stock:6,  sold:8,  image:"", badge:null,       promo:null, colors:[] },
      { id:14, name:"Cheese",              category:"Colliers",           price:1300,  stock:3,  sold:20, image:"", badge:null,       promo:null, colors:[] },
      { id:15, name:"Burger",              category:"Colliers",           price:1300,  stock:2,  sold:14, image:"", badge:null,       promo:null, colors:[] },
      { id:16, name:"Drop",                category:"Colliers",           price:2500,  stock:11, sold:5,  image:"", badge:null,       promo:null, colors:[] },
      { id:17, name:"Baby Girl",           category:"Sets",               price:15000, stock:3,  sold:4,  image:"", badge:"Premium",  promo:null, colors:[] },
      { id:18, name:"Sugar Woman",         category:"Sets",               price:20000, stock:2,  sold:2,  image:"", badge:"Premium",  promo:null, colors:[] },
      { id:19, name:"Half Oval",           category:"Bagues",             price:2500,  stock:13, sold:7,  image:"", badge:null,       promo:null, colors:[] },
      { id:20, name:"Knot Ring",           category:"Bagues",             price:2500,  stock:10, sold:9,  image:"", badge:null,       promo:null, colors:[] },
      { id:21, name:"Chaîne Dorée Fine",   category:"Chaînes de cheville",price:2500,  stock:12, sold:6,  image:"", badge:"Nouveau",  promo:null, colors:[] },
      { id:22, name:"Cheville Perle",      category:"Chaînes de cheville",price:2500,  stock:8,  sold:3,  image:"", badge:null,       promo:null, colors:[] },
      { id:23, name:"Cheville Boule",      category:"Chaînes de cheville",price:2000,  stock:15, sold:9,  image:"", badge:null,       promo:null, colors:[] },
      { id:24, name:"Cheville Papillon",   category:"Chaînes de cheville",price:2500,  stock:10, sold:4,  image:"", badge:null,       promo:null, colors:[] }
    ];
    localStorage.setItem('sytamProducts', JSON.stringify(products));
  }
  renderProducts();
  if (!fbOk) {
    // Migrate old base64 images from localStorage to IndexedDB (local fallback only)
    let changed = false;
    products.forEach(p => {
      if(p.image && p.image.startsWith('data:') && p.image.length > 1000 && !imgCache['p'+p.id]){
        imgCache['p'+p.id] = p.image;
        dbOpen().then(db => {
          const tx = db.transaction('imgs', 'readwrite');
          tx.objectStore('imgs').put({id: 'p'+p.id, data: p.image});
        });
        p.image = '';
        changed = true;
      }
    });
    if(changed) localStorage.setItem('sytamProducts', JSON.stringify(products));
  }
  } catch(e) {
    console.error('Init error:', e);
    // Fallback de secours
    if (!products || !products.length) {
      products = [
        { id:1,  name:"Spiral Twist",        category:"Boucles d'oreilles", price:2500,  stock:15, sold:8,  image:"", badge:null,       promo:null, colors:[] },
        { id:2,  name:"Bow Heart",           category:"Boucles d'oreilles", price:2500,  stock:12, sold:5,  image:"", badge:null,       promo:null, colors:[] },
        { id:3,  name:"Knot",                category:"Boucles d'oreilles", price:2500,  stock:20, sold:12, image:"", badge:"Populaire", promo:null, colors:["#C9A96E","#C0C0C8"] },
        { id:4,  name:"Petal",               category:"Boucles d'oreilles", price:2500,  stock:8,  sold:6,  image:"", badge:null,       promo:null, colors:[] },
        { id:5,  name:"Ball",                category:"Boucles d'oreilles", price:2500,  stock:18, sold:9,  image:"", badge:null,       promo:null, colors:["#C9A96E","#C0C0C8","#E8A0B4"] },
        { id:6,  name:"Half Hoop",           category:"Boucles d'oreilles", price:2500,  stock:14, sold:7,  image:"", badge:null,       promo:null, colors:[] },
        { id:7,  name:"Croissant",           category:"Boucles d'oreilles", price:2500,  stock:10, sold:11, image:"", badge:null,       promo:null, colors:[] },
        { id:8,  name:"Double Twist",        category:"Boucles d'oreilles", price:2500,  stock:16, sold:4,  image:"", badge:null,       promo:null, colors:["#C9A96E","#C0C0C8"] },
        { id:9,  name:"Bracelet Duo Gogo",   category:"Bracelets",          price:3000,  stock:7,  sold:15, image:"", badge:"Nouveau",  promo:null, colors:["#C9A96E","#C0C0C8"] },
        { id:10, name:"Bracelet Infini Duo", category:"Bracelets",          price:3000,  stock:9,  sold:10, image:"", badge:null,       promo:null, colors:[] },
        { id:11, name:"Van Cleef",           category:"Bracelets",          price:3000,  stock:5,  sold:18, image:"", badge:"Populaire",promo:null, colors:["#C9A96E","#4CAF50","#E8A0B4"] },
        { id:12, name:"Van Cleef Trio Vert", category:"Bracelets",          price:9000,  stock:4,  sold:6,  image:"", badge:null,       promo:null, colors:[] },
        { id:13, name:"Keykey",              category:"Colliers",           price:8500,  stock:6,  sold:8,  image:"", badge:null,       promo:null, colors:[] },
        { id:14, name:"Cheese",              category:"Colliers",           price:1300,  stock:3,  sold:20, image:"", badge:null,       promo:null, colors:[] },
        { id:15, name:"Burger",              category:"Colliers",           price:1300,  stock:2,  sold:14, image:"", badge:null,       promo:null, colors:[] },
        { id:16, name:"Drop",                category:"Colliers",           price:2500,  stock:11, sold:5,  image:"", badge:null,       promo:null, colors:[] },
        { id:17, name:"Baby Girl",           category:"Sets",               price:15000, stock:3,  sold:4,  image:"", badge:"Premium",  promo:null, colors:[] },
        { id:18, name:"Sugar Woman",         category:"Sets",               price:20000, stock:2,  sold:2,  image:"", badge:"Premium",  promo:null, colors:[] },
        { id:19, name:"Half Oval",           category:"Bagues",             price:2500,  stock:13, sold:7,  image:"", badge:null,       promo:null, colors:[] },
        { id:20, name:"Knot Ring",           category:"Bagues",             price:2500,  stock:10, sold:9,  image:"", badge:null,       promo:null, colors:[] },
        { id:21, name:"Chaîne Dorée Fine",   category:"Chaînes de cheville",price:2500,  stock:12, sold:6,  image:"", badge:"Nouveau",  promo:null, colors:[] },
        { id:22, name:"Cheville Perle",      category:"Chaînes de cheville",price:2500,  stock:8,  sold:3,  image:"", badge:null,       promo:null, colors:[] },
        { id:23, name:"Cheville Boule",      category:"Chaînes de cheville",price:2000,  stock:15, sold:9,  image:"", badge:null,       promo:null, colors:[] },
        { id:24, name:"Cheville Papillon",   category:"Chaînes de cheville",price:2500,  stock:10, sold:4,  image:"", badge:null,       promo:null, colors:[] }
      ];
    }
    renderProducts();
  }
})();