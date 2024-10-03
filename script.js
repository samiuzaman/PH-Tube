// show Categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const displayCategories = (data) => {
  const categoriesContainer = document.getElementById("categories-container");
  data.forEach((item) => {
    const button = document.createElement("button");
    button.classList = "btn hover:bg-[#FF1F3D] hover:text-white";
    button.innerText = item.category;
    categoriesContainer.appendChild(button);
  });
};

loadCategories();
