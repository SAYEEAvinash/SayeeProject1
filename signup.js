// Sign-Up Page Script
const signUpForm = document.querySelector('form');

signUpForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // Validate password match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Store user details in local storage
    const user = { name, email, password };
    localStorage.setItem(email, JSON.stringify(user));

    alert('Sign-Up Successful! You can now log in.');
    window.location.href = 'login.html'; // Redirect to login page
});
