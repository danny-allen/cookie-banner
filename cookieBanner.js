// This script was based on:
//    Creare's 'Implied Consent' EU Cookie Law Banner v:2.4
//    Conceived by Robert Kent, James Bavington & Tom Foyster
// ... but was refactored for more options and to use jQuery.


//IF YOU NEED TO EDIT THIS...
//In short, dont. Add a pull request to the repo.

var namespace = namespace || {};

(function($, window, document, undefined) {

    'use strict';

    /**
     * CookieBanner
     *
     * Cookie object for showing a Cookie Policy banner.
     * Methods included can create a banner, save a cookie and check for it's existance.
     * 
     * @param object options User defined options to overwrite the default settings.
     */
    namespace.CookieBanner = function(options) {

        //define default settings
        this._s = {
            
            //False disables the Cookie, allowing you to style the banner
            dropCookie: true,
            
            //Number of days before the cookie expires, and the banner reappears
            duration: 14,
            
            //Name of our cookie
            cookieName: 'complianceCookie',
            
            //Value of cookie
            cookieValue: 'on',
            
            //Selector within which to insert the cookie notice
            parentElement: $('body'),
            
             //Prepend to the selector element (if false, append)
            prepend: true,
            
            //Content for the cookie banner
            content: 'Our website uses cookies. By continuing we assume your permission to deploy cookies, as detailed in our <a href="/privacy-policy" target="_blank" rel="nofollow" title="Privacy Policy">privacy policy.</a>',
            
            //close element selector
            closeElementSelector: '.cookie-banner',
            
            //content for the close elemenent
            closeElementContent: ' <a class="cookie-banner__close" href="#">Close <i class="icon--close"></i></a>',
            
            //Class to attach to the banner
            bannerClass: 'cookie-banner',
        };


        //overwrite the settings with user defined options.
        $.extend(this._s, options);

        //initialise
        this.init();
    };


    /**
     * init
     * 
     * Initial functionality and var declarations.
     */
    namespace.CookieBanner.prototype.init = function(){

        //if cookie doesnt exist, or isnt of the same value, then create div
        if(this.checkCookie(this._s.cookieName) !== this._s.cookieValue){
            this.createDiv();
        }

        //set closeElement for public use
        this.closeElement = $(this._s.closeElementSelector);
    };


    /**
     * createDiv
     *
     * Create the banner div and show it.
     */
    namespace.CookieBanner.prototype.createDiv = function(){

        //create the banner
        this._banner = $('<div />').hide();

        this._banner.addClass(this._s.bannerClass);
        this._banner.html(this._s.content + this._s.closeElementContent);

        //insert the banner
        if(this._s.prepend){
            this._s.parentElement.prepend(this._banner);
        }else{
            this._s.parentElement.append(this._banner);
        }

        //show the banner
        this._banner.slideDown('slow');
        
        //add class to body to identify the cookie banner is visible
        this._s.parentElement.addClass('cookiebanner');
    };
     
    
    /**
     * createCookie
     *
     * Create the cookie for the amount of days specified.
     * 
     * @param  string   name  Name to set the cookie as.
     * @param  string   value Value to store in the cookie.
     * @param  int      days  Amount of days untill the cookie expires.
     */
    namespace.CookieBanner.prototype.createCookie = function(name,value,days) {

        //define expires
        var expires;

        //check for days var
        if (days) {

            //create the date
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));

            //set expires to the date
            expires = '; expires='+date.toGMTString();
        } else {

            //no expiry date set
            expires = '';
        }

        //going ahead with creating the cookie
        if( this._s.dropCookie ) {
            document.cookie = name+'='+value+expires+'; path=/';
        }
    };
     

    /**
     * checkCookie
     *
     * Check for the existance of the cookie, returns null if not found.
     * 
     * @param  string name Name of the cookie to check for.
     * @return boolean/string      false if not found.
     */
    namespace.CookieBanner.prototype.checkCookie = function(name) {

        //name equals
        var nameEQ = name + '=';

        //get cookie array
        var ca = document.cookie.split(';');

        //loop through array to find the cookie
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0) === ' '){
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) === 0){
                return c.substring(nameEQ.length,c.length);
            }
        }

        //return null if not found
        return null;
    };


    /**
     * eraseCookie
     *
     * Remove the cookie that tracks the banner status.
     * 
     * @param  string name The name of the cookie to remove.
     */
    namespace.CookieBanner.prototype.eraseCookie = function(name) {

        //remove cookie
        this.createCookie(name,'', -1);
    };


    /**
     * removeMe
     *
     * Hides the banner and creates a cookie to remember to hide it.
     */
    namespace.CookieBanner.prototype.removeMe = function(){

        //create the cookie, so we dont show the banner again
        this.createCookie( this._s.cookieName, this._s.cookieValue, this._s.duration); // Create the cookie
        
        //hide the banner
        this._banner.slideUp('slow');
    };


})(jQuery, window, document);