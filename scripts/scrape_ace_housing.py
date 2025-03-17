import requests
from bs4 import BeautifulSoup
import json
import re
import time
from typing import Dict, List, Optional

class AceHousingScraper:
    def __init__(self):
        self.base_url = "https://www.acefamilyhousing.com"
        self.listings_url = f"{self.base_url}/rentals/"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }

    def get_soup(self, url: str) -> BeautifulSoup:
        response = requests.get(url, headers=self.headers)
        return BeautifulSoup(response.text, 'html.parser')

    def extract_property_id(self, url: str) -> str:
        match = re.search(r'/rental/(\d+[a-z]+-[^/]+)/', url)
        return match.group(1) if match else ""

    def extract_location(self, url: str) -> str:
        match = re.search(r'in-([^/]+)/', url)
        return match.group(1).replace('-', ' ').title() if match else ""

    def extract_property_type(self, url: str) -> str:
        types = ['apartment', 'house', 'duplex']
        for type_ in types:
            if type_ in url.lower():
                return type_
        return "apartment"  # default to apartment if not found

    def extract_nearest_base(self, description: str) -> Optional[str]:
        bases = {
            'kadena': 'Kadena',
            'foster': 'Foster',
            'hansen': 'Hansen',
            'schwab': 'Schwab',
            'courtney': 'Courtney',
            'mcas futenma': 'MCAS Futenma',
            'torii': 'Torii'
        }
        
        description_lower = description.lower()
        for base_key, base_name in bases.items():
            if base_key in description_lower:
                return base_name
        return None

    def extract_property_details(self, soup: BeautifulSoup) -> Dict:
        features = soup.find(text=re.compile('Property Features')).find_parent().find_next_siblings('li')
        details = {}
        
        for feature in features:
            text = feature.get_text().strip()
            if 'bed' in text.lower():
                details['beds'] = int(re.search(r'(\d+)', text).group(1))
            elif 'bath' in text.lower():
                details['baths'] = int(re.search(r'(\d+)', text).group(1))
            elif 'floor area' in text.lower():
                sqft = int(re.search(r'(\d+)', text).group(1))
                details['sqm'] = round(sqft * 0.092903)  # convert sqft to sqm
        
        return details

    def extract_images(self, soup: BeautifulSoup) -> List[str]:
        images = []
        for img in soup.select('img.attachment-thumbnail'):
            full_img_url = img.parent['href'] if img.parent.name == 'a' else img['src']
            if full_img_url and not full_img_url.endswith('150x150.jpg'):
                images.append(full_img_url)
        return images

    def scrape_listing(self, url: str) -> Dict:
        soup = self.get_soup(url)
        
        # Basic property info
        property_id = self.extract_property_id(url)
        location = self.extract_location(url)
        property_type = self.extract_property_type(url)
        
        # Get title and description
        title = soup.find('h2').get_text().strip()
        description = soup.find('ul').get_text().strip()
        
        # Get property details
        details = self.extract_property_details(soup)
        
        # Get images
        images = self.extract_images(soup)
        
        # Get nearest base
        nearest_base = self.extract_nearest_base(description)

        return {
            'id': property_id,
            'title': title,
            'location': location,
            'propertyType': property_type,
            'nearestBase': nearest_base,
            'beds': details.get('beds', 0),
            'baths': details.get('baths', 0),
            'sqm': details.get('sqm', 0),
            'images': images,
            'description': description,
            'source_url': url
        }

    def scrape_all_listings(self) -> List[Dict]:
        soup = self.get_soup(self.listings_url)
        listings = []
        
        # Find all rental listing links
        for link in soup.find_all('a', href=re.compile(r'/rental/\d+[a-z]+-')):
            listing_url = link['href']
            if listing_url not in [l['source_url'] for l in listings]:
                try:
                    listing = self.scrape_listing(listing_url)
                    listings.append(listing)
                    # Be nice to their server
                    time.sleep(1)
                except Exception as e:
                    print(f"Error scraping {listing_url}: {str(e)}")
        
        return listings

    def save_listings(self, filename: str = 'ace_listings.json'):
        listings = self.scrape_all_listings()
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(listings, f, indent=2, ensure_ascii=False)
        return listings

if __name__ == "__main__":
    scraper = AceHousingScraper()
    listings = scraper.save_listings()
    print(f"Scraped {len(listings)} listings")
