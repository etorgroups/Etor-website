import fs from 'fs';

const files = fs.readdirSync('scripts').filter(f => f.startsWith('_tmp-audit2-') && f.endsWith('.png'));
for (const f of files) {
  const buf = fs.readFileSync(`scripts/${f}`);
  // PNG IHDR: width at offset 16, height at offset 20 (big-endian 4 bytes each)
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  console.log(f, width, height);
}
