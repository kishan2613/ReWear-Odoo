const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc Register a new user
exports.registerUser = async (req, res) => {
  const { name, address, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      address,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser._id });
    console.log(newUser._id); // ✅ Correct
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

const ADMIN_ID = "6872314f3916a47f62e64122";
const ADMIN_ACCESS_TOKEN = "supersecrettoken123";

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // If the user is admin, return a special admin token too
    const isAdmin = user._id.toString() === ADMIN_ID;

    res.status(200).json({
      message: "Login successful",
      userId: user._id,
      adminAccessToken: isAdmin ? ADMIN_ACCESS_TOKEN : null,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
