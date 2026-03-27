const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ message: "No token enviado" });
  }

  const token = auth.split(" ")[1];

  try {

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;

    next();

  } catch {

    return res.status(401).json({ message: "Token inválido" });

  }

}

module.exports = authMiddleware;