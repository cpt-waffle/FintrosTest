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
        var linkNode = document.createElement("A");
        linkNode.setAttribute("href", story.url)
        var node = document.createElement("LI");
        let text =  document.createTextNode(`${story.title}`);

        let then = new Date(story.time*1000);
        let now = new Date();
        let hours = Math.floor((now - then) / 1000 / 60 / 60);
        var bottomData =  document.createTextNode(`${story.score} points by ${story.by} ${hours} hours ago`);
        let bottomDataNode = document.createElement('P');
        bottomDataNode.className = "stats-info";

        bottomDataNode.appendChild(bottomData);

        node.appendChild(text);
        linkNode.appendChild(text);
        node.appendChild(linkNode);
        node.appendChild(bottomDataNode);
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
          var linkNode = document.createElement("A");
          linkNode.setAttribute("href", story.url);

          var node = document.createElement("LI");
          let text =  document.createTextNode(`${story.title}`);

          var bottomData =  document.createTextNode(`${story.score} points by ${story.by} ${ new Date(story.time).toDateString()} hours ago`);
          let bottomDataNode = document.createElement('P');
          bottomDataNode.className = "stats-info";

          bottomDataNode.appendChild(bottomData);

          node.appendChild(text);
          linkNode.appendChild(text);
          node.appendChild(linkNode);
          node.appendChild(bottomDataNode);
          document.getElementById('stories').appendChild(node);
        })
      }
      min = max;
      max += 30;
    }
  }
});