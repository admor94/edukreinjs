document.addEventListener(&quot;DOMContentLoaded&quot;, function() {
    var navLinks = document.querySelectorAll(&quot;.PageList a, .LinkList a&quot;);

    navLinks.forEach(function(link) {
      var href = link.getAttribute(&quot;href&quot;);
      // cek kalau href ada dan mengandung /p/
      if (href &amp;&amp; href.indexOf(&quot;/p/&quot;) !== -1) {
        link.setAttribute(&quot;target&quot;, &quot;_blank&quot;);
        link.setAttribute(&quot;rel&quot;, &quot;noopener&quot;);
      }
    });
  });

// Skrip untuk memastikan elemen #article-share benar-benar hilang di halaman statis
document.addEventListener(&#39;DOMContentLoaded&#39;, function() {
  var staticPageCustom = document.querySelector(&#39;.static-page-custom&#39;);
  if (staticPageCustom) {
    var shareSection = document.getElementById(&#39;article-share&#39;);
    if (shareSection) {
      shareSection.remove(); // Langsung hapus elemennya dari halaman
    }
  }
});
