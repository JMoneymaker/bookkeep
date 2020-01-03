import Component from '../Component.js';

class Book extends Component {
  renderHTML() {
    const book = this.props.book;

    return /*html*/`
        <div id="book-container">
        <p id="title">${book.title}</p>
        <p id="author">by ${book.author}</p>
        <img id="cover" src="../assets/default-cover.jpeg">
        </div>
        `;
  }
}

export default Book;
