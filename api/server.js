const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");
const Users = require("../users/users-model.js");
const restricted = require('../auth/restricted-middleware.js');

const checkRole = require('../auth/check-role-middleware');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.post("/register", (req, res) => {
  
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error);
      
      res.status(500).json(error);
    });
    console.log(user);
});

server.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get('/', restricted, checkRole('Student'),(req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});


function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['Student']
  };

  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = server;
