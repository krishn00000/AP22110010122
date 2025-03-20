const express = require('express');
const app = express();

const windowSize = 10;
let storedNumbers = [];


const updateStoredNumbers = (number) => {
    if (!storedNumbers.includes(number)) {
        storedNumbers.push(number);
    }
    if (storedNumbers.length > windowSize) {
        storedNumbers.shift(); 
    }
};

const calculateAverage = (numbers) => {
    const sum = numbers.reduce((total, num) => total + num, 0);
    return numbers.length ? parseFloat((sum / numbers.length).toFixed(2)) : 0;
};


app.get('/', (req, res) => {
    res.send('Server is running!');
});


app.get('/numbers/:numberId', (req, res) => {
    const { numberId } = req.params;

    
    if (!['primes', 'fibo', 'e', 'rand'].includes(numberId)) {
        return res.status(400).json({ error: 'Invalid number ID. Use "p", "f", "e", or "r".' });
    }

    try {
        
        const fetchedNumber = Math.floor(Math.random() * 100);

        const windowPrevState = [...storedNumbers];

        updateStoredNumbers(fetchedNumber);

        const average = calculateAverage(storedNumbers);

        res.json({
            windowPrevState,
            windowCurrState: [...storedNumbers],
            numbers: [...storedNumbers],
            avg: average,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
