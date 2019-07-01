const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const json2csv = require('json2csv');

function readExcel(filename) {
  // let workbook = xlsx.readFile(path.join(__dirname, filename));
  let workbook = xlsx.readFile(filename);
  let worksheet = workbook.Sheets['plan'];
  let rows = xlsx.utils.sheet_to_json(worksheet,{defval:""});

  return rows.map(function (row) {
    Object.keys(row).forEach(function (key) {
      row[key.toLowerCase()] = row[key];
    });

    return {
      brand: row['marca'],    // MARCA
      style: row['estilo'],   // Estilo
      subsku: row['sku var'], // SKU_VAR
      sku: row['sku_estilo'], // SKU ESTILO
      color: [
        row['dim1'],  // DIM1
        row['dim2'],  // DIM2
        row['dim3']   // DIM3
      ]
    };
  });
  // return [
  //   { brand: 'MNG', style: '14090312', color: ['99', '99', '99'] },
  //   { brand: 'MNG', style: '13045699', color: ['70', '99', '70'] },
  //   { brand: 'MNG', style: '13045699', color: ['80', '99', '80'] },
  //   { brand: 'MNG', style: '13045699', color: ['99', '99', '99'] },
  // ];
}

function readCSV(filename) {
  // filename = path.join(__dirname, filename);
  if (!path.extname(filename))
    filename = filename + '.csv';

  if (!fs.existsSync(filename))
    return;

  const csv = fs.readFileSync(filename);
  for (lines=-1, i=0; i < csv.length; ++i) if (csv[i] == 10) lines++;

  // trick
  return new Array(lines);
  // fs.createReadStream(filename, { encoding: 'utf8' });
  // const processor = input.pipe(new json2csv.Transform());
  // console.log(processor)



  // const opts = { header: false };
  // if (!fs.existsSync(filename))
  //   opts.header = true;
  //
  // const csv = (new json2csv.Parser(opts)).parse(rows);
  // fs.writeFileSync(filename, csv + '\r\n', { flag: 'as' });
}

function writeCSV(filename, rows) {
  // filename = path.join(__dirname, filename);
  if (!path.extname(filename))
    filename = filename + '.csv';

  const opts = { header: false };
  if (!fs.existsSync(filename))
    opts.header = true;

  const csv = (new json2csv.Parser(opts)).parse(rows);
  fs.writeFileSync(filename, csv + '\r\n', { flag: 'as' });
}

module.exports = {
  readExcel, readCSV, writeCSV
}
