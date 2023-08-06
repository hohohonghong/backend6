const http = require('http');
const fs = require('fs');

let clubData = {
  clubName: "COMP",
  clubLocation: 407,
  clubMembers: ["윤재선", "한윤호"]
};

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    if (req.url === '/') {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });

      return req.on('end', () => {
        console.log('POST 본문(Body):', body);
        try {
          const { name } = JSON.parse(body);

          if (!name || typeof name !== 'string') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid name data. Expected a string.' }));
            return;
          }

          clubData.clubMembers.push(name);
          fs.writeFileSync('clubData.json', JSON.stringify(clubData, null, 2));

          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(clubData));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Invalid JSON data' }));
        }
      });
    }
  } else if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(clubData));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

server.listen(3001, () => {
  console.log('서버가 3031번 포트에서 실행 중입니다.');
  console.log('good');
});
