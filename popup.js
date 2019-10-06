/*
 * Single Speak
 * Chrome browser extension
 * Author: Stephanie Sun
 * popup.js - Popup UI
 */

/* 
 * Tabs functionality
 */
const tabs = document.querySelectorAll('.js-tab');

const switchToTab = (e) => {
  
}
      

/* 
 * Add a phrase pair form functionality
 */

const phrasePairForm = document.querySelector('.js-phrase-pair-form'),
      phrasePairCutField = document.querySelector('.js-cut-field'),
      phrasePairPasteField = document.querySelector('.js-paste-field'),
      flashDiv = document.querySelector('.js-flash'),
      enableSingleSpeakButton = document.querySelector('.js-enable-button');

const addPhrasePair = (e) => {
  if ( !isValidForm() ) return;
  
  chrome.storage.local.get(['phrasePairs'], (result) => {
    let phrasePairs = result.phrasePairs ?
        JSON.parse(result.phrasePairs) :
        {}
        newPhrasePair = {
          cut: trimPhrase(phrasePairCutField.value),
          paste: trimPhrase(phrasePairPasteField.value)
        };
    
    if (phrasePairs[newPhrasePair.cut]) {
      alert(`Your request could not be completed because a replacement for "${newPhrasePair.cut}" already exists.`);
      return;
    }
    
    phrasePairs[newPhrasePair.cut] = newPhrasePair.paste;
    
    chrome.storage.local.set(
      {
        phrasePairs: JSON.stringify(phrasePairs)
      }, 
      () => {
        alert(`"${newPhrasePair.cut}"/"${newPhrasePair.paste}" was added to your list.`);
      }
    );
  });
}

const isValidForm = () => {
  return isValidPhrase(phrasePairCutField.value) &&
         isValidPhrase(phrasePairPasteField.value);
}

const isValidPhrase = (phrase) => {
  return trimPhrase(phrase).length;
}

const trimPhrase = (phrase) => {
  return phrase.replace(/^\s+|\s+$/g, '');
}

phrasePairForm.addEventListener('submit', addPhrasePair);
