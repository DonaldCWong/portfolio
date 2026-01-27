// Smooth scrolling for navigation links
const pageBody = document.body;

const startEntranceAnimation = () => {
    if (!pageBody.classList.contains('page-loading')) {
        return;
    }
    requestAnimationFrame(() => {
        pageBody.classList.add('page-loaded');
        pageBody.classList.remove('page-loading');
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startEntranceAnimation);
} else {
    startEntranceAnimation();
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add active state to navigation on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Intersection Observer for fade-in animations (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply to projects
document.querySelectorAll('.project').forEach(project => {
    project.style.opacity = '0';
    project.style.transform = 'translateY(20px)';
    project.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(project);
});

const themeToggle = document.querySelector('.theme-toggle');

const setTheme = (isDark) => {
    document.body.classList.toggle('dark-mode', isDark);
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(isDark));
        themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

if (themeToggle) {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = storedTheme ? storedTheme === 'dark' : prefersDark;
    setTheme(shouldUseDark);

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        setTheme(!isDark);
    });
}

const hero = document.querySelector('.hero');
const heroOrbs = Array.from(document.querySelectorAll('.hero-orb'));

const parseLength = (value, reference) => {
    if (!value) {
        return 0;
    }
    const trimmed = value.trim();
    if (trimmed.endsWith('vw')) {
        return (parseFloat(trimmed) / 100) * window.innerWidth;
    }
    if (trimmed.endsWith('%')) {
        return (parseFloat(trimmed) / 100) * reference;
    }
    if (trimmed.endsWith('px')) {
        return parseFloat(trimmed);
    }
    return parseFloat(trimmed) || 0;
};

const initOrbMotion = () => {
    if (!hero || heroOrbs.length === 0) {
        return;
    }

    let heroRect = hero.getBoundingClientRect();
    const speed = 30;
    const minGap = 40;
    const wrapPadding = 160;

    const orbStates = heroOrbs.map((orb) => {
        const style = getComputedStyle(orb);
        const size = parseFloat(style.width) || 140;
        const baseYVar = style.getPropertyValue('--orb-base-y').trim();
        const baseYPercent = baseYVar.endsWith('%') ? parseFloat(baseYVar) / 100 : null;
        const baseY = baseYPercent !== null ? baseYPercent * heroRect.height : parseFloat(baseYVar) || 0;
        const xOffset = parseLength(style.getPropertyValue('--orb-x'), heroRect.width);
        return {
            el: orb,
            size,
            x: Math.random() * heroRect.width + xOffset,
            y: baseY,
            baseYPercent,
            baseY
        };
    });

    const updateBounds = () => {
        heroRect = hero.getBoundingClientRect();
        orbStates.forEach((state) => {
            state.baseY = state.baseYPercent !== null
                ? state.baseYPercent * heroRect.height
                : state.baseY;
            state.y = Math.min(Math.max(state.y, 0), heroRect.height - state.size);
        });
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);

    let lastTime = performance.now();

    const tick = (now) => {
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;

        const width = heroRect.width;
        const height = heroRect.height;

        orbStates.forEach((state) => {
            state.x += speed * dt;
            if (state.x > width + wrapPadding) {
                state.x = -wrapPadding;
            }
        });

        for (let i = 0; i < orbStates.length; i += 1) {
            for (let j = i + 1; j < orbStates.length; j += 1) {
                const a = orbStates[i];
                const b = orbStates[j];
                const dx = b.x - a.x;
                const dy = b.y - a.y;
                const dist = Math.hypot(dx, dy) || 0.001;
                const minDist = (a.size + b.size) / 2 + minGap;

                if (dist < minDist) {
                    const overlap = minDist - dist;
                    const push = overlap / 2;
                    const nx = dx / dist;
                    const ny = dy / dist;
                    a.x -= nx * push;
                    a.y -= ny * push;
                    b.x += nx * push;
                    b.y += ny * push;
                }
            }
        }

        orbStates.forEach((state) => {
            state.y += (state.baseY - state.y) * 0.02;
            state.y = Math.min(Math.max(state.y, 0), height - state.size);
            state.el.style.setProperty('--orb-tx', `${state.x}px`);
            state.el.style.setProperty('--orb-ty', `${state.y}px`);
        });

        requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
};

initOrbMotion();
