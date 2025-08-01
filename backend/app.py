from flask import Flask, request, jsonify
from space_track import fetch_visible_satellites
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/get-visible")
def get_visible():
    try:
        lat = float(request.args.get("lat"))
        lon = float(request.args.get("lon"))
        radius = float(request.args.get("radius", 20))
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid input"}), 400

    try:
        sats = fetch_visible_satellites(lat, lon, radius)
        return jsonify({"satellites": sats})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
