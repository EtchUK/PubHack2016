angular.module('BecomeAHero.Data.User', [
	'restangular'
])

// this is the name of the resource in the REST URL
.constant('UserResourceName', 'users')

.service('User', function(Restangular, UserResourceName, $q) {
	
	var User = Restangular.service(UserResourceName);
	
	User.login = function(creds) {
		return User.get(creds).then(function(data) {
			localStorage.user = JSON.stringify(data);
		});
	};

	User.logout = function(data) {
		localStorage.user = null;
	};

	User.current = function() {
		if (!localStorage.user) {
			return null;
		}
		return JSON.parse(localStorage.user);
	};
/*
	// static class methods

	User.all = function() {
		return Restangular.all(UserResourceName);
	};
	*/
	return User;
	
})

.run(function(Restangular, UserResourceName) {

	// methods that operate on a COLLECTION of User
	Restangular.addElementTransformer(UserResourceName, true, function(collection) {
/*
		collection.total = function() {
			return _.sum(this, 'value');
		};
*/

		return collection;
	});

	// methods that operate on a SINGLE INSTANCE of an User
	Restangular.addElementTransformer(UserResourceName, false, function(entity) {

/*
		entity.methodName = function() {
			return this.a + this.b;
		};
*/

		entity.lastConqueredVillain = function() {
			return _(this.missions).sortBy('completedAt').first();
		};

		return entity;
	});

})

;