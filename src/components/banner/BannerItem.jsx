import React from "react";
import "./BannerItem.css";
const BannerItem = ({ src }) => {
  return (
    <div className="bannerContent">
      <a href="/">
        <p className="bannerText"></p>
        <div className="bannerImgContent">
          <img className="bannerImg" src="" alt="" />
        </div>
        <img className="sliderImg" src={src} alt="" />
      </a>
    </div>
  );
};

export default BannerItem;
