const S = 'sytam';
const ADMIN_PWD_KEY = 'sytam_adminPwd';
const NTFY_SETTINGS_KEY = 'sytam_ntfySettings';
const DEFAULT_PWD = 'sytam2025';

// SVG icons
function ic(n, sz){
  const a = { w:sz||16, h:sz||16 };
  const i = {
    dashboard:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    orders:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    custom:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>',
    products:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
    loyalty:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    promos:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    analytics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    visitors:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    logout:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    alert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    revenue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    image:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    stock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    tag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    gift:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
    star:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    diamond:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 12l10 10 10-10L12 2z"/><path d="M2 12h20"/><path d="M12 2l-4 10 4 10 4-10-4-10z"/></svg>',
    clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    box:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    bag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>',
    pencil:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>',
    lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    crown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M3 20h18"/></svg>',
    hammer:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12l-8.5 8.5a2.12 2.12 0 0 1-3-3L12 9"/><path d="M17 7l-3 3"/><path d="M21 3l-3 3"/><path d="M9 15l3 3"/><path d="M4 20l3-3"/></svg>',
    handshake:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>',
    wallet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg>',
    drop:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
    leaf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
    ribbon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    earrings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="12" r="4"/><circle cx="17" cy="12" r="4"/><path d="M7 16v-4"/><path d="M17 16v-4"/></svg>',
    bracelet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M3 12h18"/><circle cx="12" cy="12" r="4"/></svg>',
    necklace:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><path d="M12 8v3"/><path d="M12 11c-3 0-6 3-6 6v4"/><path d="M12 11c3 0 6 3 6 6v4"/></svg>',
    ring:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8 14l-2 7h12l-2-7"/></svg>',
    set:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="8" height="6"/><rect x="14" y="3" width="8" height="6"/><rect x="2" y="15" width="8" height="6"/><rect x="14" y="15" width="8" height="6"/></svg>',
    ankle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18c3-2 6-2 8 0s5 2 8 0"/><path d="M4 6c3 2 6 2 8 0s5-2 8 0"/><circle cx="12" cy="12" r="1"/></svg>',
    customCat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    sparkles:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 5 5 1.5-5 1.5L12 16l-1.5-5-5-1.5 5-1.5L12 3z"/><circle cx="18" cy="6" r="1"/><circle cx="6" cy="18" r="1"/><circle cx="20" cy="18" r="1.5"/><circle cx="4" cy="8" r="1"/></svg>',
    file:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    wave:'<svg viewBox="0 0 500 500" fill="#4840BB"><path d="M382.68,376.98 C321.97,324.56 331.36,221.71 350.18,126.43 C350.93,122.59 351.44,120.03 348.39,119.62 C328.92,117 263.73,126.47 244.98,131.23 C240.1,132.47 239.64,133.86 239.5,136.93 C231.05,328.17 348.01,370.29 379.88,377.08 C380.6,377.24 382.2,377.45 382.68,376.98 Z"/><path d="M216.01,190.26 C191.98,194.5 169.65,203.22 150.32,211.06 C148.63,211.52 145.88,214.34 146.52,217.91 C153.41,256.7 188.42,366.34 329.35,377.29 C332.6,377.5 335.88,376.96 333.35,375.33 C314.58,360.37 247.18,344.16 222.1,195.86 C221.84,194.34 221.98,188.59 216.01,190.26 Z"/><path d="M146.74,279.82 C138.24,284.73 116.32,298.57 108.42,305.75 C106.85,307.18 107.13,308.21 107.77,310.69 C113.65,333.68 149.98,374.44 242.04,372.94 C246.39,372.87 246.43,371.54 244.19,369.82 C242.73,368.7 213.82,358.86 187.66,333.94 C174.57,321.47 161.36,302.65 152.59,284.82 C150.42,279.96 149.31,278.33 146.74,279.82 Z"/></svg>',
    om:'<svg viewBox="0 0 431 115"><path d="M90.15,11.05H24.34c-3.54,0-6.94,1.41-9.45,3.93c-2.5,2.52-3.91,5.93-3.91,9.48c0,3.56,1.41,6.97,3.91,9.49c2.5,2.51,5.9,3.93,9.45,3.93h33.6L3.89,92.1c-2.5,2.52-3.91,5.93-3.91,9.49c0,3.56,1.41,6.97,3.91,9.49c2.5,2.51,5.9,3.93,9.45,3.93c3.54,0,6.94-1.41,9.45-3.93l53.99-54.23v33.68c0,3.56,1.41,6.97,3.91,9.49c2.5,2.51,5.9,3.93,9.45,3.93s6.94-1.41,9.45-3.93c2.5-2.52,3.91-5.93,3.91-9.49V24.47c0-3.55-1.4-6.96-3.9-9.48c-2.49-2.51-5.88-3.93-9.43-3.94Z" fill="#ff7900"/><path d="M130.24,103.95h65.79c3.54,0,6.94-1.41,9.45-3.93c2.5-2.52,3.91-5.93,3.91-9.48c0-3.56-1.41-6.97-3.91-9.49c-2.5-2.51-5.9-3.93-9.45-3.93h-33.55l53.99-54.22c2.5-2.52,3.91-5.93,3.91-9.49c0-3.56-1.41-6.96-3.91-9.48c-2.5-2.51-5.89-3.92-9.39-3.92c-3.54,0-6.93,1.41-9.42,3.85l-54,54.23V24.47c0-3.56-1.41-6.97-3.91-9.48c-2.5-2.51-5.9-3.93-9.45-3.93c-3.54,0-6.94,1.41-9.45,3.93c-2.5,2.52-3.91,5.93-3.91,9.48v66.06c0,1.76,0.36,3.52,1.01,5.14c0.66,1.62,1.63,3.1,2.9,4.35c1.27,1.26,2.75,2.22,4.37,2.86c1.62,0.64,3.38,0.98,5.14,0.97Z" fill="#ff7900"/></svg>',
    fm:'<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="30" fill="#E2001A"/><text x="100" y="130" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="100" fill="#fff">F</text></svg>',
  };
  const s = i[n] || '';
  return `<span class="ic" style="width:${a.w}px;height:${a.h}px">${s}</span>`;
}

// IndexedDB for images
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
function dbSaveImg(id, dataUrl){
  imgCache['p'+id] = dataUrl;
  return dbOpen().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction('imgs', 'readwrite');
    tx.objectStore('imgs').put({id: 'p'+id, data: dataUrl});
    tx.oncomplete = () => resolve();
    tx.onerror = e => reject(e.target.error);
  }));
}
function dbDelImg(id){
  delete imgCache['p'+id];
  return dbOpen().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction('imgs', 'readwrite');
    tx.objectStore('imgs').delete('p'+id);
    tx.oncomplete = () => resolve();
    tx.onerror = e => reject(e.target.error);
  }));
}
function getImgSrc(p, idx){
  const i = idx || 0;
  if(p.images && p.images.length > i){
    const cached = imgCache['p'+p.id+'_'+i];
    if (cached) return cached;
    if (p.images[i]) return p.images[i];
  }
  if(i===0) return imgCache['p'+p.id] || p.image || '';
  return '';
}
function getImgCount(p){
  if(p.images && p.images.length) return p.images.length;
  if(imgCache['p'+p.id] || p.image) return 1;
  return 0;
}
dbLoadAll();
 
function checkLogin(){
  const pwd = document.getElementById('pwdInput').value;
  // Firebase Auth d'abord, fallback localStorage
  fbLogin(pwd.includes('@') ? pwd : 'admin@admin.com', pwd).then(() => {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminApp').style.display = 'block';
    initAdmin();
  }).catch(() => {
    // Fallback ancien système
    const stored = localStorage.getItem(ADMIN_PWD_KEY) || DEFAULT_PWD;
    if(pwd === stored){
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('adminApp').style.display = 'block';
      initAdmin();
    } else {
      const err = document.getElementById('loginErr');
      err.style.display = 'block';
      document.getElementById('pwdInput').value = '';
      setTimeout(()=>err.style.display='none', 2500);
    }
  });
}
 
function logout(){
  document.getElementById('adminApp').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('pwdInput').value = '';
  fbLogout();
}
 
function changePwd(){
  const cur = document.getElementById('pwd-cur').value;
  const nw = document.getElementById('pwd-new').value;
  const cf = document.getElementById('pwd-cf').value;
  const stored = localStorage.getItem(ADMIN_PWD_KEY) || DEFAULT_PWD;
  if(cur !== stored){ showToast('❌ Mot de passe actuel incorrect',''); return; }
  if(nw.length < 6){ showToast('❌ Minimum 6 caractères',''); return; }
  if(nw !== cf){ showToast('❌ Confirmation incorrecte',''); return; }
  localStorage.setItem(ADMIN_PWD_KEY, nw);
  ['pwd-cur','pwd-new','pwd-cf'].forEach(id=>document.getElementById(id).value='');
  showToast('✓ Mot de passe modifié avec succès','');
}
 
const DEFAULT_PRODUCTS = [
  {id:1,name:"Spiral Twist",category:"Boucles d'oreilles",price:2500,stock:15,sold:8,image:"",badge:null,promo:null},
  {id:2,name:"Bow Heart",category:"Boucles d'oreilles",price:2500,stock:12,sold:5,image:"",badge:null,promo:null},
  {id:3,name:"Knot",category:"Boucles d'oreilles",price:2500,stock:20,sold:12,image:"",badge:"Populaire",promo:null},
  {id:4,name:"Petal",category:"Boucles d'oreilles",price:2500,stock:8,sold:6,image:"",badge:null,promo:null},
  {id:5,name:"Ball",category:"Boucles d'oreilles",price:2500,stock:18,sold:9,image:"",badge:null,promo:null},
  {id:6,name:"Half Hoop",category:"Boucles d'oreilles",price:2500,stock:14,sold:7,image:"",badge:null,promo:null},
  {id:7,name:"Croissant",category:"Boucles d'oreilles",price:2500,stock:10,sold:11,image:"",badge:null,promo:null},
  {id:8,name:"Double Twist",category:"Boucles d'oreilles",price:2500,stock:16,sold:4,image:"",badge:null,promo:null},
  {id:9,name:"Bracelet Duo Gogo",category:"Bracelets",price:3000,stock:7,sold:15,image:"",badge:"Nouveau",promo:null},
  {id:10,name:"Bracelet Infini Duo",category:"Bracelets",price:3000,stock:9,sold:10,image:"",badge:null,promo:null},
  {id:11,name:"Van Cleef",category:"Bracelets",price:3000,stock:5,sold:18,image:"",badge:"Populaire",promo:null},
  {id:12,name:"Van Cleef Trio Vert",category:"Bracelets",price:9000,stock:4,sold:6,image:"",badge:null,promo:null},
  {id:13,name:"Keykey",category:"Colliers",price:8500,stock:6,sold:8,image:"",badge:null,promo:null},
  {id:14,name:"Cheese",category:"Colliers",price:1300,stock:3,sold:20,image:"",badge:null,promo:null},
  {id:15,name:"Burger",category:"Colliers",price:1300,stock:2,sold:14,image:"",badge:null,promo:null},
  {id:16,name:"Drop",category:"Colliers",price:2500,stock:11,sold:5,image:"",badge:null,promo:null},
  {id:17,name:"Baby Girl",category:"Sets",price:15000,stock:3,sold:4,image:"",badge:"Premium",promo:null},
  {id:18,name:"Sugar Woman",category:"Sets",price:20000,stock:2,sold:2,image:"",badge:"Premium",promo:null},
  {id:19,name:"Half Oval",category:"Bagues",price:2500,stock:13,sold:7,image:"",badge:null,promo:null,sizes:[{name:"50",stock:3},{name:"52",stock:3},{name:"54",stock:3},{name:"56",stock:2},{name:"58",stock:1},{name:"60",stock:1}]},
  {id:20,name:"Knot Ring",category:"Bagues",price:2500,stock:10,sold:9,image:"",badge:null,promo:null,sizes:[{name:"50",stock:2},{name:"52",stock:2},{name:"54",stock:2},{name:"56",stock:2},{name:"58",stock:1},{name:"60",stock:1}]},
  {id:21,name:"Chaîne Dorée Fine",category:"Chaînes de cheville",price:2500,stock:12,sold:6,image:"",badge:"Nouveau",promo:null},
  {id:22,name:"Cheville Perle",category:"Chaînes de cheville",price:2500,stock:8,sold:3,image:"",badge:null,promo:null},
  {id:23,name:"Cheville Boule",category:"Chaînes de cheville",price:2000,stock:15,sold:9,image:"",badge:null,promo:null},
  {id:24,name:"Cheville Papillon",category:"Chaînes de cheville",price:2500,stock:10,sold:4,image:"",badge:null,promo:null}
];
 
function getProds(){ return G('sytamProducts') || DEFAULT_PRODUCTS; }
function saveProds(p){
  // Save to localStorage (if too large, strip images)
  try { SET('sytamProducts', p); }
  catch(e) {
    const local = p.map(x => ({ ...x, image: '', images: [] }));
    SET('sytamProducts', local);
  }
  // Sync full data (with images) to Supabase
  fbSaveProducts(p).catch(e => console.warn('saveProds Supabase fail',e));
}
function saveOrders(o){
  SET('sytamOrders', o);
  try { fbSaveOrders(o); } catch(e) { console.warn('saveOrders Firebase fail',e); }
}
function getOrders(){ return G('sytamOrders') || []; }
const EP = p => p.promo ? Math.round(p.price*(1-p.promo/100)) : p.price;
const EMO = {"Boucles d'oreilles":"earrings","Bracelets":"bracelet","Colliers":"necklace","Bagues":"ring","Sets":"set","Chaînes de cheville":"ankle","Personnalisé":"star"};
function catEmo(c){ return ic(EMO[c]||'diamond',24); }
 
let loyaltyRule = G('sytam_loyaltyRule') || { threshold: 10 };
 
function initAdmin(){
  document.getElementById('topDate').textContent = new Date().toLocaleDateString('fr-FR',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  document.getElementById('adminDate').textContent = 'Bienvenue — ' + new Date().toLocaleDateString('fr-FR',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  // Try Firebase sync
  fbInit().then(async () => {
    if (isFirebaseReady()) {
      try {
        const data = await fbLoadAllData();
        if (data.products && data.products.length) {
          try { SET('sytamProducts', data.products); }
          catch(e) {
            const local = data.products.map(x => ({ ...x, image: '', images: [] }));
            SET('sytamProducts', local);
          }
          if (document.getElementById('tab-products').classList.contains('active')) renderStockTable();
        }
        if (data.orders && data.orders.length) {
          // Ne pas toucher aux commandes locales pour éviter de restaurer des suppressions
          // Le polling se charge d'ajouter les nouvelles commandes en temps réel
          const local = getOrders();
          if (!local.length) { saveOrders(data.orders); } // première fois uniquement
          if (document.getElementById('tab-orders').classList.contains('active') || document.getElementById('tab-orders-custom').classList.contains('active')) renderOrders();
        }
      } catch(e) { console.warn('Firebase sync admin failed'); }
    }
    updateDashStats();
    renderRecentOrders();
    renderSalesChart();
    renderCatChart();
    checkNotifs();
    // Poll Firestore for new orders every 30s
    setInterval(() => {
      if (isFirebaseReady()) {
        fbLoadOrders().then(ords => {
          if (ords && ords.length) {
            const deleted = JSON.parse(localStorage.getItem('sytam_deletedOrders')||'[]');
            const filtered = ords.filter(o => !deleted.includes(o.id));
            const local = getOrders();
            const newIds = filtered.filter(o => !local.find(x => x.id === o.id));
            if (newIds.length) {
              const current = getOrders();
              newIds.forEach(o => { if (!current.find(x => x.id === o.id)) current.push(o); });
              saveOrders(current);
              renderOrdersTable(); renderCustomOrders(); renderRecentOrders();
              updateDashStats(); renderNotifPanel(); checkNotifs();
              newIds.forEach(o => {
                showToast('📦 '+o.id+' — '+o.customer+' ('+o.total.toLocaleString('fr')+' FCFA)','');
                sendNtfy(o); // Send notification from admin browser (reliable)
              });
            }
          }
        }).catch(() => {});
      }
    }, 15000);
  });
  // Sync IndexedDB images → product data + Firestore
  setTimeout(() => {
    const prods = getProds();
    let changed = false;
    prods.forEach(p => {
      const cached = imgCache['p'+p.id];
      if(cached && !p.image) {
        p.image = cached;
        changed = true;
      }
    });
    if(changed){ saveProds(prods); renderStockTable(); }
  }, 500);
}
 
function checkNotifs(){
  const notifs = G('sytam_adminNotifs') || [];
  const unreadNotifs = notifs.filter(n => !n.read).length;
  const pendingOrders = getOrders().filter(o => o.status === 'pending').length;
  const count = Math.max(unreadNotifs, pendingOrders);
  ['bellBadge','bellBadge2'].forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
  const sb = document.getElementById('sb-badge');
  if(sb){ sb.textContent = count; sb.style.display = count > 0 ? 'flex' : 'none'; }
 
  // custom orders badge
  const allOrders = getOrders();
  const customPending = allOrders.filter(o => o.isCustom && o.status === 'pending').length;
  const sbC = document.getElementById('sb-badge-custom');
  if(sbC){ sbC.textContent = customPending; sbC.style.display = customPending > 0 ? 'flex' : 'none'; }

  // messages badge
  const msgs = JSON.parse(localStorage.getItem('sytam_contactMessages') || '[]');
  const unreadMsgs = msgs.filter(m => !m.read).length;
  const sbM = document.getElementById('sb-badge-msgs');
  if(sbM){ sbM.textContent = unreadMsgs; sbM.style.display = unreadMsgs > 0 ? 'flex' : 'none'; }
}
 
function toggleNotifPanel(){
  const p = document.getElementById('notifPanel');
  p.classList.toggle('open');
  if(p.classList.contains('open')) renderNotifPanel();
}
 
function renderNotifPanel(){
  const el = document.getElementById('npBody');
  const deleted = JSON.parse(localStorage.getItem('sytam_deletedOrders')||'[]');
  const pending = getOrders().filter(o => o.status === 'pending' && !deleted.includes(o.id)).sort((a,b)=>(b.ts||0)-(a.ts||0));
  if(!pending.length){ el.innerHTML = '<div class="np-empty">Aucune commande en attente</div>'; return; }
  el.innerHTML = pending.slice(0,20).map(o => {
    return '<div class="notif-item unread" onclick="viewOrder(\''+o.id+'\')">' +
      '<div class="ni-id">'+(o.id||'')+'</div>' +
       (o.isCustom ? '<span class="ni-custom">'+ic('edit',12)+' Personnalisation</span>' : '') +
      '<div class="ni-customer">'+(o.customer||'')+'</div>' +
      '<div class="ni-details">'+(o.items||[]).map(x=>x.name+(x.selectedSize?' T.'+x.selectedSize:'')+' x'+x.qty).join(', ')+'</div>' +
      '<div class="ni-total">'+(o.total||0).toLocaleString('fr')+' FCFA</div>' +
      '<div class="ni-time">'+ic('clock',12)+(o.date||'')+' '+(o.time||'')+'</div>' +
      '</div>';
  }).join('');
}
 
function markRead(i){
  const notifs = G('sytam_adminNotifs') || [];
  if(notifs[i]) notifs[i].read = true;
  SET('sytam_adminNotifs', notifs);
  renderNotifPanel(); checkNotifs();
}
function markAllRead(){
  const notifs = G('sytam_adminNotifs') || [];
  notifs.forEach(n => n.read = true);
  SET('sytam_adminNotifs', notifs);
  renderNotifPanel(); checkNotifs();
  showToast('✓ Tout marqué comme lu','');
}
 
function toggleSidebar(){
  document.querySelector('.sidebar').classList.toggle('open');
  document.getElementById('sbOverlay').classList.toggle('open');
}
function goTab(name, el){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.sb-item').forEach(s=>s.classList.remove('active'));
  document.getElementById('tab-'+name).classList.add('active');
  if(el) el.classList.add('active');
  checkNotifs();
  if(name==='orders') renderOrdersTable();
  if(name==='custom_orders') renderCustomOrders();
  if(name==='products') renderStockTable();
  if(name==='loyalty') renderLoyalty();
  if(name==='analytics') renderAnalytics();
  if(name==='visitors') renderVisitors();
  if(name==='promos'){ renderPromoCodes(); renderPromoProducts(); }
  if(name==='messages') renderMessages();
  if(name==='settings') renderSettings();
  if(window.innerWidth<=900){ document.querySelector('.sidebar').classList.remove('open'); document.getElementById('sbOverlay').classList.remove('open'); }
}
 
function updateDashStats(){
  const orders = getOrders();
  const prods = getProds();
  const stdOrders = orders.filter(o=>!o.isCustom);
  const rev = orders.reduce((s,o)=>s+o.total,0);
  const low = prods.filter(p=>p.stock>0&&p.stock<=3).length;
  const pending = orders.filter(o=>o.status==='pending').length;
  const safeSet = (id,v) => { const el=document.getElementById(id);if(el)el.textContent=v; };
  safeSet('s-revenue', rev.toLocaleString('fr')+' FCFA');
  safeSet('s-orders', orders.length);
  safeSet('s-products', prods.length);
  safeSet('s-lowstock', low);
  safeSet('s-rev-trend', rev>0?'↑ Total cumulé':'Aucune vente encore');
  safeSet('s-ord-trend', pending+' en attente');
}
 
function renderSalesChart(){
  const orders = getOrders();
  const months = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
  const data = new Array(12).fill(0);
  orders.forEach(o=>{
    const parts=o.date.split('/');
    if(parts.length>=2){const m=parseInt(parts[1])-1;if(m>=0&&m<12)data[m]+=o.total;}
  });
  const max=Math.max(...data,1);
  const el = document.getElementById('salesChart');
  if(!el) return;
  el.innerHTML=data.map((v,i)=>
    '<div class="cb-wrap">'+
    '<div class="cb-val">'+(v>0?(v/1000).toFixed(0)+'k':'')+'</div>'+
    '<div class="cb-bar" style="height:'+Math.max(4,v/max*130)+'px"></div>'+
    '<div class="cb-lbl">'+months[i]+'</div>'+
    '</div>'
  ).join('');
}
 
function renderCatChart(){
  const orders = getOrders();
  const cats = {};
  orders.forEach(o=>o.items.forEach(i=>{cats[i.category]=(cats[i.category]||0)+i.qty;}));
  const total = Object.values(cats).reduce((s,v)=>s+v,0)||1;
  const colors=['var(--bx)','var(--gold)','var(--bl)','var(--ok)','var(--inf)','#9B59B6'];
  const el = document.getElementById('catChart');
  if(!el) return;
  if(!Object.keys(cats).length){el.innerHTML='<p style="color:var(--tl);font-size:.82rem;text-align:center;padding:1.5rem">Aucune vente encore</p>';return;}
  el.innerHTML=Object.entries(cats).map(([cat,qty],i)=>
    '<div class="cat-bar-row">'+
    '<div class="cat-bar-label"><span style="font-weight:600">'+cat+'</span><span style="color:var(--tl)">'+qty+' pcs ('+Math.round(qty/total*100)+'%)</span></div>'+
    '<div class="cat-bar-track"><div class="cat-bar-fill" style="width:'+qty/total*100+'%;background:'+colors[i%colors.length]+'"></div></div>'+
    '</div>'
  ).join('');
}
 
function renderRecentOrders(){
  const orders = getOrders().slice(0,8);
  const el = document.getElementById('recentOrders');
  if(!el) return;
  if(!orders.length){el.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--tl);padding:2rem">Aucune commande</td></tr>';return;}
  el.innerHTML=orders.map(o=>
    '<tr>'+
    '<td><strong>'+o.id+'</strong>'+(o.isCustom?'<span style="font-size:.62rem;color:var(--gold);display:block">✏️ Personnalisé</span>':'')+'</td>'+
    '<td>'+o.customer+'</td>'+
    '<td style="font-size:.75rem;max-width:120px">'+o.items.map(i=>i.name+(i.selectedSize?' T.'+i.selectedSize:'')).join(', ')+'</td>'+
    '<td>'+(o.zone||'—')+'</td>'+
    '<td><strong>'+o.total.toLocaleString('fr')+' FCFA</strong></td>'+
    '<td><span class="badge b-'+o.status+'">'+statusLabel(o.status)+'</span></td>'+
    '<td>'+o.date+'</td>'+
    '</tr>'
  ).join('');
}
 
function renderOrdersTable(){
  const filter = document.getElementById('orderFilter')?.value||'all';
  let orders = getOrders().filter(o=>!o.isCustom).sort((a,b)=>(b.ts||0)-(a.ts||0));
  if(filter!=='all') orders=orders.filter(o=>o.status===filter);
  const el = document.getElementById('ordersTable');
  if(!el) return;
  if(!orders.length){el.innerHTML='<tr><td colspan="11" style="text-align:center;color:var(--tl);padding:2rem">Aucune commande standard</td></tr>';return;}
  el.innerHTML=orders.map(o=>{
    return '<tr>'+
    '<td><strong>'+o.id+'</strong></td>'+
    '<td>'+o.customer+'</td>'+
    '<td>'+o.phone+'</td>'+
    '<td style="font-size:.75rem;max-width:90px">'+o.address+'</td>'+
    '<td style="font-size:.73rem;max-width:110px">'+o.items.map(i=>i.name+(i.selectedSize?' T.'+i.selectedSize:'')+(i.selectedColorName?' ('+i.selectedColorName+')':'')+' x'+i.qty).join(', ')+'</td>'+
    '<td>'+o.zone+'</td>'+
    '<td>'+paymentLabel(o.payment)+'</td>'+
    '<td><strong>'+o.total.toLocaleString('fr')+' FCFA</strong></td>'+
    '<td><select style="border:1px solid var(--bd);border-radius:6px;padding:.3rem .5rem;font-size:.72rem;cursor:pointer" onchange="updStatus(\''+o.id+'\',this.value)">'+
      '<option value="pending"'+(o.status==='pending'?' selected':'')+'>En attente</option>'+
      '<option value="paid"'+(o.status==='paid'?' selected':'')+'>Payée</option>'+
      '<option value="shipped"'+(o.status==='shipped'?' selected':'')+'>Expédiée</option>'+
      '<option value="cancelled"'+(o.status==='cancelled'?' selected':'')+'>Annulée</option>'+
    '</select></td>'+
    '<td><span class="oh-date">'+o.date+'</span><br><span class="oh-time">'+ (o.time||'')+'</span></td>'+
    '<td style="white-space:nowrap">'+
      '<button class="btn-sm btn-edit" onclick="viewOrder(\''+o.id+'\')" style="display:inline-flex;align-items:center;gap:4px" title="Détails">'+ic('file',14)+'</button> '+
      '<button class="btn-sm btn-del" onclick="delOrder(\''+o.id+'\')" style="display:inline-flex;align-items:center;gap:4px">'+ic('trash',14)+'</button>'+
    '</td>'+
    '</tr>';
  }).join('');
}

function renderCustomOrders(){
  let orders = getOrders().filter(o=>o.isCustom).sort((a,b)=>(b.ts||0)-(a.ts||0));
  const el = document.getElementById('customOrdersTable');
  if(!el) return;
 
  const total = orders.length;
  const pending = orders.filter(o=>o.status==='pending'||o.status==='paid').length;
  const done = orders.filter(o=>o.status==='shipped').length;
  const safeSet=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  safeSet('c-total', total); safeSet('c-pending', pending); safeSet('c-done', done);
 
  if(!orders.length){el.innerHTML='<tr><td colspan="10" style="text-align:center;color:var(--tl);padding:2rem">Aucune commande personnalisée</td></tr>';return;}
  el.innerHTML=orders.map(o=>{
    // Extract engraving text from note
    const noteMatch = o.note ? o.note.match(/Texte: "([^"]*)"/) : null;
    const engraving = noteMatch ? noteMatch[1] : '—';
    const fontMatch = o.note ? o.note.match(/Police: ([^|]*)/) : null;
    const font = fontMatch ? fontMatch[1].trim() : '—';
    return '<tr>'+
    '<td><strong>'+o.id+'</strong></td>'+
    '<td>'+o.customer+'</td>'+
    '<td><strong>'+o.phone+'</strong></td>'+
    '<td style="font-size:.78rem">'+o.items.map(i=>i.name+(i.selectedSize?' T.'+i.selectedSize:'')).join(', ')+'</td>'+
    '<td><strong style="color:var(--bx);font-family:Georgia,serif;letter-spacing:1px">"'+engraving+'"</strong><br><span style="font-size:.65rem;color:var(--tl)">'+font+'</span></td>'+
    '<td><strong style="color:var(--ok)">'+o.total.toLocaleString('fr')+' FCFA</strong></td>'+
    '<td>'+(o.totalPrice||'—')+(o.totalPrice?' FCFA':'')+'</td>'+
    '<td><select style="border:1px solid var(--bd);border-radius:6px;padding:.3rem .5rem;font-size:.72rem;cursor:pointer" onchange="updStatus(\''+o.id+'\',this.value)">'+
      '<option value="pending"'+(o.status==='pending'?' selected':'')+'>En attente</option>'+
      '<option value="paid"'+(o.status==='paid'?' selected':'')+'>Acompte reçu</option>'+
      '<option value="shipped"'+(o.status==='shipped'?' selected':'')+'>Livré</option>'+
      '<option value="cancelled"'+(o.status==='cancelled'?' selected':'')+'>Annulé</option>'+
    '</select></td>'+
    '<td><span class="oh-date">'+o.date+'</span><br><span class="oh-time">'+(o.time||'')+'</span></td>'+
    '<td style="white-space:nowrap">'+
      '<button class="btn-sm btn-edit" onclick="viewOrder(\''+o.id+'\')" style="display:inline-flex;align-items:center;gap:4px" title="Détails">'+ic('file',14)+'</button> '+
      '<button class="btn-sm btn-del" onclick="delOrder(\''+o.id+'\')" style="display:inline-flex;align-items:center;gap:4px">'+ic('trash',14)+'</button>'+
    '</td>'+
    '</tr>';
  }).join('');
}
  
function updStatus(id, status){
  const orders = getOrders();
  const o=orders.find(x=>x.id===id);
  if(o){o.status=status;saveOrders(orders);showToast('✓ Statut mis à jour','');}
  // Écrire directement le statut dans Firestore pour éviter les pertes
  if (isFirebaseReady()) {
    try { fbStore.collection('orders').doc(id).set({status}, { merge: true }); } catch(e) {}
  }
}
 
function delOrder(id){
  if(!confirm('Supprimer cette commande ?')) return;
  const orders=getOrders().filter(x=>x.id!==id);
  saveOrders(orders);
  fbDeleteOrder(id);
  // Track deletion locally so polling doesn't restore it
  const deleted = JSON.parse(localStorage.getItem('sytam_deletedOrders')||'[]');
  if (!deleted.includes(id)) deleted.push(id);
  localStorage.setItem('sytam_deletedOrders', JSON.stringify(deleted));
  renderOrdersTable(); renderCustomOrders(); updateDashStats();
}
function viewOrder(id){
  const orders = getOrders();
  const o = orders.find(x=>x.id===id);
  if(!o){ showToast('❌ Commande introuvable',''); return; }
  const itemsHtml = o.items.map((item,i)=>{
    const c = item.selectedColorName ? `<span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${item.selectedColor};vertical-align:middle;border:1px solid rgba(0,0,0,0.1);margin-right:3px;"></span> ${item.selectedColorName}` : '—';
    const sz = item.selectedSize ? `Taille : ${item.selectedSize}` : '—';
    const ep = item.effectivePrice || item.price || 0;
    return `<div style="display:flex;justify-content:space-between;align-items:center;padding:.5rem 0;border-bottom:1px solid var(--bd);font-size:.82rem">
      <div><strong>${item.name}</strong><br><span style="font-size:.7rem;color:var(--tl)">Catégorie : ${item.category||'—'}  |  Couleur : ${c}  |  ${sz}</span></div>
      <div style="text-align:right"><strong>${ep.toLocaleString('fr')} FCFA</strong><br><span style="font-size:.7rem;color:var(--tl)">x${item.qty}</span></div>
    </div>`;
  }).join('');
  openModal('<button class="modal-x" onclick="closeModal()">✕</button>'+
    '<h2 style="font-size:1.3rem;margin-bottom:1.2rem;">'+ic('file',18)+' Commande '+o.id+'</h2>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;font-size:.82rem">'+
      '<div style="background:var(--cr);padding:.8rem;border-radius:10px;border:1px solid var(--bd)">'+
        '<div style="font-size:.65rem;color:var(--tl);text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:.4rem;">'+ic('info',12)+' Statut</div>'+
        '<div style="font-weight:700;color:var(--bx)">'+statusLabel(o.status)+'</div>'+
      '</div>'+
      '<div style="background:var(--cr);padding:.8rem;border-radius:10px;border:1px solid var(--bd)">'+
        '<div style="font-size:.65rem;color:var(--tl);text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:.4rem;">'+ic('clock',12)+' Date</div>'+
        '<div style="font-weight:700;color:var(--bx)">'+o.date+' '+(o.time||'')+'</div>'+
      '</div>'+
    '</div>'+
    '<div style="background:var(--cr);border-radius:10px;border:1px solid var(--bd);padding:.8rem;margin-bottom:1.5rem;font-size:.82rem">'+
      '<div style="font-size:.65rem;color:var(--tl);text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:.6rem;">'+ic('users',12)+' Client</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem">'+
        '<div><span style="color:var(--tl);font-size:.7rem;">Nom</span><br><strong>'+o.customer+'</strong></div>'+
        '<div><span style="color:var(--tl);font-size:.7rem;">Téléphone</span><br><strong>'+o.phone+'</strong></div>'+
        '<div style="grid-column:1/-1"><span style="color:var(--tl);font-size:.7rem;">Adresse</span><br><strong>'+o.address+'</strong></div>'+
        '<div><span style="color:var(--tl);font-size:.7rem;">Zone</span><br><strong>'+o.zone+'</strong></div>'+
      '</div>'+
    '</div>'+
    '<div style="font-size:.65rem;color:var(--tl);text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:.6rem;">'+ic('cart',12)+' Articles</div>'+
    itemsHtml+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1rem;padding-top:.8rem;border-top:2px solid var(--bd);font-size:.82rem">'+
      '<div><span style="color:var(--tl);font-size:.7rem;">Paiement</span><br><strong>'+paymentLabel(o.payment)+'</strong></div>'+
      '<div style="text-align:right"><span style="color:var(--tl);font-size:.7rem;">Sous-total</span><br><strong>'+o.subtotal.toLocaleString('fr')+' FCFA</strong></div>'+
      '<div><span style="color:var(--tl);font-size:.7rem;">Livraison</span><br><strong>'+o.zone+' — '+o.deliveryCost.toLocaleString('fr')+' FCFA</strong></div>'+
      '<div style="text-align:right"><span style="color:var(--tl);font-size:.7rem;">Total</span><br><strong style="font-size:1.1rem;color:var(--bx)">'+o.total.toLocaleString('fr')+' FCFA</strong></div>'+
    '</div>'+
    '<div style="margin-top:1.5rem;display:flex;gap:.5rem">'+
      '<button class="btn-sm btn-del" onclick="delOrder(\''+o.id+'\');closeModal()" style="flex:1;border-radius:10px;padding:.7rem">'+ic('trash',14)+' Supprimer</button>'+
    '</div>');
}
 
// ===== LOYALTY =====
function getAllLoyaltyClients(){
  const clients = [];
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(key && key.startsWith('sytam_loyalty_')){
      try{const d=JSON.parse(localStorage.getItem(key));if(d)clients.push(d);}catch(e){}
    }
  }
  return clients.sort((a,b)=>b.orders-a.orders);
}
 
function renderLoyalty(){
  loyaltyRule = G('sytam_loyaltyRule') || { threshold: 10 };
  const clients = getAllLoyaltyClients();
  let vip=0, gold=0, gifts=0;
  clients.forEach(c=>{
    if(c.orders>=20) vip++;
    else if(c.orders>=loyaltyRule.threshold) gold++;
    const giftsDue = Math.floor(c.orders/loyaltyRule.threshold) - (c.giftsGiven||0);
    if(giftsDue>0) gifts+=giftsDue;
  });
  const safeSet=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  safeSet('l-vip',vip); safeSet('l-gold',gold); safeSet('l-gift',gifts); safeSet('l-total',clients.length);
  safeSet('giftsTotalDisplay',gifts);
  const lc = document.getElementById('loyaltyCount');
  if(lc) lc.textContent = clients.length+' client(s) suivi(s)';
 
  const ruleEl = document.getElementById('loyaltyRuleDisplay');
  if(ruleEl) ruleEl.innerHTML = 'Après <strong>'+loyaltyRule.threshold+' achats</strong>, offrir un cadeau au client fidèle';
 
  const el = document.getElementById('loyaltyList');
  if(!el) return;
  if(!clients.length){
    el.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--tl);">Aucun client suivi pour l\'instant.<br><small>Les clients sont automatiquement enregistrés à leur première commande.</small></div>';
    return;
  }
 
  el.innerHTML = clients.map(c=>{
    const tier = c.orders>=20?'VIP 👑':c.orders>=loyaltyRule.threshold?'Gold ⭐':c.orders>=5?'Silver 🥈':'Standard';
    const tierClass = c.orders>=20?'tier-vip':c.orders>=loyaltyRule.threshold?'tier-gold':c.orders>=5?'tier-silver':'tier-std';
    const giftsDue = Math.floor(c.orders/loyaltyRule.threshold) - (c.giftsGiven||0);
    const progress = (c.orders % loyaltyRule.threshold) / loyaltyRule.threshold * 100;
    const nextGift = loyaltyRule.threshold - (c.orders % loyaltyRule.threshold);
 
    return '<div class="loyalty-row" id="loy-'+c.phone+'">' +
      '<div style="flex:1;min-width:180px">' +
        '<div class="loyalty-phone">'+c.phone+'</div>' +
        '<div class="loyalty-name">'+(c.name||'—')+'</div>' +
        '<div style="margin-top:.5rem">' +
          '<div style="display:flex;justify-content:space-between;font-size:.7rem;color:var(--tl);margin-bottom:.3rem">' +
            '<span>'+c.orders+' commandes</span>' +
            (c.orders%loyaltyRule.threshold!==0?'<span>Prochain cadeau dans '+(nextGift)+' achat(s)</span>':'') +
          '</div>' +
          '<div style="background:rgba(0,0,0,.08);border-radius:4px;height:6px;">' +
            '<div style="width:'+Math.min(100,progress)+'%;height:100%;background:var(--gold);border-radius:4px;transition:width .5s"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div style="text-align:center;min-width:80px">' +
        '<div class="loyalty-orders">'+c.orders+'</div>' +
        '<div class="loyalty-spent">'+(c.totalSpent||0).toLocaleString('fr')+' FCFA</div>' +
      '</div>' +
      '<div style="display:flex;flex-direction:column;gap:.4rem;align-items:flex-end">' +
        '<span class="loy-tier '+tierClass+'">'+tier+'</span>' +
        (giftsDue>0 ? '<span class="gift-indicator">🎁 '+giftsDue+' cadeau'+(giftsDue>1?'x':'')+' à offrir !</span>' : '') +
        '<div style="display:flex;gap:.3rem;flex-wrap:wrap;justify-content:flex-end">' +
          (giftsDue>0 ? '<button class="btn-sm btn-ok" onclick="markGiftGiven(\''+c.phone+'\')">✓ Cadeau offert</button>' : '') +
          '<button class="btn-sm btn-edit" onclick="viewClientHistory(\''+c.phone+'\')">Historique</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}
 
function editLoyaltyRule(){
  openModal('<button class="modal-x" onclick="closeModal()">✕</button>' +
    '<h2>Règle de fidélité</h2>' +
    '<p style="font-size:.85rem;color:var(--tl);margin-bottom:1.5rem;line-height:1.7">Définissez après combien d\'achats vous offrez un cadeau à vos clients fidèles. Les clients sont identifiés par leur numéro de téléphone — aucun compte n\'est nécessaire.</p>' +
    '<div class="form-group"><label class="form-label">Nombre d\'achats requis pour un cadeau</label><input class="form-input" id="rule-threshold" type="number" min="2" max="50" value="'+(loyaltyRule.threshold||10)+'"></div>' +
    '<div style="background:rgba(201,169,110,.12);border:1px solid var(--gold);border-radius:10px;padding:1rem;margin-bottom:1rem;font-size:.82rem;">' +
      '🎁 Exemple : si vous mettez <strong>10</strong>, après 10 achats le client reçoit un cadeau, après 20 il en reçoit un deuxième, etc.' +
    '</div>' +
    '<button class="btn-add" style="width:100%;border-radius:10px" onclick="saveLoyaltyRule()">Enregistrer la règle</button>');
}
 
function saveLoyaltyRule(){
  const v = parseInt(document.getElementById('rule-threshold').value);
  if(!v||v<2){showToast('⚠️ Valeur invalide','');return;}
  loyaltyRule = { threshold: v };
  SET('sytam_loyaltyRule', loyaltyRule);
  closeModal(); renderLoyalty(); showToast('✓ Règle de fidélité mise à jour','');
}
 
function markGiftGiven(phone){
  const key = 'sytam_loyalty_' + phone.replace(/\s/g,'');
  let data = JSON.parse(localStorage.getItem(key)||'null');
  if(!data) return;
  data.giftsGiven = (data.giftsGiven||0)+1;
  localStorage.setItem(key, JSON.stringify(data));
  renderLoyalty();
  showToast('🎁 Cadeau marqué comme offert à '+phone,'');
}
 
function viewClientHistory(phone){
  const orders = getOrders().filter(o => o.phone && o.phone.replace(/\s/g,'') === phone.replace(/\s/g,''));
  const key = 'sytam_loyalty_' + phone.replace(/\s/g,'');
  const data = JSON.parse(localStorage.getItem(key)||'null') || {};
  const giftsDue = Math.floor((data.orders||0)/loyaltyRule.threshold) - (data.giftsGiven||0);
 
  openModal('<button class="modal-x" onclick="closeModal()">✕</button>' +
    '<h2>Historique — '+phone+'</h2>' +
    '<div style="background:var(--cr);border-radius:12px;padding:1rem;margin-bottom:1rem;display:flex;gap:1.5rem;flex-wrap:wrap">' +
      '<div><div style="font-size:1.5rem;font-weight:700;color:var(--bx);font-family:Cormorant Garamond,serif">'+orders.length+'</div><div style="font-size:.72rem;color:var(--tl)">Commandes</div></div>' +
      '<div><div style="font-size:1.5rem;font-weight:700;color:var(--ok);font-family:Cormorant Garamond,serif">'+(data.totalSpent||0).toLocaleString('fr')+' FCFA</div><div style="font-size:.72rem;color:var(--tl)">Dépensé total</div></div>' +
      (giftsDue>0?'<div><div style="font-size:1.5rem;font-weight:700;color:#7B5800;font-family:Cormorant Garamond,serif">'+giftsDue+' 🎁</div><div style="font-size:.72rem;color:var(--tl)">Cadeau(x) à offrir</div></div>':'') +
    '</div>' +
    (orders.length ? orders.map(o=>'<div style="border:1px solid var(--bd);border-radius:10px;padding:.8rem;margin-bottom:.6rem;font-size:.82rem">'+
      '<div style="display:flex;justify-content:space-between;margin-bottom:.3rem"><strong>'+o.id+'</strong><span style="font-size:.7rem;color:var(--tl)">'+o.date+'</span></div>'+
      '<div style="color:var(--tl)">'+o.items.map(i=>i.name+(i.selectedSize?' T.'+i.selectedSize:'')+' x'+i.qty).join(', ')+'</div>'+
      '<div style="margin-top:.4rem;display:flex;justify-content:space-between;align-items:center">'+
        '<span class="badge b-'+o.status+'">'+statusLabel(o.status)+'</span>'+
        '<strong style="color:var(--bx)">'+o.total.toLocaleString('fr')+' FCFA</strong>'+
      '</div>'+
    '</div>').join('') : '<p style="text-align:center;color:var(--tl);padding:1.5rem">Aucune commande trouvée</p>') +
    '<button class="btn-add" style="width:100%;margin-top:1rem;border-radius:10px" onclick="closeModal()">Fermer</button>');
}
 
function searchLoyaltyClient(){
  openModal('<button class="modal-x" onclick="closeModal()">✕</button>' +
    '<h2>🔍 Rechercher un client</h2>' +
    '<p style="font-size:.82rem;color:var(--tl);margin-bottom:1rem">Entrez le numéro de téléphone du client pour voir son historique de fidélité.</p>' +
    '<div class="form-group"><label class="form-label">Numéro de téléphone</label><input class="form-input" id="search-phone" placeholder="+221 7X XXX XX XX" oninput="liveSearchClient(this.value)"></div>' +
    '<div id="search-result"></div>');
}
 
function liveSearchClient(phone){
  const el = document.getElementById('search-result');
  if(!el) return;
  const cleaned = phone.replace(/\D/g,'');
  if(cleaned.length < 5){ el.innerHTML = ''; return; }
  const key = 'sytam_loyalty_' + cleaned;
  const data = JSON.parse(localStorage.getItem(key)||'null');
  if(!data){
    el.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--tl);font-size:.82rem;">Aucun historique trouvé pour ce numéro.</div>';
    return;
  }
  const orders = getOrders().filter(o => o.phone && o.phone.replace(/\D/g,'') === cleaned);
  const giftsDue = Math.floor(data.orders/loyaltyRule.threshold) - (data.giftsGiven||0);
  const tier = data.orders>=20?'VIP 👑':data.orders>=loyaltyRule.threshold?'Gold ⭐':data.orders>=5?'Silver 🥈':'Standard';
  el.innerHTML = '<div style="background:var(--cr);border-radius:12px;padding:1.2rem;border:1px solid var(--bd)">' +
    '<div style="font-weight:700;color:var(--bx);font-size:.95rem;margin-bottom:.3rem">'+data.phone+'</div>' +
    '<div style="font-size:.82rem;color:var(--tl)">'+data.name+'</div>' +
    '<div style="margin-top:1rem;display:flex;gap:1.5rem;flex-wrap:wrap">' +
      '<div><span style="font-size:1.3rem;font-weight:700;color:var(--bx);font-family:Cormorant Garamond,serif">'+data.orders+'</span><div style="font-size:.7rem;color:var(--tl)">Commandes</div></div>' +
      '<div><span style="font-size:1.3rem;font-weight:700;color:var(--ok);font-family:Cormorant Garamond,serif">'+(data.totalSpent||0).toLocaleString('fr')+'</span><div style="font-size:.7rem;color:var(--tl)">FCFA dépensé</div></div>' +
      '<div><span class="loy-tier '+(data.orders>=20?'tier-vip':data.orders>=loyaltyRule.threshold?'tier-gold':data.orders>=5?'tier-silver':'tier-std')+'" style="font-size:.8rem">'+tier+'</span></div>' +
    '</div>' +
    (giftsDue>0?'<div style="margin-top:1rem;background:rgba(45,122,79,.1);border:1px solid var(--ok);border-radius:8px;padding:.8rem;font-size:.82rem;font-weight:600;color:var(--ok)">🎁 Ce client a droit à '+giftsDue+' cadeau'+(giftsDue>1?'x':'')+' !</div>':'') +
    '<button class="btn-add" style="width:100%;margin-top:1rem;border-radius:8px" onclick="viewClientHistory(\''+data.phone+'\');closeModal()">Voir l\'historique complet</button>' +
  '</div>';
}
 
// ===== PRODUCTS =====
function renderStockTable(){
  const prods=getProds();
  const el=document.getElementById('stockTable');
  if(!el) return;
  let totalVal=0,lowCnt=0,outCnt=0;
  el.innerHTML=prods.map(p=>{
    totalVal+=p.price*p.stock;
    if(p.stock===0)outCnt++;
    else if(p.stock<=3)lowCnt++;
    const pct=Math.min(100,p.stock/((p.stock+p.sold)||1)*100);
    const bc=p.stock===0?'low':p.stock<=3?'med':'';
    const src=getImgSrc(p);const imgEl=src?'<img src="'+src+'" style="width:40px;height:40px;object-fit:contain;border-radius:6px" onerror="this.style.display=\'none\'">'
      :'<span style="font-size:1.5rem">'+catEmo(p.category)+'</span>';
    const priceDisplay=EP(p).toLocaleString('fr')+' FCFA'+(p.promo?'<span class="promo-tag">-'+p.promo+'%</span>':'');
    return '<tr>'+
      '<td>'+imgEl+'</td>'+
      '<td><strong>'+p.name+'</strong></td>'+
      '<td><span style="font-size:.72rem;color:var(--gold);font-weight:600">'+p.category+'</span></td>'+
      '<td>'+priceDisplay+'</td>'+
      '<td>'+(p.promo?'<strong style="color:var(--wa)">-'+p.promo+'%</strong>':'<span style="font-size:.72rem;color:var(--tl)">—</span>')+'</td>'+
      '<td><strong style="color:'+(p.stock===0?'var(--er)':p.stock<=3?'var(--wa)':'var(--ok)')+'">'+p.stock+'</strong></td>'+
      '<td><div style="display:flex;align-items:center;gap:.5rem"><div class="stk-bar-bg"><div class="stk-bar-fill '+bc+'" style="width:'+pct+'%;height:100%"></div></div><span style="font-size:.7rem;font-weight:600;min-width:25px">'+Math.round(pct)+'%</span></div></td>'+
      '<td>'+p.sold+'</td>'+
      '<td style="white-space:nowrap">'+
        '<button class="btn-sm btn-img" onclick="editImg('+p.id+')" title="Photo">'+ic('image',13)+'</button> '+
        '<button class="btn-sm btn-edit" onclick="editStock('+p.id+')" title="Stock">'+ic('box',13)+'</button> '+
        '<button class="btn-sm btn-promo" onclick="editPromoModal('+p.id+')" title="Promo">'+ic('tag',13)+'</button> '+
        '<button class="btn-sm btn-edit" onclick="editProduct('+p.id+')" title="Modifier">'+ic('edit',13)+'</button> '+
        '<button class="btn-sm btn-del" onclick="delProduct('+p.id+')" title="Supprimer">'+ic('trash',13)+'</button>'+
      '</td>'+
    '</tr>';
  }).join('');
  const safeSet=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  safeSet('p-stockval',totalVal.toLocaleString('fr')+' FCFA');
  safeSet('p-lowcount',lowCnt);
  safeSet('p-outcount',outCnt);
}
 
function editImg(id){
  const p=getProds().find(x=>x.id===id);
  const imgs = p.images || (getImgSrc(p) ? [getImgSrc(p)] : []);
  let thumbs = imgs.map((url,i)=>`
    <div style="position:relative;display:inline-block;margin:4px;border:1px solid var(--bd);border-radius:8px;overflow:hidden;width:80px;height:80px;">
      <img src="${url}" style="width:100%;height:100%;object-fit:cover" onerror="this.parentElement.remove()">
      <span onclick="delProductImg(${id},${i})" style="position:absolute;top:2px;right:2px;width:18px;height:18px;background:rgba(220,53,69,0.8);color:#fff;border-radius:50%;font-size:12px;line-height:18px;text-align:center;cursor:pointer;">✕</span>
    </div>
  `).join('');
  openModal('<button class="modal-x" onclick="closeModal()">✕</button>'+
    '<h2>Photos — '+p.name+'</h2>'+
    '<div id="imgThumbs" style="min-height:60px;margin-bottom:.8rem;text-align:center">'+(thumbs||'<span style="color:var(--tl);font-size:.82rem">Aucune photo</span>')+'</div>'+
    '<div class="img-upload" onclick="document.getElementById(\'imgFile\').click()">📷 Ajouter une photo<input type="file" id="imgFile" accept="image/*" onchange="previewImg(event,'+id+')"></div>'+
    '<img id="imgPreview" style="width:100%;height:120px;object-fit:contain;border-radius:8px;margin-top:.8rem;display:none">'+
    '<div class="form-group" style="margin-top:.8rem"><label class="form-label">Ou URL / chemin</label><input class="form-input" id="imgUrl" placeholder="https://... ou images/mon-produit.jpg"></div>'+
    '<div style="font-size:.7rem;color:var(--tl);margin-bottom:.5rem">💡 Vous pouvez ajouter plusieurs photos. La première sera l\'image principale.</div>'+
    '<button class="btn-add" style="width:100%;margin-top:.5rem;border-radius:10px" onclick="saveImg('+id+')">Ajouter la photo</button>');
}
 
function compressImage(file, maxW, quality, cb){
  const r=new FileReader();
  r.onload=ev=>{
    const img=new Image();
    img.onload=()=>{
      const c=document.createElement('canvas');
      const ratio=Math.min(maxW/img.width,1);
      c.width=img.width*ratio; c.height=img.height*ratio;
      const ctx=c.getContext('2d');
      ctx.drawImage(img,0,0,c.width,c.height);
      cb(c.toDataURL('image/jpeg',quality));
    };
    img.onerror=()=> showToast('❌ Format image invalide','');
    img.src=ev.target.result;
  };
  r.onerror=()=> showToast('❌ Erreur de lecture du fichier','');
  r.readAsDataURL(file);
}
function previewImg(e,id){
  const f=e.target.files[0];if(!f)return;
  compressImage(f, 400, 0.6, url=>{
    document.getElementById('imgPreview').src=url;
    document.getElementById('imgPreview').style.display='block';
    document.getElementById('imgUrl').value=url;
    showToast('✓ Image compressée, clique sur "Ajouter la photo"','');
  });
}
 
function saveImg(id){
  const el=document.getElementById('imgUrl');
  if(!el){ showToast('❌ Erreur technique',''); return; }
  const url=el.value.trim();
  if(!url){ showToast('❌ Ajoute d\'abord une image',''); return; }
  let prods;
  try { prods = JSON.parse(localStorage.getItem('sytamProducts')||'null')||DEFAULT_PRODUCTS; }
  catch(e){ showToast('❌ Erreur de données',''); return; }
  const p=prods.find(x=>x.id===id);
  if(!p){ showToast('❌ Produit introuvable',''); return; }
  if(!p.images) p.images = [];
  if(p.image && p.image.length > 100 && !p.images.includes(p.image)){
    p.images.unshift(p.image);
  }
  p.images.push(url);
  p.image = p.images[0];
  if(url.startsWith('data:')){
    const idx = p.images.length-1;
    dbSaveImg(id+'_'+idx, url).then(() => {
      try { SET('sytamProducts', prods); }
      catch(e){ showToast('❌ Stockage plein',''); return; }
      renderStockTable();closeModal();showToast('✓ Photo ajoutée','');
    });
  } else {
    try { SET('sytamProducts', prods); }
    catch(e){ showToast('❌ Stockage plein',''); return; }
    renderStockTable();closeModal();showToast('✓ Photo ajoutée','');
  }
}
function delProductImg(id, idx){
  let prods;
  try { prods = JSON.parse(localStorage.getItem('sytamProducts')||'null')||DEFAULT_PRODUCTS; }
  catch(e){ return; }
  const p=prods.find(x=>x.id===id);
  if(!p || !p.images) return;
  p.images.splice(idx, 1);
  if(p.images.length) p.image = p.images[0];
  else { p.image = ''; delete p.images; }
  try { SET('sytamProducts', prods); } catch(e){}
  dbDelImg(id+'_'+idx).catch(function(){});
  editImg(id);
}
 
function editStock(id){
  const p=getProds().find(x=>x.id===id);
  openModal('<button class="modal-x" onclick="closeModal()">✕</button>'+
    '<h2>Stock — '+p.name+'</h2>'+
    '<p style="font-size:.82rem;color:var(--tl);margin-bottom:1rem">Stock actuel : <strong>'+p.stock+'</strong></p>'+
    '<div class="form-group"><label class="form-label">Nouveau stock</label><input class="form-input" id="newStock" type="number" min="0" value="'+p.stock+'"></div>'+
    '<div style="display:flex;gap:.5rem;margin-bottom:1rem;flex-wrap:wrap">'+
      '<button class="btn-sm btn-del" onclick="document.getElementById(\'newStock\').value=0">Sold Out</button>'+
     '<button class="btn-sm btn-ok" onclick="document.getElementById(\'newStock\').value='+(p.stock+5)+'">+5</button>'+
'<button class="btn-sm btn-ok" onclick="document.getElementById(\'newStock\').value='+(p.stock+10)+'">+10</button>'+
'<button class="btn-sm btn-ok" onclick="document.getElementById(\'newStock\').value='+(p.stock+20)+'">+20</button>'+
    '</div>'+
    '<button class="btn-add" style="width:100%;border-radius:10px" onclick="saveStock('+id+')">Enregistrer</button>');
}
 
function saveStock(id){
  const val=parseInt(document.getElementById('newStock').value);
  if(isNaN(val)||val<0){showToast('⚠️ Valeur invalide','');return;}
  const prods=getProds();const p=prods.find(x=>x.id===id);
  p.stock=val;saveProds(prods);renderStockTable();closeModal();showToast('✓ Stock : '+val,'');
}
 
function editPromoModal(id){
  const p=getProds().find(x=>x.id===id);
  openModal('<button class="modal-x" onclick="closeModal()">✕</button>'+
    '<h2>Promotion — '+p.name+'</h2>'+
    '<p style="font-size:.82rem;color:var(--tl);margin-bottom:1rem">Prix actuel : <strong>'+p.price.toLocaleString('fr')+' FCFA</strong></p>'+
    '<div class="form-group"><label class="form-label">Réduction (%)</label><input class="form-input" id="promoVal" type="number" min="0" max="99" value="'+(p.promo||'')+'" oninput="updPrev('+p.price+')"></div>'+
    '<div id="promoPrev" style="background:rgba(74,15,27,.06);border-radius:10px;padding:.8rem;margin-bottom:1rem;font-size:.85rem;min-height:36px"></div>'+
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1rem">'+
      [10,20,30,50].map(n=>'<button class="btn-sm btn-promo" onclick="document.getElementById(\'promoVal\').value='+n+';updPrev('+p.price+')">'+n+'%</button>').join('')+
    '</div>'+
    '<button class="btn-add" style="width:100%;border-radius:10px;margin-bottom:.5rem" onclick="savePromo('+id+')">Appliquer</button>'+
    '<button class="btn-sm btn-del" style="width:100%;padding:.7rem;border-radius:10px" onclick="removePromo('+id+')">Supprimer la promotion</button>');
  updPrev(p.price);
}
 
function updPrev(price){
  const v=parseInt(document.getElementById('promoVal')?.value)||0;
  const ep=Math.round(price*(1-v/100));
  const el=document.getElementById('promoPrev');
  if(el)el.innerHTML=v>0?'Prix après : <strong style="color:var(--bx)">'+ep.toLocaleString('fr')+' FCFA</strong> <span style="color:var(--tl);text-decoration:line-through">'+price.toLocaleString('fr')+'</span>':'';
}
 
function savePromo(id){
  const v=parseInt(document.getElementById('promoVal').value);
  if(isNaN(v)||v<1||v>99){showToast('⚠️ Entrez un % entre 1 et 99','');return;}
  const prods=getProds();const p=prods.find(x=>x.id===id);
  p.promo=v;p.badge='Promo';saveProds(prods);renderStockTable();closeModal();showToast('✓ Promo -'+v+'% appliquée','');
}
 
function removePromo(id){
  const prods=getProds();const p=prods.find(x=>x.id===id);
  p.promo=null;if(p.badge==='Promo')p.badge=null;
  saveProds(prods);renderStockTable();closeModal();showToast('✓ Promotion supprimée','');
}
 
function editProduct(id){
  const p=getProds().find(x=>x.id===id);
  const cats=["Boucles d'oreilles","Bracelets","Colliers","Bagues","Chaînes de cheville","Sets"];
  const existingColors = (p.colors||[]).map((c,i)=>{
    const hex = typeof c==='object'?c.hex:c;
    const name = typeof c==='object'?(c.name||''):'';
    const stock = typeof c==='object'?(c.stock||0):0;
    const key = 'ec'+i;
    return `<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem;background:rgba(0,0,0,.03);padding:.5rem;border-radius:8px" id="ecrow-${key}">
      <input type="color" value="${hex}" style="width:36px;height:36px;border:none;border-radius:6px;cursor:pointer;padding:2px" id="echex-${key}">
      <input class="form-input" value="${name}" placeholder="Nom (ex: Doré)" style="flex:1;padding:.4rem .6rem;font-size:.8rem" id="ecname-${key}">
      <input class="form-input" value="${stock}" type="number" min="0" placeholder="Stock" style="width:70px;padding:.4rem .6rem;font-size:.8rem" id="ecstock-${key}">
      <button class="btn-sm btn-del" onclick="document.getElementById('ecrow-${key}').remove()">✕</button>
    </div>`;
  }).join('');
  openModal('<button class="modal-x" onclick="closeModal()">✕</button>'+
    '<h2>Modifier — '+p.name+'</h2>'+
    '<div class="form-group"><label class="form-label">Nom</label><input class="form-input" id="ep-name" value="'+p.name+'"></div>'+
    '<div class="form-group"><label class="form-label">Catégorie</label><select class="form-input" id="ep-cat">'+cats.map(c=>'<option'+(p.category===c?' selected':'')+'>'+c+'</option>').join('')+'</select></div>'+
    '<div class="form-row">'+
      '<div class="form-group"><label class="form-label">Prix (FCFA)</label><input class="form-input" id="ep-price" type="number" value="'+p.price+'"></div>'+
      '<div class="form-group"><label class="form-label">Stock global <span style="font-weight:400;font-size:.65rem;color:var(--tl)">(auto si couleurs)</span></label><input class="form-input" id="ep-stock" type="number" value="'+p.stock+'"></div>'+
    '</div>'+
    '<div class="form-group"><label class="form-label">Badge</label><select class="form-input" id="ep-badge"><option value="">Aucun</option>'+
      ['Nouveau','Populaire','Premium'].map(b=>'<option'+(p.badge===b?' selected':'')+'>'+b+'</option>').join('')+'</select></div>'+
    '<div class="form-group">'+
      '<label class="form-label">Couleurs &amp; stocks <span style="font-weight:400;color:var(--tl);font-size:.65rem">(optionnel — si plusieurs coloris)</span></label>'+
      '<div id="ep-colors-list">'+existingColors+'</div>'+
      '<div style="display:flex;gap:.5rem;margin-top:.6rem;align-items:center;flex-wrap:wrap">'+
        '<input type="color" id="ep-new-color" value="#C9A96E" style="width:36px;height:36px;border:none;border-radius:6px;cursor:pointer;padding:2px">'+
        '<input class="form-input" id="ep-new-name" placeholder="Nom couleur (ex: Doré)" style="flex:1;min-width:100px;padding:.4rem .6rem;font-size:.8rem">'+
        '<input class="form-input" id="ep-new-stock" type="number" min="0" placeholder="Stock" style="width:70px;padding:.4rem .6rem;font-size:.8rem">'+
        '<button class="btn-sm btn-ok" onclick="addColorRowEdit()">+ Ajouter</button>'+
      '</div>'+
      '<div style="font-size:.7rem;color:var(--tl);margin-top:.4rem">💡 Si vous ajoutez des couleurs, le stock global sera calculé automatiquement.</div>'+
    '</div>'+
    '<div class="form-group">'+
      '<label class="form-label">Tailles &amp; stocks <span style="font-weight:400;color:var(--tl);font-size:.65rem">(ex: bagues — optionnel)</span></label>'+
      '<div id="ep-sizes-list">'+
        ((p.sizes||[]).map((s,i)=>{
          const sn = typeof s==='object' ? s.name : s;
          const ss = typeof s==='object' ? s.stock : 0;
          return '<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem;background:rgba(0,0,0,.03);padding:.5rem;border-radius:8px" id="esrow-'+i+'">'+
            '<input class="form-input ep-size-name" value="'+esc(sn)+'" placeholder="Taille" style="width:60px;padding:.4rem .5rem;font-size:.8rem">'+
            '<input class="form-input ep-size-stock" value="'+ss+'" type="number" min="0" placeholder="Stock" style="width:70px;padding:.4rem .5rem;font-size:.8rem">'+
            '<button class="btn-sm btn-del" onclick="document.getElementById(\'esrow-'+i+'\').remove()">✕</button>'+
          '</div>';
        }).join('')||'')+
      '</div>'+
      '<div style="display:flex;gap:.5rem;margin-top:.6rem;align-items:center;flex-wrap:wrap">'+
        '<input class="form-input" id="ep-new-size" placeholder="Taille" style="width:60px;padding:.4rem .6rem;font-size:.8rem">'+
        '<input class="form-input" id="ep-new-size-stock" type="number" min="0" placeholder="Stock" style="width:70px;padding:.4rem .6rem;font-size:.8rem">'+
        '<button class="btn-sm btn-ok" onclick="addSizeEdit()">+ Ajouter</button>'+
      '</div>'+
      '<div style="font-size:.7rem;color:var(--tl);margin-top:.4rem">💡 Si vous ajoutez des tailles, le stock global sera calculé automatiquement.</div>'+
    '</div>'+
'<div class="form-group"><label class="form-label">Description</label><textarea class="form-input" id="ep-desc" rows="3" placeholder="Décrivez ce bijou…">'+(p.description||'')+'</textarea></div>'+
'<button class="btn-add" style="width:100%;border-radius:10px;margin-top:.5rem" onclick="saveEditProduct('+id+')">Enregistrer</button>');}

function addSizeEdit(){
  const name = document.getElementById('ep-new-size').value.trim();
  const stock = document.getElementById('ep-new-size-stock').value||0;
  if(!name){ showToast('⚠️ Entrez une taille'); return; }
  const list = document.getElementById('ep-sizes-list');
  const div = document.createElement('div');
  div.style.cssText = 'display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem;background:rgba(0,0,0,.03);padding:.5rem;border-radius:8px';
  div.innerHTML = `<input class="form-input ep-size-name" value="${esc(name)}" placeholder="Taille" style="width:60px;padding:.4rem .5rem;font-size:.8rem">
    <input class="form-input ep-size-stock" value="${stock}" type="number" min="0" placeholder="Stock" style="width:70px;padding:.4rem .5rem;font-size:.8rem">
    <button class="btn-sm btn-del" onclick="this.parentElement.remove()">✕</button>`;
  list.appendChild(div);
  document.getElementById('ep-new-size').value='';
  document.getElementById('ep-new-size-stock').value='';
}
function addColorRowEdit(){
  const hex = document.getElementById('ep-new-color').value;
  const name = document.getElementById('ep-new-name').value.trim();
  const stock = document.getElementById('ep-new-stock').value||0;
  if(!name){ showToast('⚠️ Entrez un nom pour la couleur',''); return; }
  const key = 'ec'+Date.now();
  const div = document.createElement('div');
  div.id = 'ecrow-'+key;
  div.style.cssText = 'display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem;background:rgba(0,0,0,.03);padding:.5rem;border-radius:8px';
  div.innerHTML = `<input type="color" value="${hex}" style="width:36px;height:36px;border:none;border-radius:6px;cursor:pointer;padding:2px" id="echex-${key}">
    <input class="form-input" value="${name}" placeholder="Nom" style="flex:1;padding:.4rem .6rem;font-size:.8rem" id="ecname-${key}">
    <input class="form-input" value="${stock}" type="number" min="0" placeholder="Stock" style="width:70px;padding:.4rem .6rem;font-size:.8rem" id="ecstock-${key}">
    <button class="btn-sm btn-del" onclick="this.closest('div').remove()">✕</button>`;
  document.getElementById('ep-colors-list').appendChild(div);
  document.getElementById('ep-new-name').value='';
  document.getElementById('ep-new-stock').value='';
}



function updateColorRow(picker, key){
  const inp = document.getElementById('ec-val-'+key);
  if(inp) inp.value = picker.value;
}
function saveEditProduct(id){
  const prods=getProds();
  const p=prods.find(x=>x.id===id);
  p.name=document.getElementById('ep-name').value.trim()||p.name;
  p.category=document.getElementById('ep-cat').value;
  p.price=parseInt(document.getElementById('ep-price').value)||p.price;
  p.badge=document.getElementById('ep-badge').value||null;
  p.description = document.getElementById('ep-desc').value.trim();
  // Récupérer les couleurs avec leurs stocks
  const rows = document.getElementById('ep-colors-list').querySelectorAll('[id^="ecrow-"]');
  const colors = [];
  rows.forEach(row=>{
    const key = row.id.replace('ecrow-','');
    const hex = document.getElementById('echex-'+key)?.value||'';
    const name = document.getElementById('ecname-'+key)?.value.trim()||'';
    const stock = parseInt(document.getElementById('ecstock-'+key)?.value)||0;
    if(hex && name) colors.push({hex, name, stock});
  });
  p.colors = colors;
  // Stock global = somme des couleurs si couleurs existent
  if(colors.length > 0){
    p.stock = colors.reduce((s,c)=>s+c.stock, 0);
  } else {
    p.stock = parseInt(document.getElementById('ep-stock').value)||0;
  }
  const sizeRows = document.getElementById('ep-sizes-list').querySelectorAll('[style*="display:flex"]');
  const sizes = [];
  sizeRows.forEach(row=>{
    const name = row.querySelector('.ep-size-name')?.value.trim();
    const stock = parseInt(row.querySelector('.ep-size-stock')?.value)||0;
    if(name) sizes.push({name, stock});
  });
  p.sizes = sizes.length ? sizes : undefined;
  if(sizes.length > 0) p.stock = sizes.reduce((s,x)=>s+x.stock,0);
  try { saveProds(prods); }
  catch(e){ showToast('❌ Sauvegarde impossible (stockage plein)',''); return; }
  renderStockTable();closeModal();showToast('✓ Produit mis à jour','');
}
 
function delProduct(id){
  if(!confirm('Supprimer ce produit définitivement ?')) return;
  const prods=getProds().filter(x=>x.id!==id);
  saveProds(prods);renderStockTable();showToast('Produit supprimé','');
}
 
function openAddProduct(){
  const cats=["Boucles d'oreilles","Bracelets","Colliers","Bagues","Chaînes de cheville","Sets"];
  openModal('<button class="modal-x" onclick="closeModal()">✕</button>'+
    '<h2>Ajouter un produit</h2>'+
    '<div class="form-group"><label class="form-label">Nom *</label><input class="form-input" id="np-name" placeholder="Nom du bijou"></div>'+
    '<div class="form-group"><label class="form-label">Catégorie</label><select class="form-input" id="np-cat">'+cats.map(c=>'<option>'+c+'</option>').join('')+'</select></div>'+
    '<div class="form-row">'+
      '<div class="form-group"><label class="form-label">Prix (FCFA) *</label><input class="form-input" id="np-price" type="number" placeholder="2500"></div>'+
      '<div class="form-group"><label class="form-label">Stock global *</label><input class="form-input" id="np-stock" type="number" placeholder="10"></div>'+
    '</div>'+
    '<div class="form-group"><label class="form-label">Photo</label>'+
      '<div class="img-upload" onclick="document.getElementById(\'np-f\').click()">📷 Choisir une image<input type="file" id="np-f" accept="image/*" onchange="npPrev(event)"></div>'+
      '<img id="np-prev" style="width:100%;height:100px;object-fit:contain;border-radius:8px;margin-top:.5rem;display:none">'+
    '</div>'+
    '<div class="form-group"><label class="form-label">Ou URL / chemin</label><input class="form-input" id="np-img" placeholder="https://... ou images/mon-produit.jpg"></div>'+
    '<div style="font-size:.7rem;color:var(--tl);margin-top:-.5rem;margin-bottom:.8rem">💡 Pour 100+ articles, utilisez le dossier <strong>images/</strong> (ex: <code>images/bracelet.jpg</code>)</div>'+
    '<div class="form-group"><label class="form-label">Badge</label><select class="form-input" id="np-badge"><option value="">Aucun</option><option>Nouveau</option><option>Populaire</option><option>Premium</option></select></div>'+
    '<div class="form-group"><label class="form-label">Description</label><textarea class="form-input" id="np-desc" rows="3" placeholder="Décrivez ce bijou…"></textarea></div>'+
    '<div class="form-group">'+
      '<label class="form-label">Couleurs &amp; stocks <span style="font-weight:400;color:var(--tl);font-size:.65rem">(optionnel)</span></label>'+
      '<div id="np-colors-list"></div>'+
      '<div style="display:flex;gap:.5rem;margin-top:.6rem;align-items:center;flex-wrap:wrap">'+
        '<input type="color" id="np-new-color" value="#C9A96E" style="width:36px;height:36px;border:none;border-radius:6px;cursor:pointer;padding:2px">'+
        '<input class="form-input" id="np-new-name" placeholder="Nom couleur (ex: Doré)" style="flex:1;min-width:100px;padding:.4rem .6rem;font-size:.8rem">'+
        '<input class="form-input" id="np-new-stock-c" type="number" min="0" placeholder="Stock" style="width:70px;padding:.4rem .6rem;font-size:.8rem">'+
        '<button class="btn-sm btn-ok" onclick="addColorRowNew()">+ Ajouter</button>'+
      '</div>'+
      '<div style="font-size:.7rem;color:var(--tl);margin-top:.4rem">💡 Si vous ajoutez des couleurs, le stock global sera calculé automatiquement.</div>'+
    '</div>'+
    '<div class="form-group">'+
      '<label class="form-label">Tailles &amp; stocks <span style="font-weight:400;color:var(--tl);font-size:.65rem">(ex: bagues — optionnel)</span></label>'+
      '<div id="np-sizes-list"></div>'+
      '<div style="display:flex;gap:.5rem;margin-top:.6rem;align-items:center;flex-wrap:wrap">'+
        '<input class="form-input" id="np-new-size" placeholder="Taille" style="width:60px;padding:.4rem .6rem;font-size:.8rem">'+
        '<input class="form-input" id="np-new-size-stock" type="number" min="0" placeholder="Stock" style="width:70px;padding:.4rem .6rem;font-size:.8rem">'+
        '<button class="btn-sm btn-ok" onclick="addSizeNew()">+ Ajouter</button>'+
      '</div>'+
      '<div style="font-size:.7rem;color:var(--tl);margin-top:.4rem">💡 Si vous ajoutez des tailles, le stock global sera calculé automatiquement.</div>'+
    '</div>'+
    '<button class="btn-add" style="width:100%;border-radius:10px" onclick="saveNewProduct()">Ajouter le produit</button>');
}


function addColorRowNew(){
  const hex = document.getElementById('np-new-color').value;
  const name = document.getElementById('np-new-name').value.trim();
  const stock = document.getElementById('np-new-stock-c').value||0;
  if(!name){ showToast('⚠️ Entrez un nom pour la couleur',''); return; }
  const key = 'nc'+Date.now();
  const div = document.createElement('div');
  div.style.cssText = 'display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem;background:rgba(0,0,0,.03);padding:.5rem;border-radius:8px';
  div.innerHTML = `<input type="color" value="${hex}" style="width:36px;height:36px;border:none;border-radius:6px;cursor:pointer;padding:2px" id="nchex-${key}">
    <input class="form-input" value="${name}" placeholder="Nom" style="flex:1;padding:.4rem .6rem;font-size:.8rem" id="ncname-${key}">
    <input class="form-input" value="${stock}" type="number" min="0" placeholder="Stock" style="width:70px;padding:.4rem .6rem;font-size:.8rem" id="ncstock-${key}">
    <button class="btn-sm btn-del" onclick="this.closest('div').remove()">✕</button>`;
  document.getElementById('np-colors-list').appendChild(div);
  document.getElementById('np-new-name').value='';
  document.getElementById('np-new-stock-c').value='';
}
 
function addSizeNew(){
  const name = document.getElementById('np-new-size').value.trim();
  const stock = document.getElementById('np-new-size-stock').value||0;
  if(!name){ showToast('⚠️ Entrez une taille'); return; }
  const list = document.getElementById('np-sizes-list');
  const div = document.createElement('div');
  div.style.cssText = 'display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem;background:rgba(0,0,0,.03);padding:.5rem;border-radius:8px';
  div.innerHTML = `<input class="form-input np-size-name" value="${esc(name)}" placeholder="Taille" style="width:60px;padding:.4rem .5rem;font-size:.8rem">
    <input class="form-input np-size-stock" value="${stock}" type="number" min="0" placeholder="Stock" style="width:70px;padding:.4rem .5rem;font-size:.8rem">
    <button class="btn-sm btn-del" onclick="this.parentElement.remove()">✕</button>`;
  list.appendChild(div);
  document.getElementById('np-new-size').value='';
  document.getElementById('np-new-size-stock').value='';
}
function npPrev(e){
  const f=e.target.files[0];if(!f)return;
  compressImage(f, 400, 0.6, url=>{
    document.getElementById('np-prev').src=url;
    document.getElementById('np-prev').style.display='block';
    document.getElementById('np-img').value=url;
  });
}
 
function saveNewProduct(){
  const name=document.getElementById('np-name').value.trim();
  const price=parseInt(document.getElementById('np-price').value);
  if(!name||!price){ showToast('⚠️ Remplissez les champs obligatoires',''); return; }
  // Récupérer les couleurs
  const rows = document.getElementById('np-colors-list').querySelectorAll('[id^="nchex-"]');
  const colors = [];
  rows.forEach(row=>{
    const key = row.id.replace('nchex-','');
    const hex = document.getElementById('nchex-'+key)?.value||'';
    const cname = document.getElementById('ncname-'+key)?.value.trim()||'';
    const cstock = parseInt(document.getElementById('ncstock-'+key)?.value)||0;
    if(hex && cname) colors.push({hex, name:cname, stock:cstock});
  });
  // Stock = somme couleurs ou stock global
  const stockGlobal = parseInt(document.getElementById('np-stock').value)||0;
  const stock = colors.length>0 ? colors.reduce((s,c)=>s+c.stock,0) : stockGlobal;
  const prods=getProds();
  const id=Math.max(...prods.map(p=>p.id),0)+1;
  const sizeRows = document.getElementById('np-sizes-list').querySelectorAll('[style*="display:flex"]');
  const sizes = [];
  sizeRows.forEach(row=>{
    const n = row.querySelector('.np-size-name')?.value.trim();
    const s = parseInt(row.querySelector('.np-size-stock')?.value)||0;
    if(n) sizes.push({name:n, stock:s});
  });
  const finalStock = sizes.length>0 ? sizes.reduce((sum,x)=>sum+x.stock,0) : stock;
  const newImg = document.getElementById('np-img').value.trim()||'';
  prods.push({id,name,category:document.getElementById('np-cat').value,price,stock:finalStock,sold:0,
    image: newImg,
    images: newImg ? [newImg] : [],
    badge:document.getElementById('np-badge').value||null,
    description:document.getElementById('np-desc')?.value.trim()||'',
    promo:null, colors, sizes: sizes.length?sizes:undefined});
  try { saveProds(prods); }
  catch(e){ showToast('❌ Image trop volumineuse ou stockage plein',''); return; }
  renderStockTable();
  const el=document.getElementById('s-products');if(el)el.textContent=prods.length;
  closeModal();showToast('✓ '+name+' ajouté !','');
}
 
// ===== PROMOS =====
function getPromoCodes(){ return G('sytam_promoCodes')||{}; }
function savePromoCodes(c){ SET('sytam_promoCodes',c); }
 
function renderPromoCodes(){
  const codes=getPromoCodes();
  const el=document.getElementById('promoCodesList');
  if(!el) return;
  if(!Object.keys(codes).length){el.innerHTML='<p style="color:var(--tl);font-size:.82rem;text-align:center;padding:1.5rem">Aucun code créé.</p>';return;}
  el.innerHTML=Object.entries(codes).map(([code,data])=>
    '<div class="promo-code-item '+(data.active?'active-c':'')+'">' +
    '<div><div class="pc-code">'+code+'</div>'+
    '<div class="pc-info">'+(data.label||code)+' — '+(data.type==='percent'?data.value+'%':data.value.toLocaleString('fr')+' FCFA')+'</div>'+
    (data.influencer?'<div class="pc-info">👤 '+data.influencer+'</div>':'')+
    '</div>' +
    '<div style="display:flex;flex-direction:column;gap:.4rem;align-items:flex-end">'+
    '<span class="pc-badge '+(data.active?'pc-active':'pc-inactive')+'">'+(data.active?'✓ Actif':'Désactivé')+'</span>'+
    '<button class="btn-sm '+(data.active?'btn-del':'btn-ok')+'" onclick="toggleCode(\''+code+'\')">'+(data.active?'Désactiver':'Activer')+'</button>'+
    '<button class="btn-sm btn-del" onclick="deleteCode(\''+code+'\')">Supprimer</button>'+
    '</div></div>'
  ).join('');
}
 
function toggleCode(code){
  const codes=getPromoCodes();if(codes[code])codes[code].active=!codes[code].active;
  savePromoCodes(codes);renderPromoCodes();showToast('✓ Code mis à jour','');
}
 
function deleteCode(code){
  if(!confirm('Supprimer le code '+code+' ?')) return;
  const codes=getPromoCodes();delete codes[code];
  savePromoCodes(codes);renderPromoCodes();showToast('Code supprimé','');
}
 
function openAddPromoCode(){
  openModal('<button class="modal-x" onclick="closeModal()">✕</button>'+
    '<h2>Nouveau code promo</h2>'+
    '<div class="form-group"><label class="form-label">Code *</label><input class="form-input" id="pc-code" placeholder="Ex: NDEYE20" oninput="this.value=this.value.toUpperCase()"></div>'+
    '<div class="form-group"><label class="form-label">Influenceuse / partenaire</label><input class="form-input" id="pc-inf" placeholder="Nom de l\'influenceuse…"></div>'+
    '<div class="form-group"><label class="form-label">Type</label><select class="form-input" id="pc-type"><option value="percent">Pourcentage (%)</option><option value="fixed">Montant fixe (FCFA)</option></select></div>'+
    '<div class="form-group"><label class="form-label">Valeur</label><input class="form-input" id="pc-val" type="number" min="1" placeholder="ex: 20"></div>'+
    '<div class="form-group"><label class="form-label">Description</label><input class="form-input" id="pc-lbl" placeholder="Ex: -20% pour abonnés Ndèye"></div>'+
    '<button class="btn-add" style="width:100%;border-radius:10px" onclick="saveNewCode()">Créer le code</button>');
}
 
function saveNewCode(){
  const code=document.getElementById('pc-code').value.trim().toUpperCase();
  const val=parseInt(document.getElementById('pc-val').value);
  if(!code||!val){showToast('⚠️ Remplissez les champs obligatoires','');return;}
  const codes=getPromoCodes();
  codes[code]={type:document.getElementById('pc-type').value,value:val,label:document.getElementById('pc-lbl').value.trim()||code,influencer:document.getElementById('pc-inf').value.trim(),active:true,uses:0,createdAt:new Date().toLocaleDateString('fr-FR')};
  savePromoCodes(codes);renderPromoCodes();closeModal();showToast('✓ Code "'+code+'" créé !','');
}
 
function renderPromoProducts(){
  const prods=getProds().filter(p=>p.promo);
  const el=document.getElementById('promoProductsList');
  if(!el) return;
  if(!prods.length){el.innerHTML='<p style="font-size:.82rem;color:var(--tl)">Aucun produit en promotion.</p>';return;}
  el.innerHTML=prods.map(p=>
    '<div style="display:flex;justify-content:space-between;align-items:center;padding:.6rem 0;border-bottom:1px solid var(--bd);font-size:.82rem">'+
    '<span><strong>'+p.name+'</strong> — <span style="color:var(--tl)">'+p.category+'</span></span>'+
    '<div style="display:flex;align-items:center;gap:.5rem">'+
      '<span style="color:var(--er);font-weight:700">-'+p.promo+'%</span>'+
      '<span style="color:var(--tl);text-decoration:line-through">'+p.price.toLocaleString('fr')+'</span>'+
      '<button class="btn-sm btn-del" onclick="rmPromo('+p.id+')">✕</button>'+
    '</div></div>'
  ).join('');
}
 
function rmPromo(id){
  const prods=getProds();const p=prods.find(x=>x.id===id);
  if(p){p.promo=null;if(p.badge==='Promo')p.badge=null;}
  saveProds(prods);renderPromoProducts();renderStockTable();showToast('✓ Promo supprimée','');
}
 
function applyBulkPromo(){
  const cat=document.getElementById('bulkCat').value;
  const pct=parseInt(document.getElementById('bulkPct').value);
  if(!pct||pct<1||pct>99){showToast('⚠️ Entrez un % entre 1 et 99','');return;}
  const prods=getProds();let cnt=0;
  prods.forEach(p=>{if(!cat||p.category===cat){p.promo=pct;p.badge='Promo';cnt++;}});
  saveProds(prods);renderPromoProducts();renderStockTable();
  showToast('✓ -'+pct+'% appliqué à '+cnt+' produit(s)','');
}
 
function clearAllPromos(){
  if(!confirm('Supprimer toutes les promotions sur les produits ?')) return;
  const prods=getProds();
  prods.forEach(p=>{p.promo=null;if(p.badge==='Promo')p.badge=null;});
  saveProds(prods);renderPromoProducts();renderStockTable();showToast('✓ Toutes les promos supprimées','');
}
 
// ===== MESSAGES =====
async function renderMessages(){
  const msgs = isFirebaseReady() ? await fbLoadMessages() : JSON.parse(localStorage.getItem('sytam_contactMessages') || '[]');
  const container = document.getElementById('messagesContainer');
  if(!msgs.length){
    container.innerHTML = '<p style="color:var(--tl);font-size:.85rem">Aucun message pour le moment.</p>';
    return;
  }
  container.innerHTML = '<div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Prénom</th><th>Email</th><th>Téléphone</th><th>Message</th><th></th></tr></thead><tbody>'
    + msgs.slice().reverse().map(m => {
      const date = new Date(m.date);
      const dateStr = date.toLocaleDateString('fr-FR') + ' ' + date.toLocaleTimeString('fr-FR', {hour:'2-digit',minute:'2-digit'});
      const numId = m.id;
      return '<tr style="'+(m.read?'':'font-weight:600;background:rgba(201,169,110,0.08)')+'">'
        + '<td style="white-space:nowrap;font-size:.75rem">'+dateStr+'</td>'
        + '<td>'+esc(m.firstName)+' '+esc(m.lastName)+'</td>'
        + '<td>'+(m.email?'<a href="mailto:'+esc(m.email)+'" style="color:var(--inf)">'+esc(m.email)+'</a>':'<span style="color:var(--tl)">—</span>')+'</td>'
        + '<td>'+(m.phone?esc(m.phone):'<span style="color:var(--tl)">—</span>')+'</td>'
        + '<td style="max-width:250px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+esc(m.message)+'">'+esc(m.message.length>60?m.message.substring(0,60)+'…':m.message)+'</td>'
        + '<td style="white-space:nowrap">'
        + '<button class="btn-sm '+(m.read?'btn-edit':'btn-ok')+'" onclick="markMsgRead('+numId+')" style="margin-right:4px">'+(m.read?'Voir':'Lire')+'</button>'
        + '<button class="btn-sm btn-del" onclick="delMsg('+numId+')">Suppr.</button>'
        + '</td></tr>';
    }).join('')
    + '</tbody></table></div>';
}
async function markMsgRead(id){
  const msgs = JSON.parse(localStorage.getItem('sytam_contactMessages') || '[]');
  const m = msgs.find(x => x.id === id || x.fid === id);
  if(!m) return;
  fbUpdateMessage(m.fid || id, { read: true });
  m.read = true;
  localStorage.setItem('sytam_contactMessages', JSON.stringify(msgs));
  renderMessages(); checkNotifs();
  const date = new Date(m.date);
  openModal(`
    <button class="modal-x" onclick="closeModal()">✕</button>
    <h2>Message de ${esc(m.firstName)} ${esc(m.lastName)}</h2>
    <div style="font-size:.82rem;line-height:1.8">
      <div style="margin-bottom:1rem;background:var(--cr);padding:1rem;border-radius:10px;border:1px solid var(--bd);">
        <div><strong>Date :</strong> ${date.toLocaleDateString('fr-FR')} à ${date.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}</div>
        ${m.email ? '<div style="margin-top:.3rem"><strong>Email :</strong> <a href="mailto:'+esc(m.email)+'" style="color:var(--inf)">'+esc(m.email)+'</a></div>' : ''}
        ${m.phone ? '<div style="margin-top:.3rem"><strong>Téléphone :</strong> '+esc(m.phone)+'</div>' : ''}
      </div>
      <div style="background:var(--wh);border:1px solid var(--bd);border-radius:10px;padding:1rem;margin-bottom:1rem;font-size:.85rem;line-height:1.7;white-space:pre-wrap;">${esc(m.message)}</div>
      <button class="btn-add" style="width:100%;border-radius:10px" onclick="closeModal()">Fermer</button>
    </div>
  `);
}
async function delMsg(id){
  let msgs = JSON.parse(localStorage.getItem('sytam_contactMessages') || '[]');
  const m = msgs.find(x => x.id === id || x.fid === id);
  fbDeleteMessage(m ? (m.fid || id) : id);
  msgs = msgs.filter(x => x.id !== id && x.fid !== id);
  localStorage.setItem('sytam_contactMessages', JSON.stringify(msgs));
  renderMessages(); checkNotifs();
}
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ===== ANALYTICS =====
function renderAnalytics(){
  const orders=getOrders();
  const rev=orders.reduce((s,o)=>s+o.total,0);
  const avg=orders.length?Math.round(rev/orders.length):0;
  const units=orders.reduce((s,o)=>s+o.items.reduce((ss,i)=>ss+i.qty,0),0);
  const safeSet=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  safeSet('a-rev',rev.toLocaleString('fr')+' FCFA');
  safeSet('a-avg',avg.toLocaleString('fr')+' FCFA');
  safeSet('a-cnt',orders.length);
  safeSet('a-units',units);
 
  const sold={};orders.forEach(o=>o.items.forEach(i=>{sold[i.name]=(sold[i.name]||0)+i.qty;}));
  const sorted=Object.entries(sold).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const topEl=document.getElementById('topProds');
  if(topEl){
    if(!sorted.length){topEl.innerHTML='<p style="color:var(--tl);font-size:.82rem">Aucune vente</p>';}
    else{const max=sorted[0][1];topEl.innerHTML=sorted.map(([n,q])=>'<div style="margin-bottom:.7rem"><div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:.3rem"><span>'+n+'</span><span style="font-weight:700">'+q+' pcs</span></div><div style="background:rgba(0,0,0,.08);border-radius:3px;height:8px"><div style="width:'+q/max*100+'%;height:100%;background:var(--bx);border-radius:3px"></div></div></div>').join('');}
  }
 
  function renderList(elId,data,labelFn){
    const el=document.getElementById(elId);if(!el)return;
    if(!Object.keys(data).length){el.innerHTML='<p style="color:var(--tl);font-size:.82rem">Aucune donnée</p>';return;}
    const tot=Object.values(data).reduce((s,v)=>s+v,0);
    el.innerHTML=Object.entries(data).map(([k,c])=>
      '<div style="display:flex;justify-content:space-between;align-items:center;padding:.5rem 0;border-bottom:1px solid var(--bd);font-size:.82rem">'+
      '<span>'+labelFn(k)+'</span><strong>'+c+' ('+Math.round(c/tot*100)+'%)</strong></div>'
    ).join('');
  }
  const pays={};orders.forEach(o=>{pays[o.payment]=(pays[o.payment]||0)+1;});
  renderList('payAnalytics',pays,paymentLabel);
  const zones={};orders.forEach(o=>{if(o.zone)zones[o.zone]=(zones[o.zone]||0)+1;});
  renderList('zoneAnalytics',zones,z=>'📍 '+z);
  const stats={};orders.forEach(o=>{stats[o.status]=(stats[o.status]||0)+1;});
  const stEl=document.getElementById('statusAnalytics');
  if(stEl){
    const tot=Object.values(stats).reduce((s,v)=>s+v,0)||1;
    stEl.innerHTML=Object.entries(stats).map(([s,c])=>'<div style="display:flex;justify-content:space-between;align-items:center;padding:.5rem 0;border-bottom:1px solid var(--bd);font-size:.82rem"><span><span class="badge b-'+s+'">'+statusLabel(s)+'</span></span><strong>'+c+' ('+Math.round(c/tot*100)+'%)</strong></div>').join('');
  }
}
 
// ===== VISITORS =====
function renderVisitors(){
  const visits=G('sytamVisits')||{};
  const today=new Date().toISOString().slice(0,10);
  let todayV=visits[today]||0,weekV=0,monthV=0,totalV=0;
  const now=new Date();
  Object.entries(visits).forEach(([d,c])=>{
    totalV+=c;
    const diff=(now-new Date(d))/(1000*60*60*24);
    if(diff<=7)weekV+=c;
    if(diff<=30)monthV+=c;
  });
  const safeSet=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  safeSet('v-today',todayV);safeSet('v-week',weekV);safeSet('v-month',monthV);safeSet('v-total',totalV);
 
  const chartEl=document.getElementById('visChart');
  if(chartEl){
    const last30=[];
    for(let i=29;i>=0;i--){
      const d=new Date();d.setDate(d.getDate()-i);
      last30.push(visits[d.toISOString().slice(0,10)]||0);
    }
    const maxV=Math.max(...last30,1);
    chartEl.innerHTML=last30.map(v=>'<div class="vis-bar" style="height:'+Math.max(4,v/maxV*76)+'px;opacity:'+(0.3+v/maxV*0.7)+'" ></div>').join('');
  }
 
  const pages=G('sytamPageViews')||{};
  const pEl=document.getElementById('topPages');
  if(pEl){
    const tot=Object.values(pages).reduce((s,v)=>s+v,0)||1;
    const sorted=Object.entries(pages).sort((a,b)=>b[1]-a[1]);
    pEl.innerHTML=sorted.length?sorted.map(([pg,c])=>'<div style="display:flex;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid var(--bd);font-size:.82rem"><span>📄 '+pg+'</span><strong>'+c+' ('+Math.round(c/tot*100)+'%)</strong></div>').join(''):'<p style="color:var(--tl);font-size:.82rem">Aucune donnée</p>';
  }
 
  const srcEl=document.getElementById('trafficSrc');
  if(srcEl){
    srcEl.innerHTML=[['Direct / URL',70],['Instagram',15],['WhatsApp',10],['Autre',5]].map(([s,p])=>
      '<div style="margin-bottom:.7rem"><div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:.3rem"><span>'+s+'</span><span style="font-weight:700">'+p+'%</span></div><div style="background:rgba(0,0,0,.08);border-radius:3px;height:6px"><div style="width:'+p+'%;height:100%;background:var(--bx);border-radius:3px"></div></div></div>'
    ).join('');
  }
}
 
// ===== DEMO DATA =====
function genDemo(){
  const names=['Fatou Diallo','Aminata Sow','Mariama Ba','Rokhaya Ndiaye','Aissatou Diop','Ndèye Fall','Coumba Sarr'];
  const phones=['221771234567','221782345678','221763456789','221703456789'];
  const zones=[{zone:'Dakar Centre',price:2000},{zone:'Dakar Centre',price:2000},{zone:'Dakar Banlieue',price:3000},{zone:'Régions',price:5000}];
  const pays=['wave','wave','wave','orange','free'];
  const statuses=['paid','paid','paid','shipped','pending','cancelled'];
  const addrs=['Plateau, Rue 10','Médina, Av Blaise','Keur Massar','Mbao Zone A','Pikine Rue 15','Thiès Centre'];
  const prods=getProds();
  const orders=getOrders();
  for(let i=0;i<15;i++){
    const numItems=Math.floor(Math.random()*3)+1;
    const items=[];
    for(let j=0;j<numItems;j++){
      const p=prods[Math.floor(Math.random()*prods.length)];
      const { image, stock, sold, badge, promo, colors, ...pLight } = p;
      items.push({...pLight,qty:Math.floor(Math.random()*2)+1,effectivePrice:EP(p)});
    }
    const sub=items.reduce((s,x)=>s+x.effectivePrice*x.qty,0);
    const del=zones[Math.floor(Math.random()*zones.length)];
    const d=new Date();d.setDate(d.getDate()-Math.floor(Math.random()*30));
    const phone=phones[Math.floor(Math.random()*phones.length)];
    orders.push({id:'SYT-'+Math.floor(Math.random()*900000+100000),customer:names[Math.floor(Math.random()*names.length)],phone,address:addrs[Math.floor(Math.random()*addrs.length)],items,zone:del.zone,deliveryCost:del.price,payment:pays[Math.floor(Math.random()*pays.length)],subtotal:sub,total:sub+del.price,status:statuses[Math.floor(Math.random()*statuses.length)],date:d.toLocaleDateString('fr-FR')});
    // Track loyalty for demo
    const key='sytam_loyalty_'+phone;
    let loy=JSON.parse(localStorage.getItem(key)||'null')||{phone,name:names[Math.floor(Math.random()*names.length)],orders:0,totalSpent:0};
    loy.orders++;loy.totalSpent+=(sub+del.price);
    localStorage.setItem(key,JSON.stringify(loy));
  }
  saveOrders(orders);
  goTab('dashboard',document.querySelector('.sb-item'));
  showToast('✓ 15 commandes démo générées','');
}
 
function exportData(){
  const data = {
    date: new Date().toISOString(),
    products: getProds(),
    orders: getOrders(),
    deletedOrders: JSON.parse(localStorage.getItem('sytam_deletedOrders')||'[]'),
    messages: JSON.parse(localStorage.getItem('sytam_contactMessages')||'[]'),
    notifs: JSON.parse(localStorage.getItem('sytam_adminNotifs')||'[]')
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'sytam-backup-' + new Date().toISOString().slice(0,10) + '.json';
  a.click();
  URL.revokeObjectURL(a.href);
  showToast('\u2713 Export\u00E9 !','Fichier t\u00E9l\u00E9charg\u00E9');
}
function clearOrders(){
  if(!confirm('Effacer toutes les commandes ?')) return;
  const old = getOrders();
  old.forEach(o => fbDeleteOrder(o.id));
  saveOrders([]);
  initAdmin();showToast('Commandes effacées','');
}
 
function renderSettings(){
  const el = document.getElementById('ntfyTopic');
  if(!el) return;
  // Try Firestore first, fallback localStorage
  const local = (JSON.parse(localStorage.getItem(NTFY_SETTINGS_KEY)||'{}').topic||'');
  el.value = local || 'sytam-orders';
  fbLoadNtfyTopic().then(topic => {
    if (topic) { el.value = topic; }
  });
}
function saveNtfy(){
  const topic = document.getElementById('ntfyTopic').value.trim()||'sytam-orders';
  fbSaveNtfyTopic(topic);
  const d = document.getElementById('ntfyTopicDisplay');
  if(d) d.textContent = topic;
  showToast('✓ Notifications ntfy enregistrées','');
}
function sendNtfy(order){
  try {
    const s = JSON.parse(localStorage.getItem(NTFY_SETTINGS_KEY)||'{}');
    const topic = s.topic||'sytam-orders';
    const ttl = order.total.toLocaleString('fr');
    const itemsStr = order.items.map(i =>
      i.name+(i.selectedColorName?' ('+i.selectedColorName+')':'')+' x'+i.qty
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
function testNtfy(){
  const s = JSON.parse(localStorage.getItem(NTFY_SETTINGS_KEY)||'{}');
  const topic = s.topic||'sytam-orders';
  document.getElementById('ntfyStatus').textContent = 'Envoi...';
  const url = 'https://ntfy.sh/'+topic+'?title='+encodeURIComponent('\uD83D\uDD14 Sytam Jewelry \u2014 Test OK')+'&priority=high';
  const body = '\u2705 Notifications OK ! Tu recevras les commandes ici.';
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'text/plain');
  xhr.onload = function(){ document.getElementById('ntfyStatus').textContent = '\u2713 Envoy\u00E9 ! V\u00E9rifie ton t\u00E9l\u00E9phone'; };
  xhr.onerror = function(){ document.getElementById('ntfyStatus').textContent = '\u274C \u00C9chec envoi'; };
  xhr.send(body);
  showToast('\u2713 Notification envoy\u00E9e !','');
}

// ===== HELPERS =====
const payIconsA = {
  wave: '<img src="images/wave.png" style="height:14px;vertical-align:middle;margin-right:4px;object-fit:contain" alt="Wave">',
  orange: '<img src="images/orange.jpg" style="height:14px;vertical-align:middle;margin-right:4px;object-fit:contain" alt="Orange Money">',
  free: '<img src="images/free.png" style="height:14px;vertical-align:middle;margin-right:4px;object-fit:contain" alt="Free Money">',
};
function paymentLabel(m){ return{wave:payIconsA.wave+' Wave',orange:payIconsA.orange+' Orange Money',free:payIconsA.free+' Free Money',card:'Carte'}[m]||m; }
function statusLabel(s){ return{pending:'En attente',paid:'Payée',shipped:'Expédiée',cancelled:'Annulée'}[s]||s; }
 
function showToast(title,body){
  const t=document.getElementById('toast');
  const m = { '✓':ic('check',14),'❌':ic('x',14),'⚠️':ic('alert',14),'✅':ic('check',14),'⏳':ic('clock',14),'🗑':ic('trash',14),'🎁':ic('gift',14) };
  for(const [e,ico] of Object.entries(m)){
    if(title.startsWith(e)){ title=ico+title.slice(e.length); break; }
  }
  document.getElementById('toastTitle').innerHTML=title;
  document.getElementById('toastBody').textContent=body;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}
 
function openModal(html){
  document.getElementById('modal').innerHTML=html;
  document.getElementById('modalOv').classList.add('open');
}
 
function closeModal(){ document.getElementById('modalOv').classList.remove('open'); }
function closeModalOut(e){ if(e.target===document.getElementById('modalOv')) closeModal(); }