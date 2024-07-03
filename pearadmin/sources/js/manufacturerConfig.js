
layui.use(['form'],function() {
  var form = layui.form
  $('#manufacturerConfigBt').on('click', function () {
    var data = form.val("manufacturerConfigFilter")
    if (data.manufacturerShortInpt == "") {
      $('#manufacturerShortDIV').addClass('warnBorder')
      $('#manufacturerFullDIV').removeClass('warnBorder')
      $('#interRechargeDIV').removeClass('warnBorder')
      $('#manufacturerShortInpt').focus()
    }
    else if (data.manufacturerFullInpt == "") {
      $('#manufacturerShortDIV').removeClass('warnBorder')
      $('#manufacturerFullDIV').addClass('warnBorder')
      $('#interRechargeDIV').removeClass('warnBorder')
      $('#manufacturerFullInpt').focus()

    }
    else if (data.interRechargeInpt == "") {
      $('#manufacturerShortDIV').removeClass('warnBorder')
      $('#manufacturerFullDIV').removeClass('warnBorder')
      $('#interRechargeDIV').addClass('warnBorder')
      $('#interRechargeInpt').focus()

    }
    else {
      $('#manufacturerShortDIV').removeClass('warnBorder')
      $('#manufacturerFullDIV').removeClass('warnBorder')
      $('#interRechargeDIV').removeClass('warnBorder')
      $.ajax({
        type: 'post'
        , url: '../../api/transfer_devices.php'
        , data: {
          "man": 'LIANLIFT'
          , "initial_surplus": 20
          , 'scale': 0
          , "extra": {
            "manufacturerShor": data.manufacturerShortInpt
            , "manufacturerFull": data.manufacturerFullInpt
            , "interRecharge": data.interRechargeInpt
          }
          , "import": true
          , success: function (res) {
            layer.alert('保存配置成功！')
            form.val('manufacturerConfigFilter',{
              manufacturerShortInpt : ""
              ,manufacturerFullInpt : ""
              ,interRechargeInpt : ""
            })
          }
        }
      })
    }
  })  
})


