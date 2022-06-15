const socket = io()

const btn = document.getElementById('load')
const chatInit = document.getElementById('chatInit')


btn.onclick = e => {
    e.preventDefault()
    var valor = '';
    if (document.getElementById('word').checked) {
        valor = 'https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_word-128.png'
    } else if (document.getElementById('ai').checked) {
        valor = 'https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_adobe_illustrator-128.png'
    } else if (document.getElementById('google').checked) {
        valor = 'https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-128.png'
    }

    const valueFormProducts = {
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        thumbnail: valor,
    }
    socket.emit('add', valueFormProducts)
    return false
}

socket.on('show', data => {
    fetch('/products')
        .then(r => r.text())
        .then(html => {
            const div = document.getElementById("tableProducts")
            div.innerHTML = html
        })
        .catch(e => alert(e))
})




// ----------------------------------------------------------------------------------
// --                                                                              --
// --           ----------------          CHAT          ----------------           --
// --                                                                              --
// ----------------------------------------------------------------------------------
let mail = localStorage.getItem('mail');
if (mail == null){
    mail = prompt('mail');
    localStorage.setItem('mail', mail)
}

if (mail){
    document.getElementById('mail').innerHTML = mail
}

// function chat() {
//     var x = document.getElementById("chat");
//     var bt = document.getElementById("chatInit");
//     if (x.style.display === "none") {
//         bt.style.display = "none";
//         val = prompt('Ingresar Mail');
//         x.style.display = "block";
//     } else {
//         x.style.display = "none";
//     }
// }
socket.on('messages', (chat) => {
    render(chat)
});

const render = (chat) => {
    chat.forEach(element => {
        $('#messages').append(`<div>
        <strong class="author">${element.author}</strong> <span class="Hora">[${element.time}]: <em class="texto">${element.text}</em></div>`)
    });
}

const addMessage = () => {
    const message = {
        author: document.getElementById('author').value,
        text: document.getElementById('text').value,
    };
    console.log(message)
    socket.emit('new-message', {message, mail});
    return false
}

const elementochat = document.getElementById('formchat')
elementochat.addEventListener('submit', (event) => {
    event.preventDefault();
    ValidaCorreo(document.getElementById('author').value)
})

function ValidaCorreo(valor) {
    re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if (!re.exec(valor)) {
        alert('email no valido');
    }
    else addMessage();
}
