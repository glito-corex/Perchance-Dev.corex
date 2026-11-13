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
        const wrappcorexappdevperchance = document.querySelector('.content-wrapper');

        if (wrappcorexappdevperchance) {
            wrappcorexappdevperchance.style.position = 'absolute';
            wrappcorexappdevperchance.style.top = '0%';
            wrappcorexappdevperchance.style.left = '50%';
            wrappcorexappdevperchance.style.transform = 'translate(-50%, 50%)';
            wrappcorexappdevperchance.style.width = '700px', 'important';
        }

        const observer = new MutationObserver(function () {
            const wrappcorexappdevperchance = document.querySelector('.content-wrapper');

            if (wrappcorexappdevperchance) {
                wrappcorexappdevperchance.style.position = 'absolute';
                wrappcorexappdevperchance.style.top = '0%';
                wrappcorexappdevperchance.style.left = '50%';
                wrappcorexappdevperchance.style.transform = 'translate(-50%, 50%)';
                wrappcorexappdevperchance.style.width = '700px';
            }
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