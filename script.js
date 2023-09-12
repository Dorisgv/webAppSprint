import { getContact } from "./api.js";

const modal_contact = document.getElementById("contact");
const chatContact = document.getElementById("chatContact"); //Es el evento de traer los contactos
const contactosWhtapp = document.getElementById("contactos-whtapp");
const containerChat = document.getElementById("container-chat");
const anterior = document.getElementById("anterior"); //Boton regresar
const containerMensajes = document.getElementById("container__Mensajes");
const imagenFondo = document.getElementById("imagen-fondo");
const perfilCard = document.getElementById("perfil-card");
const containerUser = document.getElementById("containerUser");
const infoSesion = sessionStorage.getItem('searchUser');
const today = new Date();

let day = today.getDate();
 
// `getMonth()` devuelve el mes (de 0 a 11)
let month = today.getMonth() + 1;
 
// `getFullYear()` devuelve el año completo
let year = today.getFullYear();
 
// muestra la fecha de hoy en formato `MM/DD/YYYY`
console.log(`${month}/${day}/${year}`);
let now = today.toLocaleTimeString('en-US');

console.log(now);


async function contact() {
  containerChat.style.display = "none"; //No se muestre
  modal_contact.style.display = "block"; //Si se muestre
  const contact = await getContact();
  console.log(contact);
  contact.forEach((product) => {
    perfilCard.innerHTML += `
        <div class="contact-card__perfil" id="contact-card" name="${product.id}">
                <div class="contact-card__perfil__image" >
                <img src="${product.imagen}" alt="${product.nombre}" />
                </div>
                <span class="contact-card__perfil__name">${product.nombre}</span>
        </div>
            `;
  });
  const contactCard = document.getElementsByClassName("contact-card__perfil");

  Array.from(contactCard).forEach((element) => {
    let idUser = element.getAttribute("name");
    element.addEventListener("click", () => {
      imagenFondo.style.display = "none";
      containerMensajes.style.display = "block";
      console.log(idUser);

      let infoContac = contact.find((item) => item.id == idUser);
      // console.log(infoContac);
      renderChat(infoContac);
      enviarMensaje(infoContac);
    });
  });
}

anterior.addEventListener("click", () => {
    containerChat.style.display = "block"; //
    modal_contact.style.display = "none"; //
    imagenFondo.style.display = "block"; 
    containerMensajes.style.display = "none";
});

chatContact.addEventListener("click", contact);

async function renderChat(infoContac) {
  console.log(infoContac.nombre);
  infoUser.innerHTML += `
    <img src="${infoContac.imagen}" alt=""> 
    <span>${infoContac.nombre}</span>
`;
}


async function enviarMensaje(e, infoContac) {
    e.preventDefault();
    const perfil = JSON.parse(infoSesion)
    const mensaje = document.getElementById('mensajeChat');
    const updatedData = {
      idUser1: perfil.id, //capturar inicio de sesion// INicia la conversacion
      idUser2: infoContac.id, //Iniciar conversacion// a quien le llega la conversacion
      mensaje: [
        {
          //Array de conversaciones
          sendBy: perfil.id, //Quien envió el mensaje
          fecha: `${month}/${day}/${year}`,
          hora: `${now}`,
          texto: mensaje.value
        },
      ],
    };

    try {
      const response = await axios.post('http://localhost:3000/Conversaciones', updatedData);
      alert("Mensaje enviado:", response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const enviar = document.getElementById('enviar');
  enviar.addEventListener('submit',  enviarMensaje)
  


function perfilLogin(params) { //Inició sesión
    const perfil = JSON.parse(infoSesion)
    containerUser.innerHTML += `
        <img src="${perfil.imagen}" alt="usuario1" class="container__user--cover">
    `
}

perfilLogin();