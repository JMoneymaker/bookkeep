import Component from '../Component.js';
import AddBook from './AddBook.js';

class Controls extends Component {
  onRender(dom) {
    const addBook = new AddBook();
    dom.prepend(addBook.renderDOM());
  }

  renderHTML(){
    return /*html*/`
        <div id="controls">
        </div>
        `;
  }
}

export default Controls;
