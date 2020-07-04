/**
 * * About *
 * This file is kinda messy but this is the basic flow
 * 1. Check to see if we are on the duolingo.com/skill/*
 * 2. See if the DOM has loaded
 * 3. Observe the 'Check' button for any attribute changes. 
 *   - If that button changes, it _might_ indicate that a new challenge has loaded. There might
 *   be a better way to check for this but this works in the meantime.
 * 4. On change, remove hint sentence if exists.
 * 
 * 
 * There is a little bit of polling in here. Someday when I am little less tired, I'll find a
 * better solution. It does not impact performance but it is ugly.
 */



// *What* to Do
const hideHintSentenceIfExists = () => {
  const selectors = {
    translatePrompt: '[data-test=\'challenge-translate-prompt\']',
    hintSentence: '[data-test=\'hint-sentence\']',
  }
  const hasTranslateTest = document.querySelector(selectors.translatePrompt) !== null;
  
  
  if (hasTranslateTest) {
    const hintSentence = document.querySelector(selectors.hintSentence);

    // Check to see if
    // 1) the node exists and
    // 2) it has a sibling. If it does not have a sibbling, it is a translate from "native to foreign
    // prompt", which does not have an audio prompt. We want "a foreign to native prompt", which has
    // an audio prompt
    if (
      hintSentence !== null 
      && hintSentence.parentElement.children.length === 2
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
  targetNode = document.querySelector('[data-test="player-next"]');
  if (targetNode === null) {
    // Button has not loaded, wait 1 second and poll again.
    setTimeout(attachObserverToNode, 1000);
  } else {
    hideHintSentenceIfExists(); // call now, in the event that the first exercise has hint
    observer.observe(targetNode, observerOptions);
  }
  
};

// Poll for change in address
let oldPathname = null;
setInterval(() => {
  const curPathname = window.location.pathname;

  if (oldPathname !== curPathname) {
    oldPathname = window.location.pathname;

    // if new page is exercise page, setup observer
    const isSkill = curPathname.indexOf('/skill') !== -1;
    if (isSkill) attachObserverToNode();
  }
}, 500);