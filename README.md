# CookieBanner

## Details

This script was based on Creare's 'Implied Consent' EU Cookie Law Banner v:2.4 but was heavily altered and refactored for more options and to use jQuery.


## Usage

``` //instantiate cookie
	var cookieBanner = new namespace.CookieBanner({
		//change settings here
		duration: 28,
	});

	//when the close element of the cookie banner is clicked
	cookieBanner.closeElement.on('click', function(e){

		//dont follow the anchor
		e.preventDefault();

		//remove the banner (setting a cookie to remember)
		cookieBanner.removeMe();
	});
```