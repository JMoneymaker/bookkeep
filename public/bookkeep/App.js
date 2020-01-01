import Component from '../Component.js';
import Header from '../common/Header.js';
import ReadingList from '../bookkeep/ReadingList.js';
import verifyAuth from '../utils/auth.js';
import Controls from './Controls.js';

class App extends Component {
  onRender(dom) {
    verifyAuth();

    const header = new Header();
    dom.prepend(header.renderDOM());

    const controls = new Controls();
    dom.appendChild(controls.renderDOM());
    
    const readingList = new ReadingList({ books: [] });
    dom.appendChild(readingList.renderDOM());

    async function loadReadingList() {
      const results = await fetch('/api/v1/books');
      const data = await results.json();
      if(data.results === 'False') {
        return {
          results: [],
          count: 0
        };
      }
      readingList.update({ books: data });
    }

    loadReadingList();
  }

  renderHTML() {
    return /*html*/`
        <div>
        </div>
        `;
  }
}

export default App;
