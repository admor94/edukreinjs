document.addEventListener('DOMContentLoaded', () => {
    // Objek berisi konten tooltip. Tambahkan/ubah di sini.
    const footnotesData = {
        'tooltip-1': 'Ilmu murni (pure science) berfokus pada pengembangan teori dan pemahaman dasar, tanpa harus langsung diterapkan.',
        'tooltip-2': 'Ilmu terapan (applied science) menggunakan teori-teori ilmiah untuk memecahkan masalah-masalah praktis di masyarakat.',
        // Tambahkan catatan kaki lain di sini:
        // 'tooltip-3': 'Isi catatan kaki ketiga.',
    };

    const footnoteLinks = document.querySelectorAll('.footnote-link');

    footnoteLinks.forEach(link => {
        const tooltipId = link.getAttribute('aria-describedby');
        const tooltipContent = footnotesData[tooltipId];

        if (tooltipContent) {
            const tooltipContainer = document.createElement('div');
            tooltipContainer.className = 'tooltip-container';
            tooltipContainer.innerHTML = `<span class="tooltip-content">${tooltipContent}</span>`;

            link.appendChild(tooltipContainer);

            // Deteksi perangkat untuk interaksi yang berbeda
            const isSmallDevice = window.matchMedia("(max-width: 768px)").matches;

            if (isSmallDevice) {
                // Perilaku untuk perangkat sentuh (klik)
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    // Menutup tooltip lain sebelum menampilkan yang baru
                    document.querySelectorAll('.tooltip-container.visible').forEach(t => t.classList.remove('visible'));
                    tooltipContainer.classList.toggle('visible');
                });
                // Tutup tooltip saat mengetuk area lain
                document.addEventListener('click', (event) => {
                    if (!link.contains(event.target)) {
                        tooltipContainer.classList.remove('visible');
                    }
                });
            } else {
                // Perilaku untuk desktop (hover)
                link.addEventListener('mouseenter', () => {
                    // Menutup tooltip lain saat hover
                    document.querySelectorAll('.tooltip-container.visible').forEach(t => t.classList.remove('visible'));
                    tooltipContainer.classList.add('visible');
                });
                link.addEventListener('mouseleave', () => {
                    tooltipContainer.classList.remove('visible');
                });
            }
        }
    });
});
