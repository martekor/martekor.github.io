document.querySelector('form').addEventListener('submit', function(e) {
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
            var msg = document.getElementById('msg');
            if (!msg) {
                msg = document.createElement('p');
                msg.id = 'msg';
                document.body.appendChild(msg);
            }
            msg.textContent = 'An account has been created';
        }
    });
});
