$(document).ready(function () {
    $('.test-container select').droplist();

    $('.check-button-container button').click(function () {
        var $droplists = $('.jq-droplist-select');
        $droplists.each(function () {
            $(this).removeClass('correct wrong');

            var correctValue = $(this).parents('.jq-droplist-container').find('select').data('correct-value');
            if ($(this).data('value') === correctValue) {
                $(this).addClass('correct');
            } else {
                $(this).addClass('wrong');
            }
        });
    });
});