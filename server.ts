import { MongoClient } from "mongodb";
import { RESTServer, SocketServer } from "tetion-server-boilerplate";
import { Encryptions } from "./helpers/Encryptions";
import { getUser } from "./helpers/UserAPIs";
import dotenv from "dotenv";
dotenv.config();
declare global {
  var MongoDB: MongoClient | null;
}
if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL is not set");
}
const MongoConnection = new MongoClient(process.env.MONGODB_URL, {});
MongoConnection.connect().then(() => {
  global.MongoDB = MongoConnection;
  const server = new RESTServer({
    port: 443,
    getUser: async (req) => {
      if (!req.headers.authorization) return null;
      const bearer = req.headers.authorization.split(" ");
      const userID = await Encryptions.decryptUserToken(
        req.headers.authorization
      ).catch(null);
      if (!userID) return null;
      return await getUser(userID);
    },
  });
  server.import(`${__dirname}/RESTAPI`);
  const socketServer = new SocketServer({
    authCheck: async (socket) => {
      if (!socket.handshake.headers.authorization) return false;
      const userID = await Encryptions.decryptUserToken(
        socket.handshake.headers.authorization
      ).catch(null);
      if (!userID) return false;
      return true;
    },
    server: server,
    forceAuth: true,
  });
  socketServer.import(`${__dirname}/SocketAPI`);
});

