import "./Manage.css";
import { RiCloseCircleFill } from "react-icons/ri";
import { MAP_IMAGE } from "../Updating/Image";
const  Map =({
  index,
  map,
  onDoubleClick,
  handleClickMapItem,
  _id,
  onClickDeleteAMap,
})=> {
  const onClickMap = (e, map) => {
    handleClickMapItem(e, map);
  };
  return (
    <>
      <div className="container_image shadow mb-5"
        onDoubleClick={(event) => onDoubleClick(event, map)}
        onClick={(e) => onClickMap(e, map)}
      >
        <img className="image_list" width={"100%"} src={MAP_IMAGE} alt="Map avatar"/>
        <RiCloseCircleFill
          className="remove_map"
          onClick={() => onClickDeleteAMap(_id, map.name)}
          data-bs-toggle="modal"
          data-bs-target={`#Modalmap`}
        />
        <div className="h6">
          {index + 1}. {map.name}
        </div>
      </div>
    </>
  );
}
export default Map
