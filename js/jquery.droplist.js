(function($) {
	$.fn.droplist = function(options) {
		var opt = $.extend({

		}, options);

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
                $items.hide();
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

            var $items = $('<ul></ul>').addClass('jq-droplist-items');
            $el.find('option').each(function () {
                var $item = $('<li></li>').text($(this).text()).data('value', $(this).attr('value'));
                $item.click($.proxy(itemClick, $item));
                $items.append($item);
            });
            $items.find('li:first-child').addClass('current');
            $container.append($items);

            $container.insertBefore($el);
            $container.append($el);

            $select.click(function () {
                var visible = $items.is(':visible');
                $('.jq-droplist-container .jq-droplist-items').hide();
                $items.toggle(!visible);
            });

            $plainSelect.on('focus', function() {
                $select.addClass('focus');
            })
            .on('blur', function() {
                $select.removeClass('focus');
            })
            .on('keyup', function(e) {
                var $selected = $items.find('li.selected');

                console.log(e.which);

                switch (e.which) {
                    case 40:
                        //down
                        if ($items.is(':visible')) {
                            $items.find('li').not($selected).removeClass('selected');
                            if ($selected.length === 0) {
                                $items.find('li:first-child').addClass('selected');
                            } else if (!$selected.is(':last-child')) {
                                $selected.next('li').addClass('selected');
                                $selected.removeClass('selected');
                            }
                        } else {
                            $items.show();
                            $items.find('li').removeClass('selected').filter('li:first-child').addClass('selected');
                        }
                        break;
                    case 38:
                        //up
                        $items.find('li').not($selected).removeClass('selected');
                        if (!$selected.is(':first-child')) {
                            $selected.prev('li').addClass('selected');
                            $selected.removeClass('selected');
                        }
                        break;
                    case 13:
                        //enter
                        if ($items.is(':visible')) {
                            $selected.click();
                        } else {
                            $items.show();
                            $items.find('li').removeClass('selected').filter('li:first-child').addClass('selected');
                        }
                        break;
                    case 27:
                        //escape
                        $items.hide();
                        break;
                }
            }).on('keydown', function (e) {
                if (e.which == 32) {
                    //space
                    e.preventDefault();
                    $select.click();
                    $items.find('li').removeClass('selected').filter('li:first-child').addClass('selected');
                }
            });
		});
	};
})(jQuery);