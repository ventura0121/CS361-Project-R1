// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Dummy Data
let userCards = [
    { id: 1, name: 'Visa', number: '1234 5678 9012 3456', expiration: '12/24' },
    { id: 2, name: 'MasterCard', number: '2345 6789 0123 4567', expiration: '10/23' }
];

// Routes
app.get('/', (req, res) => {
    res.redirect('/mycards'); // Redirect to My Cards page directly
});

app.get('/mycards', (req, res) => {
    res.render('layout', { title: 'My Cards', page: 'mycards', cards: userCards });
});

// Handle adding a new card
app.post('/mycards/add', (req, res) => {
    const newCard = {
        id: userCards.length + 1,
        name: req.body.name,
        number: req.body.number,
        expiration: req.body.expiration
    };
    userCards.push(newCard);
    res.redirect('/mycards'); // Redirect back to the My Cards page
});

// Handle editing an existing card
app.post('/mycards/edit', (req, res) => {
    const { id, name, number, expiration } = req.body;
    const card = userCards.find(card => card.id == id);
    if (card) {
        card.name = name;
        card.number = number;
        card.expiration = expiration;
    }
    res.redirect('/mycards'); // Redirect back to the My Cards page
});

// Handle deleting a card
app.post('/mycards/delete/:id', (req, res) => {
    const cardId = parseInt(req.params.id);
    userCards = userCards.filter(card => card.id !== cardId); // Remove the card with the specified id
    res.redirect('/mycards'); // Redirect back to the My Cards page
});

app.get('/apply', (req, res) => {
    res.render('layout', { title: 'Apply for Card', page: 'apply' });
});

app.get('/recommendations', (req, res) => {
    res.render('layout', { title: 'Recommendations', page: 'recommendations' });
});

app.get('/reviews', (req, res) => {
    res.render('layout', { title: 'Reviews', page: 'reviews' });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
