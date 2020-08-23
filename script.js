const imageContainer = document.getElementById('image-container');
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5; //To mload only 5 images first time
const apiKey = 'i2iGUdbFLEdYfZn7HZd2YnfgE1d_T3qOrRSXU7WU1bY';
const apiUrl =` https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//Check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30; // Change the number of images loaded to 30 after scroll
    }
}

// Helper function to set attribute to the DOM
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for Links, Photos and add that to the DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for every item in the array of photos
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            'href': photo.links.html,
            'target': '_blank'
        })
        // Create image for photo
        const img = document.createElement('img');
        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description
        })

        //Event listener , Check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put the image inside the <a> tag and then put both of the elements inside the image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        //Catch error here
    }
}

//Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On load
getPhotos()