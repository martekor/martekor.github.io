session' savedSession = localStorage.getItem('session');
if (savedSession) {
    fetch('https://svirityofficiel2.pythonanywhere.com/session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({session: savedSession})
    })
    .then(function(res) { return res.json(); })
    .then(function(result) {
        if (result.status === 'invalid') {
            localStorage.removeItem('session');
            window.location.href = '/index.html';
        }
    });
} else {
    window.location.href = '/index.html';
}
