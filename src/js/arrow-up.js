


const arrowButton = document.querySelector(".arrow__button");

function topFunction() {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    document.documentElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

arrowButton.addEventListener("click", topFunction);
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      arrowButton.style.display = "block";
      arrowButton.classList.remove('fade-out')
      arrowButton.classList.add('animated')
    } else {
      arrowButton.classList.remove('animated')
      arrowButton.classList.add('fade-out')
    
    }
  };