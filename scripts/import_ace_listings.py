import json
from typing import List, Dict
import random
import os

def load_ace_listings(filename: str = 'ace_listings.json') -> List[Dict]:
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

def convert_to_mock_listing(ace_listing: Dict, start_id: int = 1000) -> Dict:
    # Generate a random price between 120,000 and 450,000
    price = random.randint(120, 450) * 1000
    
    return {
        'id': start_id,
        'title': ace_listing['title'],
        'location': ace_listing['location'],
        'price': price,
        'beds': ace_listing['beds'],
        'baths': ace_listing['baths'],
        'sqm': ace_listing['sqm'],
        'image': ace_listing['images'][0] if ace_listing['images'] else '/images/bedroom.jpg',
        'nearestBase': ace_listing['nearestBase'],
        'propertyType': ace_listing['propertyType']
    }

def generate_mock_listings_code(listings: List[Dict]) -> str:
    listings_str = json.dumps(listings, indent=2, ensure_ascii=False)
    
    return f"""const mockListings: Listing[] = {listings_str};

export default mockListings;"""

def main():
    # Load the scraped listings
    ace_listings = load_ace_listings()
    
    # Convert to our format
    mock_listings = [
        convert_to_mock_listing(listing, start_id=1000 + i)
        for i, listing in enumerate(ace_listings)
    ]
    
    # Generate the TypeScript code
    ts_code = generate_mock_listings_code(mock_listings)
    
    # Save to a new file
    output_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'app', 'listings', 'mockListings.ts')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_code)
    
    print(f"Generated {len(mock_listings)} mock listings")

if __name__ == "__main__":
    main()
