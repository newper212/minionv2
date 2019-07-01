const render = require('./render');
// const download = require('./download');

class Product {
  constructor(data) {
    this.brand = data.brand;
    this.style = data.style;
    this.subsku = data.subsku;
    this.sku = data.sku;
    this.urls = data.urls.map(function (url) {
      return render(url, data.logic(data));
    });
  }

  // get images() {
  //   return this.urls.map(function (url) {
  //     return download(url);
  //   });
  // }
}

module.exports = Product;
