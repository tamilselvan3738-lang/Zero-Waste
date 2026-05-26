const fs = require('fs');
const path = require('path');

const baseHtml = fs.readFileSync('Index.html', 'utf8');

// Extract Head
const headMatch = baseHtml.match(/<head>([\s\S]*?)<\/head>/);
const head = headMatch ? headMatch[1] : '';

// Extract Header
const headerMatch = baseHtml.match(/<header[^>]*>([\s\S]*?)<\/header>/);
const header = headerMatch ? `<header id="navbar" class="fixed top-0 left-0 w-full z-50 transition-all duration-300 glass-nav py-3 md:py-4">\n${headerMatch[1]}\n</header>` : '';

// Extract Footer
const footerMatch = baseHtml.match(/<footer[^>]*>([\s\S]*?)<\/footer>/);
const footer = footerMatch ? `<footer class="bg-[#F1FAEE] text-black mt-16 relative border-t border-gray-200">\n${footerMatch[1]}\n</footer>` : '';

// Function to replace nav links with actual hrefs
function fixLinks(htmlPart) {
    let fixed = htmlPart;
    const pagesMap = {
        'home': 'Index.html',
        'about': 'About.html',
        'products': 'Products.html',
        'truck': 'Locations.html',
        'membership': 'Membership.html',
        'sustainability': 'Sustainability.html',
        'blog': 'Blog.html',
        'contact': 'Contact.html',
        'dashboard': 'Dashboard.html',
        'cart': 'Cart.html'
    };
    
    // Replace <a href="#" data-page="xxx"> with <a href="Xxx.html">
    for (const [key, val] of Object.entries(pagesMap)) {
        const regex = new RegExp(`href="#"\\s*data-page="${key}"`, 'g');
        fixed = fixed.replace(regex, `href="${val}"`);
    }
    
    // Remove the hover-underline active menu logic from JS, we'll handle it via CSS if needed, 
    // or just let them be normal links.
    return fixed;
}

const finalHeader = fixLinks(header);
const finalFooter = fixLinks(footer);
const finalMobileMenu = fixLinks(`
  <!-- ========== MOBILE HAMBURGER MENU ========== -->
  <div id="mobileMenu" class="fixed top-0 right-0 h-full w-80 bg-white/98 backdrop-blur-xl z-50 shadow-2xl transform translate-x-full transition-transform duration-400 p-6 flex flex-col gap-4 overflow-y-auto">
    <div class="flex justify-between items-center border-b border-[#95D5B2] pb-3">
      <div class="flex items-center gap-2">
        <img src="favicon.png" alt="EcoRefill Logo" class="w-8 h-8 object-contain">
        <span class="font-bold text-2xl heading-font text-[#1B4332]">EcoRefill</span>
      </div>
      <button id="closeMenu" class="text-2xl text-[#1B4332]"><i class="fas fa-times"></i></button>
    </div>
    <div class="flex flex-col gap-3 text-lg font-medium">
      <div>
        <button class="w-full text-left py-2 hover:text-[#2D6A4F] transition flex items-center justify-between" onclick="document.getElementById('mobileHomeDrop').classList.toggle('hidden')">
          <span class="flex items-center gap-2"><i class="fas fa-home w-6"></i> Home</span>
          <i class="fas fa-chevron-down text-sm"></i>
        </button>
        <div id="mobileHomeDrop" class="hidden pl-8 flex flex-col gap-2 pt-2">
          <a href="Index.html" class="mobile-nav-link hover:text-[#2D6A4F] transition">Home 1</a>
          <a href="Index.html" class="mobile-nav-link hover:text-[#2D6A4F] transition">Home 2</a>
        </div>
      </div>
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
    return `<!DOCTYPE html>
<html lang="en">
<head>
${head}
</head>
<body>
${finalHeader}
${finalMobileMenu}
<main id="pageContent">
${content}
</main>
${finalFooter}
${baseScripts}
</body>
</html>`;
}

// ==========================================
// SECTIONS CONTENT
// ==========================================

const pagesContent = {
  'Index.html': `
      <!-- 1. Hero Section -->
      <section class="relative pt-32 md:pt-40 pb-20 overflow-hidden" style="background-image: url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=800&fit=crop'); background-size: cover; background-position: center;">
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div class="container mx-auto px-5 md:px-8 relative z-10">
          <div class="max-w-2xl" data-aos="fade-right"><span class="bg-[#95D5B2] text-[#1B4332] px-5 py-2 rounded-full text-sm font-semibold inline-block">Zero-Waste Grocery on Wheels</span><h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mt-5 heading-font text-white leading-tight">Refill. <span class="text-[#95D5B2]">Reduce.</span> Repeat.</h1><p class="text-lg text-gray-100 mt-4">Mobile refill truck brings bulk organic groceries to your neighborhood. Plastic-free, carbon-smart, and convenient.</p><div class="flex flex-wrap gap-4 mt-8"><a href="Locations.html" class="btn-gradient text-white px-8 py-3.5 rounded-full font-semibold shadow-2xl inline-block"><i class="fas fa-map-marker-alt mr-2"></i> Track Our Truck</a><a href="About.html" class="bg-white/20 backdrop-blur-sm border border-white text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/30 transition inline-block">Learn More</a></div></div>
        </div>
        <div class="absolute bottom-10 left-5 floating-leaf"><i class="fas fa-leaf text-5xl text-[#95D5B2] opacity-70"></i></div>
      </section>

      <!-- 2. Why Choose Us -->
      <section class="py-20 bg-white" data-aos="fade-up"><div class="container mx-auto px-5 md:px-8"><div class="text-center max-w-2xl mx-auto mb-12"><h2 class="text-3xl md:text-4xl font-bold heading-font text-[#1B4332]">Why Choose EcoRefill</h2><p class="text-gray-600 mt-3">Join thousands making sustainable choices every day</p></div><div class="grid md:grid-cols-3 gap-8"><div class="bg-[#F1FAEE] p-8 rounded-3xl shadow-xl card-hover text-center"><i class="fas fa-leaf text-5xl text-[#2D6A4F] mb-4"></i><h3 class="text-xl font-bold">100% Plastic-Free</h3><p class="mt-2">Return & refill jars, compostable packaging</p></div><div class="bg-[#F1FAEE] p-8 rounded-3xl shadow-xl card-hover text-center"><i class="fas fa-truck-fast text-5xl text-[#2D6A4F] mb-4"></i><h3 class="text-xl font-bold">Live Truck Tracking</h3><p class="mt-2">Real-time location of our refill truck</p></div><div class="bg-[#F1FAEE] p-8 rounded-3xl shadow-xl card-hover text-center"><i class="fas fa-chart-line text-5xl text-[#2D6A4F] mb-4"></i><h3 class="text-xl font-bold">Smart Savings</h3><p class="mt-2">Track plastic bottles saved & money earned</p></div></div></div></section>

      <!-- 3. How It Works -->
      <section class="py-24 bg-gradient-to-br from-[#D8F3DC] to-[#F1FAEE]">
        <div class="container mx-auto px-5 md:px-8">
          <div class="grid md:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 class="text-4xl md:text-5xl font-bold heading-font text-[#1B4332] mb-4">How It Works</h2>
              <p class="text-gray-700 text-lg mb-8">A seamless, eco-friendly refill process designed to eliminate single-use plastics from your grocery routine. Start making an impact in just a few steps.</p>
              
              <div class="space-y-8">
                <div class="flex items-start gap-5">
                  <div class="w-14 h-14 bg-[#2D6A4F] text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg shrink-0">1</div>
                  <div>
                    <h4 class="text-xl font-bold text-[#1B4332] mb-1">Locate Our Truck</h4>
                    <p class="text-gray-600">Use our live tracker to find the EcoRefill truck nearest to your neighborhood. We update our schedule weekly.</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-5">
                  <div class="w-14 h-14 bg-[#2D6A4F] text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg shrink-0">2</div>
                  <div>
                    <h4 class="text-xl font-bold text-[#1B4332] mb-1">Bring Your Own Containers</h4>
                    <p class="text-gray-600">Bring glass jars, tupperware, or cloth bags. Forgot yours? We offer sterilized, compostable eco-packs on-site.</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-5">
                  <div class="w-14 h-14 bg-[#2D6A4F] text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg shrink-0">3</div>
                  <div>
                    <h4 class="text-xl font-bold text-[#1B4332] mb-1">Weigh, Refill & Pay</h4>
                    <p class="text-gray-600">Our smart scales deduct the weight of your container (tare). Dispense exactly what you need, and pay only for the product weight.</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-10 p-5 bg-white/60 rounded-2xl border border-white/80 shadow-sm backdrop-blur-sm">
                <p class="text-[#1B4332] font-semibold"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i> Pro Tip: Join our Membership for 15% off all refills and free monthly doorstep delivery!</p>
              </div>
            </div>
            
            <div class="relative" data-aos="fade-left">
              <div class="bg-white rounded-[3rem] p-8 shadow-2xl relative z-10 border border-gray-100">
                 <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=800&fit=crop" class="w-full rounded-[2rem] object-cover h-[500px]" alt="How it works">
                 <div class="absolute -bottom-10 -left-10 bg-[#95D5B2] p-6 rounded-3xl shadow-xl w-64 floating-leaf">
                    <p class="font-bold text-[#1B4332] text-lg mb-2">Zero Waste Guarantee</p>
                    <p class="text-sm text-[#1B4332]/80">100% of our products are sourced from sustainable, plastic-free farms.</p>
                 </div>
              </div>
              <div class="absolute top-1/2 -right-10 transform -translate-y-1/2 truck-moving opacity-20 -z-10">
                <i class="fas fa-truck text-[15rem] text-[#2D6A4F]"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Featured Refill Products -->
      <section class="py-20 bg-white">
        <div class="container mx-auto px-5 md:px-8">
          <div class="text-center mb-12" data-aos="fade-up"><h2 class="text-3xl md:text-4xl font-bold heading-font text-[#1B4332]">🌿 Featured Refill Products</h2><p class="text-gray-600 mt-2">Best selling zero-waste essentials from our truck</p></div>
          <div class="product-grid-auto">
            <div class="bg-[#F1FAEE] rounded-3xl p-6 shadow-xl card-hover transition-all"><div class="bg-gradient-to-br from-[#95D5B2] to-[#D8F3DC] rounded-2xl p-4 flex justify-center h-40"><i class="fas fa-seedling text-6xl text-[#2D6A4F]"></i></div><div class="flex justify-between mt-4"><span class="font-bold text-lg">Organic Basmati Rice</span><span class="text-[#2D6A4F] font-bold">$4.2/lb</span></div><p class="text-sm text-gray-500">Premium quality, direct from farms</p><div class="flex mt-3 gap-3"><input type="number" value="1" class="w-20 border rounded-xl p-2 text-center border-gray-300"><button class="bg-[#2D6A4F] text-white px-5 py-2 rounded-full text-sm hover:bg-[#40916C] transition">Add</button></div><div class="mt-2"><span class="text-xs bg-[#95D5B2] px-2 py-1 rounded-full">Eco Badge ✓</span></div></div>
            <div class="bg-[#F1FAEE] rounded-3xl p-6 shadow-xl card-hover"><div class="bg-gradient-to-br from-[#95D5B2] to-[#D8F3DC] rounded-2xl p-4 flex justify-center h-40"><i class="fas fa-mortar-pestle text-6xl text-[#2D6A4F]"></i></div><div class="flex justify-between mt-4"><span class="font-bold text-lg">Organic Spices Set</span><span class="text-[#2D6A4F] font-bold">$1.8/oz</span></div><p class="text-sm text-gray-500">Cumin, coriander, turmeric blend</p><button class="mt-3 bg-[#40916C] text-white px-4 py-2 rounded-full w-full hover:bg-[#2D6A4F] transition">Refill Now</button></div>
            <div class="bg-[#F1FAEE] rounded-3xl p-6 shadow-xl card-hover"><div class="bg-gradient-to-br from-[#95D5B2] to-[#D8F3DC] rounded-2xl p-4 flex justify-center h-40"><i class="fas fa-pump-soap text-6xl text-[#2D6A4F]"></i></div><div class="flex justify-between mt-4"><span class="font-bold text-lg">Eco Cleaning Liquid</span><span class="text-[#2D6A4F] font-bold">$7.5/refill</span></div><p class="text-sm text-gray-500">Plant-based, biodegradable</p><button class="mt-3 bg-[#2D6A4F] text-white px-4 py-2 rounded-full w-full hover:bg-[#40916C] transition">Add to Cart</button></div>
            <div class="bg-[#F1FAEE] rounded-3xl p-6 shadow-xl card-hover"><div class="bg-gradient-to-br from-[#95D5B2] to-[#D8F3DC] rounded-2xl p-4 flex justify-center h-40"><i class="fas fa-bread-slice text-6xl text-[#2D6A4F]"></i></div><div class="flex justify-between mt-4"><span class="font-bold text-lg">Organic Grains</span><span class="text-[#2D6A4F] font-bold">$3.5/lb</span></div><p class="text-sm text-gray-500">Quinoa, oats, millet mix</p><button class="mt-3 bg-[#2D6A4F] text-white px-4 py-2 rounded-full w-full">Refill</button></div>
          </div>
          <div class="text-center mt-10"><a href="Products.html" class="btn-outline-eco text-[#2D6A4F] px-8 py-3 rounded-full font-semibold inline-block">View All Products →</a></div>
        </div>
      </section>

      <!-- 5. Live Truck Tracking + Stats -->
      <section class="py-20 bg-gradient-to-r from-[#2D6A4F] to-[#40916C] text-white"><div class="container mx-auto px-5 md:px-8"><div class="grid md:grid-cols-2 gap-12 items-center"><div data-aos="fade-right"><h2 class="text-3xl md:text-4xl font-bold">🚛 Live Truck Tracking</h2><p class="mt-3 opacity-95">Our truck is currently at <span class="font-bold bg-white/20 px-3 py-1 rounded-full">Downtown Farmers Market</span> until 2PM. Next stop: Westside Community Center.</p><div class="mt-5 w-full bg-white/30 rounded-full h-3 overflow-hidden"><div class="w-2/3 h-3 bg-[#95D5B2] rounded-full"></div></div><div class="flex gap-4 mt-6"><a href="Locations.html" class="border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#2D6A4F] transition">View Full Route →</a><button class="bg-white/20 backdrop-blur px-6 py-2 rounded-full">Notify Me</button></div></div><div class="stats-grid text-center" data-aos="fade-left"><div><div class="text-4xl font-bold counter-number" data-target="28540">0</div><p class="text-sm">Plastic Bottles Saved</p></div><div><div class="text-4xl font-bold counter-number" data-target="12450">0</div><p class="text-sm">KG CO₂ Reduced</p></div><div><div class="text-4xl font-bold counter-number" data-target="1890">0</div><p class="text-sm">Trees Equivalent</p></div><div><div class="text-4xl font-bold counter-number" data-target="4230">0</div><p class="text-sm">Happy Members</p></div></div></div></div></section>

      <!-- 6. Testimonials -->
      <section class="py-20 bg-white"><div class="container mx-auto px-5 md:px-8"><h2 class="text-3xl md:text-4xl font-bold text-center text-[#1B4332] mb-12">❤️ What Our Customers Say</h2><div class="testimonial-grid"><div class="bg-[#F1FAEE] p-6 rounded-3xl shadow-lg card-hover"><i class="fas fa-star text-yellow-400 mb-3"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><p class="mt-2">"EcoRefill changed how I shop — zero waste has never been easier!"</p><h4 class="font-bold mt-4 text-[#2D6A4F]">— Sarah J.</h4></div><div class="bg-[#F1FAEE] p-6 rounded-3xl shadow-lg card-hover"><i class="fas fa-star text-yellow-400 mb-3"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><p class="mt-2">"Love tracking the truck live, organic products are amazing quality."</p><h4 class="font-bold mt-4 text-[#2D6A4F]">— Michael T.</h4></div><div class="bg-[#F1FAEE] p-6 rounded-3xl shadow-lg card-hover"><i class="fas fa-star text-yellow-400 mb-3"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><p class="mt-2">"Finally a sustainable grocery solution that's convenient and affordable."</p><h4 class="font-bold mt-4 text-[#2D6A4F]">— Elena R.</h4></div></div></div></section>
  `,
  
  'About.html': `
      <!-- 1. Our Story (Hero) -->
      <section class="relative pt-40 pb-32 overflow-hidden bg-[#081C15]" style="background-image: url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=800&fit=crop'); background-size: cover; background-position: center;">
        <div class="absolute inset-0 bg-black/60 z-0"></div>
        <div class="container mx-auto px-5 relative z-10 text-center">
          <h1 class="text-5xl md:text-7xl font-bold heading-font text-white mb-6" data-aos="fade-down">Our Story</h1>
          <p class="text-xl text-gray-200 max-w-3xl mx-auto" data-aos="fade-up">EcoRefill started with a simple idea: what if grocery shopping actually healed the planet instead of harming it?</p>
          <p class="text-lg text-gray-300 max-w-3xl mx-auto mt-6" data-aos="fade-up" data-aos-delay="100">Founded by environmental scientists and logistics experts, we recognized that traditional grocery supply chains were broken. We decided to strip away the plastic, the warehouse storage, and the carbon-heavy transport to create a truly local, zero-waste alternative that comes directly to your neighborhood.</p>
        </div>
      </section>

      <!-- 2. Mission -->
      <section class="py-24 bg-[#F1FAEE]">
        <div class="container mx-auto px-5">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="h-full min-h-[400px] bg-[#D8F3DC] rounded-[3rem] flex items-center justify-center text-[#2D6A4F] shadow-xl" data-aos="fade-right"><i class="fas fa-bullseye text-[8rem]"></i></div>
            <div data-aos="fade-left">
              <h2 class="text-4xl font-bold heading-font text-[#1B4332] mb-6">Our Mission</h2>
              <p class="text-gray-600 text-lg mb-6">To completely eliminate single-use plastics from everyday household goods by making bulk refills accessible, affordable, and incredibly convenient for every neighborhood.</p>
              <ul class="space-y-4 text-lg font-medium text-[#1B4332]">
                <li class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-[#95D5B2] flex items-center justify-center shrink-0"><i class="fas fa-check text-[#2D6A4F] text-sm"></i></div> 100% Zero-Waste Supply Chain & Operations</li>
                <li class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-[#95D5B2] flex items-center justify-center shrink-0"><i class="fas fa-check text-[#2D6A4F] text-sm"></i></div> Carbon Neutral Delivery Ecosystem</li>
                <li class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-[#95D5B2] flex items-center justify-center shrink-0"><i class="fas fa-check text-[#2D6A4F] text-sm"></i></div> Fair-Trade & Local Sourcing First</li>
                <li class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-[#95D5B2] flex items-center justify-center shrink-0"><i class="fas fa-check text-[#2D6A4F] text-sm"></i></div> Community Education & Outreach Programs</li>
              </ul>
              <p class="mt-8 text-gray-600 italic border-l-4 border-[#2D6A4F] pl-4">"We don't just sell groceries; we are actively trying to change consumer behavior by making the sustainable choice the easiest choice available."</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Vision -->
      <section class="py-24 bg-white text-center">
        <div class="container mx-auto px-5 max-w-4xl" data-aos="zoom-in">
          <i class="fas fa-eye text-6xl text-[#95D5B2] mb-8"></i>
          <h2 class="text-4xl font-bold heading-font text-[#1B4332] mb-6">Our Vision</h2>
          <p class="text-2xl text-gray-700 italic leading-relaxed">"We envision a world where the concept of 'trash' is obsolete. A circular economy where resources are continuously reused, and communities thrive in harmony with nature."</p>
          <p class="mt-8 text-lg text-gray-600 max-w-3xl mx-auto">Imagine your neighborhood where every pantry is stocked from reusable glass and cloth, where local farmers are paid fairly, and where convenience doesn't cost the Earth. That's the future we are building every single day.</p>
        </div>
      </section>

      <!-- 4. Team Members -->
      <section class="py-24 bg-[#081C15] text-white">
        <div class="container mx-auto px-5 text-center">
          <h2 class="text-4xl font-bold heading-font mb-12 text-[#F1FAEE]">Meet the Experts</h2>
          <div class="grid md:grid-cols-3 gap-12">
            <div data-aos="fade-up">
              <div class="w-48 h-48 bg-[#95D5B2] rounded-full mx-auto flex items-center justify-center mb-6 overflow-hidden border-4 border-[#2D6A4F]"><i class="fas fa-user-tie text-7xl text-white"></i></div>
              <h3 class="text-2xl font-bold text-[#F1FAEE]">Jane Doe</h3>
              <p class="text-[#95D5B2] font-semibold text-sm uppercase mt-1 tracking-widest">Founder & CEO</p>
              <p class="mt-4 text-gray-300 text-sm px-4">With 15 years in sustainable agriculture, Jane leads our strategic vision and builds direct partnerships with our local organic farmers.</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <div class="w-48 h-48 bg-[#40916C] rounded-full mx-auto flex items-center justify-center mb-6 overflow-hidden border-4 border-[#2D6A4F]"><i class="fas fa-user-astronaut text-7xl text-white"></i></div>
              <h3 class="text-2xl font-bold text-[#F1FAEE]">John Smith</h3>
              <p class="text-[#95D5B2] font-semibold text-sm uppercase mt-1 tracking-widest">Head of Logistics</p>
              <p class="mt-4 text-gray-300 text-sm px-4">A former Amazon logistics director who left the corporate world to build the world's first fully electric, AI-route-optimized grocery fleet.</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <div class="w-48 h-48 bg-[#2D6A4F] rounded-full mx-auto flex items-center justify-center mb-6 overflow-hidden border-4 border-[#40916C]"><i class="fas fa-user-graduate text-7xl text-white"></i></div>
              <h3 class="text-2xl font-bold text-[#F1FAEE]">Maria Garcia</h3>
              <p class="text-[#95D5B2] font-semibold text-sm uppercase mt-1 tracking-widest">Chief Eco Officer</p>
              <p class="mt-4 text-gray-300 text-sm px-4">Holding a Ph.D. in Environmental Science, Maria ensures every product we stock meets our rigorous zero-waste and non-toxicity standards.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. Sustainability Goals -->
      <section class="py-24 bg-[#D8F3DC]">
        <div class="container mx-auto px-5 text-center">
          <h2 class="text-4xl font-bold heading-font text-[#1B4332] mb-12">Sustainability Goals 2030</h2>
          <div class="grid md:grid-cols-4 gap-6">
            <div class="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-[#2D6A4F] flex flex-col h-full" data-aos="fade-up">
              <h3 class="text-4xl font-bold text-[#2D6A4F] mb-2">0%</h3>
              <p class="font-bold text-[#1B4332] mb-2">Landfill Waste</p>
              <p class="text-sm text-gray-500 mt-2">By utilizing circular return systems with our suppliers, we ensure no packaging ever hits a landfill.</p>
            </div>
            <div class="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-[#40916C] flex flex-col h-full" data-aos="fade-up" data-aos-delay="100">
              <h3 class="text-4xl font-bold text-[#40916C] mb-2">-50%</h3>
              <p class="font-bold text-[#1B4332] mb-2">Carbon Footprint</p>
              <p class="text-sm text-gray-500 mt-2">Achieved via 100% EV fleet and hyper-local routing algorithms that minimize travel distance.</p>
            </div>
            <div class="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-[#95D5B2] flex flex-col h-full" data-aos="fade-up" data-aos-delay="200">
              <h3 class="text-4xl font-bold text-[#95D5B2] mb-2">1M</h3>
              <p class="font-bold text-[#1B4332] mb-2">Trees Planted</p>
              <p class="text-sm text-gray-500 mt-2">Through our 1% for the Planet pledge, we fund reforestation projects in critically endangered areas.</p>
            </div>
            <div class="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-[#1B4332] flex flex-col h-full" data-aos="fade-up" data-aos-delay="300">
              <h3 class="text-4xl font-bold text-[#1B4332] mb-2">100%</h3>
              <p class="font-bold text-[#1B4332] mb-2">Local Sourcing</p>
              <p class="text-sm text-gray-500 mt-2">All perishable and bulk products are sourced from certified organic farms within 50 miles of your neighborhood.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. FAQ -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-5 max-w-4xl">
          <h2 class="text-4xl font-bold heading-font text-[#1B4332] mb-12 text-center">Frequently Asked Questions</h2>
          <div class="space-y-6">
            <div class="p-8 bg-[#F1FAEE] rounded-3xl border border-gray-100 shadow-sm" data-aos="fade-up">
              <h4 class="text-xl font-bold text-[#1B4332]"><i class="fas fa-question-circle text-[#2D6A4F] mr-2"></i> Where do you source your products?</h4>
              <p class="text-gray-600 mt-3 ml-8">We partner exclusively with certified organic, fair-trade local farmers and ethical suppliers within a 100-mile radius whenever possible.</p>
            </div>
            <div class="p-8 bg-[#F1FAEE] rounded-3xl border border-gray-100 shadow-sm" data-aos="fade-up" data-aos-delay="100">
              <h4 class="text-xl font-bold text-[#1B4332]"><i class="fas fa-question-circle text-[#2D6A4F] mr-2"></i> How do you clean your refill containers?</h4>
              <p class="text-gray-600 mt-3 ml-8">All public containers are sterilized using a commercial-grade high-temperature steam process after every single shift.</p>
            </div>
            <div class="p-8 bg-[#F1FAEE] rounded-3xl border border-gray-100 shadow-sm" data-aos="fade-up" data-aos-delay="200">
              <h4 class="text-xl font-bold text-[#1B4332]"><i class="fas fa-question-circle text-[#2D6A4F] mr-2"></i> Can I request a new product?</h4>
              <p class="text-gray-600 mt-3 ml-8">Absolutely! Our inventory is community-driven. Just shoot us a message or request it via our mobile app.</p>
            </div>
            <div class="p-8 bg-[#F1FAEE] rounded-3xl border border-gray-100 shadow-sm" data-aos="fade-up" data-aos-delay="300">
              <h4 class="text-xl font-bold text-[#1B4332]"><i class="fas fa-question-circle text-[#2D6A4F] mr-2"></i> What if I don't have my own containers?</h4>
              <p class="text-gray-600 mt-3 ml-8">No problem! We provide sterilized, reusable glass jars and compostable paper bags right on the truck for a small, refundable deposit.</p>
            </div>
            <div class="p-8 bg-[#F1FAEE] rounded-3xl border border-gray-100 shadow-sm" data-aos="fade-up" data-aos-delay="400">
              <h4 class="text-xl font-bold text-[#1B4332]"><i class="fas fa-question-circle text-[#2D6A4F] mr-2"></i> How do you handle food allergies?</h4>
              <p class="text-gray-600 mt-3 ml-8">Our dispensers are rigorously cleaned, and we use entirely separate, dedicated gravity bins for major allergens like nuts and gluten to prevent any cross-contamination.</p>
            </div>
            <div class="p-8 bg-[#F1FAEE] rounded-3xl border border-gray-100 shadow-sm" data-aos="fade-up" data-aos-delay="500">
              <h4 class="text-xl font-bold text-[#1B4332]"><i class="fas fa-question-circle text-[#2D6A4F] mr-2"></i> Are your products more expensive?</h4>
              <p class="text-gray-600 mt-3 ml-8">Because we eliminate the massive cost of single-use packaging and marketing middlemen, our organic bulk goods are often 15-20% cheaper than premium grocery stores.</p>
            </div>
          </div>
        </div>
      </section>
  `,
  
  'Products.html': `
      <!-- 1. Product Categories (Hero + Search) -->
      <section class="pt-40 pb-20 bg-[#081C15] text-white text-center relative overflow-hidden" style="background-image: url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=600&fit=crop'); background-size: cover; background-position: center;">
        <div class="absolute inset-0 bg-black/70 z-0"></div>
        <div class="container mx-auto px-5 relative z-10">
          <h1 class="text-5xl md:text-7xl font-bold heading-font mb-6" data-aos="zoom-in">Our Products</h1>
          <p class="text-xl text-[#95D5B2] mb-10">Premium organic products, zero-waste delivery.</p>
          <div class="max-w-3xl mx-auto relative mb-12">
            <input type="text" placeholder="Search for rice, grains, spices..." class="w-full py-4 px-6 rounded-full text-black focus:outline-none focus:ring-4 focus:ring-[#95D5B2] shadow-2xl text-lg">
            <button class="absolute right-2 top-2 bottom-2 bg-[#2D6A4F] px-8 rounded-full font-bold hover:bg-[#40916C] transition text-white">Search</button>
          </div>
          <!-- Filter categories -->
          <div class="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
            <button class="bg-[#95D5B2] text-[#1B4332] px-5 py-2 rounded-full font-bold hover:bg-white transition shadow-lg">All Products</button>
            <button class="bg-white/20 backdrop-blur text-white px-5 py-2 rounded-full font-medium hover:bg-white hover:text-[#1B4332] transition border border-white/30">Rice</button>
            <button class="bg-white/20 backdrop-blur text-white px-5 py-2 rounded-full font-medium hover:bg-white hover:text-[#1B4332] transition border border-white/30">Grains</button>
            <button class="bg-white/20 backdrop-blur text-white px-5 py-2 rounded-full font-medium hover:bg-white hover:text-[#1B4332] transition border border-white/30">Spices</button>
            <button class="bg-white/20 backdrop-blur text-white px-5 py-2 rounded-full font-medium hover:bg-white hover:text-[#1B4332] transition border border-white/30">Oils</button>
            <button class="bg-white/20 backdrop-blur text-white px-5 py-2 rounded-full font-medium hover:bg-white hover:text-[#1B4332] transition border border-white/30">Snacks</button>
            <button class="bg-white/20 backdrop-blur text-white px-5 py-2 rounded-full font-medium hover:bg-white hover:text-[#1B4332] transition border border-white/30">Cleaning Liquids</button>
            <button class="bg-white/20 backdrop-blur text-white px-5 py-2 rounded-full font-medium hover:bg-white hover:text-[#1B4332] transition border border-white/30">Personal Care</button>
            <button class="bg-white/20 backdrop-blur text-white px-5 py-2 rounded-full font-medium hover:bg-white hover:text-[#1B4332] transition border border-white/30">Organic</button>
          </div>
        </div>
      </section>

      <!-- 2. Product Grid -->
      <section class="py-24 bg-[#F1FAEE]">
        <div class="container mx-auto px-5">
          <div class="flex justify-between items-end mb-12 border-b border-[#95D5B2] pb-4">
            <h2 class="text-4xl font-bold heading-font text-[#1B4332]">All Products</h2>
            <select class="bg-white border border-[#2D6A4F] text-[#1B4332] rounded-lg px-4 py-2 font-medium focus:outline-none">
              <option>Sort by: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            <!-- Card 1 -->
            <div class="bg-white rounded-3xl p-6 shadow-xl card-hover relative flex flex-col h-full border border-gray-100" data-aos="fade-up">
              <div class="absolute top-4 left-4 z-10"><span class="bg-[#95D5B2] text-[#1B4332] text-xs font-bold px-3 py-1 rounded-full shadow-sm"><i class="fas fa-leaf mr-1"></i> 100% Organic</span></div>
              <div class="bg-gradient-to-br from-[#D8F3DC] to-[#F1FAEE] rounded-2xl p-6 flex justify-center items-center h-48 mb-6"><i class="fas fa-seedling text-7xl text-[#2D6A4F]"></i></div>
              <h3 class="font-bold text-xl text-[#1B4332] mb-1">Premium Basmati Rice</h3>
              <p class="text-sm text-gray-500 mb-4">Sourced directly from fair-trade farms. Perfect for daily meals.</p>
              <div class="flex justify-between items-end mt-auto mb-4">
                <span class="text-2xl font-bold text-[#2D6A4F]">$4.20<span class="text-sm text-gray-400 font-normal">/lb</span></span>
              </div>
              <div class="flex gap-3">
                <div class="flex items-center border border-gray-300 rounded-xl px-2 w-24">
                  <button class="text-gray-500 hover:text-[#1B4332] px-2 font-bold">-</button>
                  <input type="text" value="1" class="w-full text-center font-bold focus:outline-none bg-transparent">
                  <button class="text-gray-500 hover:text-[#1B4332] px-2 font-bold">+</button>
                </div>
                <button class="flex-1 bg-[#2D6A4F] text-white py-2 rounded-xl font-bold hover:bg-[#40916C] transition shadow-md"><i class="fas fa-shopping-cart mr-2"></i> Add</button>
              </div>
            </div>
            
            <!-- Card 2 -->
            <div class="bg-white rounded-3xl p-6 shadow-xl card-hover relative flex flex-col h-full border border-gray-100" data-aos="fade-up" data-aos-delay="100">
              <div class="absolute top-4 left-4 z-10"><span class="bg-[#95D5B2] text-[#1B4332] text-xs font-bold px-3 py-1 rounded-full shadow-sm"><i class="fas fa-leaf mr-1"></i> Best Seller</span></div>
              <div class="bg-gradient-to-br from-[#D8F3DC] to-[#F1FAEE] rounded-2xl p-6 flex justify-center items-center h-48 mb-6"><i class="fas fa-mortar-pestle text-7xl text-[#2D6A4F]"></i></div>
              <h3 class="font-bold text-xl text-[#1B4332] mb-1">Organic Cumin Powder</h3>
              <p class="text-sm text-gray-500 mb-4">Freshly ground daily. Rich aroma and deep flavor profile.</p>
              <div class="flex justify-between items-end mt-auto mb-4">
                <span class="text-2xl font-bold text-[#2D6A4F]">$1.80<span class="text-sm text-gray-400 font-normal">/oz</span></span>
              </div>
              <div class="flex gap-3">
                <div class="flex items-center border border-gray-300 rounded-xl px-2 w-24">
                  <button class="text-gray-500 hover:text-[#1B4332] px-2 font-bold">-</button>
                  <input type="text" value="1" class="w-full text-center font-bold focus:outline-none bg-transparent">
                  <button class="text-gray-500 hover:text-[#1B4332] px-2 font-bold">+</button>
                </div>
                <button class="flex-1 bg-[#2D6A4F] text-white py-2 rounded-xl font-bold hover:bg-[#40916C] transition shadow-md"><i class="fas fa-shopping-cart mr-2"></i> Add</button>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="bg-white rounded-3xl p-6 shadow-xl card-hover relative flex flex-col h-full border border-gray-100" data-aos="fade-up" data-aos-delay="200">
              <div class="absolute top-4 left-4 z-10"><span class="bg-[#95D5B2] text-[#1B4332] text-xs font-bold px-3 py-1 rounded-full shadow-sm"><i class="fas fa-leaf mr-1"></i> Plant-Based</span></div>
              <div class="bg-gradient-to-br from-[#D8F3DC] to-[#F1FAEE] rounded-2xl p-6 flex justify-center items-center h-48 mb-6"><i class="fas fa-pump-soap text-7xl text-[#2D6A4F]"></i></div>
              <h3 class="font-bold text-xl text-[#1B4332] mb-1">Eco Dish Soap Liquid</h3>
              <p class="text-sm text-gray-500 mb-4">Tough on grease, gentle on hands. Fully biodegradable.</p>
              <div class="flex justify-between items-end mt-auto mb-4">
                <span class="text-2xl font-bold text-[#2D6A4F]">$0.45<span class="text-sm text-gray-400 font-normal">/fl oz</span></span>
              </div>
              <div class="flex gap-3">
                <div class="flex items-center border border-gray-300 rounded-xl px-2 w-24">
                  <button class="text-gray-500 hover:text-[#1B4332] px-2 font-bold">-</button>
                  <input type="text" value="1" class="w-full text-center font-bold focus:outline-none bg-transparent">
                  <button class="text-gray-500 hover:text-[#1B4332] px-2 font-bold">+</button>
                </div>
                <button class="flex-1 bg-[#2D6A4F] text-white py-2 rounded-xl font-bold hover:bg-[#40916C] transition shadow-md"><i class="fas fa-shopping-cart mr-2"></i> Add</button>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="bg-white rounded-3xl p-6 shadow-xl card-hover relative flex flex-col h-full border border-gray-100" data-aos="fade-up" data-aos-delay="300">
              <div class="absolute top-4 left-4 z-10"><span class="bg-[#95D5B2] text-[#1B4332] text-xs font-bold px-3 py-1 rounded-full shadow-sm"><i class="fas fa-leaf mr-1"></i> Fair Trade</span></div>
              <div class="bg-gradient-to-br from-[#D8F3DC] to-[#F1FAEE] rounded-2xl p-6 flex justify-center items-center h-48 mb-6"><i class="fas fa-mug-hot text-7xl text-[#2D6A4F]"></i></div>
              <h3 class="font-bold text-xl text-[#1B4332] mb-1">Colombian Coffee Beans</h3>
              <p class="text-sm text-gray-500 mb-4">Medium roast, ethically sourced whole beans.</p>
              <div class="flex justify-between items-end mt-auto mb-4">
                <span class="text-2xl font-bold text-[#2D6A4F]">$14.50<span class="text-sm text-gray-400 font-normal">/lb</span></span>
              </div>
              <div class="flex gap-3">
                <div class="flex items-center border border-gray-300 rounded-xl px-2 w-24">
                  <button class="text-gray-500 hover:text-[#1B4332] px-2 font-bold">-</button>
                  <input type="text" value="1" class="w-full text-center font-bold focus:outline-none bg-transparent">
                  <button class="text-gray-500 hover:text-[#1B4332] px-2 font-bold">+</button>
                </div>
                <button class="flex-1 bg-[#2D6A4F] text-white py-2 rounded-xl font-bold hover:bg-[#40916C] transition shadow-md"><i class="fas fa-shopping-cart mr-2"></i> Add</button>
              </div>
            </div>
          </div>
          <!-- Pagination -->
          <div class="flex justify-center mt-12 gap-2">
             <button class="w-10 h-10 rounded-full bg-[#2D6A4F] text-white font-bold shadow-md">1</button>
             <button class="w-10 h-10 rounded-full bg-white text-[#1B4332] font-bold shadow-sm hover:bg-[#D8F3DC] border border-gray-200">2</button>
             <button class="w-10 h-10 rounded-full bg-white text-[#1B4332] font-bold shadow-sm hover:bg-[#D8F3DC] border border-gray-200">3</button>
             <button class="w-10 h-10 rounded-full bg-white text-[#1B4332] font-bold shadow-sm hover:bg-[#D8F3DC] border border-gray-200"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </section>

      <!-- 3. Best Sellers -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-5">
          <div class="text-center mb-16">
             <h2 class="text-4xl font-bold heading-font text-[#1B4332]">Top Rated Best Sellers</h2>
             <p class="text-gray-600 mt-4 text-lg">The absolute favorites from our community</p>
          </div>
          <div class="grid md:grid-cols-2 gap-12">
            <div class="bg-[#081C15] rounded-[3rem] p-6 sm:p-8 xl:p-10 flex flex-col lg:flex-row items-center gap-6 xl:gap-8 shadow-2xl relative overflow-hidden" data-aos="fade-right">
              <div class="w-36 h-36 xl:w-48 xl:h-48 bg-gradient-to-br from-[#2D6A4F] to-[#95D5B2] rounded-full flex items-center justify-center shrink-0 border-4 border-[#40916C]"><i class="fas fa-spa text-5xl xl:text-7xl text-white"></i></div>
              <div class="text-white">
                 <span class="bg-[#95D5B2] text-[#1B4332] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">#1 Best Seller</span>
                 <h3 class="text-2xl xl:text-3xl font-bold mt-4 mb-2 heading-font text-[#F1FAEE]">Lavender Body Wash</h3>
                 <p class="text-gray-300 mb-6">Our signature organic body wash made with essential oils. Bring your own bottle and save 30% compared to retail.</p>
                 <div class="flex flex-wrap items-center gap-4">
                    <span class="text-2xl xl:text-3xl font-bold text-[#95D5B2]">$0.80<span class="text-sm text-gray-400 font-normal">/fl oz</span></span>
                    <button class="bg-[#95D5B2] text-[#1B4332] px-4 py-2 xl:px-6 xl:py-2 rounded-full font-bold hover:bg-white transition text-sm xl:text-base"><i class="fas fa-cart-plus mr-2"></i> Add to Order</button>
                 </div>
              </div>
            </div>
            <div class="bg-[#D8F3DC] rounded-[3rem] p-6 sm:p-8 xl:p-10 flex flex-col lg:flex-row items-center gap-6 xl:gap-8 shadow-2xl relative overflow-hidden" data-aos="fade-left">
              <div class="w-36 h-36 xl:w-48 xl:h-48 bg-white rounded-full flex items-center justify-center shrink-0 border-4 border-[#95D5B2]"><i class="fas fa-cookie text-5xl xl:text-7xl text-[#2D6A4F]"></i></div>
              <div>
                 <span class="bg-[#1B4332] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Customer Favorite</span>
                 <h3 class="text-2xl xl:text-3xl font-bold mt-4 mb-2 heading-font text-[#1B4332]">Organic Trail Mix</h3>
                 <p class="text-gray-600 mb-6">A perfect blend of organic almonds, cashews, dried cranberries, and dark chocolate chunks. Perfect zero-waste snack.</p>
                 <div class="flex flex-wrap items-center gap-4">
                    <span class="text-2xl xl:text-3xl font-bold text-[#2D6A4F]">$8.50<span class="text-sm text-gray-500 font-normal">/lb</span></span>
                    <button class="bg-[#1B4332] text-white px-4 py-2 xl:px-6 xl:py-2 rounded-full font-bold hover:bg-[#2D6A4F] transition text-sm xl:text-base"><i class="fas fa-cart-plus mr-2"></i> Add to Order</button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Organic Collection Banner -->
      <section class="py-32 bg-[#2D6A4F] text-center relative overflow-hidden">
         <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div class="container mx-auto px-5 relative z-10">
            <i class="fas fa-leaf text-7xl text-[#95D5B2] mb-6 animate-pulse"></i>
            <h2 class="text-5xl md:text-6xl font-bold heading-font text-white mb-6">The 100% Organic Collection</h2>
            <p class="text-xl text-gray-200 max-w-3xl mx-auto mb-10">Every single grain, spice, and oil in this premium collection is strictly certified organic, non-GMO, and sourced directly from sustainable farm cooperatives.</p>
            <button class="bg-[#95D5B2] text-[#1B4332] px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-white hover:-translate-y-1 transition-all duration-300">Shop Organic Collection</button>
         </div>
      </section>

      <!-- 5. Refill Calculator -->
      <section class="py-24 bg-[#F1FAEE]">
         <div class="container mx-auto px-5">
            <div class="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
               <div class="bg-[#081C15] p-16 md:w-2/5 text-white flex flex-col justify-center">
                  <h2 class="text-4xl font-bold heading-font mb-4">Refill Calculator</h2>
                  <p class="text-gray-300 mb-8">Not sure how much you need? Use our smart calculator to estimate the exact weight needed to fill your mason jars and containers.</p>
                  <ul class="space-y-4 text-gray-300">
                     <li><i class="fas fa-check-circle text-[#95D5B2] mr-2"></i> 16oz Jar = ~1lb of Rice</li>
                     <li><i class="fas fa-check-circle text-[#95D5B2] mr-2"></i> 32oz Jar = ~2lbs of Oats</li>
                     <li><i class="fas fa-check-circle text-[#95D5B2] mr-2"></i> 8oz Bottle = ~8.3fl oz Soap</li>
                  </ul>
               </div>
               <div class="p-16 md:w-3/5 flex flex-col justify-center">
                  <div class="space-y-6">
                     <div>
                        <label class="block text-[#1B4332] font-bold mb-2">Select Container Size</label>
                        <select class="w-full bg-[#F1FAEE] border border-gray-200 rounded-xl p-4 text-lg focus:outline-none focus:border-[#2D6A4F]">
                           <option>Standard Mason Jar (16oz / Pint)</option>
                           <option>Large Mason Jar (32oz / Quart)</option>
                           <option>Small Spice Jar (4oz)</option>
                           <option>Standard Soap Bottle (12oz)</option>
                        </select>
                     </div>
                     <div>
                        <label class="block text-[#1B4332] font-bold mb-2">Select Product Type</label>
                        <select class="w-full bg-[#F1FAEE] border border-gray-200 rounded-xl p-4 text-lg focus:outline-none focus:border-[#2D6A4F]">
                           <option>Dense Grains (Rice, Quinoa)</option>
                           <option>Light Flakes (Oats, Cereals)</option>
                           <option>Liquids (Soap, Oil)</option>
                           <option>Powders (Flour, Spices)</option>
                        </select>
                     </div>
                     <div class="bg-[#D8F3DC] rounded-2xl p-6 text-center border border-[#95D5B2]">
                        <p class="text-gray-600 mb-2">Estimated Quantity to Order:</p>
                        <h3 class="text-4xl font-bold text-[#1B4332]">1.2 lbs</h3>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <!-- 6. Customer Reviews -->
      <section class="py-24 bg-white">
         <div class="container mx-auto px-5 text-center">
            <h2 class="text-4xl font-bold heading-font text-[#1B4332] mb-12">Product Reviews</h2>
            <div class="grid md:grid-cols-3 gap-8">
               <div class="bg-[#F1FAEE] p-8 rounded-3xl border border-gray-100 shadow-sm text-left">
                  <div class="flex text-yellow-400 text-lg mb-4"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                  <h4 class="font-bold text-xl text-[#1B4332] mb-2">Incredible Quality</h4>
                  <p class="text-gray-600 mb-4">"The basmati rice and organic quinoa are leaps and bounds better than what I used to buy in plastic bags at the supermarket. Highly recommend!"</p>
                  <p class="font-bold text-[#2D6A4F]">— Mark D.</p>
               </div>
               <div class="bg-[#F1FAEE] p-8 rounded-3xl border border-gray-100 shadow-sm text-left">
                  <div class="flex text-yellow-400 text-lg mb-4"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                  <h4 class="font-bold text-xl text-[#1B4332] mb-2">Dish Soap is Amazing</h4>
                  <p class="text-gray-600 mb-4">"I was skeptical about bulk liquid soap, but this cuts grease instantly and smells like real lemons. Refilling my old bottle saved me so much cash."</p>
                  <p class="font-bold text-[#2D6A4F]">— Chloe S.</p>
               </div>
               <div class="bg-[#F1FAEE] p-8 rounded-3xl border border-gray-100 shadow-sm text-left">
                  <div class="flex text-yellow-400 text-lg mb-4"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div>
                  <h4 class="font-bold text-xl text-[#1B4332] mb-2">Fresh Spices</h4>
                  <p class="text-gray-600 mb-4">"The cumin and turmeric are incredibly potent. I love that I can buy just 2 ounces instead of a whole plastic jar that sits in my cabinet for years."</p>
                  <p class="font-bold text-[#2D6A4F]">— David L.</p>
               </div>
            </div>
         </div>
      </section>
  `
};

pagesContent['Locations.html'] = `
      <!-- 1. Live Truck Tracking (Interactive Map Hero) -->
      <section class="relative pt-32 pb-0 bg-[#081C15] h-[600px] overflow-hidden">
        <!-- Mock Map Background -->
        <div class="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&h=800&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#081C15] via-transparent to-[#081C15] z-10"></div>
        <div class="container mx-auto px-5 relative z-20 h-full flex flex-col justify-center items-center text-center">
           <span class="bg-[#95D5B2] text-[#1B4332] font-bold px-4 py-1 rounded-full mb-6 animate-pulse shadow-[0_0_15px_rgba(149,213,178,0.5)]"><i class="fas fa-satellite-dish mr-2"></i>Live GPS Active</span>
           <h1 class="text-5xl md:text-7xl font-bold heading-font text-white mb-6 drop-shadow-lg">Find The Truck</h1>
           <p class="text-xl text-[#95D5B2] max-w-2xl mx-auto mb-10 drop-shadow-md">Track our zero-waste fleet in real-time. Currently serving 4 neighborhoods today.</p>
           
           <!-- Floating Map UI Element -->
           <div class="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl max-w-lg w-full shadow-2xl flex items-center gap-6">
              <div class="w-16 h-16 bg-[#2D6A4F] rounded-full flex items-center justify-center animate-bounce shadow-lg border-2 border-[#95D5B2]"><i class="fas fa-truck text-2xl text-white"></i></div>
              <div class="text-left">
                 <h3 class="text-white font-bold text-xl">Truck #04 (Downtown)</h3>
                 <p class="text-[#95D5B2]">Stationary for next 45 mins</p>
              </div>
           </div>
        </div>
      </section>

      <!-- 2. Current Stops -->
      <section class="py-24 bg-[#081C15] text-white">
        <div class="container mx-auto px-5">
          <div class="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-6">
             <div>
               <h2 class="text-4xl font-bold heading-font text-[#F1FAEE]">Right Now</h2>
               <p class="text-gray-400 mt-2">Active dispensing locations</p>
             </div>
             <button class="bg-[#2D6A4F] text-white px-6 py-2 rounded-full font-bold mt-4 md:mt-0 hover:bg-[#40916C] transition"><i class="fas fa-sync-alt mr-2"></i> Refresh</button>
          </div>
          
          <div class="grid md:grid-cols-2 gap-8">
             <div class="bg-white/5 border border-gray-800 rounded-3xl p-8 flex items-start gap-6 hover:bg-white/10 transition">
                <div class="bg-[#95D5B2] text-[#1B4332] w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-bold text-xl">A</div>
                <div>
                   <h3 class="text-2xl font-bold text-white mb-2">Downtown Farmers Market</h3>
                   <p class="text-gray-400 mb-4"><i class="fas fa-clock text-[#95D5B2] mr-2"></i> Until 2:00 PM (1h 15m remaining)</p>
                   <div class="flex gap-3">
                      <span class="bg-[#2D6A4F] text-xs px-3 py-1 rounded-full">Full Inventory</span>
                      <span class="bg-[#40916C] text-xs px-3 py-1 rounded-full">Accepting Jars</span>
                   </div>
                </div>
             </div>
             <div class="bg-white/5 border border-gray-800 rounded-3xl p-8 flex items-start gap-6 hover:bg-white/10 transition">
                <div class="bg-gray-700 text-white w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-bold text-xl">B</div>
                <div>
                   <h3 class="text-2xl font-bold text-white mb-2">Westside Community Center</h3>
                   <p class="text-gray-400 mb-4"><i class="fas fa-clock text-[#95D5B2] mr-2"></i> Next Stop: Arriving at 3:00 PM</p>
                   <div class="flex gap-3">
                      <span class="bg-gray-600 text-xs px-3 py-1 rounded-full">In Transit</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <!-- 3. Weekly Schedule -->
      <section class="py-24 bg-[#F1FAEE]">
        <div class="container mx-auto px-5">
          <div class="text-center mb-16">
             <h2 class="text-4xl font-bold heading-font text-[#1B4332]">Regular Weekly Routes</h2>
             <p class="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">We service different neighborhoods on specific days to maximize our carbon efficiency. Find your designated day.</p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white p-10 rounded-[2.5rem] shadow-xl border-t-8 border-[#2D6A4F] card-hover">
               <h3 class="text-2xl font-bold text-[#1B4332] mb-2">Mon - Tue</h3>
               <p class="text-[#2D6A4F] font-bold mb-6">Downtown & Eastside</p>
               <ul class="space-y-4 text-gray-600">
                  <li class="flex items-start gap-3"><i class="fas fa-map-marker-alt text-[#95D5B2] mt-1"></i> Riverfront Park (9AM - 12PM)</li>
                  <li class="flex items-start gap-3"><i class="fas fa-map-marker-alt text-[#95D5B2] mt-1"></i> Tech District Plaza (1PM - 4PM)</li>
                  <li class="flex items-start gap-3"><i class="fas fa-map-marker-alt text-[#95D5B2] mt-1"></i> Eastside High School (5PM - 7PM)</li>
               </ul>
            </div>
            <div class="bg-white p-10 rounded-[2.5rem] shadow-xl border-t-8 border-[#40916C] card-hover">
               <h3 class="text-2xl font-bold text-[#1B4332] mb-2">Wed - Thu</h3>
               <p class="text-[#40916C] font-bold mb-6">Westside & Suburbs</p>
               <ul class="space-y-4 text-gray-600">
                  <li class="flex items-start gap-3"><i class="fas fa-map-marker-alt text-[#95D5B2] mt-1"></i> Community Center (10AM - 2PM)</li>
                  <li class="flex items-start gap-3"><i class="fas fa-map-marker-alt text-[#95D5B2] mt-1"></i> Pine Lake Subdivison (3PM - 6PM)</li>
               </ul>
            </div>
            <div class="bg-white p-10 rounded-[2.5rem] shadow-xl border-t-8 border-[#95D5B2] card-hover">
               <h3 class="text-2xl font-bold text-[#1B4332] mb-2">Fri - Sun</h3>
               <p class="text-[#95D5B2] font-bold mb-6 text-xl">Farmers Markets</p>
               <ul class="space-y-4 text-gray-600">
                  <li class="flex items-start gap-3"><i class="fas fa-map-marker-alt text-[#95D5B2] mt-1"></i> Historic Square Market (Sat 8AM - 1PM)</li>
                  <li class="flex items-start gap-3"><i class="fas fa-map-marker-alt text-[#95D5B2] mt-1"></i> Northside Vegan Market (Sun 9AM - 2PM)</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Nearby Search -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-5">
           <div class="bg-[#D8F3DC] rounded-[3rem] p-12 md:p-20 shadow-2xl flex flex-col md:flex-row items-center gap-12 border border-[#95D5B2]">
              <div class="md:w-1/2">
                 <h2 class="text-4xl font-bold heading-font text-[#1B4332] mb-6">Will we come to your street?</h2>
                 <p class="text-gray-700 text-lg mb-8">Enter your zip code to see if your neighborhood is on an active route, or request a new stop.</p>
                 <div class="flex relative shadow-lg rounded-full">
                    <input type="text" placeholder="Enter Zip Code (e.g. 90210)" class="w-full py-4 px-8 rounded-l-full focus:outline-none border-y border-l border-gray-200">
                    <button class="bg-[#2D6A4F] text-white px-8 font-bold rounded-r-full hover:bg-[#1B4332] transition">Check</button>
                 </div>
              </div>
              <div class="md:w-1/2 flex justify-center">
                 <i class="fas fa-search-location text-[10rem] text-[#40916C] drop-shadow-xl animate-pulse"></i>
              </div>
           </div>
        </div>
      </section>

      <!-- 5. Route Timeline -->
      <section class="py-24 bg-[#081C15] text-white">
        <div class="container mx-auto px-5 max-w-4xl">
           <h2 class="text-4xl font-bold heading-font text-center mb-16 text-[#F1FAEE]">How The Route Works</h2>
           
           <div class="relative border-l-4 border-[#2D6A4F] ml-6 md:ml-12 space-y-12 pb-8">
              <!-- Step 1 -->
              <div class="relative pl-8 md:pl-12">
                 <div class="absolute -left-[22px] top-0 w-10 h-10 bg-[#95D5B2] rounded-full flex items-center justify-center text-[#1B4332] font-bold shadow-lg border-4 border-[#081C15]"><i class="fas fa-bell"></i></div>
                 <h3 class="text-2xl font-bold text-[#F1FAEE]">1. The Morning Alert</h3>
                 <p class="text-gray-400 mt-2">At 8:00 AM, we send out push notifications and text alerts to members on that day's specific route, confirming our arrival window.</p>
              </div>
              <!-- Step 2 -->
              <div class="relative pl-8 md:pl-12">
                 <div class="absolute -left-[22px] top-0 w-10 h-10 bg-[#95D5B2] rounded-full flex items-center justify-center text-[#1B4332] font-bold shadow-lg border-4 border-[#081C15]"><i class="fas fa-boxes"></i></div>
                 <h3 class="text-2xl font-bold text-[#F1FAEE]">2. Container Prep</h3>
                 <p class="text-gray-400 mt-2">You wash and dry your containers. If you're a member, you can leave your empty bins on your porch for our team to collect and swap.</p>
              </div>
              <!-- Step 3 -->
              <div class="relative pl-8 md:pl-12">
                 <div class="absolute -left-[22px] top-0 w-10 h-10 bg-[#95D5B2] rounded-full flex items-center justify-center text-[#1B4332] font-bold shadow-lg border-4 border-[#081C15]"><i class="fas fa-truck-loading"></i></div>
                 <h3 class="text-2xl font-bold text-[#F1FAEE]">3. The Refill Stop</h3>
                 <p class="text-gray-400 mt-2">We park at the designated neighborhood hub. You walk over, weigh your jars (tare), fill them up, and re-weigh to pay only for the product.</p>
              </div>
           </div>
        </div>
      </section>

      <!-- 6. Refill Events -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-5 text-center">
           <h2 class="text-4xl font-bold heading-font text-[#1B4332] mb-6">Upcoming Pop-Up Events</h2>
           <p class="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">Catch our flagship truck at these special weekend festivals and community events for exclusive discounts and product samples.</p>
           
           <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div class="bg-[#F1FAEE] p-8 rounded-3xl border border-[#95D5B2] text-left shadow-md flex gap-6 items-center hover:bg-[#D8F3DC] transition cursor-pointer">
                 <div class="bg-white w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-sm shrink-0">
                    <span class="text-[#2D6A4F] font-bold text-sm uppercase">OCT</span>
                    <span class="text-[#1B4332] font-black text-2xl">14</span>
                 </div>
                 <div>
                    <h4 class="font-bold text-xl text-[#1B4332]">Earth Day Festival</h4>
                    <p class="text-gray-500 text-sm mt-1">Centennial City Park</p>
                    <span class="text-[#2D6A4F] text-sm font-bold mt-2 inline-block">Free 16oz Jar with any purchase</span>
                 </div>
              </div>
              
              <div class="bg-[#F1FAEE] p-8 rounded-3xl border border-[#95D5B2] text-left shadow-md flex gap-6 items-center hover:bg-[#D8F3DC] transition cursor-pointer">
                 <div class="bg-white w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-sm shrink-0">
                    <span class="text-[#2D6A4F] font-bold text-sm uppercase">NOV</span>
                    <span class="text-[#1B4332] font-black text-2xl">02</span>
                 </div>
                 <div>
                    <h4 class="font-bold text-xl text-[#1B4332]">Vegan Food Market</h4>
                    <p class="text-gray-500 text-sm mt-1">Downtown Warehouse District</p>
                    <span class="text-[#2D6A4F] text-sm font-bold mt-2 inline-block">Testing new oat milk on tap</span>
                 </div>
              </div>
           </div>
        </div>
      </section>
`;

pagesContent['Membership.html'] = `
      <!-- 1. Membership Plans Hero -->
      <section class="pt-40 pb-20 bg-[#081C15] text-[#F1FAEE] text-center relative overflow-hidden">
        <div class="absolute top-0 right-0 w-96 h-96 bg-[#2D6A4F] rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#95D5B2] rounded-full blur-3xl opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div class="container mx-auto px-5 relative z-10">
           <h1 class="text-5xl md:text-7xl font-bold heading-font mb-6 drop-shadow-lg">Join The Club</h1>
           <p class="text-xl text-[#95D5B2] max-w-2xl mx-auto mb-16">Maximize your impact and your savings. Choose the plan that fits your household's zero-waste journey.</p>
           
           <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
              <!-- Tier 1 -->
              <div class="bg-white/5 border border-gray-700 rounded-[3rem] p-10 hover:bg-white/10 transition backdrop-blur-sm relative">
                 <h3 class="text-2xl font-bold text-white mb-2">Seed</h3>
                 <p class="text-[#95D5B2] font-bold text-4xl mb-6">$5<span class="text-lg text-gray-400 font-normal">/mo</span></p>
                 <ul class="space-y-4 text-gray-300 mb-10">
                    <li><i class="fas fa-check text-[#95D5B2] mr-3"></i> Priority queue at the truck</li>
                    <li><i class="fas fa-check text-[#95D5B2] mr-3"></i> 5% off all dry goods</li>
                    <li><i class="fas fa-check text-[#95D5B2] mr-3"></i> Free reusable tote bag</li>
                 </ul>
                 <button class="w-full bg-transparent border border-[#95D5B2] text-[#95D5B2] py-4 rounded-full font-bold hover:bg-[#95D5B2] hover:text-[#081C15] transition">Select Seed</button>
              </div>
              
              <!-- Tier 2 -->
              <div class="bg-gradient-to-b from-[#2D6A4F] to-[#1B4332] border border-[#95D5B2] rounded-[3rem] p-10 transform md:-translate-y-4 shadow-2xl relative">
                 <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#95D5B2] text-[#081C15] px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase shadow-md">Most Popular</div>
                 <h3 class="text-2xl font-bold text-white mb-2 mt-4">Sprout</h3>
                 <p class="text-[#95D5B2] font-bold text-5xl mb-6">$15<span class="text-lg text-gray-400 font-normal">/mo</span></p>
                 <ul class="space-y-4 text-gray-200 mb-10">
                    <li><i class="fas fa-check text-[#95D5B2] mr-3"></i> <strong>15% off ALL refills</strong></li>
                    <li><i class="fas fa-check text-[#95D5B2] mr-3"></i> 1 Free Monthly Home Delivery</li>
                    <li><i class="fas fa-check text-[#95D5B2] mr-3"></i> Priority queue & tote bag</li>
                    <li><i class="fas fa-check text-[#95D5B2] mr-3"></i> Early access to new products</li>
                 </ul>
                 <button class="w-full bg-[#95D5B2] text-[#081C15] py-4 rounded-full font-bold shadow-lg hover:bg-white transition">Select Sprout</button>
              </div>

              <!-- Tier 3 -->
              <div class="bg-white/5 border border-gray-700 rounded-[3rem] p-10 hover:bg-white/10 transition backdrop-blur-sm relative">
                 <h3 class="text-2xl font-bold text-white mb-2">Tree</h3>
                 <p class="text-[#95D5B2] font-bold text-4xl mb-6">$30<span class="text-lg text-gray-400 font-normal">/mo</span></p>
                 <ul class="space-y-4 text-gray-300 mb-10">
                    <li><i class="fas fa-check text-[#95D5B2] mr-3"></i> <strong>25% off ALL refills</strong></li>
                    <li><i class="fas fa-check text-[#95D5B2] mr-3"></i> <strong>Unlimited</strong> Home Deliveries</li>
                    <li><i class="fas fa-check text-[#95D5B2] mr-3"></i> Free container replacements</li>
                    <li><i class="fas fa-check text-[#95D5B2] mr-3"></i> Vote on new inventory</li>
                 </ul>
                 <button class="w-full bg-transparent border border-[#95D5B2] text-[#95D5B2] py-4 rounded-full font-bold hover:bg-[#95D5B2] hover:text-[#081C15] transition">Select Tree</button>
              </div>
           </div>
        </div>
      </section>

      <!-- 2. Premium Benefits -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-5">
           <div class="text-center mb-16">
              <h2 class="text-4xl font-bold heading-font text-[#1B4332]">Why Go Premium?</h2>
              <p class="text-gray-600 mt-4 text-lg">Your membership directly funds our electric fleet expansion.</p>
           </div>
           
           <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div class="bg-[#F1FAEE] p-8 rounded-3xl border-t-4 border-[#2D6A4F] hover:-translate-y-2 transition duration-300">
                 <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6"><i class="fas fa-home text-2xl text-[#2D6A4F]"></i></div>
                 <h4 class="font-bold text-xl text-[#1B4332] mb-3">At-Home Delivery</h4>
                 <p class="text-gray-600">Leave your empty jars on the porch. We pick them up, sanitize them, and drop off full ones.</p>
              </div>
              <div class="bg-[#F1FAEE] p-8 rounded-3xl border-t-4 border-[#40916C] hover:-translate-y-2 transition duration-300">
                 <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6"><i class="fas fa-tags text-2xl text-[#2D6A4F]"></i></div>
                 <h4 class="font-bold text-xl text-[#1B4332] mb-3">Deep Discounts</h4>
                 <p class="text-gray-600">Members save an average of $45/month compared to buying packaged goods at the supermarket.</p>
              </div>
              <div class="bg-[#F1FAEE] p-8 rounded-3xl border-t-4 border-[#95D5B2] hover:-translate-y-2 transition duration-300">
                 <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6"><i class="fas fa-box-open text-2xl text-[#2D6A4F]"></i></div>
                 <h4 class="font-bold text-xl text-[#1B4332] mb-3">Early Access</h4>
                 <p class="text-gray-600">Get first dibs on limited-batch seasonal items like local honey and handmade soaps.</p>
              </div>
              <div class="bg-[#F1FAEE] p-8 rounded-3xl border-t-4 border-[#1B4332] hover:-translate-y-2 transition duration-300">
                 <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6"><i class="fas fa-globe-americas text-2xl text-[#2D6A4F]"></i></div>
                 <h4 class="font-bold text-xl text-[#1B4332] mb-3">Climate Impact</h4>
                 <p class="text-gray-600">A portion of every membership fee goes directly into purchasing carbon offsets and planting trees.</p>
              </div>
           </div>
        </div>
      </section>

      <!-- 3. Loyalty Rewards -->
      <section class="py-24 bg-[#D8F3DC] relative overflow-hidden">
        <div class="absolute right-0 bottom-0 opacity-10"><i class="fas fa-leaf text-[30rem] text-[#1B4332] transform translate-x-1/4 translate-y-1/4"></i></div>
        <div class="container mx-auto px-5 relative z-10">
           <div class="flex flex-col md:flex-row items-center gap-16">
              <div class="md:w-1/2">
                 <h2 class="text-5xl font-bold heading-font text-[#1B4332] mb-6">Earn As You Refill</h2>
                 <p class="text-xl text-[#2D6A4F] mb-8">Every ounce you refill earns you EcoPoints. Redeem them for free products, exclusive merch, or donate them to plant trees.</p>
                 
                 <div class="space-y-6">
                    <div class="bg-white/60 backdrop-blur rounded-2xl p-6 border border-white/50 flex items-center justify-between">
                       <div>
                          <p class="font-bold text-[#1B4332]">1 Pound Refilled</p>
                          <p class="text-sm text-gray-600">Grains, Rice, Oats</p>
                       </div>
                       <div class="font-bold text-2xl text-[#40916C]">+10 pts</div>
                    </div>
                    <div class="bg-white/60 backdrop-blur rounded-2xl p-6 border border-white/50 flex items-center justify-between">
                       <div>
                          <p class="font-bold text-[#1B4332]">Bring a Friend</p>
                          <p class="text-sm text-gray-600">To any pop-up event</p>
                       </div>
                       <div class="font-bold text-2xl text-[#40916C]">+50 pts</div>
                    </div>
                    <div class="bg-white/60 backdrop-blur rounded-2xl p-6 border border-white/50 flex items-center justify-between">
                       <div>
                          <p class="font-bold text-[#1B4332]">500 Points Reward</p>
                          <p class="text-sm text-gray-600">Redeemable for</p>
                       </div>
                       <div class="font-bold text-lg text-[#1B4332] bg-[#95D5B2] px-4 py-2 rounded-xl">Free 32oz Refill</div>
                    </div>
                 </div>
              </div>
              <div class="md:w-1/2 w-full">
                 <!-- Visual mock of app loyalty screen -->
                 <div class="bg-[#1B4332] rounded-[3rem] p-10 shadow-2xl text-center text-white border-4 border-white max-w-sm mx-auto relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-[#2D6A4F] rounded-full blur-xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <i class="fas fa-award text-7xl text-[#95D5B2] mb-6 relative z-10"></i>
                    <h3 class="text-3xl font-bold mb-2 relative z-10">Your Balance</h3>
                    <p class="text-6xl font-black text-[#95D5B2] mb-8 relative z-10">1,450</p>
                    <div class="w-full bg-gray-700 rounded-full h-4 mb-4 overflow-hidden relative z-10">
                       <div class="bg-[#95D5B2] h-4 rounded-full" style="width: 75%"></div>
                    </div>
                    <p class="text-sm text-gray-400 mb-8 relative z-10">Only 50 points away from Level 3!</p>
                    <button class="w-full bg-white text-[#1B4332] py-4 rounded-full font-bold text-lg hover:bg-[#95D5B2] transition relative z-10">Redeem Points</button>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <!-- 4. Referral Program -->
      <section class="py-24 bg-white text-center">
        <div class="container mx-auto px-5 max-w-4xl">
           <h2 class="text-4xl font-bold heading-font text-[#1B4332] mb-6">Give $10, Get $10</h2>
           <p class="text-xl text-gray-600 mb-12">The zero-waste movement grows through word of mouth. Share your unique link, and you both get rewarded.</p>
           
           <div class="flex flex-col md:flex-row gap-6 justify-center items-stretch mb-12">
              <div class="flex-1 bg-[#F1FAEE] p-8 rounded-3xl border border-[#95D5B2]">
                 <div class="w-16 h-16 bg-[#2D6A4F] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                 <h4 class="font-bold text-xl text-[#1B4332] mb-2">Share Code</h4>
                 <p class="text-gray-600">Send your custom invite link to your neighbors.</p>
              </div>
              <div class="flex-1 bg-[#F1FAEE] p-8 rounded-3xl border border-[#95D5B2]">
                 <div class="w-16 h-16 bg-[#2D6A4F] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                 <h4 class="font-bold text-xl text-[#1B4332] mb-2">They Refill</h4>
                 <p class="text-gray-600">They get $10 off their very first order.</p>
              </div>
              <div class="flex-1 bg-[#F1FAEE] p-8 rounded-3xl border border-[#95D5B2]">
                 <div class="w-16 h-16 bg-[#2D6A4F] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                 <h4 class="font-bold text-xl text-[#1B4332] mb-2">You Get Paid</h4>
                 <p class="text-gray-600">You automatically get a $10 credit to your account.</p>
              </div>
           </div>
           
           <div class="bg-[#081C15] p-3 rounded-full flex items-center justify-between shadow-xl max-w-lg mx-auto">
              <span class="text-[#95D5B2] font-mono tracking-widest text-lg font-bold pl-6 truncate">ECO-2026</span>
              <button class="bg-[#95D5B2] text-[#1B4332] px-8 py-3 rounded-full font-bold hover:bg-white transition shrink-0"><i class="far fa-copy mr-2"></i> Copy</button>
           </div>
        </div>
      </section>

      <!-- 5. Subscription Process -->
      <section class="py-24 bg-[#081C15] text-white">
        <div class="container mx-auto px-5">
           <h2 class="text-4xl font-bold heading-font text-center mb-16 text-[#F1FAEE]">How Subscriptions Work</h2>
           
           <div class="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
              <div>
                 <div class="space-y-8">
                    <div class="flex gap-6">
                       <i class="fas fa-mobile-alt text-4xl text-[#95D5B2] mt-1 shrink-0"></i>
                       <div>
                          <h4 class="text-2xl font-bold mb-2">1. Build Your Recurring Cart</h4>
                          <p class="text-gray-400">Set up standard quantities for staples like rice, soap, and coffee. Choose if you want them weekly, bi-weekly, or monthly.</p>
                       </div>
                    </div>
                    <div class="flex gap-6">
                       <i class="fas fa-calendar-check text-4xl text-[#95D5B2] mt-1 shrink-0"></i>
                       <div>
                          <h4 class="text-2xl font-bold mb-2">2. Auto-Billed & Scheduled</h4>
                          <p class="text-gray-400">Your card is automatically charged on your delivery day. Skip a week, pause, or cancel at any time with one click.</p>
                       </div>
                    </div>
                    <div class="flex gap-6">
                       <i class="fas fa-box-open text-4xl text-[#95D5B2] mt-1 shrink-0"></i>
                       <div>
                          <h4 class="text-2xl font-bold mb-2">3. The Empty Swap</h4>
                          <p class="text-gray-400">If you have empties from your last order, leave them outside. Our driver drops off your full containers and takes the empties to be sterilized.</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div class="bg-white/10 rounded-[3rem] p-8 border border-white/20 shadow-2xl backdrop-blur-md">
                 <h4 class="font-bold text-xl mb-6 text-center border-b border-white/20 pb-4">Manage Subscription</h4>
                 <div class="space-y-4 mb-6">
                    <div class="flex justify-between items-center bg-black/30 p-4 rounded-xl">
                       <span class="font-medium text-sm md:text-base">Organic Quinoa (2lb)</span>
                       <span class="text-[#95D5B2] text-sm font-bold">Every 2 weeks</span>
                    </div>
                    <div class="flex justify-between items-center bg-black/30 p-4 rounded-xl">
                       <span class="font-medium text-sm md:text-base">Lavender Soap (32oz)</span>
                       <span class="text-[#95D5B2] text-sm font-bold">Monthly</span>
                    </div>
                    <div class="flex justify-between items-center bg-black/30 p-4 rounded-xl">
                       <span class="font-medium text-sm md:text-base">Oat Milk (1 Gallon)</span>
                       <span class="text-[#95D5B2] text-sm font-bold">Weekly</span>
                    </div>
                 </div>
                 <div class="flex gap-4">
                    <button class="flex-1 bg-white/20 py-3 rounded-full font-bold hover:bg-white/30 transition">Pause</button>
                    <button class="flex-1 bg-[#2D6A4F] py-3 rounded-full font-bold shadow-lg hover:bg-[#40916C] transition">Edit Cart</button>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <!-- 6. Signup CTA -->
      <section class="py-32 bg-[#95D5B2] text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-textile.png')] opacity-30 mix-blend-multiply"></div>
        <div class="container mx-auto px-5 relative z-10 max-w-3xl">
           <i class="fas fa-seedling text-7xl text-[#1B4332] mb-8 animate-pulse"></i>
           <h2 class="text-5xl md:text-6xl font-bold heading-font text-[#1B4332] mb-6">Ready to eliminate your plastic waste?</h2>
           <p class="text-xl text-[#2D6A4F] font-medium mb-12">Join over 10,000 local members who have already prevented 2 million plastic bottles from entering our oceans.</p>
           <button class="bg-[#1B4332] text-white px-12 py-5 rounded-full font-bold text-xl shadow-2xl hover:bg-[#081C15] hover:-translate-y-1 transition-all duration-300">Become a Member Today</button>
           <p class="mt-6 text-sm text-[#2D6A4F] font-bold">No commitment. Cancel anytime.</p>
        </div>
      </section>
`;

pagesContent['Sustainability.html'] = `
      <section class="pt-40 pb-20 bg-[#081C15] text-[#F1FAEE] text-center rounded-b-[4rem]"><div class="container mx-auto px-5"><h1 class="text-6xl font-bold heading-font mb-6">Our Impact</h1><p class="text-xl text-[#95D5B2]">Radical transparency in our eco footprint.</p></div></section>
      <section class="py-24 bg-white"><div class="container mx-auto px-5"><div class="grid md:grid-cols-2 gap-12 items-center"><div><h2 class="text-4xl font-bold text-[#1B4332] mb-6">The Plastic Problem</h2><p class="text-gray-600 text-lg mb-6">Only 9% of plastic is actually recycled. By eliminating the packaging entirely, we attack the problem at its source.</p></div><div class="h-80 bg-[#D8F3DC] rounded-[3rem] flex items-center justify-center text-[#2D6A4F] shadow-xl"><i class="fas fa-recycle text-7xl"></i></div></div></div></section>
      <section class="py-20 bg-[#F1FAEE]"><div class="container mx-auto px-5 text-center"><h2 class="text-3xl font-bold text-[#1B4332] mb-12">Our Fleet Stats</h2><div class="grid md:grid-cols-3 gap-8"><div class="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-[#2D6A4F]"><i class="fas fa-bolt text-4xl text-[#2D6A4F] mb-4"></i><h3 class="text-xl font-bold mb-3">100% Electric</h3><p class="text-gray-500">Every truck in our fleet is fully electric, producing zero emissions.</p></div><div class="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-[#40916C]"><i class="fas fa-solar-panel text-4xl text-[#2D6A4F] mb-4"></i><h3 class="text-xl font-bold mb-3">Solar Powered HQ</h3><p class="text-gray-500">Our warehouses run entirely on renewable energy sources.</p></div><div class="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-[#95D5B2]"><i class="fas fa-seedling text-4xl text-[#2D6A4F] mb-4"></i><h3 class="text-xl font-bold mb-3">Local Sourcing</h3><p class="text-gray-500">80% of our products are sourced within a 100-mile radius.</p></div></div></div></section>
      <section class="py-24 bg-[#1B4332] text-white text-center"><div class="container mx-auto px-5"><h2 class="text-4xl font-bold mb-6">Carbon Negative by 2028</h2><p class="text-xl mb-8 max-w-2xl mx-auto">We don't just want to be neutral. We are actively planting forests to sequester more carbon than we emit.</p></div></section>
      <section class="py-20 bg-white"><div class="container mx-auto px-5 max-w-4xl"><h2 class="text-3xl font-bold text-[#1B4332] mb-10 text-center">Our Certifications</h2><div class="flex flex-wrap justify-center gap-6"><div class="px-8 py-4 bg-[#D8F3DC] rounded-2xl font-bold text-[#2D6A4F]">B-Corp Certified</div><div class="px-8 py-4 bg-[#D8F3DC] rounded-2xl font-bold text-[#2D6A4F]">1% For The Planet</div><div class="px-8 py-4 bg-[#D8F3DC] rounded-2xl font-bold text-[#2D6A4F]">USDA Organic</div></div></div></section>
      <section class="py-20 bg-[#F1FAEE] text-center border-t border-gray-200"><div class="container mx-auto px-5"><h2 class="text-3xl font-bold text-[#1B4332] mb-8">Read Our Full 2025 Impact Report</h2><button class="btn-gradient text-white px-10 py-4 rounded-full font-bold shadow-xl inline-block">Download PDF</button></div></section>
`;

pagesContent['Blog.html'] = `
      <section class="pt-40 pb-20 bg-[#081C15] text-[#F1FAEE] text-center rounded-b-[4rem]"><div class="container mx-auto px-5"><h1 class="text-6xl font-bold heading-font mb-6">The Green Blog</h1><p class="text-xl text-[#95D5B2]">Tips, news, and zero-waste recipes.</p></div></section>
      <section class="py-12 bg-white"><div class="container mx-auto px-5 flex flex-wrap justify-center gap-4"><button class="bg-[#1B4332] text-white px-6 py-2 rounded-full font-bold">All Posts</button><button class="bg-[#F1FAEE] text-[#1B4332] px-6 py-2 rounded-full font-bold">Recipes</button><button class="bg-[#F1FAEE] text-[#1B4332] px-6 py-2 rounded-full font-bold">Lifestyle</button><button class="bg-[#F1FAEE] text-[#1B4332] px-6 py-2 rounded-full font-bold">Company News</button></div></section>
      <section class="py-20 bg-[#F1FAEE]"><div class="container mx-auto px-5"><div class="grid md:grid-cols-3 gap-8"><div class="bg-white rounded-3xl overflow-hidden shadow-lg card-hover"><div class="h-48 bg-[#D8F3DC]"></div><div class="p-6"><h3 class="text-xl font-bold mb-2">5 Ways to Reuse Glass Jars</h3><p class="text-gray-500 mb-4">Don't throw them away! Here are creative uses.</p><a href="#" class="text-[#2D6A4F] font-bold">Read More →</a></div></div><div class="bg-white rounded-3xl overflow-hidden shadow-lg card-hover"><div class="h-48 bg-[#D8F3DC]"></div><div class="p-6"><h3 class="text-xl font-bold mb-2">DIY All-Purpose Cleaner</h3><p class="text-gray-500 mb-4">Make a powerful cleaner using just vinegar and citrus.</p><a href="#" class="text-[#2D6A4F] font-bold">Read More →</a></div></div><div class="bg-white rounded-3xl overflow-hidden shadow-lg card-hover"><div class="h-48 bg-[#D8F3DC]"></div><div class="p-6"><h3 class="text-xl font-bold mb-2">EcoRefill Expands to Chicago</h3><p class="text-gray-500 mb-4">We are bringing our fleet to the midwest this summer.</p><a href="#" class="text-[#2D6A4F] font-bold">Read More →</a></div></div></div></div></section>
      <section class="py-24 bg-gradient-to-r from-[#2D6A4F] to-[#40916C] text-white text-center"><div class="container mx-auto px-5"><h2 class="text-4xl font-bold mb-6">Never Miss a Tip</h2><p class="text-xl mb-8 max-w-2xl mx-auto">Subscribe to our weekly newsletter for exclusive zero-waste guides.</p><div class="flex justify-center max-w-md mx-auto relative"><input type="email" class="w-full py-4 px-6 rounded-full text-black" placeholder="Email address"><button class="absolute right-2 top-2 bottom-2 bg-[#1B4332] px-6 rounded-full font-bold">Subscribe</button></div></div></section>
      <section class="py-20 bg-white"><div class="container mx-auto px-5 max-w-4xl"><h2 class="text-3xl font-bold text-[#1B4332] mb-10 text-center">Featured Authors</h2><div class="flex flex-wrap justify-center gap-12"><div class="text-center"><div class="w-24 h-24 bg-[#95D5B2] rounded-full mx-auto mb-3"></div><p class="font-bold">Sarah Jenkins</p><p class="text-sm text-gray-500">Zero Waste Chef</p></div><div class="text-center"><div class="w-24 h-24 bg-[#40916C] rounded-full mx-auto mb-3"></div><p class="font-bold">David Chen</p><p class="text-sm text-gray-500">Eco Scientist</p></div></div></div></section>
      <section class="py-20 bg-[#F1FAEE] text-center border-t border-gray-200"><div class="container mx-auto px-5"><h2 class="text-3xl font-bold text-[#1B4332] mb-8">Have a story to share?</h2><a href="Contact.html" class="btn-gradient text-white px-10 py-4 rounded-full font-bold shadow-xl inline-block">Write For Us</a></div></section>
`;

pagesContent['Contact.html'] = `
      <!-- 1. Contact Banner -->
      <section class="pt-40 pb-20 bg-[#081C15] text-[#F1FAEE] text-center relative overflow-hidden">
        <div class="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=1600&h=600&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#081C15] via-transparent to-[#081C15] z-10"></div>
        <div class="container mx-auto px-5 relative z-20">
           <span class="bg-[#95D5B2] text-[#1B4332] font-bold px-4 py-1 rounded-full mb-6 inline-block"><i class="fas fa-headset mr-2"></i>We're Here For You</span>
           <h1 class="text-5xl md:text-7xl font-bold heading-font mb-6 drop-shadow-lg">Let's Connect</h1>
           <p class="text-xl text-[#95D5B2] max-w-2xl mx-auto mb-10 drop-shadow-md">Whether you have a question about our zero-waste process, need help with an order, or just want to say hi.</p>
           
           <div class="flex flex-wrap justify-center gap-8 mt-12 pt-10 border-t border-white/20 max-w-3xl mx-auto">
              <div class="text-center">
                 <p class="text-3xl font-bold text-white mb-1">2 Hrs</p>
                 <p class="text-sm text-[#95D5B2] uppercase tracking-widest">Avg Response Time</p>
              </div>
              <div class="w-px h-12 bg-white/20 hidden md:block"></div>
              <div class="text-center">
                 <p class="text-3xl font-bold text-white mb-1">98%</p>
                 <p class="text-sm text-[#95D5B2] uppercase tracking-widest">Resolution Rate</p>
              </div>
              <div class="w-px h-12 bg-white/20 hidden md:block"></div>
              <div class="text-center">
                 <p class="text-3xl font-bold text-white mb-1">24/7</p>
                 <p class="text-sm text-[#95D5B2] uppercase tracking-widest">Chat Support</p>
              </div>
           </div>
        </div>
      </section>

      <!-- 2. Contact Form -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-5">
           <div class="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
              <!-- Info Side -->
              <div class="lg:w-1/3">
                 <h2 class="text-4xl font-bold heading-font text-[#1B4332] mb-6">Drop Us A Line</h2>
                 <p class="text-gray-600 mb-10 text-lg">Fill out the form and our eco-support team will get back to you within 24 hours.</p>
                 
                 <div class="space-y-8">
                    <div class="flex items-start gap-4">
                       <div class="w-12 h-12 bg-[#D8F3DC] rounded-xl flex items-center justify-center shrink-0"><i class="fas fa-map-marker-alt text-[#2D6A4F] text-xl"></i></div>
                       <div>
                          <h4 class="font-bold text-[#1B4332] text-lg">HQ Address</h4>
                          <p class="text-gray-600 mt-1">123 Green Way Blvd<br>Austin, TX 78701</p>
                       </div>
                    </div>
                    <div class="flex items-start gap-4">
                       <div class="w-12 h-12 bg-[#D8F3DC] rounded-xl flex items-center justify-center shrink-0"><i class="fas fa-envelope text-[#2D6A4F] text-xl"></i></div>
                       <div>
                          <h4 class="font-bold text-[#1B4332] text-lg">Email Us</h4>
                          <p class="text-gray-600 mt-1">hello@ecorefill.com<br>support@ecorefill.com</p>
                       </div>
                    </div>
                    <div class="flex items-start gap-4">
                       <div class="w-12 h-12 bg-[#D8F3DC] rounded-xl flex items-center justify-center shrink-0"><i class="fas fa-phone-alt text-[#2D6A4F] text-xl"></i></div>
                       <div>
                          <h4 class="font-bold text-[#1B4332] text-lg">Call Us</h4>
                          <p class="text-gray-600 mt-1">1-800-ECO-FILL<br>(Mon-Fri, 9am-5pm CST)</p>
                       </div>
                    </div>
                 </div>
              </div>
              
              <!-- Form Side -->
              <div class="lg:w-2/3 bg-[#F1FAEE] p-10 md:p-14 rounded-[3rem] shadow-xl border border-[#95D5B2]">
                 <form class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-6">
                       <div>
                          <label class="block text-[#1B4332] font-bold mb-2">First Name</label>
                          <input type="text" placeholder="Jane" class="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#95D5B2] transition">
                       </div>
                       <div>
                          <label class="block text-[#1B4332] font-bold mb-2">Last Name</label>
                          <input type="text" placeholder="Doe" class="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#95D5B2] transition">
                       </div>
                    </div>
                    <div>
                       <label class="block text-[#1B4332] font-bold mb-2">Email Address</label>
                       <input type="email" placeholder="jane@example.com" class="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#95D5B2] transition">
                    </div>
                    <div>
                       <label class="block text-[#1B4332] font-bold mb-2">Subject</label>
                       <select class="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#95D5B2] transition bg-white">
                          <option>General Question</option>
                          <option>Order Issue</option>
                          <option>Membership Inquiry</option>
                          <option>Product Request</option>
                       </select>
                    </div>
                    <div>
                       <label class="block text-[#1B4332] font-bold mb-2">Your Message</label>
                       <textarea rows="5" placeholder="How can we help?" class="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#95D5B2] transition"></textarea>
                    </div>
                    <button type="button" class="bg-[#1B4332] w-full py-4 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-[#2D6A4F] transition transform hover:-translate-y-1">Send Message</button>
                 </form>
              </div>
           </div>
        </div>
      </section>

      <!-- 3. Google Map (Mock Embedded View) -->
      <section class="py-0 relative h-[500px] w-full bg-gray-200">
         <!-- Abstract representation of a map to avoid using real iframes unless specified -->
         <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&h=500&fit=crop')] bg-cover bg-center grayscale opacity-80 mix-blend-multiply"></div>
         <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce pointer-events-auto cursor-pointer border-2 border-[#2D6A4F]">
               <div class="w-12 h-12 bg-[#2D6A4F] rounded-full flex items-center justify-center text-white"><i class="fas fa-map-pin text-2xl"></i></div>
               <div>
                  <h4 class="font-bold text-[#1B4332]">EcoRefill HQ</h4>
                  <p class="text-sm text-gray-500">123 Green Way Blvd</p>
                  <a href="#" class="text-sm text-[#2D6A4F] font-bold hover:underline">Get Directions</a>
               </div>
            </div>
         </div>
      </section>

      <!-- 4. Customer Support -->
      <section class="py-24 bg-[#081C15] text-white">
        <div class="container mx-auto px-5">
           <div class="text-center mb-16">
              <h2 class="text-4xl font-bold heading-font text-[#F1FAEE]">Ways To Get Support</h2>
              <p class="text-[#95D5B2] mt-4 text-lg">We offer multiple channels to ensure you get help fast.</p>
           </div>
           
           <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
              <div class="bg-white/5 border border-white/20 p-10 rounded-[3rem] text-center hover:bg-white/10 transition backdrop-blur-md flex flex-col justify-between items-center h-full">
                 <div class="flex flex-col items-center">
                    <div class="w-20 h-20 bg-[#2D6A4F] rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg border-4 border-[#081C15]"><i class="fas fa-comments text-3xl text-white"></i></div>
                    <h3 class="text-2xl font-bold mb-3">Live Chat</h3>
                    <p class="text-gray-400 mb-6">Available 24/7 via our mobile app or website widget.</p>
                 </div>
                 <button class="bg-[#95D5B2] text-[#081C15] px-8 py-3 rounded-full font-bold hover:bg-white transition mt-auto">Start Chat</button>
              </div>
              <div class="bg-white/5 border border-[#95D5B2] p-10 rounded-[3rem] text-center transform md:-translate-y-4 shadow-[0_0_30px_rgba(149,213,178,0.2)] backdrop-blur-md flex flex-col justify-between items-center h-full">
                 <div class="flex flex-col items-center">
                    <div class="w-20 h-20 bg-accent rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg border-4 border-[#081C15]"><i class="fas fa-phone text-3xl text-[#081C15]"></i></div>
                    <h3 class="text-2xl font-bold mb-3">Phone Line</h3>
                    <p class="text-gray-300 mb-6">Call our dedicated support team during business hours.</p>
                 </div>
                 <a href="tel:18003263455" class="bg-white text-[#1B4332] px-8 py-3 rounded-full font-bold hover:bg-[#D8F3DC] transition inline-block mt-auto">1-800-ECO-FILL</a>
              </div>
              <div class="bg-white/5 border border-white/20 p-10 rounded-[3rem] text-center hover:bg-white/10 transition backdrop-blur-md flex flex-col justify-between items-center h-full">
                 <div class="flex flex-col items-center">
                    <div class="w-20 h-20 bg-[#2D6A4F] rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg border-4 border-[#081C15]"><i class="fab fa-twitter text-3xl text-white"></i></div>
                    <h3 class="text-2xl font-bold mb-3">Social Media</h3>
                    <p class="text-gray-400 mb-6">DM us on Twitter or Instagram. We usually reply in 2 hours.</p>
                 </div>
                 <button class="bg-[#95D5B2] text-[#081C15] px-8 py-3 rounded-full font-bold hover:bg-white transition mt-auto">@EcoRefillHQ</button>
              </div>
           </div>
        </div>
      </section>

      <!-- 5. FAQ -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-5 max-w-4xl">
           <div class="text-center mb-16">
              <h2 class="text-4xl font-bold heading-font text-[#1B4332]">Frequently Asked Questions</h2>
              <p class="text-gray-600 mt-4 text-lg">Quick answers to common questions about our service.</p>
           </div>
           
           <div class="space-y-6">
              <div class="bg-[#F1FAEE] p-8 rounded-3xl border-l-8 border-[#2D6A4F] shadow-sm">
                 <h4 class="font-bold text-[#1B4332] text-xl mb-3">Can I bring my own containers?</h4>
                 <p class="text-gray-700">Yes! That is the entire point of EcoRefill. Bring glass jars, tupperware, old detergent bottles, or cloth bags. We tare (weigh) them empty so you only pay for the product inside.</p>
              </div>
              <div class="bg-[#F1FAEE] p-8 rounded-3xl border-l-8 border-[#40916C] shadow-sm">
                 <h4 class="font-bold text-[#1B4332] text-xl mb-3">What if I don't have a container?</h4>
                 <p class="text-gray-700">No problem. We sell sterilized, reusable glass mason jars and compostable paper eco-packs right at the truck for a small nominal fee.</p>
              </div>
              <div class="bg-[#F1FAEE] p-8 rounded-3xl border-l-8 border-[#95D5B2] shadow-sm">
                 <h4 class="font-bold text-[#1B4332] text-xl mb-3">How do I track the truck?</h4>
                 <p class="text-gray-700">You can use the live tracker map on our Locations page, or download our mobile app to get push notifications when the truck enters your zip code.</p>
              </div>
              <div class="bg-[#F1FAEE] p-8 rounded-3xl border-l-8 border-[#1B4332] shadow-sm">
                 <h4 class="font-bold text-[#1B4332] text-xl mb-3">Are your products strictly organic?</h4>
                 <p class="text-gray-700">Over 90% of our dry goods are certified USDA Organic. We explicitly label any items that are conventionally grown (usually due to local sourcing limitations).</p>
              </div>
           </div>
        </div>
      </section>

      <!-- 6. Business Inquiry -->
      <section class="py-24 bg-[#D8F3DC] relative overflow-hidden">
        <div class="absolute -left-20 top-0 w-64 h-64 bg-white rounded-full opacity-50 blur-3xl"></div>
        <div class="container mx-auto px-5 relative z-10">
           <div class="bg-[#1B4332] rounded-[3rem] p-12 md:p-20 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12">
              <div class="md:w-2/3">
                 <span class="bg-[#95D5B2] text-[#081C15] font-bold px-4 py-1 rounded-full mb-6 inline-block tracking-widest uppercase text-sm">Wholesale Partners</span>
                 <h2 class="text-4xl md:text-5xl font-bold heading-font mb-6">Stock Your Business</h2>
                 <p class="text-[#95D5B2] text-lg mb-8 max-w-xl">Are you a cafe, restaurant, or local market wanting to source organic goods in bulk without the plastic waste? We offer commercial pricing and dedicated delivery routes for businesses.</p>
                 <ul class="space-y-3 mb-8">
                    <li><i class="fas fa-check-circle text-[#95D5B2] mr-2"></i> Tiered volume discounts up to 40% off</li>
                    <li><i class="fas fa-check-circle text-[#95D5B2] mr-2"></i> Industrial-sized reusable container swapping</li>
                    <li><i class="fas fa-check-circle text-[#95D5B2] mr-2"></i> Dedicated account manager</li>
                 </ul>
              </div>
              <div class="md:w-1/3 w-full">
                 <div class="bg-white p-8 rounded-3xl text-center shadow-xl">
                    <i class="fas fa-store text-6xl text-[#2D6A4F] mb-6"></i>
                    <h3 class="text-2xl font-bold text-[#1B4332] mb-4">Partner With Us</h3>
                    <p class="text-gray-600 mb-6 text-sm">Fill out our B2B application and we'll send you our commercial pricing catalog.</p>
                    <button type="button" class="w-full bg-[#1B4332] text-white py-4 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-md">Apply Now</button>
                 </div>
              </div>
           </div>
        </div>
      </section>
`;

pagesContent['Dashboard.html'] = `
      <section class="pt-40 pb-20 bg-[#081C15] text-[#F1FAEE] text-center rounded-b-[4rem]"><div class="container mx-auto px-5"><h1 class="text-6xl font-bold heading-font mb-6">Welcome Back, Alex!</h1><p class="text-xl text-[#95D5B2]">Sprout Member since Jan 2024</p></div></section>
      <section class="py-24 bg-white"><div class="container mx-auto px-5"><div class="grid md:grid-cols-2 gap-12"><div><h2 class="text-3xl font-bold text-[#1B4332] mb-6">Your Personal Impact</h2><div class="grid grid-cols-2 gap-4"><div class="bg-[#D8F3DC] p-6 rounded-2xl"><h3 class="text-4xl font-bold text-[#2D6A4F] mb-2">124</h3><p class="text-sm font-bold">Bottles Saved</p></div><div class="bg-[#D8F3DC] p-6 rounded-2xl"><h3 class="text-4xl font-bold text-[#2D6A4F] mb-2">18<span class="text-xl">kg</span></h3><p class="text-sm font-bold">CO2 Reduced</p></div><div class="bg-[#D8F3DC] p-6 rounded-2xl"><h3 class="text-4xl font-bold text-[#2D6A4F] mb-2">$85</h3><p class="text-sm font-bold">Money Saved</p></div><div class="bg-[#D8F3DC] p-6 rounded-2xl"><h3 class="text-4xl font-bold text-[#2D6A4F] mb-2">Level 4</h3><p class="text-sm font-bold">Eco Warrior</p></div></div></div><div class="p-8 bg-[#F1FAEE] rounded-[3rem] border-2 border-[#95D5B2]"><h3 class="text-2xl font-bold text-[#1B4332] mb-4">Membership Status</h3><p class="mb-4">You are currently on the <strong>Sprout Plan</strong>.</p><ul class="space-y-2 mb-6"><li class="flex items-center gap-2"><i class="fas fa-check text-[#2D6A4F]"></i> 15% off all refills</li><li class="flex items-center gap-2"><i class="fas fa-check text-[#2D6A4F]"></i> 1 Free monthly delivery</li></ul><button class="w-full btn-gradient text-white py-3 rounded-full font-bold">Upgrade to Tree</button></div></div></div></section>
      <section class="py-20 bg-[#F1FAEE]"><div class="container mx-auto px-5"><h2 class="text-3xl font-bold text-[#1B4332] mb-10">Recent Orders</h2><div class="space-y-4"><div class="bg-white p-6 rounded-2xl flex justify-between items-center shadow-sm"><div><p class="font-bold">Order #8924</p><p class="text-sm text-gray-500">Oct 12, 2024</p></div><div class="text-right"><p class="font-bold">$24.50</p><p class="text-sm text-[#2D6A4F]">Delivered</p></div></div><div class="bg-white p-6 rounded-2xl flex justify-between items-center shadow-sm"><div><p class="font-bold">Order #8810</p><p class="text-sm text-gray-500">Sep 28, 2024</p></div><div class="text-right"><p class="font-bold">$32.10</p><p class="text-sm text-[#2D6A4F]">Refilled at Truck</p></div></div></div></div></section>
      <section class="py-24 bg-[#2D6A4F] text-white text-center"><div class="container mx-auto px-5"><h2 class="text-4xl font-bold mb-6">Refer a Friend, Get $10</h2><p class="text-xl mb-8 max-w-2xl mx-auto">Share your unique code to give your friends $10 off their first refill.</p><div class="inline-block bg-white text-[#1B4332] px-8 py-4 rounded-full font-bold tracking-widest text-xl">ALEX-ECO-24</div></div></section>
      <section class="py-20 bg-white"><div class="container mx-auto px-5 max-w-4xl"><h2 class="text-3xl font-bold text-[#1B4332] mb-10">Account Settings</h2><div class="grid md:grid-cols-2 gap-6"><button class="p-6 border-2 border-gray-100 rounded-2xl hover:border-[#2D6A4F] transition text-left"><h4 class="font-bold mb-2">Saved Addresses</h4><p class="text-sm text-gray-500">Manage your home delivery spots.</p></button><button class="p-6 border-2 border-gray-100 rounded-2xl hover:border-[#2D6A4F] transition text-left"><h4 class="font-bold mb-2">Payment Methods</h4><p class="text-sm text-gray-500">Update cards and billing info.</p></button><button class="p-6 border-2 border-gray-100 rounded-2xl hover:border-[#2D6A4F] transition text-left"><h4 class="font-bold mb-2">Notifications</h4><p class="text-sm text-gray-500">Truck alerts and emails.</p></button><button class="p-6 border-2 border-gray-100 rounded-2xl hover:border-[#2D6A4F] transition text-left"><h4 class="font-bold mb-2">Privacy & Data</h4><p class="text-sm text-gray-500">Manage your data preferences.</p></button></div></div></section>
      <section class="py-20 bg-[#F1FAEE] text-center border-t border-gray-200"><div class="container mx-auto px-5"><button class="text-red-500 font-bold hover:underline">Sign Out</button></div></section>
`;

pagesContent['Cart.html'] = `
      <section class="pt-40 pb-20 bg-[#081C15] text-[#F1FAEE] text-center rounded-b-[4rem]"><div class="container mx-auto px-5"><h1 class="text-6xl font-bold heading-font mb-6">Your Cart</h1><p class="text-xl text-[#95D5B2]">3 items ready for refill.</p></div></section>
      <section class="py-24 bg-white"><div class="container mx-auto px-5"><div class="grid md:grid-cols-3 gap-12"><div class="md:col-span-2 space-y-6"><div class="flex items-center gap-6 p-6 border border-gray-200 rounded-3xl"><div class="w-24 h-24 bg-[#D8F3DC] rounded-xl flex items-center justify-center"><i class="fas fa-seedling text-3xl text-[#2D6A4F]"></i></div><div class="flex-grow"><h3 class="font-bold text-xl">Organic Basmati Rice</h3><p class="text-gray-500">2 lbs @ $4.20/lb</p></div><div class="font-bold text-xl">$8.40</div><button class="text-gray-400 hover:text-red-500"><i class="fas fa-trash"></i></button></div><div class="flex items-center gap-6 p-6 border border-gray-200 rounded-3xl"><div class="w-24 h-24 bg-[#D8F3DC] rounded-xl flex items-center justify-center"><i class="fas fa-pump-soap text-3xl text-[#2D6A4F]"></i></div><div class="flex-grow"><h3 class="font-bold text-xl">Eco Dish Soap</h3><p class="text-gray-500">1 Liter</p></div><div class="font-bold text-xl">$6.50</div><button class="text-gray-400 hover:text-red-500"><i class="fas fa-trash"></i></button></div></div><div class="bg-[#F1FAEE] p-8 rounded-[3rem] h-fit"><h3 class="text-2xl font-bold text-[#1B4332] mb-6">Order Summary</h3><div class="space-y-4 mb-6 border-b border-gray-300 pb-6"><div class="flex justify-between"><span class="text-gray-600">Subtotal</span><span class="font-bold">$14.90</span></div><div class="flex justify-between"><span class="text-gray-600">Sprout Discount (15%)</span><span class="font-bold text-[#2D6A4F]">-$2.23</span></div><div class="flex justify-between"><span class="text-gray-600">Eco-Pack Fee</span><span class="font-bold">$0.50</span></div></div><div class="flex justify-between text-xl mb-8"><span class="font-bold">Total</span><span class="font-bold text-[#1B4332]">$13.17</span></div><button class="w-full btn-gradient text-white py-4 rounded-full font-bold shadow-xl">Proceed to Checkout</button></div></div></div></section>
      <section class="py-20 bg-[#F1FAEE]"><div class="container mx-auto px-5 text-center"><h2 class="text-3xl font-bold text-[#1B4332] mb-12">Recommended Adds</h2><div class="grid md:grid-cols-4 gap-6"><div class="bg-white p-6 rounded-3xl shadow-sm"><i class="fas fa-leaf text-3xl text-[#2D6A4F] mb-3"></i><h4 class="font-bold">Bamboo Toothbrush</h4><p class="text-[#2D6A4F] font-bold mt-2">$4.00</p><button class="mt-3 text-sm border border-[#2D6A4F] rounded-full px-4 py-1">Add</button></div><div class="bg-white p-6 rounded-3xl shadow-sm"><i class="fas fa-box text-3xl text-[#2D6A4F] mb-3"></i><h4 class="font-bold">Extra Glass Jar</h4><p class="text-[#2D6A4F] font-bold mt-2">$2.50</p><button class="mt-3 text-sm border border-[#2D6A4F] rounded-full px-4 py-1">Add</button></div></div></div></section>
      <section class="py-24 bg-[#1B4332] text-white text-center"><div class="container mx-auto px-5"><h2 class="text-4xl font-bold mb-6">Have a Promo Code?</h2><div class="max-w-md mx-auto relative"><input type="text" placeholder="Enter code" class="w-full py-4 px-6 rounded-full text-black"><button class="absolute right-2 top-2 bottom-2 bg-[#2D6A4F] px-6 rounded-full font-bold">Apply</button></div></div></section>
      <section class="py-20 bg-white"><div class="container mx-auto px-5 text-center"><p class="text-gray-500 mb-6"><i class="fas fa-lock text-[#2D6A4F] mr-2"></i> Secure SSL Checkout encrypted with bank-level security.</p><div class="flex justify-center gap-4 text-4xl text-gray-300"><i class="fab fa-cc-visa"></i><i class="fab fa-cc-mastercard"></i><i class="fab fa-cc-amex"></i><i class="fab fa-apple-pay"></i></div></div></section>
      <section class="py-20 bg-[#F1FAEE] text-center border-t border-gray-200"><div class="container mx-auto px-5"><a href="Products.html" class="text-[#2D6A4F] font-bold hover:underline">← Continue Shopping</a></div></section>
`;

// Write files
for (const [filename, content] of Object.entries(pagesContent)) {
    const fullHtml = buildPage(filename.replace('.html', ''), content);
    fs.writeFileSync(path.join(__dirname, filename), fullHtml, 'utf8');
}
console.log('Successfully generated traditional multi-page architecture!');
