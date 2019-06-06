var app = angular.module('trackApp', []);


app.controller('mainCtrl', function($scope, $http) {


	/****************************************************
		Hides/shows different pages
	****************************************************/
	$scope.login = true;
	$scope.menu = false;
	$scope.roadList = false;
	$scope.projectList = false;
	$scope.newRoad = false;
	$scope.newProject = false;
	$scope.editRoad = false;
	$scope.editProject = false;
	var userType;


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
	  				$scope.name = response.data.Users[i].LoginName;
	  				userType = response.data.Users[i].UserType;
	  				$scope.login = false;
	  				$scope.menu = true;
	  				// User permissions:
	  				if (userType == 'manager') {
		  				$scope.addRoadButton = true;
		  				$scope.addProjectButton = true;
		  			}
	  			} else if ($scope.username != null && $scope.password != null) {
	  				$scope.loginFeedback = 'Sorry, those details were not correct.';
	  			};
	  		}
		});
	};
	$scope.logOut = function(){
		$scope.login = true;
		$scope.menu = false;
		$scope.username = null;
		$scope.password = null;
		$scope.loginFeedback = 'Log out sucessful';
	}

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
						// User permissions:
						if (userType == 'manager') {
							$scope.saveRoadButton = true;
							$scope.deleteRoadButton = true;
						}
						else if (userType == 'inspector'){
							$scope.saveProjectButton = true;
							$scope.deleteProjectButton = true;
						}
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
						// User permissions:
						if (userType == 'manager') {
							$scope.saveProjectButton = true;
							$scope.deleteProjectButton = true;
						}
						else if (userType == 'inspector'){
							$scope.saveProjectButton = true;
							$scope.deleteProjectButton = true;
						}
					} else if ($scope.projectList == true) {
						$scope.projectList = false;
					}
				}, function errorCall() {
					$scope.feedback = "Failed to load file";
				}
			);
	};



	/****************************************************
		Edit existing roads/projects
	****************************************************/
	$scope.editRoadInfo = function(Roads){
		//Add overlay for lightbox and display lightbox:
		var overlay = document.createElement('div');
		overlay.id = 'overlay';
		document.getElementById('mainMenu').appendChild(overlay);
		$scope.editRoad = true;
		//Put info from server into edit form
		$scope.ID = Roads.ID;
		$scope.roadName = Roads.Code;
		$scope.roadType = Roads.Type;
		$scope.section =  Roads.Section;
		$scope.location = Roads.Location;
		$scope.latLon = Roads.GPS;
	};

	$scope.editProjInfo = function(Projects){
		//Add overlay for lightbox and display lightbox:
		var overlay = document.createElement('div');
		overlay.id = 'overlay';
		document.getElementById('mainMenu').appendChild(overlay);
		$scope.editProject = true;
		//Put info from server into edit form
		$scope.projID = Projects.ID;
		$scope.roadID = Projects.Road;
		$scope.projType = Projects.Name;
		$scope.status = Projects.Status;
		$scope.startDate = Projects.StartDate;
		$scope.contractor = Projects.Contractor;
		$scope.problems = Projects.Problems;
		$scope.comments = Projects.Comments;
		$scope.works = Projetcs.Works;
	};


	/****************************************************
		Show new roads/projects form
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
		$scope.closeForm();
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
			$scope.closeForm();
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
		Close all forms and remove overlay
	****************************************************/

	$scope.closeForm = function() {
		$scope.newRoad = false;
		$scope.newProject = false;
		$scope.editRoad = false;
		$scope.editProject = false;
		document.getElementById('overlay').remove();
	};







	$scope.deleteRoad = function(Road) {
		var index = $scope.myRoads.indexOf(Road);
		$http.post('https://track.sim.vuw.ac.nz/api/eagletyle/delete.road.' + index + '.json')
	}



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
