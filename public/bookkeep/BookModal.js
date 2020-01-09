import Component from '../Component.js';

class BookModal extends Component {
  onRender(form) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const book = {
        title: formData.get('title'),
        author: formData.get('author'),
        addDate: formData.get('add-date'),
        readDate: formData.get('read-date'),
        genre: formData.get('genre')
      };

      fetch('/api/v1/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })

        .then(res => res.json())
        .then(book => {
          if(book._id) {
            window.location.href = '/bookkeep.html';
          } else {
            console.log('Book not added');
          }
        });
    });
  }

  renderHTML() {
    return /*html*/`
        <div>
            <form class="book-modal">
                <fieldset>
                <legend>add a book</legend>
                <input name="title" type="text" placeholder="title" required>
                <input name="author" type="text" placeholder="author" required>
                <input name="read-date" type="date" placeholder="read?">
                <input name="genre" type="text" placeholder="genre">
                </fieldset>
                <button type="submit">add</button>
                <button type="reset">reset</button>
                <button type="button" onClick="window.location.href = '/bookkeep.html';">cancel</button>
            </form>
        </div>
        `;
  }
}

export default BookModal;
