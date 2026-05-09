const fs = require('fs');
const path = require('path');

const baseHtml = fs.readFileSync('Index.html', 'utf8');

const headMatch = baseHtml.match(/<head>([\s\S]*?)<\/head>/);
const head = headMatch ? headMatch[1] : '';

const headerMatch = baseHtml.match(/<header[^>]*>([\s\S]*?)<\/header>/);
const header = headerMatch ? `<header id="navbar" class="fixed top-0 left-0 w-full z-50 transition-all duration-300 glass-nav py-3 md:py-4">\n${headerMatch[1]}\n</header>` : '';

const footerMatch = baseHtml.match(/<footer[^>]*>([\s\S]*?)<\/footer>/);
const footer = footerMatch ? `<footer class="bg-[#F1FAEE] text-black mt-16 relative border-t border-gray-200">\n${footerMatch[1]}\n</footer>` : '';

function fixLinks(htmlPart) {
    let fixed = htmlPart;
    const pagesMap = {
        'home': 'Index.html', 'about': 'About.html', 'products': 'Products.html',
        'truck': 'Locations.html', 'membership': 'Membership.html', 'sustainability': 'Sustainability.html',
        'blog': 'Blog.html', 'contact': 'Contact.html', 'dashboard': 'Dashboard.html', 'cart': 'Cart.html'
    };
    for (const [key, val] of Object.entries(pagesMap)) {
        const regex = new RegExp(`href="#"\\s*data-page="${key}"`, 'g');
        fixed = fixed.replace(regex, `href="${val}"`);
    }
    return fixed;
}

const finalHeader = fixLinks(header);
const finalFooter = fixLinks(footer);
const finalMobileMenu = fixLinks(`
  <!-- ========== MOBILE HAMBURGER MENU ========== -->
  <div id="mobileMenu" class="fixed top-0 right-0 h-full w-80 bg-white/98 backdrop-blur-xl z-50 shadow-2xl transform translate-x-full transition-transform duration-400 p-6 flex flex-col gap-4 overflow-y-auto">
    <div class="flex justify-between items-center border-b border-[#95D5B2] pb-3">
      <span class="font-bold text-2xl heading-font text-[#1B4332]">EcoRefill</span>
      <button id="closeMenu" class="text-2xl text-[#1B4332]"><i class="fas fa-times"></i></button>
    </div>
    <div class="flex flex-col gap-3 text-lg font-medium">
      <a href="Index.html" class="mobile-nav-link py-2 hover:text-[#2D6A4F] transition flex items-center gap-2"><i class="fas fa-home w-6"></i> Home</a>
      <a href="About.html" class="mobile-nav-link py-2 hover:text-[#2D6A4F] transition flex items-center gap-2"><i class="fas fa-info-circle w-6"></i> About</a>
      <a href="Products.html" class="mobile-nav-link py-2 hover:text-[#2D6A4F] transition flex items-center gap-2"><i class="fas fa-box w-6"></i> Products</a>
      <a href="Locations.html" class="mobile-nav-link py-2 hover:text-[#2D6A4F] transition flex items-center gap-2"><i class="fas fa-truck w-6"></i> Truck Locations</a>
      <a href="Membership.html" class="mobile-nav-link py-2 hover:text-[#2D6A4F] transition flex items-center gap-2"><i class="fas fa-crown w-6"></i> Membership</a>
      <a href="Sustainability.html" class="mobile-nav-link py-2 hover:text-[#2D6A4F] transition flex items-center gap-2"><i class="fas fa-leaf w-6"></i> Sustainability</a>
      <a href="Blog.html" class="mobile-nav-link py-2 hover:text-[#2D6A4F] transition flex items-center gap-2"><i class="fas fa-blog w-6"></i> Blog</a>
      <a href="Contact.html" class="mobile-nav-link py-2 hover:text-[#2D6A4F] transition flex items-center gap-2"><i class="fas fa-envelope w-6"></i> Contact</a>
      <hr class="my-2 border-gray-200">
      <button id="mobileDarkToggle" class="text-left py-2 flex items-center gap-2"><i class="fas fa-moon w-6"></i> Dark Mode</button>
      <button id="mobileRtlToggle" class="text-left py-2 flex items-center gap-2"><i class="fas fa-exchange-alt w-6"></i> RTL/LTR</button>
      <div class="border-t pt-3 mt-2"><p class="font-semibold mb-2">Account</p><a href="Login.html" class="mobile-nav-link py-2 flex items-center gap-2"><i class="fas fa-user w-6"></i> Login / Register</a></div>
    </div>
  </div>
  <div id="overlay" class="fixed inset-0 bg-black/40 z-40 hidden backdrop-blur-sm"></div>
`);

const baseScripts = `
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script>
    AOS.init({ duration: 800, once: true, offset: 100 });
    
    const mobileMenu = document.getElementById('mobileMenu'), overlay = document.getElementById('overlay');
    document.getElementById('menuToggle').onclick = () => { mobileMenu.classList.remove('translate-x-full'); overlay.classList.remove('hidden'); document.body.style.overflow = 'hidden'; };
    function closeMenuAll() { mobileMenu.classList.add('translate-x-full'); overlay.classList.add('hidden'); document.body.style.overflow = ''; }
    document.getElementById('closeMenu').onclick = closeMenuAll; overlay.onclick = closeMenuAll;
    window.addEventListener('resize', () => { if (window.innerWidth >= 1024) closeMenuAll(); });
    
    let dark = false;
    document.getElementById('darkModeToggle').addEventListener('click', () => { dark = !dark; if (dark) { document.documentElement.classList.add('dark'); document.body.style.background = '#1a2a24'; document.body.style.color = '#e5e5e5'; } else { document.documentElement.classList.remove('dark'); document.body.style.background = '#F1FAEE'; document.body.style.color = '#1B4332'; } });
    document.getElementById('mobileDarkToggle').addEventListener('click', () => { document.getElementById('darkModeToggle').click(); });
    
    let rtl = false;
    document.getElementById('rtlToggle').addEventListener('click', () => { rtl = !rtl; document.documentElement.dir = rtl ? 'rtl' : 'ltr'; });
    document.getElementById('mobileRtlToggle').addEventListener('click', () => { document.getElementById('rtlToggle').click(); });
    
    window.addEventListener('scroll', () => { const nav = document.getElementById('navbar'); if (window.scrollY > 50) nav.classList.add('glass-nav-scrolled'); else nav.classList.remove('glass-nav-scrolled'); });
    
    const counters = document.querySelectorAll('.counter-number');
    const counterObserver = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { const el = entry.target; const target = parseInt(el.getAttribute('data-target')); let current = 0, inc = target / 60; const timer = setInterval(() => { current += inc; if (current >= target) { el.innerText = target; clearInterval(timer); } else el.innerText = Math.floor(current); }, 25); counterObserver.unobserve(el); } }); }, { threshold: 0.3 });
    counters.forEach(c => counterObserver.observe(c));

    // Handle Active Nav Links
    const currentPath = window.location.pathname.split('/').pop() || 'Index.html';
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.includes(currentPath) || (currentPath === 'Index.html' && (href === './' || href === 'Index.html')))) {
            link.classList.add('active-menu');
        } else {
            link.classList.remove('active-menu');
        }
    });
  </script>
`;

function buildPage(title, content) {
    return \`<!DOCTYPE html>
<html lang="en">
<head>
\${head}
</head>
<body>
\${finalHeader}
\${finalMobileMenu}
<main id="pageContent">
\${content}
</main>
\${finalFooter}
\${baseScripts}
</body>
</html>\`;
}

// Ensure the build site JS script parses our unique page chunks correctly.
