<script>
    document.addEventListener('DOMContentLoaded', () => {
        // Memeriksa apakah perangkat adalah perangkat kecil (mobile/tablet)
        const isSmallDevice = window.matchMedia("(max-width: 768px)").matches;

        if (isSmallDevice) {
            // Jika perangkat kecil, tambahkan event listener 'click'
            const footnoteLinks = document.querySelectorAll('.footnote-link');
            
            footnoteLinks.forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();

                    const tooltipId = link.getAttribute('aria-describedby');
                    const tooltip = document.getElementById(tooltipId);
                    
                    if (tooltip.style.visibility === 'visible') {
                        tooltip.style.visibility = 'hidden';
                        tooltip.style.opacity = '0';
                    } else {
                        document.querySelectorAll('.tooltip-container').forEach(otherTooltip => {
                            otherTooltip.style.visibility = 'hidden';
                            otherTooltip.style.opacity = '0';
                        });

                        tooltip.style.visibility = 'visible';
                        tooltip.style.opacity = '1';
                    }
                });
            });

            document.body.addEventListener('click', (event) => {
                if (!event.target.closest('.footnote-link') && !event.target.closest('.tooltip-container')) {
                    document.querySelectorAll('.tooltip-container').forEach(tooltip => {
                        tooltip.style.visibility = 'hidden';
                        tooltip.style.opacity = '0';
                    });
                }
            });
        }
    });
</script>
