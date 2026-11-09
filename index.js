//index.html load for remove content in root page
//
        //-------------------------------------------------------------
        //Code By Corex Institut (Benjamin Burban) --
        //WebSite - link -> \ https://corexinstitut.netlify.app
        //-------------------------------------------------------------
        //Go home AI Corex Institut
        //WebSite - link -> \ https://corexinstitut.netlify.app/corexai
        //-------------------------------------------------------------
//

//set function (attendreBody)

function rmv() {
    if (document.body) {
        const observer = new MutationObserver(function () {
        });

        //set the observe
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return;
    }
    //Set the loop
    setTimeout(rmv, 10);
}

//call function (attendreBody)
rmv();