var session = localStorage.getItem('session');
var username = '';

var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://svirityofficiel2.pythonanywhere.com/session', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
    var r = JSON.parse(xhr.responseText);
    if (r.status === 'valid') {
        username = r.username;
        document.getElementById('profile').textContent = 'Welcome, ' + username;
        var x2 = new XMLHttpRequest();
        x2.open('GET', 'https://svirityofficiel2.pythonanywhere.com/home', true);
        x2.setRequestHeader('Authorization', session);
        x2.onload = function() {
            var users = JSON.parse(x2.responseText);
            var list = document.getElementById('userList');
            list.innerHTML = '';
            for (var i = 0; i < users.length; i++) {
                if (users[i] !== username) {
                    var item = document.createElement('p');
                    item.className = 'user-card';
                    item.innerHTML = '<span class="user-avatar">' + users[i].charAt(0) + '</span>' + users[i];
                    list.appendChild(item);
                }
            }
        };
        x2.send();
    } else {
        window.location.href = '/index.html';
    }
};
xhr.send(JSON.stringify({session: session}));
