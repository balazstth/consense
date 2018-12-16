/******************
   Effects Pack
******************/

var $UIPackEffect = $("#dataBody-UIPackSelEffect"),
	$UIPackStagger = $("#dataBody-UIPackSelStagger"),
	$UIPackDrag = $("#dataBody-UIPackSelDrag"),
	$effectPackDummiesContainer = $("#dataBody-UIPackDummiesContainer"),
	$effectPackDummies = $("#dataBody-UIPackDummiesContainer p");

for (var sequenceName in $.Velocity.Redirects) {
	if (/\./.test(sequenceName)) {
		$UIPackEffect.append($("<option value='" + sequenceName + "'>" + sequenceName + "</option>"));
	}
}

//$effectPackDummies.css("paddingTop", 25);
$effectPackDummiesContainer.height($effectPackDummiesContainer.height());

$UIPackEffect.add($UIPackStagger).add($UIPackDrag).on("change", function (event) {
	var effect = $UIPackEffect.val(),
		stagger = $UIPackStagger.val(),
		drag = $UIPackDrag.val();

	if (effect !== "") {
		var animateOptions = {
				duration: !/\./.test(effect) ? 1000 : null,
				stagger: stagger,
				drag: drag && /^transition/.test(effect),
				backwards: /Out$/.test(effect),
				animateParentHeight: false
			};

		if (effect === "fadeIn" || /In$/.test(effect)) {
			$effectPackDummies.velocity({ opacity: 0 }, 100);
		} 

		$effectPackDummies.velocity(effect, animateOptions);

		if (effect === "fadeOut" || /Out$/.test(effect)) {
			$effectPackDummies.velocity({ opacity: 1 }, { display: "block" });
		} 
	}
});

// $.each($UIPackEffect.find("option").slice(4), function() { $UIPackEffect.val($(this).attr("value")).trigger("change"); });