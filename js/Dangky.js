function getValue(id) {
    return document.getElementById(id).value.trim();
}
function validate() {
    let password = getValue('password');
    let repassword = getValue('repassword');
    let match = true;   
    if (password != repassword) {
        alert('Mật khẩu không khớp');
        match = false;
    }
    return match;
}
document.getElementById('loginform').onsubmit = validate;