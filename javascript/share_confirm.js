$(function () {
   $(".receive_submit_btn").click(function () {
       bravetime.newConfirm("提交后收货地址和选择的图书将不能更改，确认无误请提交",{
           okText:"提交",
           cancelText:"修改",
           okLink:window.jumpUrl
       });
   });
    

});