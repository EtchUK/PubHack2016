angular.module('BecomeAHero.Data.Mission', [
	'restangular',
	'BecomeAHero.Data.Settings'
])

// this is the name of the resource in the REST URL
.constant('MissionResourceName', 'missions')

.service('Mission', function(MyRestangular, MissionResourceName) {
	
	var Mission = new MyRestangular(MissionResourceName);

/*
	// static class methods

	Mission.all = function() {
		return Restangular.all(MissionResourceName);
	};
	*/
	return Mission;
	
})

.run(function(Restangular, MissionResourceName) {

	// methods that operate on a COLLECTION of Mission
	Restangular.addElementTransformer(MissionResourceName, true, function(collection) {
/*
		collection.total = function() {
			return _.sum(this, 'value');
		};
*/

		return collection;
	});

	// methods that operate on a SINGLE INSTANCE of an Mission
	Restangular.addElementTransformer(MissionResourceName, false, function(entity) {

/*
		entity.methodName = function() {
			return this.a + this.b;
		};
*/

		return entity;
	});

})

;