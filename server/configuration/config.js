const mysql = require("mysql");
var config = {

    Db: {
        //mysql database configuration...
        host: 'localhost',
        user: 'root',
        password: '12345',
        database: 'PFE_DATA_BASE'
    },

    Database: function() {
        const Database = mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '12345',
            database: 'PFE_DATA_BASE'
        })

        Database.connect((error) => {
            if (error) {
                let message = new Error(error);
                console.log(message);
                //throw error
            }

        });
        return Database;
    }
}
module.exports = config;