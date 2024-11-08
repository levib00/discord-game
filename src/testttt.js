const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function() {
      console.log('style changed!');
  });    
});

const target = document.getElementById('html');
observer.observe(target, { attributes : true, attributeFilter : ['style'] });