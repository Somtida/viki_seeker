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
  			let id = $("#auto").getSelectedItemData().id;
  			let t = $("#auto").getSelectedItemData().t;
  			let i = $("#auto").getSelectedItemData().i;
  			let oc = $("#auto").getSelectedItemData().oc;
  			let te = $("#auto").getSelectedItemData().te;
  			let tj = $("#auto").getSelectedItemData().tj;
  			let tt = $("#auto").getSelectedItemData().tt;
  			let tf = $("#auto").getSelectedItemData().tf;
  			let owner = $("#auto").getSelectedItemData().owner;
        let ua = $("#auto").getSelectedItemData().u;

        let $div = $('.movieLists').clone();
        $div.removeClass('movieLists');
        $div.addClass('.divblock');
        $div.find('.movieTitle').text(tt);
        $div.find('.title').text(tt);
        $div.find('.owner').text(owner);
        $div.find('.id').text(id);
        $div.find('.oc').text(oc);
        $div.find('.type').text(t);
        $div.find('.tj').text(tj);
        $div.find('.tf').text(tf);
        $div.find('.te').text(te);
        $div.find('.poster').attr('src',i);
        $div.data('ua',ua);

  			$("#selectedOutput").empty().append($div);
        $('#info').empty();
  		}
  	},
    requestDelay: 100,
};
    $('#auto').easyAutocomplete(options);

}



function showMovieInfo(){
  // debugger;
  var ua = $(this).data('ua');
  var a = ua.a;

  $.ajax(`https://api.viki.io${a}?c=b&per_page=5&with_people=true&with_paywall=1&app=100266a&t=1440586215`)
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
