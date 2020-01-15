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

servidor.use(bodyParser.json());

servidor.listen(port, function() {
  console.log(`escuchando conexiones en ${port}`);
});

servidor.get("/", function(consulta, respuesta) {
  respuesta.redirect("./publico");
});

servidor.get("/publico", function(consulta, respuesta) {
  respuesta.sendFile(path.join(__dirname, "publico", "index.html"));
});

servidor.get("/css/estilos.css", function(consulta, respuesta) {
  respuesta.sendFile(path.join(__dirname, "publico/css", "estilos.css"));
});

servidor.get("/script/javasScript.js", function(consulta, respuesta) {
  respuesta.sendFile(path.join(__dirname, "publico/script", "javasScript.js"));
});

servidor.post("/guardar", async (consulta, respuesta) => {
  var data = consulta.body;
  await agregarNota(data.titulo, data.nota);
  respuesta.json({ res: "nota agregada" });
});
function agregarNota(titulo, nota) {
  return baseDeDatos
    .collection("notas")
    .insertOne({ titulo: titulo, nota: nota });
}

servidor.get("/getNotas", async (consulta, respuesta) => {
  var datos = await baseDeDatos
    .collection("notas")
    .find()
    .toArray();
  respuesta.json(datos);
});
servidor.delete("/delete", async function(consulta, respuesta) {
  var data = consulta.body;
  await baseDeDatos.collection("notas").deleteOne({ titulo: data.titulo });
  respuesta.json({ res: "borrado con exito" });
});
servidor.patch("/edit", async (consulta, respuesta) => {
  var data = consulta.body;
  let nota = data.nota;
  await baseDeDatos
    .collection("notas")
    .updateOne({ titulo: data.titulo }, { $set: { nota } });
  respuesta.json({ res: "editado con exito" });
});
