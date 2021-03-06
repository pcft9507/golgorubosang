// GNB활성화
if (typeof page != 'undefined') {
  if (page == 'matching') {
    $('.gnbList__item').eq(0).addClass('active')
  } else if (page == 'about') {
    $('.gnbList__item').eq(1).addClass('active')
  } else if (page == 'event') {
    $('.gnbList__item').eq(2).addClass('active')
  } else if (page == 'cs') {
    $('.gnbList__item').eq(3).addClass('active')
  }
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
  // 병원찾기 모달일 경우는 지도보기 동적 생성
  if (modalName == 'hospital') {
    createMap ('hospital-map', '.modal-hospital .hospital-addr', '.modal-hospital .hospital-name')
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
    var chipBtnDel = chipWrap[i].find('.chip__del')
    chipBtn.on('click', function (e) {
      e.preventDefault()
      $(this).toggleClass('checked')
    })
    chipBtnDel.on('click', function (e) {
      e.stopPropagation()
      $(this).parents('.chipList__item').remove()
      chipDel ()
    })

    function chipDel () {
      console.log('삭제')
    }
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

// 손해사 매칭 키워드 검색
$.fn.matchingSch = function () {
  var schBody = this
  var inpTxt = schBody.find('.matchingSch__inpTxt')
  var inpDel = schBody.find('.js-del')
  var submit = schBody.find('.matchingSch__submit')
  inpTxt.on('focus', function () {
    schBody.addClass('focus')
  })
  inpTxt.on('blur', function () {
    schBody.removeClass('focus')
  })
  inpTxt.on('keyup', function () {
    var thisVal = $(this).val()
    if (thisVal.length > 0) {
      inpDel.show()
    } else {
      inpDel.hide()
    }
  })
  inpDel.on('click', function () {
    inpTxt.val('')
    inpDel.hide()
  })
  submit.on('click', function () {
    console.log('키워드 검색 submit')
  })
}

// 드롭메뉴
$.fn.dropMenu = function () {
  var dropBody = Array
  return this.each(function (i) {
    dropBody[i] = $(this)
    var openBtn = dropBody[i].find('.js-open')
    var selectedTxt = dropBody[i].find('.dropMenu__txt')
    var dropList = dropBody[i].find('.dropMenu__list')
    var selBtn = dropBody[i].find('.js-select')
    openBtn.on('click', function (e) {
      e.preventDefault()
      dropList.slideDown('fast')
      // 손해사 매칭 검색 드롭메뉴일 경우
      if (dropBody[i].hasClass('matching-ctr')) {
        dropBody[i].parent().addClass('matchingSch--drop-menu')
      }
    })
    openBtn.blur(function () {
      setTimeout(function () {
        dropList.slideUp('fast')
        // 손해사 매칭 검색 드롭메뉴일 경우
        if (dropBody[i].hasClass('matching-ctr')) {
          dropBody[i].parent().removeClass('matchingSch--drop-menu')
        }
      }, 100)
    })
    selBtn.on('click', function (e) {
      e.preventDefault()
      selBtn.removeClass('selected')
      $(this).addClass('selected')
      var text = $(this).children().text()
      selectedTxt.text(text)
      dropList.slideUp('fast')
      dropBody[i].attr('data-value', text)
      // 손해사 매칭 검색 드롭메뉴일 경우
      if (dropBody[i].hasClass('matching-ctr')) {
        dropBody[i].parent().removeClass('matchingSch--drop-menu')
      }
    })
  })
}

// 텍스트 클립보드 복사
function copyText(element){
  var content = $(element).text()
  navigator.clipboard.writeText(content)
    .then(() => {
    console.log("복사성공")
  })
    .catch(err => {
    console.log('복사실패', err);
  })
  alert('복사되었습니다.')
}

// 서브 상단탭
var fixedTab = function () {
  var fixedTab = $('.fixedTab')
  $(window).on('scroll', function () {
    var scTop = $(this).scrollTop()
    // console.log('scroll top', scTop)
    if (scTop > 0) {
      fixedTab.addClass('scrolled')
    } else {
      fixedTab.removeClass('scrolled')
    }
  })
}()

// 중간 요소 고정 상단탭
var staticFixedTab = function () {
  var staticFixedTab = $('.staticFixedTab')
  var posY = staticFixedTab.offset().top
  var headerH = $('header').height()
  console.log('posy', posY)
  $(window).on('scroll', function () {
    var scTop = $(this).scrollTop()
    console.log('scroll top', scTop)
    if (scTop > (posY - headerH)) {
      staticFixedTab.removeClass('static')
    } else {
      staticFixedTab.addClass('static')
    }
  })
}

// 게시판 리스트 
$.fn.boardList = function () {
  var listBody = []
  return this.each(function (i) {
    listBody[i] = $(this)
    var btnOpen = listBody[i].find('.js-board-open')
    var btnClose = listBody[i].find('.js-board-close')
    btnOpen.on('click', function () {
      $(this).parent().addClass('open')
    })
    btnClose.on('click', function (e) {
      e.stopPropagation();
      $(this).parents('.boardList__row').removeClass('open')
    })
  })
}

// 카카오지도
function createMap (mapEl, addr, infoWindow) {
  // 지도 실행 스크립트
  var mapContainer = document.getElementById(mapEl), // 지도를 표시할 div 
  mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표 아무곳이든 필수입력
    level: 4 // 지도의 확대 레벨
  };  

  // 도로명주소 - 데이터를 변수에 대입해도 됩니다.
  // const address = some data
  const address = $(addr).text()

  // 손해사정사 이름 - 데이터를 변수에 대입해도 됩니다.
  // const agentName = some data
  const infoName = $(infoWindow).text()

  // 지도를 생성합니다    
  var map = new kakao.maps.Map(mapContainer, mapOption); 

  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(address, function(result, status) {
    // 정상적으로 검색이 완료됐으면 
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      // 결과값으로 받은 위치를 마커로 표시합니다
      var marker = new kakao.maps.Marker({
          map: map,
          position: coords
      });
      // 인포윈도우로 장소에 대한 설명을 표시합니다 (필요한 경우에만)
      var infowindow = new kakao.maps.InfoWindow({
          content: '<div class="info-window d-flex-c-c">' + infoName + ' </div>'
      });
      infowindow.open(map, marker);
      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      map.setCenter(coords);
    } 
  });      
}

// 플러그인 불러오기
function loadUi () {
  $('.btn-step-chg').btnAni();
  $('[data-chip="toggle"]').chipToggle()
  $('.c-scroll-bar').niceScroll({
    cursorcolor: "#bec2c7",
  });
  $('.textArea').textArea();
  $('.formInp').formInpTxt();
  $('.dropMenu').dropMenu();
  $('.matchingSch').matchingSch();
  $('.boardList').boardList();
  if ($('.staticFixedTab').length > 0) {
    staticFixedTab()
  }
}
loadUi ()