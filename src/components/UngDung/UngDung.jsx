import Slider from "react-slick";

const UngDung = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div id="ungdung">
      <div className="jss117">
        <div className="jss118">
          <div className="row">
            <div className="col-lg-6 ">
              <div className="jss119 text-center text-lg-left">
                <div>
                  <p className="jss120">Ứng dụng tiện lợi dành cho</p>
                  <p className="jss120">người yêu điện ảnh</p>
                  <br />
                  <p>
                    Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm
                    rạp và đổi quà hấp dẫn.
                  </p>
                  <br />
                  <button className="btn btn-danger">
                    Cài đặt Progressive App!
                  </button>
                  <br />
                  <p className="py-3">
                    Tix có hai phiên bản{" "}
                    <span>
                      <a
                        href="https://itunes.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197?mt=8"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        IOS
                      </a>
                    </span>{" "}
                    và{" "}
                    <span>
                      <a
                        href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Android
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </div>{" "}
            <div className="col-lg-6">
              <div className="jss121">
                <img className="jss122" src="/images/mobile.png" alt="mobile" />
                <Slider className="jss123" {...settings}>
                  <img src="images/slide1.jpg" alt="banner" />
                  <img src="images/slide4.jpg" alt="banner" />
                  <img src="images/slide5.jpg" alt="banner" />
                  <img src="images/slide6.jpg" alt="banner" />
                  <img src="images/slide11.jpg" alt="banner" />
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UngDung;
