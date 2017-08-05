import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class BookShelves extends Component {
  render(){
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf section="currentlyReading" booksList={this.props.currentlyReading} selectOnChange={this.props.selectOnChange}/>
            <BookShelf section="Want to Read" booksList={this.props.wantToRead} selectOnChange={this.props.selectOnChange}/>
            <BookShelf section="Read" booksList={this.props.read} selectOnChange={this.props.selectOnChange}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookShelves
