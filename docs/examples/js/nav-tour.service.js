(function(angular) {
	angular
		.module('ExampleApp')
		.service('NavTourService', ['$timeout', '$cookies', NavTourService]);

	function NavTourService($timeout, $cookies) {
		var service = this;
		var tour = [];

		// Check for tours, and show if appropriate
		this.checkAndShowTour = function() {
			var tours = [$cookies.getObject('twFeatureTour')];

			if (!tours.length) {
				return;
			}
			if (tours[0].after) {
				var now = new Date();
				var after = new Date(tours[0].after);
				if (now < after) {
					console.log("too early");
					console.log(now);
					console.log(after);
					return;
				}
			}

			// Add some delay for rendering - not a long term solution
			$timeout(function() {
				service.showTour(tours[0].id, tours[0].pages, tours[0].position);
				// TODO invalidate  on close?
				$cookies.remove('twFeatureTour');
			}, 1000);
		}

		// Show a tour now
		this.showTour = function(elementId, pages, position) {
			if (!pages.length) {
				return;
			}
			if (!position) {
				position = 'right';
			}
			var title = pages[0].title;
			var content = pages[0].content;

			title += '<a href="" class="close text-no-decoration" '+
				'onclick="hideCover(\''+elementId+'\')">&times;</a>';

			if (pages[0].image) {
				content = '<div class="embed-responsive embed-responsive-4by3">' +
					'<img class="popover-image" src="' + pages[0].image + '" /></div>' +
					content;
			}
			if (pages[0].ctaLink && pages[0].ctaLabel) {
				content += '<a class="btn btn-primary btn-block m-t-2 hidden-lg hidden-xl" ' +
					'href="'+pages[0].ctaLink+'">' +
					pages[0].ctaLabel + '</a>';
			}

			var options = {
				trigger: 'click',
				title: title,
				content: content,
				html: true,
				placement: position,
				container: 'body',
				template: navTourTemplate
			}

			trigger(elementId, options)
		};

		// Add a tour to show up later
		this.addSimpleTour = function(elementId, position, title, content, image, ctaLink, ctaLabel, after) {
			if ($cookies.getObject('twFeatureTour')) {
				console.log("tour already present");
				return;
			}

			// TODO this solution only works on current page load
			var tour = {
				id: elementId,
				position: position,
				pages: [this.getTourPageConfig(
					title, content, image, ctaLink, ctaLabel
				)],
				after: after
			};

			var now = new Date();
			var expiresAt = new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000));

			$cookies.putObject('twFeatureTour', tour, {
				expires: expiresAt
			});
		}

		this.getTourPageConfig = function(title, content, image, ctaLink, ctaLabel) {
			return {
				title: title,
				content: content,
				image: image,
				ctaLink: ctaLink,
				ctaLabel: ctaLabel
			};
		};

		function trigger(id, options) {
			$('.popover').remove();
			$('#navTourCover').remove();

			var target = $('#' + id);
			if (!target.length) {
				return;
			}

			var navTourCover = " \
				<div id='navTourCover' \
					class='nav-tour-cover' \
					style='display: block;' \
					onclick='hideCover(\""+id+"\")'></div>";

			$('body').append(navTourCover);

			target.popover(options);
			target.popover('show');

			//window.triggerPopover(id, options);
		}
		var navTourTemplate = " \
			<div class='popover popover-modal' role='tooltip'> \
				<div class='arrow'></div> \
				<h3 class='popover-title'></h3> \
				<div class='popover-content'></div> \
			</div>";
	}
})(window.angular);

function hideCover(id) {
	$('#navTourCover').remove();
	$('#' + id).popover('destroy');
}
