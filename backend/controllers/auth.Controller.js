const jwt = require("jsonwebtoken");

const auth = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    if (username === process.env.USER && password === process.env.PASSWORD) {
      const token = jwt.sign({ username }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token, message: "Login successful" });
    }

    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const user = (req, res) => {
  console.log(req.user);

  res.status(200).json({ user: req.user });
};

module.exports = { auth, user };
