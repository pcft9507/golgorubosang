// 헤더
var headerEvt = function () {$()
  var header = $('.header')
  $(window).on('scroll', function () {
    var scTop = $(this).scrollTop()
    console.log('scroll top', scTop)
    if (scTop > 0) {
      header.addClass('scrolled')
    } else {
      header.removeClass('scrolled')
    }
  })
}()

// 퀵메뉴
var quickMenu = function () {
  var quickMenu = $('.quickMenu')
  var quickMenuToggle = $('.quickMenu__toggle')
  var quickMenuToggleTxt = $('.quickMenu__toggleTxt')
  var quickMenuCont = $('.quickMenu__cont')
  quickMenuToggle.on('click', function () {
    if (quickMenu.hasClass('hide')) {
      quickMenu.removeClass('hide')
      quickMenuCont.slideDown('fast')
      quickMenuToggleTxt.text('퀵 숨기기')
    } else {
      quickMenu.addClass('hide')
      quickMenuCont.slideUp('fast')
      quickMenuToggleTxt.text('퀵 펼치기')
    }
  })
}()

// 상단으로 이동
function goTop() {
  $('html').animate({
    scrollTop: 0
  })
}