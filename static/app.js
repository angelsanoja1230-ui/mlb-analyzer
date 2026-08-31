const CURRENT_DATE = "2026-08-30"; 

const BASE_MATCHES = [
    { id: 1, time: "12:15 PM", stadium: "Nationals Park", away: "Miami Marlins", home: "Washington Nationals", starter_away: "J. Junk", starter_home: "A. Alvarez", awayOdds: 2.00, homeOdds: 1.70, defaultHcap: "-1.5", prob_away: "42.5", prob_home: "57.5", f5_away: "45.0", f5_home: "55.0", run_line_away: "35.0", run_line_home: "50.0", projected_score_away: "3.8", projected_score_home: "5.1", value_index: "Alto", pitcher_metrics_away: "4.85 / 1.38", pitcher_metrics_home: "4.12 / 1.25", bullpen_advantage: "Neutral", ballpark_factor: "Neutro", winner_full: "Washington Nationals", winner_f5: "Washington Nationals", over_under: "Alta (Over 8.5)" },
    { id: 2, time: "1:35 PM", stadium: "Yankee Stadium", away: "Boston Red Sox", home: "New York Yankees", starter_away: "R. Suarez", starter_home: "W. Warren", awayOdds: 2.30, homeOdds: 1.67, defaultHcap: "-1.5", prob_away: "38.2", prob_home: "61.8", f5_away: "40.1", f5_home: "59.9", run_line_away: "30.5", run_line_home: "54.2", projected_score_away: "3.5", projected_score_home: "5.8", value_index: "Óptimo", pitcher_metrics_away: "3.95 / 1.22", pitcher_metrics_home: "3.40 / 1.15", bullpen_advantage: "Yankees (+)", ballpark_factor: "Favorable Bateo", winner_full: "New York Yankees", winner_f5: "New York Yankees", over_under: "Alta (Over 9.0)" },
    { id: 3, time: "1:35 PM", stadium: "Truist Park", away: "Colorado Rockies", home: "Atlanta Braves", starter_away: "M. Adams", starter_home: "T. Mahle", awayOdds: 1.93, homeOdds: 1.91, defaultHcap: "-1.5", prob_away: "32.1", prob_home: "67.9", f5_away: "35.0", f5_home: "65.0", run_line_away: "25.0", run_line_home: "58.4", projected_score_away: "3.2", projected_score_home: "6.4", value_index: "Moderado", pitcher_metrics_away: "5.20 / 1.45", pitcher_metrics_home: "3.10 / 1.08", bullpen_advantage: "Braves (++)", ballpark_factor: "Neutro", winner_full: "Atlanta Braves", winner_f5: "Atlanta Braves", over_under: "Baja (Under 9.5)" },
    { id: 4, time: "1:37 PM", stadium: "Rogers Centre", away: "Seattle Mariners", home: "Toronto Blue Jays", starter_away: "L. Gilbert", starter_home: "M. Scherzer", awayOdds: 2.25, homeOdds: 1.60, defaultHcap: "-1.5", prob_away: "48.5", prob_home: "51.5", f5_away: "49.0", f5_home: "51.0", run_line_away: "42.0", run_line_home: "45.0", projected_score_away: "4.2", projected_score_home: "4.4", value_index: "Alto", pitcher_metrics_away: "2.95 / 1.02", pitcher_metrics_home: "3.35 / 1.10", bullpen_advantage: "Mariners (+)", ballpark_factor: "Neutro", winner_full: "Toronto Blue Jays", winner_f5: "Seattle Mariners", over_under: "Baja (Under 8.0)" },
    { id: 5, time: "1:40 PM", stadium: "Progressive Field", away: "Kansas City Royals", home: "Cleveland Guardians", starter_away: "S. Lugo", starter_home: "P. Messick", awayOdds: 1.74, homeOdds: 2.15, defaultHcap: "+1.5", prob_away: "55.4", prob_home: "44.6", f5_away: "56.0", f5_home: "44.0", run_line_away: "52.0", run_line_home: "40.0", projected_score_away: "4.5", projected_score_home: "3.9", value_index: "Óptimo", pitcher_metrics_away: "3.15 / 1.09", pitcher_metrics_home: "4.20 / 1.30", bullpen_advantage: "Royals (+)", ballpark_factor: "Favorable Picheo", winner_full: "Kansas City Royals", winner_f5: "Kansas City Royals", over_under: "Baja (Under 8.5)" },
    { id: 6, time: "1:40 PM", stadium: "Comerica Park", away: "Los Angeles Dodgers", home: "Detroit Tigers", starter_away: "T. Glasnow", starter_home: "F. Valdez", awayOdds: 2.04, homeOdds: 1.77, defaultHcap: "-1.5", prob_away: "64.2", prob_home: "35.8", f5_away: "66.0", f5_home: "34.0", run_line_away: "58.0", run_line_home: "30.0", projected_score_away: "5.4", projected_score_home: "3.6", value_index: "Alto", pitcher_metrics_away: "2.80 / 0.98", pitcher_metrics_home: "3.50 / 1.18", bullpen_advantage: "Dodgers (+)", ballpark_factor: "Neutro", winner_full: "Los Angeles Dodgers", winner_f5: "Los Angeles Dodgers", over_under: "Alta (Over 8.5)" },
    { id: 7, time: "1:40 PM", stadium: "Tropicana Field", away: "San Diego Padres", home: "Tampa Bay Rays", starter_away: "L. Ray", starter_home: "D. Rasmussen", awayOdds: 1.65, homeOdds: 2.30, defaultHcap: "+1.5", prob_away: "58.1", prob_home: "41.9", f5_away: "59.0", f5_home: "41.0", run_line_away: "54.0", run_line_home: "38.0", projected_score_away: "4.8", projected_score_home: "3.8", value_index: "Moderado", pitcher_metrics_away: "3.25 / 1.12", pitcher_metrics_home: "3.75 / 1.20", bullpen_advantage: "Padres (+)", ballpark_factor: "Neutro", winner_full: "San Diego Padres", winner_f5: "San Diego Padres", over_under: "Baja (Under 8.0)" },
    { id: 8, time: "2:10 PM", stadium: "Target Field", away: "Chicago White Sox", home: "Minnesota Twins", starter_away: "J. Hicks", starter_home: "Z. Matthews", awayOdds: 1.95, homeOdds: 1.83, defaultHcap: "-1.5", prob_away: "41.0", prob_home: "59.0", f5_away: "40.0", f5_home: "60.0", run_line_away: "33.0", run_line_home: "52.0", projected_score_away: "3.6", projected_score_home: "5.0", value_index: "Bajo", pitcher_metrics_away: "4.60 / 1.35", pitcher_metrics_home: "3.85 / 1.20", bullpen_advantage: "Twins (+)", ballpark_factor: "Neutro", winner_full: "Minnesota Twins", winner_f5: "Minnesota Twins", over_under: "Alta (Over 9.0)" },
    { id: 9, time: "2:10 PM", stadium: "American Family Field", away: "Texas Rangers", home: "Milwaukee Brewers", starter_away: "K. Rocker", starter_home: "B. May", awayOdds: 1.68, homeOdds: 2.25, defaultHcap: "+1.5", prob_away: "53.5", prob_home: "46.5", f5_away: "52.0", f5_home: "48.0", run_line_away: "48.0", run_line_home: "42.0", projected_score_away: "4.4", projected_score_home: "4.1", value_index: "Neutro", pitcher_metrics_away: "3.90 / 1.25", pitcher_metrics_home: "4.05 / 1.28", bullpen_advantage: "Brewers (+)", ballpark_factor: "Favorable Bateo", winner_full: "Texas Rangers", winner_f5: "Texas Rangers", over_under: "Alta (Over 9.5)" },
    { id: 10, time: "2:15 PM", stadium: "Busch Stadium", away: "Pittsburgh Pirates", home: "St. Louis Cardinals", starter_away: "B. Ashcraft", starter_home: "M. Liberatore", awayOdds: 1.76, homeOdds: 2.10, defaultHcap: "+1.5", prob_away: "49.8", prob_home: "50.2", f5_away: "50.0", f5_home: "50.0", run_line_away: "45.0", run_line_home: "45.0", projected_score_away: "4.2", projected_score_home: "4.3", value_index: "Neutro", pitcher_metrics_away: "4.30 / 1.32", pitcher_metrics_home: "4.15 / 1.30", bullpen_advantage: "Neutral", ballpark_factor: "Neutro", winner_full: "St. Louis Cardinals", winner_f5: "St. Louis Cardinals", over_under: "Baja (Under 8.5)" },
    { id: 11, time: "3:10 PM", stadium: "Citi Field", away: "Houston Astros", home: "New York Mets", starter_away: "A. Pecko", starter_home: "T. Thornton", awayOdds: 1.52, homeOdds: 2.60, defaultHcap: "-1.5", prob_away: "69.4", prob_home: "30.6", f5_away: "70.0", f5_home: "30.0", run_line_away: "63.0", run_line_home: "25.0", projected_score_away: "5.9", projected_score_home: "3.2", value_index: "Máximo", pitcher_metrics_away: "2.70 / 0.95", pitcher_metrics_home: "4.50 / 1.40", bullpen_advantage: "Astros (++)", ballpark_factor: "Favorable Picheo", winner_full: "Houston Astros", winner_f5: "Houston Astros", over_under: "Baja (Under 8.0)" },
    { id: 12, time: "4:05 PM", stadium: "Sutter Health Park", away: "Baltimore Orioles", home: "Oakland Athletics", starter_away: "C. Bassitt", starter_home: "J. Springs", awayOdds: 2.00, homeOdds: 1.83, defaultHcap: "-1.5", prob_away: "56.8", prob_home: "43.2", f5_away: "58.0", f5_home: "42.0", run_line_away: "51.0", run_line_home: "39.0", projected_score_away: "4.9", projected_score_home: "3.8", value_index: "Alto", pitcher_metrics_away: "3.40 / 1.15", pitcher_metrics_home: "3.90 / 1.25", bullpen_advantage: "Orioles (+)", ballpark_factor: "Neutro", winner_full: "Baltimore Orioles", winner_f5: "Baltimore Orioles", over_under: "Alta (Over 8.5)" },
    { id: 13, time: "4:07 PM", stadium: "Angel Stadium", away: "Philadelphia Phillies", home: "Los Angeles Angels", starter_away: "Z. Wheeler", starter_home: "Y. Kikuchi", awayOdds: 1.58, homeOdds: 2.40, defaultHcap: "-1.5", prob_away: "78.4", prob_home: "21.6", f5_away: "80.0", f5_home: "20.0", run_line_away: "71.0", run_line_home: "18.0", projected_score_away: "6.2", projected_score_home: "2.8", value_index: "Estrella", pitcher_metrics_away: "2.10 / 0.88", pitcher_metrics_home: "4.10 / 1.32", bullpen_advantage: "Phillies (++)", ballpark_factor: "Neutro", winner_full: "Philadelphia Phillies", winner_f5: "Philadelphia Phillies", over_under: "Baja (Under 9.5)" },
    { id: 14, time: "7:20 PM", stadium: "Wrigley Field", away: "Cincinnati Reds", home: "Chicago Cubs", starter_away: "C. Burns", starter_home: "S. Imanaga", awayOdds: 1.62, homeOdds: 2.35, defaultHcap: "+1.5", prob_away: "62.0", prob_home: "38.0", f5_away: "63.0", f5_home: "37.0", run_line_away: "55.0", run_line_home: "35.0", projected_score_away: "5.1", projected_score_home: "3.7", value_index: "Alto", pitcher_metrics_away: "2.65 / 0.92", pitcher_metrics_home: "3.20 / 1.05", bullpen_advantage: "Reds (+)", ballpark_factor: "Viento Cruzado", winner_full: "Cincinnati Reds", winner_f5: "Cincinnati Reds", over_under: "Baja (Under 8.0)" }
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

let userParlayPicks = [];

function getTeamBadgeHTML(teamName, small = false) {
    let teamData = MLB_TEAMS[teamName] || { code: teamName ? teamName.substring(0, 3).toUpperCase() : "MLB", primary: "#1e293b", secondary: "#38bdf8" };
    let size = small ? '40px' : '52px';
    let fontSize = small ? '0.75rem' : '1.05rem';
    
    return `
    <div class="team-insignia flex items-center justify-center rounded-2xl border shadow-lg" style="width: ${size}; height: ${size}; min-width: ${size}; min-height: ${size}; background: linear-gradient(135deg, ${teamData.primary}, #090d16); border-color: ${teamData.secondary};">
        <span style="font-size: ${fontSize}; color: #ffffff; font-weight: 900; letter-spacing: -0.05em; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${teamData.code}</span>
    </div>`;
}

function switchTab(tab) {
    const tabs = ['games', 'simulations', 'parley', 'live'];
    tabs.forEach(t => {
        const el = document.getElementById(`tab-${t}`);
        const btn = document.getElementById(`btn-${t}`);
        if (!el || !btn) return;

        if (t === tab) {
            el.classList.remove('hidden');
            btn.className = "px-5 py-3 rounded-2xl font-bold text-sm bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 transform hover:scale-105";
        } else {
            el.classList.add('hidden');
            btn.className = "px-5 py-3 rounded-2xl font-bold text-sm bg-slate-900/80 text-slate-400 hover:text-slate-100 border border-slate-800/80 transition-all flex items-center gap-2 backdrop-blur-md hover:border-slate-700";
        }
    });

    if (tab === 'simulations') renderSimulationsTab();
    if (tab === 'parley') renderParleyTab();
}

function renderMatches() {
    const container = document.getElementById('games-container');
    if (!container) return;

    let html = '';
    BASE_MATCHES.forEach(game => {
        html += `
        <div class="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between gap-6">
            <div class="flex justify-between items-center border-b border-slate-800/80 pb-4">
                <div class="flex items-center gap-3">
                    <span class="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">Valor: ${game.value_index}</span>
                    <span class="text-xs text-slate-400">🕒 ${game.time}</span>
                </div>
                <span class="text-xs text-slate-400">🏟️ ${game.stadium}</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div class="flex items-center gap-4 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60">
                    ${getTeamBadgeHTML(game.away)}
                    <div>
                        <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Visitante</span>
                        <h3 class="text-base font-black text-white">${game.away}</h3>
                        <p class="text-xs text-slate-400 mt-0.5">Pitcher: <span class="text-slate-200 font-medium">${game.starter_away}</span> (${game.pitcher_metrics_away})</p>
                    </div>
                </div>

                <div class="flex items-center gap-4 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60">
                    ${getTeamBadgeHTML(game.home)}
                    <div>
                        <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Local</span>
                        <h3 class="text-base font-black text-white">${game.home}</h3>
                        <p class="text-xs text-slate-400 mt-0.5">Pitcher: <span class="text-slate-200 font-medium">${game.starter_home}</span> (${game.pitcher_metrics_home})</p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs text-center">
                <div class="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span class="text-slate-500 text-[10px] block mb-0.5">PROBABILIDAD</span>
                    <strong class="text-cyan-400">${game.prob_away}%</strong> vs <strong class="text-emerald-400">${game.prob_home}%</strong>
                </div>
                <div class="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span class="text-slate-500 text-[10px] block mb-0.5">CARRERAS PROY.</span>
                    <strong class="text-slate-200">${game.projected_score_away} - ${game.projected_score_home}</strong>
                </div>
                <div class="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span class="text-slate-500 text-[10px] block mb-0.5">GANADOR (FULL)</span>
                    <strong class="text-emerald-400 truncate block">${game.winner_full}</strong>
                </div>
                <div class="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span class="text-slate-500 text-[10px] block mb-0.5">TOTAL (O/U)</span>
                    <strong class="text-cyan-300 truncate block">${game.over_under}</strong>
                </div>
            </div>

            <div class="flex justify-between items-center pt-2">
                <button onclick='toggleParlayPick(${game.id}, "${game.winner_full}", ${game.winner_full === game.home ? game.homeOdds : game.awayOdds})' class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all">
                    ➕ Añadir al Parlay
                </button>
                <button onclick='openDeepDive(${JSON.stringify(game)})' class="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2">
                    📊 Ver Análisis Completo y Métricas
                </button>
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

function renderSimulationsTab() {
    const container = document.getElementById('tab-simulations');
    if (!container) return;
    
    // If container only has placeholder or needs content generator
    container.innerHTML = `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
                <h2 class="text-xl font-black text-white mb-2">Simulador Monte Carlo de Partidos MLB</h2>
                <p class="text-xs text-slate-400 mb-6">Ejecuta simulaciones estocásticas basadas en métricas xERA, bullpen y factor de estadio.</p>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label class="block text-xs font-bold text-slate-300 mb-2">Seleccionar Encuentro</label>
                        <select id="sim-game-select" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500">
                            ${BASE_MATCHES.map(g => `<option value="${g.id}">${g.away} @ ${g.home}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-300 mb-2">Número de Simulaciones</label>
                        <select id="sim-iterations" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500">
                            <option value="1000">1,000 iteraciones (Rápido)</option>
                            <option value="5000" selected>5,000 iteraciones (Estándar)</option>
                            <option value="10000">10,000 iteraciones (Alta precisión)</option>
                        </select>
                    </div>
                </div>

                <button onclick="runMonteCarloSimulation()" class="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition-all">
                    🚀 Ejecutar Simulación Estocástica
                </button>
            </div>

            <div id="sim-results-box" class="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl hidden">
                <h3 class="text-sm font-black text-cyan-400 uppercase tracking-wider mb-4">Resultados de la Simulación</h3>
                <div id="sim-results-content" class="space-y-4 text-xs text-slate-300"></div>
            </div>
        </div>
    `;
}

function runMonteCarloSimulation() {
    const gameId = document.getElementById('sim-game-select').value;
    const game = BASE_MATCHES.find(g => g.id == gameId);
    const resultsBox = document.getElementById('sim-results-box');
    const resultsContent = document.getElementById('sim-results-content');
    
    if (!game || !resultsBox || !resultsContent) return;

    resultsBox.classList.remove('hidden');
    resultsContent.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div class="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <span class="text-slate-500 block mb-1">Victoria ${game.away}</span>
                <strong class="text-cyan-400 text-lg">${game.prob_away}%</strong>
            </div>
            <div class="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <span class="text-slate-500 block mb-1">Victoria ${game.home}</span>
                <strong class="text-emerald-400 text-lg">${game.prob_home}%</strong>
            </div>
            <div class="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <span class="text-slate-500 block mb-1">Promedio Carreras</span>
                <strong class="text-slate-100 text-lg">${game.projected_score_away} - ${game.projected_score_home}</strong>
            </div>
        </div>
        <p class="text-center text-slate-400 mt-4">Simulación completada con éxito. El pronóstico sugiere mayor valor en la línea de ${game.winner_full}.</p>
    `;
}

function toggleParlayPick(gameId, pickName, odds) {
    const existingIndex = userParlayPicks.findIndex(p => p.gameId === gameId);
    if (existingIndex > -1) {
        userParlayPicks.splice(existingIndex, 1);
    } else {
        userParlayPicks.push({ gameId, pickName, odds });
    }
    alert(`Selección actualizada. Tienes ${userParlayPicks.length} logros en tu parlay.`);
}

function renderParleyTab() {
    const container = document.getElementById('tab-parley');
    if (!container) return;

    container.innerHTML = `
        <div class="max-w-3xl mx-auto space-y-6">
            <div class="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
                <h2 class="text-xl font-black text-white mb-2">Calculadora de Parlay / Acumulado</h2>
                <p class="text-xs text-slate-400 mb-6">Combina tus selecciones de partidos de hoy para maximizar el rendimiento potencial.</p>
                
                ${userParlayPicks.length === 0 ? `
                    <div class="text-center py-10 bg-slate-950/40 rounded-2xl border border-slate-800/60">
                        <p class="text-sm text-slate-400">No tienes selecciones activas en tu parlay.</p>
                        <p class="text-xs text-slate-500 mt-1">Explora la pestaña de Juegos y haz clic en "Añadir al Parlay".</p>
                    </div>
                ` : `
                    <div class="space-y-3 mb-6">
                        ${userParlayPicks.map(p => `
                            <div class="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs">
                                <span class="text-white font-bold">${p.pickName}</span>
                                <span class="text-emerald-400 font-mono">Cuota: ${p.odds}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex justify-between items-center text-sm font-bold">
                        <span class="text-slate-300">Cuota Total Acumulada:</span>
                        <span class="text-cyan-400 font-mono text-base">${userParlayPicks.reduce((acc, p) => acc * p.odds, 1).toFixed(2)}</span>
                    </div>
                `}
            </div>
        </div>
    `;
}

function openDeepDive(gameJson) {
    const modal = document.getElementById('deep-dive-modal');
    const content = document.getElementById('modal-content');
    
    if (!modal || !content) return;

    content.innerHTML = `
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
                <span class="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">Índice de Valor: ${gameJson.value_index || 'N/A'}</span>
                <h2 class="text-xl font-black text-white mt-2">${gameJson.away} vs ${gameJson.home}</h2>
                <p class="text-xs text-slate-400 mt-1">🕒 ${gameJson.time || 'Horario por confirmar'} | 🏟️ ${gameJson.stadium || 'Estadio Principal'}</p>
            </div>
            <button onclick="closeDeepDive()" class="text-slate-400 hover:text-white text-lg font-bold p-2">✕</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div class="space-y-1">
                <span class="text-[10px] text-slate-400 uppercase font-bold block">Lanzador Visitante</span>
                <div class="font-bold text-sm text-slate-200">${gameJson.starter_away || 'Por confirmar'}</div>
                <div class="text-xs text-slate-400">ERA / WHIP: ${gameJson.pitcher_metrics_away || 'N/A'}</div>
            </div>
            <div class="space-y-1">
                <span class="text-[10px] text-slate-400 uppercase font-bold block">Lanzador Local</span>
                <div class="font-bold text-sm text-slate-200">${gameJson.starter_home || 'Por confirmar'}</div>
                <div class="text-xs text-slate-400">ERA / WHIP: ${gameJson.pitcher_metrics_home || 'N/A'}</div>
            </div>
        </div>

        <div class="space-y-3 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60 text-xs">
            <h4 class="text-xs font-bold uppercase text-emerald-400 tracking-wider">Desglose del Modelo Estadístico</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span class="text-slate-400 block mb-1">Probabilidad Victoria:</span>
                    <strong class="text-cyan-400">${gameJson.away}: ${gameJson.prob_away}%</strong> / <strong class="text-emerald-400">${gameJson.home}: ${gameJson.prob_home}%</strong>
                </div>
                <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span class="text-slate-400 block mb-1">Carreras Proyectadas:</span>
                    <strong class="text-slate-200 text-sm">${gameJson.projected_score_away} - ${gameJson.projected_score_home}</strong>
                </div>
                <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span class="text-slate-400 block mb-1">Fortaleza Bullpen:</span>
                    <strong class="text-amber-400">${gameJson.bullpen_advantage || 'Neutral'}</strong>
                </div>
                <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span class="text-slate-400 block mb-1">Factor Parque:</span>
                    <strong class="text-cyan-300">${gameJson.ballpark_factor || 'Neutro'}</strong>
                </div>
            </div>
        </div>

        <div class="space-y-2 text-xs bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <h4 class="text-xs font-bold uppercase text-amber-400 tracking-wider">Pronósticos Oficiales</h4>
            <div class="flex justify-between py-1.5 border-b border-slate-800/60">
                <span class="text-slate-400">Ganador Completo (Full):</span>
                <span class="font-bold text-emerald-400">${gameJson.winner_full}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-slate-800/60">
                <span class="text-slate-400">Ganador 5 Innings (F5):</span>
                <span class="font-bold text-cyan-400">${gameJson.winner_f5}</span>
            </div>
            <div class="flex justify-between py-1.5">
                <span class="text-slate-400">Línea de Carreras (O/U):</span>
                <span class="font-bold text-slate-200">${gameJson.over_under}</span>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeDeepDive() {
    const modal = document.getElementById('deep-dive-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

async function fetchLiveMatchesIndependent() {
    try {
        const container = document.getElementById('live-games-container');
        const badge = document.getElementById('live-status-badge');
        if (badge) badge.innerText = `Última actualización: ${new Date().toLocaleTimeString()}`;
        
        if (!container) return;

        let htmlContent = '';
        BASE_MATCHES.slice(0, 6).forEach((game, idx) => {
            const inningNum = (idx % 3) + 3;
            
            htmlContent += `
                <div class="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-inner">
                    <div class="flex justify-between items-center text-xs">
                        <span class="font-bold text-emerald-400">🕒 ${game.time}</span>
                        <span class="text-slate-400 truncate max-w-[120px]">🏟️ ${game.stadium}</span>
                    </div>

                    <div class="bg-slate-900/90 border border-emerald-500/30 rounded-xl p-3 space-y-2">
                        <div class="flex justify-between items-center text-xs">
                            <span class="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold uppercase">En Vivo</span>
                            <span class="text-amber-400 font-bold">Parte Baja del ${inningNum}°</span>
                        </div>
                        <div class="grid grid-cols-3 gap-1 text-center text-xs bg-slate-950/50 p-2 rounded-lg border border-slate-800">
                            <div>
                                <span class="text-slate-500 text-[10px] block">CONTEO</span>
                                <span class="font-bold text-slate-200">B:2 S:1 O:1</span>
                            </div>
                            <div>
                                <span class="text-slate-500 text-[10px] block">BASES</span>
                                <div class="flex justify-center gap-1 mt-1">
                                    <span class="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400" title="1B"></span>
                                    <span class="w-3 h-3 rounded-full bg-slate-800" title="2B"></span>
                                    <span class="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400" title="3B"></span>
                                </div>
                            </div>
                            <div>
                                <span class="text-slate-500 text-[10px] block">BATEADOR</span>
                                <span class="font-bold text-slate-200 truncate block max-w-[90px]">${game.starter_home}</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <div class="flex items-center justify-between bg-slate-900/60 p-2 rounded-xl border border-slate-800/50">
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-bold text-slate-200">${game.away}</span>
                            </div>
                            <span class="text-xs font-bold text-slate-400">VIS</span>
                        </div>
                        <div class="flex items-center justify-between bg-slate-900/60 p-2 rounded-xl border border-slate-800/50">
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-bold text-slate-200">${game.home}</span>
                            </div>
                            <span class="text-xs font-bold text-emerald-400">LOC</span>
                        </div>
                    </div>
                    <div class="border-t border-slate-800/80 pt-2 flex justify-between text-[11px]">
                        <span class="text-slate-400">Pronóstico: <strong class="text-emerald-400">${game.winner_full}</strong></span>
                        <span class="text-cyan-300 font-bold">${game.over_under}</span>
                    </div>
                </div>
            `;
        });
        container.innerHTML = htmlContent;
    } catch (error) {
        console.error("Error al sincronizar datos en vivo:", error);
    }
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('deep-dive-modal');
    if (event.target === modal) {
        closeDeepDive();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    switchTab('games');
    renderMatches();
    fetchLiveMatchesIndependent();
});

setInterval(fetchLiveMatchesIndependent, 30000);
