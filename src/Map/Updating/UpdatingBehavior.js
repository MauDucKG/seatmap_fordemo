import { restAPI, MAP_API } from "../../Shared/InternalServices";
import { headers } from "../../Shared/InternalServices";

/**
 *
 * @param {JSON} mapData Data of map need to update
 * @returns Status of activity
 */
export const CallAPIUpdatingMap = (mapData) =>
  restAPI.put(MAP_API, mapData, {
    headers: headers,
  });

/**
 *
 * @return Data of all maps
 */
export const CallAPIGetListMap = (setMapList, setSpiner) => {
  restAPI
    .get(MAP_API, {
      headers: headers,
    })
    .then((response) => {
      setMapList(response.data.mapModel);
      setSpiner(false)
    });
};

/**
 *
 * @param {JSON} idMap The id of a map need to remove
 * @returns Status of activity
 */
export const CallAPIDeleteAMap = (idMap) =>
  restAPI.delete(MAP_API, {
    headers: headers,
    data: { _id: idMap },
  });
