import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  // HIT API
  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");

    setBooks(response.data);
  };

  // EDIT BOOK TITLE
  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    const updatedBooks = books.map((book) => {
      return book.id === id ? { ...book, ...response.data } : book;
      // if (book.id === id) {
      //   return { ...book, ...response.data };
      // }

      // return book;
    });

    setBooks(updatedBooks);
  };

  // DELETE BOOK
  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`)
      
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  // CREATE BOOK
  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title,
    });

    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };
  
  const valueToShare = {
    books,
    fetchBooks,
    deleteBookById,
    editBookById,
    createBook
  };

  return (
    <BooksContext.Provider
      value={{ valueToShare }}
    >
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;
