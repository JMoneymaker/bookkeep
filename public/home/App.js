import Component from '../Component.js';
import Header from '../common/Header.js';
import Signup from './Signup.js';
import Login from './Login.js';


class App extends Component {
    
  onRender(dom) {
    fetch('/api/v1/auth/verify', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(user => {
        if(user._id) window.location.href = '/bookkeep.html';
      });

    const header = new Header();
    dom.prepend(header.renderDOM());

    const signUpContainer = dom.querySelector('#signup-container');
    const logInContainer = dom.querySelector('#login-container');

    const signUp = new Signup();
    signUpContainer.appendChild(signUp.renderDOM());

    const logIn = new Login();
    logInContainer.appendChild(logIn.renderDOM());

    const switchToSignUp = dom.querySelector('#signup-button');
    switchToSignUp.addEventListener('click', () => {
      signUpContainer.classList.remove('no-display');
      logInContainer.classList.add('no-display');
    });

    const switchToLogIn = dom.querySelector('#login-button');
    switchToLogIn.addEventListener('click', () => {
      signUpContainer.classList.add('no-display');
      logInContainer.classList.remove('no-display');
    });

  }

  renderHTML() {
    return /*html*/`
        <div>
            <!-- header goes here --> 
            <main id="home-page">
                <p class="erorrs"></p>
                <section class="no-display" id="signup-container">
                  <p class="switch">
                    <button id="login-button">Already a user?</button>
                  </p>
                </section>
                <section id="login-container">
                <p class="switch">
                  <button id="signup-button">Need to create and account?</button>
                </p>
                </section>
            </main>
        </div>      
        `;
  }
        
}

export default App;
