import { RESTMethods, RESTHandler } from "tetion-server-boilerplate";
import { UserCleaners } from "../../helpers/Cleaners/UserCleaners";
import { getUser } from "../../helpers/UserAPIs";
import { DisadusUser } from "../../types";

export const GetUserByID = {
  path: "/user/:user/",
  method: RESTMethods.GET,
  sendUser: false,
  run: async (req, res, next, _) => {
    const user = await getUser(req.params.user);
    if (!user) {
      if (next) {
        return await next();
      }
      res.status(404).send("User not found");
      return;
    }
    res.status(200).json(UserCleaners.CleanPublicUser(user));
  },
} as RESTHandler<DisadusUser>;
export default GetUserByID;
