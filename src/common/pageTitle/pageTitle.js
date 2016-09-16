angular.module('EtchBoilerplate.PageTitle', [
])

.factory('PageTitle', function(){
	var title;

	return {
		title: function() {
			return title ? (title + ' - EtchBoilerplate') : 'EtchBoilerplate';
		},
		getTitle: function() {
			return title;
		},
		setTitle: function(newTitle) {
			title = newTitle;
		}
	};
})

;