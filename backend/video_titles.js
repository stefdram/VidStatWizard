const db = require("./model");

// Read GET
video_titles = async (req, res) => {
  const { search_key } = req.query;
  const query = "SELECT ca.Category as Category, VideoId, Ch.Title as desah, v.ChannelId as ChannelId, v.Title, ThumbnailLink, Link FROM Video v JOIN Channel Ch ON (v.ChannelId = Ch.ChannelId) JOIN Categories ca ON (v.CategoryId = ca.CategoryId) WHERE v.Title LIKE ? ORDER BY RAND() LIMIT 12;";
  db.query(query, [`%${search_key}%`], (err, result) => {
    // return res.status(200).send(result);
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).send("Error fetching videos");
    }
    return res.status(200).send(result);
  });
};

fetch_popularity = (req, res) => {
  const youtubeCategory = req.query.category;
  const channel = req.query.channel;

  if (!youtubeCategory || !channel) {
    return res.status(400).send('Category and Channel parameters are required');
  }

  const query = 'CALL Channel_Popularity_Calculator(?, ?)';
  
  db.query(query, [youtubeCategory, channel], (err, results) => {
    if (err) {
      console.error("Error executing stored procedure: ", err);
      return res.status(500).send("Error executing stored procedure");
    }
    return res.status(200).send(results[0]);
  });
};

module.exports = { video_titles, fetch_popularity };