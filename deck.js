$(function () {
  $("body").load(
    "https://aetherhub.com/MTGA-Decks/Standard-BO1 table",
    function () {
      var prefix = "https://aetherhub.com";
      $("a").each(function () {
        var currentHref = $(this).attr("href");
        $(this).attr("href", prefix + currentHref);
        item = $(this).parent().parent();
        if(item.children().eq(4).text().match(/day/) != null){
            item.remove();
            return;
        }
        item.children().eq(1).load($(this).attr("href") + " h5:first");
      });
    }
  );
});
