const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir);
}

const pages = {
home: `
<!-- Hero Section -->
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
      <h1 class="text-6xl md:text-8xl font-extrabold heading-font leading-tight mb-8">
        Refill. <span class="text-primary italic">Reduce.</span> <br> Repeat.
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-xl leading-relaxed">
        The zero-waste grocery store that comes to you. Premium organic products, plastic-free, and carbon-smart delivery.
      </p>
      <div class="flex flex-wrap gap-4">
        <button onclick="navigateTo('products')" class="btn-eco text-white px-10 py-5 rounded-3xl font-bold text-lg shadow-premium">Start Refilling</button>
        <button onclick="navigateTo('locations')" class="bg-white dark:bg-gray-800 text-textMain dark:text-bgLight px-10 py-5 rounded-3xl font-bold text-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition-all">Track Truck</button>
      </div>
      
      <div class="mt-16 grid grid-cols-3 gap-8">
        <div>
          <p class="text-3xl font-bold heading-font text-primary">50k+</p>
          <p class="text-sm text-gray-500 uppercase tracking-widest">Plastic Saved</p>
        </div>
        <div>
          <p class="text-3xl font-bold heading-font text-primary">12k+</p>
          <p class="text-sm text-gray-500 uppercase tracking-widest">Happy Members</p>
        </div>
        <div>
          <p class="text-3xl font-bold heading-font text-primary">4.9/5</p>
          <p class="text-sm text-gray-500 uppercase tracking-widest">User Rating</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Why Choose Us -->
<section class="py-32 bg-white dark:bg-black/20">
  <div class="container mx-auto px-6 md:px-12">
    <div class="text-center max-w-3xl mx-auto mb-20">
      <h2 class="text-4xl md:text-5xl font-bold heading-font mb-6">Why Choose EcoRefill?</h2>
      <p class="text-lg text-gray-500">We're reimagining the grocery experience for a sustainable future.</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="p-10 rounded-4xl bg-bgLight dark:bg-footerDark border border-gray-100 dark:border-gray-800 hover-lift group">
        <div class="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
          <i class="fas fa-recycle text-3xl text-primary group-hover:text-white"></i>
        </div>
        <h3 class="text-2xl font-bold heading-font mb-4">Zero Waste</h3>
        <p class="text-gray-500 leading-relaxed">No single-use plastics. Bring your own jars or use our compostable packaging.</p>
      </div>
      <div class="p-10 rounded-4xl bg-bgLight dark:bg-footerDark border border-gray-100 dark:border-gray-800 hover-lift group">
        <div class="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
          <i class="fas fa-map-marker-alt text-3xl text-primary group-hover:text-white"></i>
        </div>
        <h3 class="text-2xl font-bold heading-font mb-4">Hyper-Local</h3>
        <p class="text-gray-500 leading-relaxed">Our truck visits your neighborhood weekly, reducing last-mile carbon emissions.</p>
      </div>
      <div class="p-10 rounded-4xl bg-bgLight dark:bg-footerDark border border-gray-100 dark:border-gray-800 hover-lift group">
        <div class="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
          <i class="fas fa-certificate text-3xl text-primary group-hover:text-white"></i>
        </div>
        <h3 class="text-2xl font-bold heading-font mb-4">Certified Organic</h3>
        <p class="text-gray-500 leading-relaxed">Direct-from-farm products ensuring the highest quality and ethical standards.</p>
      </div>
    </div>
  </div>
</section>

<!-- EXTRA SECTION ADDED: Partners & Certifications -->
<section class="py-24 bg-bgLight dark:bg-footerDark border-y border-gray-200 dark:border-gray-800">
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
<section class="pt-40 pb-20 bg-bgLight dark:bg-footerDark overflow-hidden relative">
  <div class="container mx-auto px-6 md:px-12 text-center relative z-10">
    <h1 class="text-5xl md:text-8xl font-bold heading-font mb-8">Our Mission is <br> <span class="text-primary italic">Sustainable.</span></h1>
    <p class="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
      We started EcoRefill to bridge the gap between convenience and sustainability. We believe you shouldn't have to choose.
    </p>
  </div>
  <div class="absolute top-40 right-[-100px] text-primary/5 text-[300px] font-black heading-font select-none">ECO</div>
</section>

<section class="py-32">
  <div class="container mx-auto px-6 md:px-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
      <div class="rounded-4xl overflow-hidden shadow-premium h-[600px] relative">
        <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=1000&fit=crop" alt="Team" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
      </div>
      <div>
        <h2 class="text-4xl md:text-5xl font-bold heading-font mb-10">Our Story</h2>
        <p class="text-gray-500 mb-6 text-lg leading-relaxed">
          Founded in 2023, EcoRefill began as a single modified truck in Brooklyn. Today, we're a fleet of 15 trucks serving major metropolitan areas across the country.
        </p>
        <div class="grid grid-cols-2 gap-10 mt-12 mb-12">
           <div class="p-6 rounded-3xl bg-bgLight dark:bg-footerDark border border-gray-100 dark:border-gray-800">
              <h4 class="text-xl font-bold heading-font text-primary mb-2">Vision</h4>
              <p class="text-sm text-gray-500">To make zero-waste the standard.</p>
           </div>
           <div class="p-6 rounded-3xl bg-bgLight dark:bg-footerDark border border-gray-100 dark:border-gray-800">
              <h4 class="text-xl font-bold heading-font text-primary mb-2">Values</h4>
              <p class="text-sm text-gray-500">Transparency and planet-first logic.</p>
           </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- EXTRA SECTION ADDED: The Team -->
<section class="py-32 bg-white dark:bg-black/20">
  <div class="container mx-auto px-6 md:px-12 text-center">
    <h2 class="text-4xl md:text-5xl font-bold heading-font mb-20">Meet the Founders</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div class="p-8">
        <div class="w-40 h-40 mx-auto rounded-full bg-primary/20 mb-6 flex items-center justify-center text-4xl text-primary"><i class="fas fa-user"></i></div>
        <h3 class="text-2xl font-bold heading-font mb-2">Jane Doe</h3>
        <p class="text-accent font-bold uppercase tracking-widest text-sm mb-4">CEO & Founder</p>
        <p class="text-gray-500">Former environmental scientist turned eco-entrepreneur.</p>
      </div>
      <div class="p-8">
        <div class="w-40 h-40 mx-auto rounded-full bg-secondary/20 mb-6 flex items-center justify-center text-4xl text-secondary"><i class="fas fa-user"></i></div>
        <h3 class="text-2xl font-bold heading-font mb-2">John Smith</h3>
        <p class="text-accent font-bold uppercase tracking-widest text-sm mb-4">Head of Fleet Ops</p>
        <p class="text-gray-500">Logistics expert ensuring zero-emission routing.</p>
      </div>
      <div class="p-8">
        <div class="w-40 h-40 mx-auto rounded-full bg-primary/20 mb-6 flex items-center justify-center text-4xl text-primary"><i class="fas fa-user"></i></div>
        <h3 class="text-2xl font-bold heading-font mb-2">Maria Garcia</h3>
        <p class="text-accent font-bold uppercase tracking-widest text-sm mb-4">Chief Sustainability Officer</p>
        <p class="text-gray-500">Sourcing the best ethical products globally.</p>
      </div>
    </div>
  </div>
</section>
`,

products: `
<section class="pt-40 pb-20 bg-bgLight dark:bg-footerDark relative overflow-hidden">
  <div class="container mx-auto px-6 md:px-12 relative z-10">
    <div class="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
      <div>
        <h1 class="text-6xl font-bold heading-font mb-4">Marketplace</h1>
        <p class="text-xl text-gray-500">Premium organic products, zero-waste delivery.</p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div class="bg-white dark:bg-footerDark rounded-[2.5rem] p-8 shadow-premium hover-lift">
        <div class="aspect-square bg-primary/10 rounded-[2rem] flex items-center justify-center mb-8 relative">
          <i class="fas fa-seedling text-6xl text-primary/40"></i>
          <span class="absolute top-4 left-4 bg-white/90 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase">Best Seller</span>
        </div>
        <h3 class="text-2xl font-bold heading-font mb-2">Organic Basmati Rice</h3>
        <p class="text-primary font-bold text-xl mt-6">$4.20 / lb</p>
        <button class="w-full btn-eco text-white py-4 rounded-2xl font-bold mt-8 flex items-center justify-center gap-3">
          <i class="fas fa-shopping-basket"></i> Add to Bag
        </button>
      </div>
      
      <div class="bg-white dark:bg-footerDark rounded-[2.5rem] p-8 shadow-premium hover-lift">
        <div class="aspect-square bg-secondary/10 rounded-[2rem] flex items-center justify-center mb-8 relative">
          <i class="fas fa-oil-can text-6xl text-primary/40"></i>
        </div>
        <h3 class="text-2xl font-bold heading-font mb-2">Cold Pressed Olive Oil</h3>
        <p class="text-primary font-bold text-xl mt-6">$12.50 / ltr</p>
        <button class="w-full btn-eco text-white py-4 rounded-2xl font-bold mt-8 flex items-center justify-center gap-3">
          <i class="fas fa-shopping-basket"></i> Add to Bag
        </button>
      </div>
    </div>
  </div>
</section>

<!-- EXTRA SECTION ADDED: New Arrivals Alert -->
<section class="py-20 bg-primary text-white text-center relative overflow-hidden">
  <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
  <div class="container mx-auto px-6 md:px-12 relative z-10">
    <h2 class="text-4xl md:text-5xl font-bold heading-font mb-6">Seasonal Restock is Here!</h2>
    <p class="text-xl mb-10 opacity-90 max-w-2xl mx-auto">We've just added 50+ new spices, bulk teas, and sustainable home cleaning supplies to our trucks.</p>
    <button class="bg-white text-primary px-10 py-5 rounded-3xl font-bold text-lg hover:bg-accent transition-colors shadow-lg">Shop New Arrivals</button>
  </div>
</section>
`,

locations: `
<section class="pt-40 pb-20">
  <div class="container mx-auto px-6 md:px-12">
    <h1 class="text-6xl font-bold heading-font mb-4">Track Our Truck</h1>
    <p class="text-xl text-gray-500 mb-20">Live fleet tracking and upcoming neighborhood stops.</p>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
      <div class="lg:col-span-2 bg-gray-200 dark:bg-gray-800 rounded-[3rem] h-[500px] relative overflow-hidden shadow-premium flex items-center justify-center">
        <div class="text-center text-gray-400">
           <i class="fas fa-map-marked-alt text-6xl mb-6 opacity-30"></i>
           <p class="text-xl font-bold uppercase tracking-widest opacity-30">Interactive Map Interface</p>
        </div>
        <div class="absolute top-[40%] left-[30%] w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(45,106,79,0.5)] animate-pulse cursor-pointer z-20">
           <i class="fas fa-truck text-xl"></i>
        </div>
      </div>
      
      <div class="space-y-8">
        <div class="bg-footerDark text-bgLight p-10 rounded-[2.5rem] shadow-premium relative overflow-hidden">
          <h3 class="text-2xl font-bold heading-font mb-6">Current Stop</h3>
          <p class="text-3xl font-bold text-accent mb-2">Central Park Hub</p>
          <p class="text-gray-400 mb-10">Main Entrance, near Columbus Circle.</p>
          <button class="w-full bg-white text-footerDark py-5 rounded-2xl font-bold text-lg hover:bg-accent transition-colors">Open in Google Maps</button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- EXTRA SECTION ADDED: Request A Stop -->
<section class="py-32 bg-bgLight dark:bg-footerDark border-t border-gray-200 dark:border-gray-800">
  <div class="container mx-auto px-6 md:px-12">
    <div class="bg-white dark:bg-black/20 p-12 md:p-20 rounded-[3rem] shadow-premium text-center max-w-4xl mx-auto">
      <div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl mx-auto mb-8"><i class="fas fa-map-pin"></i></div>
      <h2 class="text-4xl font-bold heading-font mb-6">Don't See Your Neighborhood?</h2>
      <p class="text-xl text-gray-500 mb-10">We expand our routes based on community demand. Suggest a new truck stop location below.</p>
      <form class="flex flex-col md:flex-row gap-4 justify-center">
        <input type="text" placeholder="Enter Zip Code or Neighborhood" class="px-8 py-4 rounded-2xl bg-bgLight dark:bg-footerDark border border-gray-100 dark:border-gray-800 focus:ring-2 ring-primary w-full md:w-96">
        <button type="button" class="btn-eco text-white px-10 py-4 rounded-2xl font-bold shadow-lg">Request Stop</button>
      </form>
    </div>
  </div>
</section>
`
};

for (const [name, content] of Object.entries(pages)) {
    fs.writeFileSync(path.join(pagesDir, name + '.html'), content, 'utf8');
}
console.log('Successfully created HTML files in pages/ directory.');
