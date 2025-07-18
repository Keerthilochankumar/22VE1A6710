const crypto = require('crypto');

const urlDatabase = new Map();

function shortenUrl(originalUrl,validity,shortCode) {

    const shorturl = crypto.randomBytes(4).toString('hex');
    const expirationDate = new Date(Date.now() + validity * 60000);
    urlDatabase.set(shortCode, {
        originalUrl,
        expirationDate,
        shorturl
    });
    
    const data={"shortlink": `https://localhost:5000/${shortCode}`,
                    "expiry":{expirationDate}};

    return data;

}

function getOriginalUrl(shortCode) {
    return urlDatabase.get(shortCode);
}

module.exports = { shortenUrl, getOriginalUrl };