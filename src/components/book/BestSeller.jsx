import "./BookList.css";
import BookCard from "./BookCard";
import useData from "../../Hook/useData";

const BestSeller = ({ type }) => {
  const { data: bestSeller, error } = useData(
    `/ItemList.aspx?queryType=${type}`
  );

  let count = 1;
  return (
    <>
      {error && <em>{error}</em>}
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
