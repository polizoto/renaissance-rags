const db = require("./connection");
const { User, Costume, Category, Vendor } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Knight" },
    { name: "Peasant" },
    { name: "Jester" },
    { name: "Princess" },
    { name: "Pirate" },
  ]);

  console.log("categories seeded");

  await Vendor.deleteMany();

  const vendors = await Vendor.insertMany([
    {
      firstName: "Wes",
      lastName: "Bubba",
      email: "WB@testmail.com",
      location: "Camelot",
    },
    {
      firstName: "Dave",
      lastName: "Don",
      email: "DD@testmail.com",
      location: "Downtown",
    },
  ]);

  console.log("vendors seeded");

  await Costume.deleteMany();

  const costumes = await Costume.insertMany([
    {
      name: "Templar Knight",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "templar-knight.png",
      category: categories[0]._id,
      price: 200.0,
      quantity: 5,
      vendor: vendors[0]._id,
    },
    {
      name: "Female Peasant",
      description:
        "Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.",
      image: "femalePeasant.png",
      category: categories[1]._id,
      price: 99.99,
      quantity: 3,
      vendor: vendors[0]._id,
    },
    {
      name: "Female Pirate",
      category: categories[4]._id,
      description:
        "Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.",
      image: "femalePirate.png",
      price: 150.0,
      quantity: 20,
      vendor: vendors[1]._id,
    },
    {
      name: "Female Pirate Full Costume",
      category: categories[4]._id,
      description:
        "Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.",
      image: "femalePirate2.png",
      price: 99.99,
      quantity: 50,
      vendor: vendors[1]._id,
    },
    {
      name: "Male Peasant",
      category: categories[1]._id,
      description:
        "In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.",
      image: "malePeasant.png",
      price: 49.99,
      quantity: 30,
      vendor: vendors[1]._id,
    },
    {
      name: "Jester",
      category: categories[2]._id,
      description:
        "Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.",
      image: "jester.png",
      price: 44.99,
      quantity: 100,
      vendor: vendors[0]._id,
    },
    {
      name: "Jester Full Costume",
      category: categories[2]._id,
      description:
        "Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.",
      image: "jester2.png",
      price: 99.99,
      quantity: 30,
      vendor: vendors[0]._id,
    },
    {
      name: "Male Pirate",
      category: categories[4]._id,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.",
      image: "malePirate.png",
      price: 59.99,
      quantity: 100,
      vendor: vendors[1]._id,
    },
    {
      name: "Male Pirate",
      category: categories[4]._id,
      description:
        "Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.",
      image: "malePirate2.png",
      price: 69.99,
      quantity: 1000,
      vendor: vendors[1]._id,
    },
    {
      name: "Black Beard",
      category: categories[4]._id,
      description:
        "Ut vulputate hendrerit nibh, a placerat elit cursus interdum.",
      image: "blackBeard.png",
      price: 149.99,
      quantity: 4,
      vendor: vendors[1]._id,
    },
    {
      name: "femaleKnight",
      category: categories[0]._id,
      description:
        "Ut vulputate hendrerit nibh, a placerat elit cursus interdum.",
      image: "femaleKnight.png",
      price: 149.99,
      quantity: 4,
      vendor: vendors[0]._id,
    },
    {
      name: "female Peasant",
      category: categories[1]._id,
      description:
        "Ut vulputate hendrerit nibh, a placerat elit cursus interdum.",
      image: "femalePeasant2.png",
      price: 149.99,
      quantity: 4,
      vendor: vendors[1]._id,
    },
    {
      name: "Knight",
      category: categories[0]._id,
      description:
        "Ut vulputate hendrerit nibh, a placerat elit cursus interdum.",
      image: "knight.png",
      price: 149.99,
      quantity: 4,
      vendor: vendors[0]._id,
    },
    {
      name: "Amored Knight",
      category: categories[0]._id,
      description:
        "Ut vulputate hendrerit nibh, a placerat elit cursus interdum.",
      image: "knight3.png",
      price: 149.99,
      quantity: 4,
      vendor: vendors[0]._id,
    },
    {
      name: "Male Peasant",
      category: categories[1]._id,
      description:
        "Ut vulputate hendrerit nibh, a placerat elit cursus interdum.",
      image: "malePeasant2.png",
      price: 149.99,
      quantity: 4,
      vendor: vendors[1]._id,
    },
    {
      name: "Princess",
      category: categories[3]._id,
      description:
        "Ut vulputate hendrerit nibh, a placerat elit cursus interdum.",
      image: "princess.png",
      price: 149.99,
      quantity: 4,
      vendor: vendors[0]._id,
    },
  ]);

  console.log("costumes seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    orders: [
      {
        costumes: [costumes[0]._id, costumes[0]._id, costumes[1]._id],
      },
    ],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
