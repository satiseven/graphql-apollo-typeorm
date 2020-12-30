import { Users } from "./entity/Users";
import { sign, verify } from "jsonwebtoken";
export const createAccessToken = (user: Users) => {
  return sign({ userId: user.id, email: user.email }, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });
};
export const createRefreshToken = (user: Users) => {
  return sign({ userId: user.id, email: user.email }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
};
export const verifyToken = (token) => {
  return verify(token, process.env.SECRET_KEY);
};
