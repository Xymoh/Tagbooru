import csv
import time

import requests

BASE_URL = 'https://danbooru.donmai.us/tags.json'
HEADERS = {
    'User-Agent': 'prompt-formatter-tag-scraper/1.0 (compatible; Danbooru tag export for local development)',
    'Accept': 'application/json',
}

# Specify the filename for the CSV
csv_filename = 'danbooru_tags_post_count.csv'

session = requests.Session()
session.headers.update(HEADERS)

total_rows = 0

with open(csv_filename, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(['name', 'post_count'])

    for page in range(1, 1001):
        params = {
            'limit': 1000,
            'page': page,
            'search[hide_empty]': 'yes',
            'search[is_deprecated]': 'no',
            'search[order]': 'count',
        }

        response = session.get(BASE_URL, params=params, timeout=30)

        if response.status_code == 403:
            print('Failed to fetch data: HTTP 403 Forbidden. Danbooru may require authentication or a different request policy.', flush=True)
            break

        if response.status_code != 200:
            print(f'Failed to fetch data for page {page}. HTTP Status Code: {response.status_code}', flush=True)
            break

        data = response.json()

        if not data:
            print(f'No more data found at page {page}. Stopping.', flush=True)
            break

        for item in data:
            writer.writerow([item['name'], item['post_count']])
            total_rows += 1

        file.flush()

        print(f'Page {page} processed.', flush=True)
        # Sleep to reduce the chance of rate limiting.
        time.sleep(1)

print(f'Data has been written to {csv_filename} ({total_rows} tags)', flush=True)