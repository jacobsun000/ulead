import json
import os
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By

result_file = "temp.json"

driver = uc.Chrome(headless=True,use_subprocess=False)

def append_to_json_list(file_path, new_items):
    # Create file if missing
    if not os.path.exists(file_path):
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump([], f)

    # Read existing list
    with open(file_path, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            data = []

    if not isinstance(data, list):
        raise ValueError("JSON file does not contain a list")

    # Ordered dedup logic
    existing = set(data)   # for O(1) lookup
    appended_count = 0

    for item in new_items:
        if item not in existing:
            data.append(item)     # preserves order
            existing.add(item)
            appended_count += 1

    # Save back
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    print(f"Added {appended_count} new items")

for i in range(1, 5):
    driver.get(f'https://www.findingschool.com/cn/browse?class[]=1&page={i}')
    schools = driver.find_element(By.CLASS_NAME, 'schools')
    links = schools.find_elements(
        By.XPATH, ".//*[contains(@class,'school')]//a[@href]"
    )

    hrefs = list(filter(lambda a: a and "#reviews" not in a,
                    [link.get_attribute("href") for link in links]))

    print(f"Found {len(set(hrefs))} unique hrefs")
    print(set(hrefs))
    append_to_json_list(result_file, hrefs)


