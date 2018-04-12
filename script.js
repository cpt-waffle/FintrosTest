document.addEventListener("DOMContentLoaded", function(event) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://hacker-news.firebaseio.com/v0/topstories.json');
  xhr.send('topstories');
  xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      console.log(xhr.status);
      if (xhr.status === 200)   {
        console.log(xhr.responseText); // 'This is the returned text.'
      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    }
  };
});