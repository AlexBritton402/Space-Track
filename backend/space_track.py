import os
import requests
from skyfield.api import EarthSatellite, Topos, load
from datetime import datetime

def fetch_visible_satellites(lat, lon, radius):
    username = os.getenv("SPACETRACK_USER")
    password = os.getenv("SPACETRACK_PASS")
    if not username or not password:
        raise Exception("Space-Track credentials not set")

    login_url = 'https://www.space-track.org/ajaxauth/login'
    tle_url = 'https://www.space-track.org/basicspacedata/query/class/tle_latest/ORDINAL/1/format/tle'

    with requests.Session() as s:
        login = s.post(login_url, data={"identity": username, "password": password})
        if login.status_code != 200:
            raise Exception("Space-Track login failed")

        tle_text = s.get(tle_url).text.strip().splitlines()

    ts = load.timescale()
    t = ts.now()
    observer = Topos(latitude_degrees=lat, longitude_degrees=lon)

    sats = []
    for i in range(0, len(tle_text), 3):
        name, l1, l2 = tle_text[i], tle_text[i+1], tle_text[i+2]
        try:
            sat = EarthSatellite(l1, l2, name.strip(), ts)
            difference = sat - observer
            topocentric = difference.at(t)
            alt, az, dist = topocentric.altaz()
            if alt.degrees > 0:
                subpoint = sat.at(t).subpoint()
                sats.append({
                    "name": name.strip(),
                    "lat": subpoint.latitude.degrees,
                    "lon": subpoint.longitude.degrees,
                    "alt_km": subpoint.elevation.km
                })
        except:
            continue
    return sats
