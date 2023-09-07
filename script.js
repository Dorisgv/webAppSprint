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

