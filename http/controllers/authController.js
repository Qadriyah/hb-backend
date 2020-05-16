import jwt from 'jsonwebtoken';
import fs from 'fs';

const authController = {};

/**
 * Authenticates a user and return a jwt token
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };

  fs.writeFile('data/users.json', JSON.stringify(user), 'utf8', (err) => {
    if (err) throw err;
    const secretOrKey = Buffer.from(process.env.PRIVATE_KEY, 'base64');
    const payload = {
      username: user.username,
    };
    const token = jwt.sign(payload, secretOrKey, {
      expiresIn: 604800,
      algorithm: 'RS256',
      issuer: process.env.HOST,
    });
    return res.status(200).json({
      msg: 'Success',
      token,
    });
  });
};

authController.login = login;

export default authController;
