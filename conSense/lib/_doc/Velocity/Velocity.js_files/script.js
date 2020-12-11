/*****************
   Known Issues
*****************/ 

/* Demos that use transforms do not work on <=IE9. */
/* Code previews lose their linebreaks in <=IE8. */
/* Code coloring causes a stack overflow in <=IE7. */

/*************
    Global
*************/ 

/* Remove the 300ms tap delay on mobile devices. */
$(window).load(function () {
    FastClick.attach(document.body);
});

/* Force all non-hash links to open in a new tab. */
$("#main a").filter(function() { return !/^#/.test($(this).attr("href")); }).attr("target", "_blank")

/* Highlight code samples.*/
$.each($("code"), function() {
    var $this = $(this);

    Rainbow.color($this.html().replace(/\[tab\]/g, "&nbsp;&nbsp;&nbsp;&nbsp;"), $this.attr("data-rainbow-language"), function (htmlHighlighted) {
        $this.html($.trim(htmlHighlighted).replace(/\n+/g, "<br />"));
    });
});

/* Code Viewer controls. */
var $codeViewer = $("#codeViewer");
$(".codeViewerOpen").on("click", function () {
    var $codeViewerCode = $("#codeViewerCode");

    $codeViewerCode.html("Loading source in real-time... This may take a moment...");
    $codeViewer.fadeIn(200);

    /* Code Viewer source loading. */
    $.ajax({
            type: "get",
            url: $(this).attr("data-script"),
            dataType: "text"
        })
        .done(function (data) {
            Rainbow.color(data, "javascript", function (codeHighlighted) {
                $codeViewerCode
                .velocity({ opacity: 0 }, function() {
                	$codeViewerCode.html(codeHighlighted);
                })
                .velocity({ opacity: 1 });
            });
        });
});

$("#codeViewer").on("click", "#codeViewerClose", function () {
    window.scrollTo(0, 0);

    $("#codeViewer").fadeOut(200);
});

$("body").on("keydown", function (event) {
    if (event.keyCode === 27) {
        $("#codeViewerClose").trigger("click");
    }
});

/* Glossary section creation and scroll highlighting. */
if (!("ontouchstart" in window)) {
    var $glossary = $("#glossary"),
        navHeight = $("#nav").outerHeight();

    if ($glossary.height() > $('body').height()) {
        $glossary.css({ overflowY: 'scroll', height: '90%', width: '120px' })
    }

    $glossary.on("click", "a", function(event) {
        var name = $(this).attr("href");
        event.preventDefault();

        $(name).velocity("scroll", { offset: -(navHeight + 8), complete: function() {
            $(this).attr("id", "");
            window.location.hash = name.substr(1);
            $(this).attr("id", name.substr(1));
        }});
    });

    var section,
        sections = {},
        $documentationPanes = $("#documentation > li[id]").not("[noglossary='true']"),
        $oldBest;

   $documentationPanes.each(function(){
        var $this = $(this),
            words = $this.find(".dataHeaderTitle").text().split(":");

        if (words.length === 2) {
            sections[words[0]] = sections[words[0]] || [];
            sections[words[0]].push([ $this.attr("id"), words[1] ]);
        }
    });

    for (var i in sections) {
        section = sections[i];
        var $section = $("<ul></ul>").appendTo($glossary.append("<b>" + i + "</b>"));

        for (var j = 0; j < section.length; j++) {
            $section.append("<li><a href=\"#" + section[j][0] + "\">" + section[j][1] + "</a></li>");
        }
    }

    $(window).on("scroll", function() {
        $documentationPanes.each(function(){
            var $this = $(this),
                offset = $this.offset();

            if (offset.top >= window.scrollY) {
                if ($oldBest && $oldBest.length) {
                    $oldBest.css({ background: "", borderBottom: "" });
                }

                $oldBest = $glossary.find("a[href=#" + $this.attr("id") + "]").css({ background: "rgba(76, 185, 255, 0.175)", borderBottom: "1px solid rgba(76, 185, 255, 0.175)" });

                return false;
            }
        });
    });
}

var $subscribe = $("#nav form input");

if (localStorage.getItem("subscribed") === "true") {
    $subscribe.remove();
} else {
    $subscribe
        .velocity("transition.slideDownBigIn", { display: "inline-block", delay: 1000, duration: 450 })
        .velocity("callout.pulse", { delay: 100, duration: 600 })
        .on("keydown", function(event) {
            if (event.which === 13) {
                localStorage.setItem("subscribed", "true")
                $(this).closest("form").submit();
                return false;
            }
        });
}