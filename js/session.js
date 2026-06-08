fetch('/config/api.json')
    .then(function(res) { return res.json(); })
    .then(function(config) {
        var API = config.api;
        document.querySelector('button').disabled = true;
        var martekor = JSON.parse(localStorage.getItem('martekor') || '{}');
        if (martekor.session) {
            fetch(API + '/session', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({session: martekor.session})
            })
            .then(function(res) { return res.json(); })
            .then(function(result) {
                if (result.status === 'valid' && result.verified === true) {
                    window.location.href = '/home.html';
                } else if (result.status === 'valid' && result.verified === false) {
                    document.getElementById('message').textContent = 'You already registered from this device. Please check your email and click the verification link to confirm your account.';
                    document.querySelector('button').disabled = false;
                } else {
                    localStorage.removeItem('martekor');
                    document.getElementById('message').textContent = '';
                    document.querySelector('button').disabled = false;
                }
            })
            .catch(function() {
                document.getElementById('message').textContent = '';
                document.querySelector('button').disabled = false;
            });
        } else {
            document.getElementById('message').textContent = '';
            document.querySelector('button').disabled = false;
        }
    });