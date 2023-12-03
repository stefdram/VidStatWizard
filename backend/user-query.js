// const db = require("./model");
// const db = require('./app');

const mysql = require("mysql");

// MySQL database connection
const db = mysql.createConnection({
  host: "34.136.88.181",
  user: "root",
  password: "123",
  database: "cs411",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database");
  }
});

module.exports = db;

// Read GET
getAllUsers = (req, res) => {
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
createUser = async (req, res) => {
  const { UserId, Email, Password, Name } = req.body;
  const checkUser = "SELECT * FROM User WHERE UserId = ? OR Email = ?";

  try {
    const checkResult = await db.promise().query(checkUser, [UserId, Email]);

    if (checkResult[0].length > 0) {
      return res.status(409).send("UserId or Email already exists");
    }

    const insertQuery = "INSERT INTO User VALUES (?, ?, ?, ?)";
    await db.promise().query(insertQuery, [UserId, Email, Password, Name]);
    return res.status(200).send("User created successfully");
  } catch (err) {
    console.error("Error: ", err);
    return res.status(500).send("Error creating user");
  }
};

// Delete DELETE
deleteUser = async (req, res) => {
  const { UserId } = req.params.UserId;
  const checkUser = "SELECT * FROM User WHERE UserId = ?";
  try {
    const checkResult = await db.promise().query(checkUser, [UserId]);

    if (checkResult[0].length == 0) {
      return res.status(400).send(`User '${UserId}' unavailable!`);
    }

    const deleteQuery = "DELETE FROM User WHERE UserId = ?";
    await db.promise().query(deleteQuery, [UserId]);
    return res.status(200).send(`User '${UserId}' deleted successfully!`);
  } catch (err) {
    console.error("Error: ", err);
    return res.status(500).send("Error deleting user");
  }
};

// Update PUT
updateUser = async (req, res) => {
  const { UserId, Email, Name, Password } = req.body;
  const checkUser = "SELECT * FROM User WHERE UserId = ?";
  const checkEmail = "SELECT * FROM User WHERE Email = ?";
  try {
    const checkResultUser = await db.promise().query(checkUser, [UserId]);
    if (checkResultUser[0].length == 0) {
      return res.status(400).send(`User '${UserId}' unavailable!`);
    }
    const checkEmailUser = await db.promise().query(checkEmail, [Email]);
    if (checkEmailUser[0].length != 0) {
      return res.status(400).send(`Email '${Email} has been taken`);
    }

    const updateQuery =
      "UPDATE User SET Email = ?, Name = ?, Password = ? WHERE UserId = ?";
    await db.promise().query(updateQuery, [Email, Name, Password, UserId]);
    return res.status(200).send(`User '${UserId}' updated successfully!`);
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).send("Error editing user");
  }
};

module.exports = { getAllUsers, createUser, deleteUser, updateUser };