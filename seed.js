const { Art } = require('./models');

const main = async () => {
  await Art.create({
    neighborhood: "Bushwick",
    location: "St. Nicholas Ave",
    date: "2018-09-28",
    description:"Crazy cool",
    imageUrl:"/src/PicSrc/bushwick-collective.jpg",
    user_id: 1
  });
  await Art.create({
    neighborhood: "Dumbo",
    location: "20 Jay St",
    date: "2018-09-28",
    description:"Bad art, stinks",
    imageUrl:"/src/PicSrc/dumbo.jpg",
    user_id: 2
  });
  await Art.create({
    neighborhood: "Lower East Side",
    location: "E. First St",
    date: "2018-09-28",
    description:"Super nice",
    imageUrl:"/src/PicSrc/lower-east-side.jpg",
    user_id: 3
  });
  await Art.create({
    neighborhood: "Little Italy",
    location: "St. Nicholas Ave",
    date: "2018-09-28",
    description:"Cool Art",
    imageUrl:"/src/PicSrc/little-italy.jpg",
    user_id: 4  
  });


  process.exit();
}

main();