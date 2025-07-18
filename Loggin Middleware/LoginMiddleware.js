const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const axios = require("axios");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

async function gettocken() {
  const url = "http://20.244.56.144/evaluation-service/auth";
  const Body = {
    email: "22ve1a6710@sreyas.ac.in",
    name: "bojjanapalli keerthi lochan kumar",
    rollNo: "22ve1a6710",
    accessCode: "NNZDGq",
    clientID: "83873976-27bf-45c3-b227-5ef563874c4c",
    clientSecret: "vCNbJkbgYmrMzrNZ",
  };
  try {
    const response = await axios.post(url, Body);
    const accessToken = response.data;
    console.log("Access Token:", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error fetching access token:", error.message);
    throw error;
  }
}


app.post('/logs',async(req,res)=>{
     try {
        const tocken = await gettocken();
        const accessToken = tocken.access_token
        console.log("Access Token:", accessToken);
        const data = req.body;
        console.log("Received data:", data);
        const headers = {
            'Authorization': `Bearer ${accessToken}`
        };
        const url = "http://20.244.56.144/evaluation-service/logs";
         const response = await axios.post(url, data, { headers });
        console.log(response.data);
        res.status(200).json({
            response: response.data,
        });
    }catch(error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    });
