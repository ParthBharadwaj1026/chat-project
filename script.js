var user="";

function add() {
    user=document.getElementById('inp_usn').value;

    localStorage.setItem('UserName', user);
    window.location='main.html';
}