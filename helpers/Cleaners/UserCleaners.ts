import {
  DisadusUserCommunities,
  CleanedDisadusUserCommunities,
  LMSTypes,
  CleanedDisadusUserCommunityObject,
  DisadusUser,
  CleanedPrivateDisadusUser,
  CleanedPublicDisadusUser,
} from "../../types";

export class UserCleaners {
  static CleanUserCommunities(community: DisadusUserCommunities) {
    const cleanedCommunityObject = {} as CleanedDisadusUserCommunities;
    Object.keys(community).map((key) => {
      const communityObject = community[key];
      cleanedCommunityObject[key] = {
        courses: communityObject.courses,
        ...Object.keys(communityObject)
          .filter((key) => key !== "courses")
          .reduce((obj, key) => {
            obj[key as LMSTypes] = true;
            return obj;
          }, {} as CleanedDisadusUserCommunityObject),
      };
    });
    return cleanedCommunityObject;
  }
  /**
   * Remove all private user data (used for public stuffs)
   */
  static CleanUser(user: DisadusUser) {
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      pfp: user.pfp,
      communities: user.communities,
      createdAt: user.createdAt,
      primaryCommunity: user.primaryCommunity,
      isAdmin: !!((user.staffLevel || 0) >= 5),
      theme: user.theme,
      staffLevel: user.staffLevel,
      tester: user.tester,
      premiumUntil: user.premiumUntil,
      openLinkStyle: user.openLinkStyle,
      devMode: user.devMode,
      pluginMode: user.pluginMode,
      tags: user.tags,
    } as CleanedPrivateDisadusUser;
  }
  static CleanPublicUser(user: DisadusUser) {
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      pfp: user.pfp,
      premiumUntil: user.premiumUntil,
      staffLevel: user.staffLevel,
      tester: user.tester,
      tags: user.tags,
      theme: user.theme,
    } as CleanedPublicDisadusUser;
  }
}
export default { UserCleaners };
/**
 * @typedef {Object} CleanedPublicUser
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} bio
 * @property {string} pfp
 * @property {string} premiumUntil
 *
 */
