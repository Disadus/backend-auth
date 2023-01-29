import { RESTMethods, RESTHandler } from "tetion-server-boilerplate";
import { UserCleaners } from "../../helpers/Cleaners/UserCleaners";
import { DisadusUser } from "../../types";

export const GetUserSelf = {
  path: "/user/@me/",
  method: RESTMethods.GET,
  sendUser: true,
  run: async (req, res, next, user) => {
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.status(200).json(UserCleaners.CleanUser(user));
  },
} as RESTHandler<DisadusUser>;
export default GetUserSelf;
