/**
 * BRUNO LOUREIRO | CTO & AI ARCHITECT
 * ENGINE DE INTERAÇÃO ELITE V4.0 - FULL STACK READY
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inicializa Ícones Lucide
    const initIcons = () => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    // 2. Spotlight Pro: Luz que segue o mouse nos cards .glass
    const initSpotlight = () => {
        const cards = document.querySelectorAll('.glass');
        window.addEventListener('mousemove', (e) => {
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    };

    // 3. EFEITO MÁQUINA DE ESCREVER (TYPEWRITER)
    const initTypewriter = () => {
        const textElement = document.getElementById('typewriter');
        if (!textElement) return;

        const phrases = [
            "via WhatsApp com IA Vision de ponta.",
            "que vale R$ 7.500,00.",
            "que automatiza contabilidades.",
            "em apenas 10 sessões vips."
        ];
        
        let phraseIndex = 0;
        let characterIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                textElement.textContent = currentPhrase.substring(0, characterIndex - 1);
                characterIndex--;
                typeSpeed = 50; 
            } else {
                textElement.textContent = currentPhrase.substring(0, characterIndex + 1);
                characterIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && characterIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000; 
            } else if (isDeleting && characterIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };
        type();
    };

    // 4. Contador Dashboard (Do 0 ao R$ 42.500,00)
    const animateValue = (id, start, end, duration) => {
        const obj = document.getElementById(id);
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentVal = Math.floor(progress * (end - start) + start);
            obj.innerHTML = `R$ ${currentVal.toLocaleString('pt-BR')},00`;
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    };

    // 5. Reveal on Scroll: Faz as seções surgirem suavemente
    const initScrollReveal = () => {
        const observerOptions = { threshold: 0.1 };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    
                    if (entry.target.querySelector('#count-dashboard') || entry.target.id === 'count-dashboard') {
                        animateValue("count-dashboard", 0, 42500, 2500);
                    }
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('section, main > div, .glass').forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
            revealObserver.observe(el);
        });
    };

    // 6. CARREGAMENTO DINÂMICO DA SEÇÃO "SOBRE"
    const loadAboutSection = async () => {
        const container = document.getElementById('about-container');
        if (!container) return;

        try {
            const response = await fetch('about.html');
            if (response.ok) {
                const html = await response.text();
                container.innerHTML = html;
                
                // RE-INICIALIZA efeitos para o conteúdo novo
                initIcons();
                initSpotlight();
                initScrollReveal();
                
                console.log("✅ Seção 'Quem Sou Eu' injetada com sucesso.");
            }
        } catch (error) {
            console.error("❌ Erro ao carregar a seção sobre:", error);
        }
    };

    // 7. Assinatura de CTO no Console
    const consoleSignature = () => {
        const style = 'background: linear-gradient(90deg, #3b82f6, #2dd4bf); color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold; font-size: 14px;';
        console.log("%c BRUNO LOUREIRO | AI ARCHITECT & CTO ", style);
        console.log("🚀 Status: Sistema SaaS IA v4.0 Online.");
        console.log("🛠️ Stack: Node.js, GPT-4o Vision, Supabase.");
    };

    // --- EXECUÇÃO DA ENGINE ---
    initIcons();
    initSpotlight();
    initTypewriter();
    initScrollReveal();
    loadAboutSection(); // Injeta a nova seção
    consoleSignature();
});
