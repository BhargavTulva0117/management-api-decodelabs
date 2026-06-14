const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Products Data

let products = [
  {
    id: 1,
    name: "Liquid Oral Calcium",
    category: "Livestock",
    price: 850
  },
  {
    id: 2,
    name: "Immunity Booster",
    category: "Poultry",
    price: 620
  },
  {
    id: 3,
    name: "Aqua Probiotics",
    category: "Aqua",
    price: 980
  }
];

// Contact Messages

let contacts = [];

// Newsletter Subscribers

let subscribers = [];

/* HOME */

app.get("/", (req, res) => {
  res.json({
    message: "Aureus Nutricare API Running Successfully"
  });
});

/* GET ALL PRODUCTS */

app.get("/products", (req, res) => {
  res.json(products);
});

/* GET PRODUCT BY ID */

app.get("/products/:id", (req, res) => {

  const id = parseInt(req.params.id);

  const product = products.find(
    product => product.id === id
  );

  if (!product) {
    return res.status(404).json({
      message: "Product Not Found"
    });
  }

  res.json(product);
});

/* ADD PRODUCT */

app.post("/products", (req, res) => {

  const { name, category, price } = req.body;

  if (!name || !category || !price) {
    return res.status(400).json({
      message: "All Fields Are Required"
    });
  }

  const product = {
    id: products.length + 1,
    name,
    category,
    price
  };

  products.push(product);

  res.status(201).json({
    message: "Product Added Successfully",
    product
  });
});

/* UPDATE PRODUCT */

app.put("/products/:id", (req, res) => {

  const id = parseInt(req.params.id);

  const product = products.find(
    product => product.id === id
  );

  if (!product) {
    return res.status(404).json({
      message: "Product Not Found"
    });
  }

  const { name, category, price } = req.body;

  if (name) product.name = name;
  if (category) product.category = category;
  if (price) product.price = price;

  res.json({
    message: "Product Updated Successfully",
    product
  });
});

/* DELETE PRODUCT */

app.delete("/products/:id", (req, res) => {

  const id = parseInt(req.params.id);

  const index = products.findIndex(
    product => product.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Product Not Found"
    });
  }

  const deletedProduct = products[index];

  products.splice(index, 1);

  res.json({
    message: "Product Deleted Successfully",
    deletedProduct
  });
});

/* CONTACT FORM */

app.post("/contact", (req, res) => {

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "All Fields Are Required"
    });
  }

  contacts.push({
    id: contacts.length + 1,
    name,
    email,
    message
  });

  res.status(201).json({
    message: "Contact Form Submitted Successfully"
  });
});

/* NEWSLETTER */

app.post("/subscribe", (req, res) => {

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email Required"
    });
  }

  subscribers.push({
    id: subscribers.length + 1,
    email
  });

  res.status(201).json({
    message: "Subscribed Successfully"
  });
});

/* SERVER */

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});