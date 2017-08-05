import React, {Component} from 'react'
import Book from './Book'

class BookShelf extends Component {
  render(){
    const { booksList, section, selectOnChange } = this.props;
    const books = booksList.map( book => {
      return ( <li key={book.id}>
                <Book detail={book} selectOnChange={selectOnChange}/>
               </li>)
    });

    if (booksList) {
      return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{section}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books}
            </ol>
          </div>
        </div>
      )
    }else{
      return (
              <ol className="books-grid">
                <li> This self is empty </li>
              </ol>
            )
    }
  }
}

export default BookShelf;
