import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try { 
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization denied" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = decoded.id;
  next();
}catch (error) {
  console.error(error);
  res.status(401).json({message: "Token is not valid"})
}
};
export default authUser;
