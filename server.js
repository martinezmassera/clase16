const express = require('express')
const http = require('http');
const { Server } = require("socket.io");
const Contenedor = require('./contenedor/contenedorchat');
const optionssqlite = require('./options/sqlite3.js')
const optionsmariadb = require('./options/mariaDB.js')
const contChat = new Contenedor(optionssqlite, "chat");
const contProd = new Contenedor(optionsmariadb, "productos");
const app = express()

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 8080
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'))




app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})


app.get('/products', async(req, res) => {
    const products = await contProd.leer()
    res.render('form', { products })
})

io.on('connection', socket => {
    // INICIO PRODUCTOS
    socket.on('add', async(data) => {
        await contProd.addItem(data)
        io.sockets.emit('show', `new data`)
    })
    // // FIN PRODUCTOS

    // INICIO CHAT
    socket.on('new-message', async (newMessage) => {
        newMessage.time = new Date().toLocaleString();
        await contChat.addItem(newMessage)
        const leer = await contChat.leer();
        io.sockets.emit('messages', leer);
    });
    // FIN CHAT

})
server.listen(PORT, () => {
    console.log('Running...')
})