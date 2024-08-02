import { useRef, useState } from "react";
import "./LichChieu.scss";
import { AppBar, ButtonBase, ListItemText, Rating } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ItemFilm from "./ItemFilm";
import { datafilm, datafilm2 } from "./data";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import YouTubeDialog from "../YouTubeDialog/YouTubeDialog";

const LichChieu = () => {
  const refYoutube = useRef(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [state, _setState] = useState({ activeTab: 0 });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const handleChange = (event, activeTab) => {
    setState({ activeTab });
  };
  function chunkArrayIntoLevels(arr, level1Size, level2Size) {
    const result = [];

    // Chia mảng thành các nhóm cấp độ 1
    for (let i = 0; i < arr.length; i += level1Size * level2Size) {
      const level1Group = [];

      // Chia mỗi nhóm cấp độ 1 thành các nhóm cấp độ 2
      for (let j = i; j < i + level1Size * level2Size; j += level2Size) {
        level1Group.push(arr.slice(j, j + level2Size));
      }

      result.push(level1Group);
    }

    return result;
  }
  const groupedData1 = chunkArrayIntoLevels(datafilm, 2, 4);
  const groupedData2 = chunkArrayIntoLevels(datafilm2, 2, 4);

  const handleOpenVideo = (url) => () => {
    refYoutube?.current?.show(url);
  };

  return (
    <div id="lichchieu">
      <AppBar className="jss74" position="static">
        <Tabs
          value={state.activeTab}
          onChange={handleChange}
          centered
          className="jss75"
        >
          <Tab
            className="jss78 jss79 jss83"
            label=<span className="MuiTab-wrapper">Đang chiếu</span>
          />
          <Tab
            className="jss78 jss79 jss83"
            label=<span className="MuiTab-wrapper">Sắp chiếu</span>
          />
        </Tabs>
      </AppBar>
      <div className="jss82 jss85">
        {isSmallScreen ? (
          <>
            {(state.isMore ? datafilm : datafilm.slice(1, 4))?.map((o, i) => (
              <div className="jss90" key={i}>
                <div className="jss91">
                  <div
                    className="jss92"
                    style={{ backgroundImage: `url(${o.hinhAnh})` }}
                  />
                  <div className="jss301">
                    <p className="jss302">{o.danhGia}</p>
                    <p className="jss303">
                      <Rating
                        className="jss304"
                        value={5}
                        precision={0.5}
                        classes={{
                          iconFilled: "jss128",
                        }}
                      />
                    </p>
                  </div>
                  <span className="jss95">C18</span>
                </div>
              </div>
            ))}
            {!state.isMore && (
              <div className="jss93 jss96">
                <ButtonBase
                  className="jss94"
                  onClick={() => {
                    setState({ isMore: true });
                  }}
                >
                  <ListItemText primary="XEM THÊM" />
                </ButtonBase>
              </div>
            )}
          </>
        ) : (
          <div className="jss133">
            <Slider
              prevArrow=<ArrowBackIosIcon />
              nextArrow=<ArrowForwardIosIcon />
            >
              {(state.activeTab === 0 ? groupedData1 : groupedData2).map(
                (group, index) => (
                  <div
                    key={index}
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    {group.map((group2, i) => {
                      return (
                        <div key={i}>
                          {group2.map((item, itemIndex) => (
                            <ItemFilm
                              key={itemIndex}
                              data={item}
                              handleOpenVideo={handleOpenVideo}
                            />
                          ))}
                        </div>
                      );
                    })}
                  </div>
                )
              )}
            </Slider>
          </div>
        )}
      </div>
      <YouTubeDialog ref={refYoutube} />
    </div>
  );
};

export default LichChieu;
