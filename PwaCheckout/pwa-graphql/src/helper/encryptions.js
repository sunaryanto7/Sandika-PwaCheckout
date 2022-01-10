require('dotenv').config()
const crypto = require("crypto");

const key = process.env.KEY;
const algorithm = process.env.ALGORITHM;
const iv = key.substr(0, 16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let crypted = cipher.update(text, 'utf8', 'base64');
  crypted += cipher.final('base64');

  return crypted;
};

const decrypt = (text) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decoded = decipher.update(text, 'base64', 'utf8')
  decoded += decipher.final('utf8');

  return decoded;
};

module.exports = {
  encrypt,
  decrypt,
};
