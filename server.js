const WebSocket = require('ws');
const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server Alul Aktif!\n');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client terhubung');
  ws.on('message', (message) => {
    console.log('Pesan:', message.toString());
    try {
      const data = JSON.parse(message);
      if (data.type === 'validate') {
        ws.send(JSON.stringify({
          status: "success",
          message: "Login Berhasil",
          role: "admin"
        }));
      }
    } catch (e) { console.log('Error:', e.message); }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on 0.0.0.0:${PORT}`);
});