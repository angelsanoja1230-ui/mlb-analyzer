from datetime import datetime
import json
import requests


def fetch_mlb_schedule(date_str=None):
  """Obtiene el calendario, equipos, abridores y estadios de la MLB

  para una fecha específica (formato YYYY-MM-DD) desde la API oficial de la MLB.
  """
  if not date_str:
    date_str = datetime.now().strftime("%Y-%m-%d")

  # Endpoint oficial y gratuito de la MLB Stats API
  url = f"https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&date={date_str}&hydrate=probablePitcher,venue"

  print(f"[{datetime.now().strftime('%H:%M:%S')}] Consultando partidos de la MLB para la fecha: {date_str}...")

  try:
    response = requests.get(url, timeout=15)
    response.raise_for_status()
    data = response.json()
  except requests.exceptions.RequestException as e:
    print(f"Error al conectar con la API de la MLB: {e}")
    return []

  games_list = []
  dates_data = data.get("dates", [])
  if not dates_data:
    print("⚠️ No se encontraron partidos programados para esta fecha.")
    return []

  for game in dates_data[0].get("games", []):
    teams = game.get("teams", {})
    
    # Nombres de equipos
    away_team = teams.get("away", {}).get("team", {}).get("name", "Visita")
    home_team = teams.get("home", {}).get("team", {}).get("name", "Local")

    # Estado y Hora
    status_state = game.get("status", {}).get("detailedState", "Programado")
    game_date_utc = game.get("gameDate", "")

    # Estadio
    venue = game.get("venue", {}).get("name", "Estadio no especificado")

    # Lanzadores abridores
    away_pitcher_obj = teams.get("away", {}).get("probablePitcher", {})
    home_pitcher_obj = teams.get("home", {}).get("probablePitcher", {})
    
    away_pitcher = away_pitcher_obj.get("fullName", "Por definir")
    home_pitcher = home_pitcher_obj.get("fullName", "Por definir")

    game_info = {
        "away": away_team,
        "home": home_team,
        "time": status_state,
        "stadium": venue,
        "starter_away": away_pitcher,
        "starter_home": home_pitcher,
        "game_datetime_utc": game_date_utc
    }
    games_list.append(game_info)

  return games_list

if __name__ == "__main__":
  # Puedes modificar la fecha según lo que necesites consultar (ej. "2026-08-30")
  target_date = "2026-08-30"
  
  matchups = fetch_mlb_schedule(target_date)

  if matchups:
    filename = f"mlb_live_data_{target_date}.json"
    with open(filename, "w", encoding="utf-8") as f:
      json.dump(matchups, f, ensure_ascii=False, indent=4)
    
    print(f"\n¡Éxito! Se descargaron {len(matchups)} partidos.")
    print(f"Archivo guardado localmente como: '{filename}'")
    print("Ya puedes utilizar este archivo JSON en tu aplicación web o modelo de análisis.")
  else:
    print("No se pudo generar el archivo de datos.")
