import express from 'express';
import { getAll, getItem } from './data.js';

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
  const items = getAll();
  res.render('home', { items });
});

// Detail route
app.get('/detail', (req, res) => {
  const itemId = req.query.id;
  const item = getItem(Number(itemId));

  if (item) {
    res.render('detail', { item });
  } else {
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



// const http = require('http');
// const url = require('url');

// const server = http.createServer((req, res) => {
//   const { pathname } = url.parse(req.url);

//   if (pathname === '/') {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Welcome to the home page!');
//   } else if (pathname === '/about') {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Edgar.');
//   } else {
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.end('404 - Page not found');
//   }
// });

// const port = 3000;
// server.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });