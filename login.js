// Login Page Script
const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve user details from local storage
    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
        alert('No user found with this email! Please sign up first.');
        return;
    }

    const user = JSON.parse(storedUser);

    // Validate password
    if (user.password === password) {
        localStorage.setItem('loggedInUser', email);
        alert(`Welcome back, ${user.name}!`);
        window.location.href = 'welcome.html'; // Redirect to welcome page
    } else {
        alert('Incorrect password! Please try again.');
    }
});
