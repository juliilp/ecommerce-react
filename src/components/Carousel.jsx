import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { carouselData } from "../utils/carouselData";

export default function Carousel() {
  return (
    <div className="text-center">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {carouselData.map((img, index) => {
          return (
            <SwiperSlide key={index}>
              <picture>
                <source
                  media="min-width: 375px"
                  srcSet={`${img.imagenMobile}`}
                />
                <source
                  media="min-width: 768px"
                  srcSet={`${img.imagenTablet}`}
                />
                <source
                  media="min-width: 1100px"
                  srcSet={`${img.imagenDesktop}`}
                />
                <img src={`${img.imagenMobile}`} alt="Imagen" />
              </picture>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <h2>asd</h2>
    </div>
  );
}
