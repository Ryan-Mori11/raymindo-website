import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('====================================================');
console.log('🚢 Starting PT RAYMINDO INTERBENUA LINE Dev Suite...');
console.log('====================================================');

// Path to node & npm
const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';

// 1. Start Express Backend
const nodePath = 'C:\\Program Files\\nodejs';
const childEnv = { ...process.env, PATH: `${nodePath};${process.env.PATH || ''}` };

const serverProcess = spawn('node', ['server/server.js'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: isWin,
  env: childEnv
});

// 2. Start Vite Frontend
const clientProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: 'inherit',
  shell: isWin,
  env: childEnv
});

// 3. Start Cloudflare Tunnel
const cloudflaredBin = path.join(__dirname, 'cloudflared.exe');
let tunnelProcess = null;

if (fs.existsSync(cloudflaredBin)) {
  console.log('🌐 Starting Cloudflare Public Tunnel...');
  tunnelProcess = spawn(cloudflaredBin, ['tunnel', '--url', 'http://localhost:3000'], {
    cwd: __dirname,
    env: childEnv
  });

  const extractUrl = (data) => {
    const text = data.toString();
    const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
    if (match) {
      const publicUrl = match[0];
      fs.writeFileSync(path.join(__dirname, 'public_tunnel_url.txt'), publicUrl, 'utf8');
      console.log('\n============================================================');
      console.log(`🚀 PUBLIC SHARE URL: ${publicUrl}`);
      console.log('============================================================\n');
    }
  };

  tunnelProcess.stdout.on('data', extractUrl);
  tunnelProcess.stderr.on('data', extractUrl);
}

function handleExit(code) {
  try {
    if (serverProcess && !serverProcess.killed) serverProcess.kill();
    if (clientProcess && !clientProcess.killed) clientProcess.kill();
    if (tunnelProcess && !tunnelProcess.killed) tunnelProcess.kill();
  } catch (e) {}
  process.exit(code || 0);
}

process.on('SIGINT', () => handleExit(0));
process.on('SIGTERM', () => handleExit(0));
serverProcess.on('close', (code) => console.log(`[Backend Server exited with code ${code}]`));
clientProcess.on('close', (code) => console.log(`[Frontend Client exited with code ${code}]`));
if (tunnelProcess) {
  tunnelProcess.on('close', (code) => console.log(`[Cloudflare Tunnel exited with code ${code}]`));
}
