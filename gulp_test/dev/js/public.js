(function (doc, win) {
    var html = doc.getElementsByTagName("html")[0],
        // orientationchange->手机屏幕转屏事件
        // resize->页面大小改变事件(一边pc端有用)
        reEvt = "orientationchange" in win ? "orientationchange" : "resize",
        reFontSize = function () {
            var clientW = doc.documentElement.clientWidth || doc.body
                .clientWidth;
            if (!clientW) {
                return;
            }
            html.style.fontSize = 100 * (clientW / 750) + "px";
        }
    win.addEventListener(reEvt, reFontSize);
    // DOMContentLoaded->dom加载完就执行,onload要dom/css/js都加载完才执行
    doc.addEventListener("DOMContentLoaded", reFontSize);
})(document, window);
let source_data = [
    { id: '1', type: 'mn', img: './img/mn/1.jpg', des: '成猫泌尿道全价处方粮(情绪舒缓) 1.5KG', price: '220' },
    { id: '2', type: 'mn', img: './img/mn/2.jpg', des: '成猫泌尿道全价处方粮 1.5KG', price: '200' },
    { id: '3', type: 'mn', img: './img/mn/3.jpg', des: '成猫泌尿道全价处方粮 3.5KG', price: '397' },
    { id: '4', type: 'mn', img: './img/mn/4.jpg', des: '成猫泌尿道全价处方粮 6KG', price: '640' },
    { id: '5', type: 'mn', img: './img/mn/5.jpg', des: '成犬泌尿道全价处方粮 2KG', price: '227' },
    { id: '6', type: 'mn', img: './img/mn/6.jpg', des: '成犬泌尿道全价处方粮 8KG', price: '685' },
    { id: '7', type: 'mn', img: './img/mn/7.jpg', des: '成犬泌尿道全价处方粮UC(低嘌呤) 2KG', price: '227' },

    { id: '8', type: 'xh', img: './img/xh/8.jpg', des: '猫肠道处方粮 2KG', price: '257', can_jump: '1' },
    { id: '9', type: 'xh', img: './img/xh/9.jpg', des: '猫高纤易消化处方粮 2KG', price: '259', can_jump: '1' },
    { id: '10', type: 'xh', img: './img/xh/10.jpg', des: '犬肠道处方粮 2KG', price: '223', can_jump: '1' },
    { id: '11', type: 'xh', img: './img/xh/11.jpg', des: '犬肠道处方粮 7.5KG', price: '599', can_jump: '1' },
    { id: '12', type: 'xh', img: './img/xh/12.jpg', des: '犬低脂易消化处方粮 1.5KG', price: '174', can_jump: '1' },
    { id: '13', type: 'xh', img: './img/xh/13.jpg', des: '犬低脂易消化处方粮 6KG', price: '560', can_jump: '1' },
    { id: '14', type: 'xh', img: './img/xh/14.jpg', des: '犬高纤易消化处方粮 2KG', price: '218', can_jump: '1' },
    { id: '15', type: 'xh', img: './img/xh/15.jpg', des: '幼犬肠道处方粮 1.5KG', price: '208', can_jump: '1' },

    { id: '16', type: 'pf', img: './img/pf/16.jpg', des: '成猫低过敏性全价处方粮 1.5KG', price: '214', can_jump: '1' },
    { id: '17', type: 'pf', img: './img/pf/17.jpg', des: '成猫皮肤被毛全价处方粮 1.5KG', price: '192', can_jump: '' },
    { id: '18', type: 'pf', img: './img/pf/18.jpg', des: '成犬低过敏性全价处方粮 2KG', price: '252', can_jump: '1' },
    { id: '19', type: 'pf', img: './img/pf/19.jpg', des: '成犬低过敏性全价处方粮 8KG', price: '', can_jump: '1' },
    { id: '20', type: 'pf', img: './img/pf/20.jpg', des: '成犬皮肤全价处方粮 2KG', price: '222', can_jump: '' },
    { id: '21', type: 'pf', img: './img/pf/21.jpg', des: '成犬皮肤全价处方粮 8KG', price: '658', can_jump: '' },
    { id: '22', type: 'pf', img: './img/pf/22.jpg', des: '小型犬成犬皮肤全价处方 2KG', price: '226', can_jump: '' },

    { id: '23', type: 'jf', img: './img/jf/23.jpg', des: '猫减肥处方粮 1.5KG', price: '195', can_jump: '1' },
    { id: '24', type: 'jf', img: './img/jf/24.jpg', des: '猫糖尿病处方粮 1.5KG', price: '200', can_jump: '1' },
    { id: '25', type: 'jf', img: './img/jf/25.jpg', des: '犬减肥II期处方粮 1.5KG', price: '148', can_jump: '1' },
    { id: '26', type: 'jf', img: './img/jf/26.jpg', des: '犬减肥处方粮 1.5KG', price: '170', can_jump: '1' },
    { id: '27', type: 'jf', img: './img/jf/27.jpg', des: '犬减肥处方粮 6KG', price: '538', can_jump: '1' },
    { id: '28', type: 'jf', img: './img/jf/28.jpg', des: '犬糖尿病处方粮 1.5KG', price: '191', can_jump: '1' },

    { id: '29', type: 'hl', img: './img/hl/29.jpg', des: '猫肝脏处方粮 2KG', price: '273', can_jump: '1' },
    { id: '30', type: 'hl', img: './img/hl/30.jpg', des: '猫肾脏处方粮 2KG', price: '273', can_jump: '1' },
    { id: '31', type: 'hl', img: './img/hl/31.jpg', des: '犬肝脏处方粮 1.5KG', price: '174', can_jump: '1' },
    { id: '32', type: 'hl', img: './img/hl/32.jpg', des: '犬肾脏处方粮 2KG', price: '227', can_jump: '1' },
    { id: '33', type: 'hl', img: './img/hl/33.jpg', des: '犬维持关节灵活性处方粮 1.5KG', price: '170', can_jump: '1' },
    { id: '34', type: 'hl', img: './img/hl/34.jpg', des: '犬维持关节灵活性处方粮 7KG', price: '541', can_jump: '1' },
    { id: '35', type: 'hl', img: './img/hl/35.jpg', des: '犬早期心脏病处方粮 2KG', price: '227', can_jump: '1' },

    { id: '36', type: 'jk', img: './img/jk/36.jpg', des: '成猫专业配方粮 2KG', price: '177', can_jump: '1' },
    { id: '37', type: 'jk', img: './img/jk/37.jpg', des: '成犬专业配方粮(大型犬) 4KG', price: '209', can_jump: '1' },
    { id: '38', type: 'jk', img: './img/jk/38.jpg', des: '成犬专业配方粮(小型犬) 2KG', price: '148', can_jump: '1' },
    { id: '39', type: 'jk', img: './img/jk/39.jpg', des: '大型犬幼犬助长配方粮 4KG', price: '230', can_jump: '' },
    { id: '40', type: 'jk', img: './img/jk/40.jpg', des: '绝育公猫处方粮 1.5KG', price: '149', can_jump: '1' },
    { id: '41', type: 'jk', img: './img/jk/41.jpg', des: '绝育母猫处方粮 1.5KG', price: '149', can_jump: '1' },
    { id: '42', type: 'jk', img: './img/jk/42.jpg', des: '绝育小型成犬处方粮 1.5KG', price: '124', can_jump: '1' },
    { id: '43', type: 'jk', img: './img/jk/43.jpg', des: '老年猫专业配方粮 1.5KG', price: '151', can_jump: '1' },
    { id: '44', type: 'jk', img: './img/jk/44.jpg', des: '离乳期配方奶糕(大型犬) 4KG', price: '322', can_jump: '1' },
    { id: '45', type: 'jk', img: './img/jk/45.jpg', des: '离乳期配方奶糕(小型犬) 1KG', price: '98', can_jump: '1' },
    { id: '46', type: 'jk', img: './img/jk/46.jpg', des: '小型老年犬专业配方粮 1.5KG', price: '126', can_jump: '1' },
    { id: '47', type: 'jk', img: './img/jk/47.jpg', des: '小型犬口腔处方粮 2KG', price: '212', can_jump: '' },
    { id: '48', type: 'jk', img: './img/jk/48.jpg', des: '幼猫离乳期配方奶糕 1KG', price: '119', can_jump: '1' },
    { id: '49', type: 'jk', img: './img/jk/49.jpg', des: '幼猫助长配方粮 2KG', price: '193', can_jump: '1' },
    { id: '50', type: 'jk', img: './img/jk/50.jpg', des: '幼犬助长配方粮(小型犬) 2KG', price: '163', can_jump: '1' }
]
/**
 * 获取url的某个参数
 */
function getUrlParam(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&")
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=")
        if (pair[0] == variable) {
            return pair[1]
        }
    }
    return ''
}
$(function () {
    let id_num = getUrlParam('id')
    if (id_num !== '') {
        let html_str = '<img src="./dev/img/p-detail/' + id_num + '_detail.jpg" class="detailPic">'
        $('.detailContent').html(html_str)
    }
    $('.typeTopNavigator').on('click', function () {
        console.log('后退')
        history.back()
    })
    if (getUrlParam('name')) {
        let book_name = decodeURI(getUrlParam('name'))
        $('.typeName').text(book_name)
        $('title').text(book_name)
    }
    $('img').on('error',function (){
        let html_str = '<p class="noImgTips">暂无详情，敬请期待！</p>'
        $('.detailContent').html(html_str)
    })
})