const mongoose = require("mongoose");
const Campground = require("../models/campground.js");
const cities = require("./cities.js");
const { places, descriptors } = require("./seedHelpers.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
  console.log("database connected");
}
main().catch((err) => console.log(`Error in connecting, ${err}`));

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "65350559a9ee69ab11d70ac0",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      price: price,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit, posuere gravida convallis ornare aliquet himenaeos, cras nisl platea porttitor rhoncus vivamus. Proin suspendisse felis venenatis netus primis mauris lectus sed, molestie tortor tristique accumsan non posuere fusce, egestas sodales cras tellus ridiculus sem aliquet.",
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dyvalwput/image/upload/v1698096716/YelpCamp/rp2kgrmy2u6avgvg5afe.jpg",
          filename: "YelpCamp/rp2kgrmy2u6avgvg5afe",
        },
        {
          url: "https://res.cloudinary.com/dyvalwput/image/upload/v1698608887/YelpCamp/deb9y7uwowob9lbygdms.jpg",
          filename: "YelpCamp/bnji8uvy5ipzjluzo9gh",
        },
      ],
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
