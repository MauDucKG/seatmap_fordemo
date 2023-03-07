import './Updating.css';
import { Container, Col, Row } from 'react-grid-system';
import React, { useState, useEffect } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { AiOutlineDrag } from 'react-icons/ai';
import { LayoutDefault } from './LayoutDefault';
import { useNavigate } from 'react-router-dom';
import { onSaveMap, onLayoutChange, onDrop, checkSeatValid, generateSeatInMap } from './HandlerMap';
import { NotificationContainer } from 'react-notifications';
import { TABLE_IMAGE, WAY_IMAGE } from './Image';
import Input from './Input';
import { getUser as getUserAPI } from '../../User/ManageUser/UserBehavior';
import Spiner from '../Manage/Spiner';

const ReactGridLayout = WidthProvider(RGL);
const ROW_HEIGHT = 50;
const CODE_NONE = "no";
const CODE_DROP = "drop";

const MapUpdating = ({ isEdit, width, height, name, maxSeat, mapLayout, idMap }) => {
  const [spiner, setSpiner] = useState(false);
  const [isOnDropWay, setIsOnDropWay] = useState(false);
  const [isSelectDropDown, setIsSelectDropDown] = useState(false);
  const [isOnDragUser, setIsOnDragUser] = useState(false);
  const navigate = useNavigate();
  const [employee, setEmployee] = useState();
  const [findEmployee, setFindEmployee] = useState("");
  const [chosenUser, setChosenUser] = useState();
  const [state, setState] = useState({ width, height, name, maxSeat, layout: [] });
  let chosenSeatIndex = -1;
  const seatCount = state.layout.reduce((accumulator, element) => {
    return accumulator + !(element.static)
  }, 0);

  const defaultProps = {
    className: "layout", rowHeight: ROW_HEIGHT, cols: isEdit ? state.width : width, measureBeforeMount: false, useCSSTransforms: false, isResizable: false, compactType: null, preventCollision: true
  };
  useEffect(() => {
    getUserAPI()
      .then((response) => {
        setEmployee(response)
      })
    const layoutDefault = LayoutDefault(width, height)
    setState({
      ...state,
      layout: [...layoutDefault, ...mapLayout]
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, width]);

  const onDropEmPloyee = (layout, layoutItem) => {
    const tempLayout = [...state.layout]
    chosenSeatIndex = state.layout.findIndex((seat) => seat.x === layoutItem.x && seat.y === layoutItem.y);
    const newLayout = checkSeatValid(chosenUser, tempLayout, chosenSeatIndex);
    setState({ ...state, layout: newLayout });
  };

  return (
    <Container fluid>
      {isEdit && <Row className='sm_row_grid shadow my-4'>
        <Input nameFiled="Name" value={state.name} setValue={setState} state={state} />
        <Input nameFiled="Width" value={state.width} setValue={setState} state={state} />
        <Input nameFiled="Height" value={state.height} setValue={setState} state={state} />
        <Input nameFiled="Max seats" value={state.maxSeat} setValue={setState} state={state} />
      </Row>}

      {!isEdit &&
        <div className="h3 text-center my-3">{name}</div>}
      <Row className='pt-2'>
        <Col md={isEdit ? 10.4 : 12}>
          <div className="map_styled_updating mb-2">
            <div className='edit_map'>
              <ReactGridLayout
                {...defaultProps}
                layout={state.layout}
                onLayoutChange={layout => onLayoutChange(layout, isSelectDropDown, state, setState, setIsSelectDropDown, isOnDragUser)}
                onDrop={!isOnDragUser ? ((layout, layoutItem) => onDrop(layout, layoutItem, setState, state, CODE_NONE, isOnDropWay, setIsOnDropWay, state.maxSeat)) : onDropEmPloyee}
                isDroppable={isEdit}
                isDraggable={isEdit}
                style={{ borderRadius: "5px" }}
                droppingItem={{ i: CODE_DROP, w: 1, h: 1 }}
                isBounded={true}
                allowOverlap={isOnDragUser}
                useCSSTransforms={isOnDragUser}
              >
                {generateSeatInMap(state, setState, setIsSelectDropDown, isEdit, employee)}
              </ReactGridLayout>
            </div>
          </div>
        </Col>
        {isEdit && <Col md={1.6} style={{ textAlign: "center" }}>
          <div className='sticky'>
            <div className="info_max_seat shadow">
              {seatCount}/{state.maxSeat - seatCount > state.width * state.height - state.layout.length ? seatCount + state.width * state.height - state.layout.length : state.maxSeat}
            </div>
            <div
              className="droppable-element shadow"
              draggable={true}
              unselectable="on"
              onDragStart={e => e.dataTransfer.setData("text/plain", "")}
            >
              <img className="drop_down_table" src={TABLE_IMAGE} alt="Drop Down" />
              <AiOutlineDrag size={45} className="icon_drag" />
            </div>
            <div
              className="droppable-element shadow"
              draggable={true}
              unselectable="on"
              onDragStart={e => e.dataTransfer.setData("text/plain", "")}
              onDrag={() => setIsOnDropWay(true)}
              onDragEnd={() => setIsOnDropWay(false)}
            >
              <img className="drop_down_table" src={WAY_IMAGE} alt="Drop Down" />
              <AiOutlineDrag size={45} className="icon_drag" />
            </div>
            <div
              className="dropdown" >
              <button onClick={() => { }} className="btn btn-lg dropdown-toggle bg-success text-light shadow" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Employee
              </button>
              <ul className="dropdown-menu rounded-left drop_menu drop_menuCss" aria-labelledby="dropdownMenuButton1">
                <li className="drop_item">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">🔎</span>
                    </div>
                    <input type="text" onInput={(e) => setFindEmployee(e.target.value)} className="form-control" placeholder="Employee name" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                </li>
                {employee && employee.map((user, index) => (
                  (<span key={index}>
                    {(((user.fullname + "-" + user.role).toLowerCase()).indexOf(findEmployee.toLowerCase()) > -1) ? (<span>
                      <li
                        onDrag={() => { setIsOnDragUser(true); setChosenUser(user) }}
                        onDragEnd={() => setIsOnDragUser(false)}
                        className="dropdown-item"
                        draggable={true}
                        unselectable="on">
                        {user.fullname} - {user.role.toUpperCase()}
                      </li>
                    </span>) : (false)}
                  </span>)
                ))}
              </ul>
            </div>

            <div className='button_save'>
              <div className='button_save'>
                {!spiner ? <button className="btn btn-primary btn-lg shadow"
                  onClick={() => onSaveMap(idMap, state.name, state.height, state.width, state.maxSeat, state.layout, navigate, setSpiner)}
                >Save</button>
                  : <Spiner />}
              </div>
            </div>
          </div>
        </Col>}
      </Row>
      <NotificationContainer />
    </Container>
  );
}
export default MapUpdating;

