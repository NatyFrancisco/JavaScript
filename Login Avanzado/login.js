
//PRESIONO F2 PARA RENOMBRAR COMPLETAMEN UN NOMBRE EN TODO EL DOCUMENTO
baseDeDatosLogin =JSON.parse (localStorage.getItem("sistema-de-login"))

if(!baseDeDatosLogin){
    cargaDeDatos()
}

function guardarDatosLogin(){

    localStorage.setItem("sistema-de-login", JSON.stringify(baseDeDatosLogin))

}


function cargaDeDatos(){
    baseDeDatosLogin ={
        1234567890:{
            clave: "abc",
            puntaje:0,
    
        },
       "0987654321":{
            clave:"fco",
            puntaje:0,
    
        },
        98765434567:{
            clave:"ghi",
            puntaje:0,
        },
        
    };
}

async function menuBasico(){
     opcion_menuBasico = -1
    await swal.fire({
        title: "Menu",
        showConfirmButtonText:false,

        html: `
        <button class="swal2-confirm swal2-styled" onclick='opcion_menuBasico=0;Swal.close()'>Nuevo usuario</button>
<br>
        <button class="swal2-confirm swal2-styled" onclick='opcion_menuBasico=1;Swal.close()'>Login</button>
        `

    })

    switch(opcion_menuBasico){
        case 0:
            registrarUsuario();
            break;

            case 1:
                login();
                break;

            default:
                await menuBasico();
                break;
    }
}



async function registrarUsuario(){
    opcion_registrarUsuario = -1;
    await swal.fire({
        title: "Registrar",
        showConfirmButton:false,
        
        html: `
        <input class= "swal2-input" placeholder = "Ingrese un usuario" id="usuario">
        <input class= "swal2-input" placeholder = "Ingrese una clave" id="clave">
        <button class="swal2-confirm swal2-styled" onclick='opcion_registrarUsuario=0;Swal.clickConfirm()'>Crear</button>
<br>
        <button class="swal2-confirm swal2-styled" onclick='opcion_registrarUsuario=1;Swal.close()'>Cancelar</button>
        
        `,

        preConfirm : () =>{
            let usuario = document.getElementById("usuario").value
            let clave = document.getElementById("clave").value

            if(!usuario){
                Swal.showValidationMessage("No hay usuario");
                return false;
            }


            if(!clave){
                Swal.showValidationMessage("No hay clave");
                return false;
            }

            baseDeDatosLogin [usuario] ={}

            baseDeDatosLogin [usuario].clave=clave

            //Variable opcional (no es obligatoria)
            baseDeDatosLogin[usuario].puntaje = 0
            return true
        },

    });

        switch (opcion_registrarUsuario){
            case 0:
            menuBasico();

            break;

            case 1:
                menuBasico();

            default:
                break;
        }


}

async function login(){
    await swal.fire({
        title: "Bienvenid@",
        confirmButtonText:"Login",
        html:`
        <div style="margin:5px">
        <input class= "swal2-input" placeholder="Ingrese su usuario" id ="usuario">
        <input class= "swal2-input" placeholder="Ingrese su clave" id ="clave">
        </div>
        `,

        preConfirm : () =>{
            let usuario = document.getElementById("usuario").value
            let clave = document.getElementById("clave").value

            if(!usuario){
                Swal.showValidationMessage("No hay usuario");
                return false;
            }


            if(!clave){
                Swal.showValidationMessage("No hay clave");
                return false;
            }

            let datos = baseDeDatosLogin[usuario]
            if(!datos){
                Swal.showValidationMessage("El usuario no existe");
                return false;
            }

            if (datos.clave != clave){
                Swal.showValidationMessage("La clave es incorrecta");
                return false
            }
            return datos

        },

        
    });
    return datos;
}