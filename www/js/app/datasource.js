// ---------------------------------------------------------------------------------------------------------------
// default data

var defaultData = {
  "taxi" : [
    {
      "title" : "Наше таксі плюс",
      "city" : "lviv",
      "avatar": "mock/images/1.png",
      "phones" : [
        {"life" : "0631505624"}
      ]
    },
    {
      "title" : "Оптимальне",
      "city" : "lviv",
      "avatar": "mock/images/2.png",
      "phones" : [
        {"life" : "0631505624"}
      ]
    },
    {
      "title" : "Браво",
      "city" : "lviv",
      "avatar": "mock/images/3.png",
      "phones" : [
        {"life" : "0631505624"}
      ]
    },
    {
      "title" : "Оптимальне Київ",
      "city" : "kiev",
      "avatar": "mock/images/2.png",
      "phones" : [
        {"life" : "0631505624"}
      ]
    },
  ]
}


// ---------------------------------------------------------------------------------------------------------------
// fill datasource by default dat

if (window.localStorage.getItem("taxi") == null) {
  console.log("init default taxi data", defaultData["taxi"]);
  window.localStorage.setItem("taxi", JSON.stringify(defaultData["taxi"]));  
}


// ---------------------------------------------------------------------------------------------------------------
// sync data

var myRootRef = new Firebase("https://nomertaxi1.firebaseio.com/");
//myRootRef.child("taxi").set([{title: "bravo", city: "lviv", phones: [{life:"0631505624"}]}]);
myRootRef.on("value", function(snapshot) {
  // window.localStorage.setItem("taxi", JSON.stringify(snapshot.val()["taxi"]));
});