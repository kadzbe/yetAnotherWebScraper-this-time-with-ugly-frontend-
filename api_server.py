import json
import os
from typing import Any
from flask_cors import CORS
from flask import Flask, jsonify


def load_year_data() -> list[dict[str, Any]]:
    data_path = os.path.join(os.path.dirname(__file__), "konwenty.json")
    if not os.path.exists(data_path):
        return []

    with open(data_path, "r", encoding="utf-8") as handle:
        return json.load(handle)


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)
    year_data = load_year_data()

    @app.get("/years")
    def get_years() -> Any:
        years = [entry["year"] for entry in year_data]
        return jsonify({"years": years})

    @app.get("/years/<int:year>")
    def get_year(year: int) -> Any:
        for entry in year_data:
            if entry.get("year") == year:
                return jsonify(entry)

        return jsonify({"error": f"No data found for year {year}"}), 404

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
