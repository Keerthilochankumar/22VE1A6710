const express = require('express');
const bodyParser = require('body-parser');
const { shortenUrl, getOriginalUrl } = require('./utils/Shorturl');
const app = express();
const port = 5000;
app.use(bodyParser.json());


app.post('/shorturls', (req, res) => {
    const { url,validity,shortcode } = req.body;
    
    const shorturl = shortenUrl(url,validity,shortcode);

    res.status(201).json({shorturl });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});