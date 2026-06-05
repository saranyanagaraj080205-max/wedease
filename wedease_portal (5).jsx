import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#735c00",
  primaryContainer: "#d4af37",
  onPrimaryContainer: "#554300",
  onPrimary: "#ffffff",
  secondary: "#70585b",
  secondaryContainer: "#f8d8db",
  surface: "#f9f9f9",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#f3f3f4",
  surfaceContainer: "#eeeeee",
  onSurface: "#1a1c1c",
  onSurfaceVariant: "#4d4635",
  outline: "#7f7663",
  outlineVariant: "#d0c5af",
  error: "#ba1a1a",
  gold: "#D4AF37",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; background: #f9f9f9; color: #1a1c1c; }
  .serif { font-family: 'Playfair Display', serif; }
  .glass {
    background: rgba(255,255,255,0.78);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(212,175,55,0.18);
  }
  .gold-btn {
    background: linear-gradient(135deg, #D4AF37 0%, #F3E5AB 50%, #D4AF37 100%);
    background-size: 200% 200%;
    animation: shine 4s linear infinite;
    color: #fff;
    font-weight: 600;
    letter-spacing: 0.06em;
    border: none;
    cursor: pointer;
    transition: transform 0.15s;
  }
  .gold-btn:hover { transform: scale(1.02); }
  .ghost-btn {
    background: transparent;
    border: 1px solid rgba(212,175,55,0.5);
    color: #735c00;
    font-weight: 600;
    letter-spacing: 0.06em;
    cursor: pointer;
    transition: all 0.2s;
  }
  .ghost-btn:hover { background: rgba(212,175,55,0.08); }
  @keyframes shine {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .input-line {
    border: none;
    border-bottom: 1px solid #d0c5af;
    background: transparent;
    width: 100%;
    padding: 8px 0;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: #1a1c1c;
    outline: none;
    transition: border-color 0.2s;
  }
  .input-line:focus { border-bottom-color: #D4AF37; }
  .input-line::placeholder { color: #7f7663; }
  .card-hover { transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
  .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,175,55,0.12); }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 2px; }
  .progress-bar {
    height: 6px; background: rgba(212,175,55,0.15); border-radius: 99px; overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #D4AF37, #F3E5AB);
    border-radius: 99px;
    transition: width 0.6s ease;
  }
  .chip {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 99px;
    font-size: 12px; font-weight: 500; font-family: 'Inter', sans-serif;
  }
  .chip-gold { background: rgba(212,175,55,0.15); color: #554300; }
  .chip-pink { background: rgba(248,216,219,0.6); color: #70585b; }
  .chip-green { background: rgba(200,240,210,0.6); color: #2d6a4f; }
  .chip-red { background: rgba(255,218,214,0.7); color: #93000a; }
  .tab-active {
    border-bottom: 2px solid #D4AF37; color: #735c00; font-weight: 600;
  }
  .tab-inactive {
    border-bottom: 2px solid transparent; color: #7f7663;
  }
  .drawer-overlay {
    position: fixed; inset: 0; background: rgba(26,28,28,0.25);
    backdrop-filter: blur(2px); z-index: 55;
    opacity: 0; transition: opacity 0.3s;
    pointer-events: none;
  }
  .drawer-overlay.open { opacity: 1; pointer-events: auto; }
  .drawer {
    position: fixed; top: 0; left: 0; bottom: 0; width: 288px;
    background: #f9f9f9; border-right: 1px solid rgba(212,175,55,0.15);
    z-index: 60; transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
    display: flex; flex-direction: column; padding: 24px 16px;
    box-shadow: 8px 0 32px rgba(0,0,0,0.08);
  }
  .drawer.open { transform: translateX(0); }
  .nav-item {
    display: flex; align-items: center; gap: 14px;
    padding: 10px 14px; border-radius: 10px;
    cursor: pointer; transition: all 0.2s; color: #4d4635;
    font-size: 15px; font-family: 'Inter', sans-serif;
    text-decoration: none;
  }
  .nav-item:hover { background: rgba(212,175,55,0.1); color: #735c00; }
  .nav-item.active { background: rgba(212,175,55,0.15); color: #735c00; font-weight: 600; }
  .page-enter { animation: fadeIn 0.3s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .star { color: #D4AF37; }
  .section-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #7f7663; margin-bottom: 12px; }
  select.input-line { appearance: none; }
`;

const AVATAR = "https://api.dicebear.com/7.x/micah/svg?seed=sarah&backgroundColor=ffd5dc";
const VENDOR_IMG_1 = "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80";
const VENDOR_IMG_2 = "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80";
const VENDOR_IMG_3 = "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80";
const VENUE_IMG = "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80";
const HERO_IMG = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80";

function Icon({ name, size = 22, color, style }) {
  const icons = {
    menu: "M4 6h16M4 12h16M4 18h16",
    home: "M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9",
    store: "M3 9l9-6 9 6v11a1 1 0 01-1 1H4a1 1 0 01-1-1zM9 21V12h6v9",
    calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    bookmark: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
    user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    heart: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
    check: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    "check-sq": "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
    chevron: "M9 5l7 7-7 7",
    "chevron-left": "M15 19l-7-7 7-7",
    plus: "M12 5v14M5 12h14",
    dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    list: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    group: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    payments: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
    camera: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z",
    scissors: "M6 9l6 6M6 15l6-6M20 4l-6 6M20 20l-6-6M9 6a3 3 0 110 6 3 3 0 010-6zM15 12a3 3 0 110 6 3 3 0 010-6z",
    cake: "M21 15a2 2 0 01-2 2H5a2 2 0 01-2-2v-4h18v4zM3 11V9a9 9 0 0118 0v2M12 4V2m-4 2V2m8 2V2",
    music: "M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12 0a3 3 0 11-6 0 3 3 0 016 0z",
    truck: "M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
    decor: "M12 3v3M6.22 5.22l2.12 2.12M3 12h3M5.22 17.78l2.12-2.12M12 21v-3M17.78 17.78l-2.12-2.12M21 12h-3M17.78 6.22l-2.12 2.12M12 8a4 4 0 100 8 4 4 0 000-8z",
    upload: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
    logout: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
    quote: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d={icons[name] || icons.home} />
    </svg>
  );
}

function TopBar({ onMenu, title, rightEl }) {
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 20px",
      background: "rgba(249,249,249,0.88)", backdropFilter: "blur(18px)",
      borderBottom: "1px solid rgba(212,175,55,0.12)",
      boxShadow: "0 4px 24px rgba(212,175,55,0.07)"
    }}>
      <button onClick={onMenu} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: COLORS.primary }}>
        <Icon name="menu" size={22} color={COLORS.primary} />
      </button>
      <span className="serif" style={{ fontSize: 20, fontWeight: 700, color: COLORS.primary, letterSpacing: "-0.02em" }}>
        {title || "WedEase"}
      </span>
      <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: "1.5px solid rgba(212,175,55,0.3)" }}>
        {rightEl || <div style={{ width: "100%", height: "100%", background: COLORS.secondaryContainer, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: COLORS.secondary }}>SM</div>}
      </div>
    </header>
  );
}

function BottomNav({ active, onChange }) {
  const items = [
    { id: "home", icon: "home", label: "Home" },
    { id: "vendors", icon: "store", label: "Vendors" },
    { id: "planning", icon: "calendar", label: "Planning" },
    { id: "saved", icon: "bookmark", label: "Saved" },
  ];
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
      display: "flex", justifyContent: "space-around", alignItems: "center",
      padding: "8px 0 12px",
      background: "rgba(249,249,249,0.92)", backdropFilter: "blur(16px)",
      borderTop: "1px solid rgba(212,175,55,0.1)",
      boxShadow: "0 -4px 20px rgba(212,175,55,0.06)"
    }}>
      {items.map(item => (
        <button key={item.id} onClick={() => onChange(item.id)} style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          background: "none", border: "none", cursor: "pointer",
          color: active === item.id ? COLORS.primary : "#9e9585",
          transition: "color 0.2s",
        }}>
          <Icon name={item.icon} size={20} color={active === item.id ? COLORS.primary : "#9e9585"} />
          <span style={{ fontSize: 10, fontWeight: active === item.id ? 600 : 400, fontFamily: "Inter" }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function Drawer({ open, onClose, onNav, currentPage }) {
  const navItems = [
    { id: "home", icon: "home", label: "Home" },
    { id: "dashboard", icon: "dashboard", label: "Dashboard" },
    { id: "vendors", icon: "store", label: "Find Vendors" },
    { id: "planning", icon: "list", label: "My Checklist" },
    { id: "guests", icon: "group", label: "Guest List" },
    { id: "messages", icon: "mail", label: "Messages" },
  ];
  const bottomItems = [
    { id: "vendor-dashboard", icon: "payments", label: "Vendor Portal" },
    { id: "vendor-registration", icon: "upload", label: "Join as Vendor" },
    { id: "settings", icon: "settings", label: "Settings" },
    { id: "login", icon: "user", label: "Sign Out" },
  ];
  return (
    <>
      <div className={`drawer-overlay ${open ? "open" : ""}`} onClick={onClose} />
      <aside className={`drawer ${open ? "open" : ""}`}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: COLORS.secondaryContainer, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, border: "2px solid rgba(212,175,55,0.25)" }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: COLORS.secondary }}>SM</span>
          </div>
          <span className="serif" style={{ fontSize: 20, fontWeight: 700, color: COLORS.primary }}>Sarah Miller</span>
          <span style={{ fontSize: 13, color: COLORS.onSurfaceVariant }}>Wedding: Oct 12, 2025</span>
          <span className="chip chip-gold" style={{ width: "fit-content" }}>Premium Member</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map(item => (
            <button key={item.id} className={`nav-item ${currentPage === item.id ? "active" : ""}`} onClick={() => { onNav(item.id); onClose(); }}>
              <Icon name={item.icon} size={18} color={currentPage === item.id ? COLORS.primary : COLORS.onSurfaceVariant} />
              {item.label}
            </button>
          ))}
          <div style={{ height: 1, background: COLORS.outlineVariant, margin: "10px 0", opacity: 0.4 }} />
          {bottomItems.map(item => (
            <button key={item.id} className={`nav-item ${currentPage === item.id ? "active" : ""}`} onClick={() => { onNav(item.id); onClose(); }}>
              <Icon name={item.icon} size={18} color={currentPage === item.id ? COLORS.primary : COLORS.onSurfaceVariant} />
              {item.label}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}

// ─── PAGES ───────────────────────────────────────────────

function HomePage({ onNav }) {
  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ position: "relative", height: 520, overflow: "hidden" }}>
        <img src={HERO_IMG} alt="Wedding" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: 32, left: 24, right: 24 }}>
          <h1 className="serif" style={{ fontSize: 36, fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 10 }}>
            Plan Your Dream Wedding, <span style={{ color: "#F3E5AB" }}>Stress-Free</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, marginBottom: 20, maxWidth: 280 }}>
            Find venues, photographers, makeup artists, and more.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button className="gold-btn" style={{ width: "100%", padding: "14px", borderRadius: 10, fontSize: 13, textTransform: "uppercase" }} onClick={() => onNav("vendors")}>
              Find Vendors
            </button>
            <button className="ghost-btn" style={{ width: "100%", padding: "14px", borderRadius: 10, fontSize: 13, textTransform: "uppercase", color: "#fff", borderColor: "rgba(255,255,255,0.4)" }} onClick={() => onNav("dashboard")}>
              My Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Services */}
      <div style={{ padding: "32px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
          <h2 className="serif" style={{ fontSize: 22, fontWeight: 600, color: COLORS.onSurface }}>Premium Services</h2>
          <button onClick={() => onNav("vendors")} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.primary, fontSize: 13, fontWeight: 600 }}>See all</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { icon: "store", label: "Halls", sub: "Venues" },
            { icon: "camera", label: "Photo", sub: "Photography" },
            { icon: "scissors", label: "Makeup", sub: "Artists" },
            { icon: "cake", label: "Catering", sub: "Food & Drink" },
          ].map(s => (
            <div key={s.label} className="glass card-hover" style={{ padding: 18, borderRadius: 14, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center" }} onClick={() => onNav("vendors")}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: COLORS.secondaryContainer, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
                <Icon name={s.icon} size={20} color={COLORS.secondary} />
              </div>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{s.label}</span>
              <span style={{ fontSize: 11, color: COLORS.outline }}>{s.sub}</span>
              <button onClick={() => onNav("vendors")} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.primary, fontSize: 11, fontWeight: 700, marginTop: 4 }}>Explore →</button>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 10 }}>
          {[{ icon: "decor", label: "Decor" }, { icon: "music", label: "Music" }, { icon: "truck", label: "Transport" }].map(s => (
            <div key={s.label} className="glass" style={{ padding: 12, borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }} onClick={() => onNav("vendors")}>
              <Icon name={s.icon} size={18} color={COLORS.primary} />
              <span style={{ fontSize: 10 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Vendors */}
      <div style={{ padding: "32px 0 0" }}>
        <h2 className="serif" style={{ fontSize: 22, fontWeight: 600, color: COLORS.onSurface, paddingLeft: 20, marginBottom: 16 }}>Featured Artisans</h2>
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingLeft: 20, paddingBottom: 16 }}>
          {[
            { name: "The Rose Gold Estate", loc: "Beverly Hills, CA", rating: "4.9", type: "Venue", img: VENUE_IMG },
            { name: "Ethereal Moments", loc: "Manhattan, NY", rating: "5.0", type: "Photography", img: VENDOR_IMG_1 },
            { name: "Petals & Prose", loc: "Beverly Hills, CA", rating: "4.8", type: "Florist", img: VENDOR_IMG_2 },
          ].map(v => (
            <div key={v.name} className="glass card-hover" style={{ minWidth: 220, borderRadius: 16, overflow: "hidden", flexShrink: 0 }} onClick={() => onNav("vendors")}>
              <div style={{ height: 140, position: "relative" }}>
                <img src={v.img} alt={v.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)", padding: "3px 8px", borderRadius: 99, display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon name="star" size={12} color={COLORS.primaryContainer} />
                  <span style={{ fontWeight: 700, fontSize: 12 }}>{v.rating}</span>
                </div>
              </div>
              <div style={{ padding: 14 }}>
                <div className="serif" style={{ fontWeight: 600, fontSize: 15, marginBottom: 3 }}>{v.name}</div>
                <div style={{ fontSize: 12, color: COLORS.outline }}>{v.loc}</div>
                <div style={{ fontSize: 11, color: COLORS.secondary, marginTop: 2 }}>{v.type}</div>
                <button className="ghost-btn" style={{ width: "100%", padding: "8px", borderRadius: 8, fontSize: 12, marginTop: 10 }}>View Profile</button>
              </div>
            </div>
          ))}
          <div style={{ paddingRight: 20, flexShrink: 0 }} />
        </div>
      </div>

      {/* Budget Preview */}
      <div style={{ padding: "16px 20px 0" }}>
        <div className="glass" style={{ padding: 22, borderRadius: 18, border: "1.5px solid rgba(212,175,55,0.3)", position: "relative", overflow: "hidden" }} onClick={() => onNav("dashboard")}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(212,175,55,0.06)", filter: "blur(20px)" }} />
          <h3 className="serif" style={{ fontWeight: 600, fontSize: 20, marginBottom: 6 }}>Wedding Budget Tool</h3>
          <p style={{ fontSize: 14, color: COLORS.onSurfaceVariant, marginBottom: 18 }}>Stay in control of your dreams with intuitive tracking.</p>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: COLORS.outline }}>Spent: $24,500</span>
            <span className="serif" style={{ fontWeight: 700, fontSize: 20, color: COLORS.primary }}>$45,000</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: "55%" }} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
            <div className="glass" style={{ padding: "10px 14px", borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", color: COLORS.outline, letterSpacing: "0.06em" }}>Remaining</div>
              <div style={{ fontWeight: 700, marginTop: 3 }}>$20,500</div>
            </div>
            <div className="glass" style={{ padding: "10px 14px", borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", color: COLORS.outline, letterSpacing: "0.06em" }}>Next Up</div>
              <div style={{ fontWeight: 700, marginTop: 3 }}>Catering</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div style={{ padding: "32px 20px", textAlign: "center" }}>
        <h2 className="serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 24 }}>Happy Couples</h2>
        <div style={{ position: "relative" }}>
          <Icon name="quote" size={48} color="rgba(212,175,55,0.15)" style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)" }} />
          <p className="serif" style={{ fontSize: 17, fontStyle: "italic", lineHeight: 1.6, color: COLORS.onSurface, position: "relative" }}>
            "WedEase turned our chaotic planning into a beautiful journey. Finding our venue was effortless!"
          </p>
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: COLORS.secondaryContainer, border: "2px solid rgba(212,175,55,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: COLORS.secondary, marginBottom: 8 }}>J&E</div>
            <span style={{ fontWeight: 600, fontSize: 14 }}>James & Elena</span>
            <span style={{ fontSize: 12, color: COLORS.outline }}>Oct 2024 • Ritz Carlton</span>
          </div>
        </div>
      </div>

      <div style={{ height: 80 }} />
    </div>
  );
}

function DashboardPage({ onNav }) {
  const tasks = [
    { label: "Finalize Guest List", due: "Due in 2 days", done: false },
    { label: "Cake Tasting Appointment", due: "Due in 5 days", done: false },
    { label: "Book Florist", due: "Due in 2 weeks", done: true },
    { label: "Send Save-the-Dates", due: "Completed", done: true },
  ];
  const bookings = [
    { name: "Elite Catering", id: "#8821", status: "Pending", icon: "cake", chip: "chip-gold" },
    { name: "Lumina Photo Studio", id: "#8762", status: "Confirmed", icon: "camera", chip: "chip-green" },
    { name: "The Grand Hall", id: "#8801", status: "Confirmed", icon: "store", chip: "chip-green" },
  ];
  return (
    <div className="page-enter" style={{ padding: "0 20px", paddingBottom: 100 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 700, color: COLORS.onSurface, marginBottom: 4 }}>Hello, Sarah!</h1>
        <p style={{ color: COLORS.onSurfaceVariant, fontSize: 14 }}>Your wedding is in <strong>234 days</strong>. Everything is on track.</p>
      </div>

      {/* Stats Bento */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        <div className="glass" style={{ padding: 18, borderRadius: 14, gridColumn: "1 / -1", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, color: COLORS.onSurfaceVariant, marginBottom: 4 }}>Budget Spent</div>
            <div className="serif" style={{ fontSize: 24, fontWeight: 700, color: COLORS.primary }}>45%</div>
            <div className="progress-bar" style={{ width: 120, marginTop: 8 }}><div className="progress-fill" style={{ width: "45%" }} /></div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(115,92,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="payments" size={22} color={COLORS.primary} />
          </div>
        </div>
        <div className="glass" style={{ padding: 18, borderRadius: 14 }}>
          <Icon name="list" size={20} color={COLORS.secondary} />
          <div style={{ fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 8 }}>Checklist</div>
          <div className="serif" style={{ fontSize: 22, fontWeight: 700 }}>12/25</div>
          <div style={{ fontSize: 11, color: COLORS.secondary, marginTop: 2 }}>Done</div>
        </div>
        <div className="glass" style={{ padding: 18, borderRadius: 14 }}>
          <Icon name="store" size={20} color={COLORS.primary} />
          <div style={{ fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 8 }}>Vendors</div>
          <div className="serif" style={{ fontSize: 22, fontWeight: 700 }}>4</div>
          <div style={{ fontSize: 11, color: COLORS.primary, marginTop: 2 }}>Booked</div>
        </div>
        <div className="glass" style={{ padding: 18, borderRadius: 14, gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(212,175,55,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="calendar" size={22} color={COLORS.primary} />
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>Next: Cake Tasting</div>
            <div style={{ fontSize: 13, color: COLORS.outline }}>Saturday, June 8 at 2:00 PM</div>
          </div>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div style={{ marginBottom: 24 }}>
        <h2 className="serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 14 }}>Upcoming Tasks</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tasks.map((t, i) => (
            <div key={i} className="glass" style={{ padding: "12px 16px", borderRadius: 12, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, border: t.done ? "none" : "1.5px solid rgba(212,175,55,0.4)", background: t.done ? COLORS.primaryContainer : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {t.done && <Icon name="check" size={14} color="#fff" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, textDecoration: t.done ? "line-through" : "none", opacity: t.done ? 0.55 : 1 }}>{t.label}</div>
                <div style={{ fontSize: 12, color: COLORS.outline, marginTop: 1 }}>{t.due}</div>
              </div>
              <Icon name="chevron" size={16} color={COLORS.primary} />
            </div>
          ))}
        </div>
      </div>

      {/* Bookings */}
      <div style={{ marginBottom: 24 }}>
        <h2 className="serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 14 }}>Booking Tracking</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {bookings.map((b, i) => (
            <div key={i} className="glass" style={{ padding: "14px 16px", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 42, height: 42, background: COLORS.secondaryContainer, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={b.icon} size={20} color={COLORS.secondary} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.outline }}>{b.id}</div>
                </div>
              </div>
              <span className={`chip ${b.chip}`}>{b.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Vendors */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
          <h2 className="serif" style={{ fontSize: 20, fontWeight: 600 }}>Saved Vendors</h2>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.primary, fontSize: 13, fontWeight: 600 }} onClick={() => onNav("vendors")}>View All</button>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", marginLeft: -20, paddingLeft: 20, paddingBottom: 8 }}>
          {[
            { name: "Petals & Prose", type: "Florist • $$$", img: VENDOR_IMG_2 },
            { name: "The Grand Hall", type: "Venue • $$$$", img: VENUE_IMG },
            { name: "Lumina Studio", type: "Photo • $$$", img: VENDOR_IMG_1 },
          ].map(v => (
            <div key={v.name} className="glass card-hover" style={{ minWidth: 160, borderRadius: 12, overflow: "hidden", flexShrink: 0 }} onClick={() => onNav("vendors")}>
              <div style={{ height: 90, position: "relative" }}>
                <img src={v.img} alt={v.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: 6, right: 6, width: 26, height: 26, borderRadius: "50%", background: "rgba(255,255,255,0.88)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="heart" size={13} color={COLORS.error} />
                </div>
              </div>
              <div style={{ padding: 10 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{v.name}</div>
                <div style={{ fontSize: 11, color: COLORS.outline }}>{v.type}</div>
              </div>
            </div>
          ))}
          <div style={{ paddingRight: 20, flexShrink: 0 }} />
        </div>
      </div>
    </div>
  );
}

function VendorsPage({ onNav }) {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Venue", "Photo", "Makeup", "Catering", "Decor"];
  const vendors = [
    { name: "The Rose Gold Estate", loc: "Beverly Hills, CA", rating: "4.9", type: "Venue", price: "$$$$", img: VENUE_IMG },
    { name: "Ethereal Moments Studio", loc: "Manhattan, NY", rating: "5.0", type: "Photo", price: "$$$", img: VENDOR_IMG_1 },
    { name: "Petals & Prose", loc: "Beverly Hills, CA", rating: "4.8", type: "Makeup", price: "$$", img: VENDOR_IMG_2 },
    { name: "Luxe Tables Catering", loc: "Chicago, IL", rating: "4.7", type: "Catering", price: "$$$", img: VENDOR_IMG_3 },
    { name: "Golden Hour Decor", loc: "Austin, TX", rating: "4.9", type: "Decor", price: "$$", img: VENUE_IMG },
    { name: "Lumina Photography", loc: "San Francisco, CA", rating: "4.8", type: "Photo", price: "$$$", img: VENDOR_IMG_1 },
  ];
  const filtered = filter === "All" ? vendors : vendors.filter(v => v.type === filter);
  return (
    <div className="page-enter" style={{ paddingBottom: 100 }}>
      <div style={{ padding: "0 20px 16px" }}>
        <h1 className="serif" style={{ fontSize: 24, fontWeight: 700, marginBottom: 14 }}>Find Vendors</h1>
        <div style={{ position: "relative", marginBottom: 16 }}>
          <input className="input-line" placeholder="Search venues, photographers…" style={{ paddingLeft: 28 }} />
          <Icon name="decor" size={16} color={COLORS.outline} style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }} />
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", marginLeft: -20, paddingLeft: 20, paddingBottom: 4 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 99, border: filter === c ? "1px solid " + COLORS.primaryContainer : "1px solid " + COLORS.outlineVariant, background: filter === c ? "rgba(212,175,55,0.15)" : "transparent", color: filter === c ? COLORS.primary : COLORS.outline, fontWeight: filter === c ? 600 : 400, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "Inter", transition: "all 0.2s" }}>
              {c}
            </button>
          ))}
          <div style={{ paddingRight: 20, flexShrink: 0 }} />
        </div>
      </div>

      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map(v => (
          <div key={v.name} className="glass card-hover" style={{ borderRadius: 16, overflow: "hidden", display: "flex" }}>
            <img src={v.img} alt={v.name} style={{ width: 100, height: 100, objectFit: "cover", flexShrink: 0 }} />
            <div style={{ padding: 14, flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div className="serif" style={{ fontWeight: 600, fontSize: 15 }}>{v.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Icon name="star" size={12} color={COLORS.primaryContainer} />
                  <span style={{ fontSize: 12, fontWeight: 700 }}>{v.rating}</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: COLORS.outline, marginTop: 2 }}>{v.loc}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <span className="chip chip-pink">{v.type}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary }}>{v.price}</span>
                  <button className="ghost-btn" style={{ padding: "5px 12px", borderRadius: 8, fontSize: 12 }}>View</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlanningPage() {
  const [tasks, setTasks] = useState([
    { label: "Book Venue", cat: "Venue", done: true },
    { label: "Hire Photographer", cat: "Photo", done: true },
    { label: "Finalize Guest List", cat: "Admin", done: false },
    { label: "Cake Tasting", cat: "Catering", done: false },
    { label: "Book Florist", cat: "Decor", done: false },
    { label: "Order Wedding Dress", cat: "Attire", done: false },
    { label: "Send Save-the-Dates", cat: "Admin", done: true },
    { label: "Book DJ / Band", cat: "Music", done: false },
    { label: "Confirm Catering Menu", cat: "Catering", done: false },
    { label: "Honeymoon Planning", cat: "Travel", done: false },
  ]);
  const done = tasks.filter(t => t.done).length;
  return (
    <div className="page-enter" style={{ padding: "0 20px", paddingBottom: 100 }}>
      <h1 className="serif" style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>My Checklist</h1>
      <p style={{ fontSize: 14, color: COLORS.onSurfaceVariant, marginBottom: 18 }}>{done} of {tasks.length} tasks completed</p>
      <div className="progress-bar" style={{ marginBottom: 24 }}>
        <div className="progress-fill" style={{ width: `${(done / tasks.length) * 100}%` }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {tasks.map((t, i) => (
          <div key={i} className="glass" style={{ padding: "14px 16px", borderRadius: 12, display: "flex", alignItems: "center", gap: 14 }} onClick={() => {
            const updated = [...tasks]; updated[i].done = !updated[i].done; setTasks(updated);
          }}>
            <div style={{ width: 26, height: 26, borderRadius: 5, border: t.done ? "none" : "1.5px solid rgba(212,175,55,0.5)", background: t.done ? COLORS.primaryContainer : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "all 0.2s" }}>
              {t.done && <Icon name="check" size={14} color="#fff" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, textDecoration: t.done ? "line-through" : "none", opacity: t.done ? 0.5 : 1 }}>{t.label}</div>
            </div>
            <span className="chip chip-pink" style={{ fontSize: 10 }}>{t.cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoginPage({ onNav }) {
  const [mode, setMode] = useState("login");
  return (
    <div className="page-enter" style={{ minHeight: "calc(100vh - 64px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 24px" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div className="serif" style={{ fontSize: 40, fontWeight: 700, color: COLORS.primary, textAlign: "center", marginBottom: 8 }}>WedEase</div>
        <p style={{ textAlign: "center", color: COLORS.outline, fontSize: 14, marginBottom: 32 }}>Your dream wedding, organized.</p>

        <div className="glass" style={{ borderRadius: 20, overflow: "hidden", padding: 28 }}>
          <div style={{ display: "flex", borderBottom: "1px solid " + COLORS.outlineVariant, marginBottom: 24 }}>
            {["login", "register"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "10px 0", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter", fontSize: 14, fontWeight: 600, color: mode === m ? COLORS.primary : COLORS.outline, borderBottom: mode === m ? "2px solid " + COLORS.primaryContainer : "2px solid transparent", marginBottom: -1, transition: "all 0.2s" }}>
                {m === "login" ? "Login" : "Register"}
              </button>
            ))}
          </div>

          {mode === "login" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: COLORS.onSurfaceVariant, letterSpacing: "0.04em" }}>Email Address</label>
                <input className="input-line" type="email" placeholder="you@example.com" style={{ marginTop: 6 }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: COLORS.onSurfaceVariant, letterSpacing: "0.04em" }}>Password</label>
                <input className="input-line" type="password" placeholder="••••••••" style={{ marginTop: 6 }} />
              </div>
              <div style={{ textAlign: "right" }}>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.primary, fontSize: 13, fontWeight: 600 }} onClick={() => {}}>Forgot Password?</button>
              </div>
              <button className="gold-btn" style={{ padding: "14px", borderRadius: 10, fontSize: 15 }} onClick={() => {}}>Log In</button>
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
                <div style={{ flex: 1, height: 1, background: COLORS.outlineVariant, opacity: 0.5 }} />
                <span style={{ fontSize: 13, color: COLORS.outline }}>or</span>
                <div style={{ flex: 1, height: 1, background: COLORS.outlineVariant, opacity: 0.5 }} />
              </div>
              <button className="ghost-btn" style={{ padding: "13px", borderRadius: 10, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {["Full Name", "Email Address", "Password", "Confirm Password"].map(f => (
                <div key={f}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: COLORS.onSurfaceVariant, letterSpacing: "0.04em" }}>{f}</label>
                  <input className="input-line" type={f.includes("Password") ? "password" : f === "Email Address" ? "email" : "text"} placeholder={f === "Full Name" ? "Sarah Miller" : f === "Email Address" ? "you@example.com" : "••••••••"} style={{ marginTop: 6 }} />
                </div>
              ))}
              <div style={{ display: "flex", gap: 10 }}>
                <button className="ghost-btn" style={{ flex: 1, padding: "12px", borderRadius: 10, fontSize: 13 }} onClick={() => onNav("vendor-registration")}>Join as Vendor</button>
                <button className="gold-btn" style={{ flex: 1, padding: "12px", borderRadius: 10, fontSize: 13 }}>Create Account</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VendorRegistrationPage({ onNav }) {
  const [step, setStep] = useState(1);
  const steps = ["Business Info", "Services", "Portfolio", "Review"];
  return (
    <div className="page-enter" style={{ padding: "0 20px", paddingBottom: 100 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="serif" style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Join as Vendor</h1>
        <p style={{ fontSize: 14, color: COLORS.onSurfaceVariant }}>Reach thousands of couples planning their dream weddings.</p>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", gap: 0, marginBottom: 28, position: "relative" }}>
        <div style={{ position: "absolute", top: 16, left: "12.5%", right: "12.5%", height: 2, background: COLORS.outlineVariant, opacity: 0.4 }} />
        {steps.map((s, i) => (
          <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, position: "relative" }} onClick={() => setStep(i + 1)}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid " + (i + 1 <= step ? COLORS.primaryContainer : COLORS.outlineVariant), background: i + 1 < step ? COLORS.primaryContainer : i + 1 === step ? "rgba(212,175,55,0.15)" : "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s", zIndex: 1 }}>
              {i + 1 < step ? <Icon name="check" size={14} color={COLORS.onPrimaryContainer} /> : <span style={{ fontSize: 12, fontWeight: 700, color: i + 1 === step ? COLORS.primary : COLORS.outline }}>{i + 1}</span>}
            </div>
            <span style={{ fontSize: 10, textAlign: "center", color: i + 1 === step ? COLORS.primary : COLORS.outline, fontWeight: i + 1 === step ? 600 : 400 }}>{s}</span>
          </div>
        ))}
      </div>

      <div className="glass" style={{ borderRadius: 18, padding: 24, marginBottom: 20 }}>
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div className="serif" style={{ fontWeight: 600, fontSize: 17, marginBottom: 4 }}>Business Details</div>
            {["Business Name", "Owner Name", "Email Address", "Phone Number", "Business Location"].map(f => (
              <div key={f}>
                <label style={{ fontSize: 12, fontWeight: 500, color: COLORS.onSurfaceVariant, letterSpacing: "0.04em" }}>{f}</label>
                <input className="input-line" placeholder={f === "Business Name" ? "Ethereal Moments Studio" : ""} style={{ marginTop: 6 }} />
              </div>
            ))}
          </div>
        )}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="serif" style={{ fontWeight: 600, fontSize: 17, marginBottom: 4 }}>Services Offered</div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: COLORS.onSurfaceVariant }}>Primary Category</label>
              <select className="input-line" style={{ marginTop: 6 }}>
                <option>Photography</option>
                <option>Venue / Hall</option>
                <option>Catering</option>
                <option>Makeup Artist</option>
                <option>Florist / Decor</option>
                <option>Music / Entertainment</option>
              </select>
            </div>
            {["Starting Price", "Years of Experience"].map(f => (
              <div key={f}>
                <label style={{ fontSize: 12, fontWeight: 500, color: COLORS.onSurfaceVariant }}>{f}</label>
                <input className="input-line" placeholder={f === "Starting Price" ? "$1,500" : "5 years"} style={{ marginTop: 6 }} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: COLORS.onSurfaceVariant }}>Service Description</label>
              <textarea className="input-line" rows={3} placeholder="Tell couples what makes your service special…" style={{ marginTop: 6, resize: "none" }} />
            </div>
          </div>
        )}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="serif" style={{ fontWeight: 600, fontSize: 17 }}>Upload Portfolio</div>
            <div style={{ border: "1.5px dashed " + COLORS.outlineVariant, borderRadius: 14, padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "pointer" }}>
              <Icon name="upload" size={32} color={COLORS.outlineVariant} />
              <span style={{ fontSize: 14, color: COLORS.outline, textAlign: "center" }}>Tap to upload photos<br /><span style={{ fontSize: 12 }}>PNG, JPG up to 10MB each</span></span>
              <button className="ghost-btn" style={{ padding: "8px 18px", borderRadius: 8, fontSize: 13 }}>Browse Files</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[VENDOR_IMG_1, VENDOR_IMG_2, VENDOR_IMG_3].map((img, i) => (
                <div key={i} style={{ height: 80, borderRadius: 8, overflow: "hidden" }}>
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="serif" style={{ fontWeight: 600, fontSize: 17, marginBottom: 4 }}>Review & Submit</div>
            {[["Business", "Ethereal Moments Studio"], ["Category", "Photography"], ["Price", "From $1,500"], ["Location", "Manhattan, NY"], ["Portfolio", "3 photos uploaded"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
                <span style={{ fontSize: 13, color: COLORS.outline }}>{k}</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div className="glass" style={{ padding: 14, borderRadius: 12, background: "rgba(200,240,210,0.3)", border: "1px solid rgba(45,106,79,0.2)" }}>
              <span style={{ fontSize: 13, color: "#2d6a4f" }}>✓ Your listing will go live after a quick review (24–48 hrs)</span>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {step > 1 && <button className="ghost-btn" style={{ flex: 1, padding: 14, borderRadius: 12, fontSize: 14 }} onClick={() => setStep(s => s - 1)}>← Back</button>}
        <button className="gold-btn" style={{ flex: 2, padding: 14, borderRadius: 12, fontSize: 14 }} onClick={() => step < 4 ? setStep(s => s + 1) : onNav("vendor-dashboard")}>
          {step === 4 ? "Submit Application" : "Continue →"}
        </button>
      </div>
    </div>
  );
}

function VendorDashboardPage() {
  const bookings = [
    { name: "Emma & Lucas", date: "Jun 15, 2025", status: "Confirmed", amount: "$2,400" },
    { name: "Priya & Arjun", date: "Jul 22, 2025", status: "Pending", amount: "$1,800" },
    { name: "Sofia & Marco", date: "Aug 10, 2025", status: "Confirmed", amount: "$3,100" },
    { name: "Amy & David", date: "Sep 5, 2025", status: "Review", amount: "$2,200" },
  ];
  const chipMap = { Confirmed: "chip-green", Pending: "chip-gold", Review: "chip-pink" };
  return (
    <div className="page-enter" style={{ padding: "0 20px", paddingBottom: 100 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 className="serif" style={{ fontSize: 24, fontWeight: 700 }}>Vendor Dashboard</h1>
            <p style={{ fontSize: 13, color: COLORS.outline }}>Ethereal Moments Studio</p>
          </div>
          <span className="chip chip-green">Verified ✓</span>
        </div>
      </div>

      {/* Revenue Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        {[
          { label: "Monthly Revenue", val: "$8,400", icon: "payments", up: true },
          { label: "Bookings", val: "12", icon: "calendar", up: true },
          { label: "Avg Rating", val: "4.9 ★", icon: "star", up: false },
          { label: "Profile Views", val: "1,240", icon: "decor", up: true },
        ].map(s => (
          <div key={s.label} className="glass" style={{ padding: 16, borderRadius: 14 }}>
            <Icon name={s.icon} size={18} color={COLORS.primary} />
            <div style={{ fontSize: 11, color: COLORS.onSurfaceVariant, marginTop: 8, marginBottom: 3 }}>{s.label}</div>
            <div className="serif" style={{ fontWeight: 700, fontSize: 19 }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="glass" style={{ padding: 20, borderRadius: 16, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span className="serif" style={{ fontWeight: 600, fontSize: 16 }}>Revenue Trend</span>
          <span className="chip chip-green">+18% MoM</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
          {[40, 55, 45, 70, 60, 85, 75].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "4px 4px 0 0", background: i === 5 ? COLORS.primaryContainer : "rgba(212,175,55,0.2)", transition: "height 0.5s" }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          {["D", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i} style={{ fontSize: 10, color: COLORS.outline, flex: 1, textAlign: "center" }}>{d}</span>)}
        </div>
      </div>

      {/* Booking Requests */}
      <h2 className="serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 14 }}>Booking Requests</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {bookings.map((b, i) => (
          <div key={i} className="glass" style={{ padding: "14px 16px", borderRadius: 12, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: COLORS.secondaryContainer, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: COLORS.secondary, flexShrink: 0 }}>
              {b.name.split(" ")[0][0]}{b.name.split(" ")[2][0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{b.name}</div>
              <div style={{ fontSize: 12, color: COLORS.outline }}>{b.date}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
              <span style={{ fontWeight: 700, color: COLORS.primary, fontSize: 14 }}>{b.amount}</span>
              <span className={`chip ${chipMap[b.status]}`}>{b.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 14 }}>Quick Actions</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { label: "Edit Profile", icon: "settings" },
          { label: "Add Photos", icon: "camera" },
          { label: "View Reviews", icon: "star" },
          { label: "Messages", icon: "mail" },
        ].map(a => (
          <button key={a.label} className="glass ghost-btn" style={{ padding: 16, borderRadius: 14, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, fontSize: 13, border: "1px solid rgba(212,175,55,0.2)", cursor: "pointer" }}>
            <Icon name={a.icon} size={20} color={COLORS.primary} />
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function OTPPage({ onNav }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const handleChange = (val, i) => {
    const v = val.replace(/\D/, "");
    const next = [...otp]; next[i] = v; setOtp(next);
    if (v && i < 5) inputs.current[i + 1]?.focus();
  };
  return (
    <div className="page-enter" style={{ minHeight: "calc(100vh - 64px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 360, textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(212,175,55,0.12)", border: "1.5px solid rgba(212,175,55,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <Icon name="mail" size={28} color={COLORS.primary} />
        </div>
        <h1 className="serif" style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Check Your Email</h1>
        <p style={{ color: COLORS.onSurfaceVariant, fontSize: 14, marginBottom: 32 }}>
          We've sent a 6-digit code to<br /><strong>sarah@example.com</strong>
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 28 }}>
          {otp.map((v, i) => (
            <input key={i} ref={el => inputs.current[i] = el} value={v} maxLength={1} onChange={e => handleChange(e.target.value, i)} onKeyDown={e => e.key === "Backspace" && !v && i > 0 && inputs.current[i - 1]?.focus()} style={{ width: 46, height: 54, textAlign: "center", fontSize: 22, fontWeight: 700, borderRadius: 10, border: v ? "2px solid " + COLORS.primaryContainer : "1.5px solid " + COLORS.outlineVariant, background: v ? "rgba(212,175,55,0.08)" : "white", color: COLORS.onSurface, outline: "none", fontFamily: "Inter", transition: "all 0.2s" }} />
          ))}
        </div>
        <button className="gold-btn" style={{ width: "100%", padding: 15, borderRadius: 12, fontSize: 15, marginBottom: 16 }} onClick={() => onNav("dashboard")}>Verify Code</button>
        <p style={{ fontSize: 13, color: COLORS.outline }}>Didn't receive it? <button style={{ background: "none", border: "none", color: COLORS.primary, fontWeight: 600, cursor: "pointer", fontSize: 13 }}>Resend →</button></p>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navActive, setNavActive] = useState("home");
  const [key, setKey] = useState(0);

  const navigate = (p) => {
    setPage(p);
    setKey(k => k + 1);
    if (["home", "vendors", "planning", "saved"].includes(p)) setNavActive(p);
  };

  const showBottomNav = !["login", "vendor-registration", "otp"].includes(page);
  const showTopBar = !["login"].includes(page);

  const pageMap = {
    home: <HomePage onNav={navigate} />,
    dashboard: <DashboardPage onNav={navigate} />,
    vendors: <VendorsPage onNav={navigate} />,
    planning: <PlanningPage />,
    guests: <PlanningPage />,
    messages: <PlanningPage />,
    settings: <PlanningPage />,
    saved: <VendorsPage onNav={navigate} />,
    login: <LoginPage onNav={navigate} />,
    "vendor-registration": <VendorRegistrationPage onNav={navigate} />,
    "vendor-dashboard": <VendorDashboardPage />,
    otp: <OTPPage onNav={navigate} />,
  };

  return (
    <>
      <style>{styles}</style>
      <div style={{ maxWidth: 480, margin: "0 auto", position: "relative", minHeight: "100vh", background: COLORS.surface, overflow: "hidden" }}>
        {showTopBar && <TopBar onMenu={() => setDrawerOpen(true)} />}
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onNav={navigate} currentPage={page} />
        <main key={key} style={{ paddingTop: showTopBar ? 60 : 0 }}>
          {pageMap[page] || pageMap.home}
        </main>
        {showBottomNav && <BottomNav active={navActive} onChange={navigate} />}
      </div>
    </>
  );
}
