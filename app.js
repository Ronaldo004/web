const signup=()=>{
var  user="User";
  if(document.getElementById('Resturant').checked ){
     user="Resturant";
    
  }

    var email=document.getElementById("fname").value;
    var password=document.getElementById("lname").value;
    var Resturant=document.getElementById("email").value;
    var country=document.getElementById("password").value;
    var city=document.getElementById("confirmp").value;
    var User=user;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((cred) => {
          console.log(cred);
 
     })
      .catch((error) => {
          var errorMessage = error.message;
          console.log(errorMessage)
 
      });
 
    let userdata = {
      email:email,
      password:password,
      Resturant:Resturant,
      country:country,
      city:city, 
      user:User




    }
    console.log(userdata);

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      console.log(user.uid);
       firebase.database().ref('user/'+ user.uid).set(userdata);
       setInterval(()=>{
        window.location.href="signin.html";
       },5000);
       
       
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
 
 }
const signin=()=>{
    var email=document.getElementById("Email").value;
    var password=document.getElementById("Password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
     
      sessionStorage.setItem("uid",user.uid);
      
      firebase.database().ref('user/'+user.uid).on("value",(data)=>{
         userType=data.val().user;
        
        console.log(userType);
         if(userType=='User'){
          window.location.href="order.html";
        }
        
        else{
          window.location.href="admin.html"
        }
      })
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
}



const enter=()=>{
  window.location.href="signup.html"
}
const back=()=>{
  window.location.href="signin.html"
}
const onload=()=>{
  firebase.database().ref('user/'+user.uid).on("value",(data)=>{
    userType=data.val().user;
    username=data.val().username;
   
   document.getElementById("elem").value=username;

   


})}
const log=()=>{
  window.location.href="signin.html"

}
const sign=()=>{
  window.location.href="signup.html"

}

const kfc=()=>{
  window.location.href="order1.html"
}

const order=()=>{
 
  

    var resn=document.getElementById("fname").value;
    
  if(resn=="kfc" || resn=="KFC") {
    resn="KFC"
  } 
  if(resn=="mac" || resn=="MAC") {
    resn="MACDONALD"
  } 
   

  var Resn =resn;
    var pcode=document.getElementById("lname").value;
    var iname=document.getElementById("email").value;
    var youa=document.getElementById("password").value;
    var youc=document.getElementById("confirmp").value;
  
  
    var key =firebase.database().ref('KFC').push().key   
 
    let orderdata = {
      Resn:Resn,
pcode:pcode,
iname:iname,

youa :youa ,
youc :youc



    }
    console.log(orderdata);
//  var key="key"+Math.random()+1;
 if(resn=="kfc" || resn=="KFC"){
     firebase.database().ref('KFC/'+ key).set(orderdata);
 }
 else if(resn=="mac" || resn=="MAC" ){
  firebase.database().ref('MAC/'+ key).set(orderdata);
}
else{
  alert("Enter resturant name ex:khi or KHI")
}
  }
  const admin=()=>{
    
    firebase.database().ref('KFC/'+key).on("value",(data)=>{
      username=data.val().Resn;
        
     console.log(username);
    });
  }