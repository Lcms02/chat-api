const jwt = require('jsonwebtoken');

const checktoken = async (token, id, key) => jwt.verify(token, key, (err, decoded) => {
    try {
        const decoded =jwt.verify(token, key);
        console.log(decoded);
        return decoded;
    } catch (err) {
        console.error(err);
    }
});

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