const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "You are not authenticated" });
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "nazila");
  } catch (error) {
    // Later add global error handling
    // Add this status code (500) to all the responses in Swagger
    return res.status(500).json({ message: error });
  }
  req.userId = decodedToken.id;
  next();
};
