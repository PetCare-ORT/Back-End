import Jwt from "jsonwebtoken";

export default async function auth(req, res, next) {
  try {
    const token = req.header("Token");
    Jwt.verify(token, process.env.CLAVE_SECRETA);
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
}
