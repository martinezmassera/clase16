const express = require('express')
const http = require('http');
const { Server } = require("socket.io");

const app = express()

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'))

const products = []
const messages =[]

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
    messages.push(newMessage);
    console.log(messages)
    console.log(newMessage)
    io.sockets.emit('messages',[newMessage]);
});
// FIN CHAT

})
server.listen(8080, () => {
    console.log('Running...')
})