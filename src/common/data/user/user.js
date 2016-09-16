angular.module('BecomeAHero.Data.User', [
	'restangular',
	'BecomeAHero.Data.Settings'
])

// this is the name of the resource in the REST URL
.constant('UserResourceName', 'users')

.service('User', function(MyRestangular, Restangular, UserResourceName, $q) {
	var _current = null;
	var User = new MyRestangular(UserResourceName);
	
	User.login = function(creds) {
		return User.getList(creds).then(function(users) {
			var user = users.plain()[0];
			if (user) {
				User.setCurrent(user);
				return user;
			} else {
				return $q.reject("Failed login");
			}
		});
	};

	User.logout = function() {
		User.setCurrent(null);
	};

	User.setCurrent = function(user) {
		_current = user;
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			localStorage.removeItem("user");
		}
		return user;
	};

	User.current = function() {
		if (!_current) {
			_current = JSON.parse(localStorage.getItem("user"));
		}
		return _current ? User.create(_current) : null;
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
			return _(this.missions).sortBy('completedAt').first() ? _(this.missions).sortBy('completedAt').first().villain : null;
		};

		entity.progressToNextLevelAsPercent = function(){
			//Todo turn 'xp to next level' into a percentage and return
			return 50;
		};

		return entity;
	});

})

;