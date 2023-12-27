import "./BookList.css";
import BookCard from "./BookCard";
import useData from "../../Hook/useData";
import BookCardSkeleton from "./BookCardSkeleton";

const BestSeller = ({ type }) => {
  const {
    data: bestSeller,
    error,
    isLoading,
  } = useData(`/ItemList?queryType=${type}`);

  let count = 1;

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //로딩
  if (isLoading) {
    console.log("로딩");
  }
  return (
    <>
      {error && <em>{error}</em>}
      {isLoading && skeletons.map((n) => <BookCardSkeleton />)}
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
