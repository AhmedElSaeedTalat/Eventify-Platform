import React from "react";
import { GrMail } from "react-icons/gr";
import { CgPhone } from "react-icons/cg";

const ContactInfo = () => {
  return (
    <div className="contact-info animation-fix">
      <span className="sub-text">Get in touch</span>
      <h3 className="main-heading">Have Any Event Ideas In Mind?</h3>
      <p className="contact-text">
        Whether you're planning a gathering or have a unique event concept, we're here to help bring your ideas to life.
      </p>
      <div className="contact-mail">
        <div className="svg-parent"><GrMail /></div>
        <div className="con-info">
          <span className="contact-us">Mail us 24/7:</span>
          <p className="our-contact">eventify@gmail.com</p>
        </div>
      </div>
      <div className="contact-number">
        <div className="svg-parent"><CgPhone /></div>
        <div className="con-info">
          <span className="contact-us">For urgent help:</span>
          <p className="our-contact">+227-300-3676</p>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
