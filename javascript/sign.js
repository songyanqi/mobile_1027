/**
 * Created by xuzelian on 16/5/31.
 */
$(function () {
  //签到提示语
  bravetime.info(signRemind);
  //签到说明
  var mask = $(".mask");
  mask.find(".close").click(function () {
    mask.addClass("hide");
  });
  $(".top_info").click(function () {
    mask.removeClass("hide");
  });
  $(".table").click(function () {
    mask.removeClass("hide");
  });
})
