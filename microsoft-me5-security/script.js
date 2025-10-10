// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections for animation
    const animatedElements = document.querySelectorAll(
        '.step, .benefit-card, .threat-card, .component-card, .feature-detailed, .step-card, .kpi-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add interactive hover effects to comparison tables
    const tableRows = document.querySelectorAll('.comparison-table tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f9ff';
        });
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // Add click handlers for expandable content
    const expandableHeaders = document.querySelectorAll('.feature-header');
    expandableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content && content.classList.contains('feature-content')) {
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
            }
        });
    });

    // Progress indicator for implementation phases
    const phases = document.querySelectorAll('.phase-item');
    phases.forEach((phase, index) => {
        phase.addEventListener('click', function() {
            // Remove active class from all phases
            phases.forEach(p => p.classList.remove('active'));
            // Add active class to clicked phase and all previous phases
            for (let i = 0; i <= index; i++) {
                phases[i].classList.add('active');
            }
        });
    });

    // Add active styles to completed phases
    const style = document.createElement('style');
    style.textContent = `
        .phase-item.active {
            background: linear-gradient(135deg, #e1f5fe 0%, #ffffff 100%);
            border: 2px solid #0078d4;
        }
        .phase-item.active .phase-icon {
            color: #0078d4;
        }
    `;
    document.head.appendChild(style);

    // Checklist functionality
    const checklistItems = document.querySelectorAll('.checklist li');
    checklistItems.forEach(item => {
        item.addEventListener('click', function() {
            const checkbox = this.querySelector('::before') || this;
            if (this.classList.contains('checked')) {
                this.classList.remove('checked');
                this.style.textDecoration = 'none';
                this.style.opacity = '1';
            } else {
                this.classList.add('checked');
                this.style.textDecoration = 'line-through';
                this.style.opacity = '0.7';
            }
        });
    });

    // Add tooltip functionality for status badges
    const statusBadges = document.querySelectorAll('.status-badge, .feature-status');
    statusBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip') || 'Additional information available';
            tooltip.style.cssText = `
                position: absolute;
                background: #323130;
                color: white;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 0.8rem;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
            `;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.bottom + 5) + 'px';
            
            this._tooltip = tooltip;
        });
        
        badge.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                document.body.removeChild(this._tooltip);
                this._tooltip = null;
            }
        });
    });

    // Mobile navigation toggle
    const navBrand = document.querySelector('.nav-brand');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        navBrand.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'none' ? 'flex' : 'none';
        });
        
        // Hide menu initially on mobile
        navMenu.style.display = 'none';
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Add scroll-to-top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #0078d4;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });

    // Add print-friendly styles
    const printStyles = document.createElement('style');
    printStyles.textContent = `
        @media print {
            .navbar, .scroll-to-top, .cta-button, .step-button {
                display: none !important;
            }
            .page-header {
                background: none !important;
                color: #323130 !important;
            }
            .hero {
                background: none !important;
                color: #323130 !important;
            }
            body {
                font-size: 12px;
                line-height: 1.4;
            }
            .container {
                max-width: none;
                padding: 0;
            }
        }
    `;
    document.head.appendChild(printStyles);

    console.log('Microsoft ME5 Security Website initialized successfully!');
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Press 'H' to go home
    if (e.key === 'h' || e.key === 'H') {
        if (e.ctrlKey || e.metaKey) {
            window.location.href = 'index.html';
        }
    }
    
    // Press 'P' to go to problem page
    if (e.key === 'p' || e.key === 'P') {
        if (e.ctrlKey || e.metaKey) {
            window.location.href = 'problem.html';
        }
    }
    
    // Press 'S' to go to solution page
    if (e.key === 's' || e.key === 'S') {
        if (e.ctrlKey || e.metaKey) {
            window.location.href = 'solution.html';
        }
    }
});