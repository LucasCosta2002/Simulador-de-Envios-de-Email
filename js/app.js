//Variables
const formulario = document.querySelector('#enviar-mail');
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

//no hay que validar solo con expresiones regulares ya que javascript se puede deshabilitar en el navegador, hay que validar en el backend
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//funciones

eventListener()
function eventListener(){
    document.addEventListener('DOMContentLoaded', iniciarApp);

    email.addEventListener('blur', validarFormmulario);
    asunto.addEventListener('blur', validarFormmulario);
    mensaje.addEventListener('blur', validarFormmulario);

    btnReset.addEventListener('click', resetearForm)

    formulario.addEventListener('submit', enviarEmail);
}

function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}


function validarFormmulario(e){
    //comprobar que no esten vacios los campos
    if(e.target.value.length > 0){

        //borrar alerta de error
        const error = document.querySelector('p.error');
        if (error) {
            error.remove()
        }
        e.target.classList.remove('border', 'border-red-500')
        e.target.classList.add('border', 'border-green-500')
    }else {
        e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-red-500')
        mostrarError('Todos los campos son obligatorios')
    }

    if (e.target.type === 'email') {
        if (er.test(e.target.value)) {
            const error = document.querySelector('p.error');
            if (error) {
                error.remove()
            }
            e.target.classList.remove('border', 'border-red-500')
            e.target.classList.add('border', 'border-green-500')
        }else{
            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500')
            mostrarError('Email no válido')
        }
    }

    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
}

function mostrarError(mensaje){
    const parrafo = document.createElement('p');
    parrafo.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');
    parrafo.textContent = mensaje;

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.appendChild(parrafo);
    };
}

function enviarEmail(e){
    e.preventDefault();

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none'

        const mensaje = document.createElement('p');
        mensaje.textContent = "El email se envió correctamente";
        mensaje.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        formulario.insertBefore(mensaje, spinner);

        setTimeout(() => {
            mensaje.remove();
            resetearForm();
        }, 4000);
    }, 3000);
}

function resetearForm(){
    formulario.reset();

    iniciarApp();

    email.classList.remove('border', 'border-green-500')
    asunto.classList.remove('border', 'border-green-500')
    mensaje.classList.remove('border', 'border-green-500')
}

//1 ejecutar funcion para cargar todos los eventos del dom
// 2 seleccionar el boton de emviar y restringirle el envio y aplicarle clases
// 3 seleccionar inputs del formulario
// 4 validar formulario con if 
//5 mostrar error 
// 6 validar email con .type y expresion regular de internet