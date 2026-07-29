import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvPath = path.join('C:', 'Users', 'kmjr0', 'Desktop', 'video game quotes - Sheet1.csv');
const outputPath = path.join(__dirname, '..', 'src', 'data', 'videoGameQuotes.js');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(field);
      field = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') {
        i += 1;
      }
      row.push(field);
      if (row.some((value) => value !== '')) {
        rows.push(row);
      }
      row = [];
      field = '';
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((value) => value !== '')) {
      rows.push(row);
    }
  }

  return rows;
}

function normalize(value) {
  const trimmed = (value || '').trim();
  if (!trimmed || trimmed.toLowerCase() === 'null') {
    return null;
  }
  return trimmed;
}

const csvText = fs.readFileSync(csvPath, 'utf8');
const rows = parseCsv(csvText);
const headerIndex = rows.findIndex((row) => row.some((cell) => cell.trim().toLowerCase() === 'quote'));

if (headerIndex === -1) {
  throw new Error('Could not find the CSV header row.');
}

const headers = rows[headerIndex].map((header) => header.trim());
const items = [];

for (let index = headerIndex + 1; index < rows.length; index += 1) {
  const row = rows[index];
  if (!row || row.every((value) => (value || '').trim() === '')) {
    continue;
  }

  const entry = {};
  headers.forEach((header, headerIndex) => {
    entry[header] = normalize(row[headerIndex]);
  });

  items.push({
    quote: entry.Quote || '',
    game: entry.Game || '',
    platform: entry.Platform || '',
    year: entry.Year || '',
    image: entry.Image || '',
    voice: entry['Voice Quote'] || null,
  });
}

const fileContent = `export const videoGameQuotes = ${JSON.stringify(items, null, 2)}\nexport default videoGameQuotes;\n`;
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Wrote ${items.length} items to ${outputPath}`);
