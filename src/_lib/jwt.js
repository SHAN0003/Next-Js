// lib/jwt.js
import jwt from "jsonwebtoken";

const secret = "khopaditodsalleka69";

export function signToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: "10m" }); //expire in 10 minutes
}
