import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  FormControl,
  InputLabel,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  ButtonBase,
} from "@mui/material";
import "./Carousel.scss";
import YouTubeDialog from "../YouTubeDialog/YouTubeDialog";
import { datafilm } from "../LichChieu/data";
import moment from "moment";
import "moment/locale/vi"; // Import ngôn ngữ tiếng Việt
moment.locale("vi"); // Đặt ngôn ngữ mặc định là tiếng Việt

const Carousel = () => {
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const refYoutube = useRef(null);

  const options = datafilm.map((o) => o.tenPhim);
  const handleOpenVideo = (url) => () => {
    refYoutube?.current?.show(url);
  };
  const onChangePhim = (key) => async (option, value) => {
    if (value) {
      try {
        const phim = await fetch(
          `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${
            datafilm.find((option) => option.tenPhim === value)?.maPhim
          }`
        ).then((s) => s.json());
        setState({
          rap: null,
          ngayXem: null,
          suatChieu: null,
          dataRap: phim.heThongRapChieu?.reduce(
            (a, c) => [...a, ...c.cumRapChieu],
            []
          ),
          phim,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setState({
        rap: null,
        ngayXem: null,
        suatChieu: null,
        dataRap: null,
        dataNgayXem: null,
        dataSuatChieu: null,
      });
    }
    setState({ [key]: value });
  };
  const onChange = (key) => async (e) => {
    const value = e.target.value;
    if (key === "rap") {
      const dataNgayXem = state.dataRap.find(
        (o) => o.maCumRap === value
      )?.lichChieuPhim;
      setState({ dataNgayXem, ngayXem: null, suatChieu: null });
    } else if (key === "ngayXem") {
      setState({
        dataSuatChieu: [
          moment(
            state.dataNgayXem.find((o) => o.maLichChieu === value)
              .ngayChieuGioChieu
          ).format("H:mm"),
        ],
        suatChieu: null,
      });
    }
    setState({ [key]: value });
  };

  
  return (
    <div id="carousel" className="jss52">
      <Slider
        dots={true}
        prevArrow=<ArrowBackIosIcon />
        nextArrow=<ArrowForwardIosIcon />
      >
        <div
          className="jss53"
          tabIndex="-1"
          style={{ width: "100%", display: "inline-block" }}
        >
          <img
            src="images/gai-gia-lam-chieu.jpg"
            alt="banner"
            className="jss54"
          />
          <div className="jss55"></div>
          <div className="jss124 jss127 play">
            <img
              src="/images/play-video.png"
              className="jss125"
              alt="play"
              onClick={handleOpenVideo(
                "https://www.youtube.com/watch?v=krgcyk2rjFc"
              )}
            />
          </div>
        </div>
        <div
          className="jss53"
          tabIndex="-1"
          style={{ width: "100%", display: "inline-block" }}
        >
          <img
            src="images/lua-deu-gap-lua-dao.jpg"
            alt="banner"
            className="jss54"
          />
          <div className="jss55"></div>
          <div className="jss124 jss127 play">
            <img
              src="/images/play-video.png"
              className="jss125"
              alt="play"
              onClick={handleOpenVideo(
                "https://www.youtube.com/watch?v=74vbhMvB9Ak"
              )}
            />
          </div>
        </div>
        <div
          className="jss53"
          tabIndex="-1"
          style={{ width: "100%", display: "inline-block" }}
        >
          <img
            src="images/than-bip-jack-chot.jpg"
            alt="banner"
            className="jss54"
          />
          <div className="jss55"></div>
          <div className="jss124 jss127 play">
            <img
              src="/images/play-video.png"
              className="jss125"
              alt="play"
              onClick={handleOpenVideo(
                "https://www.youtube.com/watch?v=gqcpChNYH10"
              )}
            />
          </div>
        </div>
      </Slider>
      <div className="jss57 jss24" id="searchTickets">
        <FormControl className="jss58">
          <Autocomplete
            className="jss59"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },
              "& .MuiAutocomplete-hasClearIcon .MuiAutocomplete-clearIndicator":
                {
                  display: "none",
                },
              "& .MuiAutocomplete-hasPopupIcon .MuiAutocomplete-popupIndicator":
                {
                  display: "none",
                },
            }}
            options={options}
            renderInput={(params) => (
              <TextField {...params} label="Tìm phim..." clearOnEscape />
            )}
            onChange={onChangePhim("tenPhim")}
            value={state.tenPhim}
          />
        </FormControl>
        <FormControl
          className="jss66 jss64 jss59"
          sx={{
            "& .MuiOutlinedInput-root": {
              border: "none",
              "& fieldset": {
                border: "none",
              },
            },
            "& .MuiSelect-select": {
              padding: "8px",
              border: "none", // Đảm bảo không có viền trong Select
            },
          }}
        >
          <InputLabel id={`${1}-label`}>{"Rạp"}</InputLabel>
          <Select
            value={state.rap}
            onChange={onChange("rap")}
            labelId="1-label"
          >
            {(
              state.dataRap || [
                { maCumRap: "none", tenCumRap: "Vui lòng chọn Phim!" },
              ]
            ).map((option) => (
              <MenuItem key={option.maCumRap} value={option.maCumRap}>
                {option.tenCumRap}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          className="jss66 jss64 jss59"
          sx={{
            "& .MuiOutlinedInput-root": {
              border: "none",
              "& fieldset": {
                border: "none",
              },
            },
            "& .MuiSelect-select": {
              padding: "8px",
              border: "none",
            },
          }}
        >
          <InputLabel id={`${2}-label`}>{"Ngày xem"}</InputLabel>
          <Select
            labelId={`$2-label`}
            value={state.ngayXem}
            onChange={onChange("ngayXem")}
            label={"label"}
          >
            {(
              state.dataNgayXem || [
                {
                  maLichChieu: null,
                  tenLichChieu: "Vui lòng chọn Phim và Rạp!",
                },
              ]
            ).map((option) => (
              <MenuItem key={option.maLichChieu} value={option.maLichChieu}>
                {option.maLichChieu ? (
                  <div>
                    {option.ngayChieuGioChieu &&
                      moment(option.ngayChieuGioChieu)?.format("YYYY-MM-DD")}
                  </div>
                ) : (
                  option.tenLichChieu
                )}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          className="jss66 jss64 jss59"
          sx={{
            "& .MuiOutlinedInput-root": {
              border: "none",
              "& fieldset": {
                border: "none",
              },
            },
            "& .MuiSelect-select": {
              padding: "8px",
              border: "none", // Đảm bảo không có viền trong Select
            },
          }}
        >
          <InputLabel id={`${3}-label`}>{"Suất chiếu"}</InputLabel>
          <Select
            labelId={`$label`}
            label={"label"}
          >
            {state.dataSuatChieu?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="jss66">
          <ButtonBase className="jss70 jss71">Mua vé ngay</ButtonBase>
        </FormControl>
      </div>
      <YouTubeDialog ref={refYoutube} />
    </div>
  );
};

export default Carousel;
