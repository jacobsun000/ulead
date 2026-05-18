import json
import re
from bs4 import BeautifulSoup

with open("school_list.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "lxml")

schools = []
cards = soup.find_all("div", class_="detail-card-colleges")

for card in cards:
    # Name from the card's name attribute
    name = card.get("name", "")

    # Link from the card-name anchor
    link_elem = card.find("a", class_="card-name")
    link = ""
    if link_elem:
        link = "https://www.usnews.com" + link_elem.get("href", "")

    # Location from paragraph element
    location_elem = card.find("p", class_="Paragraph-sc-1iyax29-0")
    location = location_elem.get_text(strip=True) if location_elem else ""

    # Rank from the rank list item
    rank_elem = card.find("div", class_="ranked")
    rank = ""
    if rank_elem:
        rank_strong = rank_elem.find("strong")
        if rank_strong:
            rank = rank_strong.get_text(strip=True)

    # Get all text content to parse tuition, enrollment, and scores
    text_content = card.get_text(separator="|", strip=True)
    parts = text_content.split("|")

    tuition = ""
    enrollment = None
    sat_score = ""
    act_score = ""

    for i, part in enumerate(parts):
        if part == "Tuition and Fees" and i + 1 < len(parts):
            tuition = parts[i + 1].replace(",", "")
        elif part == "Undergraduate Enrollment" and i + 1 < len(parts):
            # Parse enrollment number (may have comma)
            enroll_text = parts[i + 1]
            enroll_match = re.search(r"[\d,]+", enroll_text)
            if enroll_match:
                enrollment = int(enroll_match.group().replace(",", ""))
        elif part == "SAT" and i - 1 >= 0:
            sat_score = parts[i - 1]
        elif part == "ACT" and i - 1 >= 0:
            act_score = parts[i - 1]

    school = {
        "name": name,
        "link": link,
        "location": location,
        "rank": rank,
        "tuition": tuition,
        "enrollment": enrollment,
        "scores": {
            "SAT": sat_score,
            "ACT": act_score
        }
    }
    schools.append(school)

# Write to JSON file
with open("school_list.json", "w", encoding="utf-8") as f:
    json.dump(schools, f, indent=2, ensure_ascii=False)

print(f"Parsed {len(schools)} schools")
print("\nFirst school:")
print(json.dumps(schools[0], indent=2))
