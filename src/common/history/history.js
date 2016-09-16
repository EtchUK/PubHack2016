angular.module('EtchBoilerplate.History', [
	'ui.router'
])

.constant('HistoryEntries', 50)

.run(function($rootScope, History){
	$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
		// make sure we don't log the first pseudo state
		// also don't log explicitly excluded states
		if (!from.abstract && !(from.data && from.data.excludeFromHistory)) { 
			History.log({ name: from.name, params: fromParams });
		}
	});
})

.service('History', function(HistoryEntries) {
	var self = this;
	self.states = [];

	self.previous = function() {
		return self.states[0];
	};

	self.log = function(entry) {
		self.states.unshift(entry);
		// limit number of entries in history
		self.states = self.states.slice(0, HistoryEntries);
	};

});