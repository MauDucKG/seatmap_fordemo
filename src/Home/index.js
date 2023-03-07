import React from "react";
import { useEffect } from 'react';
import Navbar from '../Shared/NavigationBar';
import "./Home.css";
import IMG_LUNCH_1 from "./Image/lunch.jpg";
import IMG_LUNCH_2 from "./Image/lunch2.jpg";
import IMG_WORK_1 from "./Image/work.jpg";
import IMG_WORK_2 from "./Image/work2.jpg";
import KIET from "./Image/kiet.jpg";
import LONG from "./Image/long.jpg";
import DUC from "./Image/duc.jpg";
import HUY from "./Image/huy.jpg";
import LUAN from "./Image/luan.jpg";
import MENTOR from "./Image/mentor.png";
import LOGO_COFFEEINT from "./Image/logo.jpg";
import { BiMap } from 'react-icons/bi';
import { MdAttachEmail } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';

const Home = () => {
  
  useEffect(() => {
    document.title = 'Home';
  });

  return (
    <>
      <Navbar path='/' />
      <div className="container">
      <div className="header_logo">
          <div className="heading-main-box">
            <h1 className="say_hello">
              welcome to Seat map
              <hr className="mt-2 mb-5"></hr>
              Are you Ready to <br/>
              Experience  with us?
            </h1>
          </div>
        </div>
      <div className="about_team">
        <h2 className="title_part">
          About My team
        </h2>
        <p className="p-long">             
          We often have lunch together and work very comfortably and happily.
        </p>
        <div className="row">
        <div className="col-3 about-picture">
          <img src={IMG_LUNCH_1} alt="activity1"/>
          <p className="picture-title">
              Event afternoon
          </p>
        </div>
        <div className="col-3 about-picture">
            <img src={IMG_LUNCH_2} alt="activity1"/>
            <p className="picture-title">
                Lunch together
            </p>
        </div>
        <div className="col-3 about-picture">
            <img src={IMG_WORK_1} alt="activity1"/>
            <p className="picture-title">
                Working together
            </p>
        </div>
        <div className="col-3 about-picture">
            <img src={IMG_WORK_2} alt="activity1"/>
            <p className="picture-title">
                Meeting everyday
            </p>
        </div>
        </div>

      </div>

      <div className="sponsors-section">
        <h2 className="title_part">Members</h2>
        <ul className="sponsors-showcase clearfix">
            <li>
                <figure>
                    <img className="logo-sponsor" src={LONG} alt="long"/>
                    <figcaption>Thanh Long</figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img className="logo-sponsor" src={KIET} alt="kiet"/>
                    <figcaption>Tuan Kiet</figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img className="logo-sponsor" src={HUY} alt="huy"/>
                    <figcaption>Phi Huy</figcaption>
                </figure>
            </li>
        </ul>

        <ul className="sponsors-showcase clearfix">
            <li>
                <figure>
                    <img className="logo-sponsor" src={LUAN} alt="luan"/>
                    <figcaption>Thanh Luan</figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img className="logo-sponsor" src={MENTOR} alt="mentor"/>
                    <figcaption>Mentors</figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img className="logo-sponsor" src={DUC} alt="duc"/>
                    <figcaption>Mau Duc</figcaption>
                </figure>
            </li>
        </ul>
      </div>
      <section className="contact-section">
        <div className="row">
            <div className="col-6">
                <ul className="information">
                    <li><BiMap size={22} />106 Nguyen Van Troi, Phu Nhuan, Ho Chi Minh</li>
                    <li><MdAttachEmail size={22} />  Email: coffeein@cybozu.vn.com</li>
                    <li><FiPhoneCall size={22} /> Phone: 0123456789</li>
                    
                    <li className="say_hello">COFFEEIN TEAM</li>
                </ul>
            </div>
            <div className="col-6">
              <img className="logo" src={LOGO_COFFEEINT} alt="Logo" />
            </div>
        </div>
    </section>
      </div>
    </>
  );
}
export default Home;
