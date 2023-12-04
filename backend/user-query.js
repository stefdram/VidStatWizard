const db = require("./model");

// Read GET
getAllUsers = async (req, res) => {
  const query = "SELECT * FROM User";
  db.query(query, (err, result) => {
    // return res.status(200).send(result);
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).send("Error fetching users");
    }
    return res.status(200).send(result);
  });
};

// Create POST
createUser = (req, res) => {
  const { UserId, Email, Password, Name } = req.body;
  const checkUser = "SELECT * FROM User WHERE UserId = ? OR Email = ?";

  db.query(checkUser, [UserId, Email], (err, checkResult) => {
    if (err) {
      console.error("Error: ", err);
      return res.status(500).send("Error checking user");
    }

    // Check if any user exists with the same UserId or Email
    if (checkResult.length > 0) {
      return res.status(409).send("UserId or Email already exists");
    }

    // No existing user found, proceed with creating new user
    const insertQuery = "INSERT INTO User VALUES (?, ?, ?, ?)";
    db.query(
      insertQuery,
      [UserId, Email, Password, Name],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error: ", insertErr);
          return res.status(500).send("Error creating user");
        }
        return res.status(200).send("User created successfully");
      }
    );
  });
};

// Delete DELETE
deleteUser = (req, res) => {
  const UserId  = req.params.userid;
  const checkUser = "SELECT * FROM User WHERE UserId = ?";
  const deleteQuery = "DELETE FROM User WHERE UserId = ?";
  db.query(checkUser, [UserId], (err, result) => {
    if (err) {
      console.error("Error: ", err);
      return res.status(500).send("Error checking user");
    }
    // Check if any user exists with the same UserId
    if (result.length == 0) {
      return res.status(409).send("UserId doesn't exists");
    }

    db.query(deleteQuery, [UserId], (err, result) => {
      if (err) {
        console.error("Error: ", err);
        return res.status(500).send("Error deleting User");
      }
      return res.status(200).send(`User '${UserId}' deleted successfully!`);
    });
  });
};

// Update PUT
updateUser = (req, res) => {
  const { UserId, Email, Name, Password } = req.body;
  const checkUser = "SELECT * FROM User WHERE UserId = ?";
  const checkEmail = "SELECT * FROM User WHERE Email = ?";
  const updateQuery =
    "UPDATE User SET Email = ?, Name = ?, Password = ? WHERE UserId = ?";

  db.query(checkUser, [UserId], (err, result) => {
    if (err) {
      console.error("Error: ", err);
      return res.status(500).send("Error checking user");
    }
    // Check if any user exists with the same UserId
    if (result.length == 0) {
      return res.status(409).send("UserId doesn't exists");
    }
    db.query(checkEmail, [Email], (err, result) => {
      if (err) {
        console.error("Error: ", err);
        return res.status(500).send("Error checking email");
      }
      // Check if any user exists with the same Email
      if (result.length > 0) {
        return res.status(409).send("Email already exists");
      }

      db.query(updateQuery, [Email, Name, Password, UserId], (err, result) => {
        if (err) {
          console.error("Error: ", err);
          return res.status(500).send("Error updating User");
        }
        return res.status(200).send(`User '${UserId}' updated successfully!`);
      });
    });
  });
};

module.exports = { getAllUsers, createUser, deleteUser, updateUser };