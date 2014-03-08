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
      {'title': 'PEOPLEnet', 'key': 'peoplenet'},
      {'title': '3mob', 'key': '3mob'},
      {'title': 'Інтертелеком', 'key': 'intertelecom'},       
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

    // halper function to get closeset phone
    var get_close_phone = function(phones, my_operator) {
      var phone_codes = {
        "ks": ["039","067","068","096","097","098"],
        "mts": ["050","066","095","099"],
        "life": ["063,093"],
        "3mob": ["091"],
        "peoplenet": ["092"],
        "intertelecom": ["094"]
      };      

      var my_operator_codes = phone_codes[my_operator];      
      if (my_operator_codes && my_operator_codes.length > 0) {
        var result_phone;
        for (var i=0;i<phones.length;i++) {
          for (var j=0;j<my_operator_codes.length;j++) { 
            if(phones[i].indexOf(my_operator_codes[j]) == 0) {
              result_phone = phones[i];
            }
          }
        }
        return result_phone ? result_phone : phones[0];
      } else {
        return phones[0];
      }
    }; 

    var result = [];    
    _.each(allTaxi, function(item) {
      result.push({
        title: item.title, 
        phone: get_close_phone(item.phones, myConfig.operator), 
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
      "phones" : ["0632438243","0662438243","0672438243"],
      "web" : "http://nashetaxi.com/"
    },
    {
      "title" : "Оптимальне",
      "city" : "lviv",
      "avatar": "mock/images/2.png",
      "order" : 1,
      "phones" : ["0631505624"]
    },
    {
      "title" : "Браво",
      "city" : "lviv",
      "avatar": "mock/images/3.png",
      "order" : 3,
      "phones" : ["0631505624"]
    },
    {
      "title" : "Оптимальне Київ",
      "city" : "kiev",
      "avatar": "mock/images/2.png",
      "order" : 4,
      "phones" : ["0631505624"]
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