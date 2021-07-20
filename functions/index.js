const jwt = require("jsonwebtoken");
const axios = require('axios');

module.exports = functions = {
    createToken:async(newUser, secret, expiresIn) => {
        const { _id, cellnumber, deviceId } = newUser;
        const token = jwt.sign({ _id, cellnumber, deviceId }, secret, { expiresIn });
        return token
    },
    handlePayment:async(input) => {
        const SECRET_KEY = 'sk_test_960bfde0VBrLlpK098e4ffeb53e1'
        try {
        const data = await axios.post(`https://online.yoco.com/v1/charges/`, {
            token: input.token,
            amountInCents: input.amount,
            currency: 'ZAR',
            }, {
            headers: { 'X-Auth-Secret-Key': SECRET_KEY}
            });
            console.log(data)
            return true
        } catch (error) {
        console.log(error)
        throw new Error(error)
        }
    }
}