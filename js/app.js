//select elements

const loading = document.querySelector('.loading');
const output = document.querySelector('.output');
const feedback = document.querySelector('.feedback');
const searchForm = document.getElementById('searchForm');
const search = document.getElementById('search');

const basic = 'https://en.wikipedia.org/w/api.php';
const url = '?action=query&format=json&origin=*&list=search&srsearch=';


searchForm.addEventListener('submit', function (e) {
    const value = search.value;
    e.preventDefault();
    if (value === '') {
        showFeedback('please enter a valid search value');
    } else {
        search.value = '';
        //ajax
        ajaxWiki(value);

    }
})


//show feedback function
function showFeedback(note) {
    feedback.classList.add('showItem');
    feedback.innerHTML = '<p>' + note + '</p>';
    setTimeout(function () {
        feedback.classList.remove('showItem');
    }, 3000)

}

//ajaxWiki function
function ajaxWiki(searchString) {
    loading.classList.add('showItem');
    output.innerHTML = '';
    const wikiURL = basic + url + searchString;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', wikiURL, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(wikiURL);
            const data = JSON.parse(xhr.responseText);
            displayData(data);
        }
    }
    xhr.onerror = function() { alert('error'); };
    xhr.send();
}

function displayData(data){
    loading.classList.remove('showItem');
    const{search:results} = data.query;
    let info = '';
    results.forEach( result => {
        const pageID = 'https://en.wikipedia.org/?curid=';
        const{title,snippet,pageid:link} = result;
        info += `
            <div class="col-10 mx-auto col-md-6 col-lg-4 my-3">
        <div class="card card-body">
          <h1 class="card-title blueText">${title}</h1>
          <p>${snippet}</p>
          <a href="${pageID}${link}" target="_blank" class="my-2 text-capitalize">read
            more...</a>
        </div>
      </div>
        `;
    })
    output.innerHTML = info;
}