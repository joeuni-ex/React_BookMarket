// import Swiper core and required modules
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import styled from "styled-components";
import BannerItem from "./BannerItem";
import { mainBanners } from "../../data";

export default () => {
  const SlideDiv = styled.div`
    height: 500px;

    background: linear-gradient(122.64deg, #f0ece5 -22.07%, #f0ece5 76.17%);
  `;

  const SwiperStyle = styled.div`
    .swiper {
      z-index: 0;
      width: 1500px;
      height: 650px;
      overflow: hidden;
      padding-bottom: 0px;
      text-align: center;
      font-size: 18px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .swiper-pagination {
        &-bullet {
          width: 15px;
          height: 15px;
          background: #a7d397;
          &-active {
            border-radius: 5px;
            width: 30px;
            background: #a7d397;
          }
        }
      }
    }
  `;

  //페이지네이션 카테고리 이름으로 표시하기
  const pagination = {
    clickable: true,
    dynamicBullets: true,
  };
  return (
    <>
      <SwiperStyle>
        <Swiper
          // install Swiper modules
          modules={[Autoplay, Pagination]} //모듈에 원하는 기능을 추가해야 사용이 가능함
          spaceBetween={0} // 각 SwiperSlide 사이의 간격
          slidesPerView={1} // 한 슬라이드에 보여질 SwiperSlide 개수
          loop={true} // 다시 슬라이드 1로 돌아오는지(무한반복)
          speed={1300} //넘어가는 속도
          autoplay={{
            //자동 슬라이드 설정
            delay: 3000, //슬라이드가 자동으로 넘어가는 시간
            disableOnInteraction: false, // 내가 슬라이드를 건들면 자동으로 넘어갈건지 여부 (마우스로 꾹 누르고 있으면 안넘어감)
          }}
          pagination={pagination} //페이지 네이션
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {mainBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <SlideDiv>
                <BannerItem src={banner.src} />
              </SlideDiv>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperStyle>
    </>
  );
};
