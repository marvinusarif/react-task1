import React, {Component} from 'react';

class Book extends Component {
  constructor(props){
    super(props);
    this._onChange = this._onChange.bind(this)
  }
  _onChange(e){
    this.props.selectOnChange(this.props.bookDetail,e)

  }
  render () {
    const { title, authors, imageLinks, shelf } = this.props.bookDetail;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.smallThumbnail})`}}></div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={this._onChange}>
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
}
export default Book;
