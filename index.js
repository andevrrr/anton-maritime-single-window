const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('There are 42 portcalls');
})

console.log("There are 42 portcalls");

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
