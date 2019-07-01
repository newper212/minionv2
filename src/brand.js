const join = require('path').join;
const { readExcel } = require('./io');
const Product = require('./product');

class Brand {
  constructor(data) {
    this.title = data.title;
    this.name = data.name;
    this.filename = data.filename;
    this.urls = data.urls;
    this.logic = data.logic;
    this.products = readExcel(data.filename).filter((productData) => {
      return productData.brand === this.name;
    }).map((productData) => {
      
      productData.urls = this.urls;
      productData.logic = this.logic;

      //test
      //console.log(productData);
      //endtest

      return new Product(productData);
    });
  }

  // get products() {
  //   console.log(this.filename); // esto se esta repitiendo dos veces
  //   return
  // }
}

module.exports = Brand;
