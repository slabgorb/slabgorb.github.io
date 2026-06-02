/* ===== slabgorb.com — gallery + lightbox + retro counter ===== */
(function () {
  // ---- the collection -------------------------------------------------
  var ART = [
    // cat keys: animals, wmata, shoes, mtv
    { f: 'img/animals/Bowie.jpg',    t: 'Bowie',           c: 'animals' },
    { f: 'img/animals/Bowie_2.jpg',  t: 'Bowie II',        c: 'animals' },
    { f: 'img/animals/Bowie_3.jpg',  t: 'Bowie III',       c: 'animals' },
    { f: 'img/animals/Captain.jpg',  t: 'Captain',         c: 'animals' },
    { f: 'img/animals/Cricket_1.jpg',t: 'Cricket',         c: 'animals' },
    { f: 'img/animals/Cricket_2.jpg',t: 'Cricket II',      c: 'animals' },
    { f: 'img/animals/Cricket_3.jpg',t: 'Cricket III',     c: 'animals' },
    { f: 'img/animals/Darcy.jpg',    t: 'Darcy',           c: 'animals' },
    { f: 'img/animals/Khalil.jpg',   t: 'Khalil',          c: 'animals' },
    { f: 'img/animals/Kilgore.jpg',  t: 'Kilgore',         c: 'animals' },
    { f: 'img/animals/Kipling.jpg',  t: 'Kipling',         c: 'animals' },
    { f: 'img/animals/Leo.jpg',      t: 'Leo',             c: 'animals' },
    { f: 'img/animals/Marco.jpg',    t: 'Marco',           c: 'animals' },
    { f: 'img/animals/Oliver_2.jpg', t: 'Oliver',          c: 'animals' },
    { f: 'img/animals/Ollie.jpg',    t: 'Ollie',           c: 'animals' },
    { f: 'img/animals/Oscar.jpg',    t: 'Oscar',           c: 'animals' },
    { f: 'img/animals/Raven.jpg',    t: 'Raven',           c: 'animals' },
    { f: 'img/animals/Stitch.jpg',   t: 'Stitch',          c: 'animals' },
    { f: 'img/animals/Teddy.jpg',    t: 'Teddy',           c: 'animals' },
    { f: 'img/animals/Untitled_21.jpg', t: 'Untitled',     c: 'animals' },

    { f: 'img/wmata/Metro_Center.jpg',      t: 'Metro Center',    c: 'wmata' },
    { f: 'img/wmata/Farragut_West.jpg',     t: 'Farragut West',   c: 'wmata' },
    { f: 'img/wmata/McPherson_Square_1.jpg',t: 'McPherson Square',c: 'wmata' },
    { f: 'img/wmata/McPherson_Square_2.jpg',t: 'McPherson Sq. II',c: 'wmata' },
    { f: 'img/wmata/McPherson_Square_3.jpg',t: 'McPherson Sq. III',c: 'wmata' },
    { f: 'img/wmata/LEnfant_1.jpg',         t: "L'Enfant Plaza",  c: 'wmata' },
    { f: 'img/wmata/LEnfant_2.jpg',         t: "L'Enfant Plaza II",c: 'wmata' },
    { f: 'img/wmata/LEnfant_3.jpg',         t: "L'Enfant Plaza III",c: 'wmata' },
    { f: 'img/wmata/King_St_1.jpg',         t: 'King Street',     c: 'wmata' },
    { f: 'img/wmata/King_St_2.jpg',         t: 'King Street II',  c: 'wmata' },
    { f: 'img/wmata/Pentagon.jpg',          t: 'Pentagon',        c: 'wmata' },
    { f: 'img/wmata/Pentagon_2.jpg',        t: 'Pentagon II',     c: 'wmata' },
    { f: 'img/wmata/Eisenhower_Ave_1.jpg',  t: 'Eisenhower Ave',  c: 'wmata' },
    { f: 'img/wmata/Eisenhower_Ave_2.jpg',  t: 'Eisenhower Ave II',c: 'wmata' },
    { f: 'img/wmata/National_Airport.jpg',  t: 'National Airport',c: 'wmata' },
    { f: 'img/wmata/Mt_Vernon_Sq.jpg',      t: 'Mt Vernon Sq',    c: 'wmata' },
    { f: 'img/wmata/Potomac_Ave.jpg',       t: 'Potomac Ave',     c: 'wmata' },
    { f: 'img/wmata/Rosslyn.jpg',           t: 'Rosslyn',         c: 'wmata' },
    { f: 'img/wmata/Van_Ness.jpg',          t: 'Van Ness',        c: 'wmata' },
    { f: 'img/wmata/Model_112.jpg',         t: 'Model 112',       c: 'wmata' },

    { f: 'img/shoes/Doc_Boots.jpg',       t: 'Doc Boots',       c: 'shoes' },
    { f: 'img/shoes/Doc_Shoes.jpg',       t: 'Doc Shoes',       c: 'shoes' },
    { f: 'img/shoes/red_heels.jpg',       t: 'Red Heels',       c: 'shoes' },
    { f: 'img/shoes/Black_Hells.jpg',     t: 'Black Heels',     c: 'shoes' },
    { f: 'img/shoes/Jelly.jpg',           t: 'Jelly',           c: 'shoes' },
    { f: 'img/shoes/ballet_slippers.jpg', t: 'Ballet Slippers', c: 'shoes' },
    { f: 'img/shoes/brown_boots.jpg',     t: 'Brown Boots',     c: 'shoes' },
    { f: 'img/shoes/moccasins.jpg',       t: 'Moccasins',       c: 'shoes' },
    { f: 'img/shoes/sandals.jpg',         t: 'Sandals',         c: 'shoes' },
    { f: 'img/shoes/Flipflops.jpg',       t: 'Flip-flops',      c: 'shoes' },

    { f: 'img/mtv/Vogue_1.jpg',          t: 'Vogue · I',           c: 'mtv' },
    { f: 'img/mtv/Vogue_2.jpg',          t: 'Vogue · II',          c: 'mtv' },
    { f: 'img/mtv/Vogue_3.jpg',          t: 'Vogue · III',         c: 'mtv' },
    { f: 'img/mtv/Rock_The_Casbah_1.jpg',t: 'Rock the Casbah · I', c: 'mtv' },
    { f: 'img/mtv/Rock_The_Casbah_2.jpg',t: 'Rock the Casbah · II',c: 'mtv' },
    { f: 'img/mtv/Rock_The_Casbah_3.jpg',t: 'Rock the Casbah · III',c: 'mtv' },
    { f: 'img/mtv/Once_In_A_Lifetime_1.jpg',t: 'Once in a Lifetime · I',  c: 'mtv' },
    { f: 'img/mtv/Once_In_A_Lifetime_2.jpg',t: 'Once in a Lifetime · II', c: 'mtv' },
    { f: 'img/mtv/Once_In_A_Lifetime_3.jpg',t: 'Once in a Lifetime · III',c: 'mtv' },
    { f: 'img/mtv/Sabotage_1.jpg',       t: 'Sabotage · I',        c: 'mtv' },
    { f: 'img/mtv/Sabotage_2.jpg',       t: 'Sabotage · II',       c: 'mtv' },
    { f: 'img/mtv/Sabotage_3.jpg',       t: 'Sabotage · III',      c: 'mtv' }
  ];

  var CATLABEL = { animals: 'PETS', wmata: 'THE METRO', shoes: 'SHOES', mtv: 'MTV' };

  var grid = document.getElementById('grid');
  var current = 'all';

  // ---- render thumbnails ---------------------------------------------
  ART.forEach(function (a, i) {
    var fig = document.createElement('figure');
    fig.className = 'art';
    fig.dataset.cat = a.c;
    fig.dataset.idx = i;
    fig.innerHTML =
      '<div class="thumb"><img loading="lazy" src="' + a.f + '" alt="' + a.t + ' — painting by Keith Avery" /></div>' +
      '<figcaption><span class="ct">' + a.t + '</span><span class="cc">' + CATLABEL[a.c] + '</span></figcaption>';
    fig.addEventListener('click', function () { open(i); });
    grid.appendChild(fig);
  });

  // ---- filtering ------------------------------------------------------
  var fbar = document.getElementById('filters');
  fbar.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    current = b.dataset.f;
    [].forEach.call(fbar.querySelectorAll('button'), function (x) {
      x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
    });
    [].forEach.call(grid.children, function (fig) {
      var show = current === 'all' || fig.dataset.cat === current;
      fig.classList.toggle('hide', !show);
    });
  });

  // ---- lightbox -------------------------------------------------------
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var lbTitle = document.getElementById('lbTitle');
  var lbMeta = document.getElementById('lbMeta');
  var idx = 0;

  function visibleList() {
    return ART.map(function (a, i) { return i; }).filter(function (i) {
      return current === 'all' || ART[i].c === current;
    });
  }
  function open(i) {
    idx = i; paint(); lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function paint() {
    var a = ART[idx];
    lbImg.src = a.f; lbImg.alt = a.t;
    lbTitle.textContent = a.f.split('/').pop();
    lbMeta.textContent = a.t + '  //  ' + CATLABEL[a.c] + '  ·  Slabgorb';
  }
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  function step(d) {
    var vis = visibleList();
    var pos = vis.indexOf(idx);
    if (pos === -1) { idx = vis[0]; } else { idx = vis[(pos + d + vis.length) % vis.length]; }
    paint();
  }

  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', function () { step(-1); });
  document.getElementById('lbNext').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });

})();
