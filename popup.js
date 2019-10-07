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
  document.querySelector('.js-tab[data-tab-status="active"]').dataset.tabStatus = '';
  document.querySelector('.js-tab-content[data-tab-status="active"]').dataset.tabStatus = '';
  
  e.target.dataset.tabStatus = 'active';
  document.querySelector(`.js-tab-content[data-tab="${e.target.dataset.tabTarget}"]`).dataset.tabStatus = 'active';
}

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', switchToTab);
}   

/* 
 * Manage phrase pairs 
 * - populate list
 * - delete buttons functionality
 */
const phrasePairsTable = document.querySelector('.js-phrase-pairs-list-table-body');

chrome.storage.local.get(['phrasePairs'], (result) => {
  let phrasePairs = result.phrasePairs ?
      JSON.parse(result.phrasePairs) :
      {}; 
  
  const deletePhrasePair = (e) => {
    chrome.storage.local.get(['phrasePairs'], (result) => {
      let phrasePairs = result.phrasePairs ?
          JSON.parse(result.phrasePairs) :
          {},
          deletedRow = e.target.parentNode.parentNode; 
      
      delete phrasePairs[e.target.dataset.phraseKey];
      deletedRow.parentNode.removeChild(deletedRow);

      chrome.storage.local.set(
        {
          phrasePairs: JSON.stringify(phrasePairs)
        }, 
        () => {
          alert(`The phrase pair was removed from your list. Please refresh the page to see the changes take effect.`);
        }
      );
    });
  }
  
  const createDeleteButton = (phraseKey) => {
    let deleteButton = document.createElement('span');
    
    deleteButton.dataset.phraseKey = phraseKey;
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click', deletePhrasePair);
    
    return deleteButton;
  }
  
  for (cut in phrasePairs) {
    let row = document.createElement('tr'),
        cutCell = document.createElement('td'),
        pasteCell = document.createElement('td'),
        actionCell = document.createElement('td');
    
    cutCell.textContent = cut;
    pasteCell.textContent = phrasePairs[cut];
    actionCell.appendChild(createDeleteButton(cut));
    
    row.appendChild(cutCell)
    row.appendChild(pasteCell)
    row.appendChild(actionCell);
    
    phrasePairsTable.appendChild(row);
  }
});

/* 
 * Add a phrase pair form functionality
 */

const phrasePairForm = document.querySelector('.js-phrase-pair-form'),
      phrasePairCutField = document.querySelector('.js-cut-field'),
      phrasePairPasteField = document.querySelector('.js-paste-field'),
      flashDiv = document.querySelector('.js-flash');

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
        alert(`"${newPhrasePair.cut}"/"${newPhrasePair.paste}" was added to your list. Please refresh the page to see the changes take effect.`);
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
