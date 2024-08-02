const ItemSmallTinTuc = ({ list }) => {
  return (
    <div className="col-sm-4 pl-0 pr-15">
      {list.map((o, i) => (
        <a
          key={i}
          className="jss111"
          href="https://tix.vn/goc-dien-anh/7961-khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon"
        >
          <div className="row mb-2">
            <div className="col-3 px-0">
              <img className="jss107" src={o.hinhAnh} alt="news-movie" />
            </div>
            <div className="col-9">
              <h6 className="text-secondary">{o.content}</h6>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ItemSmallTinTuc;
