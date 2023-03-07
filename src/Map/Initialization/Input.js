import './InitializationMap.css';
import { Col } from 'react-grid-system';
import { NotificationContainer } from 'react-notifications';
import { createNotification } from '../Updating/HandlerMap';
import ERROR from './ErrorList';
import ReactTooltip from 'react-tooltip';
import './InitializationMap.css';

const  Input =({ nameFiled, value, setValue, errorMessage, isShowError, condition, maxSeatCurrnet})=> {
    const onCheckCondition = valueInput => {
        if(nameFiled !== "Name") 
            if(Number(valueInput) < condition) {
                createNotification("error", nameFiled === "Width"? ERROR.E007: ERROR.E006)
                return;
            }
        setValue(valueInput);
    }
    return (
        <Col md={3} className="my-3">
            <div className={nameFiled === "Name"? "form__group_name": "form__group "}>
                {nameFiled === "Max seats" ? <a data-tip data-for='happyFace' href='null'>
                    <label className='h6 text-dark'>{nameFiled}(*)</label></a>
                : <label className='h6'>{nameFiled}(*)</label>}

                {<ReactTooltip id='happyFace' type='info'>
                    Recommend Max Seats: {maxSeatCurrnet}
                </ReactTooltip>}
                <input 
                    type={nameFiled === "Name" ? "text" : "number"} 
                    placeholder={nameFiled !== "Name" ? value : null} 
                    onInput={e => onCheckCondition(e.target.value)}
                    className="form-control"
                />
                {isShowError && <div className="error_init_map">{errorMessage}</div>}
            </div>
            <NotificationContainer />
        </Col>
    )
}
export default Input 