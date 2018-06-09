
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $("#street").val();
    var city = $("#city").val();
    var address = street + + ', ' + city

    $greeting.text('So, you are planning to live around ' + city + street + '?' )
    streeviewurl = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + address + '';

    // YOUR CODE GOES HERE!
    $body.append($body.append('<img class="bgimg" src="' + streeviewurl + '"">'));

    return false;
};

$('#form-container').submit(loadData);
