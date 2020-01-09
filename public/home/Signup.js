import Component from '../Component.js';

class Signup extends Component {

  onRender(form) {

    form.addEventListener('submit', event => {
      event.preventDefault();

      const formData = new FormData(event.target);

      const user = {
        email: formData.get('email'),
        password: formData.get('password')
      };

      fetch('/api/v1/auth/signup', {
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
            error.innerHTML = '<p>Invalid username of password</p>';
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
        <label for="name">Name</label>
        <input id="name" name="name" required placeholder="Your Name">
        </p>

        <p> 
        <label for="email">Email</label>
        <input id="email" type="email" name="email" required placeholder="you@email.com">
        </p>

        <p>
        <label for="password">Password</label>
        <input id="password" type="password" name="password" required>
        </p>

        <p>
        <button>Sign Up</button>
        </p>

        </form>
        `;
  }
}

export default Signup;

