walk(document.head);
walk(document.body);

function walk(node) 
{
	// Adapted from https://github.com/panicsteve/cloud-to-butt/ and http://is.gd/mwZp7E
	
	var child, next;
	
	switch ( node.tagName )
	{ 
		case 'input':
			return;
		case 'textarea':
			return;
		case 'title':
			node.textContent = handleText(node.textContent);
			return;
		
	}

	switch ( node.nodeType )  
	{
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

function phraseToRegExp(phrase)
{
  phrase = phrase
             .replace(/\-|\s/g, '(\\-|\\s)')
             .replace(/'|&rsquo;|’/g, "(\\'|&rsquo;|’)");
  
  phrase = `\\b${phrase}\\b`;
  
  return new RegExp(phrase, 'gi');
}

function handleText(nodeValue) 
{
  var phrases = [
    {
      cut: 'alt-right',
      paste: 'White supremacist right'
    },
    {
      cut: 'locker room talk',
      paste: 'Hollywood studio parking lot talk'
    }
  ];

	for (i = 0; i < phrases.length; i++) 
  {
		nodeValue = nodeValue.replace(
      phraseToRegExp(phrases[i].cut), 
      phrases[i].paste
    );
	}
	
	return nodeValue;
}