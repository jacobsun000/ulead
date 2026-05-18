#!/usr/bin/env python3
"""Convert result.json to xlsx with flattened structure (one school per row)."""

import json
from pathlib import Path
from openpyxl import Workbook


def format_datapoints(datapoints: list[dict]) -> str:
    """Convert TOEFL/SSAT datapoints to text format: 'year:score(r), ...'"""
    if not datapoints:
        return ""
    # Sort by year then score
    sorted_points = sorted(datapoints, key=lambda p: (p.get("x", 0), p.get("y", 0)))
    return "; ".join(f"{p.get('x')}:{p.get('y')}(r={p.get('r')})" for p in sorted_points)


def format_list_of_dicts(items: list[dict]) -> str:
    """Convert a list of dicts (like 大学升学数据) to text."""
    if not items:
        return ""
    parts = []
    for item in items:
        part = ", ".join(f"{k}:{v}" for k, v in item.items())
        parts.append(f"[{part}]")
    return "; ".join(parts)


def flatten_school(school: dict) -> dict:
    """Flatten a school record into a single-level dict."""
    flat = {}

    # Top-level simple fields
    flat["名称"] = school.get("名称", "")
    flat["链接"] = school.get("链接", "")
    flat["概览"] = school.get("概览", "")

    # 评分 (ratings)
    ratings = school.get("评分") or {}
    for key, value in ratings.items():
        flat[f"评分_{key}"] = value

    # 排名 (rankings)
    rankings = school.get("排名") or {}
    for key, value in rankings.items():
        flat[f"排名_{key}"] = value

    # 数据 (data)
    data = school.get("数据") or {}
    for key, value in data.items():
        flat[f"数据_{key}"] = value

    # 升学 (admissions)
    admissions = school.get("升学") or {}

    # 哈耶普斯麻 stats
    hypsm = admissions.get("哈耶普斯麻") or {}
    for key, value in hypsm.items():
        flat[f"升学_哈耶普斯麻_{key}"] = value

    # 大学升学数据 - list of dicts
    college_data = admissions.get("大学升学数据") or []
    flat["升学_大学升学数据"] = format_list_of_dicts(college_data)

    # 中国毕业生去向 - list of dicts
    chinese_grads = admissions.get("中国毕业生去向") or []
    flat["升学_中国毕业生去向"] = format_list_of_dicts(chinese_grads)

    # 暑校 (summer school)
    summer = school.get("暑校") or {}
    for key, value in summer.items():
        flat[f"暑校_{key}"] = value

    # 中国招生 (Chinese admissions)
    cn_admissions = school.get("中国招生") or {}

    # 要求 (requirements)
    requirements = cn_admissions.get("要求") or {}
    for key, value in requirements.items():
        flat[f"中国招生_要求_{key}"] = value

    # TOEFL - convert datapoints to text
    toefl = cn_admissions.get("TOEFL") or {}
    fs_users = toefl.get("FS用户") or []
    flat["中国招生_TOEFL_FS用户"] = format_datapoints(fs_users)

    cases = toefl.get("申请案例") or []
    flat["中国招生_TOEFL_申请案例"] = format_datapoints(cases)

    # SSAT - convert datapoints to text
    ssat = cn_admissions.get("SSAT") or {}
    fs_users = ssat.get("FS用户") or []
    flat["中国招生_SSAT_FS用户"] = format_datapoints(fs_users)

    cases = ssat.get("申请案例") or []
    flat["中国招生_SSAT_申请案例"] = format_datapoints(cases)

    # 基本信息 (basic info) - keys end with colon
    for key, value in school.items():
        if key.endswith(":"):
            flat[f"基本信息_{key.rstrip(':')}"] = value

    return flat


def main():
    script_dir = Path(__file__).parent
    input_file = script_dir / "result.json"
    output_file = script_dir / "result.xlsx"

    print(f"Reading {input_file}...")
    with open(input_file, "r", encoding="utf-8") as f:
        schools = json.load(f)

    print(f"Found {len(schools)} schools")

    # Flatten all schools and collect all possible columns
    flattened = [flatten_school(school) for school in schools]

    # Get all unique column names (preserving order of first appearance)
    all_columns = []
    seen = set()
    for row in flattened:
        for key in row.keys():
            if key not in seen:
                all_columns.append(key)
                seen.add(key)

    print(f"Total columns: {len(all_columns)}")

    # Create workbook
    wb = Workbook()
    ws = wb.active
    ws.title = "Schools"

    # Write header
    for col_idx, col_name in enumerate(all_columns, start=1):
        ws.cell(row=1, column=col_idx, value=col_name)

    # Write data
    for row_idx, row_data in enumerate(flattened, start=2):
        for col_idx, col_name in enumerate(all_columns, start=1):
            value = row_data.get(col_name, "")
            ws.cell(row=row_idx, column=col_idx, value=value)

    print(f"Writing {output_file}...")
    wb.save(output_file)
    print("Done!")


if __name__ == "__main__":
    main()
