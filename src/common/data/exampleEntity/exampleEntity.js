angular.module('EtchBoilerplate.Data.ExampleEntity', [
	'restangular'
])

// this is the name of the resource in the REST URL
.constant('ExampleEntityResourceName', 'entity')

.service('ExampleEntity', function(Restangular, ExampleEntityResourceName) {
	
	var ExampleEntity = Restangular.service(ExampleEntityResourceName);

/*
	// static class methods

	ExampleEntity.all = function() {
		return Restangular.all(ExampleEntityResourceName);
	};
	*/
	return ExampleEntity;
	
})

.run(function(Restangular, ExampleEntityResourceName) {

	// methods that operate on a COLLECTION of ExampleEntity
	Restangular.addElementTransformer(ExampleEntityResourceName, true, function(collection) {
/*
		collection.total = function() {
			return _.sum(this, 'value');
		};
*/

		return collection;
	});

	// methods that operate on a SINGLE INSTANCE of an ExampleEntity
	Restangular.addElementTransformer(ExampleEntityResourceName, false, function(entity) {

/*
		entity.methodName = function() {
			return this.a + this.b;
		};
*/

		return entity;
	});

})

;