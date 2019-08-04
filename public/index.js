let search = document.getElementById("search");

search.onclick = () => {
  let input = encodeURIComponent(document.getElementById("input").value);
  query(input);
};

//Search on Enter
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    search.click();
  }
});

let query = input => {
  var xhr = new XMLHttpRequest();
  var url = `/query?=${input}`;
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
      gifs(response);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};

//execute initial call
function iife(f) {}
iife(query("cats"));

//populate DOM
function gifs(arr) {
  arr.forEach((gif, i) => {
    let imgs = document.getElementsByTagName("img");
    imgs[i].src = gif.images.original.url;
  });
}
