const fs = require('fs');
const path = require('path');
const { AceScraper } = require('../lib/scrapers/ace.js');
const { CentralScraper } = require('../lib/scrapers/central.js');

async function runScrapers() {
  try {
    // Initialize scrapers
    const scrapers = [
      new AceScraper(),
      new CentralScraper(),
    ];

    // Run all scrapers and combine results
    const allListings = [];
    for (const scraper of scrapers) {
      console.log(`Running ${scraper.source} scraper...`);
      try {
        const listings = await scraper.extract();
        allListings.push(...listings);
        console.log(`Got ${listings.length} listings from ${scraper.source}`);
      } catch (error) {
        console.error(`Error running ${scraper.source} scraper:`, error);
      }
    }

    // Save results
    const outputDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'all.json');
    fs.writeFileSync(outputPath, JSON.stringify(allListings, null, 2));
    console.log(`Saved ${allListings.length} listings to ${outputPath}`);

  } catch (error) {
    console.error('Error running scrapers:', error);
    process.exit(1);
  }
}

// Run scrapers if called directly
if (require.main === module) {
  runScrapers();
}
