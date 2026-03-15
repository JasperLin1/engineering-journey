const jwt = require("jsonwebtoken");
const User = require("../models/User");

function sign(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

exports.register = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: "email and password required" });
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "email already registered" });
  const user = await User.create({ email, password });
  const token = sign(user);
  res.status(201).json({ token, user: { id: user._id, email: user.email } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: "email and password required" });
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "invalid credentials" });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: "invalid credentials" });
  const token = sign(user);
  res.json({ token, user: { id: user._id, email: user.email } });
};

exports.me = async (req, res) => {
  const user = await User.findById(req.user.id).select("_id email");
  if (!user) return res.status(404).json({ message: "not found" });
  res.json({ user: { id: user._id, email: user.email } });
};

exports.updateName = async (req, res) =>{

  const { name } = req.body;

  if(!name || name.length < 2){
    return res.status(400).json({
      message: "Name muse be at least 2 characters"
    });
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name},
    { new: true }
  );

  res.josn(user);

};
