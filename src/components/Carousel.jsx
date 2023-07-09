import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { carouselData } from "../utils/carouselData";

export default function Carousel() {
  return (
    <div className="mt-[10vh] border border-gray-900">
      <Swiper className="mySwiper" centeredSlides="true">
        {carouselData.map((img, index) => {
          return (
            <SwiperSlide key={index}>
              <picture>
                <source
                  media="min-width: 375px"
                  srcSet={`${img.imagenMobile}`}
                />
                <source
                  media="minwidth: 768px"
                  srcSet={`${img.imagenTablet}`}
                />
                <source
                  media="min-width: 1100px"
                  srcSet={`${img.imagenDesktop}`}
                />
                <img
                  src={`${img.imagenTablet}`}
                  alt="Imagen"
                  className="w-[340px] h-[300px] max-w-[900px]"
                />
              </picture>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
