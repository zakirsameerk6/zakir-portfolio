(function ($) {
  'use strict';

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($('#spinner').length > 0) {
        $('#spinner').removeClass('show');
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();


  // Smooth scrolling on the navbar links
  $('.navbar-nav a').on('click', function (event) {
    if (this.hash !== '') {
      event.preventDefault();

      $('html, body').animate(
        {
          scrollTop: $(this.hash).offset().top - 45,
        },
        1500,
        'easeInOutExpo'
      );

      if ($(this).parents('.navbar-nav').length) {
        $('.navbar-nav .active').removeClass('active');
        $(this).closest('a').addClass('active');
      }
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });

  // Typed Initiate
  if ($('.typed-text-output').length == 1) {
    var typed_strings = $('.typed-text').text();
    var typed = new Typed('.typed-text-output', {
      strings: typed_strings.split(', '),
      typeSpeed: 100,
      backSpeed: 20,
      smartBackspace: false,
      loop: true,
    });
  }



  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Skills
  $('.skill').waypoint(
    function () {
      $('.progress .progress-bar').each(function () {
        $(this).css('width', $(this).attr('aria-valuenow') + '%');
      });
    },
    { offset: '80%' }
  );

  // Portfolio isotope and filter
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows',
  });
  $('#portfolio-flters li').on('click', function () {
    $('#portfolio-flters li').removeClass('active');
    $(this).addClass('active');

    portfolioIsotope.isotope({ filter: $(this).data('filter') });
  });

  // Testimonials carousel
  $('.testimonial-carousel').owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    dots: true,
    loop: true,
  });
})(jQuery);

//------------send massage on email------------------------------------------
document
  .getElementById('contact-form')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const notification = document.getElementById('notification');

        if (data.success) {
          // Show success notification
          notification.textContent = 'Message sent successfully!';
          notification.className = 'alert alert-success';
          notification.style.display = 'block';

          // Hide notification after 5 seconds
          setTimeout(() => (notification.style.display = 'none'), 5000);

          // Clear the form fields
          document.getElementById('contact-form').reset();
        } else {
          // Show error notification
          notification.textContent = 'Error: ' + data.message;
          notification.className = 'alert alert-danger';
          notification.style.display = 'block';

          // Hide notification after 5 seconds
          setTimeout(() => (notification.style.display = 'none'), 5000);
        }
      })
      .catch((error) => {
        const notification = document.getElementById('notification');
        notification.textContent = 'Error: ' + error.message;
        notification.className = 'alert alert-danger';
        notification.style.display = 'block';

        // Hide notification after 5 seconds
        setTimeout(() => (notification.style.display = 'none'), 5000);
      });
  });





// Close mobile navbar when clicking anywhere outside the navbar
document.addEventListener("click", function (event) {
    const navbar = document.querySelector(".navbar");
    const navbarCollapse = document.getElementById("navbarCollapse");
    const navbarToggler = document.querySelector(".navbar-toggler");

    if (
        window.innerWidth < 992 &&
        navbarCollapse.classList.contains("show") &&
        !navbar.contains(event.target)
    ) {
        const bsCollapse =
            bootstrap.Collapse.getInstance(navbarCollapse) ||
            new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });

        bsCollapse.hide();
    }
});