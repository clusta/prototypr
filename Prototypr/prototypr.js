$(function () {
    $.ajaxSetup({
        cache: false
    });

    function bindSlides() {
        $("main > section + section").addClass("next");
    }

    var selector = "main > *";
    var current = $(selector);

    $("body").on("click", "a[href]", function (e) {
        e.preventDefault();

        var anchor = $(this);
        var href = anchor.attr("href");

        current = $(selector);

        $.get(href, function (data) {
            var html = $("<div></div>").html(data);
            var content = html.find(selector);
            
            if (content.filter("section").length == 1) {
                var next = content.first("section");

                next.addClass("next");

                current.after(content);

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

                    bindSlides();
                });

                setTimeout(function () {
                    next.removeClass("next");
                }, 60);
            }
            else {
                current.after(content);
                current.remove();
            }
        });
    });

    $("body").on("click", "main > nav > a", function () {
        var anchor = $(this);
        var index = anchor.parent().children("a").index(anchor);

        current = $(selector).not(".next").not(".prev");
        next = $(selector).eq(index);

        var currentIndex = current.parent().children("section").index(current);

        next
            .removeClass("prev")
            .removeClass("next");

        if (currentIndex > index) {
            current.addClass("next");
        }
        else {
            current.addClass("prev");
        }
    });

    bindSlides();
});