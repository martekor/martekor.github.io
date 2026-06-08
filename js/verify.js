fetch('/config/api.json')
    .then(function(res) { return res.json(); })
    .then(function(config) {
        var API = config.api;
        var params = new URLSearchParams(window.location.search);
        var token = params.get('token');
        var martekor = JSON.parse(localStorage.getItem('martekor') || '{}');
        if (token) {
            fetch(API + '/verify', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    token: token,
                    session: martekor.session || ''
                })
            })
            .then(function(res) { return res.json(); })
            .then(function(result) {
                if (result.status === 'verified') {
                    document.getElementById('message').textContent = 'Email verified! Welcome ' + result.username + '.';
                    setTimeout(function() {
                        window.location.href = 'home.html';
                    }, 2000);
                } else {
                    document.getElementById('message').textContent = 'Invalid or expired verification link.';
                }
            });
        } else {
            document.getElementById('message').textContent = 'No verification token found.';
        }
    });