
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
      // console.log(data)
      // console.log(data.response.docs[0].web_url)

      articles = data.response.docs

      for (var i = 0; i < articles.length; i++) {
          var article = articles[i];
          $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
      };
    }) .fail(function() {
        // alert( "Handler for .error() called." )
        $nytElem.append('<li class="article">' + 'New York times data was failed to be loaded due to some reason..., please try again later' + '</li>')
      });  


    // load wikipedia articles
    var wikiurl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + cityStr.replace(', ', '%20') + '&format=json';

    console.log(wikiurl)

    // CODE TO LOAD the data
    $.ajax({
      url: wikiurl,
      jsonp: "callback",
      dataType: 'jsonp',   
      data: {
        q: "select title,abstract,url from search.news where query=\"cat\"",
        format: "json"
    },
      success:function (result){
        // test to verify which string I got, and sucess of JSONPrequest.

        // console.log("GOOD");
        // console.log(result[0]);
        // console.log(result[1]); 
        // console.log(result[2]);

        wikiurldescription = result[1];
        wikiarticleurl = result[3];

        for (var i = 0; i < wikiurldescription.length; i++) {
            finaldescription = wikiurldescription[i];
            // console.log(finaldescription);

            // $wikiElem.append('<li id="wikipedia-links">' + finaldescription + '</li>');

            finalurl =wikiarticleurl[i];
            // console.log(finalurl);
            $wikiElem.append('<li id="wikipedia-links">' + '<a href="' + finalurl + '"">' + finaldescription + '</a>' + '</li>')
            console.log('<li id="wikipedia-links">' + '<a href="' + finalurl + '"">' + finaldescription + '</a>' + '</li>')

        }
      }
    });

    return false;
};

$('#form-container').submit(loadData);
