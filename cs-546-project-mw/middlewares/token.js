import jwt from 'jsonwebtoken';

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error('token does not exist');

    const { uid, role } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

    req.user = { uid, role };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ errors: [{ msg: error.message }] });
  }
};

export const requireToken =
  (roles = []) =>
  (req, res, next) => {
    try {
      let token = req.headers?.authorization;

      if (!token) throw new Error('No Bearer');

      token = token.split(' ')[1];
      const { uid, role } = jwt.verify(token, process.env.JWT_SECRET);

      req.user = { uid, role };
      if (roles.length > 0 && !roles.includes(role))
        return res.status(403).send({ errors: [{ msg: `Unauthorized access for ${role.toLowerCase()}` }] });
      next();
    } catch (error) {
      console.log(error.message);
      return res.status(401).send({ errors: [{ msg: error.message }] });
    }
  };
