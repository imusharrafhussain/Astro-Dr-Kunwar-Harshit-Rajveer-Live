const fs = require('fs');
const path = require('path');

const filesToProcess = [];
function getFiles(dir) {
    const items = fs.readdirSync(dir);
    for (let item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            getFiles(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            filesToProcess.push(fullPath);
        }
    }
}

getFiles('a:/AstroBharatAI/Dr_Harshit/Aacharya-website/client/src');

// Regex to capture the title/name and then any price field
// This might need refinement, let's just use a simpler approach:
// Read each file and use a global regex to find objects that contain price.
// Since it's unstructured, we will look for combinations of name/title and price/oldPrice

const results = new Map();

filesToProcess.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    
    // Look for objects defined as { id: ..., name: '...', price: ... } or similar
    // We'll extract anything that looks like price: \d+ or price: '...' or oldPrice: ... or originalPrice: ...
    // And try to find the nearest title or name.
    
    // Let's do a simple line-by-line or block-by-block parsing.
    const blocks = content.split('}');
    for (let block of blocks) {
        if (block.includes('price') || block.includes('oldPrice') || block.includes('originalPrice')) {
            let nameMatch = block.match(/(?:title|name|shortTitle)\s*:\s*['"]([^'"]+)['"]/);
            let priceMatch = block.match(/(?:oldPrice|originalPrice)\s*:\s*['"]?([₹\d,\.]+)['"]?/);
            if (!priceMatch) {
               priceMatch = block.match(/(?:price)\s*:\s*['"]?([₹\d,\.]+)['"]?/);
            }
            if (nameMatch && priceMatch) {
                let name = nameMatch[1];
                let price = priceMatch[1];
                results.set(name, price);
            }
        }
    }
});

for (let [name, price] of results.entries()) {
    console.log(`${name} : ${price}`);
}
