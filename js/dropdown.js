/*
	By setting 'use strict' we ensure that we are building clean code and not breaking any rules. Helps with future-friendliness of our code.
*/
'use strict';


/*
	Before we start on this tutorial, it is worth noting that within JavaScript we have a whole set of predefined objects, methods (functions that we run on objects), and properties that we can make use of. In this tutorial we will introduce you to some of the most common and useful ones for getting started on integrating JavaScript into your pages.

	Our first example is the 'console' object, which refers to our developer tool's console. In the example below, we can use the 'log' method to send messages to our developer's console. Note the structure of the object/method declaration:

	object.method(arguments);

	In the case of console.log(...), it looks like:

	console.log('String to send to the console.');
*/
console.log('JavaScript is running.');


/*
	Any comments that contain the word 'ACCESSIBILITY' indicates an accessibility-specific consideration of our script.
*/


/*
	Below we are selecting elements from our DOM (Document Object Model). By casting these elements into variables we can then find out information about them, or set their values much more easily than having to repeatedly select them.

	Note that we are again using variables to capture these HTML objects, but in this case we are calling on the 'document' (DOM) object and using the 'querySelector' method to find them. The 'querySelector' method returns the first HTML object in the DOM that it finds with the given CSS-style selector. Note the structure:

	var nameOfVariable = object.method(argument);
	var menu = document.querySelector('#menu');

	This finds us the first element with the ID of 'menu', and then casts it into a variable for later access.
*/
var menu = document.querySelector('#menu');


/*
	The statement below is very similar to what we have seen earlier, it is just unpacking an object a bit more:

	menu - our menu variable we just captured from our DOM just above.
	classList - a property that contains all the classes applied to an element.
	add(...) - a method that adds the class specified (by name) as it's argument.

	So in this case our statement of menu.classList.add('hidden') is saying: (a) select #menu, (b) select its classes, and (c) add the class of 'hidden'.
*/
menu.classList.add('hidden');


/*
	Using the setAttribute(...) method we can change the attributes assigned to a specific element. setAttribute(...) expects two arguments, one defining the attribute we want to set, and the second the value we want to set it to. In the example below, we are adding the following attributes to our menu for ACCESSIBILITY purposes:

	- 'aria-hidden'; to indicate that our menu is hidden from readers by default
	- 'aria-labelledby'; to indicate the element that is a label for our menu
*/
menu.setAttribute('aria-hidden', 'true');
menu.setAttribute('aria-labelledby', 'menu-toggle');


/*
	For later use (explained later on in this document) we also want to make sure to capture the very first <a> element that appears in the menu, as well as the header element that wraps the <nav id="#menu"> element. The reasons for this are explained a bit later on.
*/
var menuFirstItem = document.querySelector('#menu a:first-of-type');
var header = document.querySelector('header');


/*
	Because our drop-down will only work if JavaScript is enabled, we are going to use the createlement(...) method to create a <button> element with which we can toggle our dropdown open and closed.
*/
var menuToggle = document.createElement('button');


/*
	Much like we did to hide our menu, we can add a class to our new button element which will allow it use all the same styling applied to our existing navigation buttons.
*/
menuToggle.classList.add('button');


/*
	To help associate our menuToggle with other elements for ACCESSIBILITY, purposes, we use the setAttribute(...) method to add an ID to our menuToggle.
*/
menuToggle.setAttribute('id', 'menu-toggle');

/*
	Unlike our use of methods, which requires an argument - i.e. querySelector(argument) - below we are setting a property of the menuToggle object. In this case, the innerHTML property is the HTML that appears within the <button> element we have created. We will use this to apply text to the interior of our button.
*/
menuToggle.innerHTML = '☰';


/*
	We are again using the setAttribute(...) method to add the following attributes to our menuToggle to help ACCESSIBILITY:

	- 'aria-label' which defines a label for our dropdown's functionality for screen-readers
	- 'aria-controls' which defines what our button controls, using an ID to link to another element in the DOM
	- 'aria-expanded' which indicates if the element it controls has been expanded or not
*/
menuToggle.setAttribute('aria-label', 'Menu');
menuToggle.setAttribute('aria-controls', 'menu'); // Note this connects to an ID
menuToggle.setAttribute('aria-expanded', 'false');


/*
	The insertBefore(...) method allows us to inject an element into the page before a specific child. In this case the arguments it expects are as follows:

	parent.insertBefore(elementToInsert, childToInsertBefore);

	So in the example before, what we are specifying is that within the <header> element, we want to inject our new menuToggle (<button> element) before the menu (<nav id="menu"> element) appears.
*/
header.insertBefore(menuToggle, menu);

/*
	In JavaScript we can tie 'event listeners' - different kind of in-browser events like clicks, scrolls, resizes, and more - to our objects to have them act when a user interacts with the page. In the case below we are adding a listener to our menuToggle (<button> element) which listens to when the user has clicked on the element.
*/
menuToggle.addEventListener('click',
	function() {


		/*
			To make sure that our button works when clicked on, it is a good idea to make use of the console.
		*/
		console.log('menuToggle has been clicked.');


		/*
			Because we do not know for sure if the navigation items are showing (or not) when a user clicks on the button, we should test and act on both conditions. The if/else statement below checks if our menu has a class of 'hidden' using the 'classList.contains(...)' method and acts accordingly.
		*/
		if ( menu.classList.contains('hidden') ) {
			console.log('Menu is hidden, showing the menu.');


			/*
				We want to remove the 'hidden' class to ensure that the navigation items become visible.
			*/
			menu.classList.remove('hidden');


			/*
				Now that we have shown the menu visually, we also should make sure that screen readers understand that the menu is visible for ACCESSIBILITY purposes:

				- 'aria-hidden'; allows us to now make the element visible to screen readers
				- 'aria-expanded'; allows us to indicate that the dropdown has now been expanded
			*/
			menu.setAttribute('aria-hidden', 'false');
			menu.setAttribute('aria-expanded', 'true');


			/*
				To assist ACCESSIBILITY devices interpret the menu correctly, refocusing keyboard navigation on the first menu item (once expanded) is worthwhile. This is where selecting our first navigation item in a variable and using the 'focus(...)' method on it allows us to do so.
			*/
			// menuFirstItem.focus();
		}



		/*
			(Else) if the navigation items are already showing...
		*/
		else {
			console.log('Menu is shown, hiding the menu.');


			/*
				We want to remove add 'hidden' class to ensure that the navigation items are hidden.
			*/
			menu.classList.add('hidden');


			/*
				Now that we have hidden the menu visually, we also should make sure that screen readers understand that the menu is hidden for ACCESSIBILITY purposes:

				- 'aria-hidden'; allows us to now hide the element to screen readers
				- 'aria-expanded'; allows us to indicate that the dropdown has been collapsed
			*/
			menu.setAttribute('aria-hidden', 'true');
			menu.setAttribute('aria-expanded', 'false');
		}

	}
);
