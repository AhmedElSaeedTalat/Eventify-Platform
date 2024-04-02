import React from "react";
import "./About.css";
import aboutImg from "../../assets/about-img.jpeg";

function About() {
  return (
    <div id="about" className="about">
      <div className="container">
        <div className="img-parent">
          <img src={aboutImg} alt="" />
        </div>
        <div className="about-info">
          <span className="sub-text">More About Eventify</span>
          <h3 className="main-heading">
            Simplify Your Event Planning Experience
          </h3>
          <p>
            Eventify is your go-to event planning platform, designed to simplify
            the process of organizing events of all sizes and types. Whether
            you're planning a corporate conference, a community fundraiser, or a
            personal celebration, Eventify has you covered.
          </p>
          <p>
            With Eventify, you'll have access to a wide range of tools and
            resources to bring your event vision to life. From customizable
            templates to intuitive planning features, our platform empowers you
            to create memorable experiences for your attendees while minimizing
            the stress and hassle of event organization.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
