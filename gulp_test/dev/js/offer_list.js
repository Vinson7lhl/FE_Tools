$(function() {
    /*-----------------------------------初始化变量-----------------------------------*/
    let inquiry_code = getUrlProp('inquiry_code')
    let list_data = []
    let top_detail = ''
    let quote_code = ''
    let bargain_price_currency = ''
    // 是否在列表中有已经接受报价的，如果有，则将其他模块按钮渲染为已拒绝
    let is_accepted = false
    // 报价列表字符串
    let html_str = ''
    // 比价列表字符串
    let compare_str = ''
    let current_money_type=''
    /*-----------------------------------获取dom-----------------------------------*/
    // loading……
    $_loadingPage = $('.loadingPage')
    // 采购商-有效期
    let $_restDayNum = $('.restDayNum')
    // 采购商-产品名
    let $_p_name = $('#p_name')
    // 采购商-CAS
    let $_p_cas = $('#p_cas')
    // 采购商-状态
    let $_pStatus = $('.pStatus')
    // 采购商-数量
    let $_p_num = $('#p_num')
    // 采购商-纯度
    let $_p_purity = $('#p_purity')
    // 采购商-备注
    let $_p_comment = $('#p_comment')
    // 采购商-发布时间
    let $_purchase_released_date = $('#purchase_released_date')
    // 采购商-采购单号
    let $_purchase_id = $('#purchase_id')
    // 展开收起的模块
    let $_hideLine = $('.hideLine')
    // 展开/收起按钮
    let $_switchButton = $('.switchButton')
    // 展开收起文本
    let $_switchButtonText = $('.switchButtonText')
    // 展开收起箭头
    let $_switchArrorIcon = $('.switchArrorIcon')
    // 比价按钮
    let $_compareButton = $('.compareButton')



    // 列表容器
    let $_offerList = $('.offerList')
    // 某个报价详情
    // 供应商
    let $_offer_firm_name = $('#offer_firm_name')
    // 报价详情
    let $_formList = $('.formList')
    // 商品报价
    let $_offer_firm_price = $('#offer_firm_price')
    // 供应数量
    let $_offer_firm_num = $('#offer_firm_num')
    // 纯度
    let $_offer_firm_purity = $('#offer_firm_purity')
    // 货期
    let $_offer_firm_type = $('#offer_firm_type')
    // 报价有效期
    let $_offer_firm_period = $('#offer_firm_period')
    // 备注
    let $_offer_firm_comment = $('#offer_firm_comment')
    // 联系方式
    let $_offer_firm_phone = $('#offer_firm_phone')
    // 拒绝
    let $_refuseButton2 = $('.refuseButton2')
    // 议价
    let $_negotiatedPriceButton2 = $('.negotiatedPriceButton2')
    // 拒绝
    let $_acceptButton2 = $('.acceptButton2')


    // 供应商比价列表模块
    let $_comparePop = $('.comparePop')
    // 比价列表容器
    let $_firmList = $('.firmList')
    // 关闭比价列表按钮
    let $_closeComparePopWindow = $('.closeComparePopWindow')


    // 采购商议价模块
    let $_discussPop = $('.discussPop')
    // 关闭采购商议按钮
    let $_closeDiscussPopWindow = $('.closeDiscussPopWindow')
    // 意向价
    let $_intention_price = $('#intention_price')
    // 备注
    let $_discuss_comment = $('#discuss_comment')
    // 取消议价按钮
    let $_cancelDiscussButton = $('.cancelDiscussButton')
    // 提交议价按钮
    let $_submitDiscussButton = $('.submitDiscussButton')

    // 遮罩层
    let $_bg = $('.bg')
    // 提示模态框
    let $_tipsPop = $('.tipsPop')
    // 关闭提示模态框按钮
    let $_closeTipsPop = $('.closeTipsPop')
    // 拒绝原因弹窗
    let $_refusePopWindow = $('.refusePopWindow')
    // 关闭弹窗按钮
    let $_closePopWindow = $('.closePopWindow')
    // 关闭详情按钮
    let $_closeFormList = $('.closeFormList')
    // 每个radio
    let $_perRadio = $('.perRadio')
    // 其它原因
    let $_otherReason = $('.otherReason')
    // 提交拒绝原因按钮
    let $_refusedReasonButton = $('.refusedReasonButton')




    /*-----------------------------------交互-----------------------------------*/
    // 获取url参数
    // let code = getUrlProp('code')

    // 展开或者隐藏详情
    $_switchButton.on('click',function(){
        if($_switchButtonText.text() === '展开'){
            $_switchButtonText.text('收起')
            $_switchArrorIcon.addClass('switchButtonActive')
            $_hideLine.addClass('show')
        } else {
            $_switchButtonText.text('展开')
            $_switchArrorIcon.removeClass('switchButtonActive')
            $_hideLine.removeClass('show')
        }
    })

    /**
     * 比价
     */
    // 打开比价弹窗
    $_compareButton.on('click', function() {
        $_bg.fadeIn(200)
        $_comparePop.fadeIn(200)
    })
    // 关闭比价弹窗
    $_closeComparePopWindow.on('click', function() {
        $_bg.fadeOut(200)
        $_comparePop.fadeOut(200)
    })


    /**
     * 议价
     */
    // 打开议价弹窗
    $('body').on('click', '.negotiatedPriceButton,.negotiatedPriceButton2', function() {
        bargain_price_currency = $(this).attr('data-currency')
        // 如果点击已通知
        if($(this).hasClass('disButton')) {
            $_discussPop.addClass('discussPopOnlyRead')
            $_intention_price.attr('disabled',true)
            $_discuss_comment.attr('disabled',true)
            // 获取议价数据
            quote_code = $(this).attr('data-code')
            if($(this).hasClass('negotiatedPriceButton2')){
                $_formList.removeClass('formListShow')
            }
            getDiscussedInfo(quote_code)
        } else {
            $_discussPop.removeClass('discussPopOnlyRead')
            $_intention_price.attr('disabled',false)
            $_discuss_comment.attr('disabled',false)
            $_intention_price.val('')
            $_discuss_comment.val('')
            if($(this).hasClass('negotiatedPriceButton2')){
                $_formList.removeClass('formListShow')
            } else {
                $_bg.fadeIn(200)
            }
            $_discussPop.fadeIn(200)
        }
    })
    // 关闭议价弹窗
    $_closeDiscussPopWindow.on('click', function() {
        $_bg.fadeOut(200)
        $_discussPop.fadeOut(200)
    })
    $_cancelDiscussButton.on('click', function() {
        $_bg.fadeOut(200)
        $_discussPop.fadeOut(200)
    })
    // 提交议价
    $_submitDiscussButton.on('click', function() {
        // 检查表单
        if (!$_intention_price.val().trim()) {
            alert('意向价不能为空')
            return false
        } else if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test($_intention_price.val().trim()) || $_intention_price.val().trim() <= 0) {
            alert('意向价不合法！')
            return false
        }
        postDiscussPrice(quote_code, $_intention_price.val(), bargain_price_currency,$_discuss_comment.val().trim())
    })


    /**
     * 拒绝
     */
    // 打开拒绝报价弹窗，并初始化
    $('body').on('click','.refuseButton,.refuseButton2', function () {
        quote_code = $(this).attr('data-code')
        $_refusePopWindow.removeClass('popWindowOthers')
        $_otherReason.removeClass('show')
        $_otherReason.val('')
        $_perRadio.removeClass('radioChecked')
        $_perRadio.eq(0).addClass('radioChecked')
        $_refusePopWindow.fadeIn(200)
        if($(this).hasClass('refuseButton2')){    
            $_formList.removeClass('formListShow')
        } else {
            $_bg.fadeIn(200)
        }
    })
    // 关闭拒绝原因弹窗
    $_closePopWindow.on('click', function () {
        $_bg.fadeOut(200)
        $_refusePopWindow.fadeOut(200)
    })
    // 选择某个原因
    $_perRadio.on('click', function () {
        if (!$(this).hasClass('radioChecked')) {
            $_perRadio.removeClass('radioChecked')
            $(this).addClass('radioChecked')
            // 如果是其它
            console.log($(this).attr('data-type'))
            if ($(this).attr('data-type') === '5') {
                $_refusePopWindow.addClass('popWindowOthers')
                $_otherReason.addClass('show')
            } else {
                $_refusePopWindow.removeClass('popWindowOthers')
                $_otherReason.removeClass('show')
                $_otherReason.val('')
            }
        }
    })
    // 提交拒绝原因表单
    $_refusedReasonButton.on('click', function () {
        let refuse_type = $('.radioChecked').attr('data-type')
        let refuse_remark = $_otherReason.val()
        postRefuseForm(quote_code, refuse_type, refuse_remark)
    })


    /**
     * 打开某个详情
     */
    $('body').on('click','.showMoreButton',function(){
        // 获取当前数据
        let this_data = list_data[$(this).attr('data-index')]
        // 渲染详情
        $_offer_firm_name.text(this_data.shop_name)
        let this_money_type = this_data.molbase_purchase_price_currency == 1? '￥' : '$'
        $_offer_firm_price.text(this_money_type + this_data.molbase_purchase_price)
        $_offer_firm_num.text(this_data.number + this_data.numberUnitStr)
        $_offer_firm_purity.text(this_data.purity+'%')
        $_offer_firm_type.text(this_data.stock_days)
        $_offer_firm_period.text(this_data.effective_time)
        $_offer_firm_comment.text(this_data.remarks)
        $_offer_firm_phone.text(this_data.mobile)
        // 渲染详情的按钮
        let current_state = this_data.state
        let current_button_list = ''
        // 对详情中的按钮进行处理
        if(is_accepted){
            // 渲染为已接受
            if(current_state === 3) {
                current_button_list = "<div class='buttonsList'>" +
                                            "<div class='perButton accepted acceptedButton2'>已接受</div>" +
                                        "</div>"
            } else {
                // 渲染为已拒绝
                current_button_list = "<div class='buttonsList'>" +
                                            "<div class='perButton perButtonBlue disButton refusedButton2'>已拒绝</div>" +
                                        "</div>"
            }
        } else {
            // 待报价
            if(current_state === 2){
                // 如果是已议价
                if(this_data.isBargain == 1){
                    current_button_list = "<div class='buttonsList'>" +
                                                "<div class='refuseButton2' data-code='" + this_data.code + "'>拒绝</div>" +
                                                "<div class='negotiatedPriceButton2 disButton' data-currency='" + this_data.molbase_purchase_price_currency + "' data-code='" + this_data.code + "'>已通知</div>" +
                                                "<div class='perButton perButtonBlue acceptButton2' data-code='" + this_data.code + "'>接受报价</div>" +
                                            "</div>"
                } else {
                    current_button_list = "<div class='buttonsList'>" +
                                                "<div class='refuseButton2' data-code='" + this_data.code + "'>拒绝</div>" +
                                                "<div class='negotiatedPriceButton2' data-currency='" + this_data.molbase_purchase_price_currency + "' data-code='" + this_data.code + "'>议价</div>" +
                                                "<div class='perButton perButtonBlue acceptButton2' data-code='" + this_data.code + "'>接受报价</div>" +
                                            "</div>"
                }
            }
            // 已拒绝
            else if(current_state === 4){
                current_button_list = "<div class='buttonsList'>" +
                                            "<div class='perButton perButtonBlue disButton refusedButton2'>已拒绝</div>" +
                                        "</div>"
            }
        }
        $('.buttonsListFrame').html(current_button_list)
        $_bg.fadeIn(200)
        $_formList.addClass('formListShow')
    })
    $_closeFormList.on('click',function(){
        $_bg.fadeOut(200)
        $_formList.removeClass('formListShow')
    })


    /**
     * 接受报价
     */
    $('body').on('click','.acceptButton,.acceptButton2',function(){
        let quote_code = $(this).attr('data-code')
        postAcceptForm(inquiry_code,quote_code)
        if($(this).hasClass(acceptButton2)) {
            $_bg.fadeOut(200)
            $_formList.removeClass('formListShow')
        }
    })


    /**
     * 关闭接受报价/拒绝报价后的提示模态框
     */
    $_closeTipsPop.on('click',function(){
        $_bg.fadeOut(200)
        $_tipsPop.fadeOut(200, function() {
            // 重新刷新页面列表
            getList()
        })
    })
    /*-----------------------------------请求-----------------------------------*/
    // 获取报价列表
    function getList() {
        $_loadingPage.addClass('show')
        $.ajax({
            url: base_url + '/1.0/qi/quotation',
            type: 'get',
            dataType: 'json',
            data: {
                inquiry_code: inquiry_code
            },
            success: function (res) {
                list_data = res.quotations
                top_detail = res.inquiry
                // 初始化拼接dom字符串
                compare_str = ''
                html_str = ''
                // 初始化采购商详情
                $_restDayNum.text(top_detail.effectiveTimeStr)
                $_p_name.text(top_detail.product_name)
                $_p_cas.text(top_detail.cas)

                /**
                 * 待报价-3
                 *          待确认-11
                 * 已拒绝-9
                 * 已接受-5
                 * 已取消-7
                 * 
                 * 已报价-13
                 */
                if(top_detail.state === 3){
                    $_pStatus.addClass('notOffer').text('待报价')
                }
                if(top_detail.state === 5){
                    $_pStatus.addClass('accepted').text('已接受')
                }
                if(top_detail.state === 7){
                    $_pStatus.addClass('canceled').text('已取消')
                }
                if(top_detail.state === 9){
                    $_pStatus.addClass('refused').text('已拒绝')
                }
                if(top_detail.state === 11){
                    $_pStatus.addClass('offered').text('待确认')
                }
                if(top_detail.state === 13){
                    $_pStatus.addClass('offered').text('已报价')
                }

                $_p_num.text(top_detail.number + top_detail.numberUnitStr)
                $_p_purity.text(top_detail.purity + '%')
                $_p_comment.text(top_detail.remarks)
                $_purchase_released_date.text(top_detail.publish_time)
                $_purchase_id.text(top_detail.code)
                // 如果列表数大于1则显示比价按钮
                if(list_data.length > 1){
                    $_compareButton.addClass('show')
                    // 渲染比价列表
                    for(let k=0; k<list_data.length; k++) {
                        current_money_type= list_data[k].molbase_purchase_price_currency == '1'?'￥':'$'
                        compare_str += "<div class='perComparison'>" +
                                            "<span class='perComparisonFirm ell'>" + list_data[k].shop_name + "</span>" +
                                            "<span class='perComparisonPrice ell valueBlue'>" + current_money_type + list_data[k].molbase_purchase_price + "</span>" +
                                            "<span class='perComparisonNum ell valueBlue'>"+list_data[k].number + list_data[k].numberUnitStr + "</span>" +
                                        "</div>"
                    }
                    $_firmList.html(compare_str)
                }
                for(let j=0; j<list_data.length; j++) {
                    if(list_data[j].state === 3) {
                        is_accepted = true
                    }
                }
                for(let i=0; i<list_data.length; i++) {
                    current_money_type= list_data[i].molbase_purchase_price_currency == '1'?'￥':'$'
                    html_str += "<div class='model perOffer'>" +
                                    "<div class='firmNameBigTile'>" + 
                                        "<span class='leftLine'></span>" +
                                        "<span class='firmNameText ell'>" + list_data[i].shop_name + "</span>" +
                                    "</div>" +
                                    "<div class='properList'>" +
                                        "<div class='perLine'>" +
                                            "<div class='key keyPriceNum'>商品报价</div>" +
                                            "<div class='value valueBlue valueBlueBold'>" + current_money_type + list_data[i].molbase_purchase_price + "</div>" +
                                        "</div>" +
                                        "<div class='perLine'>" +
                                            "<div class='key'>供应数量</div>" +
                                            "<div class='value'>" + list_data[i].number + list_data[i].numberUnitStr + "</div>" +
                                        "</div>" +
                                    "</div>"+ 
                                    "<div class='showMoreButton' data-index=" + i + ">" +
                                        "<div class='moreLine'></div>" +
                                        "<div class='moreText'>更多详情</div>" +
                                    "</div>";
                    if(is_accepted){
                        // 渲染为已接受
                        if(list_data[i].state === 3) {
                            html_str += "<div class='buttonsList'>" +
                                            "<div class='perButton accepted acceptedButton'>已接受</div>" +
                                        "</div>" +
                                    "</div>"
                        } else {
                            // 渲染为已拒绝
                            html_str += "<div class='buttonsList'>" +
                                            "<div class='perButton perButtonBlue disButton refusedButton'>已拒绝</div>" +
                                        "</div>" +
                                    "</div>"
                        }
                    } else {
                        // 待报价
                        if(list_data[i].state === 2){
                            // 如果是已议价
                            if(list_data[i].isBargain == 1){
                                html_str += "<div class='buttonsList'>" +
                                            "<div class='refuseButton' data-code='" + list_data[i].code + "'>拒绝</div>" +
                                            "<div class='negotiatedPriceButton disButton' data-currency='" + list_data[i].molbase_purchase_price_currency + "' data-code='" + list_data[i].code + "'>已通知</div>" +
                                            "<div class='perButton perButtonBlue acceptButton' data-code='" + list_data[i].code + "'>接受报价</div>" +
                                        "</div>" +
                                    "</div>"
                            } else {
                                html_str += "<div class='buttonsList'>" +
                                            "<div class='refuseButton' data-code='" + list_data[i].code + "'>拒绝</div>" +
                                            "<div class='negotiatedPriceButton' data-currency='" + list_data[i].molbase_purchase_price_currency + "' data-code='" + list_data[i].code + "'>议价</div>" +
                                            "<div class='perButton perButtonBlue acceptButton' data-code='" + list_data[i].code + "'>接受报价</div>" +
                                        "</div>" +
                                    "</div>"
                            }
                        }
                        // 已拒绝
                        else if(list_data[i].state === 4){
                            html_str += "<div class='buttonsList'>" +
                                            "<div class='perButton perButtonBlue disButton refusedButton'>已拒绝</div>" +
                                        "</div>" +
                                    "</div>"
                        }
                    }
                }
                // 注入到列表容器dom中
                $_offerList.html(html_str)
                // 隐藏loading
                $_loadingPage.removeClass('show')
            },
            error: function (res) {
                $_loadingPage.removeClass('show')
                console.log(res)
            }
        })
    } 
    getList()
    
    
    // 提交拒绝表单
    function postRefuseForm(quote_code, refuse_type, refuse_remark) {
        $.ajax({
            url: base_url + '/1.0/qi/quotation/refuse',
            type: 'POST',
            dataType: 'json',
            data: {
                quote_code: quote_code,
                refuse_type: refuse_type,
                refuse_remark: refuse_remark
            },
            success: function (res) {
                // 隐藏拒绝原因模态框
                $_refusePopWindow.fadeOut(200,function() {
                    $_tipsPop.find('.tipsText').text('拒绝成功！')
                    $_tipsPop.fadeIn(200)
                })
            },
            error: function (res) {
                console.log(res)
            }
        })
    }
    // 接受报价
    function postAcceptForm(inquiry_code, quote_code) {
        $_loadingPage.addClass('show')
        $.ajax({
            url: base_url + '/1.0/qi/quotation/accept',
            type: 'post',
            dataType: 'json',
            data: {
                inquiry_code: inquiry_code,
                quote_code: quote_code
            },
            success: function(){
                $_loadingPage.removeClass('show')
                $_tipsPop.find('.tipsText').text('已通知供应商及时与您联系')
                $_bg.fadeIn(200)
                $_tipsPop.fadeIn(200)
            },
            fail:function(){
                $_loadingPage.removeClass('show')
            }
        })
    }
    // 提交议价
    function postDiscussPrice(quote_code,bargain_price,bargain_price_currency,remark) {
        $_loadingPage.addClass('show')
        $.ajax({
            url: base_url + '/1.0/qi/quotation/bargain',
            type: 'post',
            dataType: 'json',
            data: {
                quote_code: quote_code,
                bargain_price: inquiry_code,
                bargain_price_currency:bargain_price_currency,
                remark:remark
            },
            success: function(){
                $_discussPop.fadeOut(200,function() {
                    $_tipsPop.find('.tipsText').text('提交成功，已为您第一时间通知供应商与您取得联系，祝早日促成交易！')
                    $_tipsPop.fadeIn(200)
                })

            },
            fail:function(){
                $_loadingPage.removeClass('show')
            }
        })
    }
    // 获取已议价数据
    function getDiscussedInfo(quote_code) {
        $.ajax({
            url: base_url + '/1.0/qi/quotation/detail',
            type: 'get',
            dataType: 'json',
            data: {
                quote_code: quote_code
            },
            success: function(res){
                let bargainPriceCurrency = res.quotation.bargain.bargainPriceCurrency == 1 ? '￥' : '$'
                $_intention_price.val(bargainPriceCurrency + res.quotation.bargain.bargainPrice)
                $_discuss_comment.val(res.quotation.bargain.remark)
            },
            fail:function(){
            }
        })
    }
})