$(function() {
    console.log('产品类别详情页初始化完毕')
    let type_str = getUrlParam('type')
    if (type_str === 'mn') {
        $('.mn').addClass('show')
        $('.typeName').text('泌尿道')
        $('title').text('泌尿道')
    } else if(type_str === 'pf') {
        $('.pf').addClass('show')
        $('.typeName').text('皮肤')
        $('title').text('皮肤')
    }
    // 泌尿道mn-皮肤pf-体重管理tz-胃肠道cd-提升活力hl-健康管理jk，以后将要增加的中文名和缩写映射
})