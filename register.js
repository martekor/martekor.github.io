document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var username = this.querySelector('[name="username"]').value;
    var password = this.querySelector('[name="password"]').value;
    if (!validate(username, password)) return;
    var data = { username: username, password: password };
    fetch('https://svirityofficiel2.pythonanywhere.com/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(function(res) { return res.json(); })
    .then(function(result) {
        if (result.status === 'pass') {
            localStorage.setItem('session', result.session);
            showMessage('An account has been created', false);
            setTimeout(function() {
                window.location.href = '/home.html';
            }, 2000);
        }
        if (result.status === 'not_pass') {
            showMessage('Username already exists, choose another one', true);
        }
    });
});
