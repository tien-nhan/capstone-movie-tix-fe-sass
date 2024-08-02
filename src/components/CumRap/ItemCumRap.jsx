const ItemCumRap = ({ cumRap, ...props }) => {
  return (
    <div className="jss200 jss205" key={cumRap.maCumRap} {...props}>
      <img className="jss201" src={cumRap.hinhAnh} alt="hinh-anh" />
      <div className="jss202">
        <p className="jss206 jss208">
          <span>{cumRap.tenCumRap?.split("-")?.[0] || ""}</span>

          <span className="jss207">
            {" - "}
            {cumRap.tenCumRap?.split("-")?.[1] || ""}
          </span>
        </p>
        <p className="jss203">{cumRap.diaChi}</p>
      </div>
    </div>
  );
};

export default ItemCumRap;
