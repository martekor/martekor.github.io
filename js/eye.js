document.querySelector('.toggle-eye').addEventListener('mousedown', function(e) {
    e.preventDefault();
    var pwd = document.getElementById('password');
    var icon = document.getElementById('eyeIcon');
    var cursorPos = pwd.selectionStart;
    if (pwd.type === 'password') {
        pwd.type = 'text';
        icon.src = 'assets/eye-slash.svg';
    } else {
        pwd.type = 'password';
        icon.src = 'assets/eye.svg';
    }
    setTimeout(function() {
        pwd.setSelectionRange(cursorPos, cursorPos);
    }, 0);
});