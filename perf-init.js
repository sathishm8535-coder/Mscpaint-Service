// Deferred non-critical library initialization
(function () {
  function onIdle(fn) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(fn, { timeout: 2000 });
    } else {
      setTimeout(fn, 200);
    }
  }

  function initAOS() {
    if (window.__aosReady || typeof AOS === 'undefined') return;
    window.__aosReady = true;
    try {
      AOS.init({
        duration: 700,
        once: true,
        offset: 80,
        disable: function () { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
      });
    } catch (_) {}
  }

  function initLightGallery() {
    if (window.__lgReady || typeof lightGallery === 'undefined') return;
    var grid = document.querySelector('.projects-grid');
    if (!grid) return;
    window.__lgReady = true;
    try {
      lightGallery(grid, { selector: '.project-link' });
    } catch (_) {}
  }

  function initEmail() {
    if (window.__emailReady || typeof emailjs === 'undefined' || !emailjs.init) return;
    window.__emailReady = true;
    try { emailjs.init({ publicKey: 'yiMzeSr04gqEy48ou' }); } catch (_) {}
  }

  function observeAndInit() {
    initEmail();
    if (!('IntersectionObserver' in window)) {
      initAOS();
      initLightGallery();
      return;
    }
    var aosTargets = document.querySelector('[data-aos]');
    if (aosTargets) {
      var aosObserver = new IntersectionObserver(function (entries, obs) {
        if (entries.some(function (e) { return e.isIntersecting; })) {
          initAOS();
          obs.disconnect();
        }
      }, { rootMargin: '200px 0px' });
      aosObserver.observe(aosTargets);
    } else {
      initAOS();
    }

    var projects = document.querySelector('.projects-grid');
    if (projects) {
      var lgObserver = new IntersectionObserver(function (entries, obs) {
        if (entries.some(function (e) { return e.isIntersecting; })) {
          initLightGallery();
          obs.disconnect();
        }
      }, { rootMargin: '300px 0px' });
      lgObserver.observe(projects);
    }
  }

  // Delay heavy third-party feature init to keep initial interactions responsive
  window.addEventListener('load', function () { onIdle(observeAndInit); }, { once: true });

  // Load about video only when near viewport (replaces eager autoplay)
  function initLazyAboutVideo() {
    var v = document.querySelector('video.about-video[data-src]');
    if (!v) return;
    function load() {
      if (v.dataset.loaded) return;
      v.dataset.loaded = '1';
      v.src = v.dataset.src;
      v.load();
      var play = v.play && v.play();
      if (play && play.catch) play.catch(function () {});
    }
    if (!('IntersectionObserver' in window)) { setTimeout(load, 800); return; }
    var vo = new IntersectionObserver(function (entries, obs) {
      if (entries.some(function (e) { return e.isIntersecting; })) {
        load();
        obs.disconnect();
      }
    }, { rootMargin: '200px 0px' });
    vo.observe(v);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initLazyAboutVideo);
  else initLazyAboutVideo();

  // Prepare modal video source lazily on first open
  document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('videoModal');
    var video = document.getElementById('modalVideo');
    if (!modal || !video) return;
    modal.addEventListener('show.bs.modal', function () {
      if (!video.dataset.ready) {
        video.dataset.ready = '1';
        video.load();
      }
    }, { once: true });
  });
  // Register service worker for repeat-visit speed (same-origin caching)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      onIdle(function () {
        navigator.serviceWorker.register('./sw.js').catch(function () {});
      });
    }, { once: true });
  }

  // Prefetch likely in-page targets on intent to make section navigation feel instant
  function initIntentPrefetch() {
    var prefetched = {};
    function prefetchImage(url) {
      if (!url || prefetched[url]) return;
      prefetched[url] = true;
      var img = new Image();
      img.decoding = 'async';
      img.src = url;
    }
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var warmed = false;
      var warm = function () {
        if (warmed) return; warmed = true;
        var href = a.getAttribute('href') || '';
        if (href === '#projects' || href === '#services' || href === '#team' || href === '#about') {
          // warm first images of target sections already in DOM cache pipeline
          var selector = href === '#projects' ? '.project-image img' : href === '#services' ? '.service-image img' : href === '#team' ? '.team-image img' : '.about-media img';
          var first = document.querySelector(selector);
          if (first) prefetchImage(first.getAttribute('src'));
        }
      };
      a.addEventListener('mouseenter', warm, { passive: true });
      a.addEventListener('touchstart', warm, { passive: true });
      a.addEventListener('focus', warm, { passive: true });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initIntentPrefetch);
  else initIntentPrefetch();

})();