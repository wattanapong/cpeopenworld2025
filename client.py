import requests
import time
import json
from datetime import datetime

LOCAL_URL = "http://localhost:9000" 
PUBLIC_URL = "https://service.wattanapong.com/cpe/open"
INTERVAL = 1                 # seconds
i = 0

while True:
    try:
        response = requests.post(LOCAL_URL, json= {"id": "CPE#1"}, timeout=5)
        print(f"[OK] {response.status_code} - {len(response.content)} bytes #{i}")
        data = response.json() 
        secret = data['code']
        ip = "192.168.1.1" # data['ip'] # 
        print(f"Your secret code is {secret}")
        
        current_time = datetime.now().strftime("%H:%M:%S")
        print({"id": secret, "ip": ip, "time": current_time })
        response = requests.post(PUBLIC_URL, json= {"id": secret, "ip": ip, "time": current_time }, timeout=5)
        response.raise_for_status()
        data = response.json()
        print("Congratulation!!!")

        i += 1
    except requests.RequestException as e:
        print(f"[ERROR] - retrying... {e}")

    time.sleep(INTERVAL)
