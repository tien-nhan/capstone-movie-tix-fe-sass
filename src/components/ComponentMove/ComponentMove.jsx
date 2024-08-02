import { useEffect, useState } from "react";
import "./ComponentMove.scss";
import { animateScroll as scroll } from "react-scroll";

const ComponentMove = () => {
  const [isVisible, setIsVisible] = useState(false);
  // Hàm xử lý cuộn trang lên đầu
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };

  // Hàm xử lý hiển thị nút khi cuộn xuống
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <div
      id="move"
      style={
        isVisible
          ? { opacity: "1", visibility: "visible" }
          : { opacity: "0", visibility: "hidden" }
      }
    >
      <img
        src="https://movie-booking-project.vercel.app/img/logoTixLoading.png"
        alt="totop"
        className="jss15"
        onClick={scrollToTop}
      />
    </div>
  );
};

export default ComponentMove;
