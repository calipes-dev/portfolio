// Scroll to Top Button Visibility
        window.addEventListener('scroll', function() {
            const scrollBtn = document.getElementById('scrollToTop');
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        function toggleMenu() {
            const burger = document.getElementById('burgerMenu');
            const navLeft = document.getElementById('navLeft');
            burger.classList.toggle('active');
            navLeft.classList.toggle('active');
        }

        function scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Update active nav item
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                event.target.closest('.nav-item').classList.add('active');

                // Close menu on mobile after clicking
                if (window.innerWidth <= 991) {
                    const burger = document.getElementById('burgerMenu');
                    const navLeft = document.getElementById('navLeft');
                    burger.classList.remove('active');
                    navLeft.classList.remove('active');
                }
            }
        }

        function toggleBlog() {
            const content = document.getElementById('blogContent');
            const btn = document.getElementById('readMoreBtn');
            const btnText = document.getElementById('readMoreText');
            
            if (content.classList.contains('collapsed')) {
                content.classList.remove('collapsed');
                btnText.textContent = 'Read Less';
                btn.classList.add('expanded');
            } else {
                content.classList.add('collapsed');
                btnText.textContent = 'Read More';
                btn.classList.remove('expanded');
                // Scroll back to blog section
                document.getElementById('blog').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }