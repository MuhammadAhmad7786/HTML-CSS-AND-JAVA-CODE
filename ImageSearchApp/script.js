const accessKey = `G1oVXaGY5GgJjnSiy1uJRVYPCAGaK3lSb7LcohzfCug`;

const searchForm = document.querySelector(`form`);

const searchInput = document.querySelector('.search-input');

const imagesContainer = document.querySelector('.images-container');

const loadMoreBtn = document.querySelector('.loadMoreBtn');

let page = 1;

// Function to fetch images using unsplash API
const fetchImages = async (query, pageNo) => {
    try {

        if (pageNo === 1) {

            imagesContainer.innerHTML = '';
        }
        const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

        const response = await fetch(url);
        const data = await response.json();

        // console.log(data);
        if (data.results.length > 0) {



            data.results.forEach(photo => {
                //Creating imageDiv
                const imageElement = document.createElement('div');
                imageElement.classList.add('imageDiv')
                imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

                // Creating overlay

                const overlayElement = document.createElement('div');
                overlayElement.classList.add('overlay');

                //Creating overlay text

                const overlayText = document.createElement('h3');
                overlayText.innerText = `${photo.alt_description}`;

                overlayText.innerText = photo.alt_description || photo.description || 'No description available';


                overlayElement.appendChild(overlayText);
                imageElement.appendChild(overlayElement);


                imagesContainer.appendChild(imageElement);
            });

            if (data.total_pages === pageNo) {
                loadMoreBtn.style.display = "none";
            }
            else {
                loadMoreBtn.style.display = "block";
            }
        }
        else {
            imagesContainer.innerHTML = `<h2>No Image found.</h2>`;
            if(loadMoreBtn.style.display === "block")
                loadMoreBtn.style.display = "none";
            
        }

    } catch (error) {
        imagesContainer.innerHTML = `<h2>Failed to fetch images. Please try again later.</h2>`;

    }
}

// Adding Event Listener to search form 
searchForm.addEventListener(`submit`, (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText !== '') {
        page = 1;
        fetchImages(inputText, page);
    }
    else {
        imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`;
        if(loadMoreBtn.style.display === "block")
            loadMoreBtn.style.display = "none";
        
    }


});

// Adding Event Listener to load more button to fetch more images

loadMoreBtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page);
});