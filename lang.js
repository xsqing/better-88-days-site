// Shows the section matching ?lang=, then the browser language, then English.
(function () {
  var supported = ["en", "zh-Hans", "zh-Hant"];
  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (supported.indexOf(q) >= 0) return q;
    var langs = navigator.languages || [navigator.language || "en"];
    for (var i = 0; i < langs.length; i++) {
      var l = langs[i].toLowerCase();
      if (l.indexOf("zh") === 0) {
        return /hant|tw|hk|mo/.test(l) ? "zh-Hant" : "zh-Hans";
      }
      if (l.indexOf("en") === 0) return "en";
    }
    return "en";
  }
  function show(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("section[lang]").forEach(function (s) {
      s.hidden = s.getAttribute("lang") !== lang;
    });
    document.querySelectorAll("nav.lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
    });
    var title = document.querySelector('section[lang="' + lang + '"] h1');
    if (title) {
      var t = title.textContent;
      document.title = t.indexOf("Better 88 Days") >= 0 ? t : t + " · Better 88 Days";
    }
  }
  document.querySelectorAll("nav.lang button").forEach(function (b) {
    b.addEventListener("click", function () {
      show(b.dataset.lang);
      var url = new URL(location.href);
      url.searchParams.set("lang", b.dataset.lang);
      history.replaceState(null, "", url);
    });
  });
  show(pick());
})();
