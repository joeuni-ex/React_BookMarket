import React from "react";
import "./MainSub.css";
import $ from "jquery";
import subBook from "../assets/book1.jpg";
import subBook2 from "../assets/book2.jpg";
import subBook3 from "../assets/book3.jpg";

const MainSub = () => {
  $(function () {
    let currentIndex = 0; //현재 이미지
    $(".sliderWrap").append($(".slider").first().clone(true)); // .sliderWrap 맨 뒤에 첫번째 .slider를 복사하기

    setInterval(function () {
      // 3초씩 무한반복
      currentIndex++; // 1씩 증가
      $(".sliderWrap").animate({ marginLeft: -currentIndex * 100 + "%" }, 1200);
      // currentIndex가 1이면 -100% 왼쪽으로 이동, 2면 -200% 이동, 3이면 -300% 이동

      if (currentIndex == 3) {
        // 맨 마지막 이미지 번호일 때 (여기선 이미지가 3개여서 3이 마지막 숫자)
        setTimeout(function () {
          // 한번 반복
          $(".sliderWrap").animate({ marginLeft: 0 }, 0); // 처음으로 돌아오기
          currentIndex = 0; // currentIndex 값 초기화
        }, 1300);
      }
    }, 5000); //setInterval 반복하는 시간
  });

  return (
    <>
      <div id="slider">
        <div className="sliderWrap">
          <div className="slider">
            <img className="sliderImg" src={subBook} alt="" />
          </div>
          <div className="slider">
            <img className="sliderImg" src={subBook2} alt="" />
          </div>
          <div className="slider">
            <img className="sliderImg" src={subBook3} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSub;
