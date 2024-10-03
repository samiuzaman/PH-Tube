function getTimeString(time) {
  const hours = parseInt(time / 3600);
  const remainingsecond = parseInt(time % 3600);
  const minute = parseInt(remainingsecond / 60);
  const second = parseInt(remainingsecond % 60);
  return `${hours} hours ${minute} minute ${second} second ago`;
}

// show Categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const loadCategoriesVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((response) => response.json())
    .then((data) => displayVideos(data.category))
    .catch((error) => console.log(error));
};

const displayCategories = (data) => {
  const categoriesContainer = document.getElementById("categories-container");
  data.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button onclick="loadCategoriesVideos(${item.category_id})" class="btn hover:bg-[#FF1F3D] hover:text-white">${item.category}</button>
    `;
    categoriesContainer.appendChild(buttonContainer);
  });
};

loadCategories();

// Show Videos
const showVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  videos.forEach((video) => {
    const div = document.createElement("div");
    div.classList = "card card-compact";
    div.innerHTML = `
    <figure class="h-52 relative">
        <img class="h-full w-full"
        src=${video.thumbnail}
        alt="Shoes" />
        ${
          video.others.posted_date?.length === 0
            ? ""
            : `<span class="absolute right-2 bottom-2 bg-black text-white text-xs rounded p-1">${getTimeString(
                video.others.posted_date
              )}</span>`
        }
        
    </figure>
    <div class=" flex gap-3 py-4">
        <div>
        <img class="w-10 h-10 rounded-full object-cover" src=${
          video.authors[0].profile_picture
        }>
        </div>
        <div>
        <h3 class="text-lg font-bold text-black mb-2">${video.title}</h3>
        <div class="flex gap-2">
        <p>${video.authors[0].profile_name}</p>
        ${
          video.authors[0].verified === true
            ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=2AuMnRFVB9b1&format=png&color=000000"/>`
            : ""
        }
        </div>
        <p class="text-sm font-normal">${video.others.views}</p>
        </div>
    </div>
  </div>
    `;
    videoContainer.append(div);
  });
};
showVideos();
