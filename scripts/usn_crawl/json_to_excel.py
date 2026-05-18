#!/usr/bin/env python3
"""Convert school_details.json to Excel format with flattened structure."""

import json
from pathlib import Path

import pandas as pd


def flatten_school(school: dict) -> dict:
    """Flatten a school record for Excel row."""
    row = {}

    # Basic fields
    row["name"] = school.get("name", "")
    row["link"] = school.get("link", "")
    row["location"] = school.get("location", "")
    row["rank"] = school.get("rank", "")

    # Glance section
    glance = school.get("glance", {})
    for key, value in glance.items():
        row[f"glance_{key.lower().replace(' ', '_').replace('&', 'and')}"] = value

    # Admissions section
    admissions = school.get("admissions", {})
    for key, value in admissions.items():
        row[f"admissions_{key.lower().replace(' ', '_').replace('*', '').replace('&', 'and')}"] = value

    # Cost section
    cost = school.get("cost", {})
    for key, value in cost.items():
        row[f"cost_{key.lower().replace(' ', '_').replace('*', '').replace('&', 'and').replace('-', '_')}"] = value

    # Academics section (excluding nested structures)
    academics = school.get("academics", {})
    for key, value in academics.items():
        if key == "Popular Majors":
            # Embed as JSON string
            row["academics_popular_majors"] = json.dumps(value, ensure_ascii=False)
        elif key == "Faculty Research Impact":
            # Flatten faculty research impact
            for fkey, fvalue in value.items():
                col_name = f"academics_research_{fkey.lower().replace(' ', '_')}"
                row[col_name] = fvalue
        else:
            row[f"academics_{key.lower().replace(' ', '_').replace('/', '_')}"] = value

    # Rankings - embed as JSON string
    rankings = school.get("rankings", [])
    row["rankings"] = json.dumps(rankings, ensure_ascii=False)

    return row


def main():
    input_path = Path(__file__).parent / "school_details.json"
    output_path = Path(__file__).parent / "school_details.xlsx"

    # Load JSON
    with open(input_path, "r", encoding="utf-8") as f:
        schools = json.load(f)

    # Flatten all schools
    rows = [flatten_school(school) for school in schools]

    # Create DataFrame
    df = pd.DataFrame(rows)

    # Reorder columns for better readability
    priority_cols = ["name", "rank", "location", "link"]
    other_cols = [c for c in df.columns if c not in priority_cols]
    df = df[priority_cols + sorted(other_cols)]

    # Export to Excel
    df.to_excel(output_path, index=False, engine="openpyxl")
    print(f"Exported {len(rows)} schools to {output_path}")


if __name__ == "__main__":
    main()
