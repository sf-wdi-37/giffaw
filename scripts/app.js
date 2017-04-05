var giphy_api = "http://api.giphy.com/v1/gifs/search";

$(document).on("ready", function(){
  // gets gifs on page load
  getAndRenderGifs();

  $("form").on("submit", function(e) {
    e.preventDefault();

    getAndRenderGifs();
  });
});

function getAndRenderGifs() {
  $.ajax({
    method: "GET",
    url: giphy_api,
    data: $("form").serialize(),
    success: onSuccess,
    error: onError
  });
}

function onSuccess(json) {
  $(".gif-img").remove();
  json.data.forEach(function(v,i){
    $(".gif-gallery").append($("<img class='img-responsive img-thumbnail gif-img' src="+v.images.fixed_height.url+">"));
  });
}

function onError(xhr, status, errorThrown) {
  alert("Sorry, there was a problem!");
  console.log("Error: " + errorThrown);
  console.log("Status: " + status);
  console.dir(xhr);
}
