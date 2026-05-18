import json
import os
import undetected_chromedriver as uc
from dataclasses import dataclass, asdict
from typing import Any, Dict, List, Optional, Set
from time import sleep
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
import time


school_list = "school_list.json"
checkpoint_file = "school_details.json"
profile_dir = "/home/jacob/Projects/ulead/scripts/usn_crawl/chrome_profile"


def load_checkpoint() -> tuple[List[dict], Set[str]]:
    """Load existing checkpoint data and return (details_list, processed_links_set)."""
    if os.path.exists(checkpoint_file):
        try:
            with open(checkpoint_file, "r") as f:
                details = json.load(f)
            processed = {s['link'] for s in details if s.get('link')}
            print(f"Restored checkpoint: {len(details)} schools already processed")
            return details, processed
        except (json.JSONDecodeError, KeyError) as e:
            print(f"Warning: Could not load checkpoint ({e}), starting fresh")
    return [], set()


def save_checkpoint(details: List[dict]):
    """Save current progress to checkpoint file."""
    with open(checkpoint_file, "w") as f:
        json.dump(details, f, indent=2)

opts = Options()
opts.add_argument(f"--user-data-dir={profile_dir}")
driver = uc.Chrome(use_subprocess=False, options=opts)

def scroll_to_bottom(driver, pause=1.0, max_attempts=300):
    last_height = driver.execute_script("return document.body.scrollHeight")
    for _ in range(max_attempts):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(pause)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

def get_overview(driver):
    show_more = driver.find_element(By.XPATH, "(//p[normalize-space(text())='+ Show More'])[1]")
    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", show_more)
    show_more.click()
    overview = driver.find_element(By.XPATH, "//h2[normalize-space()='Overview']/following-sibling::div").text
    overview = overview.replace("- Show Less", "").strip()
    return overview

def get_glance(driver):
    wait = WebDriverWait(driver, 15)
    atag_box = wait.until(EC.presence_of_element_located((
        By.XPATH,
        "//p[normalize-space()='At-a-Glance']/ancestor::div[contains(@class,'content-box-inner')][1]"
    )))
    rows = atag_box.find_elements(By.XPATH, ".//div[.//p and count(.//p)=2]")
    data = {}
    for row in rows:
        ps = row.find_elements(By.XPATH, ".//p")
        label = ps[0].text.strip()
        value = ps[1].text.strip()
        if label and value:
            data[label] = value
    return data

def get_admissions(driver):
    wait = WebDriverWait(driver, 15)
    h2 = wait.until(EC.presence_of_element_located(
        (By.XPATH, "//h2[@id='admissions' or normalize-space()='Admissions'][normalize-space()='Admissions']")
    ))
    section = h2.find_element(By.XPATH, "following-sibling::*[1]")
    out = {}
    # cards: value in <p> before label in <div>
    for label in ["Application Deadline", "Acceptance Rate"]:
        label_el = section.find_element(By.XPATH, f".//div[normalize-space()='{label}']")
        value_el = label_el.find_element(By.XPATH, "./preceding-sibling::p[1]")
        out[label] = value_el.text.strip()
    # rows: label/value in two <p>
    for row_label in ["SAT Range*", "ACT Range*", "High School GPA*"]:
        row = section.find_element(By.XPATH, f".//p[normalize-space()='{row_label}']/parent::*")
        ps = row.find_elements(By.XPATH, "./p")
        out[ps[0].text.strip()] = ps[1].text.strip()
    return out

def get_cost(driver, timeout: int = 15) -> dict:
    wait = WebDriverWait(driver, timeout)
    # Anchor on the Cost header (prefer stable id)
    cost_h2 = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, "//h2[@id='cost' and normalize-space()='Cost'] | //h2[normalize-space()='Cost']")
        )
    )
    # Ensure it is in view (helps when section is lazy-rendered)
    driver.execute_script("arguments[0].scrollIntoView({block:'center'});", cost_h2)
    # Section container is typically the next sibling after the header
    section = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, "//h2[@id='cost' and normalize-space()='Cost']/following-sibling::*[1] | "
                       "//h2[normalize-space()='Cost']/following-sibling::*[1]")
        )
    )
    data = {}
    # Left column rows (label/value as two <p>)
    row_labels = ["Out-of-State Tuition & Fees", "In-State Tuition & Fees", "Tuition & Fees", "Food & Housing", "Average Need-Based Aid Package"]
    for label in row_labels:
        try:
            row = section.find_element(
                By.XPATH,
                f".//p[normalize-space()='{label}']/ancestor::*[p[1] and p[2]][1]"
            )
            ps = row.find_elements(By.XPATH, ".//p")
            if len(ps) >= 2:
                data[ps[0].text.strip()] = ps[1].text.strip()
        except Exception:
            continue
    # Right column nugget: value in <p>, label in <div> (Annual Cost*)
    annual_label = "Annual Cost*"
    annual_label_el = section.find_element(By.XPATH, f".//div[normalize-space()='{annual_label}']")
    annual_value_el = annual_label_el.find_element(By.XPATH, "./preceding-sibling::p[1]")
    data[annual_label] = annual_value_el.text.strip()
    return data

def get_academics(driver, timeout: int = 15) -> dict:
    wait = WebDriverWait(driver, timeout)
    # Anchor on Academics header (prefer stable id)
    h2 = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, "//h2[@id='academics' and normalize-space()='Academics'] | //h2[normalize-space()='Academics']")
        )
    )
    driver.execute_script("arguments[0].scrollIntoView({block:'center'});", h2)
    # IMPORTANT: everything is inside the same react-trigger wrapper in your HTML
    # Using following-sibling::*[1] is too narrow and misses later widgets.
    section = h2.find_element(
        By.XPATH,
        "ancestor::react-trigger[1] | ancestor::*[@id='academics']/ancestor::*[self::react-trigger][1] | ancestor::div[1]"
    )
    result = {}
    # --- Top KPI tiles: label in <div>, value in preceding <p> ---
    for label in ["4-Year Graduation Rate", "Student/Faculty Ratio", "Classes With Fewer Than 20 Students"]:
        label_el = section.find_element(By.XPATH, f".//div[normalize-space()='{label}']")
        value_el = label_el.find_element(By.XPATH, "./preceding-sibling::p[1]")
        result[label] = value_el.text.strip()
    # --- Popular Majors ---
    popular_rows = []
    try:
        popular_box = section.find_element(
            By.XPATH,
            ".//p[normalize-space()='Popular Majors']/ancestor::div[contains(@class,'content-box-inner')][1]"
        )
        # Desktop (sm-hide) layout: each data row has:
        #   <div>  <div><p>Major</p><p>%</p></div>  <p>Salary</p>  </div>
        row_divs = popular_box.find_elements(
            By.XPATH,
            ".//div[contains(@class,'sm-hide')]//div[./div[p[1] and p[2]] and ./p[1]]"
        )
        for row in row_divs:
            major = row.find_element(By.XPATH, "./div[p[1] and p[2]][1]/p[1]").text.strip()
            pct = row.find_element(By.XPATH, "./div[p[1] and p[2]][1]/p[2]").text.strip()
            salary = row.find_element(By.XPATH, "./p[1]").text.strip()
            # Skip header row
            if major and major.upper() != "MAJOR":
                popular_rows.append(
                    {
                        "major": major,
                        "percent_of_graduates": pct,
                        "alumni_starting_salary": salary,
                    }
                )
        # Mobile stacked fallback (only if desktop extraction found nothing)
        if not popular_rows:
            stacked_tables = popular_box.find_elements(By.XPATH, ".//table[contains(@class,'TableStacked__Container')]//tr/td/table")
            for t in stacked_tables:
                headers = t.find_elements(By.XPATH, ".//span[contains(@class,'header')]")
                if len(headers) >= 3:
                    major = headers[0].text.strip()
                    pct = headers[1].text.strip()
                    salary = headers[2].text.strip()
                    if major:
                        popular_rows.append(
                            {
                                "major": major,
                                "percent_of_graduates": pct,
                                "alumni_starting_salary": salary,
                            }
                        )
    except Exception:
        pass
    result["Popular Majors"] = popular_rows
    # --- Faculty Research Impact ---
    fri = {}
    try:
        fri_box = section.find_element(
            By.XPATH,
            ".//p[normalize-space()='Faculty Research Impact']/ancestor::div[contains(@class,'content-box-inner')][1]"
        )
        # Each metric row is a div with first two direct <p> children: label + value
        metric_rows = fri_box.find_elements(By.XPATH, ".//div[p[1] and p[2]]")
        for row in metric_rows:
            ps = row.find_elements(By.XPATH, "./p")
            if len(ps) >= 2:
                k = ps[0].text.strip()
                v = ps[1].text.strip()
                if k and v:
                    fri[k] = v
    except Exception:
        fri = {}
    result["Faculty Research Impact"] = fri
    return result

def _text_or_none(el: Optional[WebElement]) -> Optional[str]:
    if not el:
        return None
    t = el.text.strip()
    return t if t else None


def _safe_find(el: WebElement, by: By, value: str) -> Optional[WebElement]:
    try:
        return el.find_element(by, value)
    except Exception:
        return None


def _safe_find_all(el: WebElement, by: By, value: str) -> List[WebElement]:
    try:
        return el.find_elements(by, value)
    except Exception:
        return []


def _parse_badge_li(li: WebElement) -> Optional[Dict[str, Any]]:
    a = _safe_find(li, By.CSS_SELECTOR, "a[href]")
    href = a.get_attribute("href") if a else None
    # Rank is the first <strong> in the anchor
    rank_el = _safe_find(li, By.CSS_SELECTOR, "a strong")
    rank = _text_or_none(rank_el)
    # Category name is usually the 2nd <strong> inside the anchor
    strongs = _safe_find_all(li, By.CSS_SELECTOR, "a strong")
    category = strongs[1].text.strip() if len(strongs) >= 2 else None
    # Optional "(tie)" etc. often appears in a <span class="darkgray"> within the anchor
    note_el = _safe_find(li, By.CSS_SELECTOR, "a span.darkgray")
    note = _text_or_none(note_el)
    # Optional descriptive subtext line below the anchor
    # (Your snippet shows: <div class="... darkgray"><span class="t-font-fam">At schools ...</span></div>)
    subtext_el = _safe_find(li, By.CSS_SELECTOR, "div.darkgray span")
    subtext = _text_or_none(subtext_el)
    # Nested children badges (direct nested <ul> under this <li>)
    # Use ":scope" to avoid capturing deeper lists multiple times (works in modern Selenium/Chromium).
    child_lis = _safe_find_all(li, By.CSS_SELECTOR, ":scope ul li")
    children = [_parse_badge_li(child_li) for child_li in child_lis] if child_lis else []
    if rank is None and category is None and not children:
        return None
    return {
        "rank": rank,
        "category": category,
        "children": children,
    }


def get_rankings(driver):
    wait = WebDriverWait(driver, 15)
    link = wait.until(EC.element_to_be_clickable((
        By.XPATH, "//a[normalize-space()='See All Rankings']"
    )))
    driver.execute_script("arguments[0].scrollIntoView({block:'center'});", link)
    sleep(1)
    link.click()
    scroll_to_bottom(driver)
    h1 = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, "(//h1)[1]")
        )
    )
    container = h1.find_element(By.XPATH, "following-sibling::div[1]")
    top_lis = container.find_elements(By.CSS_SELECTOR, "ul li")
    badges = [_parse_badge_li(li) for li in top_lis]
    badges = [b for b in badges if b is not None]
    return badges


def get_school(driver, school):
    driver.get(school['link'])
    sleep(1)
    return {
        'name': school.get('name'),
        'link': school.get('link'),
        'location': school.get('location'),
        'rank': school.get('rank'),
        'glance': get_glance(driver),
        'admissions': get_admissions(driver),
        'cost': get_cost(driver),
        'academics': get_academics(driver),
        'rankings': get_rankings(driver),
    }

schools = None

with open(school_list, "r") as f:
    schools = json.load(f)

# Load checkpoint and get set of already-processed school links
school_details, processed_links = load_checkpoint()

for idx, school in enumerate(schools):
    # Skip already processed schools
    if school.get('link') in processed_links:
        print(f"Skipping {idx+1}/{len(schools)}: {school['name']} (already processed)")
        continue

    print(f"Processing {idx+1}/{len(schools)}: {school['name']}")
    try:
        sleep(5)
        school_detail = get_school(driver, school)
        school_details.append(school_detail)
        processed_links.add(school.get('link'))
        # Save checkpoint after each successful school
        save_checkpoint(school_details)
        print(f"  ✓ Saved checkpoint ({len(school_details)} total)")
    except Exception as e:
        print(f"  ✗ Error processing {school['name']}: {e}")
        # Continue to next school instead of crashing

print(f"\nDone! Processed {len(school_details)} schools total.")
