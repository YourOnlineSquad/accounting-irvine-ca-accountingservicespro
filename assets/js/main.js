(function () {
  var nav = document.querySelector('.site-nav');
  if (!nav) return;

  var menuToggle = nav.querySelector('.menu-toggle');
  var navPanel = nav.querySelector('.nav-panel');
  var servicesItem = nav.querySelector('.nav-item-services');
  var servicesToggle = nav.querySelector('.services-toggle');
  var desktopQuery = window.matchMedia('(min-width: 48rem)');
  var servicesCloseTimer = null;
  var mobileQuery = window.matchMedia('(max-width: 47.99rem)');

  function setMenuOpen(isOpen) {
    if (!navPanel) return;
    navPanel.classList.toggle('is-open', isOpen);
    navPanel.setAttribute('aria-hidden', String(!isOpen));
    if (menuToggle) menuToggle.setAttribute('aria-expanded', String(isOpen));
    if (!isOpen) setServicesOpen(false);
  }

  function setServicesOpen(isOpen) {
    if (!servicesItem || !servicesToggle) return;
    servicesItem.classList.toggle('is-open', isOpen);
    servicesToggle.setAttribute('aria-expanded', String(isOpen));
  }

  function clearServicesCloseTimer() {
    if (!servicesCloseTimer) return;
    clearTimeout(servicesCloseTimer);
    servicesCloseTimer = null;
  }

  if (menuToggle && navPanel) {
    navPanel.setAttribute('aria-hidden', desktopQuery.matches ? 'false' : 'true');
    menuToggle.addEventListener('click', function () {
      var isOpen = !navPanel.classList.contains('is-open');
      setMenuOpen(isOpen);
    });
  }

  if (servicesItem && servicesToggle) {
    servicesToggle.addEventListener('click', function (event) {
      if (desktopQuery.matches) return;
      event.preventDefault();
      var servicesOpen = !servicesItem.classList.contains('is-open');
      setServicesOpen(servicesOpen);
    });

    servicesItem.addEventListener('mouseenter', function () {
      if (!desktopQuery.matches) return;
      clearServicesCloseTimer();
      setServicesOpen(true);
    });

    servicesItem.addEventListener('mouseleave', function () {
      if (!desktopQuery.matches) return;
      clearServicesCloseTimer();
      servicesCloseTimer = setTimeout(function () {
        setServicesOpen(false);
      }, 130);
    });

    servicesItem.addEventListener('focusin', function () {
      if (!desktopQuery.matches) return;
      clearServicesCloseTimer();
      setServicesOpen(true);
    });

    servicesItem.addEventListener('focusout', function () {
      if (!desktopQuery.matches) return;
      window.requestAnimationFrame(function () {
        if (servicesItem.contains(document.activeElement)) return;
        setServicesOpen(false);
      });
    });
  }


  if (navPanel) {
    navPanel.addEventListener('click', function (event) {
      if (desktopQuery.matches) return;
      var target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest('.nav-links a, .service-link')) return;
      setMenuOpen(false);
    });
  }

  document.addEventListener('click', function (event) {
    if (!mobileQuery.matches || !navPanel || !navPanel.classList.contains('is-open')) return;
    if (nav.contains(event.target)) return;
    setMenuOpen(false);
  });
  document.addEventListener('click', function (event) {
    if (!servicesItem || !desktopQuery.matches) return;
    if (servicesItem.contains(event.target)) return;
    setServicesOpen(false);
  });

  desktopQuery.addEventListener('change', function (event) {
    clearServicesCloseTimer();
    if (event.matches) {
      setMenuOpen(false);
      if (navPanel) navPanel.setAttribute('aria-hidden', 'false');
      return;
    }
    if (navPanel) navPanel.setAttribute('aria-hidden', 'true');
    setServicesOpen(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    setServicesOpen(false);
    setMenuOpen(false);
  });
})();
