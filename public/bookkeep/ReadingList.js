import Component from '../Component.js';
import Book from './Book.js';

class ReadingList extends Component {
  onRender(dom) {
    const readingList = this.props.books;

    readingList.forEach(book => {
      const props = { book };
      const bookItem = new Book(props);
      dom.appendChild(bookItem.renderDOM());
    });
  }

  renderHTML() {
    return /*html*/`
        <div id="reading-list">
        </div>
        `;
  }
}

export default ReadingList;
