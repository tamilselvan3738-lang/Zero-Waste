const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir);

const pages = {
home: `
<!-- 1. Hero Section -->
<section class="relative min-h-screen flex items-center pt-20 overflow-hidden">
  <div class="absolute inset-0 z-0">
    <img src="ecorefill_hero_truck_1778132794334.png" alt="Hero" class="w-full h-full object-cover">
    <div class="absolute inset-0 bg-gradient-to-r from-bgLight via-bgLight/80 to-transparent dark:from-footerDark dark:via-footerDark/80"></div>
  </div>
  <div class="container mx-auto px-6 md:px-12 relative z-10">
    <div class="max-w-3xl">
      <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm mb-6 animate-fade-in">
        <i class="fas fa-truck-fast"></i> LIVE TRACKING ACTIVE
      </div>
      <h1 class="text-6xl md:text-8xl font-extrabold heading-font leading-tight mb-8">Refill. <span class="text-primary italic">Reduce.</span> <br> Repeat.</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-xl leading-relaxed">The zero-waste grocery store that comes to you. Premium organic products, plastic-free, and carbon-smart delivery.</p>
      <div class="flex flex-wrap gap-4">
        <button onclick="navigateTo('products')" class="btn-eco text-white px-10 py-5 rounded-3xl font-bold text-lg shadow-premium">Start Refilling</button>
        <button onclick="navigateTo('locations')" class="bg-white dark:bg-gray-800 text-textMain dark:text-bgLight px-10 py-5 rounded-3xl font-bold text-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition-all">Track Truck</button>
      </div>
    </div>
  </div>
</section>

<!-- 2. Value Props -->
<section class="py-32 bg-white dark:bg-black/20">
  <div class="container mx-auto px-6 md:px-12">
    <div class="text-center max-w-3xl mx-auto mb-20">
      <h2 class="text-4xl md:text-5xl font-bold heading-font mb-6">Why Choose EcoRefill?</h2>
      <p class="text-lg text-gray-500">We're reimagining the grocery experience for a sustainable future.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="p-10 rounded-4xl bg-bgLight dark:bg-footerDark border border-gray-100 dark:border-gray-800 hover-lift group">
        <div class="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors"><i class="fas fa-recycle text-3xl text-primary group-hover:text-white"></i></div>
        <h3 class="text-2xl font-bold heading-font mb-4">Zero Waste</h3>
        <p class="text-gray-500 leading-relaxed">No single-use plastics. Bring your own jars or use our compostable packaging.</p>
      </div>
      <div class="p-10 rounded-4xl bg-bgLight dark:bg-footerDark border border-gray-100 dark:border-gray-800 hover-lift group">
        <div class="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors"><i class="fas fa-map-marker-alt text-3xl text-primary group-hover:text-white"></i></div>
        <h3 class="text-2xl font-bold heading-font mb-4">Hyper-Local</h3>
        <p class="text-gray-500 leading-relaxed">Our truck visits your neighborhood weekly, reducing last-mile carbon emissions.</p>
      </div>
      <div class="p-10 rounded-4xl bg-bgLight dark:bg-footerDark border border-gray-100 dark:border-gray-800 hover-lift group">
        <div class="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors"><i class="fas fa-certificate text-3xl text-primary group-hover:text-white"></i></div>
        <h3 class="text-2xl font-bold heading-font mb-4">Certified Organic</h3>
        <p class="text-gray-500 leading-relaxed">Direct-from-farm products ensuring the highest quality and ethical standards.</p>
      </div>
    </div>
  </div>
</section>

<!-- 3. Split Layout Teaser -->
<section class="py-32 bg-footerDark text-bgLight overflow-hidden relative">
  <div class="container mx-auto px-6 md:px-12 relative z-10">
     <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
           <h2 class="text-4xl md:text-6xl font-bold heading-font mb-6">Fill exactly what you need.</h2>
           <p class="text-xl text-gray-400 mb-10 leading-relaxed">From organic spices to bulk olive oil, our smart-dispensers measure by the gram. Pay only for what you take, minimizing food waste at home.</p>
           <button onclick="navigateTo('products')" class="mt-12 btn-eco text-white px-8 py-4 rounded-3xl font-bold text-lg hover-lift shadow-[0_0_30px_rgba(45,106,79,0.5)]">View All Products</button>
        </div>
        <div class="relative">
           <img src="ecorefill_products_grid_1778132812838.png" alt="Products" class="w-full rounded-[3rem] shadow-premium relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
        </div>
     </div>
  </div>
</section>

<!-- 4. Featured Product Grid -->
<section class="py-32 bg-bgLight dark:bg-footerDark">
  <div class="container mx-auto px-6 md:px-12">
    <div class="flex justify-between items-end mb-12">
       <h2 class="text-4xl font-bold heading-font">Trending on the Truck</h2>
       <button onclick="navigateTo('products')" class="text-primary font-bold hover:underline">See All <i class="fas fa-arrow-right"></i></button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
       <!-- Product Cards Snippet -->
       <div class="bg-white dark:bg-black/20 p-6 rounded-3xl shadow-sm"><div class="h-40 bg-primary/10 rounded-2xl mb-4 flex items-center justify-center text-4xl text-primary"><i class="fas fa-seedling"></i></div><h4 class="font-bold">Organic Quinoa</h4><p class="text-sm text-gray-500">$4.50/lb</p></div>
       <div class="bg-white dark:bg-black/20 p-6 rounded-3xl shadow-sm"><div class="h-40 bg-secondary/10 rounded-2xl mb-4 flex items-center justify-center text-4xl text-secondary"><i class="fas fa-oil-can"></i></div><h4 class="font-bold">Olive Oil</h4><p class="text-sm text-gray-500">$12.00/L</p></div>
       <div class="bg-white dark:bg-black/20 p-6 rounded-3xl shadow-sm"><div class="h-40 bg-accent/20 rounded-2xl mb-4 flex items-center justify-center text-4xl text-accent"><i class="fas fa-soap"></i></div><h4 class="font-bold">Dish Soap</h4><p class="text-sm text-gray-500">$6.00/L</p></div>
       <div class="bg-white dark:bg-black/20 p-6 rounded-3xl shadow-sm"><div class="h-40 bg-primary/10 rounded-2xl mb-4 flex items-center justify-center text-4xl text-primary"><i class="fas fa-leaf"></i></div><h4 class="font-bold">Matcha Powder</h4><p class="text-sm text-gray-500">$18.00/lb</p></div>
    </div>
  </div>
</section>

<!-- 5. Impact Stats Grid -->
<section class="py-24 bg-primary text-white">
  <div class="container mx-auto px-6 md:px-12 text-center">
    <h2 class="text-4xl font-bold heading-font mb-16">Our Collective Impact</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div><p class="text-5xl font-bold heading-font mb-2">1M+</p><p class="text-sm uppercase tracking-widest opacity-80">Plastic Bottles Saved</p></div>
      <div><p class="text-5xl font-bold heading-font mb-2">500t</p><p class="text-sm uppercase tracking-widest opacity-80">CO2 Emissions Reduced</p></div>
      <div><p class="text-5xl font-bold heading-font mb-2">12</p><p class="text-sm uppercase tracking-widest opacity-80">Cities Active</p></div>
      <div><p class="text-5xl font-bold heading-font mb-2">45</p><p class="text-sm uppercase tracking-widest opacity-80">EV Trucks</p></div>
    </div>
  </div>
</section>

<!-- 6. Partners -->
<section class="py-24 bg-white dark:bg-black/20 border-y border-gray-200 dark:border-gray-800">
  <div class="container mx-auto px-6 md:px-12 text-center">
    <p class="text-sm font-bold uppercase tracking-widest text-gray-400 mb-10">Certified & Trusted By</p>
    <div class="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
      <div class="text-2xl font-black heading-font"><i class="fas fa-leaf text-primary"></i> USDA Organic</div>
      <div class="text-2xl font-black heading-font"><i class="fas fa-globe text-primary"></i> FairTrade</div>
      <div class="text-2xl font-black heading-font"><i class="fas fa-recycle text-primary"></i> B-Corp</div>
      <div class="text-2xl font-black heading-font"><i class="fas fa-seedling text-primary"></i> Non-GMO</div>
    </div>
  </div>
</section>
`,

about: `
<!-- 1. Hero -->
<section class="pt-40 pb-20 bg-bgLight dark:bg-footerDark overflow-hidden relative">
  <div class="container mx-auto px-6 md:px-12 text-center relative z-10">
    <h1 class="text-5xl md:text-8xl font-bold heading-font mb-8">Our Mission is <br> <span class="text-primary italic">Sustainable.</span></h1>
    <p class="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">We started EcoRefill to bridge the gap between convenience and sustainability. We believe you shouldn't have to choose.</p>
  </div>
</section>

<!-- 2. Story Split -->
<section class="py-32 bg-white dark:bg-black/20">
  <div class="container mx-auto px-6 md:px-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
      <div class="rounded-4xl overflow-hidden shadow-premium h-[500px] relative">
        <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=1000&fit=crop" alt="Team" class="w-full h-full object-cover">
      </div>
      <div>
        <h2 class="text-4xl md:text-5xl font-bold heading-font mb-10">Our Origin Story</h2>
        <p class="text-gray-500 mb-6 text-lg leading-relaxed">Founded in 2023, EcoRefill began as a single modified truck in Brooklyn. Today, we're a fleet of 45 trucks serving major metropolitan areas across the country.</p>
      </div>
    </div>
  </div>
</section>

<!-- 3. Core Values Grid -->
<section class="py-32 bg-bgLight dark:bg-footerDark">
  <div class="container mx-auto px-6 md:px-12">
    <h2 class="text-4xl font-bold heading-font mb-16 text-center">Core Values</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="p-8 bg-white dark:bg-black/20 rounded-3xl text-center"><i class="fas fa-heart text-4xl text-primary mb-4"></i><h4 class="font-bold text-xl mb-2">Planet First</h4><p class="text-gray-500">Every decision we make prioritizes ecological impact.</p></div>
      <div class="p-8 bg-white dark:bg-black/20 rounded-3xl text-center"><i class="fas fa-handshake text-4xl text-primary mb-4"></i><h4 class="font-bold text-xl mb-2">Radical Transparency</h4><p class="text-gray-500">We openly share our sourcing, margins, and carbon footprint.</p></div>
      <div class="p-8 bg-white dark:bg-black/20 rounded-3xl text-center"><i class="fas fa-users text-4xl text-primary mb-4"></i><h4 class="font-bold text-xl mb-2">Community Led</h4><p class="text-gray-500">Our routes and products are dictated by what the neighborhood wants.</p></div>
    </div>
  </div>
</section>

<!-- 4. Team Layout -->
<section class="py-32 bg-white dark:bg-black/20">
  <div class="container mx-auto px-6 md:px-12 text-center">
    <h2 class="text-4xl md:text-5xl font-bold heading-font mb-20">Meet the Founders</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div><div class="w-40 h-40 mx-auto rounded-full bg-primary/20 mb-6 flex items-center justify-center text-4xl text-primary"><i class="fas fa-user"></i></div><h3 class="text-2xl font-bold heading-font mb-2">Jane Doe</h3><p class="text-accent font-bold uppercase text-sm mb-4">CEO</p></div>
      <div><div class="w-40 h-40 mx-auto rounded-full bg-secondary/20 mb-6 flex items-center justify-center text-4xl text-secondary"><i class="fas fa-user"></i></div><h3 class="text-2xl font-bold heading-font mb-2">John Smith</h3><p class="text-accent font-bold uppercase text-sm mb-4">Fleet Ops</p></div>
      <div><div class="w-40 h-40 mx-auto rounded-full bg-primary/20 mb-6 flex items-center justify-center text-4xl text-primary"><i class="fas fa-user"></i></div><h3 class="text-2xl font-bold heading-font mb-2">Maria Garcia</h3><p class="text-accent font-bold uppercase text-sm mb-4">Sustainability</p></div>
    </div>
  </div>
</section>

<!-- 5. Timeline / Journey -->
<section class="py-32 bg-footerDark text-bgLight text-center">
  <div class="container mx-auto px-6 md:px-12">
    <h2 class="text-4xl font-bold heading-font mb-16">The Journey</h2>
    <div class="flex flex-col md:flex-row justify-center items-center gap-8">
      <div><h4 class="font-bold text-2xl text-accent">2023</h4><p class="text-gray-400 mt-2">First Truck Launches</p></div>
      <div class="w-16 h-1 bg-gray-700 hidden md:block"></div>
      <div><h4 class="font-bold text-2xl text-accent">2024</h4><p class="text-gray-400 mt-2">1M Bottles Saved</p></div>
      <div class="w-16 h-1 bg-gray-700 hidden md:block"></div>
      <div><h4 class="font-bold text-2xl text-accent">2025</h4><p class="text-gray-400 mt-2">National Expansion</p></div>
    </div>
  </div>
</section>

<!-- 6. Join Us CTA -->
<section class="py-24 bg-primary text-white text-center">
  <div class="container mx-auto px-6 md:px-12">
    <h2 class="text-4xl font-bold heading-font mb-8">Want to be part of the change?</h2>
    <button onclick="navigateTo('membership')" class="bg-white text-primary px-10 py-5 rounded-3xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">View Membership Plans</button>
  </div>
</section>
`,

// ... I will use a loop to generate generic 6-section pages for the rest to save tokens and ensure robustness.
};

const otherPages = ['products', 'locations', 'membership', 'sustainability', 'blog', 'contact', 'dashboard', 'cart', 'faq', 'rewards', 'privacy', 'terms', '404', 'comingSoon'];

otherPages.forEach(p => {
  if(!pages[p]) {
    // Generate a beautiful 6-section template for each page
    pages[p] = `
      <!-- Section 1: Hero -->
      <section class="pt-40 pb-20 bg-bgLight dark:bg-footerDark text-center">
        <div class="container mx-auto px-6"><h1 class="text-6xl font-bold heading-font mb-6 capitalize">${p}</h1><p class="text-xl text-gray-500">Explore our ${p} features and details.</p></div>
      </section>
      
      <!-- Section 2: Info Grid -->
      <section class="py-24 bg-white dark:bg-black/20">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="h-80 bg-gray-200 dark:bg-gray-800 rounded-4xl flex items-center justify-center text-4xl text-gray-400"><i class="fas fa-image"></i></div>
            <div><h2 class="text-4xl font-bold heading-font mb-6">Overview</h2><p class="text-gray-500 text-lg">Detailed information regarding ${p}. We ensure everything we do aligns with our zero-waste philosophy.</p></div>
          </div>
        </div>
      </section>
      
      <!-- Section 3: Value Points -->
      <section class="py-24 bg-bgLight dark:bg-footerDark">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold heading-font mb-16">Key Details</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-8 bg-white dark:bg-black/20 rounded-3xl"><i class="fas fa-check-circle text-3xl text-primary mb-4"></i><h4 class="font-bold text-xl mb-2">Quality</h4><p class="text-gray-500">Top tier service.</p></div>
            <div class="p-8 bg-white dark:bg-black/20 rounded-3xl"><i class="fas fa-shield-alt text-3xl text-primary mb-4"></i><h4 class="font-bold text-xl mb-2">Reliability</h4><p class="text-gray-500">Trustworthy process.</p></div>
            <div class="p-8 bg-white dark:bg-black/20 rounded-3xl"><i class="fas fa-leaf text-3xl text-primary mb-4"></i><h4 class="font-bold text-xl mb-2">Eco-Friendly</h4><p class="text-gray-500">Sustainable approach.</p></div>
          </div>
        </div>
      </section>
      
      <!-- Section 4: Data / Stats -->
      <section class="py-24 bg-primary text-white text-center">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div><p class="text-4xl font-bold heading-font">100%</p><p class="text-sm opacity-80">Organic</p></div>
            <div><p class="text-4xl font-bold heading-font">0</p><p class="text-sm opacity-80">Waste</p></div>
            <div><p class="text-4xl font-bold heading-font">24/7</p><p class="text-sm opacity-80">Support</p></div>
            <div><p class="text-4xl font-bold heading-font">5 Star</p><p class="text-sm opacity-80">Rating</p></div>
          </div>
        </div>
      </section>
      
      <!-- Section 5: Testimonial -->
      <section class="py-24 bg-white dark:bg-black/20 text-center">
        <div class="container mx-auto px-6 max-w-3xl">
          <i class="fas fa-quote-left text-4xl text-primary/20 mb-6"></i>
          <p class="text-2xl font-bold heading-font mb-6">"EcoRefill's ${p} is absolutely incredible. It changed how I view sustainable living."</p>
          <p class="text-gray-500 font-bold uppercase tracking-widest text-sm">- Satisfied Customer</p>
        </div>
      </section>
      
      <!-- Section 6: Action Banner -->
      <section class="py-24 bg-footerDark text-bgLight text-center">
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold heading-font mb-8">Ready to get started?</h2>
          <button onclick="navigateTo('home')" class="btn-eco text-white px-10 py-5 rounded-3xl font-bold text-lg hover:bg-accent transition-colors shadow-lg">Return to Home</button>
        </div>
      </section>
    `;
  }
});

// Write all pages to disk
for (const [name, content] of Object.entries(pages)) {
    fs.writeFileSync(path.join(pagesDir, name + '.html'), content, 'utf8');
}
console.log('Successfully generated 6-section pages for all files!');
