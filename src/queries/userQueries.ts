import { LoginPaylod, User } from "../context/AuthContext";

export const findUser = (db: User[], payload: LoginPaylod) => {
  if (db.length) {
    return db.filter(
      (user) =>
        user.email.toLowerCase() === payload.email.toLowerCase() &&
        user.password === payload.password
    )[0];
  } else {
    return null;
  }
};
export const userExist = (db: User[], email: string) => {
  if (db.length) {
    return db.filter(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    )[0];
  } else {
    return null;
  }
};
