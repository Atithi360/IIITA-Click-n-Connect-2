var sessionTabIDs = [];

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.setTimer) {   
        timerSetNotification();     
        var chosenTime = message.chosenTime*60*1000;
        if (message.closingTabs == "all") {
            setTimeout(function() {
                closeAllTabsAllWindows();
            }, chosenTime);
            timeUpNotification(chosenTime);
        } else if (message.closingTabs == "allCurrentWindow") {
            setTimeout(function() {
                closeAllTabsCurrentWindow();
            }, chosenTime);
            timeUpNotification(chosenTime);
        } else if (message.closingTabs == "recent") {
            chrome.tabs.onCreated.addListener(function(tab) {
                if (!sessionTabIDs.includes(tab.id)) {
                    sessionTabIDs.push(tab.id);
                }
            });
            setTimeout(function() {
                closeRecentTabs();
            }, chosenTime);
            timeUpNotification(chosenTime);
        } else {
            setTimeout(function() {
                closeCurrentTab();
            }, chosenTime);
            timeUpNotification(chosenTime);
        }
    }
});

var closeRecentTabs = function() {
    chrome.tabs.remove(sessionTabIDs);
    sessionTabIDs = [];
    timerDoneNotification();
}

var closeAllTabsCurrentWindow = function() {
    chrome.tabs.query({currentWindow : true}, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            chrome.tabs.remove(tabs[i].id);
        }
    });
    timerDoneNotification();
}

var closeAllTabsAllWindows = function() {
    chrome.tabs.query({}, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            chrome.tabs.remove(tabs[i].id);
        }
    });
    timerDoneNotification();
}

var closeCurrentTab = function() {
    chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
        chrome.tabs.remove(tabs[0].id);
    });
    timerDoneNotification();
}

var timerSetNotification = function() {
    var opt = {
        type: "basic",
        title: "Your Break starts now!",
        message: "Timer Set!!",
        iconUrl: "../logos/timer.ico",
        eventTime : Date.now() + 5000
    }

    chrome.notifications.create(opt);
}

var timeUpNotification = function(chosenTime) {
    var opt = {
        type: "basic",
        title: "Time Up!",
        message: "Break is ending in 15 seconds",
        iconUrl: "../logos/timer.ico",
        eventTime : Date.now() + 5000
    }
    if (chosenTime >= 15000) {
        setTimeout(function() {
            chrome.notifications.create(opt);
        }, chosenTime - 15000)
    }
}

var timerDoneNotification = function() {
    var opt = {
        type: "basic",
        title: "Break Over!",
        message: "Your Break period ended",
        iconUrl: "../logos/timer.ico",
        eventTime : Date.now() + 5000
    }
    chrome.notifications.create(opt);
}