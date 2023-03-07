import { restAPI, MAP_API } from "../../Shared/InternalServices";
import { headers } from "../../Shared/InternalServices";

/**
 *
 * @param {JSON} mapData Data of map need to create
 * @returns Status of activity
 */
export const CallAPICreateMap = (mapData) =>
  restAPI.post(MAP_API, mapData, {
    headers: headers,
  });
