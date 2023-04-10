$(function(){
    var testJson = {
         data:[
            {
                id:1,
                order:1,
                meterID:'220301',
                ICCID:'8888888',
                VDD:'3.6V',
                CS:'20',
                total:'20m³',
                test:'2m³',
                time: new Date(),
                v:'2.0',
            },
            {
                id:2,
                order:2,
                meterID:'220301',
                ICCID:'8888888',
                VDD:'3.6V',
                CS:'20',
                total:'20m³',
                test:'2m³',
                time: new Date(),
                v:'2.0',
            },
        ]
    };
    
    function addTr(json) {
        // 返回对应的HTML
        // 这里应该使用模板技术
        // 然不同团队使用模板方式不一样
        // 我这里就按照比较传统的遍历方式拼接演示
        var html = '';
        $.each(json.data, function(index, obj) {
            html = html + '\
                <tr>\
                    <td><input type="checkbox" id="mixChk'+ obj.id +'"><label class="ui-checkbox" for="mixChk'+ obj.id +'"></label></td>\
                    <td><div class="ell">'+ obj.order +'</div></td>\
                    <td>'+ obj.meterID +'</td>\
                    <td>'+ obj.ICCID +'</td>\
                    <td>'+ obj.VDD +'</td>\
                    <td>'+ obj.CS +'</td>\
                    <td>'+ obj.total +'</td>\
                    <td>'+ obj.test +'</td>\
                    <td>'+ obj.time +'</td>\
                    <td>'+ obj.v +'</td>\
                    <td>'+ obj.v +'</td>\
                    <td>'+ obj.v +'</td>\
                    <td class="tc"><a href="javascript:;" class="icon icon_del ui-tips" title="删除评论"></a></td>\
                </tr>\
            ';
        });
        return html;
    }; 
    $('#testtable-mix tbody').append(addTr(testJson));

  




    // var Table = require(Table);
    // var mixTable = new Table($('#testtable-mix'), {
    //     ajaxOptions: {
    //         url: '/table',
    //         data: function() {
    //             // 列表外的动态Ajax参数
    //             return {
    //                 key: encodeURIComponent($('#mixSearchForm input').val())
    //             }
    //         }
    //     },
    
    //     parse: function(json) {
    //         // 返回对应的HTML
    //         // 这里应该使用模板技术
    //         // 然不同团队使用模板方式不一样
    //         // 我这里就按照比较传统的遍历方式拼接演示
    //         var html = '';
    //         $.each(json.data.data, function(index, obj) {
    //             html = html + '\
    //                 <tr>\
    //                     <td><input type="checkbox" id="mixChk'+ obj.id +'"><label class="ui-checkbox" for="mixChk'+ obj.id +'"></label></td>\
    //                     <td><div class="ell">'+ obj.title +'</div></td>\
    //                     <td>'+ obj.time +'</td>\
    //                     <td>'+ obj.comment +'</td>\
    //                     <td class="tc"><a href="javascript:;" class="icon icon_del ui-tips" title="删除评论"></a></td>\
    //                 </tr>\
    //             ';
    //         });
    //         return html;
    //     },
    //     events: {
    //         'a.icon_del:click': function() {
    //             new Dialog().confirm('确认删除该评论？');
    //         }
    //     },
    //     onCheck: function(allChecked, allUnchecked, container) {
    //         var opt = $('#testOpt_mix');
    //         if (allUnchecked == true) {
    //             opt.addClass('disabled');
    //         } else {
    //             opt.removeClass('disabled');
    //         }
    //     }

    // });
    
    // // 删除全部评论
    // $('#delAllComment').click(function() {
    //     var self = this;
    
    //     if ($(this).parent().hasClass('disabled')) return false;
    
    //     var dialog = new Dialog().confirm('确认删除选中的这些评论？', {
    //         buttons: [{
    //             value: '删除',
    //             events: {
    //                 click: function() {
    //                     mixTable.ajax({
    //                         data: {
    //                             action: 'empty',
    //                             current: 1
    //                         },
    //                         success: function() {
    //                             $(self).parent().addClass('disabled')
    //                         }
    //                     });
    //                     dialog.remove();
    //                 }
    //             }
    //         }, {}]
    //     });
    // });
    
    // // 搜索示意
    // new Validate($('#mixSearchForm'), function() {
    //     mixTable.ajax({
    //         data: {
    //             action: 'search',
    //             current: 1
    //         }
    //     });
    // });
})
