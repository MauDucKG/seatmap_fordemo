import { restAPI, LOGOUT_API } from "../Shared/InternalServices";
import { headers } from "../Shared/InternalServices";

/**
 * This funtion call is send to server to logout current user form Database
 */
export const deleteUserToken = async () =>
  await restAPI.delete(LOGOUT_API, {
    headers: headers,
  });
