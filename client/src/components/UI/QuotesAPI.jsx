import React, { useState, useEffect } from "react";
import axios from "axios";

const QuotesAPI = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await axios.get("http://localhost:3000/quotes");
        setQuote(res.data);
      } catch (err) {
        console.error("Error fetching quote:", err);
      }
    };

    fetchQuote();
  }, []); 

  return (
    <div>
      {quote ? (
        <span>
          <p>"{quote.q}"</p>
          <p>- {quote.a}</p>
        </span>
      ) : (
        <p>Loading quote...</p>
      )}

      <p style={{ fontSize: "0.5rem", marginTop: "1rem" }}>
        Inspirational quotes provided by{" "}
        <a
          href="https://zenquotes.io/"
          target="_blank"
        >
          ZenQuotes API
        </a>
      </p>
    </div>
  );
};

export default QuotesAPI;
