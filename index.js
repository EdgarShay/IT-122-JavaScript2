
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

// Passing for homework 5
// app.get('/', (req, res, next) => {
//   console.log(req.query);
//   Car.find({}).lean()
//     .then((cars) => {
//     // pass items data array to home-page template 
// res.render('home', {items: JSON.stringify(cars)});
//     })
// });



// app.get('/api/cars', (req,res) => {
//   Cars.find({}).lean()
//     .then((cars) => {
//       res.json(cars);})
//     .catch(err =>  {
//       res.status(500).send('Database Error occurred');
//     })
// });

app.get('/api/cars', (req,res) => {
  Cars.find({}).lean()
    .then((cars) => {
      // pass items data array to home-page template 
res.render('home', {items: JSON.stringify(cars)});
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


// Delete

app.get('/api/cars/delete/:id', (req,res) => {
  Cars.deleteOne({ id:req.params.id }).lean()
      .then((cars) => {
         res.json(cars);
      })
      .catch(err => {
          res.status(500).send('Database Error occurred');
      });
});


// app.post('/api/cars/add', (req,res, next) => {
//   // find & update existing item, or add new 
// Cars.updateOne({ id: req.body.id}, req.body, {upsert:true}, (err, result) => {
//           if (err) return next(err);
//           res.json({updated: result.nModified, id: req.body.id});
//       });

// });


//Update
app.post('/api/detail', (req,res, next) => {
  Cars.updateOne({ model: req.body.model}, req.body, {upsert: true}).lean()
  .then((result) => {
      res.json(result)
  })
  .catch(err = next(err))
});


// // Get all items as JSON data
// app.get('/api/items', (req, res) => {
//   const data = getAll();
//   res.json(data);
// });

//Get all items
app.get('/api/items', (req, res, next) => {
    console.log(req.query);
    Cars.find({}).lean()
      .then((cars) => {
        // respond to browser only after db query completes
        res.json(cars);
      })
      .catch(err => next(err))
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