angular.module('BecomeAHero.Data.Villain', [
	'restangular',
	'BecomeAHero.Data.Settings'
])

// this is the name of the resource in the REST URL
.constant('VillainResourceName', 'villains')

.service('Villain', function(MyRestangular, VillainResourceName) {
	
	var Villain = new MyRestangular(VillainResourceName);

/*
	// static class methods

	Villain.all = function() {
		return Restangular.all(VillainResourceName);
	};
	*/
	return Villain;
	
})

.run(function(Restangular, VillainResourceName) {

	// methods that operate on a COLLECTION of Villain
	Restangular.addElementTransformer(VillainResourceName, true, function(collection) {
/*
		collection.total = function() {
			return _.sum(this, 'value');
		};
*/

		return collection;
	});

	// methods that operate on a SINGLE INSTANCE of an Villain
	Restangular.addElementTransformer(VillainResourceName, false, function(entity) {

/*
		entity.methodName = function() {
			return this.a + this.b;
		};
*/

		return entity;
	});

})

;