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

socket.on('show', () => {
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

if (mail) {
    document.getElementById('mail').innerHTML = mail
}

function chat() {
    var x = document.getElementById("chat");
    var bt = document.getElementById("chatInit");
    if (x.style.display === "none") {
        bt.style.display = "none";
        x.style.display = "block";
        if (mail == null) {
            mail = prompt('mail');
            ValidaCorreo(mail)
            localStorage.setItem('mail', mail)
        }
    } else {
        x.style.display = "none";
    }
}

socket.on('messages', (chat) => {
    const chatWeb = chat.map(element => {
        return (`<div><strong class="author">${element.author}</strong> <span class="Hora">[${element.time}]: <em class="texto">${element.text}</em></div>`)
    }).join(' ');

    document.getElementById('messages').innerHTML = chatWeb
});



const addMessage = () => {
    const message = {
        author: mail,
        text: document.getElementById('text').value
    };
    console.log(message)
    socket.emit('new-message', message);
    return false
}

const elementochat = document.getElementById('formchat')
elementochat.addEventListener('submit', (event) => {
    event.preventDefault();
    addMessage()
    
})

function ValidaCorreo(valor) {
    re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if (!re.exec(valor)) {
        alert('email no valido');
        mail = prompt('mail');
    }
}
