const express = require('express');
const app = express();
const router = express.Router();
const port = 3010;

app.use(express.static('public'));

app.get('/', (req, res, next) => {
    res.status(200).send();
});

let server = app.listen(port, function () {
    console.log(`AdvWorks web server is running on http://localhost:${port}.`);
});
