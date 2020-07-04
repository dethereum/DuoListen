// *What* to Do
const hideHintSentenceIfExists = () => {
  const testNames = {
    translatePrompt: '[data-test=\'challenge-translate-prompt\']',
    hintSentence: '[data-test=\'hint-sentence\']',
  }
  const hasTranslateTest = document.querySelector(testNames.translatePrompt) !== null;
  
  
  if (hasTranslateTest) {
    const hintSentence = document.querySelector(testNames.hintSentence);
    if (
      hintSentence !== null // if exists
      && hintSentence.parentElement.children.length === 2 // and has a sibling (the audio button)
      ) { 
      hintSentence.innerHTML = 'Translate what you hear. No hints! 🙈';
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
  alert('Start your engines! 🏎')
  targetNode = document.querySelector('[data-test="player-next"]');
  if (targetNode === null) {
    setTimeout(attachObserverToNode, 1000);
  } else {
    observer.observe(targetNode, observerOptions);
  }
};

// Poll for change in address
let oldPathname = null;
setInterval(() => {
  const curPathname = window.location.pathname;

  if (oldPathname !== curPathname) {
    oldPathname = window.location.pathname;

    const isSkill = curPathname.indexOf('/skill') !== -1;
    if (isSkill) {
      alert('Learn!');
      attachObserverToNode();
    } else {
      alert('Not Learn!');
    }
  }
}, 500);