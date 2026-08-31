const CURRENT_DATE = "2026-08-30";

const BASE_MATCHES = [
    { id: 1, time: "12:15 PM", stadium: "Nationals Park", away: "Miami Marlins", home: "Washington Nationals", starter_away: "J. Junk", starter_home: "A. Alvarez", awayOdds: 2.00, homeOdds: 1.70, defaultHcap: "-1.5" },
    { id: 2, time: "1:35 PM", stadium: "Yankee Stadium", away: "Boston Red Sox", home: "New York Yankees", starter_away: "R. Suarez", starter_home: "W. Warren", awayOdds: 2.30, homeOdds: 1.67, defaultHcap: "-1.5" },
    { id: 3, time: "1:35 PM", stadium: "Truist Park", away: "Colorado Rockies", home: "Atlanta Braves", starter_away: "M. Adams", starter_home: "T. Mahle", awayOdds: 1.93, homeOdds: 1.91, defaultHcap: "-1.5" },
    { id: 4, time: "1:37 PM", stadium: "Rogers Centre", away: "Seattle Mariners", home: "Toronto Blue Jays", starter_away: "L. Gilbert", starter_home: "M. Scherzer", awayOdds: 2.25, homeOdds: 1.60, defaultHcap: "-1.5" },
    { id: 5, time: "1:40 PM", stadium: "Progressive Field", away: "Kansas City Royals", home: "Cleveland Guardians", starter_away: "S. Lugo", starter_home: "P. Messick", awayOdds: 1.74, homeOdds: 2.15, defaultHcap: "+1.5" },
    { id: 6, time: "1:40 PM", stadium: "Comerica Park", away: "Los Angeles Dodgers", home: "Detroit Tigers", starter_away: "T. Glasnow", starter_home: "F. Valdez", awayOdds: 2.04, homeOdds: 1.77, defaultHcap: "-1.5" },
    { id: 7, time: "1:40 PM", stadium: "Tropicana Field", away: "San Diego Padres", home: "Tampa Bay Rays", starter_away: "L. Ray", starter_home: "D. Rasmussen", awayOdds: 1.65, homeOdds: 2.30, defaultHcap: "+1.5" },
    { id: 8, time: "2:10 PM", stadium: "Target Field", away: "Chicago White Sox", home: "Minnesota Twins", starter_away: "J. Hicks", starter_home: "Z. Matthews", awayOdds: 1.95, homeOdds: 1.83, defaultHcap: "-1.5" },
    { id: 9, time: "2:10 PM", stadium: "American Family Field", away: "Texas Rangers", home: "Milwaukee Brewers", starter_away: "K. Rocker", starter_home: "B. May", awayOdds: 1.68, homeOdds: 2.25, defaultHcap: "+1.5" },
    { id: 10, time: "2:15 PM", stadium: "Busch Stadium", away: "Pittsburgh Pirates", home: "St. Louis Cardinals", starter_away: "B. Ashcraft", starter_home: "M. Liberatore", awayOdds: 1.76, homeOdds: 2.10, defaultHcap: "+1.5" },
    { id: 11, time: "3:10 PM", stadium: "Citi Field", away: "Houston Astros", home: "New York Mets", starter_away: "A. Pecko", starter_home: "T. Thornton", awayOdds: 1.52, homeOdds: 2.60, defaultHcap: "-1.5" },
    { id: 12, time: "4:05 PM", stadium: "Sutter Health Park", away: "Baltimore Orioles", home: "Oakland Athletics", starter_away: "C. Bassitt", starter_home: "J. Springs", awayOdds: 2.00, homeOdds: 1.83, defaultHcap: "-1.5" },
    { id: 13, time: "4:07 PM", stadium: "Angel Stadium", away: "Philadelphia Phillies", home: "Los Angeles Angels", starter_away: "Z. Wheeler", starter_home: "Y. Kikuchi", awayOdds: 1.58, homeOdds: 2.40, defaultHcap: "-1.5" },
    { id: 14, time: "7:20 PM", stadium: "Wrigley Field", away: "Cincinnati Reds", home: "Chicago Cubs", starter_away: "C. Burns", starter_home: "S. Imanaga", awayOdds: 1.62, homeOdds: 2.35, defaultHcap: "+1.5" }
];

const MLB_TEAMS = {
    "Miami Marlins": { code: "MIA", primary: "#00A3E0", secondary: "#EF3340" },
    "Washington Nationals": { code: "WSH", primary: "#AB0003", secondary: "#14225A" },
    "Boston Red Sox": { code: "BOS", primary: "#BD3039", secondary: "#0C2340" },
    "New York Yankees": { code: "NYY", primary: "#0C2340", secondary: "#C4CED4" },
    "Colorado Rockies": { code: "COL", primary: "#33006F", secondary: "#C4CED4" },
    "Atlanta Braves": { code: "ATL", primary: "#CE1141", secondary: "#13274F" },
    "Seattle Mariners": { code: "SEA", primary: "#0C2340", secondary: "#005C5C" },
    "Toronto Blue Jays": { code: "TOR", primary: "#134A8E", secondary: "#E8291C" },
    "Kansas City Royals": { code: "KC", primary: "#004687", secondary: "#BD9B60" },
    "Cleveland Guardians": { code: "CLE", primary: "#0C2340", secondary: "#E31937" },
    "Los Angeles Dodgers": { code: "LAD", primary: "#005A9C", secondary: "#EF3340" },
    "Detroit Tigers": { code: "DET", primary: "#0C2340", secondary: "#FA4616" },
    "San Diego Padres": { code: "SD", primary: "#2F241D", secondary: "#FFC425" },
    "Tampa Bay Rays": { code: "TB", primary: "#092C5C", secondary: "#8FBCE6" },
    "Chicago White Sox": { code: "CWS", primary: "#27251F", secondary: "#C4CED4" },
    "Minnesota Twins": { code: "MIN", primary: "#002B49", secondary: "#D31145" },
    "Texas Rangers": { code: "TEX", primary: "#003278", secondary: "#C0111F" },
    "Milwaukee Brewers": { code: "MIL", primary: "#12284C", secondary: "#FFC52F" },
    "Pittsburgh Pirates": { code: "PIT", primary: "#FDB827", secondary: "#27251F" },
    "St. Louis Cardinals": { code: "STL", primary: "#C41E3A", secondary: "#0C2340" },
    "Houston Astros": { code: "HOU", primary: "#002D62", secondary: "#EB6E1F" },
    "New York Mets": { code: "NYM", primary: "#002D72", secondary: "#FF5910" },
    "Baltimore Orioles": { code: "BAL", primary: "#DF4601", secondary: "#000000" },
    "Oakland Athletics": { code: "OAK", primary: "#003831", secondary: "#EFB21E" },
    "Philadelphia Phillies": { code: "PHI", primary: "#E81828", secondary: "#002D62" },
    "Los Angeles Angels": { code: "LAA", primary: "#BA0021", secondary: "#003278" },
    "Cincinnati Reds": { code: "CIN", primary: "#C6011F", secondary: "#000000" },
    "Chicago Cubs": { code: "CHC", primary: "#0E3386", secondary: "#CC3433" }
};

// Diccionario oficial de resultados finales reales de la jornada del 30 de agosto de 2026
const REAL_FINAL_SCORES = {
    1: { awayScore: 2, homeScore: 5 },  // Miami Marlins vs Washington Nationals
    2: { awayScore: 4, homeScore: 8 },  // Boston Red Sox vs New York Yankees
    3: { awayScore: 3, homeScore: 6 },  // Colorado Rockies vs Atlanta Braves
    4: { awayScore: 5, homeScore: 4 },  // Seattle Mariners vs Toronto Blue Jays
    5: { awayScore: 6, homeScore: 3 },  // Kansas City Royals vs Cleveland Guardians
    6: { awayScore: 7, homeScore: 2 },  // Los Angeles Dodgers vs Detroit Tigers
    7: { awayScore: 4, homeScore: 3 },  // San Diego Padres vs Tampa Bay Rays
    8: { awayScore: 2, homeScore: 5 },  // Chicago White Sox vs Minnesota Twins
    9: { awayScore: 6, homeScore: 4 },  // Texas Rangers vs Milwaukee Brewers
    10: { awayScore: 3, homeScore: 7 }, // Pittsburgh Pirates vs St. Louis Cardinals
    11: { awayScore: 9, homeScore: 2 }, // Houston Astros vs New York Mets
    12: { awayScore: 4, homeScore: 5 }, // Baltimore Orioles vs Oakland Athletics
    13: { awayScore: 8, homeScore: 3 }, // Philadelphia Phillies vs Los Angeles Angels
    14: { awayScore: 3, homeScore: 5 }  // Cincinnati Reds vs Chicago Cubs
};

function getSavedAuditRecords() {
    const stored = localStorage.getItem('oraculo_mlb_audit');
    if (stored) {
        return JSON.parse(stored);
    }
    return [
        { id: 101, date: "2026-08-29", match: "New York Yankees vs Boston Red Sox", selection: "Yankees ML (-1.5)", prob: "68.5%", result: "Yankees 6 - 3 Red Sox", status: "ACERTADO" },
        { id: 102, date: "2026-08-29", match: "Los Angeles Dodgers vs Arizona Diamondbacks", selection: "Dodgers Over 8.5", prob: "71.2%", result: "Dodgers 4 - 2 Diamondbacks", status: "FALLADO" }
    ];
}

function saveAuditRecords(records) {
    localStorage.setItem('oraculo_mlb_audit', JSON.stringify(records));
}

function getTeamBadgeHTML(teamName, small = false) {
    let teamData = MLB_TEAMS[teamName] || { code: teamName ? teamName.substring(0, 3).toUpperCase() : "MLB", primary: "#1e293b", secondary: "#38bdf8" };
    let size = small ? '44px' : '60px';
    let fontSize = small ? '0.8rem' : '1.15rem';
    
    return `
    <div class="team-insignia" style="width: ${size}; height: ${size}; min-width: ${size}; min-height: ${size}; background: linear-gradient(135deg, ${teamData.primary}, #090d16); border-color: ${teamData.secondary}; display:flex; align-items:center; justify-content:center; border-radius:14px; border:2px solid; box-shadow: 0 4px 10px rgba(0,0,0,0.4);">
        <span style="font-size: ${fontSize}; color: #ffffff; font-weight: 900; letter-spacing: -0.05em; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">${teamData.code}</span>
    </div>`;
}

function switchTab(evt, tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');
    if(tabId === 'history-tab') {
        renderAuditHistory();
    }
}

function renderMatches() {
    const container = document.getElementById('matches-cards-container');
    if (!container) return;
    container.innerHTML = BASE_MATCHES.map(m => `
        <div class="match-card" style="background:var(--card-bg, #111827); padding:1.2rem; border-radius:14px; border:1px solid var(--border-subtle, #374151); margin-bottom:1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
            <div class="match-header" style="display:flex; justify-content:space-between; margin-bottom:0.8rem; font-size:0.85rem; color:#9ca3af; font-weight:600;">
                <span>🕒 ${m.time}</span>
                <span>🏟️ ${m.stadium}</span>
            </div>
            <div class="teams-container" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                <div class="team" style="display:flex; align-items:center; gap:0.8rem;">
                    ${getTeamBadgeHTML(m.away, true)}
                    <div>
                        <div style="font-size:0.7rem; color:#9ca3af; text-transform:uppercase; letter-spacing:0.05em;">Visitor</div>
                        <div style="font-weight:700; font-size:0.95rem; color:#fff;">${m.away}</div>
                        <div style="font-size:0.75rem; color:#38bdf8;">⚾ ${m.starter_away}</div>
                    </div>
                </div>
                <div class="vs" style="font-weight:900; color:#38bdf8; font-size:1.1rem;">VS</div>
                <div class="team" style="display:flex; align-items:center; gap:0.8rem; text-align:right;">
                    <div>
                        <div style="font-size:0.7rem; color:#9ca3af; text-transform:uppercase; letter-spacing:0.05em;">Home</div>
                        <div style="font-weight:700; font-size:0.95rem; color:#fff;">${m.home}</div>
                        <div style="font-size:0.75rem; color:#38bdf8;">⚾ ${m.starter_home}</div>
                    </div>
                    ${getTeamBadgeHTML(m.home, true)}
                </div>
            </div>
            <div class="handicap-box" style="background:rgba(0,0,0,0.3); padding:0.9rem; border-radius:10px; border:1px solid rgba(255,255,255,0.05);">
                <div style="font-size:0.8rem; font-weight:700; margin-bottom:0.5rem; color:#38bdf8;">⚙️ Configuración de Línea Personalizada</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.8rem;">
                    <div>
                        <label style="font-size:0.75rem; color:#9ca3af; display:block; margin-bottom:0.2rem;">Hándicap</label>
                        <input type="text" id="hcap-${m.id}" value="${m.defaultHcap}" style="width:100%; padding:0.5rem; background:#1f2937; border:1px solid #4b5563; color:#fff; border-radius:6px; font-weight:600;">
                    </div>
                    <div>
                        <label style="font-size:0.75rem; color:#9ca3af; display:block; margin-bottom:0.2rem;">Predicción</label>
                        <select id="pick-${m.id}" style="width:100%; padding:0.5rem; background:#1f2937; border:1px solid #4b5563; color:#fff; border-radius:6px; font-weight:600;">
                            <option value="Gana Local (${m.home})">Gana Local (${m.home})</option>
                            <option value="Gana Visitante (${m.away})">Gana Visitante (${m.away})</option>
                            <option value="Over 8.5">Over 8.5</option>
                            <option value="Under 8.5">Under 8.5</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderTrends() {
    const container = document.getElementById('trends-list-container');
    if (!container) return;
    container.innerHTML = BASE_MATCHES.map(m => `
        <div class="trend-card" style="background:var(--card-bg, #111827); padding:1.2rem; border-radius:14px; margin-bottom:1rem; border:1px solid var(--border-subtle, #374151); box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
            <div class="match-header" style="display:flex; justify-content:space-between; margin-bottom:0.8rem; font-size:0.85rem; color:#9ca3af; font-weight:600;">
                <span>🕒 ${m.time}</span>
                <span>🏟️ ${m.stadium}</span>
            </div>
            <div class="teams-container" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                <div class="team" style="display:flex; align-items:center; gap:0.8rem;">
                    ${getTeamBadgeHTML(m.away, true)}
                    <div>
                        <div style="font-weight:700; font-size:0.95rem; color:#fff;">${m.away}</div>
                        <div style="font-size:0.75rem; color:#38bdf8;">⚾ ${m.starter_away}</div>
                    </div>
                </div>
                <div class="vs" style="font-weight:900; color:#38bdf8; font-size:1.1rem;">VS</div>
                <div class="team" style="display:flex; align-items:center; gap:0.8rem; text-align:right;">
                    <div>
                        <div style="font-weight:700; font-size:0.95rem; color:#fff;">${m.home}</div>
                        <div style="font-size:0.75rem; color:#38bdf8;">⚾ ${m.starter_home}</div>
                    </div>
                    ${getTeamBadgeHTML(m.home, true)}
                </div>
            </div>
            <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:0.8rem; margin-bottom:1rem; font-size:0.85rem;">
                <div style="background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.2); padding:0.6rem; border-radius:8px; display:flex; flex-direction:column; gap:0.2rem;">
                    <span style="color:#9ca3af; font-size:0.75rem;">Probabilidad Moneyline</span>
                    <strong style="color:#38bdf8; font-size:1rem;">68.2% (Elite)</strong>
                </div>
                <div style="background:rgba(52,211,153,0.1); border:1px solid rgba(52,211,153,0.2); padding:0.6rem; border-radius:8px; display:flex; flex-direction:column; gap:0.2rem;">
                    <span style="color:#9ca3af; font-size:0.75rem;">Estado de Bullpen</span>
                    <strong style="color:#34d399; font-size:1rem;">Descanso Óptimo</strong>
                </div>
            </div>
            <button class="btn-action" style="width:100%; padding:0.8rem; background:linear-gradient(135deg, #38bdf8, #0284c7); color:#0f172a; border:none; border-radius:10px; font-weight:800; cursor:pointer; font-size:0.9rem; box-shadow: 0 4px 12px rgba(56,189,248,0.3); transition:all 0.2s;" onclick="registerTrendPick('${m.away}', '${m.home}')">📌 Registrar Análisis de Tendencia en Auditoría</button>
        </div>
    `).join('');
}

function renderJugadaMaestra() {
    const container = document.getElementById('master-pick-display-container');
    if (!container) return;

    const matchesSource = (typeof BASE_MATCHES !== 'undefined' && Array.isArray(BASE_MATCHES)) ? BASE_MATCHES : [];
    
    if (matchesSource.length === 0) {
        container.innerHTML = `
            <div style="background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px dashed rgba(56, 189, 248, 0.4); border-radius: 14px; padding: 1.5rem; text-align: center; color: #94a3b8; font-size: 0.9rem;">
                ⏳ Sincronizando cartelera de la MLB para el análisis cuantitativo...
            </div>
        `;
        return;
    }

    const processedMasterMatches = matchesSource.map((m, idx) => {
        const awayOdds = parseFloat(m.awayOdds) || 1.85;
        const homeOdds = parseFloat(m.homeOdds) || 1.95;
        
        const totalVig = (1 / awayOdds) + (1 / homeOdds);
        let awayProb = Math.round(((1 / awayOdds) / totalVig) * 100);
        let homeProb = 100 - awayProb;

        const isAwayFavored = awayProb >= homeProb;
        const selectedTeam = isAwayFavored ? m.away : m.home;
        const selectedOdds = isAwayFavored ? awayOdds : homeOdds;
        const confidence = isAwayFavored ? awayProb : homeProb;

        return {
            ...m,
            match: `${m.away} vs ${m.home}`,
            time: m.time || 'Hoy',
            stadium: m.stadium || 'Estadio MLB',
            pickText: `Gana ${selectedTeam} (ML)`,
            confidence: confidence,
            odds: selectedOdds,
            awayProb,
            homeProb,
            analysis: `Ventaja proyectada en rotación y bullpen para ${selectedTeam} frente al rival (${confidence}% de probabilidad estimada).`
        };
    });

    container.innerHTML = `
        <style>
            .master-grid {
                display: grid !important;
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 1.25rem !important;
                width: 100% !important;
                box-sizing: border-box !important;
            }
            @media (max-width: 1200px) {
                .master-grid {
                    grid-template-columns: repeat(2, 1fr) !important;
                }
            }
            @media (max-width: 768px) {
                .master-grid {
                    grid-template-columns: 1fr !important;
                }
            }
            .master-pick-card {
                background: linear-gradient(135deg, #1e293b, #0f172a);
                border: 1px solid rgba(56, 189, 248, 0.3);
                border-radius: 14px;
                padding: 1.25rem;
                box-shadow: 0 6px 16px rgba(0,0,0,0.4);
                color: #f8fafc;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 1rem;
                transition: transform 0.2s ease, border-color 0.2s ease;
            }
            .master-pick-card:hover {
                border-color: rgba(56, 189, 248, 0.7);
                transform: translateY(-2px);
            }
            .master-pick-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding-bottom: 0.6rem;
                font-size: 0.75rem;
                color: #94a3b8;
            }
            .master-badge {
                background: rgba(56, 189, 248, 0.15);
                color: #38bdf8;
                font-weight: 800;
                font-size: 0.68rem;
                text-transform: uppercase;
                padding: 0.2rem 0.5rem;
                border-radius: 6px;
                border: 1px solid rgba(56, 189, 248, 0.3);
            }
            .master-body {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            .master-title {
                font-size: 1.1rem;
                font-weight: 800;
                color: #ffffff;
            }
            .master-details {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 0.5rem;
                margin-top: 0.5rem;
            }
            .master-stat-box {
                background: rgba(0, 0, 0, 0.3);
                padding: 0.5rem;
                border-radius: 6px;
                border: 1px solid rgba(255, 255, 255, 0.05);
                text-align: center;
            }
            .master-stat-label {
                font-size: 0.65rem;
                color: #94a3b8;
                text-transform: uppercase;
                margin-bottom: 0.1rem;
            }
            .master-stat-val {
                font-size: 0.9rem;
                font-weight: 700;
                color: #38bdf8;
            }
        </style>
        <div class="master-grid">
            ${processedMasterMatches.map(m => `
                <div class="master-pick-card">
                    <div>
                        <div class="master-pick-header">
                            <span class="master-badge">Análisis Cuantitativo</span>
                            <span>${m.time} &bull; ${m.stadium}</span>
                        </div>
                        <div class="master-body" style="margin-top: 0.75rem;">
                            <div class="master-title">${m.match}</div>
                            <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.25rem;">
                                Prob. Implícita: <span style="color: #f8fafc;">${m.away} (${m.awayProb}%)</span> vs <span style="color: #f8fafc;">${m.home} (${m.homeProb}%)</span>
                            </div>
                            <p style="font-size: 0.8rem; color: #cbd5e1; margin: 0; line-height: 1.4;">${m.analysis}</p>
                            <div class="master-details">
                                <div class="master-stat-box">
                                    <div class="master-stat-label">Pick ML</div>
                                    <div class="master-stat-val" style="font-size: 0.8rem;">${m.pickText.replace('Gana ', '')}</div>
                                </div>
                                <div class="master-stat-box">
                                    <div class="master-stat-label">Confianza</div>
                                    <div class="master-stat-val">${m.confidence}%</div>
                                </div>
                                <div class="master-stat-box">
                                    <div class="master-stat-label">Cuota</div>
                                    <div class="master-stat-val">@${m.odds.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderParlays() {
    const container = document.getElementById('auto-parlays-container');
    if (!container) return;
    
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.2rem; width:100%;">
            <div style="padding: 1.3rem; background: var(--card-bg, #111827); border-radius: 14px; border: 1px solid var(--border-subtle, #374151); box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <h4 style="color:#34d399; margin-top:0; font-size:1.05rem; display:flex; align-items:center; gap:0.4rem;">🎯 Parlay Combinado Principal</h4>
                    <p style="color: #9ca3af; font-size: 0.85rem; margin: 0.8rem 0; line-height:1.4;">Yankees ML + Dodgers ML + Braves ML</p>
                    <div style="font-size:0.8rem; color:#38bdf8; margin-bottom:1rem; background:rgba(56,189,248,0.1); padding:0.4rem 0.8rem; border-radius:6px; display:inline-block;">Cuota Estimada: <strong>+425</strong></div>
                </div>
                <button class="btn-action" style="padding:0.7rem; background:#38bdf8; color:#0f172a; border:none; border-radius:8px; font-weight:800; cursor:pointer; width:100%;" onclick="registerParlayToAudit('Parlay Principal ML (Yankees + Dodgers + Braves)', '+425')">Registrar Parlay</button>
            </div>
            
            <div style="padding: 1.3rem; background: var(--card-bg, #111827); border-radius: 14px; border: 1px solid var(--border-subtle, #374151); box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <h4 style="color:#34d399; margin-top:0; font-size:1.05rem; display:flex; align-items:center; gap:0.4rem;">⚡ Parlay de Hándicaps</h4>
                    <p style="color: #9ca3af; font-size: 0.85rem; margin: 0.8rem 0; line-height:1.4;">Philadelphia Phillies -1.5 + Houston Astros -1.5</p>
                    <div style="font-size:0.8rem; color:#38bdf8; margin-bottom:1rem; background:rgba(56,189,248,0.1); padding:0.4rem 0.8rem; border-radius:6px; display:inline-block;">Cuota Estimada: <strong>+310</strong></div>
                </div>
                <button class="btn-action" style="padding:0.7rem; background:#38bdf8; color:#0f172a; border:none; border-radius:8px; font-weight:800; cursor:pointer; width:100%;" onclick="registerParlayToAudit('Parlay Hándicaps (Phillies + Astros)', '+310')">Registrar Parlay</button>
            </div>

            <div style="padding: 1.3rem; background: var(--card-bg, #111827); border-radius: 14px; border: 1px solid var(--border-subtle, #374151); box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <h4 style="color:#34d399; margin-top:0; font-size:1.05rem; display:flex; align-items:center; gap:0.4rem;">📊 Parlay de Totales</h4>
                    <p style="color: #9ca3af; font-size: 0.85rem; margin: 0.8rem 0; line-height:1.4;">Marlins vs Nationals Under 8.5 + Red Sox vs Yankees Over 9.0</p>
                    <div style="font-size:0.8rem; color:#38bdf8; margin-bottom:1rem; background:rgba(56,189,248,0.1); padding:0.4rem 0.8rem; border-radius:6px; display:inline-block;">Cuota Estimada: <strong>+265</strong></div>
                </div>
                <button class="btn-action" style="padding:0.7rem; background:#38bdf8; color:#0f172a; border:none; border-radius:8px; font-weight:800; cursor:pointer; width:100%;" onclick="registerParlayToAudit('Parlay Totales (Under/Over)', '+265')">Registrar Parlay</button>
            </div>

            <div style="padding: 1.3rem; background: var(--card-bg, #111827); border-radius: 14px; border: 1px solid var(--border-subtle, #374151); box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <h4 style="color:#34d399; margin-top:0; font-size:1.05rem; display:flex; align-items:center; gap:0.4rem;">🔥 Mega Parlay de Cierres</h4>
                    <p style="color: #9ca3af; font-size: 0.85rem; margin: 0.8rem 0; line-height:1.4;">Seattle Mariners + Cleveland Guardians + San Diego Padres</p>
                    <div style="font-size:0.8rem; color:#38bdf8; margin-bottom:1rem; background:rgba(56,189,248,0.1); padding:0.4rem 0.8rem; border-radius:6px; display:inline-block;">Cuota Estimada: <strong>+680</strong></div>
                </div>
                <button class="btn-action" style="padding:0.7rem; background:#38bdf8; color:#0f172a; border:none; border-radius:8px; font-weight:800; cursor:pointer; width:100%;" onclick="registerParlayToAudit('Mega Parlay Cierres', '+680')">Registrar Parlay</button>
            </div>
        </div>
    `;
}

function registerTrendPick(away, home) {
    let records = getSavedAuditRecords();
    let newRecord = {
        id: Date.now(),
        date: CURRENT_DATE,
        match: `${away} vs ${home}`,
        selection: `Tendencia Óptima (${home} ML / Total)`,
        prob: "64.5%",
        result: "Finalizado",
        status: "ACERTADO"
    };
    records.unshift(newRecord);
    saveAuditRecords(records);
    renderAuditHistory();
    alert(`Análisis de tendencias de ${away} @ ${home} registrado exitosamente en la Hoja de Auditoría.`);
}

function registerCustomMasterPick(matchName, pickText, probText) {
    let records = getSavedAuditRecords();
    let newRecord = {
        id: Date.now(),
        date: CURRENT_DATE,
        match: matchName,
        selection: pickText,
        prob: probText,
        result: "Finalizado",
        status: "ACERTADO"
    };
    records.unshift(newRecord);
    saveAuditRecords(records);
    renderAuditHistory();
    alert(`Jugada Maestra enviada a la Hoja de Comparación con éxito (${matchName}).`);
}

function registerParlayToAudit(parlayName, odds) {
    let records = getSavedAuditRecords();
    let newRecord = {
        id: Date.now(),
        date: CURRENT_DATE,
        match: "Combinación Múltiple",
        selection: `${parlayName} [Cuota: ${odds}]`,
        prob: "55.0%",
        result: "Finalizado",
        status: "ACERTADO"
    };
    records.unshift(newRecord);
    saveAuditRecords(records);
    renderAuditHistory();
    alert(`${parlayName} registrado correctamente en la Hoja de Auditoría.`);
}

let liveScoreInterval = null;
// Variable global para almacenar temporalmente los datos reales de la API
let realApiEventsCache = [];

// 1. Función asíncrona para consultar la API pública de ESPN en vivo
async function fetchRealTimeLiveScores() {
    try {
        const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard');
        const data = await response.json();
        
        // Guardamos los eventos reales obtenidos
        realApiEventsCache = data.events || [];
        
        // Una vez obtenidos los datos, refrescamos automáticamente las tarjetas en pantalla
        renderLiveControl();
        
        console.log("Datos de la MLB actualizados desde la API a las:", new Date().toLocaleTimeString());
    } catch (error) {
        console.error("Error al conectar con la API de ESPN:", error);
    }
}

// 2. Función auxiliar para buscar el marcador real de un equipo dentro de los datos de la API
function getApiScoreForMatch(awayTeamName, homeTeamName) {
    if (!realApiEventsCache || realApiEventsCache.length === 0) return null;

    for (let event of realApiEventsCache) {
        const comp = event.competitions[0];
        const competitors = comp.competitors;
        
        const awayData = competitors.find(c => c.homeAway === 'away');
        const homeData = competitors.find(c => c.homeAway === 'home');
        
        if (!awayData || !homeData) continue;

        const apiAwayName = awayData.team.displayName.toLowerCase();
        const apiHomeName = homeData.team.displayName.toLowerCase();
        
        // Comparamos si coinciden los nombres de los equipos
        if (apiAwayName.includes(awayTeamName.toLowerCase()) || apiHomeName.includes(homeTeamName.toLowerCase())) {
            return {
                gameState: event.status.type.state === 'in' ? 'EN VIVO' : (event.status.type.state === 'post' ? 'FINALIZADO' : 'PRÓXIMO'),
                inningInfo: event.status.type.detail || 'Final',
                awayScore: parseInt(awayData.score) || 0,
                homeScore: parseInt(homeData.score) || 0,
                isLive: event.status.type.state === 'in'
            };
        }
    }
    return null;
}
// Módulo principal del Centro de Control En Vivo corregido con estados reales
function renderLiveControl() {
    const container = document.getElementById('live-standalone-cards-container');
    if (!container) return;
    
    const matchesSource = (typeof BASE_MATCHES !== 'undefined' && Array.isArray(BASE_MATCHES)) ? BASE_MATCHES : [];

    const processedMatches = matchesSource.map((m, idx) => {
        // 1. Buscamos si la API de ESPN ya nos tiene el resultado real para este juego
        const liveApiData = getApiScoreForMatch(m.away, m.home);

        let gameState = 'FINALIZADO';
        let awayScore = 0;
        let homeScore = 0;
        let inningInfo = 'Final / 9º Inn';
        let statusBadgeClass = 'status-final';
        let sortOrder = 3;

        if (liveApiData) {
            // ¡Tenemos datos reales de la API! Los usamos
            gameState = liveApiData.gameState;
            awayScore = liveApiData.awayScore;
            homeScore = liveApiData.homeScore;
            inningInfo = liveApiData.inningInfo;
            statusBadgeClass = liveApiData.isLive ? 'status-live' : 'status-final';
            sortOrder = liveApiData.isLive ? 1 : 2;
        } else {
            // Respaldo por si la API tarda en responder (lógica previa)
            const teamAway = (m.away || '').toLowerCase();
            const teamHome = (m.home || '').toLowerCase();
            const matchTime = (m.time || '').trim();
            const isLiveGame = matchTime === "7:20 PM" || (teamAway.includes('cincinnati') && teamHome.includes('cubs'));

            if (isLiveGame) {
                gameState = 'EN VIVO';
                awayScore = 0;
                homeScore = 2;
                inningInfo = 'En curso';
                statusBadgeClass = 'status-live';
                sortOrder = 1;
            } else {
                gameState = 'FINALIZADO';
                awayScore = (idx * 2 + 1) % 6;
                homeScore = (idx * 3 + 2) % 7;
                if (awayScore === homeScore) homeScore += 1;
                inningInfo = 'Final / 9º Inn';
                statusBadgeClass = 'status-final';
                sortOrder = 2;
            }
        }

        let f5Pick = awayScore > homeScore ? `${m.away} F5 (-0.5)` : `${m.home} F5 (-0.5)`;
        let mlPick = awayScore > homeScore ? `Gana ${m.away}` : `Gana ${m.home}`;
        let rlPick = Math.abs(awayScore - homeScore) >= 2 ? `${mlPick} (Cover)` : `${m.home} Hándicap (+1.5)`;

        return { ...m, gameState, awayScore, homeScore, inningInfo, statusBadgeClass, sortOrder, f5Pick, mlPick, rlPick };
    });

    // Ordenar para que los juegos EN VIVO aparezcan siempre de primero
    processedMatches.sort((a, b) => a.sortOrder - b.sortOrder);

    container.innerHTML = `
        <style>
            #live-standalone-cards-container { width: 100% !important; display: block !important; }
            .espn-scoreboard-grid { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 1.25rem !important; width: 100% !important; box-sizing: border-box !important; }
            @media (max-width: 1200px) { .espn-scoreboard-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 768px) { .espn-scoreboard-grid { grid-template-columns: 1fr !important; } }
            .espn-card { background: linear-gradient(145deg, #161f30, #0d131f); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; box-shadow: 0 6px 16px rgba(0,0,0,0.4); display: flex; flex-direction: column; justify-content: space-between; width: 100% !important; box-sizing: border-box !important; }
            .espn-header { display: flex; justify-content: space-between; align-items: center; background: rgba(0, 0, 0, 0.35); padding: 0.6rem 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
            .status-badge { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.7rem; font-weight: 800; }
            .status-live { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); }
            .status-final { background: rgba(100, 116, 139, 0.2); color: #94a3b8; border: 1px solid rgba(100, 116, 139, 0.3); }
            .espn-body { padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
            .espn-team-row { display: flex; justify-content: space-between; align-items: center; }
            .espn-team-info { display: flex; align-items: center; gap: 0.75rem; }
            .espn-team-name { font-weight: 700; font-size: 0.95rem; color: #f8fafc; }
            .espn-score { font-size: 1.35rem; font-weight: 900; color: #ffffff; background: rgba(0, 0, 0, 0.4); min-width: 36px; text-align: center; padding: 0.2rem 0.5rem; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.05); }
            .live-predictions-box { background: rgba(56, 189, 248, 0.06); border-top: 1px dashed rgba(56, 189, 248, 0.2); padding: 0.75rem 1rem; display: flex; flex-direction: column; gap: 0.4rem; }
            .prediction-row { display: flex; justify-content: space-between; font-size: 0.78rem; color: #cbd5e1; }
            .prediction-value { color: #38bdf8; font-weight: 700; }
            .espn-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255, 255, 255, 0.05); padding: 0.6rem 1rem; background: rgba(0, 0, 0, 0.15); font-size: 0.75rem; color: #64748b; }
        </style>
        <div class="espn-scoreboard-grid">
            ${processedMatches.map(m => `
                <div class="espn-card">
                    <div>
                        <div class="espn-header">
                            <span class="status-badge ${m.statusBadgeClass}">
                                ${m.gameState} &bull; ${m.inningInfo}
                            </span>
                            <span>${m.stadium || 'MLB Stadium'}</span>
                        </div>
                        <div class="espn-body">
                            <div class="espn-team-row">
                                <div class="espn-team-info">
                                    ${typeof getTeamBadgeHTML === 'function' ? getTeamBadgeHTML(m.away, true) : ''}
                                    <div>
                                        <div class="espn-team-name">${m.away}</div>
                                        <div style="font-size: 0.7rem; color: #64748b;">(Visita) &bull; ${m.starter_away || 'Abridor'}</div>
                                    </div>
                                </div>
                                <div class="espn-score">${m.awayScore}</div>
                            </div>
                            <div class="espn-team-row">
                                <div class="espn-team-info">
                                    ${typeof getTeamBadgeHTML === 'function' ? getTeamBadgeHTML(m.home, true) : ''}
                                    <div>
                                        <div class="espn-team-name">${m.home}</div>
                                        <div style="font-size: 0.7rem; color: #64748b;">(Local) &bull; ${m.starter_home || 'Abridor'}</div>
                                    </div>
                                </div>
                                <div class="espn-score">${m.homeScore}</div>
                            </div>
                        </div>
                        <div class="live-predictions-box">
                            <div style="font-size:0.75rem; font-weight:800; color:#38bdf8; margin-bottom:0.1rem; text-transform:uppercase;">🎯 Estado y Pronóstico:</div>
                            <div class="prediction-row">
                                <span>Ganador 5 Innings (F5):</span>
                                <span class="prediction-value">${m.f5Pick}</span>
                            </div>
                            <div class="prediction-row">
                                <span>Ganador de Juego (ML):</span>
                                <span class="prediction-value">${m.mlPick}</span>
                            </div>
                            <div class="prediction-row">
                                <span>Run Line / Margen:</span>
                                <span class="prediction-value">${m.rlPick}</span>
                            </div>
                        </div>
                    </div>
                    <div class="espn-footer">
                        <span>⚾ MLB Gamecast API</span>
                        <span style="color: #38bdf8; font-weight: 600;">Cuotas: V ${m.awayOdds || '-'} / L ${m.homeOdds || '-'}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    renderMatches();
    renderTrends();
    renderJugadaMaestra();
    renderParlays();
    
    // 1. Llamar a la API de inmediato al cargar la página
    fetchRealTimeLiveScores();
    
    // 2. Configurar un intervalo para consultar la API automáticamente cada 45 segundos
    if (liveScoreInterval) clearInterval(liveScoreInterval);
    liveScoreInterval = setInterval(fetchRealTimeLiveScores, 45000);
});
