$(function () {
    // 提交前校验
    console.log('111');
    $("input[type='submit']").click(function (event) {
        if(!$('#userName').val() || !$('#password')){
            alert('请录入完整信息');
            event.preventDefault();
        }
    });
});