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
	$scope.newProject = false


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

	// $scope.showRoadList = function() {
	// 	// IF road list hidden, bind road info and show,
	// 	// ELSE IF list visible, hide:
	// 	if ($scope.roadList == false) {
	// 		$scope.roadList = true;
	// 		//Get road info from server:
	// 		var road_dir = "https://track.sim.vuw.ac.nz/api/eagletyle/road_dir.json";
	//     	$http.get(road_dir).then (function (response) {
	//     		//Assign the info to the ng-repeat in the html:
	//     		$scope.listOfRoads = response.data.Roads;
	// 		});		
	// 	} else if ($scope.roadList == true) {
	//         $scope.roadList = false;
	// 	};
	// };

	// $scope.showProjectList = function() {
	// 	// IF project list hidden, bind project info and show,
	// 	// ELSE IF list visible, hide:
	// 	if ($scope.projectList == false) {
	// 		$scope.projectList = true;
	// 		//Get project info from server:
	// 		var project_dir = "https://track.sim.vuw.ac.nz/api/eagletyle/project_dir.json";
	//     	$http.get(project_dir).then (function (response) {
	//     		//Assign the info to the ng-repeat in the html:
	//     		$scope.listOfProjects = response.data.Projects;
	// 		});		
	// 	} else if ($scope.projectList == true) {
	//         $scope.projectList = false;
	// 	};		


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
	};

	$scope.editProjInfo = function(Projects){
		$scope.projID = Projects.ID;
		$scope.roadID = Projects.Road;
		$scope.projType = Projects.Name;
		$scope.status =  Projects.Status;
	};

	/****************************************************
		Add roads/projects
	****************************************************/

	// This section define a new item to post to the server. This can be easily modified to use data from user input
	// If the ID is new, a new object is created. If the ID is already in use, the existing item will be updated.
	$scope.addNewRoad = function() {
		var roadObj = {
			ID: $scope.ID,
			Code: $scope.roadName,
			Type: $scope.roadType,
			Section: $scope.section,
			Location: $scope.location,
			GPS: $scope.latLon,
		};
		// This section will post new data to the JSON file on the server
		var postNewRoad = $http.post('https://track.sim.vuw.ac.nz/api/eagletyle/update.road.json', roadObj);
		postNewRoad.success(function(data, status, headers, config){
			$scope.postSuccess = "Posted Sucessfully";
		});
		postNewRoad.error(function(data, status, headers, config){
			$scope.postSuccess = "Failed to post";
		});

	};

	$scope.addNewProject = function() {
		var projectObj = {
			ID: $scope.projID,
			Road: $scope.roadID,
			Name: $scope.projType,
			status: $scope.status,
		};
		// This section will post new data to the JSON file on the server
		var postNewProject = $http.post('https://track.sim.vuw.ac.nz/api/eagletyle/update.project.json', projectObj);
		postNewProject.success(function(data, status, headers, config){
			$scope.postSuccess = "Posted Sucessfully";
		});
		postNewProject.error(function(data, status, headers, config){
			$scope.postSuccess = "Failed to post";
		});
	};








	/****************************************************
		Add roads/projects
	****************************************************/
	$scope.showNewRoadForm = function() {
		if ($scope.newRoad == false) {
			var overlay = document.createElement('div');
			overlay.id = 'overlay';
			document.getElementById('mainMenu').appendChild(overlay);
			$scope.newRoad = true;
		} else if ($scope.newRoad == true) {
			$scope.newRoad = false;
		}
	};

	$scope.showNewProjectForm = function() {
		if ($scope.newProject == false) {
			var overlay = document.createElement('div');
			overlay.id = 'overlay';
			document.getElementById('mainMenu').appendChild(overlay);
			$scope.newProject = true;
		} else if ($scope.newProject == true) {
			$scope.newProject = false;
		}
	};

	$scope.closeForm = function() {
		$scope.newRoad = false;
		$scope.newProject = false;
		document.getElementById('overlay').remove();
	};







});
	/****************************************************
		Deleting roads/projects
	****************************************************/
	/*
	$scope.deleteRoad = function() {
		var roadObj = {
			ID: $scope.ID,
			Code: $scope.roadName,
			Type: $scope.roadType,
			Section: $scope.section,
			Location: $scope.location,
			GPS: $scope.latLon,
		};

		// This section will post new data to the JSON file on the server
		// Unsure as to how the delete works with the URL
		var postNewRoad = $http.post('https://track.sim.vuw.ac.nz/api/eagletyle/delete.road.<roadid>.json', roadObj);
		postNewRoad.success(function(data, status, headers, config){
			$scope.postSuccess = "Posted Sucessfully";
		});
		postNewRoad.error(function(data, status, headers, config){
			$scope.postSuccess = "Failed to post";
		});
	}*/
