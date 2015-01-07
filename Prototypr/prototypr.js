$(function () {
    var selector = "main > section";
    var current = $(selector);

    $("body").on("click", "a", function (e) {
        e.preventDefault();

        var anchor = $(this);
        var href = anchor.attr("href");

        current = $(selector);

        $.get(href, function (data) {
            var html = $("<div></div>").html(data);
            var next = html.find(selector);

            next.addClass("next");

            current.after(next);

            next.one("transitionend webkitTransitionEnd", function () {
                current.remove();

                var header = html.find("header");

                if (header.length > 0) {
                    $("body > header").html(header);
                }

                var footer = html.find("footer");

                if (footer.length > 0) {
                    $("body > footer").html(footer);
                }
            });

            setTimeout(function () {
                next.removeClass("next");
            }, 60);
        });
    });
});