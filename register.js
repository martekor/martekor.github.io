document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var data = {
        username: this.querySelector('[name="username"]').value,
        password: this.querySelector('[name="password"]').value
    };
    fetch('https://svirityofficiel2.pythonanywhere.com/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(function(res) { return res.json(); })
    .then(function(result) {
        if (result.status === 'pass') {
            localStorage.setItem('session', result.session);
            document.getElementById('message').textContent = 'An account has been created';
        }
    });
});
