import { getContact } from "./api.js";

const modal_contact = document.getElementById('modal_contact');
const Btn__New = document.getElementById('Btn__New');
async function contact() {
    modal_contact.style.display = "block";
    const contact = await getContact();
    console.log(contact);
    contact.forEach((product) =>  {
        modal_contact.innerHTML +=`
            <article class="contact-card">
                    <img class="contact-image" src="${product.imagen}" alt="${product.nombre}" />
                    <h2 class="contact-name">${product.nombre}</h2>
            </article>
            `;
        
    });
}

Btn__New.addEventListener('click', contact)

