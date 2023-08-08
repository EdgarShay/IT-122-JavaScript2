
import cors from 'cors';

import { Cars } from "./models/cars.js";

import express from 'express';
import { getAll, getItem, addItem, updateItem, deleteItem } from './data.js';

const app = express();
const port = 3000;

// Used to parse JSON bodies
app.use(express.json());
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route


// support access from other domains
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.get('/api/cars', (req,res) => {
  Cars.find({}).lean()
    .then((cars) => {
      res.json(cars);})
    .catch(err =>  {
      res.status(500).send('Database Error occurred');
    })
});


app.get('/api/cars/:id', (req,res) => {
  Cars.findOne({ id:req.params.id }).lean()
      .then((cars) => {
         res.json(cars);
      })
      .catch(err => {
          res.status(500).send('Database Error occurred');
      });
});


app.get('/api/cars/delete/:id', (req,res) => {
  Cars.deleteOne({ id:req.params.id }).lean()
      .then((cars) => {
         res.json(cars);
      })
      .catch(err => {
          res.status(500).send('Database Error occurred');
      });
});


app.get('/api/cars/add/:id', (req,res) => {
  Cars.addOne({ id:req.params.id }).lean()
      .then((cars) => {
         res.json(cars);
      })
      .catch(err => {
          res.status(500).send('Database Error occurred');
      });
});


app.get('/api/cars/add/update/:id', (req,res) => {
  Cars.updateOne({ id:req.params.id }).lean()
      .then((cars) => {
         res.json(cars);
      })
      .catch(err => {
          res.status(500).send('Database Error occurred');
      });
});








// Get all items as JSON data
app.get('/api/items', (req, res) => {
  const data = getAll();
  res.json(data);
});

// Get a single item as JSON data
app.get('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = getItem(itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Delete an item
app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const result = deleteItem(itemId);
  if (result) {
    res.json({ message: 'Item deleted successfully' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Add or update an item
app.post('/api/items', (req, res) => {
  const { id, name, description, price } = req.body;
  if (id) {
    const result = updateItem({ id, name, description, price });
    if (result) {
      res.json({ message: 'Item updated successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } else {
    const newItem = addItem({ name, description, price });
    if (newItem) {
      res.json({ message: 'Item added successfully', newItem });
    } else {
      res.status(500).json({ message: 'Failed to add item' });
    }
  }
});


// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
  // res.send('Hello Node API')


  Cars.find({}).lean()
  .then((cars) => {
    console.log(cars);
    res.render('home', { items: cars });

  })
  .catch(err => console.log(err));


});

// Detail route
app.get('/detail', (req, res) => {
  const itemId = req.query.id;
  const item = getItem(Number(itemId));

  
    res.render('detail', { item });
  
  
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