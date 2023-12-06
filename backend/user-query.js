const db = require("./model");
const jwt = require("jsonwebtoken");

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
  var { UserId, Email, Password, Name } = req.body;
  UserId = UserId.toLowerCase();
  Email = Email.toLowerCase();

  // const checkUser = "SELECT * FROM User WHERE UserId = ? OR Email = ?";
  const checkUser = "SELECT * FROM User WHERE UserId = ?";

  db.query(checkUser, [UserId], (err, checkResult) => {
    if (err) {
      console.error("Error: ", err);
      return res.status(500).send("Error checking user");
    }

    // Check if any user exists with the same UserId or Email
    if (checkResult.length > 0) {
      return res.status(401).send("UserId already exists");
    }

    // No existing user found, proceed with creating new user
    const insertQuery = "INSERT INTO User VALUES (?, ?, ?, ?)";
    db.query(
      insertQuery,
      [UserId, Email, Password, Name],
      (insertErr, insertResult) => {
        if (insertErr) {
          if (insertErr.code === 'ER_SIGNAL_EXCEPTION') {
            return res.status(409).send("Email already exists");
          } else {
            console.error("Error: ", insertErr);
            return res.status(500).send("Error creating user");
          }
        }
        return res.status(200).send("User created successfully");
      }
    );
  });
};

// Delete DELETE
deleteUser = (req, res) => {
  const UserId = req.params.userid;
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
const updateUser = (req, res) => {
  var { UserId, Email, Name, Password } = req.body;
  UserId = UserId.toLowerCase();
  Email = Email.toLowerCase();
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

// Login Authentication
loginUser = (req, res) => {
  const { UserId, Password } = req.body;
  const query = "SELECT * FROM User WHERE UserId = ?";
  db.query(query, [UserId], (err, result) => {
    if (err) {
      console.error("Error: ", err);
      return res.status(500).send("Error logging in");
    }

    if (result.length === 0) {
      return res.status(409).send("Invalid UserId");
    }

    const user = result[0];
    if (Password != user.Password) {
      return res.status(401).send("Invalid Password!");
    }

    const token = jwt.sign({ userId: user.UserId }, "Secret", {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .json({ userId: user.UserId, name: user.Name, email: user.Email, token });
  });
};

// Test Authentication
testProtected = (req, res) => {
  console.log("Success!");
  return res.status(200).send("Success!");
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  testProtected,
};
