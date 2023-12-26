import "./BookList.css";
import BookCard from "./BookCard";
import useData from "../../Hook/useData";
import BookCardSkeleton from "./BookCardSkeleton";
import Spinner from "../../pages/layout/Spinner";

const BestSeller = ({ type }) => {
  const {
    data: bestSeller,
    error,
    isLoading,
  } = useData(`/ItemList?queryType=${type}`);

  let count = 1;
  return (
    <>
      {error && <em>{error}</em>}
      {isLoading ? <p>로딩중</p> : ""}
      {bestSeller.map((book) => (
        <div className="bestSeller" key={book.itemId}>
          <div style={{ display: "flex", height: "100%" }}>
            <p style={{ fontWeight: "bold" }}>{count++}</p>
          </div>
          <BookCard book={book} />
        </div>
      ))}
    </>
  );
};

export default BestSeller;
