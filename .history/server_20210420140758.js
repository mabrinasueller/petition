const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log('a request to the / route was made');
});

app.listen(8080, () => console.log('Server is listening'));
