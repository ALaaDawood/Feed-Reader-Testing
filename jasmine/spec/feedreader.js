/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has url', function () {
            for (feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name', function () {
            for (feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* a new test suite named "The menu" */
    describe('The menu', function () {
        /* a test that ensures the menu element is
         * hidden by default.
         */
        var menuIcon = $('.menu-icon-link');

        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibilty', function () {
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

       /* loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function
        */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });
        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('has entry element in the feed container', function () {
            expect($('.feed').has('.entry').length).not.toBe(0);
        });
    });
        

    /*  a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        var currentFeed;
        beforeEach(function (done) {
            loadFeed(0, function () {
                currentFeed = $('.feed').html();
                loadFeed(1, function () {
                    done();
                });
            });
        });
        /*a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
        it('should change content', function () {
            expect($('.feed').html()).not.toBe(currentFeed);
        });
    });
    
}());
