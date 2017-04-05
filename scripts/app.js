var giphy_api = "http://api.giphy.com/v1/gifs/search";

// Goal: when we submit form, it adds gifs based on giphy search
// AND adds track names from spotify search

// 1. add a div for tracks in html
  // $('.track-list')
// 2. pull value from form for spotify search - test out in console
  // $('#search-term').val()
// 3. research/investigate - what is the api endpoint for searching tracks
  // https://developer.spotify.com/web-api/search-item/
// 4. write out $.ajax call for tracks - test out in console w/  success function
  // that logs response

  // we might have had to build up the data ourselves
  // var spotifyData = {
  //   type: 'track',
  //   q: $('#search-term').val()
  // }
  // $.ajax({
  //   method: 'GET',
  //   url: 'https://api.spotify.com/v1/search',
  //   dataType: 'json',
  //   data: $('form').serialize(),
  //   // data: spotifyData,
  //   success: onTrackSuccess,
  //   error: onTrackError
  // })

// 5. write the on success function (on success for tracks, find value we want (loop through))
  // get track name from json response ->    json.tracks.items[0].name
  // also, append track name to page
  // for tracks, append to the div we created
  // format track info in html
// 6. in form submit event handler on 14 (around 17),
  // add another function call to get and render song names



$(document).on("ready", function(){
  // gets gifs on page load
  getAndRenderGifs();


  $("form").on("submit", function(e) {
    e.preventDefault();  // stop form from submitting, reloading page
    getAndRenderGifs();
    getAndRenderTrackNames();
  });
});


function getAndRenderTrackNames(){
  $.ajax({
    method: 'GET',
    url: 'https://api.spotify.com/v1/search',
    dataType: 'json',
    data: $('form').serialize(),
    // data: spotifyData,
    success: onTrackSuccess,
    error: onTrackError
  })
}
function onTrackSuccess(json){
  // console.log(json);
  // log just the track name
  var track0 = json.tracks.items[0].name;
  // append to page
  $('.track-list').append(`<li>${track0}</li>`);
  // append all to page
  var allTracks = json.tracks.items;
  for (let track of allTracks){
    $('.track-list').append(templateTrackName(track));
  }
}

function templateTrackName(track){
  return `<li>${track.name}</li>`;
}

function templateTrack(result){
  // construct track HTML to display
  return `<div class="row"><div class="col s4"> \
  <img src="${result.album.images[0].url}"></div> \
  <div class="col s8"><p><strong>${result.name}</strong>`
}

function onTrackError(xhr, status, errMessage){
  console.log('error:', status);
}

function getAndRenderGifs() {
  $.ajax({
    method: "GET",
    url: giphy_api,
    // taking name, value pairs from form
      // and converting to query string
    data: $("form").serialize(),
    success: onSuccess,
    error: onError
  });
}

function onSuccess(json) {
  $(".gif-img").remove();
  // json response has data array inside with individual gifs
  // json.data[0] was a gif
  json.data.forEach(function(element){
    $(".gif-gallery").append($("<img class='img-responsive img-thumbnail gif-img'" +
    'src="'+element.images.fixed_height.url+'">'));
  });
}

function onError(xhr, status, errorThrown) {
  // alert("Sorry, there was a problem!");
  console.log("Error: " + errorThrown);
  console.log("Status: " + status);
  console.dir(xhr);
}
