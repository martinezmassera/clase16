class Contenedor {
  constructor(db, table) {
    this.db = db;
    this.table = table;
  }

  async leer() {
    await this.db.from(this.table).select('*')
      .then(rows => {
        console.log(rows)
        return (JSON.parse(
          JSON.stringify(rows)))
      })
      .catch(err => console.log(err))
      .finally(() => this.db.destroy())

  }

  async addItem(body) {
    await this.db(this.table).insert(body)
      .then(() => console.log('agregado ok'))
      .catch(err => console.log(err))
      .finally(() => this.db.destroy())
  }

}

module.exports = Contenedor