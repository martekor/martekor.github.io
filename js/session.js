document.querySelector('button').disabled = true;

var aslum = JSON.parse(localStorage.getItem('aslum') || '{}');

if (aslum.session) {
    fetch('https://aslum.pythonanywhere.com/session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({session: aslum.session})
    })
    .then(function(res) { return res.json(); })
    .then(function(result) {
        if (result.status === 'valid' && result.verified === true) {
            document.getElementById('message').textContent = 'Welcome back, ' + result.username;
            setTimeout(function() {
                window.location.href = '/home.html';
            }, 2000);
        } else if (result.status === 'valid' && result.verified === false) {
            document.getElementById('message').textContent = 'You already registered from this device. Please check your email and click the verification link to confirm your account.';
            document.querySelector('button').disabled = false;
        } else {
            localStorage.removeItem('aslum');
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