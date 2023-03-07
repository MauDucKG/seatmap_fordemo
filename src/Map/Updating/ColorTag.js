import React from "react";
import { COLOR_DEPARTMENT } from './ColorDepartment';
import { Container, Col, Row } from 'react-grid-system';
import './Updating.css'

const ColorTag = () => {
  return (
    <Container className="m-5 text-center align-items-center my-auto col-9">
      <Row>
        <Col sm={4} >
          <div className="color_department h2">
              {COLOR_DEPARTMENT.dv.department}
          </div>
          <div className="color_department" style={COLOR_DEPARTMENT.dv}> </div>
        </Col>
        <Col sm={4} >
          <div className="color_department h2">
              {COLOR_DEPARTMENT.hr.department}
          </div>
          <div className="color_department" style={COLOR_DEPARTMENT.hr}> </div>
        </Col>
        <Col sm={4} >
          <div className="color_department h2">
              {COLOR_DEPARTMENT.qa.department}
          </div> 
          <div className="color_department" style={COLOR_DEPARTMENT.qa}> </div>
        </Col>
      </Row>
    </Container>
  )
} 

export default ColorTag;