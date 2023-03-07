import {
  restAPI,
  USER_API,
  DEFAULT_AVATAR_URL,
  CLOUDINARY_UPLOAD_API,
  CHECK_USERNAME_API,
} from "./Shared/InternalServices";
import { headers } from "../../Shared/InternalServices";

const UserBehavior = {
  /**
   *
   * @param {string} formAvatarData the from of avatar data
   * @returns Status of activity
   */
  UploadAvatar: async (formAvatarData) => {
    if (typeof formAvatarData !== "undefined") {
      return (await restAPI.post(CLOUDINARY_UPLOAD_API, formAvatarData)).data
        .url;
    }

    return DEFAULT_AVATAR_URL;
  },

  /**
   *
   * @param {json} userData Data of user need to create
   * @returns Status of activity
   */
  CreateUser: (userData) =>
    restAPI.post(USER_API, userData, {
      headers: headers,
    }),

  /**
   *
   * @param {json} username Username of username need to test exist
   * @returns {boolean} Status of activity
   */
  IsUsernameExist: async (username) =>
    (
      await restAPI.post(CHECK_USERNAME_API, username, {
        headers: headers,
      })
    ).data.isExist,
};
export default UserBehavior;
