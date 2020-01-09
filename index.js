var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require("body-parser");
var path = require("path");

var port = process.env.PORT || 3000;
var servidor = express();

var url =
  "mongodb+srv://user:user@probando-ssn67.mongodb.net/test?retryWrites=true&w=majority";
var dbName = "baseDeDatoss";
var baseDeDatos;

var cliente = new MongoClient(url, { useUnifiedTopology: true });
cliente.connect(function(err, client) {
  if (err) {
    console.log("error de conexion");
    console.error(err);
    client.close;
  }
  console.log("conectado exitosamente");
  baseDeDatos = client.db(dbName);
});

servidor.listen(port, function() {
  console.log(`escuchando conexiones en ${port}`);
});

servidor.get("/", function(consulta, respuesta) {
  respuesta.sendFile(path.join(__dirname, "publico", "index.html"));
});
