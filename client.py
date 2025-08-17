import requests
import time
import json

LOCAL_URL = "http://localhost:9000" 
PUBLIC_URL = "https://service.wattanapong.com/cpe/open"
INTERVAL = 1                 # seconds
i = 0

while True:
    try:
        response = requests.post(LOCAL_URL, json= {"id": "CPE#7"}, timeout=5)
        print(f"[OK] {response.status_code} - {len(response.content)} bytes #{i}")
        data = response.json() 
        secret = data['code']
        print(f"Your secret code is {secret}")
        
        response = requests.post(PUBLIC_URL, json= {"id": secret}, timeout=5)
        data = response.json()
        print("Congratulation!!!")

        i += 1
    except requests.RequestException as e:
        print(f"[ERROR] - retrying...")

    time.sleep(INTERVAL)
