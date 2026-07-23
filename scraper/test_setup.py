# type: ignore
import time
import json
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from flask import Flask, jsonify
from collections import OrderedDict

def main() -> None:
    
    chrome_options = Options()
    chrome_options.add_argument("--log-level=3") 
    chrome_options.add_argument("--disable-gpu") 
    chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])

    driver = webdriver.Chrome(options=chrome_options)
    wait = WebDriverWait(driver, 15)
    
    try:
        driver.get("https://konwenty-poludniowe.pl/konwenty/kalendarz")

        wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        print(f"[*] Page title: {driver.title}")

        years = driver.find_elements(by=By.CLASS_NAME, value="buttonykalendarz")
        
        years_list = []
        
        for element in years:
            pieces = element.text.split()
            
            for piece in pieces:
                if piece.isdigit():
                    years_list.append(int(piece))


            
        all_years = []

        for click in years_list:
            year = click

            years_click = driver.find_element(by=By.XPATH, value=f"//*[@id='rok_{click}']")
            driver.execute_script("arguments[0].click();", years_click)
            time.sleep(1)

            soup = BeautifulSoup(driver.page_source, "html.parser")
            events = []
            table = soup.find("table")
            if not table:
                continue

            rows = table.find_all("tr")
            for row in rows[1:]:
                cols = [ele.get_text(" ", strip=True) for ele in row.find_all(["td", "th"])]
                if cols:
                    events.append([ele for ele in cols if ele])

            years_click = driver.find_element(by=By.XPATH, value=f"//*[@id='rok_{click}']")
            driver.execute_script("arguments[0].click();", years_click)
            parsed_events = []
            cities_set = set()
            
            cities = []
            for event in events:
                date_range = event[0] if len(event) > 0 else ""
                if " - " in date_range:
                    start_date, end_date = date_range.split(" - ", 1)
                else:
                    start_date = date_range
                    end_date = ""
                parsed_events.append({
                    "start_date": start_date,
                    "end_date": end_date,
                    "name": event[1] if len(event) > 1 else "",
                    "location": event[2] if len(event) > 2 else "",
                    "genres": event[3] if len(event) > 3 else "",
                })
                # Zamiast listy tworzysz set

                if len(event) > 2 and event[2]:
                    cities_set.add(event[2])

                # w sumie tu chodzi o zamiane na ten sam typ bo są różne 
                cities = [{"city": city} for city in cities_set]
            json_data = {
                "year": year,
                "data": parsed_events,
                "unique_citeis": cities
            }
            all_years.append(json_data)
            print(json.dumps(json_data, indent=2, ensure_ascii=False))
            time.sleep(1)

        with open("konwenty.json", "w", encoding="utf-8") as f:
            json.dump(all_years, f, indent=2, ensure_ascii=False)
        print(f"[*] Saved konwenty.json ({len(all_years)} years)")
            

    finally:
        
        driver.quit()
        print("[*] Browser closed.")

if __name__ == "__main__":
    main()