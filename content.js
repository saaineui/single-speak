/*
 * Single Speak
 * Chrome browser extension
 * Author: Stephanie Sun
 * content.js - DOM traversal script
 */


chrome.storage.local.get(['phrasePairs'], (result) => {
  const walk = (node) => {
    // walk function adapted from https://github.com/panicsteve/cloud-to-butt/

    var child, next;

    switch ( node.tagName ) { 
      case 'input':
        return;
      case 'textarea':
        return;
      case 'title':
        node.textContent = handleText(node.textContent);
        return;
    }

    switch ( node.nodeType ) {
      case 1:  // Element
      case 9:  // Document
      case 11: // Document fragment
        child = node.firstChild;
        while ( child ) 
        {
          next = child.nextSibling;
          walk(child);
          child = next;
        }
        break;

      case 3: // Text node
        node.nodeValue = handleText(node.nodeValue);
        break;
    }
  }

  const phraseToRegExp = (phrase) => {
    phrase = phrase
               .replace(/\-|\s/g, '(\\-|\\s)')
               .replace(/'|&rsquo;|’/g, "(\\'|&rsquo;|’)");

    phrase = `\\b${phrase}\\b`;

    return new RegExp(phrase, 'gi');
  }

  const handleText = (nodeValue) => {
    for (const cut in phrasePairs) 
    {
      nodeValue = nodeValue.replace(
        phraseRegExps[cut], 
        phrasePairs[cut]
      );
    }

    return nodeValue;
  }

  /*
   * parse result
   */
  let phraseRegExps = {},
      phrasePairs = result.phrasePairs ?
                      JSON.parse(result.phrasePairs) :
                      {};

	for (const cut in phrasePairs) {
    phraseRegExps[cut] = phraseToRegExp(cut);
  }
  
  walk(document.head);
  walk(document.body);
});

