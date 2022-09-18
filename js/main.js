document.getElementById("formulario").addEventListener("submit", crear);

//funcion crear
function crear(e){
  let titulo = document.getElementById("titulo").value;
  let descripcion = document.getElementById("descripcion").value;

  let blog = {
    titulo,
    descripcion
  };

  if(localStorage.getItem("blogs") === null){
    let blogs=[];
    blogs.push(blog);
    localStorage.setItem("blogs", JSON.stringify(blogs));

  }else{

    let blogs = JSON.parse(localStorage.getItem("blogs"));
    blogs.push(blog);
    localStorage.setItem("blogs", JSON.stringify(blogs));

  }
  leer();
  document.getElementById("formulario").reset();
  console.log("Blog guardado OK");
  e.preventDefault();  

}


//funcion leer
function  leer(){
  let blogs = JSON.parse(localStorage.getItem("blogs"));
  document.getElementById("tbody").innerHTML= "" 
  for (let i=0; i < blogs.length; i++){
    let titulo = blogs[i].titulo
    let descripcion = blogs[i].descripcion

    document.getElementById("tbody").innerHTML +=
    `<tr>
    <td>${titulo}</td>
    <td>${descripcion}</td>
    <td><button onclick="editar('${titulo}')" class="btn btn-warning">Editar</button>
    <button onclick="eliminar('${titulo}')" class="btn btn-danger">Eliminar</button></td>
    </tr>
    `
    }
}
leer();




//funcion editar
function  editar(titulo){
  let blogs = JSON.parse(localStorage.getItem("blogs"));

  for (let i=0; i < blogs.length; i++){
    if(blogs[i].titulo===titulo){

      document.getElementById("body").innerHTML = 
      `<div class="row my-5 justify-content-center">
        <div class="col-md-8">
          <div class="card">
          <div class="card-header">
              <h2>Editar el BLOG</h2>
          </div>
            <div class="card-body">

              <form>
                <div class="form-group">
                  <input type="text" id="ntitulo" value = "${blogs[i].titulo}"  class="form-control">
                </div>
                <div class="form-group">
                  <textarea id="ndescripcion"  cols="30" rows="10" class="form-control"></textarea>
                </div>
              
      <button class="btn btn-success" onclick="actualizar('${i}')">Actualizar</button>
      <button class="btn btn-primary btn-block">Cancelar</button>
              </form>
            </div>
          </div>
        </div>
        </div>`;
 document.getElementById("ndescripcion").innerHTML = `${blogs[i].descripcion}`;            
    }

  }

}  

function  actualizar(i){
  let blogs = JSON.parse(localStorage.getItem("blogs"));
  blogs[i].titulo =  document.getElementById("ntitulo").value;
  blogs[i].descripcion =  document.getElementById("ndescripcion").value;
  if(blogs[i].titulo==""){
    alert("Tiene que ingresar un Titulo");
  }else{
    if(blogs[i].descripcion==""){
      alert("Tiene que ingresar una Descripcion");
    }else{
          localStorage.setItem("blogs",JSON.stringify(blogs));        
    }
}
}


//funcion eliminar
function eliminar(titulo) {
  //console.log(titulo)
  let blogs = JSON.parse(localStorage.getItem("blogs"));
  for(let i = 0; i < blogs.length; i++) {
    if(blogs[i].titulo === titulo) {
      blogs.splice(i, 1);
    }
  }
  
  localStorage.setItem("blogs", JSON.stringify(blogs));
  leer();
}

leer();

