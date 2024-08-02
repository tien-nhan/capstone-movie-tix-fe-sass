import { useEffect, useState } from "react";
import "./CumRap.scss";
import { Tab, Tabs } from "@mui/material";
import { dataCumRap } from "./data";
import ItemCumRap from "./ItemCumRap";
import moment from "moment";
import "moment/locale/vi"; // Import locale tiếng Việt
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const CumRap = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [state, _setState] = useState({ tab1: 0, tab2: 0 });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const handleChangeTab = (key) => (e, tab) => {
    if (key === "tab1") {
      setState({ tab2: 0 });
    }
    setState({ [key]: tab });
  };
  useEffect(() => {
    const lstPromise = dataCumRap[state.tab1]?.lstCumRap[
      state.tab2
    ]?.danhSachPhim?.map((o) =>
      fetch(
        `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${o.maPhim}`
      ).then((s) => s.json())
    );
    Promise.all(lstPromise).then((values) => {
      setState({ lstPhimTheoTab: values });
    });
    setState({
      maHeThongRap: dataCumRap[state.tab1].maHeThongRap,
      maCumRap: dataCumRap[state.tab1].lstCumRap[state.tab2].maCumRap,
    });
  }, [state.tab1, state.tab2]);

  const formatDateWithCapitalized = (dateStr) => {
    const formattedDate = moment(dateStr).format("dddd, DD [tháng] MM, YYYY"); 

    
    const replacements = {
      Monday: "Thứ Hai",
      Tuesday: "Thứ Ba",
      Wednesday: "Thứ Tư",
      Thursday: "Thứ Năm",
      Friday: "Thứ Sáu",
      Saturday: "Thứ Bảy",
      Sunday: "Chủ Nhật"
    };

    return formattedDate
      .replace(
        /\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/g,
        (match) => replacements[match]
      )
      .replace(/^\w/, (c) => c.toUpperCase())
  };
  return (
    <div id="cumrap">
      <div className="space" />
      <div className="jss97 jss103">
        <Tabs
          className="jss98"
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          value={state.tab1}
          onChange={handleChangeTab("tab1")}
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {dataCumRap.map((rap) => (
            <Tab
              className="jss101 jss104 jss102"
              key={rap.maHeThongRap}
              label=<span className="MuiTab-wrapper">
                <img src={rap.logo} alt="theaterLogo" />
              </span>
            />
          ))}
        </Tabs>

        {dataCumRap[state.tab1] && (
          <div className="jss99">
            <div className="jss24">
              <div className="jss199 jss204">
                {dataCumRap[state.tab1].lstCumRap.map((cumRap, index2) => (
                  <ItemCumRap
                    key={index2}
                    cumRap={cumRap}
                    style={state.tab2 === index2 ? { opacity: "1" } : {}}
                    onClick={(e) => handleChangeTab("tab2")(e, index2)}
                  />
                ))}
              </div>
              <div className="jss214 jss220">
                <div className="jss215 jss221">
                  {dataCumRap[state.tab1] &&
                    dataCumRap[state.tab1].lstCumRap[state.tab2] &&
                    state.lstPhimTheoTab?.map((phim) => {
                      return (
                        <>
                          <div className="jss216">
                            <img
                              src={phim.hinhAnh}
                              alt="hinh-anh"
                              className="jss217"
                            />
                            <div className="jss218">
                              <p className="jss219">{phim.tenPhim}</p>
                              <span>120 phút - Điểm Tix 10</span>
                            </div>
                          </div>
                          <div>
                            <div className="jss222">
                              {(phim?.heThongRapChieu || [])
                                ?.find(
                                  (o) => o.maHeThongRap === state.maHeThongRap
                                )
                                ?.cumRapChieu?.find(
                                  (p) => p.maCumRap === state.maCumRap
                                )
                                ?.lichChieuPhim?.map((lichChieu) => (
                                  <>
                                    <p className="jss223">
                                      {formatDateWithCapitalized(
                                        lichChieu.ngayChieuGioChieu
                                      )}
                                    </p>
                                    <div className="jss224">
                                      <button className="jss225">
                                        <span className="jss226">
                                          {moment(
                                            lichChieu.ngayChieuGioChieu
                                          ).format("H:mm")}
                                        </span>
                                        <span>
                                          {" "}
                                          ~{" "}
                                          {moment(lichChieu.ngayChieuGioChieu)
                                            .add(lichChieu.thoiLuong, "minutes")
                                            .format("H:mm")}
                                        </span>
                                      </button>
                                    </div>
                                  </>
                                ))}
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CumRap;
