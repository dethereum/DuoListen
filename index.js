alert("We are running!")

// *What* to Do
const hideHintSentenceIfExists = () => {
  const testNames = {
    translatePrompt: '[data-test=\'challenge-translate-prompt\']',
    hintSentence: '[data-test=\'hint-sentence\']',
  }
  const hasTranslateTest = document.querySelector(testNames.translatePrompt) !== null;
  
  
  if (hasTranslateTest) {
    const hintSentence = document.querySelector(testNames.hintSentence);
    if (hintSentence !== null) { 
      hintSentence.innerHTML = 'Translate what you hear. No hints! 🙈)';
    }
  } 
}

  // *Who* to observe for changes (the 'submit' button)
  let targetNode = null;
  // *When* to fire
  const observerOptions = {
    attributes: true,
  }

  // Invoking
  const observer = new MutationObserver(hideHintSentenceIfExists);
  const attachObserverToNode = () => {
    targetNode = document.querySelector('[data-test="player-next"]');
    if (targetNode === null) {
      setTimeout(attachObserverToNode, 1000);
    } else {
      observer.observe(targetNode, observerOptions);
    }
  };
  attachObserverToNode();

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === "The button has changed." ) {
      hideHintSentenceIfExists();
    }
  }
);