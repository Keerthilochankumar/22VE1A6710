import React, { useState } from 'react';
import axios from 'axios';

function Shorturl() {
  const [longUrl, setLongUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const[expration,setexpration]=useState('')
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8081/shorturls', {
        url:longUrl,
        validity:validity,
        shortcode:shortcode,
      });
      setShortenedUrl(response.data.shorturl);
      setexpration(response.data.shorturl)
      console.log(response.data.shorturl)
    } catch (error) {
      setShortenedUrl('Error shortening URL');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">URL Shortener</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="url"
              placeholder="Enter your long URL here..."
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={longUrl}
              onChange={e => setLongUrl(e.target.value)}
            />
            <input
              type="text"
              placeholder="validity"
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={validity}
              onChange={e => setValidity(e.target.value)}
            />
            <input
              type="text"
              placeholder="shortcode"
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={shortcode}
              onChange={e => setShortcode(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </form>
          <div className="mt-6">
            <p className="text-gray-600 text-center">
                {shortenedUrl && typeof shortenedUrl === 'object'
                  ? (
                      <>
                        <span>Shortened URL: </span>
                        <a
                          href={shortenedUrl.shortlink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {shortenedUrl.shortlink}
                        </a>
                        <br/>
                      <span>
                        Expration time:
                      </span>
                      <h3>{shortenedUrl.expiry.expirationDate}</h3>
                      </>

                    )
                  : shortenedUrl}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shorturl;
