import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./Header.scss";
import { ButtonBase, Drawer, ListItemIcon } from "@mui/material";
import { Link } from "react-scroll";

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };
  return (
    <div>
      <AppBar position="fixed" color="transparent" className="jss17">
        <Toolbar className="jss19">
          <div className="jss20">
            <img
              src="/images/headTixLogo.png"
              alt="logo"
              style={{ height: "50px" }}
            />
          </div>
          <div className="jss21 jss37">
            <Grid spacing={2}>
              <span className="jss22">
                <Link to="lichchieu" smooth={true} duration={500}>
                  Lịch chiếu
                </Link>
              </span>
              <span className="jss22">
                <Link to="cumrap" smooth={true} duration={500}>
                  Cụm rạp
                </Link>
              </span>
              <span className="jss22">
                <Link to="tintuc" smooth={true} duration={500}>
                  Tin tức
                </Link>
              </span>
              <span className="jss22">
                <Link to="ungdung" smooth={true} duration={500}>
                  Ứng dụng
                </Link>
              </span>
            </Grid>
          </div>
          <div className="jss23 jss38">
            <List className="jss24 jss39">
              <ButtonBase className="jss25 jss27 jss40">
                <ListItemIcon className="jss28">
                  <AccountCircleIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Đăng Nhập" />
              </ButtonBase>
              <ButtonBase className="jss25">
                <ListItemText primary="Đăng Ký" />
              </ButtonBase>
            </List>
          </div>
          <div className="jss31 jss41">
            <ButtonBase className="jss30" onClick={() => setOpen(true)}>
              <IconButton>
                <MenuIcon></MenuIcon>
              </IconButton>
            </ButtonBase>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className="jss32"
        anchor={"right"}
        open={open}
        onClose={toggleDrawer(false)}
        classes={{
          paper: "jss33",
        }}
      >
        <div className="jss34">
          <ButtonBase className="jss30">
            <ListItemIcon className="jss28">
              <AccountCircleIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Đăng Nhập" className="jss22" />
          </ButtonBase>
          <ButtonBase className="jss30">
            <ListItemIcon>
              <KeyboardArrowRightIcon fontSize="large" />
            </ListItemIcon>
          </ButtonBase>
        </div>
        <List>
          <span className="jss35">
            <Link to="lichchieu" smooth={true} duration={500}>
              Lịch chiếu
            </Link>
          </span>
          <span className="jss35">
            <Link to="cumrap" smooth={true} duration={500}>
              Cụm rạp
            </Link>
          </span>
          <span className="jss35">
            <Link to="tintuc" smooth={true} duration={500}>
              Tin tức
            </Link>
          </span>
          <span className="jss35">
            <Link to="ungdung" smooth={true} duration={500}>
              Ứng dụng
            </Link>
          </span>
          <span className="jss35">Đăng ký</span>
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
