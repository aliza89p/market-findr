var zip = $('#zipcode').val();
var zipObject;


$(document).ready(function(){
  $("#submit").click(function(e){
      e.preventDefault();
      $("#markets").html("");
      var zip = $("#zipcode").val();
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
              var marketHeaders = $("#markets").append("<h2>" + marketName.substr(marketName.indexOf(' ')+1) + "</h2>");
              $(marketHeaders).append('<li><strong>Address</strong>: <a href="' + market.marketdetails.GoogleLink + '" target="_blank">' + market.marketdetails.Address + '</a></li>');
              if(market.marketdetails.Products.length !== 0){
                $(marketHeaders).append("<li><strong>Products</strong>: " + market.marketdetails.Products + "</li>");
              }
              if(market.marketdetails.Schedule.includes("to")){
                $(marketHeaders).append("<li><strong>Open</strong>: " + market.marketdetails.Schedule + "</li>");
              }
            });
          });
        });
      });
    });
