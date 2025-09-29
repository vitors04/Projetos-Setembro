// Animação de contadores
function animateCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (target % 1 === 0) {
                    counter.textContent = Math.ceil(current);
                } else {
                    counter.textContent = current.toFixed(1);
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target % 1 === 0 ? target : target.toFixed(1);
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer para animações
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animar contadores quando a seção de stats aparecer
                if (entry.target.classList.contains('stats') || 
                    entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.achievement-item, .stat-card, .about-content, .hero-stats');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Header scroll effect
function setupHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Menu mobile
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Smooth scroll para links internos
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Formulário de contato
function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simular envio do formulário
            const submitBtn = form.querySelector('.btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso!');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Efeito parallax no hero
function setupParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Adicionar classe de carregamento
function setupPageLoad() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Iniciar animação dos contadores do hero após carregamento
        setTimeout(() => {
            const heroStats = document.querySelector('.hero-stats');
            if (heroStats) {
                animateCounters();
            }
        }, 1000);
    });
}

// Efeito de digitação no título
function setupTypingEffect() {
    const title = document.querySelector('.hero-content h1');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid var(--secondary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1500);
    }
}

// Adicionar efeitos de hover dinâmicos
function setupDynamicHovers() {
    const cards = document.querySelectorAll('.achievement-item, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });
}

// Inicializar todas as funcionalidades
document.addEventListener('DOMContentLoaded', () => {
    setupHeaderScroll();
    setupMobileMenu();
    setupSmoothScroll();
    setupContactForm();
    setupScrollAnimations();
    setupParallax();
    setupPageLoad();
    setupDynamicHovers();
    
    // Efeito de digitação com delay
    setTimeout(setupTypingEffect, 500);
});

// Adicionar alguns easter eggs
document.addEventListener('keydown', (e) => {
    // Konami Code para Stephen Curry
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    window.konamiIndex = window.konamiIndex || 0;
    
    if (e.keyCode === konamiCode[window.konamiIndex]) {
        window.konamiIndex++;
        if (window.konamiIndex === konamiCode.length) {
            // Easter egg ativado
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
                alert('🏀 Splash! You found the secret code! 🏀');
            }, 2000);
            window.konamiIndex = 0;
        }
    } else {
        window.konamiIndex = 0;
    }
});

// Adicionar efeito de chuva de basquetes (easter egg)
function createBasketballRain() {
    const basketballs = ['🏀', '⛹️‍♂️', '🏆', '⭐'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const basketball = document.createElement('div');
            basketball.textContent = basketballs[Math.floor(Math.random() * basketballs.length)];
            basketball.style.position = 'fixed';
            basketball.style.top = '-50px';
            basketball.style.left = Math.random() * window.innerWidth + 'px';
            basketball.style.fontSize = '2rem';
            basketball.style.zIndex = '9999';
            basketball.style.pointerEvents = 'none';
            basketball.style.animation = 'fall 3s linear forwards';
            
            document.body.appendChild(basketball);
            
            setTimeout(() => {
                basketball.remove();
            }, 3000);
        }, i * 200);
    }
}

// CSS para animação de queda
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(calc(100vh + 50px)) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Ativar chuva de basquetes ao clicar 5 vezes no logo
let logoClicks = 0;
document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();
    logoClicks++;
    
    if (logoClicks === 5) {
        createBasketballRain();
        logoClicks = 0;
    }
    
    setTimeout(() => {
        logoClicks = 0;
    }, 3000);
});