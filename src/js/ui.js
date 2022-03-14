// 헤더
var headerEvt = function () {$()
  var header = $('.header')
  $(window).on('scroll', function () {
    var scTop = $(this).scrollTop()
    // console.log('scroll top', scTop)
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

// 버튼 텍스트 애니효과
$.fn.btnAni = function () {
  var thisBtn = document.querySelectorAll('.btn-step-chg')
  thisBtn
  .forEach(button => button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>');
}

// 모달 열기
function openModal(modalPage) {
  $('.wrap').append('<div class="modal" data-modal="' + modalPage + '"></div>')
  $('.modal').load('../html/modal/' + modalPage + '.html', function () {
    loadUi ()
  })
}

// 모달 닫기
function closeModal(modal) {
  $('.modal[data-modal=' + modal + ']').remove()
}

// 칩 토글
$.fn.chipToggle = function () {
  var chipWrap = []
  return this.each(function (i) {
    chipWrap[i] = $(this)
    var chipBtn = chipWrap[i].find('.chip')
    chipBtn.on('click', function (e) {
      e.preventDefault()
      $(this).toggleClass('checked')
    })
  })
}

// 플러그인 불러오기
function loadUi () {
  $('.btn-step-chg').btnAni();
  $('[data-chip="toggle"]').chipToggle()
  $('.c-scroll-bar').niceScroll();
}
loadUi ()