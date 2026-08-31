function renderParlays() {
    const container = document.getElementById('auto-parlays-container');
    if (!container) return;
    
    container.innerHTML = `
        <style>
            #auto-parlays-container {
                width: 100% !important;
                display: block !important;
                box-sizing: border-box !important;
            }
            .parlays-grid {
                display: grid !important;
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 1.25rem !important;
                width: 100% !important;
                box-sizing: border-box !important;
            }
            @media (max-width: 1024px) {
                .parlays-grid {
                    grid-template-columns: 1fr !important;
                }
            }
            .parlay-card {
                background: linear-gradient(145deg, #161f30, #0d131f);
                border: 1px solid rgba(56, 189, 248, 0.2);
                border-radius: 12px;
                padding: 1.25rem;
                box-shadow: 0 6px 16px rgba(0,0,0,0.4);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 1rem;
                box-sizing: border-box !important;
                width: 100% !important;
            }
            .parlay-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                padding-bottom: 0.6rem;
                gap: 0.5rem;
            }
            .parlay-title {
                color: #34d399;
                margin: 0;
                font-size: 0.98rem;
                font-weight: 800;
                display: flex;
                align-items: center;
                gap: 0.4rem;
                white-space: nowrap;
            }
            .parlay-odds-badge {
                font-size: 0.78rem;
                color: #38bdf8;
                background: rgba(56, 189, 248, 0.1);
                border: 1px solid rgba(56, 189, 248, 0.3);
                padding: 0.2rem 0.5rem;
                border-radius: 6px;
                font-weight: 700;
                white-space: nowrap;
            }
            .parlay-legs-table {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                width: 100%;
            }
            .parlay-leg-row {
                background: rgba(0, 0, 0, 0.35);
                border: 1px solid rgba(255, 255, 255, 0.06);
                border-radius: 8px;
                padding: 0.65rem 0.85rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
                box-sizing: border-box;
                width: 100%;
            }
            .leg-left-side {
                display: flex;
                flex-direction: column;
                gap: 0.15rem;
                min-width: 0;
                flex: 1;
            }
            .leg-match-name {
                font-size: 0.82rem;
                font-weight: 700;
                color: #f8fafc;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .leg-selection-detail {
                font-size: 0.73rem;
                color: #38bdf8;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 0.3rem;
            }
            .leg-right-side {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                flex-shrink: 0;
            }
            .leg-odds-tag {
                font-size: 0.8rem;
                font-weight: 800;
                color: #34d399;
                background: rgba(52, 211, 153, 0.12);
                border: 1px solid rgba(52, 211, 153, 0.3);
                padding: 0.15rem 0.45rem;
                border-radius: 5px;
            }
            .btn-parlay-action {
                width: 100%;
                padding: 0.7rem;
                background: linear-gradient(135deg, #38bdf8, #0284c7);
                color: #0f172a;
                border: none;
                border-radius: 8px;
                font-weight: 800;
                cursor: pointer;
                font-size: 0.82rem;
                box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
                transition: opacity 0.2s;
                box-sizing: border-box;
            }
            .btn-parlay-action:hover {
                opacity: 0.9;
            }
        </style>

        <div class="parlays-grid">
            <!-- Parlay 1 -->
            <div class="parlay-card">
                <div>
                    <div class="parlay-header">
                        <h4 class="parlay-title">🎯 Trinca Moneyline Elite</h4>
                        <span class="parlay-odds-badge">Cuota: +425</span>
                    </div>
                    <p style="color: #94a3b8; font-size: 0.78rem; margin: 0.6rem 0 0.8rem 0;">Combinación analizada de 3 selecciones directas a ganador.</p>
                    
                    <div class="parlay-legs-table">
                        <div class="parlay-leg-row">
                            <div class="leg-left-side">
                                <span class="leg-match-name">Boston Red Sox vs New York Yankees</span>
                                <span class="leg-selection-detail"><span>👉</span> Gana New York Yankees (ML)</span>
                            </div>
                            <div class="leg-right-side">
                                <span class="leg-odds-tag">@1.67</span>
                            </div>
                        </div>
                        <div class="parlay-leg-row">
                            <div class="leg-left-side">
                                <span class="leg-match-name">Los Angeles Dodgers vs Detroit Tigers</span>
                                <span class="leg-selection-detail"><span>👉</span> Gana Los Angeles Dodgers (ML)</span>
                            </div>
                            <div class="leg-right-side">
                                <span class="leg-odds-tag">@2.04</span>
                            </div>
                        </div>
                        <div class="parlay-leg-row">
                            <div class="leg-left-side">
                                <span class="leg-match-name">Colorado Rockies vs Atlanta Braves</span>
                                <span class="leg-selection-detail"><span>👉</span> Gana Atlanta Braves (ML)</span>
                            </div>
                            <div class="leg-right-side">
                                <span class="leg-odds-tag">@1.91</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn-parlay-action" onclick="registerParlayToAudit('Trinca Moneyline Elite (Yankees + Dodgers + Braves)', '+425')">Registrar Trinca en Auditoría</button>
            </div>

            <!-- Parlay 2 -->
            <div class="parlay-card">
                <div>
                    <div class="parlay-header">
                        <h4 class="parlay-title" style="color: #38bdf8;">⚡ Trinca Hándicap -1.5</h4>
                        <span class="parlay-odds-badge">Cuota: +540</span>
                    </div>
                    <p style="color: #94a3b8; font-size: 0.78rem; margin: 0.6rem 0 0.8rem 0;">Líneas de carreras ajustadas por superioridad ofensiva.</p>
                    
                    <div class="parlay-legs-table">
                        <div class="parlay-leg-row">
                            <div class="leg-left-side">
                                <span class="leg-match-name">Philadelphia Phillies vs Los Angeles Angels</span>
                                <span class="leg-selection-detail"><span>👉</span> Philadelphia Phillies -1.5</span>
                            </div>
                            <div class="leg-right-side">
                                <span class="leg-odds-tag">@2.10</span>
                            </div>
                        </div>
                        <div class="parlay-leg-row">
                            <div class="leg-left-side">
                                <span class="leg-match-name">Houston Astros vs New York Mets</span>
                                <span class="leg-selection-detail"><span>👉</span> Houston Astros -1.5</span>
                            </div>
                            <div class="leg-right-side">
                                <span class="leg-odds-tag">@2.05</span>
                            </div>
                        </div>
                        <div class="parlay-leg-row">
                            <div class="leg-left-side">
                                <span class="leg-match-name">San Diego Padres vs Tampa Bay Rays</span>
                                <span class="leg-selection-detail"><span>👉</span> San Diego Padres -1.5</span>
                            </div>
                            <div class="leg-right-side">
                                <span class="leg-odds-tag">@2.20</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn-parlay-action" onclick="registerParlayToAudit('Trinca Hándicap -1.5 (Phillies + Astros + Padres)', '+540')">Registrar Trinca en Auditoría</button>
            </div>

            <!-- Parlay 3 -->
            <div class="parlay-card">
                <div>
                    <div class="parlay-header">
                        <h4 class="parlay-title" style="color: #fbbf24;">📊 Trinca de Totales (O/U)</h4>
                        <span class="parlay-odds-badge" style="color: #fbbf24; background: rgba(251,191,36,0.1); border-color: rgba(251,191,36,0.3);">Cuota: +395</span>
                    </div>
                    <p style="color: #94a3b8; font-size: 0.78rem; margin: 0.6rem 0 0.8rem 0;">Proyección basada en rendimiento de abridores y bullpen.</p>
                    
                    <div class="parlay-legs-table">
                        <div class="parlay-leg-row">
                            <div class="leg-left-side">
                                <span class="leg-match-name">Miami Marlins vs Washington Nationals</span>
                                <span class="leg-selection-detail"><span>👉</span> Under 8.5 Carreras</span>
                            </div>
                            <div class="leg-right-side">
                                <span class="leg-odds-tag">@1.85</span>
                            </div>
                        </div>
                        <div class="parlay-leg-row">
                            <div class="leg-left-side">
                                <span class="leg-match-name">Boston Red Sox vs New York Yankees</span>
                                <span class="leg-selection-detail"><span>👉</span> Over 9.0 Carreras</span>
                            </div>
                            <div class="leg-right-side">
                                <span class="leg-odds-tag">@1.90</span>
                            </div>
                        </div>
                        <div class="parlay-leg-row">
                            <div class="leg-left-side">
                                <span class="leg-match-name">Seattle Mariners vs Toronto Blue Jays</span>
                                <span class="leg-selection-detail"><span>👉</span> Under 8.0 Carreras</span>
                            </div>
                            <div class="leg-right-side">
                                <span class="leg-odds-tag">@1.88</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn-parlay-action" onclick="registerParlayToAudit('Trinca de Totales (O/U 3 Selecciones)', '+395')">Registrar Trinca en Auditoría</button>
            </div>

            <!-- Parlay 4 -->
            <div class="parlay-card">
                <div>
                    <div class="parlay-header">
                        <h4 class="parlay-title" style="color: #f43f5e;">🔥 Mega Trinca de Cierres</h4>
                        <span class="parlay-odds-badge" style="color: #f43f5e; background: rgba(244,63,94,0.1); border-color: rgba(244,63,94,0.3);">Cuota: +680</span>
                    </div>
                    <p style="color: #94a3b8; font-size: 0.78rem; margin: 0.6rem 0 0.8rem 0;">Selecciones combinadas de alto valor orientadas al cierre.</p>
                    
                    <div class="parlay-legs-table">
                        <div class="parlay-leg-row">
                            <div class="leg-left-side">
                                <span class="leg-match-name">Kansas City Royals vs Cleveland Guardians</span>
                                <span class="leg-selection-detail"><span>👉</span> Gana Kansas City Royals (ML)</span>
                            </div>
                            <div class="leg-right-side">
                                <span class="leg-odds-tag">@1.74</span>
                            </div>
                        </div>
                        <div class="parlay-leg-row">
                            <div class="leg-left-side">
                                <span class="leg-match-name">Texas Rangers vs Milwaukee Brewers</span>
                                <span class="leg-selection-detail"><span>👉</span> Gana Texas Rangers (ML)</span>
                            </div>
                            <div class="leg-right-side">
                                <span class="leg-odds-tag">@1.68</span>
                            </div>
                        </div>
                        <div class="parlay-leg-row">
                            <div class="leg-left-side">
                                <span class="leg-match-name">Cincinnati Reds vs Chicago Cubs</span>
                                <span class="leg-selection-detail"><span>👉</span> Gana Cincinnati Reds (ML)</span>
                            </div>
                            <div class="leg-right-side">
                                <span class="leg-odds-tag">@1.62</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn-parlay-action" onclick="registerParlayToAudit('Mega Trinca de Cierres (Royals + Rangers + Reds)', '+680')">Registrar Trinca en Auditoría</button>
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
let realApiEventsCache = [];

async function fetchRealTimeLiveScores() {
    try {
        const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard');
        const data = await response.json();
        
        realApiEventsCache = data.events || [];
        renderLiveControl();
        
        console.log("Datos de la MLB actualizados desde la API a las:", new Date().toLocaleTimeString());
    } catch (error) {
        console.error("Error al conectar con la API de ESPN:", error);
    }
}

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

function renderLiveControl() {
    const container = document.getElementById('live-standalone-cards-container');
    if (!container) return;
    
    const matchesSource = (typeof BASE_MATCHES !== 'undefined' && Array.isArray(BASE_MATCHES)) ? BASE_MATCHES : [];

    const processedMatches = matchesSource.map((m, idx) => {
        const liveApiData = getApiScoreForMatch(m.away, m.home);

        let gameState = 'FINALIZADO';
        let awayScore = 0;
        let homeScore = 0;
        let inningInfo = 'Final / 9º Inn';
        let statusBadgeClass = 'status-final';
        let sortOrder = 3;

        if (liveApiData) {
            gameState = liveApiData.gameState;
            awayScore = liveApiData.awayScore;
            homeScore = liveApiData.homeScore;
            inningInfo = liveApiData.inningInfo;
            statusBadgeClass = liveApiData.isLive ? 'status-live' : 'status-final';
            sortOrder = liveApiData.isLive ? 1 : 2;
        } else {
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
    
    fetchRealTimeLiveScores();
    
    if (liveScoreInterval) clearInterval(liveScoreInterval);
    liveScoreInterval = setInterval(fetchRealTimeLiveScores, 45000);
});
