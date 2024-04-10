const cars = [
    {
        "id": "1",
        "make": "Toyota",
        "model": "Camry",
        "year": 2022,
        "price": 250000
    },
    {
        "id": "2",
        "make": "Honda",
        "model": "Accord",
        "year": 2021,
        "price": 200000
    },
    {
        "id": "3",
        "make": "Ford",
        "model": "Mustang",
        "year": 2020,
        "price": 300000
    }
];

module.exports = async function (context, req) {
    if (req.method === 'GET') {
        context.res.json(cars);
    } 
    else if (req.method === 'POST') {
        try {
            const newCar = req.body;
            newCar.id = (cars.length + 1).toString(); // Generate a unique id for the new car
            cars.push(newCar);
            context.res.status(201).json(newCar);
        } catch (error) {
            context.res.status(500).json({ error: 'Internal Server Error' });
        }
    } 
    else if (req.method === 'DELETE') {
        try {
            // const id = context.bindingData.id; // Extract id from request parameters
            const id =  context.bindingData.carId;
            // console.log('Received DELETE request for ID:', id);
            // console.log('Existing cars:', cars);
            // const index = cars.findIndex(car => car.id === id);
            // if (index !== -1) {
            //     cars.splice(index, 1);
            //     context.res.status(200).json({ message: `Car with id ${id} deleted` });
            // } 
            // cars.splice(index, 1);
            const car = cars.find(car => car.id == id)
            if (car) {
                const index = cars.indexOf(car)
                cars.splice(index, 1)
                context.res.status(200).json({ message: `Car with id ${id} deleted`,  });
            }
        } catch (error) {
            console.error('Error handling DELETE request:', error);
            context.res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    else {
        context.res.status(404).json({ error: 'Not Found' });
    }
};
