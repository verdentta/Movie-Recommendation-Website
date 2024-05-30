document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('login-form');
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });

            if (response.ok) {
                alert('User logged in successfully');
                window.location.href = '/index';
            } else {
                alert('Error logging in user');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error logging in user');
        }
    });
});