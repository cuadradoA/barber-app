const jwt = require("jsonwebtoken");

exports.login = (req, res) => {

  const { username, password } = req.body;

  const OWNER_USER = process.env.OWNER_USER;
  const OWNER_PASS = process.env.OWNER_PASS;

  if (username !== OWNER_USER || password !== OWNER_PASS) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({ token });

};