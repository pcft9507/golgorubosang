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
function openModal(modalName) {
  console.log('openModal')
  $('.modal[data-modal="' + modalName + '"]').show()
}

// 모달 닫기
function closeModal(modal) {
  $('.modal[data-modal=' + modal + ']').hide()
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

// 사진 첨부
$.fn.attachPhoto = function () {
  return this.each(function (i) {
    var attachPhoto = []
    attachPhoto[i] = $(this)
    var files
    var inpFile = attachPhoto[i].find('.js-file')
    var btnAttach = attachPhoto[i].find('.attachPhoto__add')
    var btnDel = attachPhoto[i].find('.js-delete')
    var dropArea = attachPhoto[i].find('.attachPhoto__dropArea')
    var fileList = attachPhoto[i].find('.fileList')
    var fileListRow = attachPhoto[i].find('.fileList__row')

    // 파일첨부 버튼
    btnAttach.on('click', function () {
      console.log('file attach')
      inpFile.click()
    })
    // 드래그 이벤트
    dropArea.on('dragover drop', function (e) {
      console.log('dragover drop')
      e.preventDefault();
    })

    // 리스트에서 파일 삭제
    $(document).on('click', '.js-delete', function () {
      console.log('file delete')
      var curIdx = $(this).parents('.fileList__row').index()
      console.log(files[curIdx])
      files.splice(curIdx, 1)
      fileRefresh ()
    })

    // file 업로드 이벤트
    inpFile.on('change', function () {
      console.log('file change')
      fileRefresh ()
    })

    function fileRefresh () {
      files = inpFile.get(0).files;
      var file;
      for (var i = 0; i < files.length; i++) {
        file = files[i];
        fileList.append(`<li class="fileList__row">
          <span class="fileList__name">` + file.name + `</span>
          <button type="button" class="fileList__del js-delete">
            <span class="is-blind">삭제</span>
          </button>
        </li>`)
        console.log(file.name);
      }
    }
  })
}

// 플러그인 불러오기
function loadUi () {
  $('.btn-step-chg').btnAni();
  $('[data-chip="toggle"]').chipToggle()
  $('.c-scroll-bar').niceScroll();
  $('.textArea').textArea();
  $('.attachPhoto').attachPhoto();
}
loadUi ()