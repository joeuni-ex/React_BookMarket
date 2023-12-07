import "./Search.css";

const SeachBookCard = ({ book }) => {
  return (
    <>
      <div className="searchBook">
        <a href={book.link}>
          <img src={book.cover} alt="img" />
        </a>
        <div className="book_info">
          <a href={book.link}>{book.title}</a>
          <p>{book.author}</p>
          <p>출판사 : {book.publisher}</p>
          <p>정가 : {book.priceStandard}</p>
          <p>할인가 : {book.priceSales}</p>
        </div>
        <div>
          <a href={book.link}></a>
        </div>
      </div>
    </>
  );
};

export default SeachBookCard;
