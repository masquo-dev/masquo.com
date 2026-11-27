/* LAGOA (copie de présentation) : français d'office si le navigateur est en français, choix FR | EN mémorisé */
(function () {
  var h = document.documentElement, cur = h.getAttribute('data-lang'), alt = h.getAttribute('data-alt');
  var saved = null;
  try { saved = localStorage.getItem('lagoa-lang'); } catch (e) {}
  if (saved !== 'fr' && saved !== 'en') saved = null;
  var want = saved || ((navigator.language || '').toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en');
  if (want !== cur && alt && !/[?&]lang=/.test(location.search)) location.replace(alt);
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-lang-set]');
    if (a) { try { localStorage.setItem('lagoa-lang', a.getAttribute('data-lang-set')); } catch (err) {} }
  });
})();
