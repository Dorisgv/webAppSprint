/*var buttons = document.getElementById("buttons");

buttons.addEventListener("click",function(){
    Swal.fire({
        title: 'Sweet!',
        text: 'Modal with a custom image.',
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
});*/

const usuario = document.querySelector('#input');
const contrasena = document.querySelector('#input');
const buttons = document.querySelector('buttons');

buttons.addEventListener("click",()=>{
    if(usuario.ariaValueMax.length == 0){
        alert('Por favor llena los campos');
    }else{
        alert('Hola'+ usuario.value);
    }
});


