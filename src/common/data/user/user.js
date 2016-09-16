angular.module('EtchBoilerplate.Data.User', [
	'restangular'
])

// this is the name of the resource in the REST URL
.constant('UserResourceName', 'user')

.service('User', function(Restangular, UserResourceName) {
	
	var User = Restangular.service(UserResourceName);


	User.getProfile = function() {
		var _this = this;
		return User.one("me").get().then(function(user) {
			_this._current = user;
			return user;
		});
	};
	
	User.login = function(data) {
		var _this = this;
		return User.one("login").customPOST(data, "");
	};

	User.logout = function(data) {
		var _this = this;
		return User.one("logout").customPOST(data, "").then(function(data) {
			_this._current = null;
			return data;
		});
	};

	User.current = function() {
		return this._current;
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

		return entity;
	});

})

;