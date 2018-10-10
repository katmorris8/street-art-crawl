const express = require('express');
const { User, Art } = require('./models')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5678;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();

app.use("/", express.static("./build/"));
app.use(bodyParser.json());
app.use('/src/PicSrc/', express.static(__dirname + '/src/PicSrc'));


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
    response.status(400).json({
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
      message: "Invalid username or Password."
    })
  }
});

app.post("/api/art", async (request, response) => {
  const newArt = {
    neighborhood: request.body.neighborhood,
    location: request.body.location,
    date: request.body.date,
    description: request.body.description,
    imageUrl: request.body.imageUrl
  };
  const art = await Art.create(newArt);
  response.json(art);
});

app.get('/api/art', async (request, response) => {
  const art = await Art.findAll({});
  response.json(art);
});

app.get('/api/current-user', async (request, response) => {
  console.log('hello');
  const token = JSON.parse(request.headers['jwt-token']);
  let tokenData;
  try {
    tokenData = jwt.verify(token, jwtSecret);
  } catch (e) {
    console.log(e);
  }
  const user = await User.findOne({
    where: {
      id: tokenData.userId
    }
  });
  response.json(user);
});

app.get('/api/current-user/art', async (request, response) => {
  const token = JSON.parse(request.headers['jwt-token']);
  let tokenData;
  try {
    tokenData = jwt.verify(token, jwtSecret);
  } catch (e) {
    console.log(e);
  }
  const user = await User.findOne({
    where: {
      id: tokenData.userId
    }
  });

  const arts = await user.getArts();
  console.log("USER ART: ", arts);

  response.json(arts)
})

if (process.env.NODE_ENV == "production") {
  app.get("/*", function (request, response) {
    response.sendFile(path.join(__dirname, "build", "index.html"));
  });
}


app.delete('/api/current-user', async (req, res) => {
  const token = JSON.parse(req.headers['jwt-token']);
  console.log('TOKENNNNNN: ', token);
  let tokenData;
  try {
    tokenData = jwt.verify(token, jwtSecret);
  } catch (e) {
    console.log(e);
  }
  // const user = await User.findOne({
  //   where: {
  //     id: tokenData.userId
  //   }
  // });

  await User.destroy({
    where: {
      id: tokenData.userId
    }
  })
  res.sendStatus(200);
});


app.put('/api/current-user', async (req, res) => {
  const username = req.body;
  console.log("USERNAMEEEEEEEEE: ", username);
  const token = JSON.parse(req.headers['jwt-token']);
  let tokenData;
  try {
    tokenData = jwt.verify(token, jwtSecret);
  } catch (e) {
    console.log(e);
  }
  const user = await User.findOne({
    where: {
      id: tokenData.userId
    }
  });

  if (username) {
    user.username = username.username;
  }

  await user.save();

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
