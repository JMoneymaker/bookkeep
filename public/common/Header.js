import Component from '../Component.js';
import deleteCookie from '../utils/logout.js';

class Header extends Component {
  onRender(dom) {
    const logout = dom.querySelector('.log-out');
    logout
      .addEventListener('click', () => {
        deleteCookie('session');
      });
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
