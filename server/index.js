const express = require("express")
const app = express()
const PORT = process.env.port || 3000

app.listen(PORT, () => {
    console.log('App listening on port 3000!');
});