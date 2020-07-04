
const hideHintSentenceIfExists = () => {
  const testNames = {
    translatePrompt: '[data-test=\'challenge-translate-prompt\']',
    hintSentence: '[data-test=\'hint-sentence\']',
  }
  const hasTranslateTest = document.querySelector(testNames.translatePrompt) !== null;
  
  
  if (hasTranslateTest) {
    const hintSentence = document.querySelector(testNames.hintSentence);
    hintSentence.style.display = 'none';
  } 
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === "clicked_browser_action" ) {
      console.log('hello');
      hideHintSentenceIfExists();
    }
  }
);