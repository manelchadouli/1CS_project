const bcrypt = require("bcrypt");
var config_Password = {

    hash_Password: function(pass) {
        return (bcrypt.hashSync(pass, 10));
    },
    generatePassword: function(length) {
        let password = "";
        for (let i = 0; i < length; i++) {
            password += String.fromCharCode(Math.floor(Math.random() * 92 + 33));
        }
        return password;
    }
}



module.exports = config_Password;