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

username=localStorage.getItem('UserName');
roomname=localStorage.getItem('room');

function getData() { firebase.database().ref("/"+roomname).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id=childKey;
    message_data=childData;

    console.log(firebase_message_id);
    console.log(message_data);

    var name=message_data['name'];
    var msg=message_data['msg'];
    var like=message_data['like'];

    name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
    message_with_tag="<h4 class='message_h4'>"+msg+"</h4>";
    like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='update_like(this.id)'>";
    span_with_tag="<span class='glyphicon glyphicon-thumbs-up'> like:"+like+"</span></button><hr>";

    row=name_with_tag+message_with_tag+like_button+span_with_tag;
    document.getElementById('output').innerHTML=row;
} });  }); }

getData();

function send(){
    msg=document.getElementById('msg').value;
    firebase.database().ref(roomname).push({
        name: username,
        msg: msg,
        like: 0
    });
    document.getElementById('msg').innerHTML="";
}

function updateLike(message_id){
    console.log('Clicked on like button- '+message_id);
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    update_likes=Number(likes)+1;
    console.log(update_likes);
    firebase.database().ref(roomname).child(message_id).update({like:update_likes});
}

function logout(){
    localStorage.removeItem('UserName');
    localStorage.removeItem('room');
    window.location='index.html';
}
