// Skrip untuk memastikan elemen #article-share benar-benar hilang di halaman statis
document.addEventListener('DOMContentLoaded', function() {
  var staticPageCustom = document.querySelector('.static-page-custom');
  if (staticPageCustom) {
    var shareSection = document.getElementById('article-share');
    if (shareSection) {
      shareSection.remove(); // Langsung hapus elemennya dari halaman
    }
  }
});

// Skrip untuk memanggil tooltip
<b:if cond='!data:view.isPreview'>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl)
            })
        });
    </script>
</b:if>


// Skrip untuk Google Translate
<script>
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'id',
      includedLanguages: 'id,en',
      autoDisplay: false
    }, 'google_translate_element');
  }
</script>
<script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

<script>
  (function(){
    const btn = document.getElementById('translate-btn');
    const menu = document.getElementById('lang-menu');

    btn.addEventListener('click', ()=> {
      menu.toggleAttribute('hidden');
    });

    menu.addEventListener('click', e=>{
      if (!e.target.dataset.lang) return;
      const sel = document.querySelector('.goog-te-combo');
      if (sel) {
        sel.value = e.target.dataset.lang;
        sel.dispatchEvent(new Event('change'));
      }
      menu.setAttribute('hidden','');
    });

    document.addEventListener('click', e=>{
      if (!menu.contains(e.target) && e.target !== btn) {
        menu.setAttribute('hidden','');
      }
    });
  })();
</script>

