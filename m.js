/* masquo.com, sur chaque page :
   1) si la page est affichée dans le cadre d'un autre site (« page piège »), elle se cache aussitôt ;
   2) sinon, envoie la page et la provenance au compteur de visites (adresse IP, lieu approximatif, opérateur, page,
      provenance, navigateur et langue gardés 30 jours, pour la sécurité et les statistiques).
   Rien n'est envoyé si le navigateur demande de ne pas être suivi (Global Privacy Control ou Do Not Track). */
(function () {
  var framed = true;
  try { framed = window.top !== window.self; } catch (e) { framed = true; }
  if (framed) {
    document.documentElement.style.setProperty('display', 'none', 'important');
    try { window.top.location.replace(window.location.href); } catch (e) { /* refusé par le navigateur : la page reste cachée */ }
    return;
  }
  try {
    var h = location.hostname;
    if (h !== 'masquo.com' && h !== 'www.masquo.com') return;
    var n = navigator;
    if (n.globalPrivacyControl === true || n.doNotTrack === '1' || window.doNotTrack === '1' || n.msDoNotTrack === '1') return;
    var ref = '';
    try {
      if (document.referrer) { var x = new URL(document.referrer); ref = x.protocol + '//' + x.host + x.pathname; }
    } catch (e) { ref = ''; }
    var s = document.currentScript;
    var d = JSON.stringify({ p: location.pathname, r: ref, k: s && s.hasAttribute('data-nf') ? '404' : '' });
    var u = 'https://visites.lagon-stats.workers.dev/v';
    if (navigator.sendBeacon && navigator.sendBeacon(u, new Blob([d], { type: 'text/plain' }))) return;
    fetch(u, { method: 'POST', body: d, keepalive: true, mode: 'no-cors', credentials: 'include' });
  } catch (e) { /* jamais bloquant */ }
})();
