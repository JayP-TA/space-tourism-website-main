const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
})


let tabFocus= 0;
function changeTabFocus (e) {
    const keydownLeft = 37;
    const keydownRight = 39;

    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);

        if (e.keyCode === keydownRight) {
            tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        } else if (e.keyCode === keydownLeft) {
            tabFocus--;
            if (tabFocus <= -1) {
                tabFocus = tabs.length - 1;
            }
        }
    }

    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");
    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;
    const previousTab = tabContainer.querySelector('[aria-selected="true"]');

    hideContent(mainContainer, '[role="tabpanel"]');
    hideContent(mainContainer, 'picture');
    previousTab.setAttribute("aria-selected", false);
    showContent(mainContainer, [`#${targetPanel}`])
    showContent(mainContainer, [`#${targetImage}`]);
    targetTab.setAttribute("aria-selected", true);
}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => item.hidden = true);
}

function showContent(parent, content) {
     parent.querySelector(content).hidden = false;
}