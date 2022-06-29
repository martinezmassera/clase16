class Contenedor {
  constructor(db, table) {
    this.db = db;
    this.table = table;
  }


  async leer() {
    const rows = await this.db.from(this.table).select('*')
    return (JSON.parse(
      JSON.stringify(rows)))

  }


  async addItem(body) {
    await this.db(this.table).insert(body)
      .then(() => console.log('agregado ok'))
  }
}

module.exports = Contenedor