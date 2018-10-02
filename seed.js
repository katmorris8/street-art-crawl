const bcrypt = require('bcrypt');

const { Art, User } = require('./models');

const main = async () => {
  const art1 = await Art.create({
    neighborhood: "Bushwick",
    location: "St. Nicholas Ave",
    date: "2018-09-28",
    description: "Crazy cool",
    imageUrl: "/src/PicSrc/bushwick-collective.jpg",
  });
  const art2 = await Art.create({
    neighborhood: "Dumbo",
    location: "20 Jay St",
    date: "2018-09-28",
    description: "Bad art, stinks",
    imageUrl: "/src/PicSrc/dumbo.jpg",
  });
  const art3 = await Art.create({
    neighborhood: "Lower East Side",
    location: "E. First St",
    date: "2018-09-28",
    description: "Super nice",
    imageUrl: "/src/PicSrc/lower-east-side.jpg",
  });
  const art4 = await Art.create({
    neighborhood: "Little Italy",
    location: "St. Nicholas Ave",
    date: "2018-09-28",
    description: "Cool Art",
    imageUrl: "/src/PicSrc/little-italy.jpg",
  });

  const password = 'asdf';
  const passwordDigest = await bcrypt.hash(password, 12);
  const user = await User.create({
    firstName: 'wade',
    lastName: 'seidule',
    email: 'wade.email',
    username: 'wade',
    passwordDigest: passwordDigest
  })

  await art1.setUser(user);
  await art2.setUser(user);
  await art3.setUser(user);
  await art4.setUser(user);

  process.exit();
}

main();