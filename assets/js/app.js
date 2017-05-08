angular.module('bmrApp', [])

.controller('bmrController', ['$scope', function ($scope) {

	$scope.resetData = function(){
		return {
			measure_system: 'metric',
			cmsHeight:  0,
			kgWeight:  0,
			feetHeight: 0,
			inchesHeight: 0,
			poundWeight: 0,
			age: 0,
			gender: 'male',
			workout_level: "1.2",
		};
	};

	$scope.resetResult = function() {
		return {
			gender: '',
			bmr: 0,
			tdee: 0,
			show: false
		};
	};

	$scope.data = $scope.resetData();
	$scope.result = $scope.resetResult();

	$scope.setMeasure = function(metric){

		$scope.data.measure_system = metric;
	};

	$scope.isImperial = function(){
		return $scope.data.measure_system == 'imperial';
	};

	$scope.setGender = function(gender) {

		$scope.data.gender = gender;

	};

	$scope.resetValues = function(){

		$scope.data = $scope.resetData();
		$scope.result = $scope.resetResult();

	};

	

	$scope.calculate = function(){

		var profile = $scope.data;

		var bmr = 0;

		$scope.result.age = profile.age;

		if (profile.measure_system == 'metric') {
			if (profile.gender == 'female') {

				$scope.result.gender = "Girl";

				bmr = 655.1 + ( 9.563  * profile.kgWeight) + ( 1.850 * profile.cmsHeight) - ( 4.676 * profile.age);

			} else {

				$scope.result.gender = "Boy";
				
			 	bmr = 66.5 + ( 13.75 * profile.kgWeight) + ( 5.003 * profile.cmsHeight) - ( 6.755 * profile.age);		
			}		
				

		} else {

			console.log(profile);

			var cmsToInchConst = 0.393701;
			var footToInchConst = 12.00000648;
			//var kgToPoundConst = 2.2046223;

			var height = profile.feetHeight * footToInchConst + profile.inchesHeight;
			var weight = profile.poundWeight;
			console.log('height: ' + height);
			console.log('weight: ' + weight);

			if (profile.gender == 'female') {	

				$scope.result.gender = "Girl";		

				bmr = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * profile.age);

			} else {

				$scope.result.gender = "Boy";

				bmr = 66 + (6.2 * weight) + (12.7 * height) - (6.76 * profile.age);	
			}
			

		}

		var TDEE = bmr * profile.workout_level;

		$scope.result.bmr = Math.round(bmr);
		$scope.result.tdee = Math.round(TDEE);
		$scope.result.show = true;

	};

	
}]);