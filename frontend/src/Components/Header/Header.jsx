import React from "react";
import { assets } from "../../assets/assets";
const Header = () => {
  return (
    <div>
      {/* left side */}
      <div>
        <p>Book Appointment with trusted doctors</p>
        <div>
          <img src={assets.group_profiles} alt="" />
          <p>
            Welcome to our doctor appointment booking website,
            <br /> where managing your healthcare is quick and easy. Find and
            book appointments with trusted professionals in your area, browse
            available times, and read doctor profiles—all in one place. With
            convenient reminders and a user-friendly interface, prioritizing
            your health has never been simpler. Schedule your visit today!
          </p>
        </div>
      </div>
      {/* right side */}
      <div>
        <img src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;
