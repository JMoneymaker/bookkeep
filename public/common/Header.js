import Component from '../Component.js';

class Header extends Component {
  onRender(dom) {
    if(localStorage.getItem('USER')) {
      const button = dom.querySelector('./log-out');
      button.classList.remove('hidden');

      button.addEventListener('click', () => {
        localStorage.removeItem('USER');
        location = './';
      });
    }
  }

  renderHTML() {
    const title = this.props.title || 'bookkeep';

    return /*html*/`
    <header> 
    <h1>${title}<h1>
    <button class="log-out hidden">Log Out</button>
    </header>
    `;
  }

}

export default Header;
