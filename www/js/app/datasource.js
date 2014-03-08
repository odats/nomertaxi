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
      {
        "key": "ks",
        "title": 'Київстар',
        "codes": ["039","067","068","096","097","098"],
      },
      {
        "key": "mts",
        "title": 'МТС',
        "codes": ["050","066","095","099"]
      },
      {
        "key": "life",
        "title": 'life:)',
        "codes": ["063", "093"]
      },
      {
        "key": "PEOPLEnet",
        "title": 'peoplenet',
        "codes": ["092"]
      },
      {
        "key": "3mob",
        "title": '3mob',
        "codes": ["091"]
      },
      {
        "key": "intertelecom",
        "title": 'Інтертелеком',
        "codes": ["094"]
      },
    ];
    
    return operators;
  },
  
  this.getTaxi = function() {
    var myConfig = this.getMyConfig();

    var allTaxi = this.get('taxi');
    var allOperators = this.getOperators();
    
    // filter by city
    allTaxi = _.filter(allTaxi, function(item) { return item.city == myConfig.city });
    // sort
    allTaxi = _.sortBy(allTaxi, function(item) {  return item.order; });

    // prepare result

    // halper function to get closeset phone
    var get_close_phone = function(phones, my_operator_key, operators) {
      var my_operator_codes = _.find(operators, function(item){return item.key == my_operator_key});
      if (my_operator_codes && my_operator_codes.codes.length > 0) {
        my_operator_codes = my_operator_codes.codes; 
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
        phone: get_close_phone(item.phones, myConfig.operator, allOperators), 
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