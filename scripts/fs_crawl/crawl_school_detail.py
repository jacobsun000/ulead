import json
import os
import undetected_chromedriver as uc
from time import sleep
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

school_urls_file = "schools.json"

driver = uc.Chrome(use_subprocess=False)

def read_school_list(file_path):
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"{file_path} does not exist")

    with open(file_path, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            raise ValueError("JSON file is not valid")

    if not isinstance(data, list):
        raise ValueError("JSON file does not contain a list")

    return data

def table_to_dict(table_el, columns):
    data = []
    rows = table_el.find_elements(By.XPATH, ".//tr")[1:]  # skip header row

    for row in rows:
        cells = row.find_elements(By.TAG_NAME, "td")
        if len(cells) < len(columns):
            continue
        data.append({
            columns[i]: cells[i].text.strip() for i in range(len(columns))
        })
    return data

def has_anchor(el):
    return len(el.find_elements(By.TAG_NAME, "a")) > 0

def has_table(el):
    return len(el.find_elements(By.TAG_NAME, "table")) > 0

def read_ratings(driver):
    ratings = driver.find_element(By.CLASS_NAME, 'ranking-scores').text.splitlines()
    return {ratings[a]: ratings[a+1] for a in range(len(ratings)) if a % 2 == 0}

def read_description(driver):
    return driver.find_element(By.CLASS_NAME, 'school_desc_short').text

def read_rankings(driver):
    rankings = driver.find_element(By.ID, 'ranking').text.splitlines()[2:]
    return {rankings[a+1]: rankings[a] for a in range(len(rankings)) if a % 2 == 0}

def read_stats(driver):
    stats = driver.find_element(
        By.XPATH,
        "//*[@id='stats']//div[contains(@class,'sm:row-gutter')]"
    )
    stats = stats.find_elements(
        By.XPATH,
        ".//div[contains(@class,'text-start')]"
    )
    return {stat.text.splitlines()[0]: stat.text.splitlines()[1] for stat in stats}

def read_matriculation(driver):
    hypsm = driver.execute_script("""
        const canvas = document.getElementById('chart-hypsm');
        const chart = window.Chart?.getChart?.(canvas);
        if (!chart) return null;
        return {
            labels: chart.data.labels,
            data: chart.data.datasets?.[0]?.data,
            title: chart.options?.plugins?.title?.text
        };
    """)
    hypsm = {' '.join(a.split(' ')[1:]): a.split(' ')[0] for a in hypsm['labels']}
    matriculation = driver.find_element(By.ID, 'matriculation')
    matriculation_tables = matriculation.find_elements(By.XPATH, ".//table")
    college_stats = table_to_dict(matriculation_tables[0], ["排名", "学校", "学生人数"])
    college_stats_cn = table_to_dict(matriculation_tables[1], ["排名", "学校", "学生人数"]) if len(matriculation_tables) > 1 else []
    return {
        "哈耶普斯麻": hypsm,
        "大学升学数据": college_stats,
        "中国毕业生去向": college_stats_cn
    }

def read_summer_school(driver):
    try:
        ss = driver.find_element(By.ID, 'summer-schools')
    except Exception:
        return None
    ss = ss.find_element(By.XPATH, ".//table")
    ss = ss.find_elements(By.XPATH, ".//td")
    result = {}
    for s in ss:
        if has_anchor(s):
            a = s.find_element(By.TAG_NAME, "a")
            result[s.text.splitlines()[0]] = a.get_attribute("href")
        else:
            result[s.text.splitlines()[0]] = s.text.splitlines()[1] if len(s.text.splitlines()) > 1 else None
    return result

def read_requirements(driver):
    cn = driver.find_element(By.ID, 'chinese')
    rq = cn.find_element(By.XPATH, ".//div")
    rq = rq.text.splitlines()
    rq = {rq[a]: rq[a+1] for a in range(len(rq)) if a % 2 == 0}
    toefl = driver.execute_script("""
        const canvas = document.getElementById('chart-toefl');
        if (!canvas) return null;

        const chart = window.Chart?.getChart?.(canvas);
        if (!chart) return null;

        return {
            scores: chart.data.datasets[0].data,
            case_scores: chart.data.datasets[1].data,
        };
    """)

    ssat = driver.execute_script("""
        const canvas = document.getElementById('chart-toefl');
        if (!canvas) return null;

        const chart = window.Chart?.getChart?.(canvas);
        if (!chart) return null;

        return {
            scores: chart.data.datasets[0].data,
            case_scores: chart.data.datasets[1].data,
        };
    """)

    toefl = {
        "FS用户": toefl['scores'],
        "申请案例": toefl['case_scores'],
    } if toefl else None

    ssat = {
        "FS用户": ssat['scores'],
        "申请案例": ssat['case_scores'],
    } if ssat else None


    return {
        "要求": rq,
        "TOEFL": toefl,
        "SSAT": ssat
    }

def read_academic(driver):
    ac = driver.find_element(By.ID, 'academic')
    sections = ac.find_elements(By.TAG_NAME, "section")
    result = {}
    for sec in sections:
        if not has_table(sec):
            result[sec.children()[0].text.splitlines()[0]] = " ".join(sec.text.splitlines()[1:])
            continue
        table = sec.find_element(By.TAG_NAME, "table")
        tds = table.find_elements(By.TAG_NAME, "td")
        result[sec.children()[0].text.splitlines()[0]] = [" ".join(td.text.splitlines()) for td in tds]
    return result

def read_contact(driver):
    ct = driver.find_element(By.XPATH, "//div[contains(@class,'contact-info')]")
    return ct.text.splitlines()[1:]

def read_basic_info(driver):
    info = driver.find_element(By.XPATH, "//div[contains(@class,'basic-info')]")
    info = info.find_element(By.XPATH, ".//div[contains(@class,'table-dividor')]")
    info = [i.text.splitlines() for i in info.children()]
    info = {i[0]: i[1] if len(i) > 1 else None for i in info}
    return info

def read_name(driver):
    name = driver.find_element(By.XPATH, "//div[contains(@class,'col-lg-8')]").text
    return ";".join(name.splitlines()[:2])

def read_school_detail(driver, url):
    print(f"Reading {url}")
    driver.get(url)
    WebDriverWait(driver, 10).until(
        lambda d: d.execute_script("return document.readyState") == "complete"
    )
    sleep(2)
    return {
        "名称": read_name(driver),
        "链接": url,
        "评分": read_ratings(driver),
        "概览": read_description(driver),
        "排名": read_rankings(driver),
        "数据": read_stats(driver),
        "升学": read_matriculation(driver),
        "暑校": read_summer_school(driver),
        "中国招生": read_requirements(driver),
        "学术": read_academic(driver),
        "联系信息": read_contact(driver),
        "基本信息": read_basic_info(driver),
    }

school_urls = read_school_list(school_urls_file)

schools = []

for url in school_urls:
    schools.append(read_school_detail(driver, url))

with open("result.json", "w", encoding="utf-8") as f:
    json.dump(schools, f, indent=4, ensure_ascii=False)

