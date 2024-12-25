// Function to open the modal and display details
function showDetails(item) {
    const modal = document.getElementById("menuModal");
    const title = document.getElementById("modalTitle");
    const description = document.getElementById("modalDescription");

    // Customize these descriptions based on item
    if (item === 'Espresso') {
        title.innerText = 'Espresso';
        description.innerText = 'A rich and bold shot of coffee, perfect for a quick energy boost.';
    } else if (item === 'Latte') {
        title.innerText = 'Latte';
        description.innerText = 'A creamy blend of espresso and steamed milk, topped with a touch of foam.';
    } else if (item === 'Cappuccino') {
        title.innerText = 'Cappuccino';
        description.innerText = 'A classic espresso with frothy milk and a sprinkle of chocolate powder.';
    }

    modal.style.display = "flex";
}

// Function to close the modal
function closeModal() {
    document.getElementById("menuModal").style.display = "none";
}

// Close modal when clicking outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById("menuModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

function signOut() {
    // Remove logged-in user from local storage
    localStorage.removeItem('loggedInUser');

    // Notify the user
    alert('You have been signed out successfully.');

}
