angular.module('BecomeAHero.Data.VillainCategory', [
	'restangular',
	'BecomeAHero.Data.Settings'
])

// this is the name of the resource in the REST URL
.constant('VillainCategoryResourceName', 'villainCategories')

.service('VillainCategory', function(MyRestangular, VillainCategoryResourceName) {
	
	var VillainCategory = new MyRestangular(VillainCategoryResourceName);

/*
	// static class methods

	VillainCategory.all = function() {
		return Restangular.all(VillainCategoryResourceName);
	};
	*/
	return VillainCategory;
	
})

.run(function(Restangular, VillainCategoryResourceName) {

	// methods that operate on a COLLECTION of VillainCategory
	Restangular.addElementTransformer(VillainCategoryResourceName, true, function(collection) {
/*
		collection.total = function() {
			return _.sum(this, 'value');
		};
*/

		return collection;
	});

	// methods that operate on a SINGLE INSTANCE of an VillainCategory
	Restangular.addElementTransformer(VillainCategoryResourceName, false, function(entity) {

/*
		entity.methodName = function() {
			return this.a + this.b;
		};
*/

		return entity;
	});

})

;