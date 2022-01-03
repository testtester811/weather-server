console.log('client side js loaded')

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const successElement = document.getElementById('success');
const errorElement = document.getElementById('error');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchElement.value;
    successElement.textContent = 'Loading...'
    errorElement.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then(response => {
        response.json().then((data) => {
            if (data.error) {
                successElement.textContent = ''
                errorElement.textContent = data.error
                return
            }

            const { current, forecast } = data;
            successElement.textContent = `Current temperature is ${ current }. We expect ${ forecast }`
        })
    })
});
