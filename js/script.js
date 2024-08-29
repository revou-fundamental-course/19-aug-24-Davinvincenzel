// Inisialisasi variabel untuk slider banner
let currentSlide = 0;
const slides = document.querySelectorAll('.banner-slide');
const slider = document.querySelector('.banner-slider');
const prevBtn = document.querySelector('.banner-prev');
const nextBtn = document.querySelector('.banner-next');

// Fungsi untuk menampilkan slide tertentu
function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentSlide = index;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Fungsi untuk menampilkan slide berikutnya
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Fungsi untuk menampilkan slide sebelumnya
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Atur interval untuk pergantian slide otomatis
let slideInterval = setInterval(nextSlide, 5000); 

// Fungsi untuk mereset interval pergantian slide
function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

// Event listener untuk tombol slide sebelumnya
if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    resetSlideInterval();
});

// Event listener untuk tombol slide berikutnya
if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    resetSlideInterval();
});

// Fungsi untuk pesan suara selamat datang sesuai nama yang user input
function playWelcomeMessage(name) {
    const message = `Welcome ${name}, to our website`;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-US'; 
    speechSynthesis.speak(utterance);
}

// Fungsi untuk membuat popup input nama yang tidak dapat di hapus melalui inspect element html
function createNamePopup() {
    const popup = document.createElement('div');
    popup.id = 'namePopup';
    popup.className = 'popup-container';
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    `;

    const content = document.createElement('div');
    content.className = 'popup-content';
    content.style.cssText = `
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: scale(0.7);
        transition: transform 0.3s ease-in-out;
    `;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Masukkan Nama Anda';
    input.style.cssText = `
        margin-bottom: 1rem;
        padding: 0.5rem;
        width: 100%;
    `;

    const button = document.createElement('button');
    button.textContent = 'Kirim';
    button.style.cssText = `
        padding: 0.5rem 1rem;
        background-color: #4a90e2;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    `;

    content.appendChild(document.createTextNode('Silahkan ketik nama anda:'));
    content.appendChild(document.createElement('br'));
    content.appendChild(document.createElement('br'));
    content.appendChild(input);
    content.appendChild(document.createElement('br'));
    content.appendChild(button);
    popup.appendChild(content);

    document.body.style.overflow = 'hidden';

    // Event listener untuk tombol kirim pada popup
    button.addEventListener('click', function() {
        const name = input.value.trim();
        if (name) {
            sessionStorage.setItem('userName', name);
            updateWelcomeMessage(name);
            document.body.removeChild(popup);
            playWelcomeMessage(name);

            document.body.style.overflow = 'auto';
        } else {
            alert('Please enter a valid name.');
        }
    });

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 10);
}

// Fungsi untuk memperbarui pesan selamat datang sesuai nama yang user input
function updateWelcomeMessage(name) {
    const welcomeElement = document.querySelector('h1');
    if (welcomeElement) {
        welcomeElement.textContent = `Welcome ${name}, to our website`;
    }
}

// Fungsi untuk memeriksa izin scroll jika user telah mengisi nama
function checkScrollPermission() {
    const userName = sessionStorage.getItem('userName');
    if (!userName) {
        document.body.style.overflow = 'hidden';
        createNamePopup();
    } else {
        document.body.style.overflow = 'auto';
        updateWelcomeMessage(userName);
    }
}

// Fungsi untuk scroll halus ke target
function smoothScroll(target) {
    const element = document.querySelector(target);
    const navHeight = document.querySelector('nav').offsetHeight;
    window.scrollTo({
        top: element.offsetTop - navHeight,
        behavior: 'smooth'
    });
}

// Fungsi untuk menangani pengiriman formulir
function handleFormSubmission(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const tanggal = document.getElementById('tanggal').value;
    const jenis = document.getElementById('jenis').value;
    const pesan = document.getElementById('pesan').value;
    
    const formattedDate = new Date(tanggal).toLocaleDateString('en-GB');
    const currentTime = new Date().toLocaleString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    });
    
    // Memperbarui tampilan pesan yang dikirim
    document.getElementById('currentTime').textContent = `Current time : ${currentTime}`;
    document.getElementById('displayName').textContent = `Nama : ${name}`;
    document.getElementById('displayTanggal').textContent = `Tanggal Lahir : ${formattedDate}`;
    document.getElementById('displayJenis').textContent = `Jenis Kelamin : ${jenis}`;
    document.getElementById('displayPesan').textContent = `Pesan : ${pesan}`;
    
    document.getElementById('messageDisplay').style.display = 'block';
}

// Event listener saat DOM telah dimuat
document.addEventListener('DOMContentLoaded', function() {
    const leftTrophy = document.getElementById('leftTrophy');
    const rightTrophy = document.getElementById('rightTrophy');
    
    // Fungsi untuk membuat posisi trophy bergerak / animasi trophy
    function updateTrophyPosition() {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercentage > 20 && scrollPercentage < 80) {
            const translateX = Math.min(120, (scrollPercentage - 20) * 2);
            
            leftTrophy.style.transform = `translateY(-50%) translateX(${translateX}px) rotate(45deg)`;
            rightTrophy.style.transform = `translateY(-50%) translateX(-${translateX}px) rotate(-45deg)`;
            
            leftTrophy.style.opacity = rightTrophy.style.opacity = Math.min(1, (scrollPercentage - 20) / 10);
        } else {
            leftTrophy.style.transform = 'translateY(-50%) translateX(0) rotate(45deg)';
            rightTrophy.style.transform = 'translateY(-50%) translateX(0) rotate(-45deg)';
            
            leftTrophy.style.opacity = rightTrophy.style.opacity = 0;
        }
    }

    window.addEventListener('scroll', updateTrophyPosition);
    
    updateTrophyPosition();
});

// Fungsi untuk menampilkan/menyembunyikan menu mobile
function toggleMobileMenu() {
    const navItems = document.querySelector('.nav-items');
    if (navItems.classList.contains('active')) {
        navItems.classList.add('sliding-out');
        navItems.addEventListener('animationend', function() {
            navItems.classList.remove('active', 'sliding-out');
        }, { once: true });
    } else {
        navItems.classList.add('active', 'sliding-in');
        navItems.addEventListener('animationend', function() {
            navItems.classList.remove('sliding-in');
        }, { once: true });
    }
}

// Fungsi untuk menutup menu mobile
function closeMobileMenu() {
    const navItems = document.querySelector('.nav-items');
    if (navItems.classList.contains('active')) {
        navItems.classList.add('sliding-out');
        navItems.addEventListener('animationend', function() {
            navItems.classList.remove('active', 'sliding-out');
        }, { once: true });
    }
}

// Event listener saat DOM telah dimuat
document.addEventListener('DOMContentLoaded', function() {
    showSlide(0);
    
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', handleFormSubmission);
    }

    // Menambahkan event listener untuk smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if (sessionStorage.getItem('userName')) {
                smoothScroll(this.getAttribute('href'));
                closeMobileMenu();
            }
        });
    });

    // Menambahkan event listener untuk tombol menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Menutup menu mobile saat mengklik di luar menu
    document.addEventListener('click', function(event) {
        const navItems = document.querySelector('.nav-items');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (!navItems.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            closeMobileMenu();
        }
    });

    // Mengatur padding atas untuk scrolling
    document.body.style.scrollPaddingTop = document.querySelector('nav').offsetHeight + 'px';

    // Memeriksa izin scroll
    checkScrollPermission();
});