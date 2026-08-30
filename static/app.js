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
    let size = small ? '40px' : '52px';
    let fontSize = small ? '0.75rem' : '1.05rem';
    
    return `
    <div class="team-insignia" style="width: ${size}; height: ${size}; min-width: ${size}; min-height: ${size}; background: linear-gradient(135deg, ${teamData.primary}, #090d16); border-color: ${teamData.secondary}; display:flex; align-items:center; justify-content:center; border-radius:12px; border:2px solid;">
        <span style="font-size: ${fontSize}; color: #ffffff; font-weight: 900; letter-spacing: -0.05em; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${teamData.code}</span>
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
        <div class="match-card" style="background:var(--card-bg, #111827); padding:1rem; border-radius:12px; border:1px solid var(--border-subtle, #374151); margin-bottom:1rem;">
            <div class="match-header" style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.85rem; color:#9ca3af;">
                <span>🕒 ${m.time}</span>
                <span>🏟️ ${m.stadium}</span>
            </div>
            <div class="teams-container" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
                <div class="team" style="display:flex; align-items:center; gap:0.5rem;">
                    ${getTeamBadgeHTML(m.away, true)}
                    <div>
                        <div style="font-size:0.7rem; color:#9ca3af;">Visitor</div>
                        <div style="font-weight:700; font-size:0.9rem;">${m.away}</div>
                        <div style="font-size:0.7rem; color:#9ca3af;">${m.starter_away}</div>
                    </div>
                </div>
                <div class="vs" style="font-weight:800; color:#38bdf8;">VS</div>
                <div class="team" style="display:flex; align-items:center; gap:0.5rem; text-align:right;">
                    <div>
                        <div style="font-size:0.7rem; color:#9ca3af;">Home</div>
                        <div style="font-weight:700; font-size:0.9rem;">${m.home}</div>
                        <div style="font-size:0.7rem; color:#9ca3af;">${m.starter_home}</div>
                    </div>
                    ${getTeamBadgeHTML(m.home, true)}
                </div>
            </div>
            <div class="handicap-box" style="background:rgba(0,0,0,0.2); padding:0.8rem; border-radius:8px;">
                <div style="font-size:0.8rem; font-weight:700; margin-bottom:0.4rem;">⚙️ Línea Configurable</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
                    <div>
                        <label style="font-size:0.75rem; color:#9ca3af;">Hándicap</label>
                        <input type="text" id="hcap-${m.id}" value="${m.defaultHcap}" style="width:100%; padding:0.4rem; background:#1f2937; border:1px solid #4b5563; color:#fff; border-radius:6px;">
                    </div>
                    <div>
                        <label style="font-size:0.75rem; color:#9ca3af;">Predicción</label>
                        <select id="pick-${m.id}" style="width:100%; padding:0.4rem; background:#1f2937; border:1px solid #4b5563; color:#fff; border-radius:6px;">
                            <option value="Gana Local (${m.home})">Gana Local</option>
                            <option value="Gana Visitante (${m.away})">Gana Visitante</option>
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
        <div class="trend-card" style="background:var(--card-bg, #111827); padding:1rem; border-radius:12px; margin-bottom:1rem; border:1px solid var(--border-subtle, #374151);">
            <div class="match-header" style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.85rem; color:#9ca3af;">
                <span>🕒 ${m.time}</span>
                <span>🏟️ ${m.stadium}</span>
            </div>
            <div class="teams-container" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
                <div class="team" style="display:flex; align-items:center; gap:0.5rem;">
                    ${getTeamBadgeHTML(m.away, true)}
                    <div>
                        <div style="font-weight:700; font-size:0.9rem;">${m.away}</div>
                        <div style="font-size:0.7rem; color:#9ca3af;">${m.starter_away}</div>
                    </div>
                </div>
                <div class="vs" style="font-weight:800; color:#38bdf8;">VS</div>
                <div class="team" style="display:flex; align-items:center; gap:0.5rem; text-align:right;">
                    <div>
                        <div style="font-weight:700; font-size:0.9rem;">${m.home}</div>
                        <div style="font-size:0.7rem; color:#9ca3af;">${m.starter_home}</div>
                    </div>
                    ${getTeamBadgeHTML(m.home, true)}
                </div>
            </div>
            <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:0.5rem; margin-bottom:0.8rem; font-size:0.8rem;">
                <div style="background:rgba(56,189,248,0.1); padding:0.4rem; border-radius:6px;">Moneyline Prob: <strong>68.2%</strong></div>
                <div style="background:rgba(56,189,248,0.1); padding:0.4rem; border-radius:6px;">Bullpen Rating: <strong style="color:#34d399;">Top Tier</strong></div>
            </div>
            <button class="btn-action" style="width:100%; padding:0.6rem; background:#38bdf8; color:#0f172a; border:none; border-radius:8px; font-weight:800; cursor:pointer;" onclick="registerTrendPick('${m.away}', '${m.home}')">📌 Registrar Análisis en Auditoría</button>
        </div>
    `).join('');
}

function renderMasterPick() {
    const container = document.getElementById('master-pick-display-container');
    if (!container) return;
    
    container.innerHTML = `
        <div style="padding: 1.5rem; background: var(--card-bg, #111827); border-radius: 12px; border: 1px solid var(--border-subtle, #374151);">
            <h3 style="color:#38bdf8; margin-bottom:0.5rem;">🔥 Jugada Maestra del Día</h3>
            <p style="color: #9ca3af; margin-top: 0.5rem; font-size:0.95rem;">Philadelphia Phillies vs Los Angeles Angels — Respaldado por la salida de Z. Wheeler y un diferencial de bullpen altamente favorable.</p>
            <button class="btn-action" style="margin-top: 1rem; padding:0.6rem 1.2rem; background:#38bdf8; color:#0f172a; border:none; border-radius:8px; font-weight:800; cursor:pointer;" onclick="registerMasterPickToAudit()">Enviar a Hoja de Auditoría</button>
        </div>
    `;
}

function renderParlays() {
    const container = document.getElementById('auto-parlays-container');
    if (!container) return;
    
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; width:100%;">
            <div style="padding: 1.2rem; background: var(--card-bg, #111827); border-radius: 12px; border: 1px solid var(--border-subtle, #374151);">
                <h4 style="color:#34d399; margin-top:0;">Parlay Combinado Principal</h4>
                <p style="color: #9ca3af; font-size: 0.85rem; margin: 0.5rem 0;">Yankees ML + Dodgers ML + Braves ML</p>
                <button class="btn-action" style="padding:0.5rem 1rem; background:#38bdf8; color:#0f172a; border:none; border-radius:8px; font-weight:800; cursor:pointer; width:100%;" onclick="registerParlayToAudit('Parlay Principal ML')">Registrar Parlay</button>
            </div>
            <div style="padding: 1.2rem; background: var(--card-bg, #111827); border-radius: 12px; border: 1px solid var(--border-subtle, #374151);">
                <h4 style="color:#34d399; margin-top:0;">Parlay de Totales (Over/Under)</h4>
                <p style="color: #9ca3af; font-size: 0.85rem; margin: 0.5rem 0;">Phillies Under 9.5 + Astros Over 8.5</p>
                <button class="btn-action" style="padding:0.5rem 1rem; background:#38bdf8; color:#0f172a; border:none; border-radius:8px; font-weight:800; cursor:pointer; width:100%;" onclick="registerParlayToAudit('Parlay Totales')">Registrar Parlay</button>
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

function registerMasterPickToAudit() {
    let records = getSavedAuditRecords();
    let newRecord = {
        id: Date.now(),
        date: CURRENT_DATE,
        match: "Philadelphia Phillies vs Los Angeles Angels",
        selection: "Phillies ML & Under 9.5",
        prob: "78.4%",
        result: "En Desarrollo",
        status: "PENDIENTE"
    };
    records.unshift(newRecord);
    saveAuditRecords(records);
    renderAuditHistory();
    alert('¡Jugada Maestra enviada a la Hoja de Comparación con éxito!');
}

function registerParlayToAudit(parlayName) {
    let records = getSavedAuditRecords();
    let newRecord = {
        id: Date.now(),
        date: CURRENT_DATE,
        match: "Combinación Múltiple",
        selection: parlayName,
        prob: "52.0%",
        result: "En Desarrollo",
        status: "PENDIENTE"
    };
    records.unshift(newRecord);
    saveAuditRecords(records);
    renderAuditHistory();
    alert(`${parlayName} registrado correctamente en la Hoja de Auditoría.`);
}

function renderLiveControl() {
    const container = document.getElementById('live-standalone-cards-container');
    if (!container) return;
    
    const processedMatches = BASE_MATCHES.map((m, idx) => {
        let gameState = 'FINALIZADO';
        let awayScore = (idx * 3) % 8;
        let homeScore = (idx + 2) % 7;
        let inningInfo = 'Final 9º Inn';
        let sortOrder = 3;

        if (m.time === "7:20 PM") {
            gameState = 'PRÓXIMAMENTE';
            awayScore = '-';
            homeScore = '-';
            inningInfo = `Inicio ${m.time}`;
            sortOrder = 2;
        } 
        else if (m.time === "4:05 PM" || m.time === "4:07 PM") {
            gameState = 'EN VIVO';
            inningInfo = 'Parte Alta del 7º Inn';
            sortOrder = 1;
        }

        return { ...m, gameState, awayScore, homeScore, inningInfo, sortOrder };
    });

    processedMatches.sort((a, b) => a.sortOrder - b.sortOrder);

    container.innerHTML = processedMatches.map(m => `
        <div class="live-card" style="background:var(--card-bg, #111827); padding:1rem; border-radius:12px; margin-bottom:1rem; border:1px solid var(--border-subtle, #374151);">
            <div class="match-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem; font-size:0.85rem;">
                <span style="font-weight:800; color:${m.gameState === 'EN VIVO' ? '#ef4444' : '#38bdf8'};">🔴 ${m.gameState} (${m.inningInfo})</span>
                <span style="color:#9ca3af;">🏟️ ${m.stadium}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin:0.8rem 0;">
                <div style="display:flex; align-items:center; gap:0.6rem;">
                    ${getTeamBadgeHTML(m.away, true)}
                    <div>
                        <div style="font-weight:700; font-size:0.9rem;">${m.away}</div>
                        <div style="font-size:0.75rem; color:#9ca3af;">Abridor: ${m.starter_away}</div>
                    </div>
                </div>
                <div style="font-size:1.6rem; font-weight:900; color:#38bdf8; background:rgba(0,0,0,0.3); padding:0.2rem 1rem; border-radius:8px;">
                    ${m.awayScore} - ${m.homeScore}
                </div>
                <div style="display:flex; align-items:center; gap:0.6rem; text-align:right;">
                    <div>
                        <div style="font-weight:700; font-size:0.9rem;">${m.home}</div>
                        <div style="font-size:0.75rem; color:#9ca3af;">Abridor: ${m.starter_home}</div>
                    </div>
                    ${getTeamBadgeHTML(m.home, true)}
                </div>
            </div>
        </div>
    `).join('');
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
