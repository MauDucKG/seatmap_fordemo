import { ValidationMap } from '../Initialization/ValidationMap';
import { CallAPIUpdatingMap } from './UpdatingBehavior';
import { NotificationManager } from 'react-notifications';
import "react-notifications/lib/notifications.css";
import ERROR from '../Initialization/ErrorList';
import _ from "lodash";
import { COLOR_DEPARTMENT, StaticStyle } from './ColorDepartment';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import { RiCloseCircleFill } from 'react-icons/ri';

const CODE_DROP = "drop";
const CODE_NONE = "no";
const removeStaticAreaMessage = 'Double click to remove!'
export const onSaveMap = async (_id, name, height, width, maxSeat, layout, navigate, setSpiner) => {
  if (ValidationMap(name, height, width, maxSeat)) {
    const layoutDefault = (Number(width) + Number(height)) * 2 - 4;
    setSpiner(true);
    await CallAPIUpdatingMap({
      _id: _id,
      name: name,
      width: width,
      height: height,
      maxSeat: maxSeat,
      layout: layout.slice(layoutDefault)
    });
    await navigate(-1);
  }
};

export const onSelectDropDown = (event, state, setIsSelectDropDown, setState) => {
  const updateLayout = state.layout.map(map => {
    if (map.i.slice(0, -2) === event.slice(0, -2)) {
      return { ...map, i: event };
    }
    return map;
  })
  setIsSelectDropDown(true);
  setState({
    ...state,
    layout: updateLayout
  })
};

export const onLayoutChange = (layout, isSelectDropDown, state, setState, setIsSelectDropDown, isOnDragUser) => {
  if (layout[layout.length - 1].i !== CODE_DROP && !isSelectDropDown && !isOnDragUser) {
    layout[layout.length - 1].role = state.layout[state.layout.length - 1].role;
    setState({
      ...state,
      layout: layout
    });
  }
  setIsSelectDropDown(false);
};

export const onDrop = (_layout, layoutItem, setState, state, CODE_NONE, isOnDropWay, setIsOnDropWay) => {
  const numberOfSeat = _layout.reduce((total, current) => {
    return total + !current.static;
  }, 0);

  if (numberOfSeat > state.maxSeat && !isOnDropWay) {
    createNotification("error", ERROR.E005);
    return;
  }
  if (layoutItem.y >= state.height) return;
  setState({
    ...state,
    layout: state.layout.concat({
      i: Date.now() + CODE_NONE,
      x: layoutItem.x,
      y: layoutItem.y,
      w: 1,
      h: 1,
      static: isOnDropWay,
    })
  });
  setIsOnDropWay(false)
};

export const onRemoveItem = (i, setState, state) => {
  if (i.includes("id")) return;
  setState({
    ...state,
    layout: _.reject(state.layout, seat => { return seat['i'] === i })
  });
}

export const checkSeatValid = (chosenUser, layout, chosenSeatIndex) => {
  const getIdunity = `${chosenUser.fullname}_${chosenUser._id}_${chosenUser.role.toLowerCase()}`;
  const checkUserExist = layout.findIndex((seat) => seat.i === getIdunity);
  if (chosenSeatIndex <= 0) {
    createNotification("Invalid location", ERROR.EA001);
  } else if (layout[chosenSeatIndex].static) {
    createNotification("Cannot allocate user to the static area", ERROR.EA002);
  } else if (layout[chosenSeatIndex].i.slice(-2) !== CODE_NONE && chosenUser.role !== layout[chosenSeatIndex].i.slice(-2)) {
    createNotification("Cannot allocate user to different role positions", ERROR.EA003);
  }
  else if (checkUserExist >= 0) {
    layout[checkUserExist] = { ...layout[checkUserExist], i: layout[chosenSeatIndex].i }
    layout[chosenSeatIndex] = { ...layout[chosenSeatIndex], i: getIdunity }
  }
  else {
    layout[chosenSeatIndex] = { ...layout[chosenSeatIndex], i: getIdunity }
  }
  return layout
}

const checkUserExistInListEmployees = (fullname,employee) => {
  if (employee !== undefined) {
    return employee.findIndex(item => item.fullname === fullname) === -1;
  }
}

const showNameInSeat = (idunity, employee) => {
  const fullname = idunity.split('_')[0];
  let showName = fullname.split(' ').pop();
  if (checkUserExistInListEmployees(fullname,employee)) {
    showName += '(Inactive)';
  }
  return showName
}
const showToolTip = (idunity, employee) => {
  if (isNaN(idunity.slice(0, -2))){
    const fullname = idunity.split('_')[0]
    if (checkUserExistInListEmployees(fullname,employee)){
      return `${fullname} (Inactive)`;
    }
    return fullname;
   } else {
    return 'Empty';
   }
}
export const generateSeatInMap = (state, setState, setIsSelectDropDown, isEdit, employee) => {
  return _.map(state.layout, (seat, i) => {
    return (
      <div key={seat.i} className={seat.static ? "static" : "container_seat"} style={COLOR_DEPARTMENT[seat.i.slice(-2)]}
      >
        {seat.static ? (
          <span
            className="static_seat"
            style={!seat.i.includes("id") ? StaticStyle : {}}
          >
            <div className='my-2' title={!seat.i.includes("id") ? removeStaticAreaMessage : ''} onDoubleClick={() => onRemoveItem(seat.i, setState, state)}>
              <svg  xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-bricks" viewBox="0 0 16 16">
                <path  d="M0 .5A.5.5 0 0 1 .5 0h15a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H14v2h1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H14v2h1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5H2v-2H.5a.5.5 0 0 1-.5-.5v-3A.5.5 0 0 1 .5 6H2V4H.5a.5.5 0 0 1-.5-.5v-3zM3 4v2h4.5V4H3zm5.5 0v2H13V4H8.5zM3 10v2h4.5v-2H3zm5.5 0v2H13v-2H8.5zM1 1v2h3.5V1H1zm4.5 0v2h5V1h-5zm6 0v2H15V1h-3.5zM1 7v2h3.5V7H1zm4.5 0v2h5V7h-5zm6 0v2H15V7h-3.5zM1 13v2h3.5v-2H1zm4.5 0v2h5v-2h-5zm6 0v2H15v-2h-3.5z" />
              </svg>
            </div>
          </span>
        ) : (
          <span title={showToolTip(seat.i, employee)} className="move_seat">
            {isNaN(seat.i.slice(0, -2)) ?
              <span className='name_seat_added-user'>
                {showNameInSeat(seat.i, employee)}
              </span>
              :
              <SplitButton id="dropdown-custom" size="sm" drop="start"
                title=""
                className="drop_menu" 
                variant="none"
                onSelect={(event) => onSelectDropDown(event, state, setIsSelectDropDown, setState)}
                style={{ color: "white" }}
              >
                <Dropdown.Item draggable={false} eventKey={seat.i.slice(0, -2) + COLOR_DEPARTMENT.hr.code} className="drop_item" style={COLOR_DEPARTMENT.hr}>HR</Dropdown.Item>
                <Dropdown.Item draggable={false} eventKey={seat.i.slice(0, -2) + COLOR_DEPARTMENT.dv.code} className="drop_item" style={COLOR_DEPARTMENT.dv}>Developer</Dropdown.Item>
                <Dropdown.Item draggable={false} eventKey={seat.i.slice(0, -2) + COLOR_DEPARTMENT.qa.code} className="drop_item" style={COLOR_DEPARTMENT.qa}>QA</Dropdown.Item>
              </SplitButton>}
          </span>
        )}

        {isEdit && !seat.static && <span
          className="remove"
          onClick={() => onRemoveItem(seat.i, setState, state)}
        >
          <RiCloseCircleFill className='icon_close' color="white" />
        </span>}
      </div>
    );
  });
}
export const createNotification = (type, content) => {
  switch (type) {
    case 'info':
      NotificationManager.info(content, 2000);
      break;
    case 'success':
      NotificationManager.success(content, 'Success', 2000);
      break;
    case 'warning':
      NotificationManager.warning(content, 'Warning', 2000);
      break;
    default:
      NotificationManager.error(content, 'Error', 2000);
  }
}
