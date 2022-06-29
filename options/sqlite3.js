const knex = require('knex')
const options = knex({
        client: 'sqlite3', 
        connection:{ 
            filename:'./DB/eccommerce.sqlite'
        },
        useNullAsDefault: true
})

module.exports = options


