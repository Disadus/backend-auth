import { Document, UpdateFilter } from "mongodb";
import { DisadusUser } from "../types";
export const getUser = async (userId: string) =>
  MongoDB!.db("UserData").collection("users").findOne({
    id: userId.toUpperCase(),
  }) as Promise<DisadusUser | null>;
export const getUserByUsername = async (username: string) =>
  MongoDB!
    .db("UserData")
    .collection("users")
    .findOne({
      username: {
        $regex: new RegExp(`^${username}$`, "i"),
      },
    }) as Promise<DisadusUser | null>;
export const getUserByEmail = async (email: string) =>
  MongoDB!
    .db("UserData")
    .collection("users")
    .findOne({
      email: {
        $regex: new RegExp(`^${email}$`, "i"),
      },
    }) as Promise<DisadusUser | null>;

export const updateUser = async (
  userId: string,
  update: UpdateFilter<Document>
) =>
  MongoDB?.db("UserData").collection("users").updateOne({ id: userId }, update);
