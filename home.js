var savedSession = localStorage.getItem('session');
var currentUsername = '';

if (!savedSession) {
    document.getElementById('profile').textContent = 'No session found';
} else {
    document.getElementById('profile').textContent = 'Session: ' + savedSession.substring(0, 10) + '...';
}

setTimeout(function() {
    if (savedSession) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://svirityofficiel2.pythonanywhere.com/session', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            var result = JSON.parse(xhr.responseText);
            document.getElementById('profile').textContent = 'Session check: ' + result.status;
            if (result.status === 'valid') {
                currentUsername = result.username;
                document.getElementById('profile').textContent = 'Welcome, ' + currentUsername;
                loadUsers(currentUsername);
            }
        };
        xhr.onerror = function() {
            document.getElementById('profile').textContent = 'Session request failed';
        };
        xhr.send(JSON.stringify({session: savedSession}));
    } else {
        window.location.href = '/index.html';
    }
}, 1000);

function loadUsers(exclude) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://svirityofficiel2.pythonanywhere.com/home', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', savedSession);
    xhr.onload = function() {
        document.getElementById('profile').textContent = 'Home status: ' + xhr.status;
        if (xhr.status === 200) {
            var users = JSON.parse(xhr.responseText);
            var list = document.getElementById('userList');
            list.innerHTML = '';
            for (var i = 0; i < users.length; i++) {
                if (users[i] !== exclude) {
                    var item = document.createElement('p');
                    item.className = 'user-card';
                    item.innerHTML = '<span class="user-avatar">' + users[i].charAt(0) + '</span>' + users[i];
                    list.appendChild(item);
                }
            }
        }
    };
    xhr.onerror = function() {
        document.getElementById('profile').textContent = 'Home request failed';
    };
    xhr.send();
}
