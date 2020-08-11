console.log('load app.js');

const whetherForm = document.querySelector('form');
const searchField = document.querySelector('input');
const messageField = document.querySelector('#message');
const errorField = document.querySelector('#error');

whetherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let location = searchField.value;
    console.log('search value  ', location);
    messageField.innerHTML = 'Loading Information';
    errorField.innerHTML = '';
    fetch(`http://localhost:3000/whether?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorField.innerHTML = data.error;
                messageField.innerHTML = '';
            } else {
                messageField.innerHTML = data.location;
                errorField.innerHTML = data.forecast;

            }
        })
    })
})