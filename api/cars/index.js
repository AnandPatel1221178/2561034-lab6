//create cars api using express
const express = require('express');
const app = express();
const cors = require('cors'); // Import the CORS middleware

app.use(cors()); // Enable CORS for all routes


app.use(express.json());

const cars = require('./cars.json');

//get all cars
app.get('/cars', (req, res) => {
    res.json(cars);
});

// Define a route handler for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Lucky-Lot Cars API');
  });
  

//get car by id
app.get('/cars/:id', (req, res) => {
    const id = req.params.id;
    const car = cars.find(car => car.id === id);
    res.json(car);
});

//update car
app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === id);
    cars[index] = updatedCar;
    res.json(updatedCar);
});

//delete car

app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;
    const index = cars.findIndex(car => car.id === id);
    if (index !== -1) {
        cars.splice(index, 1);
        res.json({ message: `Car with id ${id} deleted` });
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
});


//add car
const { v4: uuidv4 } = require('uuid');
app.post('/cars', (req, res) => {
    const newCar = req.body;
    newCar.id = uuidv4(); // Generate a unique id for the new car
    cars.push(newCar);
    res.json(newCar);
});

//start app at localhost:3001
app.listen(3001, () => {
    console.log('Server started at http://localhost:3001');
});