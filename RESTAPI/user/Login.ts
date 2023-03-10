import { RESTMethods, RESTHandler } from "tetion-server-boilerplate";
import { Encryptions } from "../../helpers/Encryptions";
import { DisadusUser } from "../../types";
import phas from "password-hash-and-salt";
export const Login = {
  path: "/login/",
  method: RESTMethods.POST,
  sendUser: false,
  run: async (req, res, next, _) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Email and password required");
      return;
    }
    const user = (await MongoDB?.db("UserData")
      .collection("users")
      .findOne({
        email: { $regex: new RegExp(`^${email}$`, "i") },
      })) as DisadusUser | null;
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    const isCorrect = await new Promise((res) =>
      phas(password).verifyAgainst(user.password, (er, ras) => !er && res(ras))
    );
    if (!isCorrect) {
      res.status(401).send("Email or password incorrect");
      return;
    }
    res.status(200).json({
      success: true,
      token: await Encryptions.issueUserToken(user.id),
    });
  },
} as RESTHandler<DisadusUser>;
export default Login;
