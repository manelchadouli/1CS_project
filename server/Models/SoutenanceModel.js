var config = require("../configuration/config");
Db = config.Database();

module.exports.AutoriserSoutenance = (id, result) => {
    Db.query("INSERT INTO Soutenance SET IdProjet = ?, DateAutorisation = NOW() ", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
module.exports.AddDateSoutenance = (data,id, result) => {
    Db.query("UPDATE Soutenance SET DateSoutenance = ? WHERE IdProjet = ? ", [data],[id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

module.exports.AddJury = (ids,idj, result) => {
    Db.query("INSERT INTO Jury SET IdSoutenance = ?, IdJury = ? ", [ids],[idj], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
module.exports.AddNoteJury = (data,ids, result) => {
    Db.query("UPDATE Jury SET Note = ? WHERE IdSoutenance = ? ", [data],[ids], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}




