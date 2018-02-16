import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//Form event listener
searchForm.addEventListener('submit', e => {
  //Get search Term
  const searchTerm = searchInput.value;
  //Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  //Get Limit
  const searchLimit = document.getElementById('limit').value;

  // Check searchInput
  if(searchTerm === '') {
    showMessage('Please add a search term', 'alert-danger');
  }
  //Clear input
  searchInput.value = '';

  //search Reddit
  reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
      let output = '<div class="card-columns">';
      //loop through post
      results.forEach(post => {
        //check for image
        const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';

        output += `
        <div class="card">
          <img class="card-img-top" src="${image}" alt="Card image cap">
          <div class="card-block">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${truncateText(post.selftext, 100)}</p>
            <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
            <hr>
            <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
            <span class="badge badge-dark">Score: ${post.score}</span>
          </div>
        </div>
        `
      });
      output += '</div>';
      document.getElementById('results').innerHTML = output;
    });

  e.preventDefault();
});

//Show showMessage
function showMessage(message, className) {
  //Create div
  const div = document.createElement('div');
  //add classes
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  // get parent container
  const searchContainer = document.getElementById('search-container');
  // get search
  const search = document.getElementById('search');

  //insert message
  searchContainer.insertBefore(div, search);

  //timeout alert callback
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

//truncate text
function truncateText(text, limit) {
  const shortened = text.indexOf(' ', limit);
  if(shortened == -1) return text;
  return text.substring(0, shortened);
}
