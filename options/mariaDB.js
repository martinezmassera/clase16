const knex = require('knex')
const options = knex({
        client: 'mysql', 
        connection:{
            host:'localhost',
            user:'root',
            password:'',
            database: 'clasech'
        }
})

module.exports = options
