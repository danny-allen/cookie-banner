# CookieBanner

## Details

This script was based on Creare's 'Implied Consent' EU Cookie Law Banner v:2.4 but was heavily altered and refactored for more options and to use jQuery.

## Installing

Just include the cookie-banner.js file. Or if you are using bower, you can run:

	bower install git@github.com:danny-allen/cookie-banner.git --save

## Usage

	//instantiate cookie
	var cookieBanner = new namespace.CookieBanner({
		//configure options here - see below
		duration: 28,
	});

	//when the close element of the cookie banner is clicked
	cookieBanner.closeElement.on('click', function(e){

		//dont follow the anchor
		e.preventDefault();

		//remove the banner (setting a cookie to remember)
		cookieBanner.removeMe();
	});

## Options

| Option 	    		| Default value    					| Description   														|
| --------------------- |-----------------------------------| ----------------------------------------------------------------------|
| dropColumn    		| true								| False disables the Cookie, allowing you to style the banner			|
| duration      		| 14		    					| Number of days before the cookie expires, and the banner reappears	|
| cookieName    		| 'complianceCookie'      			| Name of our cookie   													|
| cookieValue    		| 'on'		    					| Value of cookie  														|
| parentElement   		| $('body')      					| Selector within which to insert the cookie notice   					|
| prepend    			| true		      					| Prepend to the selector element (if false, append)  					|
| content    			| *(HTML string)   					| Content for the cookie banner   										|
| closeElementSelector  | '.cookie-banner' 					| Close element selector   												|
| closeElementContent   | *(HTML string)   					| Content for the close elemenent   									|
| bannerClass    		| 'cookie-banner'  					| Class to attach to the banner   										|

\* HTML string - not an actual value, but represents the type of value, see the object for actual value.