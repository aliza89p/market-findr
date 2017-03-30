var zip = $('#zipcode').val();
var zipObject;


$(document).ready(function(){
  $("#submit").click(function(e){
      e.preventDefault();
      $("#markets").html("");
      var zip = $("#zipcode").val();
      console.log(zip);
      $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip,
        dataType: 'jsonp'
        })
        .done(function(data){
          data.results.forEach(function(i){
            var marketId= i.id;
            var marketName = i.marketname;
            $.ajax({
              type: "GET",
              contentType: "application/json; charset=utf-8",
              url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + marketId,
              dataType: 'jsonp'
            }).done(function(market){
              $("#results").text("Results");
              var marketHeaders = $("#markets").append("<h2>" + marketName.substr(marketName.indexOf(' ')+1) + "</h2>");
              if(market.marketdetails.Address.length !== 0){
                $(marketHeaders).append("<li>Address: " + market.marketdetails.Address + "</li>");
              }
              if(market.marketdetails.Products.length !== 0){
                $(marketHeaders).append("<li>Products: " + market.marketdetails.Products + "</li>");
              }
              if(market.marketdetails.Schedule.length < 1){
                $(marketHeaders).append("<li>Open: " + market.marketdetails.Schedule + "</li>");
              }
                $(marketHeaders).append('<li><a href="' + market.marketdetails.GoogleLink + '" target="_blank">Open in Google Maps</a></li><br /><br />');
            });
          });
        });
      });
    });
