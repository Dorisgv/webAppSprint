import { getContact } from "../api.js";

const buttons = document.getElementById('formLogin');
const formRegister = document.getElementById('formRegister'); //no se si me la coga.

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



formRegister.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const url = 'http://localhost:3000'

    const inputName = document.getElementById('inputName');
    const inputCelular = document.getElementById('inputCelular');
    const inputCont = document.getElementById('inputCont');
    const inputUrl = document.getElementById('inputUrl'); 

    const register = {

        "nombre": inputName.value,
        "telefono": inputCelular.value,
        "imagen" : inputUrl.value,
        "contraseña": inputCont.value,
    }
    try {
        const response = await axios.post('http://localhost:3000/usuarios', register)
        swal.fire('Registro exitoso')
    } catch (error) {
        
    }
        inputName.value,
        inputCelular.value,
        inputUrl.value,
        inputCont.value
})

const Createyouraccount = document.querySelector('.buttons1');
Createyouraccount.addEventListener('click', function(){
   document.querySelector('.form-sign-up').style.display = 'block';
   document.querySelector('.form-login').style.display = 'none';
});

const closemodal = document.querySelector('.close-modal');

closemodal.addEventListener('click', function(){
   document.querySelector('.form-sign-up').style.display = 'none';
   document.querySelector('.form-login').style.display = 'block';
});