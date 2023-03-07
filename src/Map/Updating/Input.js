import './Updating.css';
import { Col } from 'react-grid-system';
import { NotificationContainer } from 'react-notifications';
import { createNotification } from './HandlerMap';
import ERROR from '../Initialization/ErrorList';
import { LayoutDefault } from './LayoutDefault';
import ReactTooltip from 'react-tooltip';
import { useState } from 'react';

const Input =({ nameFiled, value, setValue, isShowError, state})=> {
  const [isValidFiled, setIsValidFiled] = useState(true);

  const conditionWidth = state.layout.reduce((accumulator, element) => {
      return (!element.i.includes("id") && Number(accumulator) < Number(element.x))? element.x: accumulator
    }, -1) + 2;
  const conditionHeight = state.layout.reduce((accumulator, element) => {
      return (!element.i.includes("id") && Number(accumulator) < Number(element.y))? element.y: accumulator
  }, -1) + 2;
  const conditionSeat = state.layout.reduce((accumulator, element) => {
      return accumulator + !(element.static)
  }, 0);

  const onCheckCondition = valueInput => {
      switch(nameFiled) {
        case "Width":
          const isValidWidth = Number(valueInput) >= conditionWidth && Number(valueInput) > 2 && Number(valueInput) <= 30;
          if(!isValidWidth) {
            createNotification("error", ERROR.E007);
            setIsValidFiled(false);
            return;
          }
          const layoutDefaultNumber = (Number(state.width) + Number(state.height))* 2 - 4;
          const layoutDefault = LayoutDefault(Number(valueInput), state.height);
          setValue({
            ...state,
            layout: [...layoutDefault,...state.layout.slice(layoutDefaultNumber)],
            width: Number(valueInput)
          })
          break;
        case "Height":
          const isValidHeight = Number(valueInput) >= conditionHeight && Number(valueInput) > 2 && Number(valueInput) <= 50;
          if(!isValidHeight) {
            createNotification("error", ERROR.E006);
            setIsValidFiled(false);
            return;
          }
          const layoutDefaultNumberHeight = (Number(state.width) + Number(state.height))* 2 - 4;
          const layoutDefaultHeight = LayoutDefault(state.width, Number(valueInput));
          setValue({
            ...state,
            layout: [...layoutDefaultHeight,...state.layout.slice(layoutDefaultNumberHeight)],
            height: Number(valueInput)
          })
          break;
        case "Max seats":
          const MaximumOfSeat = Number(state.width)* Number(state.height) - (Number(state.height) + Number(state.width))* 2 + 4;
          const isValidMaxSeat = Number(valueInput) >= conditionSeat && Number(valueInput) <= MaximumOfSeat;
          if(!isValidMaxSeat) {
            createNotification("error", ERROR.E005);
            setIsValidFiled(false);
            return;
          }
          setValue({
            ...state,
            maxSeat: Number(valueInput)
          })
          break;
        default: 
          if (valueInput.length < 8 || valueInput.length > 30) {
            createNotification("warning", ERROR.E001);
            setIsValidFiled(false);
            return;
          }
          setValue({
            ...state,
            name: valueInput
          })
      }
      setIsValidFiled(true);
  }
  return (
    <Col className="sm_col_grid my-3">
      <div className={nameFiled === "Name"? "form__group_name": "form__group"}>
        {nameFiled === "Max seats" ? <a data-tip data-for='happyFace' href='null'>
          <label className='h6 text-dark'>{nameFiled}(*)</label></a>
        : <label className='h6 text-dark'>{nameFiled}(*)</label>}

        {<ReactTooltip id='happyFace' type='info'>
          Max Seats must smaller or equal than: {state.width* state.height - (state.width + state.height)* 2 + 4}
        </ReactTooltip>}
        <input 
          type={nameFiled === "Name" ? "text" : "number"} 
          defaultValue={value} 
          className={!isValidFiled? "is_valid_field form-control": "form-control"}
          onBlur={e => onCheckCondition(e.target.value)}
        />
      </div>
      <NotificationContainer />
    </Col>
  )
}
export default  Input