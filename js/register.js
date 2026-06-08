fetch('/config/api.json')
    .then(function(res) { return res.json(); })
    .then(function(config) {
        var API = config.api;
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            var data = {
                username: this.querySelector('[name="username"]').value,
                password: this.querySelector('[name="password"]').value,
                email: this.querySelector('[name="email"]').value
            };
            fetch(API + '/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            .then(function(res) { return res.json(); })
            .then(function(result) {
                if (result.status === 'passed') {
                    localStorage.setItem('martekor', JSON.stringify({session: result.session}));
                    document.getElementById('message').textContent = 'Account created. Check your email to verify.';
                }
                if (result.status === 'failed') {
                    document.getElementById('message').textContent = result.message;
                }
            });
        });
    });