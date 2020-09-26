// ==UserScript==
// @name         NoMoreAdsDizilla
// @version      1.3.0
// @description  Dizilla'daki reklamları kaldırır
// @author       Ninthy
// @match        https://dizilla.com/*
// @grant        none
// ==/UserScript==

(function() {
    const elementEnum = {CLASS: 1, ID: 2, TAG: 3, SELECTOR: 4}
    const log = (msg) => {console.log(`[NOADSDIZILLA] ${msg}`)};
    const elementNames = {CLASS: ["text-center xs-mb-10", "text-center xs-mb-0", "text-center xs-mt-0 xs-mb-10 lg-mb-0"], ID: ["footerFixedDiv"], TAG: ["a", "section"], SELECTOR: ["body > iframe"]}
    function deleteElement(element, type) {
        switch (type) {
            case elementEnum.CLASS:
                if (document.contains(document.getElementsByClassName(element)[0])) {
                    var el = document.getElementsByClassName(element)[0];
                    el.parentNode.removeChild(el);
                    log(`${type} deleted.`)
                }
                break;
            case elementEnum.ID:
                if (document.contains(document.getElementById(element))) {
                    var el = document.getElementById(element);
                    el.parentNode.removeChild(el);
                    log(`${type} deleted.`)
                }
                break;
            case elementEnum.SELECTOR:
                if (document.contains(document.querySelector(element))) {
                    var el = document.querySelector(element);
                    el.parentNode.removeChild(el);
                    log(`${type} deleted.`)
                }
                break;
            case elementEnum.TAG:
                if (document.contains(document.getElementsByTagName(element)[0])) {
                    var el = document.getElementsByTagName(element)[0];
                    el.parentNode.removeChild(el);
                    log(`${type} deleted.`)
                }
                break;
            default:
                break;
        }

    }

    var logoAdded = false;

    const version = GM_info.script.version;
    const author = GM_info.script.author;
    function allBypass() {
        if (window.location.href == "https://dizilla.com/") {
            deleteElement("section", elementEnum.ID);
        }

        if (!logoAdded) {
            document.getElementsByClassName("logo")[0].innerHTML += `<span style="color: white">NoMoreAds ${version} by ${author}</span>`;
            logoAdded = true;
        }
        for (classEl of elementNames.CLASS) {
            deleteElement(classEl, elementEnum.CLASS);
        }
        for (classEl of elementNames.ID) {
            deleteElement(classEl, elementEnum.ID);
        }
        for (classEl of elementNames.TAG) {
            deleteElement(classEl, elementEnum.TAG);
        }

        for (classEl of elementNames.SELECTOR) {
            deleteElement(classEl, elementEnum.SELECTOR);
        }
        closeFooterFixedAd()
        setTimeout(() => {disableAds = true; let adSkip = document.getElementById("preRollBd"); adSkip.parentNode.removeChild(adSkip); deleteElement("body > iframe", elementEnum.SELECTOR)}, 500);
    }

    allBypass();


})();
