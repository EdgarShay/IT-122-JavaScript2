import mongoose from 'mongoose';
const { Schema } = mongoose;

import { connectionString } from "../models/credentials.js";


mongoose.connect(connectionString, {
    dbName: 'it-projects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const carsSchema = new Schema({
//  title: { type: String, required: true },
 id: {type:String, required: true }, 
 carModel: String,
 color: String,
 price: String,
 year: String,
});


export const Cars = mongoose.model('Cars', carsSchema);