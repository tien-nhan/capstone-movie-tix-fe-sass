const ItemLargeTinTuc = ({ data }) => {
  return (
    <div className="jss113">
      <a
        href="https://tix.vn/goc-dien-anh/7965-an-dinh-chac-nich-ngay-khoi-chieu-16-04-ly-hai-tung-clip-lat-mat-48h-dam-chat"
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

export default ItemLargeTinTuc;
