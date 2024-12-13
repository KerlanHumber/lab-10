const resultDiv = document.getElementById('result');
const fetchButton = document.getElementById('fetch-button');
const xhrButton = document.getElementById('xhr-button');
const dataForm = document.getElementById('data-form');
const updateForm = document.getElementById('update-form');

fetchButton.addEventListener('click', handleFetchRequest);
xhrButton.addEventListener('click', handleXhrRequest);
dataForm.addEventListener('submit', handlePostRequest);
updateForm.addEventListener('submit', handlePutRequest);

function handleFetchRequest() {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      resultDiv.innerHTML = `
        <h2>Fetched Data (fetch())</h2>
        <p>Title: ${data.title}</p>
        <p>Body: ${data.body}</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    });
}

function handleXhrRequest() {
  const url = 'https://jsonplaceholder.typicode.com/posts/2';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      resultDiv.innerHTML = `
        <h2>Fetched Data (XHR)</h2>
        <p>Title: ${data.title}</p>
        <p>Body: ${data.body}</p>
      `;
    } else {
      resultDiv.innerHTML = `<p class="error">Error: ${xhr.statusText}</p>`;
    }
  };

  xhr.onerror = function () {
    resultDiv.innerHTML = '<p class="error">Network Error</p>';
  };

  xhr.send();
}

function handlePostRequest(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const url = 'https://jsonplaceholder.typicode.com/posts';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    resultDiv.innerHTML = `<p>Post created successfully. ID: ${data.id}</p>`;
  })
  .catch(error => {
    resultDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  });
}

function handlePutRequest(event) {
  event.preventDefault();
  const id = document.getElementById('update-id').value;
  const title = document.getElementById('update-title').value;
  const body = document.getElementById('update-body').value;
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;

  const xhr = new XMLHttpRequest();
  xhr.open('PUT', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status === 200) {
      resultDiv.innerHTML = `<p>Post updated successfully.</p>`;
    } else {
      resultDiv.innerHTML = `<p class="error">Error: ${xhr.statusText}</p>`;
    }
  };

  xhr.onerror = function () {
    resultDiv.innerHTML = '<p class="error">Network Error</p>';
  };

  xhr.send(JSON.stringify({ title, body }));
}