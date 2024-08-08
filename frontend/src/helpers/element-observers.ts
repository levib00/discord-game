// TODO: Make actually do something.
export const makeObserver = (target: HTMLElement) => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      console.log('style changed!');
    });
  });

  observer.observe(target, { attributes: true, attributeFilter: ['style'] });
};

export const headObserver = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      for (let i = 0; i < mutation.addedNodes.length; i += 1) console.log(mutation.addedNodes[i]);
    });
  });

  observer.observe(document.getElementById('head')!, {
    childList: true,
  });
};
