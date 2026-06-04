function showMessage(text, isError) {
    var msg = document.getElementById('message');
    msg.textContent = text;
    msg.className = isError ? 'error' : '';
}

function validate(username, password) {
    if (username.length < 3 || username.length > 15) {
        showMessage('Username must be between 3 and 15 characters', true);
        return false;
    }
    if (!/^[a-z0-9_]+$/.test(username)) {
        showMessage('Only lowercase letters, numbers and _ allowed', true);
        return false;
    }
    if (password.length < 5 || password.length > 15) {
        showMessage('Password must be between 5 and 15 characters', true);
        return false;
    }
    return true;
}