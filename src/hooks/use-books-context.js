import { useContext } from "react";
import BooksContext from "../context/books";

export const useBooksContext = () => {
  return useContext(BooksContext);
}
