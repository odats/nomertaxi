function DataSourceApi() 
{
  this.getMyConfig = function() {
    if(this.hasConfig()) {
      return this.get('myConfig');;
    } else {
      return {
        city: 'lviv',
        operator: 'ks'
      }
    }
  },

  this.saveMyConfig = function(city, operator) {
    var myConfig = {
      city: city,
      operator: operator
    }
    console.log('save', myConfig)
    this.save('myConfig', myConfig);
  },

  this.hasConfig = function() {      
    var myConfig = this.get('myConfig');
    if(myConfig && myConfig.city && myConfig.operator) {
      return true;
    } else {
      return false;
    }
  },

  this.getCities = function() {
    var cities = [
      {'title': 'Львів', 'key': 'lviv'},
      {'title': 'Київ', 'key': 'kiev'}
    ]
    return cities;
  },

  this.getOperators = function() {
    var operators = [
      {'title': 'Київстар', 'key': 'ks'},
      {'title': 'МТС', 'key': 'mts'},
      {'title': 'life:)', 'key': 'life'},       
    ]
    return operators;
  },
  
  this.getTaxi = function() {
    var myConfig = this.getMyConfig();

    var allTaxi = this.get('taxi');
    
    // filter by city
    allTaxi = _.filter(allTaxi, function(item) { return item.city == myConfig.city });
    // sort
    allTaxi = _.sortBy(allTaxi, function(item) {  return item.order; });
    // prepare result
    var result = [];    
    _.each(allTaxi, function(item) {
      result.push({
        title: item.title, 
        phone: item.phones[0]['life'], 
        avatar: item.avatar});
    });   

    return result;
  },

  this.save = function(key, _object) {
    window.localStorage.setItem(key, JSON.stringify(_object));
  },

  this.get = function(key) {
    if (window.localStorage.getItem(key) == null) {
      return null;
    } else {
      return JSON.parse(window.localStorage.getItem(key));
    }     
  }
};



// ---------------------------------------------------------------------------------------------------------------
// default data

var defaultData = {
  "taxi" : [
    {
      "title" : "Наше таксі плюс",
      "city" : "lviv",
      "avatar": "mock/images/1.png",
      "order" : 2,
      "phones" : [
        {"life" : "0631505624"}
      ]
    },
    {
      "title" : "Оптимальне",
      "city" : "lviv",
      "avatar": "mock/images/2.png",
      "order" : 1,
      "phones" : [
        {"life" : "0631505624"}
      ]
    },
    {
      "title" : "Браво",
      "city" : "lviv",
      "avatar": "mock/images/3.png",
      "order" : 3,
      "phones" : [
        {"life" : "0631505624"}
      ]
    },
    {
      "title" : "Оптимальне Київ",
      "city" : "kiev",
      "avatar": "mock/images/2.png",
      "order" : 4,
      "phones" : [
        {"life" : "0631505624"}
      ]
    },
  ]
}


// ---------------------------------------------------------------------------------------------------------------
// fill datasource by default data

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
  // myRootRef.child("taxi").set(defaultData['taxi']);
});