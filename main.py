from flask import Flask, render_template, request, redirect, url_for, jsonify, session
import requests
import re
from datetime import datetime, timedelta
import random
import os  # <--- Agrégalo aquí
app = Flask(__name__)
app.secret_key = "oraculo_mlb_clave_secreta_super_segura" # Requerido para las sesiones
ALL_MLB_TEAMS = [
    {"name": "Arizona Diamondbacks", "id": 109},
    {"name": "Atlanta Braves", "id": 144},
    {"name": "Baltimore Orioles", "id": 110},
    {"name": "Boston Red Sox", "id": 111},
    {"name": "Chicago Cubs", "id": 112},
    {"name": "Chicago White Sox", "id": 145},
    {"name": "Cincinnati Reds", "id": 113},
    {"name": "Cleveland Guardians", "id": 114},
    {"name": "Colorado Rockies", "id": 115},
    {"name": "Detroit Tigers", "id": 116},
    {"name": "Houston Astros", "id": 117},
    {"name": "Kansas City Royals", "id": 118},
    {"name": "Los Angeles Angels", "id": 108},
    {"name": "Los Angeles Dodgers", "id": 119},
    {"name": "Miami Marlins", "id": 146},
    {"name": "Milwaukee Brewers", "id": 158},
    {"name": "Minnesota Twins", "id": 142},
    {"name": "New York Mets", "id": 121},
    {"name": "New York Yankees", "id": 147},
    {"name": "Athletics", "id": 133},
    {"name": "Philadelphia Phillies", "id": 143},
    {"name": "Pittsburgh Pirates", "id": 134},
    {"name": "San Diego Padres", "id": 135},
    {"name": "San Francisco Giants", "id": 137},
    {"name": "Seattle Mariners", "id": 136},
    {"name": "St. Louis Cardinals", "id": 138},
    {"name": "Tampa Bay Rays", "id": 139},
    {"name": "Texas Rangers", "id": 140},
    {"name": "Toronto Blue Jays", "id": 141},
    {"name": "Washington Nationals", "id": 120}
]

def get_team_id_by_name(team_name):
    for t in ALL_MLB_TEAMS:
        if t["name"].lower() == team_name.lower():
            return t["id"]
    return 1

def advanced_simulate_game(game_data):
    home = game_data.get('home', 'Local')
    away = game_data.get('away', 'Visitante')
    starter_home = game_data.get('starter_home', 'Por anunciar')
    starter_away = game_data.get('starter_away', 'Por anunciar')
    stadium = game_data.get('stadium', 'Estadio MLB')
    game_id = game_data.get('id', 100)

    aces = ['G. Cole', 'L. Webb', 'Z. Gallen', 'Y. Yamamoto', 'Corbin Burnes', 'Spencer Strider', 'S. Bieber', 'Z. Wheeler', 'P. Corbin']
    
    home_is_ace = any(ace.lower() in starter_home.lower() for ace in aces)
    away_is_ace = any(ace.lower() in starter_away.lower() for ace in aces)

    f5_home_prob = 50
    if home_is_ace: f5_home_prob += 12
    if away_is_ace: f5_home_prob -= 12
    f5_home_prob += ((int(game_id) * 7) % 15) - 7 
    f5_home_prob = max(30, min(70, f5_home_prob))
    f5_away_prob = 100 - f5_home_prob
    winner_f5 = home if f5_home_prob >= 50 else away

    full_home_prob = f5_home_prob + 2  
    bullpen_variance = ((int(game_id) * 13) % 20) - 10  
    full_home_prob += bullpen_variance
    full_home_prob = max(32, min(68, full_home_prob))
    full_away_prob = 100 - full_home_prob
    winner_full = home if full_home_prob >= 50 else away

    stadium_lower = stadium.lower()
    if 'coors' in stadium_lower:
        over_under = "Alta (Over 10.5)"
    else:
        options = [
            "Alta (Over 8.5)", 
            "Baja (Under 8.5)", 
            "Alta (Over 9.0)", 
            "Baja (Under 8.0)",
            "Alta (Over 7.5)",
            "Baja (Under 9.5)"
        ]
        over_under = random.choice(options)

    margin = abs(full_home_prob - 50)
    if margin > 8:
        run_line = f"{winner_full} -1.5"
    else:
        run_line = f"{away if winner_full == home else home} +1.5 (Protegido)"

    # --- CÁLCULOS Y VALORES PARA EVITAR 'UNDEFINED' EN EL MODAL ---
    away_expected_runs = round(4.0 + (f5_away_prob - 50) * 0.05, 1)
    home_expected_runs = round(4.0 + (f5_home_prob - 50) * 0.05, 1)
    
    era_home = "2.95" if home_is_ace else "4.20"
    whip_home = "1.08" if home_is_ace else "1.32"
    era_away = "2.95" if away_is_ace else "4.20"
    whip_away = "1.08" if away_is_ace else "1.32"
    
    if bullpen_variance > 3:
        bullpen_strength = "Elite (+)"
    elif bullpen_variance < -3:
        bullpen_strength = "Vulnerable (-)"
    else:
        bullpen_strength = "Estándar (Promedio)"
        
    if 'coors' in stadium_lower:
        park_factor = "Extremo (Favor a ofensiva)"
    elif 'fenway' in stadium_lower or 'yankee' in stadium_lower:
        park_factor = "Favorable a bateadores"
    else:
        park_factor = "Neutral (1.00)"

    return {
        'prob_home': full_home_prob,
        'prob_away': full_away_prob,
        'f5_home': f5_home_prob,
        'f5_away': f5_away_prob,
        'winner_full': winner_full,
        'winner_f5': winner_f5,
        'over_under': over_under,
        'run_line': run_line,
        'value_index': f"{max(full_home_prob, full_away_prob)}% Confianza",
        # Llaves añadidas para completar el modal del frontend:
        'away_expected_runs': away_expected_runs,
        'home_expected_runs': home_expected_runs,
        'starter_era_away': era_away,
        'starter_whip_away': whip_away,
        'starter_era_home': era_home,
        'starter_whip_home': whip_home,
        'bullpen_strength': bullpen_strength,
        'park_factor': park_factor
    }

def generate_parley_system(games):
    all_bets = []
    for g in games:
        home = g.get('home', 'Local')
        away = g.get('away', 'Visitante')
        prob_home = g.get('prob_home', 50)
        prob_away = g.get('prob_away', 50)
        f5_home = g.get('f5_home', 50)
        f5_away = g.get('f5_away', 50)
        stadium = g.get('stadium', 'Estadio')
        run_line = g.get('run_line', 'Protegido')
        over_under = g.get('over_under', 'Alta (Over 8.5)')
        
        if prob_home >= 50:
            all_bets.append({'game': f"{away} vs {home}", 'pick': f"Ganador J.C.: {home}", 'confidence': prob_home, 'stadium': stadium})
        else:
            all_bets.append({'game': f"{away} vs {home}", 'pick': f"Ganador J.C.: {away}", 'confidence': prob_away, 'stadium': stadium})
            
        if f5_home >= 50:
            all_bets.append({'game': f"{away} vs {home}", 'pick': f"1ra Mitad (F5): {home}", 'confidence': f5_home, 'stadium': stadium})
        else:
            all_bets.append({'game': f"{away} vs {home}", 'pick': f"1ra Mitad (F5): {away}", 'confidence': f5_away, 'stadium': stadium})

        all_bets.append({'game': f"{away} vs {home}", 'pick': f"Run Line: {run_line}", 'confidence': round(random.uniform(60.0, 78.0), 1), 'stadium': stadium})

        ou_parts = over_under.split('(')
        ou_val = ou_parts[-1] if len(ou_parts) > 1 else "Over 8.5)"
        ou_variations = [
            f"Alta ({ou_val}",
            f"Baja ({ou_val}",
            "Alta (Over 8.5)",
            "Baja (Under 8.5)",
            "Alta (Over 9.5)"
        ]
        chosen_ou = random.choice(ou_variations)
        all_bets.append({'game': f"{away} vs {home}", 'pick': f"O/U: {chosen_ou}", 'confidence': round(random.uniform(62.0, 76.0), 1), 'stadium': stadium})

    sorted_bets_for_lock = sorted(all_bets, key=lambda x: x['confidence'], reverse=True)
    jugada_del_dia = sorted_bets_for_lock[0] if sorted_bets_for_lock else None
    
    parleys = {}
    legs_counts = [2, 3, 4, 5]
    
    for n in legs_counts:
        selected_legs = []
        used_games = set()
        
        for b in sorted_bets_for_lock:
            if b['game'] not in used_games and len(selected_legs) < n:
                selected_legs.append(b)
                used_games.add(b['game'])
                
        if len(selected_legs) < n:
            for b in sorted_bets_for_lock:
                if b not in selected_legs and len(selected_legs) < n:
                    selected_legs.append(b)
                    
        combined_conf = round(sum([l['confidence'] for l in selected_legs]) / len(selected_legs), 1) if selected_legs else 65.0
        
        parleys[f"{n} Logros"] = {
            'legs': selected_legs,
            'combined_confidence': combined_conf
        }
        
    return {
        'jugada_del_dia': jugada_del_dia,
        'parleys': parleys
    }

def fetch_mlb_today_games():
    now_local = datetime.utcnow() - timedelta(hours=4)
    target_date = (now_local - timedelta(days=1) if now_local.hour < 7 else now_local).strftime('%Y-%m-%d')
    
    def get_games_for_date(d_str):
        url = f"https://statsapi.mlb.com/api/v1/schedule?sportId=1&date={d_str}&hydrate=probablePitcher,linescore"
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "application/json"
        }
        local_games = []
        try:
            response = requests.get(url, headers=headers, timeout=4)
            if response.status_code == 200:
                data = response.json()
                for date_info in data.get('dates', []):
                    for idx, game in enumerate(date_info.get('games', []), start=1):
                        teams = game.get('teams', {}) or {}
                        away_team_obj = teams.get('away', {}).get('team', {}) or {}
                        home_team_obj = teams.get('home', {}).get('team', {}) or {}
                        
                        away_team = away_team_obj.get('name', 'Visitante')
                        home_team = home_team_obj.get('name', 'Local')
                        away_id = away_team_obj.get('id', 1)
                        home_id = home_team_obj.get('id', 1)
                        
                        starter_away = teams.get('away', {}).get('probablePitcher', {}).get('fullName', 'Por anunciar')
                        starter_home = teams.get('home', {}).get('probablePitcher', {}).get('fullName', 'Por anunciar')
                        
                        game_date_str = game.get('gameDate', '')
                        time_str = "Por definir"
                        if game_date_str:
                            try:
                                dt = datetime.fromisoformat(game_date_str.replace('Z', '+00:00'))
                                time_str = dt.strftime('%I:%M %p')
                            except:
                                pass
                                
                        stadium = game.get('venue', {}).get('name', 'Estadio MLB')
                        
                        status_obj = game.get('status', {}) or {}
                        abstract_state = status_obj.get('abstractGameState', 'Preview')
                        detailed_state = status_obj.get('detailedState', 'Programado')
                        
                        linescore = game.get('linescore', {}) or {}
                        current_inning = linescore.get('currentInning', 0)
                        inning_state = linescore.get('inningState', '') or ''
                        outs = linescore.get('outs', 0)
                        balls = linescore.get('balls', 0)
                        strikes = linescore.get('strikes', 0)
                        
                        ls_teams = linescore.get('teams', {}) or {}
                        away_runs = ls_teams.get('away', {}).get('runs', 0) if ls_teams else 0
                        home_runs = ls_teams.get('home', {}).get('runs', 0) if ls_teams else 0
                        
                        offense = linescore.get('offense', {}) or {}
                        has_1b = offense.get('first') is not None
                        has_2b = offense.get('second') is not None
                        has_3b = offense.get('third') is not None
                        batter_obj = offense.get('batter', {}) or {}
                        batter_name = batter_obj.get('fullName', 'N/D')
                        
                        game_info = {
                            'id': game.get('gamePk', idx),
                            'time': time_str,
                            'stadium': stadium,
                            'away': away_team,
                            'home': home_team,
                            'starter_away': starter_away,
                            'starter_home': starter_home,
                            'logo_away': f"https://www.mlbstatic.com/team-logos/{away_id}.svg",
                            'logo_home': f"https://www.mlbstatic.com/team-logos/{home_id}.svg",
                            'abstract_state': abstract_state,
                            'detailed_state': detailed_state,
                            'current_inning': current_inning,
                            'inning_state': inning_state,
                            'outs': outs,
                            'balls': balls,
                            'strikes': strikes,
                            'away_runs': away_runs,
                            'home_runs': home_runs,
                            'away_score': away_runs,
                            'home_score': home_runs,
                            'has_1b': has_1b,
                            'has_2b': has_2b,
                            'has_3b': has_3b,
                            'batter_name': batter_name
                        }
                        
                        sim = advanced_simulate_game(game_info)
                        game_info.update(sim)
                        local_games.append(game_info)
        except Exception as e:
            print(f"Aviso de API: {e}")
        return local_games

    games = get_games_for_date(target_date)

    today_str = now_local.strftime('%Y-%m-%d')
    if games and all(g.get('abstract_state', '').lower() == 'final' for g in games) and target_date != today_str:
        today_games = get_games_for_date(today_str)
        if today_games:
            games = today_games
        
    if not games:
        games = [
            {
                'id': 101,
                'time': 'En Vivo',
                'stadium': 'Yankee Stadium',
                'away': 'Boston Red Sox',
                'home': 'New York Yankees',
                'starter_away': 'T. Houck',
                'starter_home': 'G. Cole',
                'logo_away': 'https://www.mlbstatic.com/team-logos/111.svg',
                'logo_home': 'https://www.mlbstatic.com/team-logos/147.svg',
                'abstract_state': 'Live',
                'detailed_state': 'En Juego',
                'current_inning': 5,
                'inning_state': 'Top',
                'outs': 1,
                'balls': 2,
                'strikes': 1,
                'away_runs': 4,
                'home_runs': 3,
                'away_score': 4,
                'home_score': 3,
                'has_1b': True,
                'has_2b': False,
                'has_3b': True,
                'batter_name': 'Aaron Judge'
            },
            {
                'id': 102,
                'time': '08:10 PM',
                'stadium': 'Dodger Stadium',
                'away': 'San Francisco Giants',
                'home': 'Los Angeles Dodgers',
                'starter_away': 'L. Webb',
                'starter_home': 'Y. Yamamoto',
                'logo_away': 'https://www.mlbstatic.com/team-logos/137.svg',
                'logo_home': 'https://www.mlbstatic.com/team-logos/119.svg',
                'abstract_state': 'Preview',
                'detailed_state': 'Scheduled',
                'current_inning': 0,
                'inning_state': '',
                'outs': 0,
                'balls': 0,
                'strikes': 0,
                'away_runs': 0,
                'home_runs': 0,
                'away_score': 0,
                'home_score': 0,
                'has_1b': False,
                'has_2b': False,
                'has_3b': False,
                'batter_name': 'N/D'
            }
        ]
        for g in games:
            sim = advanced_simulate_game(g)
            g.update(sim)
            
    def get_game_priority(game):
        state = game.get('abstract_state', '').lower()
        if state == 'live':
            return 0
        elif state == 'preview':
            return 1
        elif state == 'final':
            return 2
        return 3

    games = sorted(games, key=get_game_priority)
    return games

def fetch_mlb_week_games():
    now_local = datetime.utcnow() - timedelta(hours=4)
    current_weekday = now_local.weekday()  # Lunes = 0, Domingo = 6
    monday_date = now_local - timedelta(days=current_weekday)
    
    days_names = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
    semana_data = {}
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/json"
    }
    
    for i, day_name in enumerate(days_names):
        d_obj = monday_date + timedelta(days=i)
        d_str = d_obj.strftime('%Y-%m-%d')
        url = f"https://statsapi.mlb.com/api/v1/schedule?sportId=1&date={d_str}&hydrate=probablePitcher,linescore"
        
        day_games_list = []
        try:
            response = requests.get(url, headers=headers, timeout=4)
            if response.status_code == 200:
                data = response.json()
                for date_info in data.get('dates', []):
                    for idx, game in enumerate(date_info.get('games', []), start=1):
                        teams = game.get('teams', {}) or {}
                        away_team_obj = teams.get('away', {}).get('team', {}) or {}
                        home_team_obj = teams.get('home', {}).get('team', {}) or {}
                        
                        away_team = away_team_obj.get('name', 'Visitante')
                        home_team = home_team_obj.get('name', 'Local')
                        
                        status_obj = game.get('status', {}) or {}
                        abstract_state = status_obj.get('abstractGameState', 'Preview').lower()
                        
                        linescore = game.get('linescore', {}) or {}
                        ls_teams = linescore.get('teams', {}) or {}
                        away_runs = ls_teams.get('away', {}).get('runs', 0) if ls_teams else 0
                        home_runs = ls_teams.get('home', {}).get('runs', 0) if ls_teams else 0
                        
                        game_info = {
                            'id': game.get('gamePk', idx),
                            'home': home_team,
                            'away': away_team,
                            'starter_home': teams.get('home', {}).get('probablePitcher', {}).get('fullName', 'Por anunciar'),
                            'starter_away': teams.get('away', {}).get('probablePitcher', {}).get('fullName', 'Por anunciar'),
                            'stadium': game.get('venue', {}).get('name', 'Estadio MLB')
                        }
                        
                        sim = advanced_simulate_game(game_info)
                        winner_full = sim.get('winner_full')
                        
                        prediction = f"Ganador: {winner_full}"
                        score_str = f"{away_runs} - {home_runs}" if abstract_state != 'preview' else "Por empezar"
                        
                        if abstract_state == 'final':
                            if away_runs > home_runs:
                                actual_winner = away_team
                            elif home_runs > away_runs:
                                actual_winner = home_team
                            else:
                                actual_winner = None
                            
                            if winner_full == actual_winner:
                                evaluation = "Se dio"
                            else:
                                evaluation = "No se dio"
                        elif abstract_state == 'live':
                            evaluation = "En juego..."
                        else:
                            evaluation = "Pendiente"
                            
                        day_games_list.append({
                            "game": f"{away_team} vs {home_team}",
                            "prediction": prediction,
                            "score": score_str,
                            "evaluation": evaluation
                        })
        except Exception as e:
            print(f"Aviso API semana ({day_name}): {e}")
            
        semana_data[day_name] = day_games_list
        
    return semana_data

# --- CONFIGURACIÓN DE MANTENIMIENTO PRIVADO ---
# Cambia a True si quieres ocultar la página al público mientras editas  https://mlb-analyzer-1gku.onrender.com/?token=secreto123
MODO_MANTENIMIENTO = False 
TOKEN_SECRETO = "secreto123"  # Puedes cambiar esta palabra clave por la que prefieras

@app.before_request
def verificar_mantenimiento():
    if MODO_MANTENIMIENTO:
        # Permite el acceso si usas el enlace con el token correcto, ej: tuweb.onrender.com/?token=secreto123
        token = request.args.get('token')
        if token != TOKEN_SECRETO:
            return "🚧 Página en mantenimiento o actualización privada. Vuelve más tarde.", 503
VISITAS_FILE = "visitas.txt"

def obtener_visitas_actuales():
    if os.path.exists(VISITAS_FILE):
        try:
            with open(VISITAS_FILE, "r") as f:
                return int(f.read().strip())
        except ValueError:
            return 0
    return 0

def incrementar_visita():
    visitas = obtener_visitas_actuales() + 1
    try:
        with open(VISITAS_FILE, "w") as f:
            f.write(str(visitas))
    except Exception as e:
        print(f"No se pudo guardar la visita: {e}")
    return visitas
@app.route('/')
def index():
    # Si el usuario NO ha visitado la página en esta sesión, sumamos uno y guardamos la marca
    if not session.get('visitado'):
        total_visitas = incrementar_visita()
        session['visitado'] = True
    else:
        # Si ya visitó la página y solo está recargando (F5), solo leemos el número actual sin sumar
        total_visitas = obtener_visitas_actuales()
    try:
        games = fetch_mlb_today_games()
    except NameError:
        games = []
        
    try:
        parley_data = generate_parley_system(games)
    except NameError:
        parley_data = {}
        
    try:
        semana_data = fetch_mlb_week_games()
    except NameError:
        semana_data = {}
        
    current_time = datetime.now().strftime('%d/%m/%Y %I:%M %p')
    
    total_wins = 0
    total_losses = 0
    total_evaluados = 0

    if semana_data:
        for dia, partidos in semana_data.items():
            if partidos:
                for p in partidos:
                    score = str(p.get('score', '')).strip()
                    prediction = str(p.get('prediction', '')).strip().lower()
                    game_str = str(p.get('game', '')).lower()
                    
                    if score and '-' in score and 'por empezar' not in score.lower() and 'en vivo' not in score.lower():
                        try:
                            partes_score = score.split('-')
                            if len(partes_score) == 2:
                                s1_match = re.findall(r'\d+', partes_score[0])
                                s2_match = re.findall(r'\d+', partes_score[1])
                                
                                if s1_match and s2_match:
                                    score1 = int(s1_match[-1])
                                    score2 = int(s2_match[-1])
                                    
                                    equipos = re.split(r'\bvs\b|\@', game_str, flags=re.IGNORECASE)
                                    ganador = ""
                                    if len(equipos) == 2:
                                        eq1 = equipos[0].strip().lower()
                                        eq2 = equipos[1].strip().lower()
                                        if score1 > score2:
                                            ganador = eq1
                                        elif score2 > score1:
                                            ganador = eq2
                                        else:
                                            ganador = "empate"
                                    
                                    total_evaluados += 1
                                    if prediction and ganador and (prediction in ganador or ganador in prediction):
                                        p['evaluation'] = "Se dio"
                                        total_wins += 1
                                    else:
                                        p['evaluation'] = "No se dio"
                                        total_losses += 1
                                else:
                                    p['evaluation'] = "Pendiente"
                            else:
                                p['evaluation'] = "Pendiente"
                        except Exception as e:
                            print(f"Error procesando partido: {e}")
                            p['evaluation'] = "Pendiente"
                    else:
                        if not p.get('evaluation') or p.get('evaluation') in ['', 'Pendiente']:
                            p['evaluation'] = "Pendiente"

return render_template(
        'index.html', 
        matches=games, 
        parley_data=parley_data, 
        semana_data=semana_data, 
        current_time=current_time,
        total_wins=total_wins,
        total_losses=total_losses,
        total_evaluados=total_evaluados,
        total_visitas=total_visitas
    )

if __name__ == '__main__':
    app.run(debug=True)
 
