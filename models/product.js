const fs = require("fs");
const path = require("path");

const pathh = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
const helperFunctionProductsFromFile = (cbFunction) => {
  fs.readFile(pathh, (err, fileContent) => {
    if (err) {
      cbFunction([]);
    } else {
      cbFunction(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageURL, description, price) {
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }
  save() {
    this.id = Math.random().toString();
    helperFunctionProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(pathh, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cbFunction) {
    helperFunctionProductsFromFile(cbFunction);
  }
  static findById(id, cb) {
    helperFunctionProductsFromFile((products) => {
      const product = products.find((p) => p.id == id);
      cb(product);
    });
  }
};
