document.addEventListener('DOMContentLoaded', () => {
    // Fungsi utama untuk mengaktifkan tooltip
    const activateTooltips = (targetNode) => {
        const footnoteLinks = targetNode.querySelectorAll('.footnote-link');

        footnoteLinks.forEach(link => {
            // Pastikan tooltip belum pernah diinisiasi
            if (!link.dataset.tooltipInitialized) {
                const tooltipContent = link.getAttribute('data-tooltip-content');

                if (tooltipContent) {
                    const tooltipContainer = document.createElement('div');
                    tooltipContainer.className = 'tooltip-container';
                    tooltipContainer.innerHTML = `
                        <div class="tooltip-content-inner">
                            ${tooltipContent}
                        </div>
                    `;
                    link.appendChild(tooltipContainer);
                    link.dataset.tooltipInitialized = true; // Tandai sudah diinisiasi

                    const isSmallDevice = window.matchMedia("(max-width: 768px)").matches;

                    if (isSmallDevice) {
                        link.addEventListener('click', (event) => {
                            event.preventDefault();
                            document.querySelectorAll('.tooltip-container.visible').forEach(t => {
                                if (t !== tooltipContainer) {
                                    t.classList.remove('visible');
                                }
                            });
                            tooltipContainer.classList.toggle('visible');
                        });
                        document.addEventListener('click', (event) => {
                            if (!link.contains(event.target)) {
                                tooltipContainer.classList.remove('visible');
                            }
                        });
                    } else {
                        link.addEventListener('mouseenter', () => {
                            document.querySelectorAll('.tooltip-container.visible').forEach(t => {
                                if (t !== tooltipContainer) {
                                    t.classList.remove('visible');
                                }
                            });
                            tooltipContainer.classList.add('visible');
                        });
                        link.addEventListener('mouseleave', () => {
                            tooltipContainer.classList.remove('visible');
                        });
                    }
                }
            }
        });
    };

    // Amati perubahan pada elemen body
    const observer = new MutationObserver(mutations => {
        for (let mutation of mutations) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Periksa jika itu adalah elemen
                        activateTooltips(node);
                    }
                });
            }
        }
    });

    // Mulai mengamati elemen body untuk semua perubahan yang relevan
    observer.observe(document.body, { childList: true, subtree: true });

    // Panggil sekali saat halaman pertama kali dimuat untuk memastikan semua yang sudah ada terproses
    activateTooltips(document);
});
