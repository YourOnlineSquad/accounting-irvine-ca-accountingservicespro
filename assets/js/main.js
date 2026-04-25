(function () {
  var nav = document.querySelector('.site-nav');
  if (!nav) return;

  var menuToggle = nav.querySelector('.menu-toggle');
  var navPanel = nav.querySelector('.nav-panel');
  var servicesItem = nav.querySelector('.nav-item-services');
  var servicesToggle = nav.querySelector('.services-toggle');

  if (menuToggle && navPanel) {
    menuToggle.addEventListener('click', function () {
      var isOpen = navPanel.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      if (!isOpen && servicesItem) {
        servicesItem.classList.remove('is-open');
        if (servicesToggle) servicesToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (servicesItem && servicesToggle) {
    servicesToggle.addEventListener('click', function () {
      if (window.matchMedia('(min-width: 48rem)').matches) return;
      var servicesOpen = servicesItem.classList.toggle('is-open');
      servicesToggle.setAttribute('aria-expanded', String(servicesOpen));
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (servicesItem) {
      servicesItem.classList.remove('is-open');
      if (servicesToggle) servicesToggle.setAttribute('aria-expanded', 'false');
    }
    if (navPanel) {
      navPanel.classList.remove('is-open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
