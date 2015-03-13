(function($) {
	$.fn.droplist = function() {
		$(document).on('click', function(e) {
            if (!$(e.target).parents().hasClass('jq-droplist-container')) {
                $('.jq-droplist-container .jq-droplist-items').hide();
            }
        });

        return this.each(function() {
            var $plainSelect = $(this);

            function itemClick() {
                $select.text($(this).text()).data('value', $(this).data('value'));
                $(this).siblings('li').removeClass('current');
                $(this).addClass('current');
                $ul.hide();
                $plainSelect.val($(this).data('value'));
            }

			var $el = $(this);
            $el.css({
                position: 'absolute',
                zIndex: 1,
                left: 0,
                top: -500,
                opacity: 0
            });

            var $container = $('<div></div>').addClass('jq-droplist-container');

            var $select = $('<div></div>').addClass('jq-droplist-select');
            $container.append($select);

            var $ul = $('<ul></ul>').addClass('jq-droplist-items');
            $el.find('option').each(function () {
                var $item = $('<li></li>').text($(this).text()).data('value', $(this).attr('value'));
                $item.click($.proxy(itemClick, $item));

                $ul.append($item);
            });

            var $items = $ul.find('li');

            $items.hover(
                function() {
                    $items.removeClass('selected');
                    $(this).addClass('selected');
                }, function() {
                    $(this).removeClass('selected');
                }
            );

            $items.filter(':first-child').addClass('current');
            $container.append($ul);

            $container.insertBefore($el);
            $container.append($el);

            $select.click(function () {
                var visible = $ul.is(':visible');
                $('.jq-droplist-container .jq-droplist-items').hide();
                $ul.toggle(!visible);
            });

            $plainSelect.on('focus', function() {
                $select.addClass('focus');
            })
            .on('blur', function() {
                $select.removeClass('focus');
            })
            .on('keyup', function(e) {
                var $selected = $items.filter('.selected');

                switch (e.which) {
                    case 40:
                        //down
                        e.preventDefault();
                        if ($ul.is(':visible')) {
                            $items.not($selected).removeClass('selected');
                            if ($selected.length === 0) {
                                $items.filter(':first-child').addClass('selected');
                            } else if (!$selected.is(':last-child')) {
                                $selected.next('li').addClass('selected');
                                $selected.removeClass('selected');
                            }
                        } else {
                            $ul.show();
                            $items.removeClass('selected').filter('li:first-child').addClass('selected');
                        }
                        break;
                    case 38:
                        //up
                        e.preventDefault();
                        $items.not($selected).removeClass('selected');
                        if (!$selected.is(':first-child')) {
                            $selected.prev('li').addClass('selected');
                            $selected.removeClass('selected');
                        }
                        break;
                    case 13:
                        //enter
                        e.preventDefault();
                        if ($ul.is(':visible')) {
                            $selected.click();
                        } else {
                            $ul.show();
                            $items.removeClass('selected').filter('li:first-child').addClass('selected');
                        }
                        break;
                    case 27:
                        //escape
                        e.preventDefault();
                        $ul.hide();
                        break;
                }
            }).on('keydown', function (e) {
                if (e.which != 9) {
                    //do not prevent original select from receiving tab key (for focus switching)
                    e.preventDefault();
                }

                if (e.which == 32) {
                    //space
                    $select.click();
                    $items.removeClass('selected').filter('li:first-child').addClass('selected');
                }
            });
		});
	};
})(jQuery);