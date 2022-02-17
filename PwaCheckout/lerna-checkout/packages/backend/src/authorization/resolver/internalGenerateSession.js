const requestGraph = require('../request');
const { encrypt, decrypt } = require('../../helper/encryptions');

/**
 * --------------------------------------------
 * QUERY TO VALIDATE STATE USING CUSTOMER EMAIL
 * --------------------------------------------
 */
const query = `
{
    customer {
        email
    }
}
`;


/**
 * --------------------------------------------
 * DECRYPT STATE TO 
 * {token, cartId, redirect_path}
 * --------------------------------------------
 */
const decryptState = (state) => {
    const raw = decrypt(state);
    const res = raw.split('|');

    const token = res[0];
    const cartId = res[1];
    const redirect_path = res[2] ? res[2] : '/';

    const result = {
        token,
        cartId,
        redirect_path,
    };

    return result;
};


/**
 * --------------------------------------------
 * MAIN FUNCTION TO GENERATE SESSION
 * --------------------------------------------
 */
const internalGenerateSession = async (parent, { state }, context) => {

    const { req } = context;
    const { token, cartId, redirect_path } = decryptState(state);

    if (state && token) {
        req.session.token = token;
    }

    const res = await requestGraph(query, {}, context);
    console.log(res)

    if (res) {
        return {
            cartId,
            isLogin: !!token,
            redirect_path,
        };
    } else {
        return {
            cartId,
            isLogin: !!token,
            redirect_path,
        }
    };

};

module.exports = internalGenerateSession;
