const Brand = require('./brand');
const download = require('./download');
const { mainBar } = require('./bar');
const { readLog, writeLog } = require('./log');
const path = require('path');
const request=require('request');
const http = require('http');
const cheerio = require('cheerio');
const Queue = require('better-queue');
const puppeteer=require('puppeteer');
const fs = require('fs');

async function obtenerUrlsCrate(urlPadre)
{
 
  var browser=await puppeteer.launch();
  var page = await browser.newPage();
  await page.goto(urlPadre,{waitUntil:'networkidle2'});
  //page.waitFor(5*1000);
  var codigoFuente=await page.content();

  await browser.close();
  return codigoFuente;
  
}


const datas = [


  // Aldo
  {
    title: 'Aldo',
    name: 'ALDO',
    urls: [
      'https://media.aldoshoes.com/product/{{name}}/{{number}}/{{name}}_{{number}}_BK.JPG',
      'https://media.aldoshoes.com/product/{{name}}/{{number}}/{{name}}_{{number}}_FR.JPG',
      'https://media.aldoshoes.com/product/{{name}}/{{number}}/{{name}}_{{number}}_RG.JPG',
    ],
    logic: function (product) {
      let style = product.style.toString();
      let name = style.split('_');
      let number = (name.length == 1) ? name[0] : name.pop();
      let last3 = number.substr(-3);

      if (!isNaN(last3[0]))
        number = last3;
      else if (!isNaN(last3[1]))
        number = last3.substr(1);
      else
        number = last3[2];

      name = name.join('_').replace(number, '');

      return {
        name,
        number
      };
    }
  },


  // Call it Spring
  {
    title: 'Call it Spring',
    name: 'CALL IT SPRING',
    urls: [
      'http://media.callitspring.com/product/{{name}}/{{number}}/{{name}}_{{number}}_RG.JPG',
      'http://media.callitspring.com/product/{{name}}/{{number}}/{{name}}_{{number}}_AA.JPG',
      'http://media.callitspring.com/product/{{name}}/{{number}}/{{name}}_{{number}}_FR.JPG',
      'http://media.callitspring.com/product/{{name}}/{{number}}/{{name}}_{{number}}_BK.JPG',
    ],
    logic: function (product) {
      let style = product.style.toString();
      let name = style.split('_');
      let number = (name.length == 1) ? name[0] : name.pop();
      let last3 = number.substr(-3);

      if (!isNaN(last3[0]))
        number = last3;
      else if (!isNaN(last3[1]))
        number = last3.substr(1);
      else
        number = last3[2];

      name = name.join('_').replace(number, '');

      return {
        name,
        number
      };
    }
  },


  // Cortefiel
  {
    title: 'Cortefiel',
    name: 'CORTEFIEL',
    urls: [
      'http://cortefiel.com/dw/image/v2/AAYL_PRD/on/demandware.static/-/Sites-gc-ctf-master-catalog/default/dw13b8d036/images/hi-res/P_{{style}}{{color}}FM.jpg', // ?sw=2000&sh=2000&sm=fit
      'http://cortefiel.com/dw/image/v2/AAYL_PRD/on/demandware.static/-/Sites-gc-ctf-master-catalog/default/dw13b8d036/images/hi-res/P_{{style}}{{color}}D2.jpg', // ?sw=2000&sh=2000&sm=fit
      'http://cortefiel.com/dw/image/v2/AAYL_PRD/on/demandware.static/-/Sites-gc-ctf-master-catalog/default/dw13b8d036/images/hi-res/P_{{style}}{{color}}TM.jpg', // ?sw=2000&sh=2000&sm=fit
    ],
    logic: function (product) {
      let style = product.style.toString();
      let color = product.color[2];
      if (isNaN(color))
        color = product.color[0];
      color = color.toString();
      if (color.length == 1) {
        color = '0' + color;
      }

      return {
        style,
        color
      };
    }
  },


  // Mango
  {
    title: 'Mango',
    name: 'MNG',
    urls: [
      'http://st.mngbcn.com/rcs/pics/static/T{{styleFirstChar}}/fotos/S6/{{style}}_{{color}}.jpg',
      'http://st.mngbcn.com/rcs/pics/static/T{{styleFirstChar}}/fotos/S6/{{style}}_{{color}}_B.jpg',
      'http://st.mngbcn.com/rcs/pics/static/T{{styleFirstChar}}/fotos/S6/{{style}}_{{color}}_R.jpg',
      'http://st.mngbcn.com/rcs/pics/static/T{{styleFirstChar}}/fotos/S6/{{style}}_{{color}}_D1.jpg',
    ],
    logic: function (product) {
      let style = product.style.toString();
      let styleFirstChar = style.charAt(0);
      let color = product.color[2];
      if (isNaN(color))
        color = product.color[0];
      color = color.toString();
      if (color.length == 1) {
        color = '0' + color;
      }

      return {
        styleFirstChar,
        style,
        color
      };
    }
  },


  // Violeta
  {
    title: 'Violeta',
    name: 'VIOLETA',
    urls: [
      'http://st.mngbcn.com/rcs/pics/static/T{{styleFirstChar}}/fotos/S6/{{style}}_{{color}}.jpg',
      'http://st.mngbcn.com/rcs/pics/static/T{{styleFirstChar}}/fotos/S6/{{style}}_{{color}}_B.jpg',
      'http://st.mngbcn.com/rcs/pics/static/T{{styleFirstChar}}/fotos/S6/{{style}}_{{color}}_R.jpg',
      'http://st.mngbcn.com/rcs/pics/static/T{{styleFirstChar}}/fotos/S6/{{style}}_{{color}}_D1.jpg',
    ],
    logic: function (product) {
      let style = product.style.toString();
      let styleFirstChar = style.charAt(0);
      let color = product.color[2];
      if (isNaN(color))
        color = product.color[0];
      color = color.toString();
      if (color.length == 1) {
        color = '0' + color;
      }

      return {
        styleFirstChar,
        style,
        color
      };
    }
  },


  // He
  {
    title: 'He',
    name: 'HE',
    urls: [
      'http://st.mngbcn.com/rcs/pics/static/T{{styleFirstChar}}/fotos/S6/{{style}}_{{color}}.jpg',
      'http://st.mngbcn.com/rcs/pics/static/T{{styleFirstChar}}/fotos/S6/{{style}}_{{color}}_B.jpg',
      'http://st.mngbcn.com/rcs/pics/static/T{{styleFirstChar}}/fotos/S6/{{style}}_{{color}}_R.jpg',
      'http://st.mngbcn.com/rcs/pics/static/T{{styleFirstChar}}/fotos/S6/{{style}}_{{color}}_D1.jpg',
    ],
    logic: function (product) {
      let style = product.style.toString();
      let styleFirstChar = style.charAt(0);
      let color = product.color[2];
      if (isNaN(color))
        color = product.color[0];
      color = color.toString();
      if (color.length == 1) {
        color = '0' + color;
      }

      return {
        styleFirstChar,
        style,
        color
      };
    }
  },

  {
    title: 'WareHouse',
    name: 'WAREHOUSE',
    urls: [
      'http://demandware.edgesuite.net/sits_pod30/dw/image/v2/AAXE_PRD/on/demandware.static/-/Sites-WAREHOUSE/default//images/hi-res/warehouse_{{styleFormat}}_1.jpg?sw=1500&sh=1500&sm=fit',
      'http://demandware.edgesuite.net/sits_pod30/dw/image/v2/AAXE_PRD/on/demandware.static/-/Sites-WAREHOUSE/default//images/hi-res/warehouse_{{styleFormat}}_2.jpg?sw=1500&sh=1500&sm=fit',
      'http://demandware.edgesuite.net/sits_pod30/dw/image/v2/AAXE_PRD/on/demandware.static/-/Sites-WAREHOUSE/default//images/hi-res/warehouse_{{styleFormat}}_3.jpg?sw=1500&sh=1500&sm=fit',
      'http://demandware.edgesuite.net/sits_pod30/dw/image/v2/AAXE_PRD/on/demandware.static/-/Sites-WAREHOUSE/default//images/hi-res/warehouse_{{styleFormat}}_4.jpg?sw=1500&sh=1500&sm=fit',
      'http://demandware.edgesuite.net/sits_pod30/dw/image/v2/AAXE_PRD/on/demandware.static/-/Sites-WAREHOUSE/default//images/hi-res/warehouse_{{styleFormat}}_5.jpg?sw=1500&sh=1500&sm=fit',
    ],
    logic: function (product) {
      let style = product.style.toString();
      let styleFormat='0'+style.substr(2,5);

      console.log('dim1: '+product.color[0])
      console.log('dim3: '+product.color[2])

      let dim1 = product.color[0].toString();
      let dim3 = product.color[2].toString();
      let dim=dim3;
      
      console.log('dim1: ')
      console.log('VALOR DIM: '+dim)
      console.log('tamanho dim: ' +dim.length);
      if (isNaN(dim3))
      {
        console.log('entro 1');
          dim = dim1;
      }
      if(dim3.length==0)
      {
        console.log('entro 2');
          dim=dim1;
      }

        if(dim.length==2)
        {
          console.log('entro 3');
          styleFormat=styleFormat+dim.toString();
          console.log('valor del style format: '+styleFormat);
        }
        else if(dim.length==1)
        {
          console.log('entro 4');
          styleFormat=styleFormat+'0'+dim;
        }
        else if(dim==900)
        {
          console.log('entro 5');
          styleFormat=styleFormat+'00';
        }
      console.log('valor final: '+styleFormat);
      console.log('ingreso todo bien');

      return {
        styleFormat
      };
    }
  },

  

  // He
  {
    title: 'Crate & Barrel',
    name: 'CYB',
    urls: [
      'http://intl.cratebrowser.com/#/item/{{styleFinal}}',
    ],
    logic: function (product) {
      let style = product.style.toString();
      let styleFinal = style.substr(3);

      return {
        styleFinal
      };
    }
  },



];

function percent(currentImage, brandProductsImagesTotal) {
  return (100 * currentImage) / brandProductsImagesTotal;
}

function downloadProcess(opts) {

  const data = datas.find(function (o) { return o.name === opts.brand; });

  // console.log(opts);
  data.filename = opts.input;

  const brand = new Brand(data);
  const brandUrlsTotal = brand.urls.length;
  const brandProductsImagesTotal = brand.products.length * brandUrlsTotal;
  const logname = brand.title.replace(/\s/g, '_');
  const logRows = readLog(logname, opts.output).length;

  // mainBar.start(brandProductsImagesTotal, 0);
  
  opts.onStart();

  var q = new Queue(function (input, cb) {
    const currentImage = input.currentImage;
    const url = input.url.toString().trim();
    const sku = input.sku;
    const subsku = input.subsku;
    const style = input.style;
    const state = input.state;

    //test
    // console.log(logname);
    // console.log(logRows);
    // console.log(currentImage);
    //endtest

    if (logRows < currentImage) {
                    //path       //name                             //callback
      download(url, opts.output, subsku + '_' + path.basename(url).split('?')[0], function (state) {
        writeLog(logname, opts.output, { url, sku, subsku, style, state });
        cb();
      });
    }
    else {
      cb();
    }

    // mainBar.update(currentImage);
    opts.onProgress(percent(currentImage, brandProductsImagesTotal));
  });

  q.on('drain', function () {
    q.destroy(function () {
      opts.onEnd();
    });
  });
//inicio for
  
 brand.products.forEach(function (product, productIndex) {
  


    if(product.brand=='CYB')
    {

     /* product.urls.push('url 1');
      product.urls.push('url 2');
      product.urls.push('url 3');
      product.urls.push('url 4');
      product.urls.push('url 5');
      product.urls.push('url 6');
      product.urls.shift();  */
      

      /*let list = [];
      (async () => {
        list= obtenerUrlsCrate(product.urls.toString());
        console.log('listar 0: '+list[0]);
      console.log('listar 1: '+list[1]);
      console.log('listar 2: '+list[2]);
      })()*/

     // list= obtenerUrlsCrate(product.urls.toString());
      
    
      
      (async () => {

   console.log('product index: '+productIndex);
    console.log('URL PADRE del excel a descargar: '+product.urls);
    console.log('dato 2: ' +product.brand);
    console.log('dato 3: ' +product.sku);
    console.log('dato 4: ' +product.style);
    console.log('dato 5: ' +product.subsku);
        let codigoFuente=await obtenerUrlsCrate(product.urls.toString());
        let searchImage=cheerio.load(codigoFuente);
        console.log(codigoFuente);
        fs.writeFileSync('busqueda'+product.sku.toString()+'.txt',searchImage('#container').html());
        let list = [];
        searchImage('div[id="container"]').find('div > paper-slide > img').each(function (index, element) {
          list.push({urls:searchImage(element).attr('src'),brand:product.brand,sku:product.sku,style:product.style,subsku:product.subsku});
          console.log(searchImage(element).attr('src'));
        });
        console.log(list[0]);
      })()
      
      console.log('codigo fuente pagina: ');

    
  }

    product.urls.forEach(function (url, urlIndex) {
      console.log('url hijos: '+url)
      const currentImage = ((productIndex) * brandUrlsTotal) + (urlIndex +1);


      // if (logRows < currentImage)
      //   writeLog(logname, { url, state: download(url) });
      //
      // mainBar.update(currentImage);
      // opts.onProgress(currentImage);
      q.push({
        currentImage,
        url,
        brand: product.brand,
        style: product.style,
        sku: product.sku,
        subsku: product.subsku,
      });
    });
  });
  
  // mainBar.stop();
  // opts.onEnd();

  return function downloadProcessEnd(cb) {
    q.destroy(function () {
      cb();
    });
    return null;
  }


  

}

module.exports = downloadProcess;
