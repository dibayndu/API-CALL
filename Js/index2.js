const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data));
}
const displaySearchResult = doc => {
    const dataArray = doc.docs;
    console.log(doc);
    const countResult = document.getElementById("result-count");
    document.getElementById("result-count").innerText = '';
    countResult.classList.add('text-center');
    countResult.innerText = `Showing ${dataArray.length} from ${doc.numFound} books.`;
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const div = document.getElementById('found-nothing');
    div.textContent = '';
    if (dataArray.length === 0) {

        const h1 = document.createElement('h1');
        h1.classList.add('no-result');
        h1.innerText = 'No Result Found';
        div.appendChild(h1);
    }
    else {
        dataArray.forEach(doc => {
            console.log(doc);
            const div = document.createElement('div');
            div.classList.add('col');
            const imgUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
            div.innerHTML = `
            <div class="card h-100">
                        <img src="${imgUrl}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${doc.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Author: ${doc.author_name}</h6>
                            <h6 class="card-subtitle mb-2 text-muted">Publisher: ${doc.publisher}</h6>
                            <h6 class="card-subtitle mb-2 text-muted">First Publish: ${doc.first_publish_year}</h6>
                        </div>
                    </div>
            `;
            searchResult.appendChild(div);

        })
    }

}


