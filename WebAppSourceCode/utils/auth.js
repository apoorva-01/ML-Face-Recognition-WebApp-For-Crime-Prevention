import jwt from 'jsonwebtoken';

const signToken = (customer) => {
  return jwt.sign(
    {
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      isAdmin: customer.isAdmin,
    },

    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};
const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Token is not valid' });
      } else {
        req.customer = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token is not suppiled' });
  }
};
const isAdmin = async (req, res, next) => {
  if (req.customer.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'customer is not admin' });
  }
};

export { signToken, isAuth, isAdmin };
