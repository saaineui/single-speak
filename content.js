walk(document.head);
walk(document.body);

function walk(node) 
{
	// I adapted this function from https://github.com/panicsteve/cloud-to-butt/ and http://is.gd/mwZp7E
	
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

function handleText(v) 
{
	var thesaurus = [
		{
			cut: /\balt(\-|\s)right\b/g,
			paste: "white supremacist right"
		},
		{
			cut: /\bAlt(\-|\s)Right\b/g,
			paste: "White Supremacist Right"
		},
		{
			cut: /\bAlt(\-|\s)right\b/g,
			paste: "White supremacist right"
		},
		{
			cut: /\b(l|L)ocker(\-|\s)room talk\b/g,
			paste: "Hollywood studio parking lot talk"
		},
		{
			cut: /\bLocker(\-|\s)Room Talk\b/g,
			paste: "Hollywood Studio Parking Lot Talk"
		},
		{
			cut: /\bracially(\-|\s)(charged|inflammatory)\b/g,
			paste: "race-baiting"
		},
		{
			cut: /\bRacially(\-|\s)(charged|Charged|inflammatory|Inflammatory)\b/g,
			paste: "Race-baiting"
		},
		{
			cut: /\banti-establishment\b/g,
			paste: "demagogic"
		},
		{
			cut: /\bAnti-(e|E)stablishment\b/g,
			paste: "Demagogic"
		}
	];
	
	for (i=0; i<thesaurus.length; i++) {
		v = v.replace(thesaurus[i].cut, thesaurus[i].paste);
	}
	
	return v;
}