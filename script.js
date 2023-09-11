import { getContact } from "./api.js";

const modal_contact = document.getElementById("contact");
const chatContact = document.getElementById("chatContact"); //Es el evento de traer los contactos
const contactosWhtapp = document.getElementById("contactos-whtapp");
const containerChat = document.getElementById("container-chat");
const anterior = document.getElementById("anterior"); //Boton regresar
const containerMensajes = document.getElementById("container__Mensajes");
const imagenFondo = document.getElementById("imagen-fondo");
const perfilCard = document.getElementById("perfil-card");

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
    });
  });
}

anterior.addEventListener("click", () => {
  containerChat.style.display = "block"; //
  modal_contact.style.display = "none"; //
});

chatContact.addEventListener("click", contact);

/* const formLogin = document.getElementById("formLogin");
const signupModal = document.getElementById("signupModal");
const Createyouraccount = document.getElementById("create");

Createyouraccount.addEventListener("click", function () {
  formLogin.style.display = "none";
  signupModal.style.display = "block";
});

const closemodal = document.querySelector(".close-modal");

closemodal.addEventListener("click", function () {
  document.getElementById(".form-sign-up").style.display = "none";
  document.getElementById(".form-login").style.display = "block";
}); */

async function renderChat(infoContac) {
  console.log(infoContac.nombre);
  infoUser.innerHTML += `
    <img src="${infoContac.imagen}" alt=""> 
    <span>${infoContac.nombre}</span>
`;
}

function enviarMensaje() {
  const addProducto = async (e) => {
    e.preventDefault();
    const updatedData = {
      idUser1: nombreProducto.value, //capturar inicio de sesion
      idUser2: precioProducto.value, //Iniciar conversacion
      mensaje: [
        {
          //Array de conversaciones
          sendBy: imagen0.value,
          fecha: imagen1.value,
          hora: imagen2.value,
          texto: imagen3.value,
        },
      ],
    };

    try {
      const response = await axios.post(`${URL}/productos`, updatedData);
      alert("Producto agreado:", response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    listProducts(currentCollection);
  };
}
