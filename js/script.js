
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');


    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    // load nytimes
    var nytimesurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nytimesurl += '?' + $.param({
      'api-key': "a280a205aa0144cdb9b52bae2b7c7212",
      'q': address
    });

    // YOUR CODE GOES HERE!
    $.getJSON( nytimesurl, function( data ) {
      var items = [];
      // console.log(data)
      // console.log(data.response.docs[0].web_url)

      articles = data.response.docs

      for (var i = 0; i < articles.length; i++) {
          var article = articles[i];
          $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
      };
    }); 


    return false;
};

$('#form-container').submit(loadData);
