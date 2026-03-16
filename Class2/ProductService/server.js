const express = require("express");
const connectDB = require("./config/db");
const ProductModel = require("./models/Product");

const app = express();
const port = 3000;
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send('Hello Worlddd!');
})

const createProduct = async (req, res) => {
  const {
    product_name,
    product_price,
    isInStock,
    category,
    product_description,
  } = req.body;

  try {
    const product = await ProductModel.create({
      product_name,
      product_price,
      isInStock,
      category,
      product_description,
    });
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const contacts = []
const createContact = async (req, res) => {
  try {
    const name = req.body.name
    const phone = req.body.phone
    if (!name || !phone) {
      res.status(400).json({ message: "Name and phone are required." })
    }
    contacts.push({ name: name, phone: phone })
    res.status(200).json({ message: { name: name, phone: phone } })

  } catch (error) {
    res.status(400).json({ message: "Name and phone are required." })
  }
}

app.post("/contacts", createContact);
app.get("/contcts", (req, res) => {
 res.status(200).json(contacts)
})

 //http://localhost:3000/createProduct
app.post("/createProduct", createProduct);


const getAllProduct = async (req, res) => {
  try{
    const products = await ProductModel.find();
    // res.json(JSON.stringify(products))
    res.json(products)
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
}
app.get("/getAllProducts", getAllProduct);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
