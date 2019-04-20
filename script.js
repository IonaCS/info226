var app = angular.module('trackApp', []);


app.controller('mainCtrl', function($scope) {
  	
	$scope.login = true
	$scope.menu = false


	$scope.name = '*user*';


	$scope.checkLogin = function() {
	  	//Hard coded login
	  	var correctUsername = 'asd'
	  	var correctPassword = 'asd'
	  	if ($scope.username == correctUsername && $scope.password == correctPassword) {
	  		$scope.login = false;
	  		$scope.menu = true;
	  	} else  if ($scope.username != null && $scope.password != null) {
	  		$scope.feedback = 'Sorry, those details were not correct.';
	  	};
  	};

});