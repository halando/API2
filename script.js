//CRUD Create Read Update Delete
const url = "https://soterchat.azurewebsites.net/api/chat";
const xhr = new XMLHttpRequest();

const state ={
    message: [],
    item : { id:null,userId : 125,body : body, isComplete : true },
    edit : false
}


//document.getElementById("uzentek").onscroll = function(){
    //let  sc = document.getElementById("uzenetek").scrollTop;
    //console.log(sc);
//}
function torol(azon){
    console.log(this);
    let uri = url+"/"+azon;
    console.log(uri);
    loadDoc(uri, "DELETE", DELETEfeldolgozo);
}
function szerkeszt(azon){
    state.edit= true;
   document.getElementById("címke").innerHTML="Tartalom:";
  
  let elem = state.messages.findIndex(function(item){
    return item.id ==azon; 
   });
   state.item = elem;
   document.getElementById("body").innerHTML=elem.body;
   document.getElementById("post").innerHTML="Módosítás";
   
}
function render(){
   let  s ="";
    state.messages.forEach(item => {
        s+= `<p> ${item.userId}</p> <p> ${item["body"]}</p>
        <button data-id = "${item.id}" onclick = "torol(${item.id})">Törlés</button>
        <button data-id = "${item.id}" onclick = "szerkeszt(${item.id})">Szerkesztés</button>`;
        //console.log("Item",item);
    });
       // console.log(document.getElementById("messages"));
        document.getElementById("messages").innerHTML=s;
        console.log("Magasság"+document.getElementById("messages").clientHeight);
      document.getElementById("uzenetek").scrollTop = 
      document.getElementById("messages").clientHeight;
      // var offsetHeight = document.getElementByIs('myDiv').offsetHeight;
      // https://stackoverflow.com/questions/15615552/get-div-heifht-with-plain-
     


};
xhr.onreadystatechange = function () {
    console.log("Státust", xhr.status);
    console.log("State", xhr.readyState);
    console.log();
    if ((xhr.status = 200) && (xhr.readyState == XMLHttpRequest.DONE)) // XMLHttpRequest

    {
        console.log("Győzelem!!!");
    }
}
document.getElementById("urlap").onsubmit = function(){  
   event.preventDefault(); 
    let body = event.target.elements.body.value;
    if(!state.edit)
    {
        let  uj = { userId : 125,body : body, isComplete : true };
        loadDoc(url, "POST", POSTfeldolgozo, uj);
    }
    else{
        let  mod= { id:state.item.id, userId : state.item.userId,body : body, isComplete : state.item.isComplete};
        loadDoc(url+"/"+state.item.id, "PUT", PUTfeldolgozo, mod);
    }
    
};

function loadDoc(cim, keresTipus, fuggveny, elem) {
    xhr.onload = function () {
        console.log("ONLOAD");
    }


    xhr.onload = function() { fuggveny ();}
    xhr.open( keresTipus, cim, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send(JSON.stringify(elem));
}

function GETfeldolgozo(){
    console.log("GET kérés feldogozása");
    console.log("Válasz");
    //console.log(xhr.responseText);
    state.messages= JSON.parse(xhr.responseText);
    render();
    //console.log(state.messages);
};

function POSTfeldolgozo(){
    if (xhr.status== 201){
        console.log("POST kérés feldolgozásra");
        loadDoc(url,"GET", GETfeldolgozo);
    }
};
function DELETEfeldolgozo(){
    if (xhr.status== 204){
        console.log("DELETE kérés feldolgozásra");
        loadDoc(url,"GET", GETfeldolgozo);
    }
    else{
        console.log("sikertelen törlés");
    }
};
function PUTfeldolgozo(){
    if (xhr.status== 204){
        console.log("PUT kérés feldolgozásra");
        state.edit = false;
        document.getElementById("címke").innerHTML = "Új:";
        document.getElementById("body").value = "";
        document.getElementById("post").innerHTML = "Üzenet beküldése:";


        loadDoc(url,"GET", GETfeldolgozo);
    }
    else{
        console.log("sikertelen módosításs");
    }
};


loadDoc(url,"GET", GETfeldolgozo);
let idozito = setInterval(function(){
    loadDoc(url,"GET", GETfeldolgozo);
},2500);
