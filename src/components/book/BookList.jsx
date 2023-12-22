import "./BookList.css";
import BookCard from "./BookCard";
import useData from "../../Hook/useData";

const BookList = ({ type }) => {
  const { data: books, error } = useData(`/ItemList?queryType=${type}`);

  return (
    <>
      {error && <em>{error}</em>}
      {books.map((book) => (
        <BookCard key={book.itemId} book={book} />
      ))}
    </>
  );
};

export default BookList;
