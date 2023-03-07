import React, { useEffect } from "react";
import UpdatingMap from "./Updating";
import NavigationBar from "../../User/Admin/NavigationBar";
import "../Initialization/InitializationMap.css";
import { useLocation } from "react-router-dom";
import ColorTag from "./ColorTag";
import Url_Resource from "../../Shared/UrlResource";

const Updating = ({ handleLogout }) => {
  const location = useLocation();

  const name = location.state.mapData.name;
  const width = location.state.mapData.width;
  const height = location.state.mapData.height;
  const maxSeat = location.state.mapData.maxSeat;
  const mapLayout = location.state.mapData.layout;
  const _id = location.state.mapData._id;

  useEffect(() => {
    document.title = `Updating (${location.state.mapData.name}) Map`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container">
      <NavigationBar
        path="/managemap"
        name={Url_Resource.LINK_TO_UPDATING_MAP_PAGE}
        contentButton="Back"
        handleLogout={handleLogout}
      />
      <UpdatingMap
        isEdit={true}
        width={Number(width) <= 0 || Number(width) > 30 ? 2 : Number(width)}
        height={Number(height) <= 0 || Number(height) > 50 ? 2 : Number(height)}
        name={name}
        maxSeat={maxSeat}
        mapLayout={mapLayout}
        idMap={_id}
      />
      <ColorTag />
    </div>
  );
};
export default Updating;
