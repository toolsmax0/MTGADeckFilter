var min=1000;
var uid=0;
var prev;
var flag = 0;
chrome.storage.sync.get("urlid", ({ urlid }) => {
  prev = urlid;
  console.log("urlid = ", urlid);
});
$(function () {
  $("body").load(
    "https://aetherhub.com/MTGA-Decks/Standard-BO1 table",
    function () {
      var prefix = "https://aetherhub.com";
      $("a").each(function () {
        var item = $(this).parent().parent();
        var id = uid++;
        var currentHref = $(this).attr("href");
        $(this).attr("href", prefix + currentHref);
        var urlid = $(this).attr("href");
        if (urlid == prev) flag = 1;
        if (flag) {
          item.remove();
          return;
        }
        function memory() {
          item.children().eq(2).text("Loading Completed");
          if ($(this).html().match(/meta/) != null) {
            console.log("id= ", id, " min = ", min);
            if (id < min) {
              min = id;
              chrome.storage.sync.set({ urlid });
              console.log("new urlid: ", urlid);
            }
          }
        }
        item.children().eq(1).load($(this).attr("href") + " h5:first", memory);
      });
    }
  );
});
