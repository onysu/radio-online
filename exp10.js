jQuery(document).ready(function ($) {
  // Deteksi Jika Browser adalah IE
  function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf("MSIE ");
    if (msie > 0) {
      // IE 10 atau lebih tua => kembali ke nomor versi 
      return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    }

    var trident = ua.indexOf("Trident/");
    if (trident > 0) {
      // IE 11 => kembali ke nomor versi 
      var rv = ua.indexOf("rv:");
      return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
    }

    var edge = ua.indexOf("Edge/");
    if (edge > 0) {
      // Edge (IE 12+) => mengembalikan nomor versi
      return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
    }

    // browser lain
    return false;
  }

  var version = detectIE();

  // Fungsi Slider
  var slideCount = $(".radio-slide-logo ul li").length;
  if (version > 0) {
    var slideWidth = $(".radio-slide-logo ul li img").width() + 80;
  } else {
    var slideWidth = $(".radio-slide-logo ul li").width() + 80;
  }
  var slideHeight = $(".radio-slide-logo").height();
  var sliderUlWidth = slideCount * slideWidth;

  $(".radio-slide-logo .slide-wrap").css({
    width: slideWidth - 80,
    height: slideHeight
  });

  $(".radio-slide-logo ul").css({
    width: sliderUlWidth,
    marginLeft: -slideWidth - 40,
    height: slideHeight
  });

  $(".radio-slide-logo ul li:last-child").prependTo(".radio-slide-logo ul");

  // Tambahkan kelas aktif untuk slide sebelumnya
  function prevSlide() {
    // Slide Utama
    var active = $(".radio-slide-logo ul li.active").removeClass("active");
    if (active.prev() && active.prev().length) {
      active.prev().addClass("active");
    } else {
      active.siblings(":first").addClass("active");
    }

    // Ikon Tuner
    var activeTuner = $("ul.radio-clients li.active").removeClass("active");
    if (activeTuner.prev() && activeTuner.prev().length) {
      activeTuner.prev().addClass("active");
    } else {
      activeTuner.siblings(":last").addClass("active");
    }
  }

  // Tambahkan kelas aktif untuk slide berikutnya
  function nextSlide() {
    // Slide Utama
    var active = $(".radio-slide-logo ul li.active").removeClass("active");
    if (active.next() && active.next().length) {
      active.next().addClass("active");
    } else {
      active.siblings(":first").addClass("active");
    }

    // Ikon Tuner
    var activeTuner = $("ul.radio-clients li.active").removeClass("active");
    if (activeTuner.next() && activeTuner.next().length) {
      activeTuner.next().addClass("active");
    } else {
      activeTuner.siblings(":first").addClass("active");
    }
  }

  // Pindah ke slide sebelumnya
  function moveLeft() {
    $(".radio-slide-logo ul").animate({
        left: +slideWidth
      },
      400,
      function () {
        $(".radio-slide-logo ul li:last-child").prependTo(
          ".radio-slide-logo ul"
        );
        $(".radio-slide-logo ul").css("left", "");
      }
    );
  }

  // Pindah ke slide berikutnya
  function moveRight() {
    $(".radio-slide-logo ul").animate({
        left: -slideWidth
      },
      400,
      function () {
        $(".radio-slide-logo ul li:first-child").appendTo(
          ".radio-slide-logo ul"
        );
        $(".radio-slide-logo ul").css("left", "");
      }
    );
  }

  // Tukar sumber audio
  function audioSource() {
    var audioPlayer = $(".radio-play-btn .music");
    var currentAudio = $(".radio-slide-logo li.active").data("audio-src");
    audioPlayer.attr("src", currentAudio);
  }

  // Tukar teks slide
  function slideText() {
    var slideTitle = $(".radio-slide-logo li.active").data("title");
    var slideDescription = $(".radio-slide-logo li.active").data("description");
    var slideLink = $(".radio-slide-logo li.active").data("link");
    var currentTitle = $(".radio-slide-content .radio-slide-title");
    var currentDescription = $(".radio-slide-content p");
    var currentLink = $(".radio-slide-content a");

    currentTitle.text(slideTitle);
    currentDescription.text(slideDescription);
    currentLink.attr("href", slideLink);
  }

  slideText();

  // Sesuaikan ketinggian konten slide
  function slideContentHeight() {
    var contentHeight = $(".active-content").height();
    $(".radio-slide-content").css("height", contentHeight + 25);
  }

  // slideContentHeight();

  // Reposisi turner tergantung pada slide aktif
  if ($("body").hasClass("home")) {
    function tunerDial() {
      var tunerOffset = $(".radio-clients li.active").offset();
      var tunerLeft = tunerOffset.left;
      var tunerWidth = $(".radio-clients li.active").width();
      var containerOffset = $(".radio-tuner").offset();
      var containerLeft = containerOffset.left;
      var tunerMath = tunerWidth / 2 + tunerLeft - containerLeft + 10;
      var tunerPosition = Math.round(tunerMath);
      $(".tuner-dial").css("left", tunerPosition + "px");
    }

    // Perbarui posisi tuner
    $(function () {
      setInterval(function () {
        tunerDial();
      }, 0);
    });
  }

  // Lebar Slider Responsif
  $(window).resize(function () {
    var slideCount = $(".radio-slide-logo ul li").length;
    var slideWidth = $(".radio-slide-logo ul li").width() + 80;
    var slideHeight = $(".radio-slide-logo").height();
    var sliderUlWidth = slideCount * slideWidth;

    $(".radio-slide-logo .slide-wrap").css({
      width: slideWidth - 80,
      height: slideHeight
    });

    $(".radio-slide-logo ul").css({
      width: sliderUlWidth,
      marginLeft: -slideWidth - 40,
      height: slideHeight
    });
  });

  // Fungsi Audio Halaman Beranda
  $(".radio-play-btn i").on("click", function () {
    var currentPlayer = $(".radio-play-btn").find(".music")[0];

    if (currentPlayer.paused == false) {
      currentPlayer.pause();
      $(".radio-play-btn i").addClass("fa-play");
      $(".radio-play-btn").find(".fa-play.fa-pause").removeClass("fa-pause");
    } else {
      var sounds = document.getElementsByTagName("audio");
      for (i = 0; i < sounds.length; i++) sounds[i].pause();
      $(".fa-pause").addClass("fa-play");
      $(".fa-play.fa-pause").removeClass("fa-pause");

      currentPlayer.play();
      $(".radio-play-btn").find(".fa-play").addClass("fa-pause");
      $(".radio-play-btn").find(".fa-play.fa-pause").removeClass("fa-play");
    }

    // Remove Play Button On Audio End
    currentPlayer.onended = function () {
      $(".fa-pause").addClass("fa-play");
      $(".fa-play.fa-pause").removeClass("fa-pause");
    };
  });

  // Audio Autoplay
  function autoPlay() {
    var currentPlayer = $(".radio-play-btn").find(".music")[0];
    if ($(".radio-play-btn i").hasClass("fa-pause")) {
      currentPlayer.play();
    }
  }

  // Setel ulang kelas tombol putar
  function playReset() {
    $(".radio-play-btn i").addClass("fa-play");
    $(".radio-play-btn").find(".fa-play.fa-pause").removeClass("fa-pause");
  }

  // Tombol sebelumnya
  $(".radio-nav-previous").click(function () {
    prevSlide();
    audioSource();
    //playReset();
    slideText();
    //slideContentHeight();
    moveLeft();
    autoPlay();
  });

  // Tombol berikutnya
  $(".radio-nav-next").click(function () {
    nextSlide();
    audioSource();
    //playReset();
    slideText();
    //slideContentHeight();
    moveRight();
    autoPlay();
  });

  // Siklus Otomatis Melalui Slide
  var timer;

  $(".radio-slider").mouseenter(function () {
    if (timer) {
      clearInterval(timer);
    }
  });
  $(".radio-slider").mouseleave(function () {
    timer = setInterval(function () {
      if ($(".radio-play-btn i").hasClass("fa-play")) {
        nextSlide();
        audioSource();
        slideText();
        moveRight();
        autoPlay();
      }
    }, 10000);
  });
});