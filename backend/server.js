const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/check-interactions", async (req, res) => {
  const medications = req.body.medications;

  try {
    const response = await fetch("https://api.drugbank.com/v1/drug_interactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.DRUGBANK_API_KEY
      },
      body: JSON.stringify({
        drugs: medications
      })
    });

    const data = await response.json();

    res.json({
      interactions: data.interactions || []
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch interactions" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});