import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import BookShelves from './components/BookShelves'
import BookSearch from './components/BookSearch'
import './App.css'

class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyReading : [],
      wantToRead : [],
      read : []
    }
    this.selectOnChange = this.selectOnChange.bind(this);
  }
  componentDidMount() {
    BooksAPI.getAll().then( books => {
      this.setState({
        /*
        wantToRead : books.filter( book => book.shelf === "wantToRead"),
        currentlyReading : books.filter( book => book.shelf === "currentlyReading"),
        read : books.filter(book => book.shelf === "read")
        */
        currentlyReading : books.filter( book => book.shelf === "currentlyReading"),
        wantToRead : books.filter( book => book.shelf === "wantToRead"),
        read : books.filter(book => book.shelf === "read")
        })
    })
  }
  selectOnChange(book,e){
    const shelfTarget = e.target.value;
    const shelfOrigin = book.detail.shelf;
    //change book.shelf from shelfOrigin to shelfTarget
    let bookTemp = book.detail;
    bookTemp.shelf = shelfTarget;
    if( shelfOrigin === "none" && shelfTarget !=="none"){
      this.setState( (prevState) => ({
        [shelfTarget] : prevState[shelfTarget].concat(bookTemp)
      }))
    }else if( (shelfOrigin !== shelfTarget) && (shelfTarget !== "none")) {

      //Swap states value
      this.setState( (prevState) => ({
        //filter shelfOrigin states
        [shelfOrigin] : prevState[shelfOrigin].filter( _book =>  (_book.id !== bookTemp.id) ),
        //concat shelfTarget states with new values of book.shelf
        [shelfTarget] : prevState[shelfTarget].concat(bookTemp)
      }));
    } else if(shelfTarget === "none") {
      this.setState( (prevState) => ({
        [shelfOrigin] : prevState[shelfOrigin].filter( _book => (_book.id !== bookTemp.id) )
      }));
      //request put book.shelf to None
    }
    this.updateBook(bookTemp,shelfTarget)
  }
  updateBook(book,shelf){
    BooksAPI.update(book,shelf).then(book => {
      return book
    })
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelves
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
            selectOnChange={this.selectOnChange}/>
        )}/>
        <Route path="/search" render={ () => (
          <BookSearch
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
            selectOnChange={this.selectOnChange}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
