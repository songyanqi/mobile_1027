var currentVoice;
var cccc = 0;
var allAudio = $('<audio class="allAudio" preload="auto"></audio>');
$('body').append(allAudio)
var $allAudio = $('.allAudio')
$(function () {
  //课程回顾页面运行
  var live_id =$(".con_list").attr("id");

  window.tlShareCallback = window.sendShareCallback = window.QQShareCallback = window.weiboShareCallback = window.qZoneShareCallbackCancel = function () {
    bravetime.tj.evSend({category:"live",action:"share",label:"share_"+live_id,"value":1});
  };

  if ($(".live_review").length) {
    $.ajax({
      type: "get",
      url: "index.php?m=default&c=live&a=message",
      data: {id:live_id},
      dataType: "json",
      success: function (result) {
        if (result.length>0) {
          $(".prompt").show();
          $(".all_review").after('<div class="live_review_bottom"><img src="' + bottomImgUrl + '"></div>')
          if (msgShowCount == -1) {
            live(result,result.length);
          }
          else {
            if ($(".con_list").find("li").size() < msgShowCount) {
              live(result,msgShowCount);
              $(".all_review").append('<div class="vip_limit_point"><p>*本课程完整版还有 <span class="dav-color-FF4A7D fz14">'+(result.length-msgShowCount)+'</span> 条记录未展示*</p><p>*加入妈妈商学院，听完整版课程*</p></div>')
            }
          }
        }
        else {
          $(".all_review").append('<div class="organize_files"><p>直播回顾正在整理中......</p><p>稍后再来看吧～</p></div>')
        }
      }
    });

  }

  function live(data,showCount) {
    for (var i = 0; i < showCount; i++) {
      var $li = $('<li></li>').attr("msg_id", data[i].id).attr("index", i)
      var type = data[i].objectName;
      if (type == 3){
        $li.attr("audio_url", data[i].content);
      } else {
        $li.attr("audio_url", 'null');
      }

      var headimg = $('<span class="head"></span>');
      var right = $('<div class="right"></div>');
      var name = $('<h2></h2>');
      var main = $('<div class="main"></div>');
      $(".con_list").append($li);
      $li.append(headimg);
      $li.append(right);
      right.append(name);
      right.append(main);
      var text = data[i].content;
      if (data[i].headImage == "") {
        data[i].headImage = "//pic.davdian.com/free/v_head_80_80.png";
      }
      var img = $('<img src="' + data[i].headImage + '">');
      headimg.append(img);
      name.append(data[i].fromUserName);
      if (type == 1) {
        main.html(text.replace(/[^"'](http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g, function(d){return "<span class='text_link_live'><a href='"+d+"'>"+d+"</a></span>";}));
      }
      if (type == 2) {
        main.css("padding","6px");
        if(data[i].content==""){
          $li.remove();
        }
        else {
          var pic = $('<img src="' + data[i].content + '">').attr("value", data[i].imageUri);
          main.append(pic);
          pic.on("click", function () {
            var src = $(this).attr("value");
            var big_img_container =$('<div class="big_img_container"><img src="' + $(this)[0].src + '"><div class="big_img_point">点击图片可返回，请勿点击返回键</div></div>');
            $("body").append(big_img_container);
            big_img_container.on("click",function(){
              $(this).remove()
            });
            singlePicHold(big_img_container.find("img").get(0));
          });
          singlePicHold(pic.get(0));
        }

      }
      if (type == 3) {
        $li.addClass("v_li");
        var voice = $('<audio src="' + data[i].content + '" preload="auto"></audio>');
        var duration = data[i].duration;
        var width = (duration * 2 + 40) > 200 ? 200 : (duration * 2 + 40);
        var item = $('<div class="voice" index="'+i+'" style="width: ' + width + 'px;"><i class="fa fa-rss"></i><p class="min">' + duration + '\'\'</p></div>');
        main.append(item);
        main.append(voice);
        main.find("div.voice").click(function () {
          var v = $(this);
          var vIndex = $(this).attr('index')
          if (!v.hasClass("play")) {
            // playVoice(v);
            newPlayVoice(vIndex)
          }
          else {
            // stopVoice(v);
            newStopVoice(vIndex);
          }
        })


      }
    }

  }
});

/**
 * 播放音频
 * @param v jquery元素 是我想要播放的音频的那个div.voice
 */
function newPlayVoice (index) {
  var i = +index + 1
  if($('ul li').eq(index).attr('audio_url') == 'null'){
    newPlayVoice(i)
    return
  }
  if(window.playIndex){
    $('ul li').eq(window.playIndex).find('.voice').removeClass("play");
  }
  window.playIndex = index
  var url = $('ul li').eq(index).attr('audio_url')
  console.log($('ul li').eq(index), index)
  newStopVoice(index)
  $allAudio[0].src = url
  console.log($allAudio)
  console.log(url)
  $allAudio[0].addEventListener("ended", function () {
    newStopVoice(index)
    newPlayVoice(i)
  });
  $allAudio[0].play();
  $('ul li').eq(index).find('.voice').addClass("play");

}
function playVoice(voiceDiv,flag) {
  if (voiceDiv) {
    if (voiceDiv.length) {
      // 停止正在播放的一条
      if(!flag){
        stopVoice(currentVoice);
      }

      currentVoice = voiceDiv;
      var audioElement = voiceDiv.parent().find("audio");

      // 放音频
      audioElement[0].addEventListener("play",function () {
        voiceDiv.addClass("play");
      });

      // 监听音频结束后自动播放下个音频
      audioElement[0].addEventListener("ended", function () {
        stopVoice(voiceDiv, true);
        if (window.Units && Units.isMobileIOS() && !Units.isWechat() && !Units.isApp()) {

        } else {
          // next 下一个想要播放的音频的那个div.voice
          var next = $(voiceDiv.parents("li").nextAll("li.v_li").find(".voice").get(0));
          playVoice(next, true);
        }
      });

      audioElement[0].play();
    }
  }

}

function newStopVoice (index) {
  $('ul li').eq(index).find('.voice').removeClass("play");
  $allAudio[0].pause();
}

function stopVoice(voiceDiv,flag) {
  if (voiceDiv && voiceDiv.length) {
    var audioElement = voiceDiv.parent().find("audio");
    voiceDiv.removeClass("play");
    if(!flag){
      audioElement[0].pause();
      // 点击这条音频暂停后,再点击这条音频重新开始播放
      audioElement[0].currentTime = 0.0;
    }
  }
}

window.tlShareCallback = window.sendShareCallback = window.QQShareCallback = window.weiboShareCallback = window.qZoneShareCallbackCancel = function () {
  bravetime.tj.evSend({category:"live",action:"share",label:"share_"+live_id,"value":1});
};
