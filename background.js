const period = 1000 * 60 * 60 * 6;
const alarmName = "checkdeck";
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.onAlarm.addListener(checkDeck);
  var nexttime = 0;
  chrome.storage.sync.set({ nexttime });
  chrome.alarms.create(alarmName, { when: nexttime });
  console.log("Alarm Created");
});
chrome.runtime.onStartup.addListener(() => {
  console.log("alive");
  chrome.alarms.onAlarm.addListener(checkDeck);
  chrome.alarms.get(alarmName, (alarm) => {
    console.log(alarm);
    if (!alarm) {
      chrome.storage.sync.get("nexttime", ({ nexttime }) => {
        chrome.alarms.create(alarmName, { when: nexttime });
      });
    }
  });
});
function checkDeck() {
  chrome.tabs.create({ url: "deck.html" });
  console.log("Deck Checked");
  var nexttime = Date.now() + period;
  chrome.alarms.create(alarmName, { when: nexttime });
  chrome.storage.sync.set({ nexttime });
}
