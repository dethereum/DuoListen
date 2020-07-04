chrome.browserAction.onClicked.addListener((tab) => {

  // *Who* to observe for changes (the 'submit' button)
  const targetNode = document.querySelector('[data-test="player-next"]');
  // *When* to fire
  const observerOptions = {
    attributes: true,
  }
  // *What* to Do
  const observerCallback = (mutationList, observer) => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "The button has changed."});
    });
  }

  // Invoking
  const observer = new MutationObserver(observerCallback);
  observer.observe(targetNode, observerOptions);

});

// ____________________________________________________________________-

var elementToObserve = document.querySelector("#root");

// create a new instance of `MutationObserver` named `observer`, 
// passing it a callback function
var observer = new MutationObserver(function() {
    console.log('callback that runs when observer is triggered');
});

// call `observe` on that MutationObserver instance, 
// passing it the element to observe, and the options object
observer.observe(elementToObserve, {subtree: true, childList: true});