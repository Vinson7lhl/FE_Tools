$(function () {
    console.log('首页js初始化完毕')
    let swiper = new Swiper('.bannerArea', {
        pagination: {
            el: '.swiper-pagination',
        },
        loop: true, // 循环
        autoplay: true, // 自动播放3s切换
    })
    let swiper2 = new Swiper('.banner2Area', {
        slidesPerView: 3,
        spaceBetween: 0,
        centeredSlides: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true, // 循环
        on: {
            slideChangeTransitionEnd: function () {
                // $('.currentBookName').text($('.swiper-slide-active').find('.bookName').text())
                // $('.currentBookDes').text($('.swiper-slide-active').find('.bookDes').text())
                //切换结束时，告诉我现在是第几个slide
                if($('#banner_area2 .swiper-slide-active').attr('data-num') ==  1) {
                    $('.currentBookNameDes').attr('src','./dev/img/index_book_des01.jpg')
                    console.log('1')
                }else if($('#banner_area2 .swiper-slide-active').attr('data-num') ==  2) {
                    $('.currentBookNameDes').attr('src','./dev/img/index_book_des02.jpg')
                    console.log('2')
                }else if($('#banner_area2 .swiper-slide-active').attr('data-num') ==  3) {
                    $('.currentBookNameDes').attr('src','./dev/img/index_book_des03.jpg')
                    console.log('3')
                }else if($('#banner_area2 .swiper-slide-active').attr('data-num') ==  4) {
                    $('.currentBookNameDes').attr('src','./dev/img/index_book_des04.jpg')
                    console.log('4')
                }else if($('#banner_area2 .swiper-slide-active').attr('data-num') ==  5) {
                    $('.currentBookNameDes').attr('src','./dev/img/index_book_des05.jpg')
                    console.log('5')
                }
            },
        },
    });
})