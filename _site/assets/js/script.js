(() => {
	const SELECTORS = {
		navToggle: '.nav-toggle',
		nav: '.site-nav',
		navLink: '.nav-link',
		scrollTop: '#scroll-top',
		year: '#year'
	};

	function initYear() {
		const yearElement = document.querySelector(SELECTORS.year);
		if (yearElement) {
			yearElement.textContent = new Date().getFullYear();
		}
	}

	function initNavigation() {
		const navToggle = document.querySelector(SELECTORS.navToggle);
		const siteNav = document.querySelector(SELECTORS.nav);
		const navLinks = Array.from(document.querySelectorAll(SELECTORS.navLink));

		if (!navToggle || !siteNav) {
			return;
		}

		navToggle.addEventListener('click', () => {
			const isOpen = siteNav.classList.toggle('is-open');
			navToggle.setAttribute('aria-expanded', String(isOpen));
		});

		navLinks.forEach((link) => {
			link.addEventListener('click', () => {
				siteNav.classList.remove('is-open');
				navToggle.setAttribute('aria-expanded', 'false');
			});
		});
	}

	function initActiveSection() {
		const navLinks = Array.from(document.querySelectorAll(SELECTORS.navLink));
		const sections = navLinks
			.map((link) => link.getAttribute('href'))
			.filter((href) => href && href.startsWith('#'))
			.map((href) => document.getElementById(href.slice(1)))
			.filter(Boolean);

		if (!sections.length) {
			return;
		}

		const update = () => {
			const offset = window.scrollY + 140;
			let currentSectionId = sections[0].id;

			for (const section of sections) {
				if (section.offsetTop <= offset) {
					currentSectionId = section.id;
				}
			}

			navLinks.forEach((link) => {
				const href = link.getAttribute('href');
				link.classList.toggle('is-active', href === `#${currentSectionId}`);
			});
		};

		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		update();
	}

	function initScrollTop() {
		const button = document.querySelector(SELECTORS.scrollTop);
		if (!button) {
			return;
		}

		const updateVisibility = () => {
			button.classList.toggle('visible', window.scrollY > 320);
		};

		button.addEventListener('click', () => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});

		window.addEventListener('scroll', updateVisibility, { passive: true });
		updateVisibility();
	}

	function init() {
		initYear();
		initNavigation();
		initActiveSection();
		initScrollTop();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init, { once: true });
	} else {
		init();
	}
})();

