<script>
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
</script>
