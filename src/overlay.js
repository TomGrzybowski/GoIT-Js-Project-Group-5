document.querySelector('.products__button').addEventListener('click', function (e) {
  document.querySelector('.products__overlay').classList.toggle('overlayshow');
});

document.querySelector('.products__button--icecoffee').addEventListener('click', function (e) {
  document.querySelector('.products__overlay--icecoffee').classList.toggle('overlayshow');
});
document.querySelector('.products__button--milkshakes').addEventListener('click', function (e) {
  document.querySelector('.products__overlay--milkshakes').classList.toggle('overlayshow');
});
