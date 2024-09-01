const accessKey= "YcZ41vkKS0jOenSlxguc8RUFB3dvn5KYGJwEGOblUs4"

const formEl = document.querySelector("form")

const searchInputEl=document.getElementById("search-input")

const searchResultEl=document.querySelector(".search-results")

const showmoreEl=document.getElementById("showmore")

let inputData ="";
let page = 1;

async function searchImages(){
   inputData=searchInputEl.value;
   const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
   console.log(url)
   const response = await fetch(url);
   const data = await response.json();
   if(page === 1) {
      searchResultEl.innerHTML = "";
   }
   const results= data.results;
   results.map((result) => {
      const imageWrapper = document.createElement("div")
      imageWrapper.classList.add("search-result");
      const image = document.createElement("img")
      image.src = result.urls.small
      image.alt=result.alt_description

      const imageLink = document.createElement("a")
      imageLink.href = result.links.html
      imageLink.target ="_blank"
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResultEl.appendChild(imageWrapper);

   })
   page++;
   console.log(page)
   
   if(page > 1){
      showmoreEl.style.display="block";
   }
  
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page=1;
    searchImages();
});

showmoreEl.addEventListener("click", () => {
   searchImages();
});