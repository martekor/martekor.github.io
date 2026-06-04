var savedSession = localStorage.getItem('session');
if (savedSession) {
    fetch('http://localhost:5000/session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({session: savedSession})
    })
    .then(function(res) { return res.json(); })
    .then(function(result) {
        if (result.status === 'valid') {
            document.getElementById('message').textContent = 'Welcome back, ' + result.username;
        }
    });
}