import { getContact } from "./api.js";
import { getConversaciones } from "./api.js";

const modal_contact = document.getElementById("contact");
const chatContact = document.getElementById("chatContact"); //Es el evento de traer los contactos
const contactosWhtapp = document.getElementById("contactos-whtapp");
const containerChat = document.getElementById("container-chat");
const anterior = document.getElementById("anterior"); //Boton regresar
const containerMensajes = document.getElementById("container__Mensajes");
const imagenFondo = document.getElementById("imagen-fondo");
const perfilCard = document.getElementById("perfil-card");
const containerUser = document.getElementById("containerUser");
const infoSesion = sessionStorage.getItem("searchUser");
const conversaciones = document.getElementById("conversaciones");
const recibidos = document.getElementById("recibidos");
const enviados = document.getElementById("enviados");
const containerMensaje = document.getElementById("container-mensaje");
const today = new Date();

let day = today.getDate();

// `getMonth()` devuelve el mes (de 0 a 11)
let month = today.getMonth() + 1;

// `getFullYear()` devuelve el año completo
let year = today.getFullYear();

// muestra la fecha de hoy en formato `MM/DD/YYYY`
console.log(`${month}/${day}/${year}`);
let now = today.toLocaleTimeString("en-US");

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
      sessionStorage.setItem("infoContac", JSON.stringify(infoContac));
      console.log(infoContac);
      renderChat(infoContac);
      containerChats();
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
  infoUser.innerHTML = `
    <img src="${infoContac.imagen}" alt=""> 
    <span>${infoContac.nombre}</span>
`;
}

async function enviarMensaje() {
  //e.preventDefault();
  const infoContacSesion = sessionStorage.getItem("infoContac");
  const infoContac2 = JSON.parse(infoContacSesion);
  console.log(infoContac2);
  const perfil = JSON.parse(infoSesion);
  const mensaje = document.getElementById("mensajeChat").value;
  const updatedData = {
    idUser1: perfil.id, //Capturar inicio de sesion// Inicia la conversacion
    idUser2: infoContac2.id, //Iniciar conversacion// a quien le llega la conversacion
    mensaje: [
      {
        //Array de conversaciones
        sendBy: perfil.id, //Quien envió el mensaje
        fecha: `${month}/${day}/${year}`,
        hora: `${now}`,
        texto: mensaje,
      },
    ],
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/Conversaciones",
      updatedData
    );
    alert("Mensaje enviado:", response.data);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

const enviar = document.getElementById("enviarMensaje");
enviar.addEventListener("click", () => {
  console.log("hice click");
  enviarMensaje();
});

function perfilLogin() {
  //Inició sesión
  const perfil = JSON.parse(infoSesion);
  containerUser.innerHTML += `
        <img src="${perfil.imagen}" alt="usuario1" class="container__user--cover">
    `;
}

perfilLogin();

async function containerChats() {
  const conversaciones = await getConversaciones();
  const contact = await getContact();
  const idPrincipal = JSON.parse(sessionStorage.getItem("searchUser"));
  const idcontact = JSON.parse(sessionStorage.getItem("infoContac"));
  console.log(conversaciones);
  console.log(idPrincipal);
  console.log(idcontact);

  let filterChat = conversaciones.filter(
    (item) => item.idUser1 == idPrincipal.id || item.idUser2 == idPrincipal.id
  );

  let seeChats = filterChat.filter(
    (item) =>
      (item.idUser1 == idPrincipal.id && item.idUser2 == idcontact.id) ||
      (item.idUser1 == idcontact.id && item.idUser2 == idPrincipal.id)
  );

  console.log(filterChat);
  console.log(seeChats);

    if (seeChats){
      seeChats.forEach((item) => {
        let messages = item.mensaje;
        console.log(messages);
        let menEnviados = messages.filter(item => item.sendBy === idPrincipal.id);
        console.log(menEnviados)
        messages.forEach((message) => {
          let id = message.sendBy
          let texto = message.texto;
          console.log(texto)
          console.log(id);
          if (id === idPrincipal.id) {
            enviados.innerHTML += `
          <article class = "enviados">
            <span>${message.texto}</span>
            <span>${message.fecha}</span>
            <span>${message.hora}</span>
          </article>
          `;
          }  else {
            recibidos.innerHTML += `
          <article class = "recibidos">
          <span>${message.texto}</span>
          <span>${message.fecha}</span>
          <span>${message.hora}</span>
          </article>
          `; 
          }
        });
      });
    }else{
      recibidos.style.display = 'none';
      enviados.style.display = 'none';
      containerMensaje.innerHTML = `
      <span>No has iniciado una conversacion!</span>
      `
    }
}

async function contactChat() {
  const contact = await getContact();
  console.log(contact);
  contact.forEach((product) => {
    conversaciones.innerHTML += `
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
      sessionStorage.setItem("infoContac", JSON.stringify(infoContac));
      console.log(infoContac);
      renderChat(infoContac);
      containerChats();
    });
  });
}
contactChat();
