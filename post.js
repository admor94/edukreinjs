document.addEventListener('DOMContentLoaded', () => {
    const footnoteLinks = document.querySelectorAll('.footnote-link');

    footnoteLinks.forEach(link => {
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
    });
});
