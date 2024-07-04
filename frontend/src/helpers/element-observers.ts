export const makeObserver = (target: HTMLElement) => {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function() {
      console.log('style changed!');
    });    
  });

  observer.observe(target, { attributes : true, attributeFilter : ['style'] });
}

export const headObserver = () => {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      for(let i = 0; i < mutation.addedNodes.length; i++)
        console.log(mutation.addedNodes[i]);
    })
  });
  
  observer.observe(document.getElementById('head')!, {
    childList: true
  });
}