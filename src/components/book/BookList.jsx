import "./BookList.css";
import BookCard from "./BookCard";
import useData from "../../Hook/useData";
import BookCardSkeleton from "./BookCardSkeleton";

const BookList = ({ type }) => {
  const {
    data: books,
    error,
    isLoading,
  } = useData(`/ItemList?queryType=${type}`);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //로딩
  return (
    <>
      {error && <em>{error}</em>}
      {isLoading && skeletons.map((n) => <BookCardSkeleton />)}
      {books.map((book) => (
        <BookCard key={book.itemId} book={book} />
      ))}
    </>
  );
};

export default BookList;
