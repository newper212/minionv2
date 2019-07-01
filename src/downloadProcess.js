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
const chromeFinder = require('chrome-finder');

function getChromiumExecPath() {
  return puppeteer.executablePath().replace('app.asar', 'app.asar.unpacked');
}

async function obtenerUrlsCrate(urlPadre)
{
 
  var browser=await puppeteer.launch(
    {
      executablePath: chromeFinder()
  }
  );
  var page = await browser.newPage();
  await page.goto(urlPadre,{waitUntil:'networkidle0',timeout: 0});
  //page.waitFor(1000);
  var codigoFuente=await page.content();

  await browser.close();
  return codigoFuente;
  
}

async function processArray(array)
{
  let list = [];
  //console.log('canidad a procesar: '+array.length);
   for (const item of array)
   {
      //console.log(item);
      let codigoFuente=await obtenerUrlsCrate(item.urls.toString());
      let searchImage=cheerio.load(codigoFuente);
      //console.log(codigoFuente);
      //fs.writeFileSync('busqueda'+item.sku.toString()+'.txt',searchImage('#container').html());

      
        searchImage('div[id="container"]').find('div > paper-slide > img').each(function (index, element) {
          list.push({urls:searchImage(element).attr('src').replace('wid=650','wid=1500').replace('hei=650','hei=1500'),brand:item.brand,sku:item.sku,style:item.style,subsku:item.subsku});
         // console.log(searchImage(element).attr('src'));
        });


   }
   return list;
   console.log('Done');
}

async function processArrayFALABELLA(array)
{
  let list = [];
  //console.log('canidad a procesar: '+array.length);
   for (const item of array)
   {
      //console.log(item);
      console.log('cantidad de items: '+item.sku);
      console.log('cantodad de subitems: '+item.subsku);
      let nroPagina=Math.ceil(parseInt(item.subsku,10)/parseInt(item.sku,10));
      console.log('cantidad de paginas: '+nroPagina);
     
      for (i = 1; i <= nroPagina; i++) {
        let url=item.urls.toString();
        console.log('valor del i: '+i);
        if (i>1)
          url=url+'?page='+i.toString();
        
        console.log('url: '+url);
      let codigoFuente=await obtenerUrlsCrate(url);
      let searchImage=cheerio.load(codigoFuente);
      console.log(codigoFuente);

      searchImage('div[id="all-pods"]').find('div > .pod-head > a').each(function (index, element) {
        fs.appendFileSync('busqueda'+item.style.toString()+'.txt',searchImage(element).attr('href')+'\r\n');

        //list.push({urls:searchImage(element).attr('src').replace('wid=650','wid=1500').replace('hei=650','hei=1500'),brand:item.brand,sku:item.sku,style:item.style,subsku:item.subsku});
        console.log(searchImage(element).attr('href'));
      });
      }
   }
   return list;
   console.log('Done');
}
const diccionarioColor=
[
  {codigo:'101',color:'beige'},
{codigo:'001',color:'black'},
{codigo:'964',color:'multi'},
{codigo:'600',color:'red'},
{codigo:'971',color:'multi'},
{codigo:'040',color:'silver'},
{codigo:'960',color:'multi'},
{codigo:'009',color:'black'},
{codigo:'008',color:'black'},
{codigo:'967',color:'multi'},
{codigo:'007',color:'multi'},
{codigo:'042',color:'multi'},
{codigo:'970',color:'multi'},
{codigo:'961',color:'multi'},
{codigo:'270',color:'beige'},
{codigo:'670',color:'pink'},
{codigo:'730',color:'yellow'},
{codigo:'710',color:'gold'},
{codigo:'700',color:'yellow'},
{codigo:'965',color:'multi'},
{codigo:'220',color:'brown'},
{codigo:'650',color:'pink'},
{codigo:'968',color:'multi'},
{codigo:'251',color:'beige'},
{codigo:'122',color:'beige'},
{codigo:'320',color:'Green'},
{codigo:'100',color:'white'},
{codigo:'022',color:'grey'},
{codigo:'680',color:'pink'},
{codigo:'601',color:'red'},
{codigo:'110',color:'white'},
{codigo:'260',color:'beige'},
{codigo:'240',color:'brown'},
{codigo:'540',color:'purple'},
{codigo:'240',color:'brown'},
{codigo:'410',color:'blue'},
{codigo:'200',color:'brown'},
{codigo:'640',color:'red'},
{codigo:'210',color:'brown'},
{codigo:'102',color:'white'},
{codigo:'221',color:'brown'},
{codigo:'741',color:'yellow'},
{codigo:'962',color:'multi'},
{codigo:'972',color:'multi'},
{codigo:'280',color:'beige'},
{codigo:'201',color:'brown'},
{codigo:'R',color:'black'},
{codigo:'230',color:'brown'},
{codigo:'969',color:'multi'},
{codigo:'271',color:'beige'},
{codigo:'003',color:'black'},
{codigo:'020',color:'grey'},
{codigo:'420',color:'blue'},
{codigo:'021',color:'grey'},
{codigo:'800',color:'orange'},
{codigo:'120',color:'white'},
{codigo:'K',color:'black'},
{codigo:'250',color:'beige'},
{codigo:'966',color:'multi'},
{codigo:'701',color:'yellow'},
{codigo:'652',color:'pink'},
{codigo:'711',color:'gold'},
{codigo:'060',color:'grey'},
{codigo:'222',color:'brown'},
{codigo:'653',color:'rose'},
{codigo:'000',color:'no%20colour'},
{codigo:'103',color:'white'},
{codigo:'530',color:'purple'},
{codigo:'001',color:'black'},
{codigo:'740',color:'yellow'},
{codigo:'450',color:'blue'},
{codigo:'300',color:'green'},
{codigo:'401',color:'blue'},
{codigo:'830',color:'orange'},
{codigo:'440',color:'blue'},
{codigo:'651',color:'pink'},
{codigo:'400',color:'blue'},
{codigo:'041',color:'silver'},
{codigo:'223',color:'brown'},
{codigo:'330',color:'green'}
]


const datas = [


  // Aldo
  /* {
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
  }, */

  {
    title: 'Aldo',
    name: 'ALDO',
    urls: [
      'https://media.aldoshoes.com/v3/product/{{nombre}}/{{cod_color}}/{{nombre}}_{{color}}_{{cod_color}}_detail_sq_wt_2018x2018.jpg',
      'https://media.aldoshoes.com/v3/product/{{nombre}}/{{cod_color}}/{{nombre}}_{{color}}_{{cod_color}}_alt1_sq_wt_1600x1600.jpg',
      'https://media.aldoshoes.com/v3/product/{{nombre}}/{{cod_color}}/{{nombre}}_{{color}}_{{cod_color}}_alt2_sq_wt_1600x1600.jpg',
      'https://media.aldoshoes.com/v3/product/{{nombre}}/{{cod_color}}/{{nombre}}_{{color}}_{{cod_color}}_alt3_sq_wt_1600x1600.jpg',
      'https://media.aldoshoes.com/v3/product/{{nombre}}/{{cod_color}}/{{nombre}}_{{color}}_{{cod_color}}_alt4_sq_wt_1600x1600.jpg',
      'https://media.aldoshoes.com/v3/product/{{nombre}}/{{cod_color}}/{{nombre}}_{{color}}_{{cod_color}}_detail_sq_wt_2018x2018.jpg'
    ],
    logic: function (product) {
     
      let style = product.style.toString();
      let separador=style.indexOf('-');
      let nombre=style.substring(0,separador);
      let cod_color=style.substring(separador+1);
      let codigo1=cod_color.substring(0,cod_color.indexOf('-'));
      let domColor = diccionarioColor.find(function (o) { return o.codigo === codigo1; });
      let color=domColor['color'];
      
      return {
        nombre,
        cod_color,
        color

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
      //console.log('valor producto: ');
      //console.log(product);
      let style = product.style.toString();
      let styleFormat='0'+style.substr(2,5);

      //console.log('dim1: '+product.color[0])
      //console.log('dim3: '+product.color[2])

      let dim1 = product.color[0].toString();
      let dim3 = product.color[2].toString();
      let dim=dim3;
      
      //console.log('dim1: ')
      //console.log('VALOR DIM: '+dim)
      //console.log('tamanho dim: ' +dim.length);
      if (isNaN(dim3))
      {
        //console.log('entro 1');
          dim = dim1;
      }
      if(dim3.length==0)
      {
        //console.log('entro 2');
          dim=dim1;
      }

        if(dim.length==2)
        {
        //console.log('entro 3');
          styleFormat=styleFormat+dim.toString();
          //console.log('valor del style format: '+styleFormat);
        }
        else if(dim.length==1)
        {
          //console.log('entro 4');
          styleFormat=styleFormat+'0'+dim;
        }
        else if(dim==900)
        {
          //console.log('entro 5');
          styleFormat=styleFormat+'00';
        }
      //console.log('valor final: '+styleFormat);
      //console.log('ingreso todo bien');

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

  {
    title: 'Falabella',
    name: 'FALABELLA',
    urls: [
      'https://www.falabella.com.pe/falabella-pe/category/{{styleFinal}}/',
    ],
    logic: function (product) {
      let style = product.style.toString();
      let styleFinal = product.style.toString();

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
  //console.log('daa');
  //console.log(data);
  data.filename = opts.input;

  const brand = new Brand(data);
  //console.log(brand);
  const brandUrlsTotal = brand.urls.length;
  const brandProductsImagesTotal = brand.products.length * brandUrlsTotal;
  const logname = brand.title.replace(/\s/g, '_');
  const logRows = readLog(logname, opts.output).length;

  //console.log();
  // mainBar.start(brandProductsImagesTotal, 0);
  
  opts.onStart();

  var q = new Queue(function (input, cb) {
    const currentImage = input.currentImage;
    const url = input.url.toString().trim();
    const sku = input.sku;
    const subsku = input.subsku;
    const style = input.style;
    const state = input.state;

    //console.log(url);
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
  
if (opts.brand=='CYB')
{
  let list = [];
// console.log('es crate');
 //console.log('cantidad registros crate: '+brand.products.length);

 (async () => {

  list=await processArray( brand.products);
  for(const {item, index} of list.map((item, index) => ({ item, index })))
  {
    let UrlsTotal=list.length;
    const currentImage = ((index) * UrlsTotal) + (index +1);
   // console.log('indice: '+index);
    //console.log('url hijos: '+item.urls)

    q.push({
      currentImage,
      url:item.urls,
      brand: item.brand,
      style: item.style,
      sku: item.sku,
      subsku: item.subsku,
    });
    //  console.log('listado a descargar: ');
     // console.log(x);
    // brandUrlsTotal=await list.urls.length;
     // list.urls.forEach(function (url, urlIndex) {
        //console.log('url hijos: '+url)
       // const currentImage = ((urlIndex) * brandUrlsTotal) + (urlIndex +1);

      //});


  }
  
  })()
}

else if(opts.brand=='FALABELLA')
{
  console.log('entro a falabella');
  let list = [];
  // console.log('es crate');
   //console.log('cantidad registros crate: '+brand.products.length);
  
   (async () => {
  
    list=await processArrayFALABELLA( brand.products);
    opts.onProgress(percent(100, 100));
    })()
}
else
{

 brand.products.forEach(function (product, productIndex) {
  
console.log(product);

   // if(product.brand=='CYB')
   // {

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
      
    
     /* 
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
*/
    
 // }

    product.urls.forEach(function (url, urlIndex) {
      //console.log('url hijos: '+url)
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
}
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
