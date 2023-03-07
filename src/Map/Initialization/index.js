
import React, { useState, useEffect } from 'react';
import NavigationBar from '../../User/Admin/NavigationBar';
import { Container, Row } from 'react-grid-system';
import './InitializationMap.css';
import ErrorList from './ErrorList';
import { useNavigate } from 'react-router-dom';
import { CallAPICreateMap } from './InitizationMapBehavior';
import Input from './Input';
import { ValidationMap } from './ValidationMap';
import Spiner from '../Manage/Spiner';
import Url_Resource from '../../Shared/UrlResource';

const HEIGHT_DEFAULT = 3;
const WIDTH_DEFAULT = 4;
const MAXSEAT_DEFAULT = 2

const InitializationMap=({handleLogout})=> {

  const [isSave, setIsSave] = useState(false);
  const [name, setName] = useState(false);
  const [width, setWidth] = useState(WIDTH_DEFAULT);
  const [height, setHeight] = useState(HEIGHT_DEFAULT);
  const [maxSeat, setMaxSeat] = useState(MAXSEAT_DEFAULT);
  const [spiner, setSpiner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Initialize Map"
  }, [])
  const onSaveMap = async () => {
    if(ValidationMap(name, height, width, maxSeat)) { 
      setSpiner(true);
      await CallAPICreateMap({
          name: name,
          width: width,
          height: height,
          maxSeat: maxSeat,
          layout: []
        });
      await navigate(-1);
    }
    setIsSave(true);
  }  
  return (
      <div className='container'>
        <NavigationBar path="/managemap" name={Url_Resource.LINK_TO_INIT_MAP_PAGE} contentButton="Back" handleLogout={handleLogout} />

        <Container className='shadow rounded border py-2'>
            <Row className=''>
                <Input isSave={isSave} nameFiled="Name" value={name} setValue={setName} errorMessage={ErrorList.E001} 
                  isShowError={isSave && !(name.length >= 8 && name.length <= 30)}
                  condition={-999}
                />
                <Input isSave={isSave} nameFiled="Width" value={width} setValue={setWidth} errorMessage={ErrorList.E002} 
                  isShowError={isSave && !(Number(width) > 2 && Number(width) <= 30)}
                  condition={-999}
                />
                <Input isSave={isSave} nameFiled="Height" value={height} setValue={setHeight} errorMessage={ErrorList.E003} 
                  isShowError={isSave && !(Number(height) > 2 && Number(height) <= 50)}
                  condition={-999}
                />

                <Input isSave={isSave} nameFiled="Max seats" value={maxSeat} setValue={setMaxSeat} errorMessage={ErrorList.E004}
                  isShowError={isSave && !(Number(maxSeat) > 0 && Number(maxSeat) <= Number(width)* Number(height) - (Number(height) + Number(width))* 2 + 4)}
                  maxSeatCurrnet = {Number(width)* Number(height) - (Number(height) + Number(width))* 2 + 4}
                  condition={-999}
                />
            </Row>
            <div className='mx-5 my-1 text-center'>
                    {!spiner? <button className="btn btn-primary btn-lg" onClick={() => onSaveMap()}>Save</button>
                    : <Spiner/>}
                  </div>
        </Container>
      </div>
  )
}

export default  InitializationMap