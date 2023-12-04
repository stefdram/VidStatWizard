const db = require("./model");

// Read GET
video_titles = async (req, res) => {
  const { search_key } = req.body;
  const query = "SELECT Title , ThumbnailLink , Tags FROM Video WHERE Title LIKE ? ORDER BY RAND() LIMIT 10;";
  db.query(query, [`%${search_key}%`], (err, result) => {
    // return res.status(200).send(result);
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).send("Error fetching users");
    }
    return res.status(200).send(result);
  });
};

module.exports = { video_titles }