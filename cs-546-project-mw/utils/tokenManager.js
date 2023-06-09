import jwt from 'jsonwebtoken';
export const generateToken = (uid, role) => {
  const expiresIn = '30d';

  try {
    const token = jwt.sign({ uid, role }, process.env.JWT_SECRET, { expiresIn });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (uid, role, res) => {
  const expiresIn = '30d';
  try {
    const refreshToken = jwt.sign({ uid, role }, process.env.JWT_REFRESH, {
      expiresIn,
    });
    var date = new Date();
    date.setDate(date.getDate() + 30);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODE === 'developer'),
      expires: date,
      sameSite: 'none',
    });
  } catch (error) {
    console.log(error);
  }
};
