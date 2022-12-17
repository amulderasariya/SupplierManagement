import { User } from '../models/User.js';
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js';

export const register = async (req, res) => {
  const { email, password, role, organization } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) throw { code: 400 };

    user = new User({ email, password, role, organization });
    await user.save();

    const { token, expiresIn } = generateToken(user.id, user.role);
    generateRefreshToken(user.id, user.role, res);

    return res.status(201).json({ token, expiresIn, id: user._id });
  } catch (error) {
    console.log(error);
    if (error.code === 400) {
      return res.status(400).json({ errors: [{ msg: 'User already exist' }] });
    }
    return res.status(500).json({ errors: [{ msg: 'Something went wrong' }] });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ errors: [{ msg: 'Username/password is invalid' }] });

    const isValid = await user.comparePassword(password);
    if (!isValid) return res.status(403).json({ errors: [{ msg: 'Username/password is invalid' }] });

    const { token, expiresIn } = generateToken(user.id, user.role);
    generateRefreshToken(user.id, user.role, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Something went wrong' }] });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { avatar, city, state, organization, country } = req.body;
    let user = await User.findByIdAndUpdate(req.user.uid, { avatar, city, state, organization, country });
    userInfo(req, res);
  } catch (e) {
    return res.status(500).json({ errors: [{ msg: 'Something went wrong' }] });
  }
};

export const userInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.uid);
    return res.json({ ...user.toJSON(), password: undefined });
  } catch (error) {
    return res.status(500).json({ errors: [{ msg: 'Something went wrong' }] });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'SUPPLIER' });
    return res.json(users.map((user) => ({ ...user.toJSON(), password: undefined })));
  } catch (error) {
    return res.status(500).json({ errors: [{ msg: 'Something went wrong' }] });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.user.uid, req.user.role);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Something went wrong' }] });
  }
};

export const logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ ok: true });
};
