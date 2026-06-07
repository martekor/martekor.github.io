document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    var data = {
        username: this.querySelector('[name="username"]').value,
        password: this.querySelector('[name="password"]').value,
        email: this.querySelector('[name="email"]').value
    };
    fetch('https://aslum.pythonanywhere.com/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(function(res) { return res.json(); })
    .then(function(result) {
        if (result.status === 'passed') {
            localStorage.setItem('aslum', JSON.stringify({session: result.session}));
            document.getElementById('message').textContent = 'Account created. Check your email to verify.';
            setTimeout(function() {
                window.location.href = '/home.html';
            }, 2000);
        }
        if (result.status === 'failed') {
            document.getElementById('message').textContent = result.message;
        }
    });
});