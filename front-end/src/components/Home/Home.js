import React from "react";
import "./Home.css";
import About from "../About/About";

function Home() {
  return (
    <>
      <div className="home">
        <div className="container">
          <div className="slogan">
            <h1>Creating Moments That Matter, Together.</h1>
            <p>
              We are a community of creators, innovators, and dreamers who are
              passionate about creating moments that matter. We believe that
              everyone has a story to tell and that every story is worth
              sharing. Our mission is to help you create, share, and celebrate
              the moments that matter most to you.
            </p>
          </div>
        </div>
      </div>
      <About />
    </>
  );
}

export default Home;
