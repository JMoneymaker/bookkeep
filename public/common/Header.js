import Component from '../Component.js';
import deleteCookie from '../utils/logout.js';

class Header extends Component {
  onRender(dom) {
    fetch('/api/v1/auth/verify', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(user => {
        if(user._id) {
          const hideLogoutButton = dom.querySelector('#logout-button');
          hideLogoutButton.classList.remove('hidden');
        }
      });

    const logout = dom.querySelector('#logout-button');
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
    <button id="logout-button" class="hidden">Log Out</button>
    </header>
    `;
  }

}

export default Header;
