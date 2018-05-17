module.exports = function (req, res) {
    const { count, data, skip, limit } = res.envelope; 
    
    if (!isNil(count) && !isNil(skip) && !isNil(limit)) {
        res.set('Content-Range', `${skip}-${skip + limit}/${count}`);    
    }
    
    res.send(data);
}

function isNil(value) {
    return value === null || value === undefined;
}