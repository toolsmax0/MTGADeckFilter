const period = 360;
const alarmName = "checkdeck";
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.onAlarm.addListener(checkDeck);
  chrome.alarms.create(alarmName, { when: 0, periodInMinutes: period });
});
chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.onAlarm.addListener(checkDeck);
  report();
});
function checkDeck() {
  chrome.tabs.create({url:"deck.html"});
  report();
}
function report() {
  chrome.alarms.get(alarmName, (alarm) => {
    var t = new Date(alarm.scheduledTime);
    console.log("Next trigger time: " + t);
  });
}
