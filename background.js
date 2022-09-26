const period = 360;
const alarmName = "checkdeck";

chrome.runtime.onInstalled.addListener(checkDeck);

chrome.alarms.onAlarm.addListener(checkDeck);

chrome.runtime.onStartup.addListener(report);

function checkDeck() {
  chrome.tabs.create({ url: "deck.html" });
  chrome.alarms.create(alarmName, { delayInMinutes: period });
  report();
}

function report() {
  chrome.alarms.get(alarmName, (alarm) => {
    var t = new Date(alarm.scheduledTime);
    console.log("Next trigger time: " + t);
  });
}
