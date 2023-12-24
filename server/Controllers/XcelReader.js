const fileFilter = function(req, file, cb) {
    const allowedTypes = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("wrong file type");
        error.code = "WORNG_EXTENSION";
        cb(error, false)
    } else
        cb(null, true);
}
module.exports = fileFilter;