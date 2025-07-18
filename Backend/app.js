const express = require('express');
const bodyParser = require('body-parser');
const { shortenUrl, getOriginalUrl } = require('./utils/Shorturl');
const cors=require('cors')
const app = express();
const port = 8081;
app.use(bodyParser.json());
app.use(cors());

app.post('/shorturls', (req, res) => {
    const { url,validity,shortcode } = req.body;
    
    const shorturl = shortenUrl(url,validity,shortcode);

    res.status(201).json({shorturl });
});
app.get('/shorturls/:shortcode', (req, res) => {
    const { shortcode } = req.params;
    const stats = getOriginalUrl(shortcode, { withStats: true });

    if (!stats) {
        return res.status(404).json({ error: 'Shortcode not found' });
    }

    res.json({
        shortcode: shortcode,
        originalUrl: stats.originalUrl,
        createdAt: stats.createdAt,
        expiryDate: stats.expiryDate,
        totalClicks: stats.clicks.length,
        clicks: stats.clicks.map(click => ({
            timestamp: click.timestamp,
            referrer: click.referrer,
            location: click.location
        }))
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});