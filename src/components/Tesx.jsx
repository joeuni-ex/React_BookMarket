// import Swiper core and required modules
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import "swiper/css";
import "Swiper/css/pagination";
import styled from "styled-components";

export default () => {
  var bullet = ["1번", "2번", "3번", "4번 "];
  const SlideDiv = styled.div`
    height: 200px;
    background: linear-gradient(122.64deg, #90e0ef -22.07%, #caf0f8 76.17%);
  `;
  //페이지네이션 카테고리 이름으로 표시하기
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + bullet[index] + "</span>";
    },
    dynamicBullets: true,
  };
  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Autoplay, Pagination]} //모듈에 원하는 기능을 추가해야 사용이 가능함
        spaceBetween={100} // 각 SwiperSlide 사이의 간격
        slidesPerView={1} // 한 슬라이드에 보여질 SwiperSlide 개수
        loop={true} // 다시 슬라이드 1로 돌아오는지(무한반복)
        autoplay={{
          //자동 슬라이드 설정
          delay: 3000, //슬라이드가 자동으로 넘어가는 시간
          disableOnInteraction: false, // 내가 슬라이드를 건들면 자동으로 넘어갈건지 여부 (마우스로 꾹 누르고 있으면 안넘어감)
        }}
        pagination={pagination}
        cl
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <SlideDiv>slide1</SlideDiv>
        </SwiperSlide>
        <SwiperSlide>
          <SlideDiv>slide2</SlideDiv>
        </SwiperSlide>
        <SwiperSlide>
          <SlideDiv>slide3</SlideDiv>
        </SwiperSlide>
        <SwiperSlide>
          <SlideDiv>Slide 4</SlideDiv>
        </SwiperSlide>
      </Swiper>
      <div class="swiper-pagination"></div>
    </>
  );
};
