const db = require("./model");

// Read GET
video_titles = async (req, res) => {
  const { search_key } = req.query;
  const query = "SELECT VideoId, Ch.Title as desah, v.Title, ThumbnailLink, Link FROM Video v JOIN Channel Ch ON (v.ChannelId = Ch.ChannelId) WHERE v.Title LIKE ? ORDER BY RAND() LIMIT 12;";
  db.query(query, [`%${search_key}%`], (err, result) => {
    // return res.status(200).send(result);
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).send("Error fetching videos");
    }
    return res.status(200).send(result);
  });
};

module.exports = { video_titles };