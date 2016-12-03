walk(document.body);

function walk(node) 
{
	// I stole this function from https://github.com/panicsteve/cloud-to-butt/ which stole it from:
	// http://is.gd/mwZp7E
	
	var child, next;
	
	if (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea'
	    || node.classList.indexOf('ace_editor') > -1) {
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
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
	var v = textNode.nodeValue;

	v = v.replace(/\balt-right\b/g, "white supremacist right");
	v = v.replace(/\bAlt-right\b/g, "White supremacist right");
	v = v.replace(/\bAlt-Right\b/g, "White Supremacist Right");
	v = v.replace(/\balt right\b/g, "white supremacist right");
	v = v.replace(/\bAlt right\b/g, "White supremacist right");
	v = v.replace(/\bAlt Right\b/g, "White Supremacist Right");
	
	textNode.nodeValue = v;
}
