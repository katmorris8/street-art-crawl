const express = require('express');
const { User } = require('./models')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5678;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.json());

const jwtSecret = 'shhh12748293';

app.post('/api/register', async (request, response) => {
  const { firstName, lastName, email, username, password } = request.body;
  if (!firstName || !lastName || !email || !username || !password) {
    response.status(400).json({
      error: "Registration requires all fields to be filled out."
    });
    return;
  }

  const existingUser = await User.findOne({
    where: {
      username: username
    }
  });
  if (existingUser) {
    response.status(409).json({
      message: "That username is already taken."
    });
    return;
  }
  const passwordDigest = await bcrypt.hash(password, 12);

  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    passwordDigest: passwordDigest
  });


  const token = jwt.sign({ userId: user.id }, jwtSecret);
  response.json({
    token: token
  });
});

app.post('/api/login', async (request, response) => {
  const { username, password } = request.body;
  if (!username || !password) {
    response.status(401).json({
      error: "Login requires a username and password in the request body."
    });
    return;
  }
  const existingUser = await User.findOne({
    where: {
      username: username
    }
  });

  if (existingUser === null) {
    response.status(401).json({
      message: "Invalid username or password."
    });
    return;
  }
  
  const isPasswordCorrect = await bcrypt.compare(password, existingUser.passwordDigest);
  if (isPasswordCorrect) {
    const token = jwt.sign({ userId: existingUser.id }, jwtSecret);
    response.json({
      token: token
    });
  } else {
    response.status(401).json({
      message: "Invalid username or password."
    })
  }
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
