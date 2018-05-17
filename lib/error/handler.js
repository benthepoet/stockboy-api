module.exports = function (error, req, res, next) {
    console.log(error);
    res.sendStatus(500);
}