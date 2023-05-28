const jwt = require('jsonwebtoken');

const checktoken = async (token,id, key) => {
    try{
        const decoded = jwt.verify(token, key,(err, decoded) => {
            if (err) {
                return false;
            }
            if(decoded){
                if(decoded.id == id){
                    return false;
                }
            }
            
        });
        return false;
    }catch(err){
    }
    return true;
};

const setToken = async (id, key) => {
    console.log(id);
    if (id) {
        return jwt.sign({
            id
        }, key, {
            expiresIn: 28800
        });
    }
    return false;
};

module.exports = {
    checktoken,
    setToken,
};