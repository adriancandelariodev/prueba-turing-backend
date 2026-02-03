import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { models } from "../models/index.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await models.User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: "Credenciales invalidas." });
  }

  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    return res.status(401).json({ message: "Credenciales invalidas." });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, username: user.username },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  return res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  });
};

export { login };



