const crypto = require('crypto');

const urlDatabase = new Map();

function shortenUrl(originalUrl, validity, shortCode) {
    const shorturl = crypto.randomBytes(4).toString('hex');
    const expirationDate = new Date(Date.now() + validity * 60000);
    const createdAt = new Date();
    

    urlDatabase.set(shortCode, {
        originalUrl,
        expirationDate,
        createdAt,
        shorturl,
        clicks: []
    });

    
    const data = {
        shortlink: `https://localhost:5000/${shortCode}`,
        expiry: { expirationDate }
    };
    return data;
}


function getOriginalUrl(shortCode) {
    const stats = urlDatabase.get(shortCode);
    if (!stats) return null;

    return {
        shortcode: shortCode,
        originalUrl: stats.originalUrl,
        createdAt: stats.createdAt,
        expiryDate: stats.expirationDate,
        totalClicks: stats.clicks.length,
        clicks: stats.clicks.map(click => ({
            timestamp: click.timestamp,
            referrer: click.referrer,
            location: click.location
        }))
    };
}

module.exports = { shortenUrl, getOriginalUrl };