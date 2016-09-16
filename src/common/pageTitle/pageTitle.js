angular.module('BecomeAHero.PageTitle', [
])

.factory('PageTitle', function(){
	var title;

	return {
		title: function() {
			return title ? (title + ' - BecomeAHero') : 'BecomeAHero';
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