'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('TaxiListCtrl', ['$scope', 'datasource',
  function($scope, datasource) {
    if(!datasource.hasConfig()) {
      window.location.assign("#/init");
    } else {
      $scope.phones = datasource.getTaxi();
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
      var result = [
        {'name': 'Наше таксі плюс', 'avatar': 'mock/images/1.png',
         'phone': '0631505624'},
        {'name': 'Оптимальне', 'avatar': 'mock/images/2.png',
         'phone': '0631505624'},
        {'name': 'Браво', 'avatar': 'mock/images/3.png',
         'phone': '0631505624'},
         {'name': 'Наше таксі плюс', 'avatar': 'mock/images/1.png',
         'phone': '0631505624'},
        {'name': 'Оптимальне', 'avatar': 'mock/images/2.png',
         'phone': '0631505624'},
        {'name': 'Браво', 'avatar': 'mock/images/3.png',
         'phone': '0631505624'}
      ]
      return result;
    },

    this.save = function(key, _object) {
      window.localStorage.setItem(key, JSON.stringify(_object));
    },

    this.get = function(key) {
      return JSON.parse(window.localStorage.getItem(key));
    }

  });


/* Event handlers */

$(document).on( "click", ".save-config1", function() {
  alert( $( this ).text() );
});