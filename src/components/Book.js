import React from 'react';

const Book = (book) => {
  const { selectOnChange } = book;
  const { title, authors, imageLinks, shelf } = book.detail;
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.smallThumbnail})`}}></div>
        <div className="book-shelf-changer">
          <select value={shelf} onChange={(e) => {selectOnChange(book,e)}}>
            <option value="moveto" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  )
}
export default Book;
