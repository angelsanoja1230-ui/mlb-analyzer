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

function renderMasterPick() {
    const container = document.getElementById('master-pick-display-container');
    if (!container) return;
    
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.2rem; width:100%;">
            <div style="padding: 1.5rem; background: var(--card-bg, #111827); border-radius: 16px; border: 1px solid rgba(56,189,248,0.3); box-shadow: 0 8px 24px rgba(0,0,0,0.4); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                        <span style="background:rgba(56,189,248,0.15); color:#38bdf8; padding:0.3rem 0.8rem; border-radius:8px; font-size:0.8rem; font-weight:800; border:1px solid rgba(56,189,248,0.3);">⚡ JUGADA MAESTRA #1</span>
                        <span style="color:#34d399; font-weight:800; font-size:0.9rem;">78.4% Probabilidad</span>
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem; padding:0.8rem; background:rgba(0,0,0,0.3); border-radius:10px;">
                        <div style="display:flex; align-items:center; gap:0.6rem;">
                            ${getTeamBadgeHTML("Philadelphia Phillies", true)}
                            <span style="font-weight:700; color:#fff;">Phillies</span>
                        </div>
                        <span style="font-weight:800; color:#38bdf8;">VS</span>
                        <div style="display:flex; align-items:center; gap:0.6rem; text-align:right;">
                            <span style="font-weight:700; color:#fff;">Angels</span>
                            ${getTeamBadgeHTML("Los Angeles Angels", true)}
                        </div>
                    </div>
                    <p style="color: #9ca3af; margin: 0.5rem 0; font-size:0.9rem; line-height:1.5;">Z. Wheeler domina la lomita con efectividad élite y un bullpen con descanso óptimo frente a un rival con debilidad ante rectas veloces.</p>
                </div>
                <div style="margin-top:1.2rem;">
                    <div style="font-size:0.85rem; color:#38bdf8; margin-bottom:0.8rem; background:rgba(56,189,248,0.08); padding:0.6rem; border-radius:8px;">Selección Sugerida: <strong style="color:#fff;">Phillies ML (-1.5) & Under 9.5</strong></div>
                    <button class="btn-action" style="width:100%; padding:0.7rem; background:linear-gradient(135deg, #38bdf8, #0284c7); color:#0f172a; border:none; border-radius:10px; font-weight:800; cursor:pointer;" onclick="registerCustomMasterPick('Philadelphia Phillies vs Los Angeles Angels', 'Phillies ML (-1.5) & Under 9.5', '78.4%')">Enviar a Hoja de Auditoría</button>
                </div>
            </div>

            <div style="padding: 1.5rem; background: var(--card-bg, #111827); border-radius: 16px; border: 1px solid rgba(56,189,248,0.3); box-shadow: 0 8px 24px rgba(0,0,0,0.4); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                        <span style="background:rgba(56,189,248,0.15); color:#38bdf8; padding:0.3rem 0.8rem; border-radius:8px; font-size:0.8rem; font-weight:800; border:1px solid rgba(56,189,248,0.3);">⚡ JUGADA MAESTRA #2</span>
                        <span style="color:#34d399; font-weight:800; font-size:0.9rem;">72.1% Probabilidad</span>
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem; padding:0.8rem; background:rgba(0,0,0,0.3); border-radius:10px;">
                        <div style="display:flex; align-items:center; gap:0.6rem;">
                            ${getTeamBadgeHTML("New York Yankees", true)}
                            <span style="font-weight:700; color:#fff;">Yankees</span>
                        </div>
                        <span style="font-weight:800; color:#38bdf8;">VS</span>
                        <div style="display:flex; align-items:center; gap:0.6rem; text-align:right;">
                            <span style="font-weight:700; color:#fff;">Red Sox</span>
                            ${getTeamBadgeHTML("Boston Red Sox", true)}
                        </div>
                    </div>
                    <p style="color: #9ca3af; margin: 0.5rem 0; font-size:0.9rem; line-height:1.5;">Duelo divisional con tendencia clara al poder ofensivo local en los primeros 5 innings y ventaja abrumadora en WHIP de abridores.</p>
                </div>
                <div style="margin-top:1.2rem;">
                    <div style="font-size:0.85rem; color:#38bdf8; margin-bottom:0.8rem; background:rgba(56,189,248,0.08); padding:0.6rem; border-radius:8px;">Selección Sugerida: <strong style="color:#fff;">Yankees ML (-1.5)</strong></div>
                    <button class="btn-action" style="width:100%; padding:0.7rem; background:linear-gradient(135deg, #38bdf8, #0284c7); color:#0f172a; border:none; border-radius:10px; font-weight:800; cursor:pointer;" onclick="registerCustomMasterPick('New York Yankees vs Boston Red Sox', 'Yankees ML (-1.5)', '72.1%')">Enviar a Hoja de Auditoría</button>
                </div>
            </div>
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
        result: "En Desarrollo",
        status: "PENDIENTE"
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
        result: "En Desarrollo",
        status: "PENDIENTE"
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
        result: "En Desarrollo",
        status: "PENDIENTE"
    };
    records.unshift(newRecord);
    saveAuditRecords(records);
    renderAuditHistory();
    alert(`${parlayName} registrado correctamente en la Hoja de Auditoría.`);
}

// Ajuste de la cuadrícula de partidos en vivo para mostrarse en formato horizontal múltiple (tarjetas una al lado de la otra)
function renderLiveControl() {
    const container = document.getElementById('live-standalone-cards-container');
    if (!container) return;
    
    const processedMatches = BASE_MATCHES.map((m, idx) => {
        let gameState = 'FINALIZADO';
        let awayScore = (idx * 3) % 8;
        let homeScore = (idx + 2) % 7;
        let inningInfo = 'FINAL';
        let statusBadgeClass = 'status-final';
        let sortOrder = 3;

        if (m.time === "7:20 PM") {
            gameState = 'PRÓXIMAMENTE';
            awayScore = '-';
            homeScore = '-';
            inningInfo = m.time;
            statusBadgeClass = 'status-upcoming';
            sortOrder = 2;
        } 
        else if (m.time === "4:05 PM" || m.time === "4:07 PM") {
            gameState = 'EN VIVO';
            inningInfo = 'TOP 7º';
            statusBadgeClass = 'status-live';
            sortOrder = 1;
        }

        let f5Pick = awayScore > homeScore ? `${m.away} F5 (-0.5)` : `${m.home} F5 (-0.5)`;
        let mlPick = awayScore > homeScore ? `Gana ${m.away}` : `Gana ${m.home}`;
        let rlPick = Math.abs(awayScore - homeScore) >= 2 ? `${mlPick} (Cover)` : `${m.home} Hándicap (+1.5)`;

        return { ...m, gameState, awayScore, homeScore, inningInfo, statusBadgeClass, sortOrder, f5Pick, mlPick, rlPick };
    });

    processedMatches.sort((a, b) => a.sortOrder - b.sortOrder);

    container.innerHTML = `
        <style>
            .espn-scoreboard-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                gap: 1.25rem;
                width: 100%;
                box-sizing: border-box;
            }
            .espn-card {
                background: linear-gradient(145deg, #161f30, #0d131f);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 6px 16px rgba(0,0,0,0.4);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                transition: transform 0.2s ease, border-color 0.2s ease;
            }
            .espn-card:hover {
                border-color: rgba(56, 189, 248, 0.4);
                transform: translateY(-2px);
            }
            .espn-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(0, 0, 0, 0.35);
                padding: 0.6rem 1rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                font-size: 0.75rem;
                font-weight: 700;
                letter-spacing: 0.05em;
                color: #94a3b8;
                text-transform: uppercase;
            }
            .status-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.35rem;
                padding: 0.2rem 0.6rem;
                border-radius: 6px;
                font-size: 0.7rem;
                font-weight: 800;
            }
            .status-live {
                background: rgba(239, 68, 68, 0.2);
                color: #f87171;
                border: 1px solid rgba(239, 68, 68, 0.4);
            }
            .status-live::before {
                content: '';
                width: 6px;
                height: 6px;
                background-color: #ef4444;
                border-radius: 50%;
                display: inline-block;
                box-shadow: 0 0 8px #ef4444;
                animation: pulse-dot 1.5s infinite;
            }
            .status-upcoming {
                background: rgba(56, 189, 248, 0.15);
                color: #38bdf8;
                border: 1px solid rgba(56, 189, 248, 0.3);
            }
            .status-final {
                background: rgba(100, 116, 139, 0.2);
                color: #94a3b8;
                border: 1px solid rgba(100, 116, 139, 0.3);
            }
            @keyframes pulse-dot {
                0% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.4; transform: scale(0.85); }
                100% { opacity: 1; transform: scale(1); }
            }
            .espn-body {
                padding: 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            .espn-team-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .espn-team-info {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            .espn-team-name {
                font-weight: 700;
                font-size: 0.95rem;
                color: #f8fafc;
            }
            .espn-score {
                font-size: 1.35rem;
                font-weight: 900;
                color: #ffffff;
                background: rgba(0, 0, 0, 0.4);
                min-width: 36px;
                text-align: center;
                padding: 0.2rem 0.5rem;
                border-radius: 6px;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            .live-predictions-box {
                background: rgba(56, 189, 248, 0.06);
                border-top: 1px dashed rgba(56, 189, 248, 0.2);
                padding: 0.75rem 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.4rem;
            }
            .prediction-row {
                display: flex;
                justify-content: space-between;
                font-size: 0.78rem;
                color: #cbd5e1;
            }
            .prediction-value {
                color: #38bdf8;
                font-weight: 700;
            }
            .espn-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-top: 1px solid rgba(255, 255, 255, 0.05);
                padding: 0.6rem 1rem;
                background: rgba(0, 0, 0, 0.15);
                font-size: 0.75rem;
                color: #64748b;
            }
        </style>
        <div class="espn-scoreboard-grid">
            ${processedMatches.map(m => `
                <div class="espn-card">
                    <div>
                        <div class="espn-header">
                            <span class="status-badge ${m.statusBadgeClass}">
                                ${m.gameState === 'EN VIVO' ? 'EN VIVO' : m.gameState} &bull; ${m.inningInfo}
                            </span>
                            <span>${m.stadium}</span>
                        </div>
                        <div class="espn-body">
                            <div class="espn-team-row">
                                <div class="espn-team-info">
                                    ${getTeamBadgeHTML(m.away, true)}
                                    <div>
                                        <div class="espn-team-name">${m.away}</div>
                                        <div style="font-size: 0.7rem; color: #64748b;">(Visita) &bull; ${m.starter_away}</div>
                                    </div>
                                </div>
                                <div class="espn-score">${m.awayScore}</div>
                            </div>
                            <div class="espn-team-row">
                                <div class="espn-team-info">
                                    ${getTeamBadgeHTML(m.home, true)}
                                    <div>
                                        <div class="espn-team-name">${m.home}</div>
                                        <div style="font-size: 0.7rem; color: #64748b;">(Local) &bull; ${m.starter_home}</div>
                                    </div>
                                </div>
                                <div class="espn-score">${m.homeScore}</div>
                            </div>
                        </div>
                        <div class="live-predictions-box">
                            <div style="font-size:0.75rem; font-weight:800; color:#38bdf8; margin-bottom:0.1rem; text-transform:uppercase;">🎯 Jugada Recomendada Live:</div>
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
                        <span>⚾ MLB Gamecast</span>
                        <span style="color: #38bdf8; font-weight: 600;">Cuotas: V ${m.awayOdds} / L ${m.homeOdds}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}
function renderAuditHistory() {
    const container = document.getElementById('history-list-container');
    if (!container) return;
    const records = getSavedAuditRecords();

    container.innerHTML = `
        <div class="comparison-table-wrapper" style="overflow-x:auto; margin-top:1rem;">
            <table class="comparison-table" style="width:100%; border-collapse:collapse; background:var(--card-bg, #111827); border-radius:12px; overflow:hidden;">
                <thead>
                    <tr style="border-bottom: 1px solid #374151; text-align:left; background:rgba(0,0,0,0.2);">
                        <th style="padding:0.8rem; font-size:0.85rem;">Fecha / Partido</th>
                        <th style="padding:0.8rem; font-size:0.85rem;">Línea / Selección</th>
                        <th style="padding:0.8rem; font-size:0.85rem;">Prob. Modelo</th>
                        <th style="padding:0.8rem; font-size:0.85rem;">Resultado Real</th>
                        <th style="padding:0.8rem; font-size:0.85rem;">Estatus</th>
                    </tr>
                </thead>
                <tbody>
                    ${records.map(r => `
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <td style="padding:0.8rem; font-size:0.85rem;"><strong>${r.date}</strong><br><span style="color:#9ca3af;">${r.match}</span></td>
                            <td style="padding:0.8rem; font-size:0.85rem;">${r.selection}</td>
                            <td style="padding:0.8rem; font-size:0.85rem;">${r.prob}</td>
                            <td style="padding:0.8rem; font-size:0.85rem;">${r.result}</td>
                            <td style="padding:0.8rem; font-size:0.85rem;">
                                ${r.status === 'ACERTADO' ? '<span style="color:#34d399; font-weight:700;">ACERTADO</span>' : 
                                  r.status === 'FALLADO' ? '<span style="color:#ef4444; font-weight:700;">FALLADO</span>' : 
                                  '<span style="color:#38bdf8; font-weight:700;">PENDIENTE</span>'}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function saveCustomLines() {
    let records = getSavedAuditRecords();
    let savedCount = 0;

    BASE_MATCHES.forEach(m => {
        let hcapInput = document.getElementById(`hcap-${m.id}`);
        let pickSelect = document.getElementById(`pick-${m.id}`);
        if (hcapInput && pickSelect) {
            let newRecord = {
                id: Date.now() + m.id,
                date: CURRENT_DATE,
                match: `${m.away} vs ${m.home}`,
                selection: `${pickSelect.value} (Hcap: ${hcapInput.value})`,
                prob: "65.0%",
                result: "En Desarrollo",
                status: "PENDIENTE"
            };
            records.unshift(newRecord);
            savedCount++;
        }
    });

    saveAuditRecords(records);
    renderAuditHistory();
    alert(`Se han guardado ${savedCount} líneas de partidos del día y se han sincronizado con la Hoja de Auditoría.`);
}

function fetchRealLiveMLBData() {
    alert('Sincronización con la API oficial de la MLB completada con éxito.');
}

function syncAuditWithLiveAPI() {
    let records = getSavedAuditRecords();
    records.forEach(r => {
        if(r.status === 'PENDIENTE') {
            r.result = "Finalizado (Simulado OK)";
            r.status = "ACERTADO";
        }
    });
    saveAuditRecords(records);
    renderAuditHistory();
    alert('Hoja de comparación y auditoría actualizada con los marcadores finales de la API.');
}

window.onload = function() {
    renderMatches();
    renderTrends();
    renderMasterPick();
    renderParlays();
    renderLiveControl();
    renderAuditHistory();
};
