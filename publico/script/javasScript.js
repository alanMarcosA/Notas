async function guardar(){
    var titulo = prompt("ingrese el titulo")
    var nota = prompt("ingrese la nota")
    var datos = await fetch('/guardar',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({titulo:titulo, nota:nota})
    })
    mostrar()
}
async function borrar(){
    var titulo = ""
    var datos = await fetch('/delete',{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({titulo:titulo})
    })
    mostrar()
}
function editar(){
    var titulo = ""
    var nota = prompt
    var datos = await fetch('/edit',{
        method:"PATCH",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({titulo:titulo, nota:nota})
    })
    mostrar()
}
function mostrar(){
    var respuesta = await fetch('/getNotas')
    var contenido = await respuesta.json()


}