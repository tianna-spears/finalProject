const axios = require('axios')

const getQuotes = async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/quotes");
    const quote = response.data[0];
    res.status(200).json(quote);
  } catch (err) {
    console.error("Error fetching quote:", err.message);
    res.status(500).send("Failed to fetch quote");
  }
};

module.exports = getQuotes;
