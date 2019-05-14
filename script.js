var app = angular.module('trackApp', []);


app.controller('mainCtrl', function($scope, $http) {


	/****************************************************
		Hides/shows different pages
	****************************************************/
	$scope.login = true
	$scope.menu = false
	$scope.roadsList = false
	$scope.projectList = false


	/****************************************************
		Check login details correct
	****************************************************/
	$scope.checkLogin = function() {
		var user_list = "https://track.sim.vuw.ac.nz/api/sammoniona/user_list.json";
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

	$scope.showRoadList = function() {
		// IF list of roads hidden, show.
		// ELSE IF list visible, hide:
  	var road_dir = "https://track.sim.vuw.ac.nz/api/eagletyle/road_dir.json";
    $http.get(road_dir).then (function (response) {
			//Iterate through server list of correct logins,
			//Then compare with username/password entered:
      num_of_users = response.data.Roads.length;
      for (var i = 0; i < num_of_users; i++) {
        if ($scope.roadsList == false) {
          $scope.roadsList = true;
          $scope.ID = response.data.Roads[i].ID;
          $scope.roadName = response.data.Roads[i].Code;
          $scope.roadType = response.data.Roads[i].Type;
          $scope.section = response.data.Roads[i].Section;
          $scope.location = response.data.Roads[i].Location;
          $scope.latLon = response.data.Roads[i].GPS;
        } else if ($scope.roadsList == true) {
          $scope.roadsList = false;
        }
      };
		});
	};
});
