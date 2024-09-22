import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const privateJWTKey = process.env.JWT_KEY || "thisisaprivatekeytogeneratetoken";

export function generateToken(user) {
  const userObj = {
    name: user.name,
    email: user.email,
  };

  return jwt.sign(userObj, privateJWTKey, { expiresIn: 60 * 60 });
}

export function createHash(plainText) {
  const saltRounds = 10;
  return bcrypt.hashSync(plainText, saltRounds);
}

export function compareHash(plainText, hash) {
  return bcrypt.compareSync(plainText, hash);
}

export function auth(req, res, next) {
  const authorizationToken = req.header("Authorization");
  if (!authorizationToken) {
    return res.status(400).send({ message: "Auth token required!" });
  }

  const token = authorizationToken.replace("Bearer ", "");
  const decoded = jwt.verify(token, privateJWTKey);
  if (!decoded.email) {
    return res.status(401).send({ message: "Invalid token!" });
  }

  next();
}
