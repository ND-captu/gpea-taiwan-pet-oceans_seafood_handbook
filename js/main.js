// fill utm fileds from qs
function getJsonFromUrl(url) {
  if (!url) url = location.search;
  var query = url.substr(1);
  var result = {};
  query.split('&').forEach(function (part) {
    var item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

var qsJSON = getJsonFromUrl(window.location.search);
var utmFields = [
  'UtmMedium',
  'UtmSource',
  'UtmCampaign',
  'UtmContent',
  'UtmTerm',
];
utmFields.forEach(function (item) {
  var mapkey = 'utm_' + item.split('Utm')[1].toLowerCase();
  if (qsJSON[mapkey]) $('#' + item).val(qsJSON[mapkey]);
  //console.log(item + ": " + $('#'+item).val())
});

var change_server = 'https://change.greenpeace.org.tw/2021/site/seafood/';

(() => {
  if (window.location.href.indexOf('utm_source=dd') >= 0) {
    let style = document.createElement('style');
    style.innerHTML = `.is-hidden-at-dd-page-only {
				display: none !important;
			}
			.is-shown-at-dd-page-only {
				display: block !important;
			}`;
    document.head.appendChild(style);

    if (document.querySelector('#MobilePhone'))
      document.querySelector('#MobilePhone').removeAttribute('required');
  } else {
    // not in the DD page
    let style = document.createElement('style');
    style.innerHTML = `
			.is-shown-at-dd-page-only {
				display: none !important;
			}`;
    document.head.appendChild(style);
  }
})();

/**
 * Call this function to remove the `required` Attribute of phone field from DD page.
 * So on the DD page, you don't need to fill in the phone field forcibly.
 * Expected parameter: the element Id of phone field.
 */
const phone_not_required = (elementId) => {
  if (window.location.href.indexOf('utm_source=dd') >= 0) {
    let element_id = elementId;
    if (element_id.indexOf('#') < 0) {
      element_id = '#' + element_id;
    }
    document.querySelector(element_id).removeAttribute('required');
  }
};

/**
 * Call this function to hide the donate button from DD page.
 * Expected parameter: the element Id of donate button.
 */
const hide_donate_btn = (elementId) => {
  if (window.location.href.indexOf('utm_source=dd') >= 0) {
    let element_id = elementId;
    if (element_id.indexOf('#') < 0) {
      element_id = '#' + element_id;
    }
    document.querySelector(element_id).style.display = 'none';
  }
};

/**
 * Call this function to generate QR cde on DD page.
 * It would generates the tp/tc/ks QR code according to the utm_content parameter of url, for example: xxx?XXX&utm_content=tp
 * Expected parameter: the element Id that can contain QR code.
 * For example: you have a div element on DD page: `<div id="QR-code-block"></div>`
 * and you can generate QR code in this div through calling this function: `line_QR_code('QR-code-block')`
 */
const line_QR_code = (elementId) => {
  if (window.location.href.indexOf('utm_source=dd') >= 0) {
    let line_block_id = elementId;

    if (line_block_id.indexOf('#') < 0) {
      line_block_id = '#' + line_block_id;
    }

    document.querySelector(
      line_block_id
    ).innerHTML = `<div class="line-div is-show-at-dd-page-only" style="text-align: center; margin: 1.5rem 0;">
				<div class="line-tp">
					<a href='http://act.gp/GPLINE_tp' target='_blank' style='color: #00c300; text-decoration: none;'>加入我們的 LINE 好友<br>
					<img src="https://change.greenpeace.org.tw/2021/petition/example/images/act.gp_GPLINE_tp.png" style="width:100%; max-width:256px;" /></a>
				</div>
				<div class="line-tc">
					<a href='http://act.gp/GPLINE_tc' target='_blank' style='color: #00c300; text-decoration: none;'>加入我們的 LINE 好友<br>
					<img src="https://change.greenpeace.org.tw/2021/petition/example/images/act.gp_GPLINE_tc.png" style="width:100%; max-width:256px;" /></a>
				</div>
				<div class="line-ks">
					<a href='http://act.gp/GPLINE_ks' target='_blank' style='color: #00c300; text-decoration: none;'>加入我們的 LINE 好友<br>
					<img src="https://change.greenpeace.org.tw/2021/petition/example/images/act.gp_GPLINE_ks.png" style="width:100%; max-width:256px;" /></a>
				</div>
			</div>`;

    if (window.location.href.indexOf('utm_content=tp') >= 0) {
      document.querySelector('.line-tp').style.display = 'block';
      document.querySelector('.line-tc').style.display = 'none';
      document.querySelector('.line-ks').style.display = 'none';
    } else if (window.location.href.indexOf('utm_content=tc')) {
      document.querySelector('.line-tp').style.display = 'none';
      document.querySelector('.line-tc').style.display = 'block';
      document.querySelector('.line-ks').style.display = 'none';
    } else {
      document.querySelector('.line-tp').style.display = 'none';
      document.querySelector('.line-tc').style.display = 'none';
      document.querySelector('.line-ks').style.display = 'block';
    }
  }
};

$(document).ready(function () {
  AOS.init({
    duration: 600,
    easing: 'ease-out',
    anchorPlacement: 'top-center',
  });
  var kvslider;
  var formboxslider;
  var donateslider;
  var slider;
  var swipersetting = {
    effect: 'fade',
    speed: 500,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // loop: true
  };

  kvslider = new Swiper('#kvSlider', swipersetting);
  formboxslider1 = new Swiper('#formboxSlider1', swipersetting);
  formboxslider2 = new Swiper('#formboxSlider2', swipersetting);
  donateslider = new Swiper('#donateSlider', swipersetting);
  slider = new Swiper('#manualSlider', swipersetting);

  $('.submit-btn').on('click', function (e) {
    e.preventDefault();
    //openBox("#thanksBox")
    signSubmit();
  });

  $(
    '#kvSlider [data-preview], #formboxSlider1 [data-preview], #formboxSlider2 [data-preview]'
  ).on('click', function (e) {
    e.preventDefault();
    openPreviewKv($(this).attr('data-preview'));
  });
  $('#donateSlider [data-preview]').on('click', function (e) {
    e.preventDefault();
    openPreviewDonate($(this).attr('data-preview'));
  });
  $('#manualSlider [data-preview]').on('click', function (e) {
    e.preventDefault();
    openPreview($(this).attr('data-preview'));
  });
  $('[data-box]').on('click', function (e) {
    e.preventDefault();
    openBox('#' + $(this).attr('data-box'));
  });

  $(
    '#formBox .box__close, #formBox .box__cover, #thanksBox .box__close, #thanksBox .box__cover'
  ).on('click', function (e) {
    e.preventDefault();
    closeBoxFrame();
  });
  $('#previewBox .box__close, #previewBox .box__cover').on(
    'click',
    function (e) {
      e.preventDefault();
      closeBox();
    }
  );

  function openPreviewKv(page) {
    $('.previewbox__frame').attr(
      'class',
      'previewbox__frame previewbox__frame--' + page
    );
    $('.previewbox__pic').attr(
      'src',
      change_server + 'images/kvslider-' + page + '.jpg'
    );

    $('#previewBox').fadeIn();
    $('.previewbox__container').scrollTop(0);
    $('.previewbox__container').scrollLeft(0);
    $('body').addClass('noscroll');
  }
  function openPreviewDonate(page) {
    $('.previewbox__frame').attr(
      'class',
      'previewbox__frame previewbox__frame--' + page
    );
    $('.previewbox__pic').attr(
      'src',
      change_server + 'images/donateslider-' + page + '.png'
    );

    $('#previewBox').fadeIn();
    $('.previewbox__container').scrollTop(0);
    $('.previewbox__container').scrollLeft(0);
    $('body').addClass('noscroll');
  }
  function openPreview(page) {
    $('.previewbox__frame').attr(
      'class',
      'previewbox__frame previewbox__frame--' + page
    );
    $('.previewbox__pic').attr(
      'src',
      change_server + 'images/slider-' + page + '.jpg'
    );

    $('#previewBox').fadeIn();
    $('.previewbox__container').scrollTop(0);
    $('.previewbox__container').scrollLeft(0);
    $('body').addClass('noscroll');
  }

  function closeBoxFrame() {
    $('.box--frame').fadeOut();
    $('body').removeClass('noscroll');
  }
  function closeBox() {
    $('.box--preview').fadeOut();
    $('body').removeClass('noscroll');
  }

  function openBox(boxid) {
    $(boxid).fadeIn(400, function () {
      formboxslider1 = new Swiper('#formboxSlider1', swipersetting);
      formboxslider2 = new Swiper('#formboxSlider2', swipersetting);
      donateslider = new Swiper('#donateSlider', swipersetting);
    });
    $('#formBox .formbox__inner, #thanksBox .formbox__inner').scrollTop(0);
    $('body').addClass('noscroll');
  }

  var ps = new PerfectScrollbar('#formBox .formbox__inner', {
    wheelPropagation: false,
    suppressScrollX: true,
    maxScrollbarLength: 100,
  });
  var ps2 = new PerfectScrollbar('#thanksBox .formbox__inner', {
    wheelPropagation: false,
    suppressScrollX: true,
    maxScrollbarLength: 100,
  });

  $('.form__select')
    .on('change', function () {
      var newVal = $(this).find(':selected').text();
      $('.form__select-val').text(newVal);
    })
    .trigger('change');

  checkEmail();

  // $('#formBox input, #formBox select').on('change', function(){
  //   checkInput();
  // });
  $('#formBox input, #formBox select').on('focus', function (e) {
    $(this).next('.error-message').remove();
  });

  // create the year options
  let currYear = new Date().getFullYear();
  for (var i = 0; i < 100; i++) {
    let option = `<option value="${currYear - i}-01-01">${
      currYear - i
    }</option>`;
    let obj = document.getElementById('Birthdate');
    obj.add(new Option(currYear - i, `${currYear - i}-01-01`));
  }

  // form

  var phonePlaceText = $('#MobilePhone').attr('placeholder');

  function checkInput() {
    //console.log('checkInput');
    $('.error-message').remove();
    let pass = true;

    if (!LastName.value) {
      pass = false;
      $(`<span class="error-message">必填欄位</span>`).insertAfter('#LastName');
    } else if (
      !/^[\u4e00-\u9fa5_a-zA-Z_ ]{1,40}$/i.test(LastName.value) ||
      !/^[\u4e00-\u9fa5_a-zA-Z_ ]{1,40}$/i.test(LastName.value)
    ) {
      pass = false;
      $(`<span class="error-message">請不要輸入數字或符號</span>`).insertAfter(
        '#LastName'
      );
    }

    if (!FirstName.value) {
      pass = false;
      $(`<span class="error-message">必填欄位</span>`).insertAfter(
        '#FirstName'
      );
    } else if (
      !/^[\u4e00-\u9fa5_a-zA-Z_ ]{1,40}$/i.test(FirstName.value) ||
      !/^[\u4e00-\u9fa5_a-zA-Z_ ]{1,40}$/i.test(LastName.value)
    ) {
      pass = false;
      $(`<span class="error-message">請不要輸入數字或符號</span>`).insertAfter(
        '#FirstName'
      );
    }

    if (!Email.value) {
      pass = false;
      $(
        `<span class="error-message email-error-message">必填欄位</span>`
      ).insertAfter('#Email');
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/i.test(
        Email.value
      )
    ) {
      pass = false;
      $(
        `<span class="error-message email-error-message">Email 格式錯誤</span>`
      ).insertAfter('#Email');
    }

    if (
      !MobilePhone.value &&
      window.location.href.indexOf('utm_source=dd') < 0
    ) {
      pass = false;
      $(`<span class="error-message">必填欄位</span>`).insertAfter(
        '#MobilePhone'
      );
    } else if (
      MobilePhone.value &&
      !/^(0|886|\+886)?(9\d{8})$/.test(MobilePhone.value)
      // && !/^(0|886|\+886){1}[3-8]-?\d{6,8}$/.test(MobilePhone.value) &&
      // !/^(0|886|\+886){1}[2]-?\d{8}$/.test(MobilePhone.value)
    ) {
      pass = false;
      $(
        `<span class="error-message">請填手機號碼，確保接收專案相關通知</span>`
      ).insertAfter('#MobilePhone');
    }
    if ($('#MobilePhone').next('.error-message')) {
      $('#MobilePhone').attr('placeholder', '');
    } else {
      $('#MobilePhone').attr('placeholder', phonePlaceText);
    }

    if (Birthdate.value == '') {
      pass = false;
      $(`<span class="error-message">必填欄位</span>`).insertAfter(
        '#Birthdate'
      );
      $('.form__select-val').text('');
    } else {
      $('#Birthdate').trigger('change');
    }
    if (!pass) {
      $('.error-message').siblings('input').val('');
    }
    return pass;
  }

  function checkEmail() {
    let domains = [
      'me.com',
      'outlook.com',
      'netvigator.com',
      'cloud.com',
      'live.hk',
      'msn.com',
      'gmail.com',
      'hotmail.com',
      'ymail.com',
      'yahoo.com',
      'yahoo.com.tw',
      'yahoo.com.hk',
    ];
    let topLevelDomains = ['com', 'net', 'org'];
    let email = document.getElementById('Email');

    email.onblur = function () {
      if (!document.getElementById('email-suggestion')) {
        Mailcheck.run({
          email: email.value,
          domains: domains, // optional
          topLevelDomains: topLevelDomains, // optional
          suggested: function (suggestion) {
            email.insertAdjacentHTML(
              'afterend',
              `<div class="suggestion" id="email-suggestion">您想輸入的是 <strong id="emailSuggestion">${suggestion.full}</strong> 嗎？</div>`
            );

            document
              .querySelectorAll('.email-error-message')
              .forEach((elem) => elem.remove());
            setTimeout(function () {
              $('#email-suggestion').fadeOut(function () {
                $('#email-suggestion').remove();
              });
            }, 3000);
            document.getElementById('email-suggestion').onclick = function () {
              email.value =
                document.getElementById('emailSuggestion').innerText;
              document.getElementById('email-suggestion').remove();
            };
          },
          empty: function () {
            this.emailSuggestion = null;
          },
        });
      }
    };
  }

  function showFullPageLoading() {
    if (!document.querySelector('#page-loading')) {
      document.querySelector('body').insertAdjacentHTML(
        'beforeend',
        `
      <div id="page-loading" class="hide">
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>`
      );
    }

    setTimeout(() => {
      // to enable the transition
      document.querySelector('#page-loading').classList.remove('hide');
    }, 0);
  }
  const hideFullPageLoading = () => {
    document.querySelector('#page-loading').classList.add('hide');

    setTimeout(() => {
      document.querySelector('#page-loading').remove();
    }, 1100);
  };

  const sendPetitionTracking = (eventLabel, eventValue) => {
    console.log('sPT');
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: 'gaEvent',
      eventCategory: 'petitions',
      eventAction: 'signup',
      eventLabel: eventLabel,
      eventValue: eventValue,
    });

    window.dataLayer.push({
      event: 'fbqEvent',
      contentName: eventLabel,
      contentCategory: 'Petition Signup',
    });
  };

  function signSubmit() {
    if (!$('#privacy').prop('checked')) {
      alert(
        '永續海鮮選購手冊PDF將寄發至您的電子郵件，如需索取手冊，請務必勾選此選項。'
      );
      return;
    }
    if (!checkInput()) return;

    if (
      window.location.href.indexOf('demo') >= 0 ||
      window.location.href.indexOf('localhost') >= 0
    ) {
      closeBox();
      openBox('#thanksBox');
      return;
    }

    showFullPageLoading();
    let formData = new FormData();
    document
      .querySelectorAll('#sign-form input,select')
      .forEach(function (el, idx) {
        let v = null;
        if (el.type === 'checkbox') {
          v = el.checked;
        } else {
          v = el.value;
        }

        formData.append(el.name, v);
        //console.log("Use", el.name, v);
      });
    formData.append('city', $('#selectArea :selected').text());
    formData.append('CampaignData1__c', $('#selectArea :selected').text());

    fetch(document.querySelector('#sign-form').action, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response) {
          //console.log(response);
          // add tracking code here
          sendPetitionTracking('2021-cwf_handbook');

          closeBox();
          openBox('#thanksBox');

          //console.log(response)
        }
        hideFullPageLoading();
      })
      .catch((error) => {
        console.log(error);
        hideFullPageLoading();
        // display the error message
      });
  }
  var shareUrl = window.location.href.split('?')[0];
  $('#shareFB').attr(
    'href',
    'https://www.facebook.com/sharer/sharer.php?u=' + shareUrl
  );

  phone_not_required();
  hide_donate_btn('donate');
  //line_QR_code()
});
