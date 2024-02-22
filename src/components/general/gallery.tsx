// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";

import "../styles/gallery.css";

// import required modules

export default function Gallery() {
  const image1 = "images/gallery/5.jpg";
  const image2 = "images/gallery/1.jpg";
  const image3 = "images/gallery/21.jpg";
  const image4 = "images/gallery/22.jpg";
  const image5 = "images/gallery/31.jpg";
  const image6 = "images/gallery/50.jpg";
  const image7 = "images/gallery/42.jpg";
  const image8 = "images/gallery/48.jpg";
  const image9 = "images/gallery/56.jpg";
  const image10 = "images/gallery/32.jpg";

  const images = [
    image5,
    image1,
    image3,
    image2,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  ];
  return (
    <>
      <Swiper
        navigation={true}
        loop={true}
        autoplay={{ delay: 5000 }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        breakpoints={{
          "@1.00": {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          "@1.5": {
            slidesPerView: 3,
            spaceBetween: 0,
          },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoHeight={true}
        modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
        className="mySwiper text-black w-full h-auto items-center justify-center"
      >
        {images.map((src, index) => {
          return (
            <SwiperSlide className="bg-white items-center !self-center">
              <img src={src} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
