var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
 
db.serialize(function() {
  db.run("CREATE TABLE lorem (codigo int,info TEXT)");
  db.run("CREATE TABLE promium (codigo int,info TEXT)");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?,?)");
  for (var i = 0; i < 20000; i++) {
      stmt.run(i,("Ipsum " + i));
  }
  

  var tabla2 = db.prepare("INSERT INTO promium VALUES (?,?)");
  for (var i = 0; i < 20000; i++) {
    tabla2.run(i,("promium " + i));
  }
  tabla2.finalize();


 
  db.each("SELECT a.codigo codigolorem,a.info infolorem, b.info infopromium FROM lorem a left join promium b on a.codigo=b.codigo", function(err, row) {
      console.log(row.codigolorem + ": " + row.infolorem+ " codigo: "+row.infopromium);
  });
});
 
db.close();