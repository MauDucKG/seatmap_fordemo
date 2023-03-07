import { LOGIN_API, restAPI } from "../Shared/InternalServices";
import { headers } from "../Shared/InternalServices";
/**
 *
 * @param {JSON} request Username and password of user sent login request
 * @returns {JSON} Status of activity, username, avatar and token for this login request
 */
export const getUserLogin = async request => {
  const respond = (await restAPI.post(LOGIN_API, request)).data;
  if (respond.user) {
    localStorage.setItem("token", respond.token);
    headers.Authorization = respond.token;
  }

  return respond.user;
};
