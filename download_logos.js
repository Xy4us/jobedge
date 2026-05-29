const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'logos');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const logos = [
  { name: 'gsk',          domain: 'gsk.com' },
  { name: 'deloitte',     domain: 'deloitte.com' },
  { name: 'pwc',          domain: 'pwc.com' },
  { name: 'apple',        domain: 'apple.com' },
  { name: 'google',       domain: 'google.com' },
  { name: 'bp',           domain: 'bp.com' },
  { name: 'hsbc',         domain: 'hsbc.com' },
  { name: 'goldmansachs', domain: 'gs.com' },
  { name: 'jpmorgan',     domain: 'jpmorgan.com' },
  { name: 'axa',          domain: 'axa.com' },
  { name: 'amazon',       domain: 'amazon.com' },
  { name: 'meta',         domain: 'meta.com' },
  { name: 'ibm',          domain: 'ibm.com' },
  { name: 'oracle',       domain: 'oracle.com' },
  { name: 'bbc',          domain: 'bbc.co.uk' },
  { name: 'bt',           domain: 'bt.com' },
  { name: 'shell',        domain: 'shell.com' },
  { name: 'tesco',        domain: 'tesco.com' },
  { name: 'asda',         domain: 'asda.com' },
  { name: 'linklaters',   domain: 'linklaters.com' },
  { name: 'aviva',        domain: 'aviva.com' },
  { name: 'royalmail',    domain: 'royalmail.com' },
  { name: 'homeoffice',   domain: 'homeoffice.gov.uk' },
  { name: 'nhs',          domain: 'nhs.uk' },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
        const redirectUrl = response.headers.location;
        console.log(`  → Redirecting to: ${redirectUrl}`);
        downloadFile(redirectUrl, dest).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }

      const contentType = response.headers['content-type'] || '';
      if (!contentType.includes('image') && !contentType.includes('png') && !contentType.includes('jpeg') && !contentType.includes('svg')) {
        reject(new Error(`Not an image: ${contentType} for ${url}`));
        return;
      }

      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(dest);
        if (stats.size < 500) {
          fs.unlinkSync(dest);
          reject(new Error(`File too small (${stats.size} bytes) - likely not a valid logo`));
        } else {
          resolve(stats.size);
        }
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    });

    request.on('error', reject);
    request.setTimeout(15000, () => {
      request.abort();
      reject(new Error('Request timed out'));
    });
  });
}

async function tryDownload(name, domain) {
  const destPng = path.join(outputDir, `${name}.png`);

  // Try different API sources in order
  const sources = [
    `https://logo.clearbit.com/${domain}?size=200`,
    `https://logos.hunter.io/${domain}`,
    `https://api.companyenrich.com/logo/${domain}`,
    `https://img.logo.dev/${domain}?token=pk_YrMGmqZbRkaeW0VBGRJk-g`,
  ];

  for (const url of sources) {
    try {
      console.log(`  Trying: ${url}`);
      const size = await downloadFile(url, destPng);
      console.log(`  ✓ Success! Saved ${name}.png (${size} bytes)`);
      return true;
    } catch (err) {
      console.log(`  ✗ Failed: ${err.message}`);
    }
  }

  console.log(`  ✗✗ ALL sources failed for ${name} (${domain})`);
  return false;
}

async function main() {
  console.log(`\nDownloading logos to: ${outputDir}\n`);
  let success = 0;
  let failed = [];

  for (const logo of logos) {
    console.log(`\n[${logo.name}] (${logo.domain})`);
    const ok = await tryDownload(logo.name, logo.domain);
    if (ok) success++;
    else failed.push(logo.name);
  }

  console.log(`\n\n=== DONE ===`);
  console.log(`✓ Success: ${success}/${logos.length}`);
  if (failed.length > 0) {
    console.log(`✗ Failed: ${failed.join(', ')}`);
  }
  console.log(`\nCheck public/logos/ for downloaded files.`);
}

main().catch(console.error);
