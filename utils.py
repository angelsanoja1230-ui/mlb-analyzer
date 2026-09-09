# utils.py

def limpiar_partidos_mlb(raw_data):
    """Procesa el JSON de la MLB y devuelve una lista de diccionarios limpios."""
    clean_games = []
    
    games_list = raw_data if isinstance(raw_data, list) else raw_data.get('games', [])
    
    for g in games_list:
        game_item = {
            "id": g.get("id") or g.get("game_pk"),
            "away": g.get("away") or g.get("away_team", {}).get("name", "Visitante"),
            "home": g.get("home") or g.get("home_team", {}).get("name", "Local"),
            "away_runs": g.get("away_runs", g.get("away_score", 0)),
            "home_runs": g.get("home_runs", g.get("home_score", 0)),
            "inning_state": g.get("inning_state", g.get("status", "En curso")),
            "count": g.get("count", "B:0 S:0 O:0"),
            "batter_name": g.get("batter_name", g.get("batter", "N/D")),
            "has_1b": bool(g.get("has_1b", g.get("first", False))),
            "has_2b": bool(g.get("has_2b", g.get("second", False))),
            "has_3b": bool(g.get("has_3b", g.get("third", False))),
            "logo_away": g.get("logo_away", ""),
            "logo_home": g.get("logo_home", ""),
            # Campos indispensables para que el frontend filtre los partidos en vivo
            "abstract_state": g.get("abstract_state", ""),
            "detailed_state": g.get("detailed_state", ""),
            "time": g.get("time", ""),
            "stadium": g.get("stadium", "")
        }
        clean_games.append(game_item)
        
    return clean_games
