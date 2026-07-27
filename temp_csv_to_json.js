const fs = require('fs');
const path = require('path');
const csvPath = path.join('C:', 'Users', 'kmjr0', 'Desktop', 'video game quotes - Sheet1.csv');
const jsonPath = path.join('C:', 'Users', 'kmjr0', 'Desktop', 'video game quotes - Sheet1.json');
const text = fs.readFileSync(csvPath, 'utf8');
const rows = text.split(/\r?\n/).map(line => {
  const row = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === ',' && !inQuotes) {
      row.push(cur);
      cur = '';
      continue;
    }
    cur += ch;
  }
  row.push(cur);
  return row;
});
if (rows.length < 2) {
  throw new Error('CSV file must contain at least two rows.');
}
const header = rows[1];
const records = [];
for (let i = 2; i < rows.length; i++) {
  const row = rows[i];
  if (!row || row.every(cell => cell.trim() === '')) continue;
  while (row.length < header.length) row.push('');
  row.length = header.length;
  const obj = {};
  header.forEach((key, idx) => {
    obj[key] = row[idx] || '';
  });
  records.push(obj);
}
fs.writeFileSync(jsonPath, JSON.stringify(records, null, 2), 'utf8');
console.log(`Wrote ${records.length} records to ${jsonPath}`);
