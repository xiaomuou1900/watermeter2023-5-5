var customPrintJson  
$.ajax({                                                //...请求 模板
    type: 'get'
    , url: '../../../../api/tablePrint.php'
    , data: {
      getData:'默认模板'
    }
    , success: function (res) {
    //   console.log(res) 
      customPrintJson = res
      $('#templateNameId').html('模板名称：默认模板')
    }
  })
