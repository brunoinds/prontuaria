import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, 'dist');

if (!fs.existsSync(distPath)) {
  console.error(
    `No build at ${distPath}. Run "npm run build" before starting the server.`,
  );
  process.exit(1);
}

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.static(distPath));

app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Serving ${distPath} at http://localhost:${port}`);
});
