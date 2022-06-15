const express = require('express')
const http = require('http');
const { Server } = require("socket.io");
const Contenedor = require('./contenedor')
const prod = new Contenedor('./chat.json')
const app = express()

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const PORT = process.env.PORT || 8080
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'))

const products = []


app.get('/', (req, res) => {
    
    res.render('index')
})

app.post('/', (req, res) => {
    console.log(req.body)
    products.push(req.body)
    res.json(req.body)
})


app.get('/products', (req, res) => {
    res.render('form', { products })
})

io.on('connection', socket => {
    // INICIO PRODUCTOS
    socket.on('add', (data) => {
        console.log(data)
        products.push(data)
        io.sockets.emit('show', `new data`)
    })
// FIN PRODUCTOS

 // INICIO CHAT
 socket.on('new-message', (newMessage) => {
    newMessage.time = new Date().toLocaleString();
    prod.addItem(newMessage)
    const leer = prod.leer()
    io.sockets.emit('messages', leer);
});
// FIN CHAT

})
server.listen(PORT, () => {
    console.log('Running...')
})