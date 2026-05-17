/* ================================================================
   Gallery — Adaptive Scroll
   Desktop  : JS drag-to-scroll with RAF parallax
   Mobile   : Native CSS overflow-x scroll + scroll-snap (CSS handles it)
              + native scroll event listener for parallax object-position

   DATA: Edit galleryData below to add / remove / reorder photos.
   Each row is self-contained — changing one row never affects another.
   ================================================================ */

var galleryMain = document.getElementById('gallery-main');

/* ---- Mobile detection ---- */
var MOBILE_BP = 900;
var coarseQuery = window.matchMedia ? window.matchMedia('(pointer: coarse)') : null;

function isMobile() {
  return window.innerWidth <= MOBILE_BP ||
    (coarseQuery && coarseQuery.matches);
}

/* ================================================================
   GALLERY DATA — Row-Based Configuration
   ----------------------------------------------------------------
   Each object in this array becomes one horizontal gallery row.

   For each image use ONE of:
     { src: 'gallery_photos/filename.jpg', alt: '...' }  ← local file
     { id: 'unsplash-photo-id',            alt: '...' }  ← Unsplash placeholder

   To add a photo to a row: add an object to that row's `images` array.
   To add a new row:        add a new object at the end of galleryData.
   To reorder rows:         cut-and-paste the row objects.
   ================================================================ */
var galleryData = [
  /* ── ROW 1 ─────────────────────────────────────────────────── */
  {
    title: 'Meemu Dhiggaru',
    images: [
      { src: 'gallery_photos/meemu/meemu dhiggaru2.jpg', alt: 'meemu dhiggaru importance of keeping active for positive mental health' },
      { src: 'gallery_photos/meemu/Meemu Dhiggaru.jpg', alt: 'meemu dhiggaru' },
      { src: 'gallery_photos/meemu/meemu dhiggaru workshop.jpg', alt: 'meemu dhiggaru a workshop for teachers on how they can further support special needs children' },
      { src: 'gallery_photos/meemu/meemu dhiggaru awareness.jpg', alt: 'meemu dhiggaru creating mental health awareness' },
      { src: 'gallery_photos/meemu/meemu dhiggaru students.jpg', alt: 'meemu dhiggaru the students said they have gained knowledge about mental health issues' },
      { src: 'gallery_photos/meemu/meemu dhiggaru students2.jpg', alt: 'meemu dhiggaru creating mental health awareness among students' },
      { src: 'gallery_photos/meemu/meemu dhiggaru honored.jpg', alt: 'meemu dhiggaru Honored me with these after the training programs to celebrate world mental health day 2022' }
    ]
  },

  /* ── ROW 2 ─────────────────────────────────────────────────── */
  {
    title: 'Hirilandhoo community development program',
    images: [
      { src: 'gallery_photos/hirilandhoo/hirilandhoo  workshop.jpg', alt: 'hirilandhoo  workshop' },
      { src: 'gallery_photos/hirilandhoo/hirilandhoo community members.jpg', alt: 'hirilandhoo community members says the awareness content went to their mind and heart' },
      { src: 'gallery_photos/hirilandhoo/hirilandhoo students2.jpg', alt: 'hirilandhoo students appreciated the awareness program' },
      { src: 'gallery_photos/hirilandhoo/hirilandhoo students.jpg', alt: 'hirilandhoo a mental health awareness worksop for students' },
      { src: 'gallery_photos/hirilandhoo/th hirilandhoo parents.jpg', alt: 'the hirilandhoo A free mental heath awareness workshop for parents' },
      { src: 'gallery_photos/hirilandhoo/hirilandhoo.jpg', alt: 'hirilandhoo honouring with gifts' },
      { src: 'gallery_photos/hirilandhoo/hirilandhoo community.jpg', alt: 'hirilandhoo Community In dialogue on what can be done to improve the mental health of island community' }
    ]
  },

  /* ── ROW 3 ─────────────────────────────────────────────────── */
  {
    title: 'Trainings and Workshops',
    images: [
      { src: 'gallery_photos/training-and-workshop/ba atoll fulhadhoo.jpg', alt: 'Ba Atoll Fulhadhoo and interactive session on mental health issues' },
      { src: 'gallery_photos/training-and-workshop/baa atoll kihaadhoo.jpg', alt: 'baa atoll kihaadhoo interactive session on mental health issues' },
      { src: 'gallery_photos/training-and-workshop/hdh kulhudhifushi.jpg', alt: 'training of Hdh Kulhudhuhfushi Health care staff on Mental health first aid' },
      { src: 'gallery_photos/training-and-workshop/baa dharavandhoo.jpg', alt: 'Baa Dharavandhoo A workshop on mental health awareness' },
      { src: 'gallery_photos/training-and-workshop/baa eydhafushi.jpg', alt: 'Baa Eydhafushi a workshop on psychological first aid' },
      { src: 'gallery_photos/training-and-workshop/baa eydhafushi2.jpg', alt: 'Baa Eydhafushi creating mental health awareness' },
      { src: 'gallery_photos/training-and-workshop/gdh fiyoari.jpg', alt: 'Gdh Fiyoari the training content went to our head and heart' },
      { src: 'gallery_photos/training-and-workshop/gdh fiyoree.jpg', alt: 'Gdh Fiyoree a training on mental health awareness' },
      { src: 'gallery_photos/training-and-workshop/gdh thinadhoo.jpg', alt: 'Gdh Thinadhoo A workshop on mental health awareness for teachers' },
      { src: 'gallery_photos/training-and-workshop/hulhumale.jpg', alt: 'Hulhumale creating awareness on mental health and distrubuting my books 2022' },
      { src: 'gallery_photos/training-and-workshop/s feydhoo.jpg', alt: 'S feydhoo A workshop on mental health awareness' },
      { src: 'gallery_photos/training-and-workshop/sh foakaidhoo.jpg', alt: 'Sh Foakaidhoo a mental health awareness workshop' },
      { src: 'gallery_photos/training-and-workshop/sh kanditheemu.jpg', alt: 'Free mental health awareness workshop in Sh Kanditheemu' },
      { src: 'gallery_photos/training-and-workshop/sh kanditheemu2.jpg', alt: 'Sh Kanditheemu A mental health awareness workshop' },
      { src: 'gallery_photos/training-and-workshop/sh kanitheemu workshop.jpg', alt: 'sh kanitheemu a workshop for parents' },
      { src: 'gallery_photos/training-and-workshop/th thimarafush.jpg', alt: 'Th Thimarafushi A workshop for teacher on mental health awareness' }

    ]
  },

  /* ── ROW 4 ─────────────────────────────────────────────────── */
  {
    title: 'Media & Public Education',
    images: [
      { id: '1470071459604-3b5ec3a7fe05', alt: 'Waterfall in tropical forest' },
      { id: '1501854140801-50d01698950b', alt: 'Aerial view of coastline' },
      { id: '1464822759023-fed622ff2c3b', alt: 'Dramatic sky over field' },
      { id: '1518495973542-4542c06a5843', alt: 'Silhouette against sunset' },
      { id: '1477346611705-65d1883cee1e', alt: 'Snow covered pine trees' },
      { id: '1509316975850-ff9c5deb0cd9', alt: 'Autumn leaves close-up' }
    ]
  },

  /* ── ROW 5 ─────────────────────────────────────────────────── */
  {
    title: 'Training & Workshops',
    images: [
      { id: '1472214103451-9374bd1c798e', alt: 'Lavender field at dusk' },
      { id: '1433086966358-54859d0ed716', alt: 'Northern lights over lake' },
      { id: '1494500764479-0c8f2919a3d8', alt: 'Night city skyline' },
      { id: '1476842634003-7dcca8f832de', alt: 'Rainbow over green hills' },
      { id: '1497436072909-60f360e1d4b1', alt: 'Turquoise mountain lake' },
      { id: '1504701954957-2010ec3bcec1', alt: 'City bridge at twilight' }
    ]
  },

  /* ── ROW 6 ─────────────────────────────────────────────────── */
  {
    title: 'Awards & Recognition',
    images: [
      { id: '1490682143684-14369e18dce8', alt: 'Foggy morning lakeside' },
      { id: '1502082553048-f009c37129b9', alt: 'Misty mountain peaks' },
      { id: '1500382017468-9049fed747ef', alt: 'Sandy desert dunes' },
      { id: '1521737604893-d14cc237f11d', alt: 'Team collaboration around a table' },
      { id: '1544717305-2782549b5136', alt: 'Portrait in warm natural light' },
      { id: '1492724441997-5dc865305da7', alt: 'Creative studio workspace' }
    ]
  },

  /* ── ROW 7 ─────────────────────────────────────────────────── */
  {
    title: 'Research & Publications',
    images: [
      { id: '1507525428034-b723cf961d3e', alt: 'Ocean waves at golden hour' },
      { id: '1470770841072-f978cf4d019e', alt: 'Misty forest and lake' },
      { id: '1501785888041-af3ef285b470', alt: 'Snowy mountain range panorama' },
      { id: '1491553895911-0055eca6402d', alt: 'Desert road under dramatic sky' },
      { id: '1500534314209-a25ddb2bd429', alt: 'Field landscape with clouds' },
      { id: '1506744038136-46273834b3fb', alt: 'Autumn forest pathway' }
    ]
  },

  /* ── ROW 8 ─────────────────────────────────────────────────── */
  {
    title: 'MIPSTAR & ADAPTS',
    images: [
      { id: '1519681393784-d120267933ba', alt: 'Starry mountain night' },
      { id: '1475924156734-496f6cac6ec1', alt: 'Calm lake reflection' },
      { id: '1490730141103-6cac27aaab94', alt: 'Tropical green canopy' },
      { id: '1441974231531-c6227db76b6e', alt: 'Lush forest interior' },
      { id: '1505228395891-9a51e7e86bf6', alt: 'Pier extending into calm sea' },
      { id: '1469474968028-56623f02e42e', alt: 'Canyon rock formations' }
    ]
  },

  /* ── ROW 9 ─────────────────────────────────────────────────── */
  {
    title: 'Life & Legacy',
    images: [
      { id: '1465146344425-f00d5f5c8f07', alt: 'Wide open meadow' },
      { id: '1470071459604-3b5ec3a7fe05', alt: 'Waterfall in tropical forest' },
      { id: '1501854140801-50d01698950b', alt: 'Aerial view of coastline' },
      { id: '1464822759023-fed622ff2c3b', alt: 'Dramatic sky over field' },
      { id: '1518495973542-4542c06a5843', alt: 'Silhouette against sunset' },
      { id: '1477346611705-65d1883cee1e', alt: 'Snow covered pine trees' }
    ]
  }
];

/* ================================================================
   RENDERING ENGINE — reads galleryData; no manual indexes needed
   ================================================================ */
var buildUnsplashUrl = function (id, width, quality) {
  return 'https://images.unsplash.com/photo-' + id +
    '?auto=format&fit=crop&w=' + (width || 1200) + '&q=' + (quality || 72);
};

var createImageNode = function (data, isEager) {
  var img = document.createElement('img');
  img.className = 'image';
  img.alt = data.alt;
  img.draggable = false;
  img.width = 480;
  img.height = 680;
  img.loading = isEager ? 'eager' : 'lazy';
  img.decoding = 'async';

  if (data.src) {
    /* Local file — use path directly */
    img.src = data.src;
  } else {
    /* Unsplash placeholder */
    img.src = buildUnsplashUrl(data.id, 1200, 72);
    img.srcset = buildUnsplashUrl(data.id, 600, 70) + ' 600w, ' +
      buildUnsplashUrl(data.id, 1200, 72) + ' 1200w';
    img.sizes = '(max-width: 900px) 75vw, 34vmin';
  }
  return img;
};

/* ---- Build rows from galleryData ---- */
var trackStates = [];

for (var r = 0; r < galleryData.length; r++) {
  var rowConfig = galleryData[r];

  var rowEl = document.createElement('div');
  rowEl.className = 'gallery-row';

  var titleEl = document.createElement('h2');
  titleEl.className = 'row-title';
  titleEl.textContent = rowConfig.title;
  rowEl.appendChild(titleEl);

  var trackEl = document.createElement('div');
  trackEl.className = 'image-track';
  trackEl.setAttribute('data-row', r);

  var frag = document.createDocumentFragment();
  var rowImages = rowConfig.images;
  for (var i = 0; i < rowImages.length; i++) {
    var isEager = r === 0 && i < 2;
    frag.appendChild(createImageNode(rowImages[i], isEager));
  }
  trackEl.appendChild(frag);
  rowEl.appendChild(trackEl);
  galleryMain.appendChild(rowEl);

  trackStates.push({
    el: trackEl, dragged: false, pointerDownAt: 0,
    prevPercentage: 0, targetPercentage: 0, currentPercentage: 0,
    rafId: null, scrollRafId: null
  });
}

/* ================================================================
   DESKTOP — drag helpers
   ================================================================ */
var clamp = function (num, min, max) { return Math.max(min, Math.min(num, max)); };

var createRenderer = function (state) {
  return function render() {
    state.currentPercentage += (state.targetPercentage - state.currentPercentage) * 0.14;
    if (Math.abs(state.targetPercentage - state.currentPercentage) < 0.01) {
      state.currentPercentage = state.targetPercentage;
    }
    state.el.style.transform = 'translateX(' + state.currentPercentage + '%)';
    var objectX = 100 + state.currentPercentage;
    var imgs = state.el.getElementsByClassName('image');
    for (var j = 0; j < imgs.length; j++) {
      imgs[j].style.objectPosition = objectX + '% center';
    }
    state.rafId = (state.currentPercentage !== state.targetPercentage)
      ? requestAnimationFrame(render) : null;
  };
};

var scheduleRender = function (state) {
  if (state.rafId === null) {
    state.rafId = requestAnimationFrame(createRenderer(state));
  }
};

/* Reset a track to neutral mobile state */
var resetTrackForMobile = function (state) {
  if (state.rafId !== null) { cancelAnimationFrame(state.rafId); state.rafId = null; }
  state.el.style.transform = 'translateX(0%)';
  state.el.style.touchAction = 'pan-x';
  state.targetPercentage = state.currentPercentage = state.prevPercentage = 0;
  var imgs = state.el.getElementsByClassName('image');
  for (var k = 0; k < imgs.length; k++) { imgs[k].style.objectPosition = ''; }
};

/* ---- Drag listeners (desktop only) ---- */
var activeState = null;

galleryMain.addEventListener('pointerdown', function (e) {
  if (isMobile()) return;
  var track = e.target.closest('.image-track');
  if (!track) return;
  activeState = trackStates[parseInt(track.getAttribute('data-row'), 10)];
  activeState.dragged = false;
  activeState.pointerDownAt = e.clientX;
});

window.addEventListener('pointerup', function () {
  if (!activeState) return;
  activeState.pointerDownAt = 0;
  activeState.prevPercentage = activeState.targetPercentage;
  activeState = null;
});

window.addEventListener('pointermove', function (e) {
  if (isMobile() || !activeState || !activeState.pointerDownAt) return;
  var delta = activeState.pointerDownAt - e.clientX;
  if (Math.abs(delta) > 4) activeState.dragged = true;
  var pct = (delta / (window.innerWidth / 2)) * -100;
  activeState.targetPercentage = clamp(activeState.prevPercentage + pct, -100, 0);
  scheduleRender(activeState);
});

/* ================================================================
   MOBILE — native scroll parallax
   Mirrors the desktop object-position effect on touch devices using
   the native CSS overflow-x scroll position as the input signal.
   ================================================================ */
trackStates.forEach(function (state) {
  state.el.addEventListener('scroll', function () {
    if (!isMobile()) return;
    if (state.scrollRafId) return; /* throttle to one frame per scroll event */
    state.scrollRafId = requestAnimationFrame(function () {
      state.scrollRafId = null;
      var track = state.el;
      var maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;
      /* scrollPct: 0 (leftmost) → 100 (rightmost) */
      var scrollPct = (track.scrollLeft / maxScroll) * 100;
      /* Map scroll 0–100 → objectPosition 100% → 0%
         (start fully right, shift left as user swipes left, mimicking desktop) */
      var objectX = 100 - scrollPct;
      var imgs = track.getElementsByClassName('image');
      for (var j = 0; j < imgs.length; j++) {
        imgs[j].style.objectPosition = objectX + '% center';
      }
    });
  }, { passive: true });
});

/* ---- Resize handler — reset if crossing mobile breakpoint ---- */
var lastMobileState = isMobile();
window.addEventListener('resize', function () {
  var nowMobile = isMobile();
  if (nowMobile && !lastMobileState) { trackStates.forEach(resetTrackForMobile); }
  lastMobileState = nowMobile;
});

/* ---- Entrance animation ---- */
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });
  trackStates.forEach(function (s) { io.observe(s.el); });
} else {
  trackStates.forEach(function (s) { s.el.classList.add('visible'); });
}

/* ---- Lightbox ---- */
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightbox-img');
var lightboxClose = document.querySelector('.lightbox-close');

var closeLightbox = function () {
  lightbox.classList.remove('active');
  document.body.classList.remove('lightbox-open');
};

/*
 * Click/tap handler — works on both desktop and mobile.
 * Native scroll fires 'click' on tap-without-drag, so lightbox
 * opens correctly. Desktop drags are suppressed via state.dragged.
 */
galleryMain.addEventListener('click', function (e) {
  var img = e.target.closest('.image');
  if (!img) return;
  var track = img.closest('.image-track');
  if (!track) return;
  var state = trackStates[parseInt(track.getAttribute('data-row'), 10)];
  if (!isMobile() && state.dragged) return;   /* desktop: suppress if dragged */
  lightbox.classList.add('active');
  lightboxImg.src = img.currentSrc || img.src;
  lightboxImg.alt = img.alt;
  document.body.classList.add('lightbox-open');
});

lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
if (lightboxClose) { lightboxClose.addEventListener('click', closeLightbox); }
window.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });

/* Initial desktop render */
if (!isMobile()) { scheduleRender(trackStates[0]); }
