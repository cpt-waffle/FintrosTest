document.addEventListener("DOMContentLoaded", function(event) {
  let array = []
  let min = 0;
  let max = 30;
  fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(function(result) {
    return result.json();
  }).then(function(storyIds) {
    array = storyIds;
    for (let i = min;  i < max; i++) {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${storyIds[i]}.json`).then(function(result) {
        return result.json();
      }).then(function(story) {
        var node = document.createElement("LI");
        let text =  document.createTextNode(`${story.title}`);
        node.appendChild(text);
        document.getElementById('stories').appendChild(node);
      })
    }
    min = max;
    max += 30;
 })
  document.onscroll = function() {
    if(document.documentElement.scrollTop + window.innerHeight == document.documentElement.scrollHeight)
    {
      for (let i = min;  i < max; i++) {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${array[i]}.json`).then(function(result) {
        return result.json();
        }).then(function(story) {
          var node = document.createElement("LI");
          let text =  document.createTextNode(`${story.title}`);
          node.appendChild(text);
          document.getElementById('stories').appendChild(node);
        })
      }
      min = max;
      max += 30;
    }
  }
});