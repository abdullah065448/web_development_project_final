import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const bearer = req.headers.authorization?.split(" ")[1];
  const token = req.cookies?.accessToken || bearer;
  if (!token) return res.status(401).json({ message: "Missing token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "secret");
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
