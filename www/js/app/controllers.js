'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('TaxiListCtrl', ['$scope', 'datasource',
  function($scope, datasource) {    
    if(!datasource.hasConfig()) {
      window.location.assign("#/init");
    } else {
      $scope.taxis = datasource.getTaxi();
    }
  }]);

appControllers.controller('ConfigCtrl', ['$scope', 'datasource',
  function($scope, datasource) {
    var myConfig = datasource.getMyConfig();
    $scope.cities = datasource.getCities();
    $scope.operators = datasource.getOperators();
    $scope.myCity = myConfig.city;
    $scope.myOperator = myConfig.operator;

    $scope.saveConfig = function() {
      datasource.saveMyConfig($scope.myCity, $scope.myOperator);
      window.location.assign("#/taxi");
    }
  }]);


/* Data store layer */

angular.module('appControllers').service("datasource", function() {
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
      var result = [];

      var taxi = this.get('taxi');
      // prepare result
      _.each(taxi, function(item) {
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

  });