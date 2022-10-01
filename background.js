const period = 360;
const alarmName = "checkdeck";

chrome.alarms.onAlarm.addListener(checkDeck);

chrome.runtime.onStartup.addListener(report);

chrome.action.onClicked.addListener(checkDeck);

function checkDeck() {
  chrome.tabs.create({ url: "deck.html" });
  chrome.alarms.create(alarmName, { delayInMinutes: period });
  report();
}

function report() {
  chrome.alarms.get(alarmName, (alarm) => {
    var t = new Date(alarm.scheduledTime);
    chrome.action.setTitle({title:"Next trigger time: " + t});
  });
}

function getMemory(){
  chrome.storage.sync.get("urlid", ({ urlid }) => {
    console.log("urlid = ",urlid);
  });
}

function delMemory(){
  var urlid = "";
  chrome.storage.sync.set({ urlid });
  getMemory();
}