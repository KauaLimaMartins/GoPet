const jwt = require('jsonwebtoken');
const Yup = require('yup');

const { secret, expiresIn } = require('../../config/auth');

const User = require('../models/User');

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'user not found' });
    }

    // Check if the password is valid
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      // First parameter: the payload (additional information to incorporate into the token)
      // Second parameter: a unique encrypted string
      // Third parameter: some configuration
      token: jwt.sign({ id }, secret, {
        expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();
