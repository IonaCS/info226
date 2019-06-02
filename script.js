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

	// This block of code will retrieve the course JSON file from the server and displays it.
	// This can be used to check if the server has updated correctly.
	$scope.showRoadList = function(){
		var road_dir = "https://track.sim.vuw.ac.nz/api/eagletyle/road_dir.json";
			$http.get(road_dir).then(function sucessCall(response) {
					$scope.myRoads = response.data.Roads;
					if ($scope.roadList == false) {
						$scope.roadList = true;
					} else if ($scope.roadList == true) {
						$scope.roadList = false;
					}
				}, function errorCall() {
					$scope.feedback = "Failed to load file";
				}
			);
	};

	$scope.showProjectList = function(){
		//Get project info from server:
		var project_dir = "https://track.sim.vuw.ac.nz/api/eagletyle/project_dir.json";
			$http.get(project_dir).then(function sucessCall(response) {
					$scope.myProjects = response.data.Projects;
					if ($scope.projectList == false) {
						$scope.projectList = true;
					} else if ($scope.projectList == true) {
						$scope.projectList = false;
					}
				}, function errorCall() {
					$scope.feedback = "Failed to load file";
				}
			);
	};

	$scope.editRoadInfo = function(Roads){
		$scope.ID = Roads.ID;
		$scope.roadName = Roads.Code;
		$scope.roadType = Roads.Type;
		$scope.section =  Roads.Section;
		$scope.location = Roads.Location;
		$scope.latLon = Roads.GPS;
	}

	$scope.editProjInfo = function(Projects){
		$scope.projID = Projects.ID;
		$scope.roadID = Projects.Road;
		$scope.projType = Projects.Name;
		$scope.status =  Projects.Status;
	}

	/****************************************************
		Add roads/projects
	****************************************************/

	// This section define a new item to post to the server. This can be easily modified to use data from user input
	// If the ID is new, a new object is created. If the ID is already in use, the existing item will be updated.
	$scope.addNewRoad = function() {
		var roadObj = {
			ID: "Test",
			Code: "Test",
			Type: "Test",
			Section: "Test",
			Location: "Test",
			GPS: "Test",
		};

		// This section will post new data to the JSON file on the server
		var postNewRoad = $http.post('https://track.sim.vuw.ac.nz/api/eagletyle/road_dir.json', roadObj);
		postNewRoad.success(function(data, status, headers, config){
			$scope.postSuccess = "Posted Sucessfully";
		});
		postNewRoad.error(function(data, status, headers, config){
			$scope.postSuccess = "Failed to post";
		});
	};
});
