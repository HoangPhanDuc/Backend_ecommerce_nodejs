import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  console.log(token);
  if (!token) {
    return res.status(401).json({ mess: "Access denied!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.decoded = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ mess: "Token has expired!", error });
    }
    return res.status(403).json({ error });
  }
};
