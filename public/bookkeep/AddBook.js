import Component from '../Component.js';
import BookModal from './BookModal.js';

class AddBook extends Component {
  onRender(dom) {
    dom.addEventListener('click', () => {
      const bookModal = new BookModal();
      dom.prepend(bookModal.renderDOM());
    });
  }

  renderHTML() {
    return /*html*/`
        <div id="add-book">
        <button>new book</button>
        </div>
        `;
  }
}

export default AddBook;

