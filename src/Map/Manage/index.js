import React, { useEffect, useState } from "react";
import Map from "./Map";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import UpdatingMap from "../Updating/Updating";
import NavigationBar from "../../User/Admin/NavigationBar";
import { ResponesiveCRS } from "./ResponsiveCRS";
import { useNavigate } from "react-router-dom";
import {
  CallAPIGetListMap,
  CallAPIDeleteAMap,
} from "../Updating/UpdatingBehavior";
import _ from "lodash";
import ColorTag from "../Updating/ColorTag";
import RemoveModal from "./RemoveModal";
import Spiner from "./Spiner";
import Url_Resource from "../../Shared/UrlResource";

const ManageMap = ({ handleLogout }) => {
  const [isShowMap, setIsShowMap] = useState(false);
  const [name, setName] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [maxSeat, setMaxSeat] = useState(0);
  const [mapLayout, setMapLayout] = useState([]);
  const [mapList, setMapList] = useState([]);
  const [_idOfDeleteMap, set_idOfDeleteMap] = useState(0);
  const [nameOfDeleteMap, setnameOfDeleteMap] = useState(0);
  const [spiner, setSpiner] = useState(true);
  const navgation = useNavigate();

  const onDoubleClick = (_event, mapData) => {
    navgation("../updatingmap", { state: { mapData: mapData } });
  };
  const handleClickMapItem = (e, mapData) => {
    setIsShowMap(true);
    setName(mapData.name);
    setWidth(mapData.width);
    setHeight(mapData.height);
    setMaxSeat(mapData.maxSeat);
    setMapLayout(mapData.layout);
  };
  const onDeleteAMap = (_id) => {
    CallAPIDeleteAMap(_id);
    setMapList(
      _.reject(mapList, (map) => {
        return map["_id"] === _id;
      })
    );
    setIsShowMap(false);
  };

  const onClickDeleteAMap = (_id, name) => {
    set_idOfDeleteMap(_id);
    setnameOfDeleteMap(name);
  };

  useEffect(() => {
    document.title = "Manage Map";
    CallAPIGetListMap(setMapList, setSpiner)
  }, []);

  return (
    <div className="container">
      <NavigationBar
        path="/initializationmap"
        name={Url_Resource.LINK_TO_MANAGE_MAP_PAGE}
        contentButton="Initialize Map"
        handleLogout={handleLogout}
      />
      {spiner && <div className="text-center my-3"><Spiner></Spiner></div>}
      {spiner || <div className="shadow rounded border">
        {mapList.length === 0 && <div className="empty_listmap text-dark">EMPTY</div>}
        <Carousel
          swipeable={true}
          draggable={false}
          responsive={ResponesiveCRS}
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          customTransition="all 1s"
          transitionDuration={900}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
        >
          {mapList.map((map, index) => (
            <Map
              index={index}
              key={map._id}
              map={map}
              onDoubleClick={onDoubleClick}
              handleClickMapItem={handleClickMapItem}
              _id={map._id}
              onClickDeleteAMap={onClickDeleteAMap}
            />
          ))}
        </Carousel>
        <RemoveModal
          i={_idOfDeleteMap}
          name={nameOfDeleteMap}
          remove={onDeleteAMap}
        ></RemoveModal>
        {isShowMap && (
          <div className="m-2">
            <UpdatingMap
              isEdit={false}
              width={
                Number(width) <= 0 || Number(width) >= 30 ? 2 : Number(width)
              }
              height={
                Number(height) <= 0 || Number(height) >= 50 ? 2 : Number(height)
              }
              name={name}
              maxSeat={maxSeat}
              mapLayout={mapLayout}
            />
          </div>
        )}
        {isShowMap && <ColorTag />}
      </div>}
    </div>
  );
};

export default ManageMap;
