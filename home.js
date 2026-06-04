var savedSession = localStorage.getItem('session');
var currentUsername = '';

setTimeout(function() {
    if (savedSession) {
        fetch('https://svirityofficiel2.pythonanywhere.com/session', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({session: savedSession})
        })
        .then(function(res) { return res.json(); })
        .then(function(result) {
            if (result.status === 'valid') {
                currentUsername = result.username;
                document.getElementById('profile').textContent = 'Welcome, ' + currentUsername;
                loadUsers(currentUsername);
            }
        });
    } else {
        loadUsers('');
    }
}, 2000);

function loadUsers(exclude) {
    fetch('https://svirityofficiel2.pythonanywhere.com/home', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(function(res) { return res.json(); })
    .then(function(users) {
        var list = document.getElementById('userList');
        for (var i = 0; i < users.length; i++) {
            if (users[i] !== exclude) {
                var item = document.createElement('p');
                item.className = 'user-card';
                item.innerHTML = '<span class="user-avatar">' + users[i].charAt(0) + '</span>' + users[i];
                list.appendChild(item);
            }
        }
    });
}