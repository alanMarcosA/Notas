mostrar();
async function guardar() {
  var titulo = prompt("ingrese el titulo");
  var nota = prompt("ingrese la nota");
  var datos = await fetch("/guardar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ titulo: titulo, nota: nota })
  });   
  agregar(titulo, nota);
}
async function borrar(titulo) {
  var titulo = titulo;
  var datos = await fetch("/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ titulo: titulo })
  });
  var lista = document.querySelector(".lista");
  lista.removeChild(document.getElementById(titulo));
}
async function editar(titulo) {
  var titulo = titulo;
  var notes = document.getElementById(titulo).firstElementChild
    .lastElementChild;
  var nota = prompt("edite su nota", notes.innerText);
  var datos = await fetch("/edit", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ titulo: titulo, nota: nota })
  });
  notes.innerText = nota;
}
async function mostrar() {
  var respuesta = await fetch("/getNotas");
  var contenido = await respuesta.json();
  var lista = document.querySelector(".lista");
  for (var i = 0; i < contenido.length; i++) {
    lista.insertAdjacentHTML(
      "beforeend",
      `
        <div id="${contenido[i].titulo}">
            <span><h3>${contenido[i].titulo}</h3><label>${contenido[i].nota}</label></span>
            <button onclick="borrar('${contenido[i].titulo}')">borrar</button>
            <button onclick="editar('${contenido[i].titulo}')">editar</button>
        </div>
        `
    );
  }
}
function agregar(titulo, nota) {
  var lista = document.querySelector(".lista");
  lista.insertAdjacentHTML(
    "beforeend",
    `
          <div id="${titulo}">
              <span><h3>${titulo}</h3><label>${nota}</label></span>
              <button onclick="borrar('${titulo}')">borrar</button>
              <button onclick="editar('${titulo}')">editar</button>
          </div>
          `
  );
}
