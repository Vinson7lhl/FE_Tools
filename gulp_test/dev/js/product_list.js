$(function () {
    console.log('产品列表页初始化完毕')
    function activeTab(type_str) {
        switch (type_str) {
            case 'mn': {
                $('.mn_tab').addClass('perTabActive')
                renderDom()
                break
            }
            case 'xh': {
                $('.xh_tab').addClass('perTabActive')
                break
            }
            case 'pf': {
                $('.pf_tab').addClass('perTabActive')
                break
            }
            case 'jf': {
                $('.jf_tab').addClass('perTabActive')
                break
            }
            case 'hl': {
                $('.hl_tab').addClass('perTabActive')
                break
            }
            case 'jk': {
                $('.jk_tab').addClass('perTabActive')
                break
            }
            default: {
                $('.all_tab').addClass('perTabActive')
                console.log('all')
                break
            }
        }
    }
    function renderDom(type_str) {
        let html_str = ''
        if (type_str !== 'all') {
            for (let i = 0; i < source_data.length; i++) {
                if (source_data[i].type === type_str) {
                    let price_str = ''
                    if (source_data[i].price) {
                        price_str = '￥ ' + source_data[i].price + '<span class="priceTips">（建议零售价）</span>'
                    } else {
                        price_str = '价格未定'
                    }
                    html_str +=
                        '<a class="perProduct" href="./product_detail.html?id=' + source_data[i].id + '">' +
                        '<div class="imgArea">' +
                        '<img class="pImg" src="./dev/img/' + type_str + '/' + source_data[i].id + '.jpg">' +
                        '</div>' +
                        '<div class="pDes">' + source_data[i].des + '</div>' +
                        '<div class="pPrice">' + price_str + '</div>' +
                        '</a>'
                }
            }
        } else {
            for (let i = 0; i < source_data.length; i++) {
                let price_str = ''
                if (source_data[i].price) {
                    price_str = '￥ ' + source_data[i].price + '<span class="priceTips">（建议零售价）</span>'
                } else {
                    price_str = '价格未定'
                }
                html_str +=
                    '<a class="perProduct" href="./product_detail.html?id=' + source_data[i].id + '">' +
                    '<div class="imgArea">' +
                    '<img class="pImg" src="./dev/img/' + source_data[i].type + '/' + source_data[i].id + '.jpg">' +
                    '</div>' +
                    '<div class="pDes">' + source_data[i].des + '</div>' +
                    '<div class="pPrice">' + price_str + '</div>' +
                    '</a>'

            }
        }
        $('.mainContent').html(html_str)
    }
    function searchKey(key, type_str) {
        let html_str = ''
        if (type_str !== 'all') {
            for (let i = 0; i < source_data.length; i++) {
                if (source_data[i].des.indexOf(key) !== -1 && source_data[i].type === type_str) {
                    let price_str = ''
                    if (source_data[i].price) {
                        price_str = '￥ ' + source_data[i].price + '<span class="priceTips">（建议零售价）</span>'
                    } else {
                        price_str = '价格未定'
                    }
                    html_str +=
                        '<a class="perProduct" href="./product_detail.html?id=' + source_data[i].id + '">' +
                        '<div class="imgArea">' +
                        '<img class="pImg" src="./dev/img/' + source_data[i].type + '/' + source_data[i].id + '.jpg">' +
                        '</div>' +
                        '<div class="pDes">' + source_data[i].des + '</div>' +
                        '<div class="pPrice">' + price_str + '</div>' +
                        '</a>'
                }
            }
        } else {
            for (let i = 0; i < source_data.length; i++) {
                if (source_data[i].des.indexOf(key) !== -1) {
                    let price_str = ''
                    if (source_data[i].price) {
                        price_str = '￥ ' + source_data[i].price + '<span class="priceTips">（建议零售价）</span>'
                    } else {
                        price_str = '价格未定'
                    }
                    html_str +=
                        '<a class="perProduct" href="./product_detail.html?id=' + source_data[i].id + '">' +
                        '<div class="imgArea">' +
                        '<img class="pImg" src="./dev/img/' + source_data[i].type + '/' + source_data[i].id + '.jpg">' +
                        '</div>' +
                        '<div class="pDes">' + source_data[i].des + '</div>' +
                        '<div class="pPrice">' + price_str + '</div>' +
                        '</a>'
                }
            }
        }
        if(html_str === ''){
            alert('暂未搜索到！')
        } else {
            $('.mainContent').html(html_str)
        }
    }
    $('#search_input').on('keydown', function (event) {
        if($(this).val().trim()){
            if(event.keyCode === 13){
                searchKey($(this).val(),type_str)
            }
        } else {
            $(this).val('')
        }
    })
    // 获取类型名
    /**
     *  mn 泌尿
        xh 消化
        pf 皮肤
        jf 减肥
        hl 活力
        jk 健康
     */
    let type_str = getUrlParam('type')
    $('.perTab').on('click', function () {
        if(!$(this).hasClass('perTabActive')){
            $('.perTab').removeClass('perTabActive')
            $(this).addClass('perTabActive')
            type_str = $(this).attr('data-type')
            renderDom(type_str)
            $(document).scrollTop(0);
        }
    })
    activeTab(type_str)
    renderDom(type_str)
})