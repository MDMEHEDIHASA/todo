const db = require("../util/database");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../util/generateToken");

exports.createUser = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (name.length <= 0 || password.length <= 0 || email.length <= 0) {
      throw new Error("Name email or password cannot be empty.");
    } else {
      const [existEmail] = await db.execute(
        "SELECT * FROM `users` WHERE `email` = ? ",
        [email]
      );
      if (existEmail[0]) {
        //console.log(existEmail)
        res.status(401);
        throw new Error("User already exist.");
      } else {
        const [createUser] = await db.execute(
          "Insert INTO users (name,email,password) VALUES (?,?,?)",
          [name, email, bcrypt.hashSync(password, 10)]
        );
        //console.log('createdUser',createUser);
        const [newUser] = await db.execute("SELECT * FROM users WHERE _id=?", [
          createUser.insertId,
        ]);
        res.status(201).json({
          name: newUser[0].name,
          email: newUser[0].email,
          token: generateToken(newUser[0]._id),
        });
      }
    }
  });
  
  exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (email.length <= 0 || password.length <= 0) {
      throw new Error("Name or password cannot be empty.");
    } else {
      const [user] = await db.execute("SELECT * FROM users WHERE email=?", [
        email,
      ]);
      if (user[0]) {
        //console.log(user[0]);
        const verifyPassword = await bcrypt.compare(password, user[0].password);
        if (verifyPassword) {
          res.json({
            _id: user[0]._id,
            name: user[0].name,
            email: user[0].email,
            token: generateToken(user[0]._id),
          });
        } else {
          throw new Error("Password doesnot match.");
        }
      } else {
        throw new Error("Sorry email doesnot match.");
      }
    }
  });