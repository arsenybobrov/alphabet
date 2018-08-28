$(document).ready(function () {
  console.log('document ready');
});

$(window).on('resize', _.debounce(function () {
  console.log('window resized');
}, 400));