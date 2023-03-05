import Slider from "infinite-react-carousel";
import "./Slide.scss";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const Slide = ({ slidesToShow, arrowsScroll, children }) => {
  const { pathname } = useLocation();
  console.log(pathname);
  const [size, setSize] = useState(null);
  const handleResize = () => {
    const width = window.innerWidth;
    if (slidesToShow <= 1) {
      return setSize(slidesToShow);
    }
    if (slidesToShow > 1) {
      if (width < 540) {
        return setSize(1);
      } else if (width < 768) {
        return setSize(2);
      } else if (width < 992) {
        return setSize(3);
      } else {
        return setSize(slidesToShow);
      }
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(size, "size");
  return (
    <section className="slide">
      <div className="container">
        <Slider
          prevArrow={<ChevronLeftIcon className="carousel-arrow-icon" />}
          nextArrow={<ChevronRightIcon className="carousel-arrow-icon" />}
          slidesToShow={size}
          arrowsScroll={size}
        >
          {children}
        </Slider>
      </div>
    </section>
  );
};
export default Slide;
