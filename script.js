var app = angular.module('trackApp', []);


app.controller('mainCtrl', function($scope, $http) {


	/****************************************************
		Hides/shows different pages
	****************************************************/
	$scope.login = true
	$scope.menu = false
	$scope.roadList = false
	$scope.projectList = false
	$scope.newRoad = false


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


	/****************************************************
		Show/hide roads/projects lists
	****************************************************/
	$scope.showRoadList = function() {
		//Get road info from server:
		var road_dir = "https://track.sim.vuw.ac.nz/api/eagletyle/road_dir.json";
	    $http.get(road_dir).then (function (response) {
			//Iterate through list of roads on server:
		    num_of_roads = response.data.Roads.length;
		    for (var i = 0; i < num_of_roads; i++) {
		    	// IF road list hidden, bind road info and show.
					// ELSE IF list visible, hide:
		        if ($scope.roadList == false) {
							$scope.roadList = true;
							$scope.ID = response.data.Roads[i].ID;
							$scope.roadName = response.data.Roads[i].Code;
							$scope.roadType = response.data.Roads[i].Type;
							$scope.section = response.data.Roads[i].Section;
							$scope.location = response.data.Roads[i].Location;
							$scope.latLon = response.data.Roads[i].GPS;
		        } else if ($scope.roadList == true) {
		        	$scope.roadList = false;
		        }
		    };
		});
	}; //ng-repeat

	$scope.showProjectList = function() {
		//Get project info from server:
		var project_dir = "https://track.sim.vuw.ac.nz/api/eagletyle/project_dir.json";
	    $http.get(project_dir).then (function (response) {
			//Iterate through list of projects on server:
		    num_of_projects = response.data.Projects.length;
		    for (var i = 0; i < num_of_projects; i++) {
		    	// IF project list hidden, bind project info and show.
					// ELSE IF list visible, hide:
		        if ($scope.projectList == false) {
							$scope.projectList = true;
							$scope.ID = response.data.Projects[i].ID;
							$scope.roadID = response.data.Projects[i].Road;
							$scope.projectType = response.data.Projects[i].Name;
							$scope.status = response.data.Projects[i].Status;
		        } else if ($scope.projectList == true) {
		        	$scope.projectList = false;
		        }
		    };
		});
	};


	/****************************************************
		Add roads/projects
	****************************************************/
	$scope.showNewRoadForm = function() {
		//Get project info from server:
		// This block of code will retrieve the course JSON file from the server and displays it.
	  // This can be used to check if the server has updated correctly.
	  $scope.target = "https://caab.sim.vuw.ac.nz/api/tutortestuser/course_directory.json";
	    $http.get($scope.target).then(function sucessCall(response) {
	        $scope.myData = response.data.courses;
	      }, function errorCall() {
	        $scope.feedback = "Failed to load file";
	      }
	    );
});
