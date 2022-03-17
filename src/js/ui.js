// GNB활성화를
if (page == 'matching') {
  $('.gnbList__item').eq(0).addClass('active')
} else if (page == 'service') {
  $('.gnbList__item').eq(1).addClass('active')
} else if (page == 'event') {
  $('.gnbList__item').eq(2).addClass('active')
} else if (page == 'cs-center') {
  $('.gnbList__item').eq(3).addClass('active')
}

// 헤더
var headerEvt = function () {$()
  var header = $('.l-header')
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
function openModal(modalName) {
  console.log('openModal')
  $('html').addClass('ovh')
  $('.modal[data-modal="' + modalName + '"]').addClass('show')
  if (modalName == 'reception02') {
    $('.reception-form .form').css('overflow' , 'initial').css('overflow' , 'hidden')
  }
}

// 모달 닫기
function closeModal(modal) {
  $('.modal[data-modal=' + modal + ']').removeClass('show')
  if ($('.modal.show').length < 1) {
    $('html').removeClass('ovh')
  }
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

// textarea
$.fn.textArea = function () {
  var tAreaBody = []
  return this.each(function (i) {
    tAreaBody[i] = $(this)
    var textArea = tAreaBody[i].find('.textArea__text')
    var countChar = tAreaBody[i].find('.textArea__cntChar')
    var currentEl = countChar.find('.textArea__cntCurrent')
    var limitEl = countChar.find('.textArea__cntLimit')
    var limitNum = tAreaBody[i].data('limit')
    textArea.attr('maxlength', limitNum)
    limitEl.text(limitNum)
    textArea.on('keyup', function () {
      var textLeng = $(this).val().length
      currentEl.text(textLeng)
    })
  })
}

// formInp 
$.fn.formInpTxt = function () {
  var inpBody = Array
  return this.each(function (i) {
    inpBody[i] = $(this)
    var input = inpBody[i].children('.formInp__txt')
    var btnDel = inpBody[i].children('.js-del')
    input.on('keyup', function () {
      var txtLeng = $(this).val().length
      if (txtLeng > 0) {
        $(this).next('.formInp__del').show()
      } else {
        $(this).next('.formInp__del').hide()
      }
    })
  })
}

// 버튼 이벤트
// $.fn.buttonInnerAni = function () {
//   var curBtn = this
//   curBtn.on('hover', function () {
//     var parentOffset = $(this).offset(); 
   
//     var relX = e.pageX - parentOffset.left;
//     var relY = e.pageY - parentOffset.top;
//     $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
//     $(this).prev(".su_button_circle").removeClass("desplode-circle");
//     $(this).prev(".su_button_circle").addClass("explode-circle");
//   }, function () {
//     var parentOffset = $(this).offset(); 

//     var relX = e.pageX - parentOffset.left;
//     var relY = e.pageY - parentOffset.top;
//     $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
//     $(this).prev(".su_button_circle").removeClass("explode-circle");
//     $(this).prev(".su_button_circle").addClass("desplode-circle");
//   })
// }

// 플러그인 불러오기
function loadUi () {
  $('.btn-step-chg').btnAni();
  $('[data-chip="toggle"]').chipToggle()
  $('.c-scroll-bar').niceScroll();
  $('.textArea').textArea();
  $('.formInp').formInpTxt();
}
loadUi ()