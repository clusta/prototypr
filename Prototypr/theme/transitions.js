$(function () {
    $.ajaxSetup({
        cache: false
    });

    function setInactiveSections() {
        $("main > section + section").addClass("next");
    }

    function getActiveSection() {
        return $("main > section").not(".next").not(".prev");
    }

    function getSectionByIndex(index) {
        return $("main > section").eq(index);
    }

    function getIndexByTagName(el) {
        var tagName = el.prop("tagName");

        return el.parent().children(tagName).index(el);
    }

    function swapContent(html, tagName) {
        var next = html.find(tagName);

        if (next.length > 0) {
            $("body > " + tagName).html(next);
        }
    }

    var getContent = "main > *";

    $("body").on("click", "a[href]", function (e) {
        e.preventDefault();

        var anchor = $(this);
        var href = anchor.attr("href");
        var current = $(getContent);

        $.get(href, function (data) {
            var html = $("<div></div>").html(data);
            var content = html.find(getContent);
            
            function onTransitionEnd() {
                current.remove();

                setInactiveSections();

                swapContent(html, "header");
                swapContent(html, "footer")

                setInactiveSections();
            }

            if (content.filter("section").length == 1) {
                var next = content.first("section");

                next.addClass("next");

                current.last().after(content);

                next.one("transitionend webkitTransitionEnd", function () {
                    current.remove();

                    onTransitionEnd();
                });

                setTimeout(function () {
                    next.removeClass("next");
                }, 60);
            }
            else {
                current.after(content);

                onTransitionEnd();
            }
        });
    });

    $("body").on("click", "main > nav > a", function () {
        var anchor = $(this);
        var index = getIndexByTagName(anchor);
        var active = getActiveSection();

        next = getSectionByIndex(index);

        var currentIndex = getIndexByTagName(active);

        next
            .removeClass("prev")
            .removeClass("next");

        if (currentIndex > index) {
            active.addClass("next");
        }
        else {
            active.addClass("prev");
        }
    });

    setInactiveSections();
});