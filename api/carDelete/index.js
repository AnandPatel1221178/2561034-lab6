module.exports = async function (context, req) {
    if (req.method === 'DELETE') {
        try {
            const id = req.params.id; // Extract id from request parameters
            console.log('Received DELETE request for ID:', id);
            console.log('Existing cars:', cars);
            const car = cars.find(car => car.id === id);
            // const index = cars.find(car => car.id === id);
            if (car) {
                const index = cars.indexOf(car);
                cars.splice(index, 1);
                context.res.status(200).json({ message: `Car with id ${id} deleted` });
            } else {
                context.res.status(404).json({ message: 'Car not found' });
            }
        } catch (error) {
            console.error('Error handling DELETE request:', error);
            context.res.status(500).json({ error: 'Internal Server Error', cars });
        }
    }

    else {
        context.res.status(404).json({ error: 'Not Found' });
    }

}