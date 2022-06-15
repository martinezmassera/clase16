const fs = require('fs')
let countId = 1
class Contenedor {
    constructor(archivo) {
        this.archivo = archivo
        this.productos = []
    }

    leer() {
        try {
            const datos = fs.readFileSync(this.archivo)
            const datosParse = JSON.parse(datos)
            this.productos = datosParse
            return datosParse
        } catch (error) {
            return { error: 'archivo no encontrado' }
        }
    }

    write() {
        const stringProd = JSON.stringify(this.productos)
        fs.writeFileSync(this.archivo, stringProd)
    }

    countId() {

        const id = countId++;
        return id
    }

    addItem(body) {
        console.log(this.leer())
        const leer = this.leer()
        if (leer.length < 1) {
            countId = 1
        } else {
            countId = leer.length + 1
        }
        const id = this.countId()
        body['id'] = id
        this.productos.push(body)
        this.write()
        return 'Producto Agregad0'
    }
}

module.exports = Contenedor