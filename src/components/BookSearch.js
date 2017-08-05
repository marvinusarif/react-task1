import React, { Component } from 'react'
import _ from 'lodash'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book.js'

class BookSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      booksSearchResult : [],
      searchQuery : ""
    }
    this.searchBooks = this.searchBooks.bind(this);
    this.getSearchBooks = _.debounce(this.getSearchBooks,300);
  }
  searchBooks(e){
    let query = e.target.value;
    this.setState({
      searchQuery : query
    })
    this.getSearchBooks(query)
  }

  getSearchBooks(query){
    if(query){
      const { currentlyReading, wantToRead, read } = this.props;
      BooksAPI.search(query,20).then( booksSearchResult => {
        if(booksSearchResult){
          if(!booksSearchResult.error){
            booksSearchResult.map( book => {
              book.shelf = 'none'
              currentlyReading.map( bookCurrentlyReading => {
                (book.id === bookCurrentlyReading.id)&&(book.shelf = 'currentlyReading')
              })
              wantToRead.map( bookWantToRead => {
                (book.id === bookWantToRead.id) && (book.shelf = 'wantToRead')
              })
              read.map( bookRead => {
                (book.id === bookRead.id) && (book.shelf = 'read')
              })
            })
          }
          this.setState({
            booksSearchResult : booksSearchResult
          })
        }
      })
    }
  }

  render(){
    const { booksSearchResult } = this.state;
    const { selectOnChange } = this.props;

    let books = '';
    if(booksSearchResult.length > 0){
       books = booksSearchResult.map( book => {
        return (
          <li key={book.id}>
            <Book bookDetail={book} selectOnChange={selectOnChange}/>
          </li>
        )
      })
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={this.state.searchQuery} onChange={this.searchBooks}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
