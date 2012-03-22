(function($) {
	$.fn.extend({
		mpClickTrack: function(options) {
			var defaults = {
				mixpanelRef:mixpanel
			};
				
			var options = $.extend(defaults, options);
			this.unbind("click.mpClickTrack");
			this.bind("click.mpClickTrack", function() {
				var actionName = $(this).attr(options.actionName);
				var href = $(this).attr('href');
				var target = $(this).attr('target');
				var redirect = "";
				if( href && href != "#" && !target ) {
					redirect = href;
				}

				try {
					options.mixpanelRef.track(actionName, {}, function() {
						if( redirect ) {
							document.location = redirect;
						}
					});

					if( redirect ) {
						event.preventDefault();
						setTimeout(function() {
							document.location = redirect;
						},400);
					}

				} catch(err) {
				}
			});


		}
			
			
	});
})(jQuery);
