import { getContact } from "./api.js";

const modal_contact = document.getElementById('contact');
const chatContact = document.getElementById('chatContact');//Es el evento de traer los contactos
const contactosWhtapp = document.getElementById('contactos-whtapp');
const containerChat = document.getElementById('container-chat');
const anterior = document.getElementById('anterior');//Boton regresar
const containerMensajes = document.getElementById('container__Mensajes');
const imagenFondo = document.getElementById('imagen-fondo');
const perfilCard = document.getElementById('perfil-card');

const modal_contact = document.getElementById('contact');
const chatContact = document.getElementById('chatContact');//Es el evento de traer los contactos
const contactosWhtapp = document.getElementById('contactos-whtapp');
const containerChat = document.getElementById('container-chat');
const anterior = document.getElementById('anterior');//Boton regresar
const containerMensajes = document.getElementById('container__Mensajes');
const imagenFondo = document.getElementById('imagen-fondo');
const perfilCard = document.getElementById('perfil-card');

async function contact() {
    containerChat.style.display = 'none'; //No se muestre
    modal_contact.style.display = "block"; //Si se muestre
    const contact = await getContact();
    console.log(contact);
    contact.forEach((product) =>  {
        perfilCard.innerHTML +=`
        <div class="contact-card__perfil" id="contact-card" name="${product.id}">
                <div class="contact-card__perfil__image" >
                <img src="${product.imagen}" alt="${product.nombre}" />
                </div>
                <span class="contact-card__perfil__name">${product.nombre}</span>
        </div>
            `;
    });
    const contactCard = document.getElementsByClassName('contact-card__perfil');
    
        Array.from(contactCard).forEach((element) => {
            let id = element.getAttribute('name');
            element.addEventListener('click', () => {
            imagenFondo.style.display = "none";
        containerMensajes.style.display = "block";
        console.log(id);
    });
});
}    
        

anterior.addEventListener('click', () => {
    containerChat.style.display = 'block'; //
    modal_contact.style.display = "none"; //
});

chatContact.addEventListener('click', contact);

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

