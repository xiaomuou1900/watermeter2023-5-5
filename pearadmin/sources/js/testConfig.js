
layui.use(['form'],function() {
  var form = layui.form
  $('#testConfigBt').on('click', function () {
    var data = form.val("testConfigFilter")
    if (data.pulseInpt == "") {
      $('#pulseDIV').addClass('warnBorder')
      $('#csqDIV').removeClass('warnBorder')
      $('#vccDIV').removeClass('warnBorder')
      $('#pulseInpt ').focus()
    }
    else if (data.csqInpt == "") {
      $('#pulseDIV').removeClass('warnBorder')
      $('#csqDIV').addClass('warnBorder')
      $('#vccDIV').removeClass('warnBorder')
      $('#csqInpt ').focus()
    }
    else if (data.vcc1Inpt == "") {
      $('#pulseDIV').removeClass('warnBorder')
      $('#csqDIV').removeClass('warnBorder')
      $('#vccDIV').addClass('warnBorder')
      $('#vcc1Inpt ').focus()
    }
    else if (data.vcc2Inpt == "") {
      $('#pulseDIV').removeClass('warnBorder')
      $('#csqDIV').removeClass('warnBorder')
      $('#vccDIV').addClass('warnBorder')
      $('#vcc2Inpt ').focus()
    }
    else {
      $('#pulseDIV').removeClass('warnBorder')
      $('#csqDIV').removeClass('warnBorder')
      $('#vccDIV').removeClass('warnBorder')
      $.ajax({
        type: 'post'
        , url: '../../api/transfer_devices.php'
        , data: {
          "man": 'LIANLIFT'
          , "initial_surplus": 20
          , 'scale': 0
          , "extra": {
            "pulse": data.pulseInpt
            , "csq": data.csqInpt
            , "vcc1": data.vcc1Inpt
            , "vcc2": data.vcc2Inpt
            ,'verdion': data.versionInpt
          }
          , "import": true
          , success: function (res) {
            layer.alert('提交测试配置成功！')
            form.val('testConfigFilter',{
              pulseInpt : ""
              ,csqInpt : ""
              ,vcc1Inpt : ""
              ,vcc2Inpt : ""
              ,versionInpt: ""
            })
          }
        }
      })
    }
  })  
})


