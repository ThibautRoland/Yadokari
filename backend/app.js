const express = require('express');
const bodyParser = require('body-parser'); // Middleware for parsing JSON

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Route to handle HTTP GET requests
app.get('/hello', (req, res) => {
    res.send('Hello, Express!');
});

// Sample data for HTTP GET request example

const items2 = [
    {
        id: 1,
        name: 'item1'
    },
    {
        id: 2,
        name: 'item2'
    },
    {
        id: 3,
        name: 'item3'
    }
]

app.get('/items', (req, res) => {
    res.json(items2);
});

// Route to handle HTTP POST requests
app.post('/items', (req, res) => {
    const { item, id } = req.body;
    items2.push({ item, id });
    res.json(items2);
});

// Route to handle HTTP PUT requests
app.put('/items/:id', (req, res) => {
    const itemId = req.params.id;

    const updatedItem = req.body; // Use the whole body as the updated item
    const itemIndex = items2.findIndex(item => item.id == itemId); // Find the index of the item to update


    if (itemIndex !== -1) {
        items2[itemIndex] = updatedItem;
        res.json(items2);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Route to handle HTTP DELETE requests
app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id); // Parse the ID to an integer
    const itemIndex = items2.findIndex(item => item.id === itemId); // Find the index of the item to delete

    if (itemIndex !== -1) {
        items2.splice(itemIndex, 1); // Remove 1 item at the found index
        res.json(items2);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
