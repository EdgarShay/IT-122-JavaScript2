// What this does it pulls in the model and establish the conection
// to your database and exposes all the methods that Mongodb supports 
//on a collection.


// The query will return either an error or a result

'use strict'

import { Cars } from "./models/cars.js";

// return all records
Cars.find({}).lean()
  .then((cars) => {
    console.log(cars);
  })
  .catch(err => console.log(err));
