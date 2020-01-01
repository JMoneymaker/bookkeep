import Component from '../Component.js';

class Login extends Component {

  onRender(form) {

    form.addEventListener('submit', event => {
      event.preventDefault();

      const formData = new FormData(event.target);

      const user = {
        email: formData.get('email'),
        password: formData.get('password')
      };

      fetch('api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

        .then(res => res.json())
        .then(user => {
          if(user._id) {
            window.location.href = '../bookkeep.html';
          } else {
            const error = document.createElement('div');
            error.innerHTML = '<p>Invalid email or password</p>';
            form.appendChild(error);
            if(form.children.length > 2) form.removeChild(form.lastChild);
          }
        });
    });
  }

  renderHTML() {
    return /*html*/`
        <form class="auth-form standard">
        <p>
        <label for="login-email">Email</label>
        <input id="login-email" type="email" name="email" required placeholder="you@email.com">
        </p>

        <p>
        <label for="login-password">Password</label>
        <input id="login-password" type="password" name="password" required>
        </p>

        <p>
        <button>Log In</button>
        </p>

        </form>
        `;
  }
}

export default Login;
