var app = angular.module('trackApp', []);


app.controller('mainCtrl', function($scope, $http) {


	/****************************************************
		Hides/shows different pages
	****************************************************/
	$scope.login = true
	$scope.menu = true
	$scope.roadList = false
	$scope.projectList = false


	/****************************************************
		Check login details correct
	****************************************************/
	$scope.checkLogin = function() {
		var user_list = "https://track.sim.vuw.ac.nz/api/sammoniona/user_list.json"
		$http.get(user_list).then (function (response) {
			//Iterate through server list of correct logins,
			//Then compare with username/password entered:
		    num_of_users = response.data.Users.length
		    for (var i = 0; i < num_of_users; i++) {
				if ($scope.username == response.data.Users[i].LoginName && $scope.password == response.data.Users[i].Password) {
	  				$scope.login = false;
	  				$scope.menu = true;
	  				$scope.name = response.data.Users[i].LoginName;
	  			} else  if ($scope.username != null && $scope.password != null) {
	  				$scope.feedback = 'Sorry, those details were not correct.';
	  			};
	  		}
		});
	};


	/****************************************************
		Show/hide roads/projects lists
	****************************************************/
	$scope.showRoadList = function() {
		// IF list of roads hidden, show. 
		// ELSE IF list visible, hide:
		if ($scope.roadList == false) {
			$scope.roadList = true;
		} else if ($scope.roadList == true) {
			$scope.roadList = false;
		}
	};

	$scope.showProjectList = function() {
		// IF list of roads hidden, show. 
		// ELSE IF list visible, hide:
		if ($scope.projectList == false) {
			$scope.projectList = true;
		} else if ($scope.projectList == true) {
			$scope.projectList = false;
		}
	};



});
