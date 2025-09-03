document.addEventListener('DOMContentLoaded', () => {
    // Objek berisi konten tooltip. Anda bisa menambah/mengubah di sini.
    const footnotesData = {
        'tooltip-1': 'Ini adalah isi dari catatan kaki atau referensi pertama. (Penulis, Tahun, Judul Buku)',
        // Tambahkan catatan kaki lain di sini:
        // 'tooltip-2': 'Isi catatan kaki kedua.',
    };

    const footnoteLinks = document.querySelectorAll('.footnote-link');

    // Untuk setiap tautan catatan kaki, tambahkan fungsionalitas
    footnoteLinks.forEach(link => {
        const tooltipId = link.getAttribute('aria-describedby');
        const tooltipContent = footnotesData[tooltipId];

        if (tooltipContent) {
            // Buat elemen tooltip
            const tooltipContainer = document.createElement('div');
            tooltipContainer.className = 'tooltip-container';
            tooltipContainer.innerHTML = `<span class="tooltip-content">${tooltipContent}</span>`;

            // Masukkan tooltip sebagai anak dari tautan catatan kaki
            link.appendChild(tooltipContainer);

            // Deteksi perangkat
            const isSmallDevice = window.matchMedia("(max-width: 768px)").matches;

            if (isSmallDevice) {
                // Perilaku untuk perangkat kecil (klik)
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    tooltipContainer.classList.toggle('visible');
                });
            } else {
                // Perilaku untuk perangkat besar (hover)
                link.addEventListener('mouseenter', () => {
                    tooltipContainer.classList.add('visible');
                });
                link.addEventListener('mouseleave', () => {
                    tooltipContainer.classList.remove('visible');
                });
            }
        }
    });
});
