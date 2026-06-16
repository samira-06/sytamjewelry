const SUPABASE_URL = 'https://sgqzgmfrrpbfstnyezhm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNncXpnbWZycnBiZnN0bnllemhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNjc5ODcsImV4cCI6MjA5Njk0Mzk4N30.VnPtL2Iruoleop5IVqGJcylOqnYOTosxFWInlJMK-p4';

const SupabaseAPI = {
  _headers: {
    'apikey': SUPABASE_KEY,
    'Authorization': 'Bearer ' + SUPABASE_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
  },

  get(path) {
    return fetch(SUPABASE_URL + '/rest/v1/' + path, {
      headers: this._headers,
    }).then(function(r) {
      if (!r.ok) throw new Error('Supabase GET ' + r.status);
      return r.json();
    });
  },

  post(path, body) {
    return fetch(SUPABASE_URL + '/rest/v1/' + path, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(function(r) {
      if (!r.ok) throw new Error('Supabase POST ' + r.status);
      return r.json();
    });
  },

  upsert(path, body) {
    var headers = Object.assign({}, this._headers, { 'Prefer': 'resolution=merge-duplicates,return=representation' });
    return fetch(SUPABASE_URL + '/rest/v1/' + path, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    }).then(function(r) {
      if (!r.ok) throw new Error('Supabase UPSERT ' + r.status);
      return r.json();
    });
  },

  delete(path) {
    return fetch(SUPABASE_URL + '/rest/v1/' + path, {
      method: 'DELETE',
      headers: this._headers,
    }).then(function(r) {
      if (!r.ok) throw new Error('Supabase DELETE ' + r.status);
      return r.json();
    });
  },
};
