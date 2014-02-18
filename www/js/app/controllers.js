'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope',
  function($scope) {
    $scope.phones = [
		{'name': 'Наше таксі плюс', 'avatar': 'images/taxi/1.png',
		 'phone': '0631505624'},
		{'name': 'Оптимальне', 'avatar': 'images/taxi/2.png',
		 'phone': '0631505624'},
		{'name': 'Браво', 'avatar': 'images/taxi/3.png',
		 'phone': '0631505624'},
		 {'name': 'Наше таксі плюс', 'avatar': 'images/taxi/1.png',
		 'phone': '0631505624'},
		{'name': 'Оптимальне', 'avatar': 'images/taxi/2.png',
		 'phone': '0631505624'},
		{'name': 'Браво', 'avatar': 'images/taxi/3.png',
		 'phone': '0631505624'},
  	];
  }]);

phonecatControllers.controller('InitCtrl', ['$scope',
  function($scope) {
    $scope.city = 'Lviv';
    $scope.operator = 'Life';

    $("select").selectpicker({style: 'btn-hg btn-info', menuStyle: 'dropdown-inverse'});
  }]);