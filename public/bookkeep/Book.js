import Component from '../Component.js';

class Book extends Component {
  renderHTML() {
    const book = this.props.book;

    return /*html*/`
        <div>
        <p>${book.title}</p>
        <p>by ${book.author}</p>
        </div>
        `;
  }
}

export default Book;
