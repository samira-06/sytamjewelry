// ===== SUPABASE LOADER — remplace firebase-loader.js + firebase-config.js =====
// Garde les mêmes signatures de fonctions pour compatibilité avec admin.js et main.js

var fbReady = true;
var fbStore = null;

function isFirebaseReady() { return true; }

// ===== LOCAL HELPERS =====
function G(k) { try { return JSON.parse(localStorage.getItem(k)); } catch(e) { return null; } }
function SET(k, v) { localStorage.setItem(k, JSON.stringify(v)); }

// ===== INIT =====
async function fbInit() {
  // Mock fbStore pour les accès directs (admin.js line 514)
  fbStore = {
    collection: function() {
      return {
        doc: function() { return { set: function() { return Promise.resolve(); }, get: function() { return Promise.resolve({ exists: false, data: function() { return null; } }); }, delete: function() { return Promise.resolve(); } }; },
        add: function() { return Promise.resolve(); },
        orderBy: function() { return { get: function() { return Promise.resolve({ docs: [] }); } }; },
        runTransaction: function(fn) { return Promise.resolve(); }
      };
    }
  };

  // Charger les données Supabase dans localStorage
  try {
    var r;
    r = await SupabaseAPI.get('store_data?key=eq.products&select=value');
    if (r && r.length && r[0].value) SET('sytamProducts', r[0].value);
  } catch(e) {}
  try {
    r = await SupabaseAPI.get('store_data?key=eq.orders&select=value');
    if (r && r.length && r[0].value) SET('sytamOrders', r[0].value);
  } catch(e) {}
  try {
    r = await SupabaseAPI.get('store_data?key=eq.messages&select=value');
    if (r && r.length && r[0].value) SET('sytam_contactMessages', r[0].value);
  } catch(e) {}
  try {
    r = await SupabaseAPI.get('store_data?key=eq.admin&select=value');
    if (r && r.length && r[0].value) {
      if (r[0].value.password) localStorage.setItem('sytam_adminPwd', r[0].value.password);
      if (r[0].value.ntfyTopic) SET('sytam_ntfySettings', { topic: r[0].value.ntfyTopic });
    }
  } catch(e) {}
  return true;
}

function fbEnsure() { return true; }

// ===== PRODUITS =====
async function fbLoadProducts() {
  try {
    var r = await SupabaseAPI.get('store_data?key=eq.products&select=value');
    if (r && r.length && r[0].value) { SET('sytamProducts', r[0].value); return r[0].value; }
  } catch(e) {}
  return G('sytamProducts') || [];
}

async function fbSaveProducts(prods) {
  SET('sytamProducts', prods);
  try {
    await SupabaseAPI.upsert('store_data', { key: 'products', value: prods });
    _syncAdminPwd();
  } catch(e) { console.warn('Supabase saveProducts fail:', e); }
}

// ===== COMMANDES =====
async function fbLoadOrders() {
  try {
    var r = await SupabaseAPI.get('store_data?key=eq.orders&select=value');
    if (r && r.length && r[0].value) return r[0].value;
  } catch(e) {}
  return G('sytamOrders') || [];
}

async function fbSaveOrders(ords) {
  SET('sytamOrders', ords);
  try {
    await SupabaseAPI.upsert('store_data', { key: 'orders', value: ords });
    _syncAdminPwd();
  } catch(e) { console.warn('Supabase saveOrders fail:', e); }
}

async function fbDeleteOrder(id) {
  var ords = G('sytamOrders') || [];
  ords = ords.filter(function(o) { return o.id !== id; });
  SET('sytamOrders', ords);
  try { await SupabaseAPI.upsert('store_data', { key: 'orders', value: ords }); } catch(e) {}
}

// ===== MESSAGES =====
async function fbLoadMessages() {
  try {
    var r = await SupabaseAPI.get('store_data?key=eq.messages&select=value');
    if (r && r.length && r[0].value) { SET('sytam_contactMessages', r[0].value); return r[0].value; }
  } catch(e) {}
  return G('sytam_contactMessages') || [];
}

async function fbAddMessage(msg) {
  var msgs = G('sytam_contactMessages') || [];
  msgs.push(msg);
  SET('sytam_contactMessages', msgs);
  try { await SupabaseAPI.upsert('store_data', { key: 'messages', value: msgs }); } catch(e) {}
}

async function fbUpdateMessage(id, data) {
  var msgs = G('sytam_contactMessages') || [];
  var idx = msgs.findIndex(function(m) { return (m.fid === id || m.id === id); });
  if (idx >= 0) {
    Object.assign(msgs[idx], data);
    SET('sytam_contactMessages', msgs);
    try { await SupabaseAPI.upsert('store_data', { key: 'messages', value: msgs }); } catch(e) {}
  }
}

async function fbDeleteMessage(id) {
  var msgs = G('sytam_contactMessages') || [];
  msgs = msgs.filter(function(m) { return (m.fid !== id && m.id !== id); });
  SET('sytam_contactMessages', msgs);
  try { await SupabaseAPI.upsert('store_data', { key: 'messages', value: msgs }); } catch(e) {}
}

// ===== NTFY =====
async function fbLoadNtfyTopic() {
  try {
    var r = await SupabaseAPI.get('store_data?key=eq.admin&select=value');
    if (r && r.length && r[0].value && r[0].value.ntfyTopic) {
      SET('sytam_ntfySettings', { topic: r[0].value.ntfyTopic });
      return r[0].value.ntfyTopic;
    }
  } catch(e) {}
  var s = G('sytam_ntfySettings');
  return s ? s.topic : '';
}

function fbSaveNtfyTopic(topic) {
  SET('sytam_ntfySettings', { topic: topic });
  try {
    SupabaseAPI.upsert('store_data', { key: 'admin', value: { ntfyTopic: topic } }).catch(function(){});
  } catch(e) {}
}

// ===== AUTH =====
async function fbLogin(email, pass) {
  try {
    var r = await SupabaseAPI.get('store_data?key=eq.admin&select=value');
    var supabasePwd = (r && r.length && r[0].value && r[0].value.password) || '';
    var localPwd = localStorage.getItem('sytam_adminPwd') || 'sytam2025';
    if (pass === localPwd || (supabasePwd && pass === supabasePwd)) {
      return { user: { email: 'admin' } };
    }
  } catch(e) {
    var stored = localStorage.getItem('sytam_adminPwd') || 'sytam2025';
    if (pass === stored) return { user: { email: 'admin' } };
  }
  throw new Error('Mot de passe incorrect');
}

function fbLogout() {}
function fbOnAuth(cb) { setTimeout(function() { cb({ email: 'admin' }); }, 0); }

// ===== NOTIFS =====
function fbGetNotifs() { return G('sytam_adminNotifs') || []; }
function fbSaveNotifs(n) { SET('sytam_adminNotifs', n); }

// ===== IMAGES =====
async function fbUploadImage(pid, file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = async function(e) {
      var dataUrl = e.target.result;
      try {
        if (typeof dbOpen === 'function') {
          var db = await dbOpen();
          var tx = db.transaction('imgs', 'readwrite');
          tx.objectStore('imgs').put({ id: 'p' + pid, data: dataUrl });
        }
        resolve(dataUrl);
      } catch(e2) { reject(e2); }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ===== LOAD ALL =====
async function fbLoadAllData() {
  var prods = await fbLoadProducts();
  var ords = await fbLoadOrders();
  return { products: prods, orders: ords };
}

// ===== ATOMIC ORDER =====
async function fbPlaceOrderAtomic(order) {
  var prods = G('sytamProducts') || [];
  var ords = G('sytamOrders') || [];
  for (var i = 0; i < (order.items || []).length; i++) {
    var item = order.items[i];
    for (var j = 0; j < prods.length; j++) {
      if (prods[j].id === item.id) {
        prods[j].stock = Math.max(0, (prods[j].stock || 0) - item.qty);
        prods[j].sold = (prods[j].sold || 0) + item.qty;
        break;
      }
    }
  }
  ords.unshift(order);
  fbSaveProducts(prods);
  fbSaveOrders(ords);
  return true;
}

// ===== SYNC ADMIN PASSWORD =====
function _syncAdminPwd() {
  var pwd = localStorage.getItem('sytam_adminPwd');
  var ntfy = G('sytam_ntfySettings');
  if (pwd || (ntfy && ntfy.topic)) {
    var data = {};
    if (pwd) data.password = pwd;
    if (ntfy && ntfy.topic) data.ntfyTopic = ntfy.topic;
    SupabaseAPI.upsert('store_data', { key: 'admin', value: data }).catch(function(){});
  }
}
