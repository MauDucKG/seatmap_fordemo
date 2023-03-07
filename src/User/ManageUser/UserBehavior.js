import { restAPI, USER_API } from "../../Shared/InternalServices";
import { headers } from "../../Shared/InternalServices";

/**
 *
 * @returns {JSON} All data of users
 */
export const getUser = async  () => {
  return (
    await restAPI.get(USER_API, {
      headers: headers,
    })
  ).data.users;
}

/**
 *
 * @param {JSON} req Data of user need to be edited
 * @returns {JSON} Status of activity
 */
 export const  changeUser = async (req) => {
  return await restAPI.put(USER_API, req, {
    headers: headers,
  }).data;
}

/**
 *
 * @param {JSON} req
 * @returns {JSON} Status of activity
 */
export const removeUser= async (req) => {
  return (
    await restAPI.delete(USER_API, {
      headers: headers,
      data: req,
    })
  ).data;
}
