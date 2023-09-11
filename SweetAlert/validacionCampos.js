import { getContact } from "../api.js";


const buttons = document.getElementById('formLogin');

buttons.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const user = await getContact();
    console.log(user);
    const inputPhone = document.getElementById('inputPhone').value;
    const inputPassword = document.getElementById('inputPassword').value;
    let searchUser = user.find(e => e.telefono === inputPhone && e.contraseña === inputPassword);
    console.log(searchUser);
    if(inputPhone === "" && inputPassword === ""){
        Swal.fire('Por favor llena los campos');
    }else if(searchUser){
        sessionStorage.setItem('searchUser', JSON.stringify(searchUser));
        Swal.fire(`Hola, ${searchUser.nombre}`);
        window.location.href='/pages/home_page.html';
    }else{
        Swal.fire('usuario no encontrado');
        /*alert('Telefono/contraseña invalidas, vuelve a intentarlo.');*/
    }
});


