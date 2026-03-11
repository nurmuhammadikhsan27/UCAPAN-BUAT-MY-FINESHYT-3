/* =============================================
   BIRTHDAY GREETING - AMALIA NURUL AZKIA
   Interactive JavaScript
   ============================================= */

// =============================================
// BACKGROUND MUSIC
// =============================================
let bgMusic = null;
let musicPlaying = false;

function initBackgroundMusic() {
    bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) {
        bgMusic = new Audio('music/birthday-music.mp3');
        bgMusic.id = 'bgMusic';
    }
    bgMusic.loop = true;
    bgMusic.volume = 0.2; // Volume 50%
}

function playBackgroundMusic() {
    if (!bgMusic) initBackgroundMusic();
    bgMusic.play().then(() => {
        musicPlaying = true;
        updateMusicButton();
    }).catch(err => {
        console.log('Autoplay dicegah browser, user perlu klik tombol musik.');
    });
}

function toggleMusic() {
    if (!bgMusic) initBackgroundMusic();

    if (musicPlaying) {
        bgMusic.pause();
        musicPlaying = false;
    } else {
        bgMusic.play().then(() => {
            musicPlaying = true;
        }).catch(err => {
            console.log('Gagal memutar musik:', err);
        });
    }
    updateMusicButton();
}

function updateMusicButton() {
    const btn = document.getElementById('musicToggleBtn');
    if (!btn) return;
    if (musicPlaying) {
        btn.innerHTML = '🔊';
        btn.title = 'Matikan Musik';
        btn.classList.add('playing');
        btn.classList.remove('muted');
    } else {
        btn.innerHTML = '🔇';
        btn.title = 'Nyalakan Musik';
        btn.classList.remove('playing');
        btn.classList.add('muted');
    }
}

// =============================================
// PRELOADER
// =============================================
window.addEventListener('load', () => {
    const countdownEl = document.getElementById('countdownPreloader');
    const loaderText = document.getElementById('loaderText');
    let count = 3;

    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownEl.textContent = count;
            countdownEl.style.animation = 'none';
            void countdownEl.offsetWidth;
            countdownEl.style.animation = 'countdownPop 0.8s ease-out';
        } else {
            clearInterval(countdownInterval);
            countdownEl.style.display = 'none';
            loaderText.style.display = 'block';

            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    initHeroAnimations();
                }, 800);
            }, 1500);
        }
    }, 1000);

    // Trigger initial pop animation
    countdownEl.style.animation = 'countdownPop 0.8s ease-out';
});

// =============================================
// SET BIRTHDAY DATE
// =============================================
const dateEl = document.getElementById('birthday-date');
dateEl.textContent = '12 Maret 2004';

// =============================================
// HERO ANIMATIONS (Fade In)
// =============================================
function initHeroAnimations() {
    const fadeElements = document.querySelectorAll('#hero .fade-in');
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 200);
    });

    // Show scroll indicator after hero animations
    setTimeout(() => {
        const scrollIndicator = document.getElementById('scrollIndicator');
        scrollIndicator.classList.add('show');
    }, 2000);
}

// =============================================
// START CELEBRATION (Button Click)
// =============================================
let celebrationStarted = false;

function startCelebration() {
    if (celebrationStarted) return;
    celebrationStarted = true;

    // Play background music saat celebration dimulai
    playBackgroundMusic();

    // Launch confetti
    launchConfetti();

    // Start floating hearts
    startFloatingHearts();

    // Start sparkle effect
    initSparkles();

    // Smooth scroll to wishes
    setTimeout(() => {
        document.getElementById('wishes').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
}

// =============================================
// FLOATING HEARTS
// =============================================
const heartEmojis = ['💖', '💗', '💝', '💕', '❤️', '💜', '🌸', '✨', '🦋', '🌹'];
let heartsInterval;

function startFloatingHearts() {
    const container = document.getElementById('hearts-container');

    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 14) + 'px';
        heart.style.animationDuration = (Math.random() * 6 + 8) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 16000);
    }

    // Create initial batch
    for (let i = 0; i < 8; i++) {
        setTimeout(createHeart, i * 300);
    }

    // Continue creating hearts
    heartsInterval = setInterval(createHeart, 1200);
}

// =============================================
// SPARKLE CANVAS
// =============================================
function initSparkles() {
    const canvas = document.getElementById('sparkle-canvas');
    const ctx = canvas.getContext('2d');
    let sparkles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Sparkle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random();
            this.fadeSpeed = Math.random() * 0.02 + 0.005;
            this.growing = Math.random() > 0.5;
            this.color = `hsla(${Math.random() * 60 + 310}, 100%, ${Math.random() * 30 + 70}%, `;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.growing) {
                this.opacity += this.fadeSpeed;
                if (this.opacity >= 1) this.growing = false;
            } else {
                this.opacity -= this.fadeSpeed;
                if (this.opacity <= 0) this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.opacity + ')';
            ctx.fill();

            // Glow effect
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color + (this.opacity * 0.3) + ')';
            ctx.fill();
        }
    }

    // Create sparkles
    for (let i = 0; i < 50; i++) {
        sparkles.push(new Sparkle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sparkles.forEach(sparkle => {
            sparkle.update();
            sparkle.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// =============================================
// CONFETTI EFFECT
// =============================================
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = ['#ff6eb4', '#ffd700', '#ff4081', '#9c27b0', '#ff6b9d', '#e91e8c', '#ffed4a', '#ffa3c4'];

    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.width = Math.random() * 12 + 6;
            this.height = Math.random() * 8 + 4;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speedY = Math.random() * 4 + 2;
            this.speedX = (Math.random() - 0.5) * 4;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 10;
            this.opacity = 1;
            this.gravity = 0.05;
            this.wobble = Math.random() * 10;
            this.wobbleSpeed = Math.random() * 0.1;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.wobble) * 0.5;
            this.speedY += this.gravity;
            this.rotation += this.rotationSpeed;
            this.wobble += this.wobbleSpeed;

            if (this.y > canvas.height + 20) {
                this.opacity -= 0.02;
            }
        }

        draw() {
            if (this.opacity <= 0) return;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        }
    }

    // Create confetti in bursts
    let burstCount = 0;
    const burstInterval = setInterval(() => {
        for (let i = 0; i < 30; i++) {
            confettiPieces.push(new ConfettiPiece());
        }
        burstCount++;
        if (burstCount >= 5) clearInterval(burstInterval);
    }, 300);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();
        });

        // Remove dead pieces
        for (let i = confettiPieces.length - 1; i >= 0; i--) {
            if (confettiPieces[i].opacity <= 0) {
                confettiPieces.splice(i, 1);
            }
        }

        if (confettiPieces.length > 0) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}

// =============================================
// SCROLL REVEAL
// =============================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// =============================================
// TYPEWRITER EFFECT
// =============================================
const typewriterMessages = [
    "Amalia Nurul Azkia yang tersayang...",
    "Kamu adalah sosok yang luar biasa.",
    "Terimah kasih atas Kehadiranmu yang membawa kebahagiaan dan kehangatan.",
    "Semoga di usia yang baru ini,",
    "Allah selalu memberkahi setiap langkahmu.",
    "Tetaplah menjadi pribadi yang menginspirasi banyak orang.",
    "Selamat ulang tahun, semoga bahagia selalu my baby! 💖"
];

let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterStarted = false;

function typeWriter() {
    const target = document.getElementById('typewriter');
    const cursor = document.getElementById('cursor');

    if (!target) return;

    const currentMessage = typewriterMessages[messageIndex];

    if (!isDeleting) {
        target.textContent = currentMessage.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentMessage.length) {
            // Pause at end of message
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, 2000);
            return;
        }
    } else {
        target.textContent = currentMessage.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % typewriterMessages.length;
        }
    }

    const speed = isDeleting ? 30 : 60;
    setTimeout(typeWriter, speed);
}

// Start typewriter when message section is visible
const messageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !typewriterStarted) {
            typewriterStarted = true;
            typeWriter();
        }
    });
}, { threshold: 0.3 });

const messageSection = document.getElementById('message');
if (messageSection) {
    messageObserver.observe(messageSection);
}

// =============================================
// BLOW CANDLE
// =============================================
let candlesBlown = 0;
const totalCandles = 5;

function blowCandle(candle) {
    if (candle.classList.contains('blown')) return;

    candle.classList.add('blown');
    candlesBlown++;

    // Add poof animation
    const poof = document.createElement('div');
    poof.style.cssText = `
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.5rem;
        animation: poofUp 1s ease-out forwards;
        pointer-events: none;
    `;
    poof.textContent = '💨';
    candle.appendChild(poof);
    setTimeout(() => poof.remove(), 1000);

    if (candlesBlown === totalCandles) {
        setTimeout(() => {
            document.getElementById('wishMessage').classList.add('show');
            launchConfetti();

            // Extra celebration burst
            setTimeout(launchConfetti, 1500);
        }, 500);
    }
}

// Add poof animation to stylesheet
const poofStyle = document.createElement('style');
poofStyle.textContent = `
    @keyframes poofUp {
        0% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-40px) scale(2); }
    }
`;
document.head.appendChild(poofStyle);

// =============================================
// COUNTDOWN TIMER
// =============================================
function updateCountdown() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const diff = now - startOfYear;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    animateCounter('count-days', days);
    animateCounter('count-hours', hours);
    animateCounter('count-minutes', minutes);
    animateCounter('count-seconds', seconds);
}

function animateCounter(id, target) {
    const el = document.getElementById(id);
    if (!el) return;

    const current = parseInt(el.textContent) || 0;
    if (current !== target) {
        el.textContent = target;
        el.style.transform = 'scale(1.1)';
        setTimeout(() => {
            el.style.transform = 'scale(1)';
        }, 200);
    }
}

// Countdown observer
const countdownObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateCountdown();
            setInterval(updateCountdown, 1000);
            countdownObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const countdownSection = document.getElementById('countdown');
if (countdownSection) {
    countdownObserver.observe(countdownSection);
}

// =============================================
// MOUSE TRAIL EFFECT
// =============================================
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.85) {
        createMouseTrail(e.clientX, e.clientY);
    }
});

function createMouseTrail(x, y) {
    const trail = document.createElement('span');
    trail.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        font-size: ${Math.random() * 12 + 8}px;
        z-index: 9998;
        animation: trailFade 1s ease-out forwards;
    `;
    trail.textContent = ['✨', '💖', '⭐', '🌸'][Math.floor(Math.random() * 4)];
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 1000);
}

// Add trail animation to stylesheet
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        0% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(-30px) scale(0.3); }
    }
`;
document.head.appendChild(trailStyle);

// =============================================
// PARALLAX ON MOUSE MOVE (Hero only)
// =============================================
document.addEventListener('mousemove', (e) => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    if (e.clientY > rect.bottom) return;

    const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
    const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translate(${xPercent * 5}px, ${yPercent * 5}px)`;
    }
});

// =============================================
// RESIZE HANDLER
// =============================================
window.addEventListener('resize', () => {
    const confettiCanvas = document.getElementById('confetti-canvas');
    if (confettiCanvas) {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
});

// =============================================
// LIGHTBOX (Photo Gallery)
// =============================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

const photoItems = document.querySelectorAll('.photo-item');
let currentPhotoIndex = 0;

const photos = [];
photoItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.photo-caption p');
    photos.push({
        src: img.src,
        caption: caption ? caption.textContent : ''
    });

    item.addEventListener('click', () => {
        currentPhotoIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightboxImg.src = photos[currentPhotoIndex].src;
    lightboxCaption.textContent = photos[currentPhotoIndex].caption;
    lightbox.style.display = 'flex';
    requestAnimationFrame(() => {
        lightbox.classList.add('active');
    });
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 400);
    document.body.style.overflow = '';
}

function showPrevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    lightboxImg.src = photos[currentPhotoIndex].src;
    lightboxCaption.textContent = photos[currentPhotoIndex].caption;
    lightboxImg.style.animation = 'none';
    void lightboxImg.offsetWidth;
    lightboxImg.style.animation = 'lightboxZoom 0.4s ease';
}

function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    lightboxImg.src = photos[currentPhotoIndex].src;
    lightboxCaption.textContent = photos[currentPhotoIndex].caption;
    lightboxImg.style.animation = 'none';
    void lightboxImg.offsetWidth;
    lightboxImg.style.animation = 'lightboxZoom 0.4s ease';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevPhoto);
if (lightboxNext) lightboxNext.addEventListener('click', showNextPhoto);

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevPhoto();
    if (e.key === 'ArrowRight') showNextPhoto();
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// =============================================
// POPUP NEMBAK (Confession Popup)
// =============================================
function bukaPopupNembak() {
    document.getElementById('popupNembak').style.display = 'flex';
}

function terimaCinta() {
    // Reaksi saat dia klik YES
    alert("Yeyyy! Akhirnya kita jadian! I Love You Amalia! ❤️❤️❤️");
    document.getElementById('popupNembak').style.display = 'none';
}

function kabur() {
    const btnNo = document.getElementById('btnNo');

    // Mengubah posisi tombol NO jadi fixed biar bisa terbang-terbang
    btnNo.style.position = 'fixed';

    // Hitung batas layar biar tombolnya gak keluar layar
    const maxX = window.innerWidth - btnNo.offsetWidth - 20;
    const maxY = window.innerHeight - btnNo.offsetHeight - 20;

    // Bikin posisi acak
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Pindahkan tombolnya
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
}

// =============================================
// INITIAL SCROLL CHECK & MUSIC BUTTON STYLES
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    initBackgroundMusic();

    // Inject music toggle button styles
    const musicBtnStyle = document.createElement('style');
    musicBtnStyle.textContent = `
        #musicToggleBtn {
            position: fixed;
            bottom: 25px;
            right: 25px;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            border: none;
            background: linear-gradient(135deg, #ff6eb4, #ff4081, #e91e8c);
            color: white;
            font-size: 24px;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 4px 20px rgba(255, 64, 129, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: musicPulse 2s ease-in-out infinite;
        }

        #musicToggleBtn:hover {
            transform: scale(1.15);
            box-shadow: 0 6px 28px rgba(255, 64, 129, 0.7);
        }

        #musicToggleBtn.playing {
            animation: musicPulse 2s ease-in-out infinite;
        }

        #musicToggleBtn.muted {
            animation: none;
            opacity: 0.7;
        }

        @keyframes musicPulse {
            0%, 100% { transform: scale(1); box-shadow: 0 4px 20px rgba(255, 64, 129, 0.5); }
            50% { transform: scale(1.08); box-shadow: 0 6px 28px rgba(255, 64, 129, 0.7); }
        }
    `;
    document.head.appendChild(musicBtnStyle);
});

console.log('🎂 Selamat Ulang Tahun, Amalia Nurul Azkia! 💖');
console.log('🌹 Website ini dibuat dengan penuh cinta');
