let search = document.getElementById("search");

search.onclick = () => {
  let input = encodeURIComponent(document.getElementById("input").value);
  query(input);
};

let query = input => {
  var xhr = new XMLHttpRequest();
  var url = `/query?=${input}`;
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};
