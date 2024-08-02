import { useEffect, useMemo, useState } from "react";
import {
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  ButtonBase,
  CircularProgress,
  Collapse,
  ListItemText,
  Rating,
  Tab,
  Tabs,
} from "@mui/material";
import "./DetailFilm.scss";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi"; // Import locale for Vietnamese
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Accordion from "@mui/material/Accordion";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { dataComment } from "./dataComment";
moment.locale("vi"); // Thiết lập ngôn ngữ tiếng Việt

const DetailFilm = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { maPhim } = useParams();
  const [state, _setState] = useState({ parent: 0, tab1: 0, tab2: 0 });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  useEffect(() => {
    (async () => {
      if (!maPhim) return;
      try {
        const phim = await fetch(
          `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
        ).then((s) => s.json());
        setState({ phim });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [maPhim]);
  useEffect(() => {}, [state.tab1, state.tab2]);
  const handleChangeTab = (key) => (e, tab) => {
    setState({ [key]: tab });
  };
  const groupByDate = (arr = []) => {
    return arr.reduce((acc, curr) => {
      const date = curr.ngayChieuGioChieu.split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(curr);
      return acc;
    }, {});
  };
  const capitalizeFirstLetter = (string) => {
    // Thay thế ngày trong tuần và tháng bằng tiếng Việt
    const replacements = {
      Monday: "Thứ Hai",
      Tuesday: "Thứ Ba",
      Wednesday: "Thứ Tư",
      Thursday: "Thứ Năm",
      Friday: "Thứ Sáu",
      Saturday: "Thứ Bảy",
      Sunday: "Chủ Nhật",
    };

    return string
      .replace(
        /\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/g,
        (match) => replacements[match]
      )
      .replace(/^\w/, (c) => c.toUpperCase());
  };
  const dsLichChieu = useMemo(() => {
    return state.phim?.heThongRapChieu?.[state.tab1]?.cumRapChieu?.reduce(
      (a, c) => [...a, ...c.lichChieuPhim],
      []
    );
  }, [state.phim?.heThongRapChieu, state.tab1]);

  const dsGroup = groupByDate(dsLichChieu);

  useEffect(() => {
    if (!dsLichChieu?.length) return;
    const lstPromise = dsLichChieu.map((o) =>
      fetch(
        `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${o.maLichChieu}`
      ).then((s) => s.json())
    );
    Promise.all(lstPromise).then((values) => {
      setState({ lstDetailLich: values });
    });
  }, [dsLichChieu]);

  return (
    <div className="jss352">
      <div className="jss353">
        <div className="jss355"></div>
        <div
          className="jss354"
          style={{
            backgroundImage: `url(${state.phim?.hinhAnh})`,
          }}
        ></div>
        <div className="jss356">
          <div
            className="jss357"
            style={{
              backgroundImage: `url(${state.phim?.hinhAnh})`,
            }}
          >
            <div className="jss373 jss375">
              <img
                src="https://movie-booking-project.vercel.app/img/carousel/play-video.png"
                className="jss74"
                alt="play"
              />
            </div>
            <img
              alt="poster"
              style={{ display: "none" }}
              src={state.phim?.hinhAnh}
            ></img>
          </div>
          <div className="jss359">
            <p>
              {state.phim?.ngayKhoiChieu &&
                moment(state.phim.ngayKhoiChieu).format("YYYY.MM.DD")}
            </p>
            <p className="jss360">
              <span className="jss361">{state.phim?.maNhom}</span>
              {state.phim?.tenPhim}
            </p>
            <p>120 phút - 10 Tix - 2D/Digital</p>
            <button className="jss362">Mua vé</button>
          </div>
          <div className="jss363">
            <div className="jss364">
              <span className="jss365">10</span>
              <CircularProgress
                variant="determinate"
                className="jss366"
                value={100}
                style={{
                  width: "100%",
                  height: "100%",
                  transform: "rotate(-90deg)",
                }}
              />
            </div>
            <div className="jss368">
              <Rating value={5} precision={0.5} />
            </div>
            <span>16 người đánh giá</span>
          </div>
        </div>
      </div>
      <div className="jss376" id="TapMovieDetail">
        <AppBar className="jss377" position="static">
          <Tabs
            value={state.parent}
            onChange={handleChangeTab("parent")}
            centered
          >
            <Tab
              className="jss379"
              label=<span className="MuiTab-wrapper">LỊCH CHIẾU</span>
            />
            <Tab
              className="jss379"
              label=<span className="MuiTab-wrapper">THÔNG TIN</span>
            />{" "}
            <Tab
              className="jss379"
              label=<span className="MuiTab-wrapper">ĐÁNH GIÁ</span>
            />
          </Tabs>
        </AppBar>
        {state.parent === 0 ? ( //tab lịch chiếu
          <div
            style={{
              opacity: "1",
              transition: "opacity 400ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            }}
          >
            <Box className="jss114">
              <div className="jss421">
                <Tabs
                  className="jss422"
                  orientation={isSmallScreen ? "horizontal" : "vertical"}
                  value={state.tab1}
                  onChange={handleChangeTab("tab1")}
                  sx={{ borderRight: 1, borderColor: "divider" }}
                >
                  {state.phim?.heThongRapChieu?.map((rap) => (
                    <Tab
                      className="jss425"
                      key={rap.maHeThongRap}
                      label=<span className="MuiTab-wrapper jss424">
                        <img
                          src={rap.logo}
                          alt="theaterLogo"
                          className="jss426"
                        />
                        <span>{rap.tenHeThongRap}</span>
                      </span>
                    />
                  ))}
                </Tabs>
                <div className="jss427">
                  <div style={{ display: "block" }}>
                    <div>
                      <>
                        <div className="jss428">
                          {Object.keys(dsGroup || {})?.map((o, index) => (
                            <div
                              key={index}
                              className="jss429"
                              style={
                                state.tab2 === index
                                  ? { color: "rgb(251, 66, 38)" }
                                  : {}
                              }
                              onClick={(e) => handleChangeTab("tab2")(e, index)}
                            >
                              <p>
                                {capitalizeFirstLetter(
                                  moment(o).locale("vi").format("dddd")
                                )}
                              </p>
                              <p
                                style={{
                                  fontSize: "16px",
                                  transition: "all 0.2s ease 0s",
                                }}
                              >
                                {o}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: "block" }}>
                          {Object.entries(dsGroup)?.[state.tab2]?.[1]?.map(
                            (o, i) => {
                              const detail = state.lstDetailLich?.find(
                                (p) =>
                                  p.thongTinPhim?.maLichChieu === +o.maLichChieu
                              )?.thongTinPhim;
                              return (
                                <div className="jss432" key={i}>
                                  <Accordion>
                                    <AccordionSummary
                                      className="jss439"
                                      classes={{
                                        content: "jss440",
                                      }}
                                    >
                                      <img
                                        className="jss434"
                                        src={detail?.hinhAnh}
                                        alt="theater"
                                      />
                                      <div className="jss435">
                                        <p className="jss442 jss444">
                                          <span>
                                            {detail?.tenCumRap?.split("-")?.[0]}
                                          </span>
                                          <span className="jss443">
                                            -{" "}
                                            {detail?.tenCumRap?.split("-")?.[1]}
                                          </span>
                                        </p>
                                        <p
                                          style={{
                                            fontSize: "14px",
                                            color: "rgb(155, 155, 155)",
                                          }}
                                        >
                                          {detail?.diaChi}
                                        </p>
                                      </div>
                                    </AccordionSummary>
                                    <AccordionDetails className="jss445">
                                      <Collapse in={true}>
                                        <button className="jss446">
                                          <span className="jss447">
                                            {moment(
                                              o?.ngayChieuGioChieu
                                            ).format("H:mm")}
                                          </span>
                                          <span>
                                            {" "}
                                            ~{" "}
                                            {moment(o.ngayChieuGioChieu)
                                              .add(o.thoiLuong, "minutes")
                                              .format("H:mm")}
                                          </span>
                                        </button>
                                      </Collapse>
                                    </AccordionDetails>
                                  </Accordion>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </div>
        ) : state.parent === 1 ? ( //tab thông tin
          <div className="jss381 jss410">
            <Box className="jss430">
              <div className="row text-white jss382">
                <div className="col-sm-6 col-xs-12">
                  <div className="row mb-2">
                    <p className="float-left jss383">Ngày công chiếu</p>
                    <p className="float-left jss384">
                      {state?.phim?.ngayKhoiChieu &&
                        moment(state?.phim?.ngayKhoiChieu).format("YYYY.MM.DD")}
                    </p>
                  </div>
                  <div className="row mb-2">
                    <p className="float-left jss383">Đạo diễn</p>
                    <p className="float-left jss384"> Adam Wingard </p>
                  </div>
                  <div className="row mb-2">
                    <p className="float-left jss383">Diễn viên</p>
                    <p className="float-left jss384">
                      Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby
                      Brown
                    </p>
                  </div>
                  <div className="row mb-2">
                    <p className="float-left jss383">Thể Loại</p>
                    <p className="float-left jss384">
                      hành động, giả tưởng, ly kỳ, thần thoại
                    </p>
                  </div>
                  <div className="row mb-2">
                    <p className="float-left jss383">Định dạng</p>
                    <p className="float-left jss384">2D/Digital</p>
                  </div>
                  <div className="row mb-2">
                    <p className="float-left jss383">Quốc Gia SX</p>
                    <p className="float-left jss384">Mỹ</p>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-12">
                  <div className="row mb-2">
                    <p className="float-left jss383">Nội dung</p>
                  </div>
                  <div className="row mb-2">
                    <p>{state.phim?.moTa}</p>
                  </div>
                </div>
              </div>
            </Box>
          </div>
        ) : (
          // tab đánh giá
          <div className="jss381 jss410">
            <Box className="jss431">
              <div className="jss386">
                <div className="jss387">
                  <span className="jss388">
                    <img
                      src="https://movie-booking-project.vercel.app/img/unknowUser.png"
                      alt="avatar"
                      className="jss390"
                    />
                  </span>
                  <input
                    className="jss391"
                    type="text"
                    placeholder="Bạn nghĩ gì về phim này?"
                  />
                  <span className="jss392">
                    <Rating value={5} />
                  </span>
                </div>
              </div>
              {(state.isMore ? dataComment : dataComment.slice(0, 5)).map(
                (o, i) => (
                  <ItemComment data={o} key={i} />
                )
              )}
              {!state.isMore && (
                <div className="jss408 jss415">
                  <ButtonBase
                    className="jss409"
                    onClick={() => {
                      setState({ isMore: true });
                    }}
                  >
                    <ListItemText primary="XEM THÊM" />
                  </ButtonBase>
                </div>
              )}
            </Box>
          </div>
        )}
      </div>
    </div>
  );
};
const ItemComment = ({ data }) => {
  return (
    <div className="jss393">
      <div className="jss394">
        <div className="jss398">
          <span className="jss389">
            <img src={data.avt} alt="avatar" className="jss390" />
          </span>
          <span className="jss395">
            <p className="jss396">{data.name}</p>
            <p className="jss397">{data.ago}</p>
          </span>
        </div>
        <div className="jss399">
          <p className="text-success">{data.rates}</p>
          <Rating value={data.rate} />
        </div>
        <div className="clearfix"></div>
      </div>
      <div className="py-3 mb-3 border-bottom">
        <p className="text-break">{data.content}</p>
      </div>
      <span className="d-inline-block" style={{ cursor: "pointer" }}>
        <span className="mr-2">
          <ThumbUpAltIcon />
        </span>
        <span style={{ color: "rgb(115, 117, 118)" }}>
          <span>{data.likes}</span> Thích
        </span>
      </span>
    </div>
  );
};
export default DetailFilm;
