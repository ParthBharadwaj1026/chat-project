username=localStorage.getItem('UserName');
document.getElementById('userName').innerHTML='welcome : '+username;

const firebaseConfig = {
    apiKey: "AIzaSyAGKELxcn-U-LkGjfKXMkTSvYKCoNiBlmc",
    authDomain: "kwitter-a8404.firebaseapp.com",
    databaseURL: "https://kwitter-a8404-default-rtdb.firebaseio.com",
    projectId: "kwitter-a8404",
    storageBucket: "kwitter-a8404.appspot.com",
    messagingSenderId: "768212352073",
    appId: "1:768212352073:web:d4c69529334adf10db5398"
};

firebase.initializeApp(firebaseConfig);

function addRoom(){
    room_name_p=document.getElementById("room_inp").value;
    console.log(room_name_p);
    firebase.database().ref('/').child(room_name_p).update({purpose:'adding room name'});
    localStorage.setItem("room", room_name_p);
    window.location="room.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
    Room_names = childKey;
    console.log('room name = '+Room_names);
    row="<div class='room_name' id="+Room_names+" onclick='redirect(this.id)'>#"+Room_names+"</div><hr>";
    document.getElementById('output').innerHTML=row;
});});}

getData();

function redirect(name){
    console.log(name);
    localStorage.setItem('room_name',name);
    window.location='room.html';
}

function logout(){
    localStorage.removeItem('UserName');
    localStorage.removeItem('room');
    window.location='index.html';
}