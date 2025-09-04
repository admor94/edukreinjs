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
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'id',
      includedLanguages: 'id,en',
      autoDisplay: false
    }, 'google_translate_element');
  }
</script>
<script src='//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'></script>

<script>
(function(){
  const langs = { id:'Bahasa Indonesia', en:'English' };
  const menu = document.getElementById('lang-menu');
  menu.innerHTML = Object.entries(langs)
    .map(([code,name])=>`<button type="button" data-lang="${code}">${name}</button>`)
    .join('');

  const btn = document.getElementById('translate-btn');
  btn.addEventListener('click', ()=> {
    menu.toggleAttribute('hidden');
  });

  menu.addEventListener('click', e=>{
    if(!e.target.dataset.lang) return;
    const lang = e.target.dataset.lang;
    const sel = document.querySelector('.goog-te-combo');
    if (sel) {
      sel.value = lang;
      sel.dispatchEvent(new Event('change'));
    }
    menu.setAttribute('hidden','');
  });
})();
