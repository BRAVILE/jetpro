const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [];

app.post('/register', (req, res) => {
    const { phoneNumber } = req.body;
    const user = { phoneNumber, wallet: 0 };
    users.push(user);
    res.send('User registered!');
});

app.post('/addMoney', (req, res) => {
    const { phoneNumber, amount } = req.body;
    const user = users.find(u => u.phoneNumber === phoneNumber);
    if (user) {
        user.wallet += amount;
        res.send(`Added ${amount} KES to wallet.`);
    } else {
        res.status(404).send('User not found.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
