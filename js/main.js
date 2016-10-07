'use strict'

$(document).ready(init);

function init(){
  $('.title').keyup(callViki)
  $('#selectedOutput').on('click','.movieListStyle',showMovieInfo);
}
var page = 1;

function callViki(){
  var title = $('.title').val();
  var time = new Date().getTime();
  var results = [];
  $('.errorType').hide().text("");
  var url = `https://api.viki.io/v4/search.json?c=${title}&per_page=5&with_people=true&app=100266a&t=${time}`;

  var options = {
    url: function(title, time) {
      return `https://api.viki.io/v4/search.json?c=${title}&per_page=5&with_people=true&app=100266a&t=${time}`;

    },

    getValue: "tt",

    ajaxSettings: {
        dataType: "json"
    },

    list: {
      onSelectItemEvent: function() {
  			let movieResult = $("#auto").getSelectedItemData();
        // console.log(movieResult);

        let $div = $('.movieLists').clone();
        $div.removeClass('movieLists');
        $div.addClass('.divblock');
        $div.find('.movieTitle').text(movieResult.tt);
        $div.find('.title').text(movieResult.tt);
        $div.find('.owner').text(movieResult.owner);
        $div.find('.id').text(movieResult.id);
        $div.find('.oc').text(movieResult.oc);
        $div.find('.type').text(movieResult.t);
        $div.find('.tj').text(movieResult.tj);
        $div.find('.tf').text(movieResult.tf);
        $div.find('.te').text(movieResult.te);
        $div.find('.poster').attr('src',movieResult.i);
        $div.data('ua', movieResult.u);

  			$("#selectedOutput").empty().append($div);
        $('#info').empty();
        $('#showup').addClass('output');
  		},
      onHideListEvent: function() {
        $('#showup').removeClass('output');
    	}
    },
    requestDelay: 100,
};
    $('#auto').easyAutocomplete(options);
}

function showMovieInfo(){

  var ua = $(this).data('ua');
  var a = ua.a;
  var time = new Date().getTime();

  $.ajax(`https://api.viki.io${a}?c=b&per_page=5&with_people=true&with_paywall=1&app=100266a&t=${time}`)
  .done(function(data){
      var $divInfo = $('.titleInfo').clone();
      $divInfo.removeClass('titleInfo');
      $divInfo.find('.infodesc').text(data.descriptions.en);
      $divInfo.find('.infoWatch').attr('href', data.watch_now.url.web);

      $('#info').empty().append($divInfo);


  })
  .fail(function(){
    console.log("Error!");
  });


}
