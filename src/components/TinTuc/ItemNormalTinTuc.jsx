
const ItemNormalTinTuc = ({ data }) => {
  return (
    <div className="col-sm-4 pl-0 pr-15">
      <a
        href="https://tix.vn/goc-dien-anh/7963-promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi"
        className="jss111"
      >
        <img className="jss107" src={data.hinhAnh} alt="news-movie" />
        <div className="py-3">
          <h4 className="card-title">{data.title}</h4>
          <p className="text-secondary">{data.content}</p>
        </div>
      </a>
    </div>
  );
};

export default ItemNormalTinTuc;
