import React from "react";
import "./About.css";
import about_img from "../../assets/grab.jpg";

const About = ({ setPlayState }) => {
  return (
    <div className="about">
      <div className="about-left">
        <img src={about_img} alt="" className="about-img" />
      </div>
      <div className="about-right">
        <h2>About</h2>
        <h3>Take a look at our work</h3>
        <p></p>
        <p>
          HeartAI is an advanced AI-powered tool designed to assess your risk of
          developing cardiovascular disease over the next 10 years.
        </p>
        <p>
          By analyzing key health and lifestyle factors, our technology provides
          personalized insights to help you make informed decisions about your
          heart health. Our mission is to empower individuals with early
          detection and actionable recommendations, making heart disease
          prevention accessible to everyone. Whether you're looking to
          understand your risk or take proactive steps toward a healthier
          future, HeartAI is here to guide you.
        </p>
        <p>
          Take control of your heart health today—because prevention starts with
          awareness.
        </p>
      </div>
    </div>
  );
};

export default About;
