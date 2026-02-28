const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

async function registerController(req, res) {
  const { email, username, password, bio, profileImage } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: `User already exists ${isUserAlreadyExists === email ? "with email" : "with username"}`,
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const user = await userModel.create({
    email,
    username,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "User created successfully",
    user: {
      bio: user.bio,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
    },
  });
}

async function loginController(req, res) {
  const { email, username, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (!user) {
    return res.status(404).json({ message: "User doesn't exists" });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const isPasswordValid = hash === user.password;
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Password invalid" });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "User loggedIn successfully",
    user: {
      bio: user.bio,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
    },
  });
}

module.exports = { registerController, loginController };
