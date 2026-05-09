const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

const pages = {
membership: `
<section class="pt-40 pb-32">
  <div class="container mx-auto px-6 md:px-12">
    <div class="text-center max-w-3xl mx-auto mb-20">
      <h1 class="text-5xl md:text-7xl font-bold heading-font mb-6">Membership Plans</h1>
      <p class="text-xl text-gray-500">Join the movement and unlock exclusive perks, free delivery, and community events.</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <div class="p-10 rounded-[3rem] bg-bgLight dark:bg-footerDark border border-gray-100 dark:border-gray-800 relative">
        <h3 class="text-2xl font-bold heading-font mb-2">Basic</h3>
        <p class="text-gray-500 text-sm mb-6">For the casual refiller.</p>
        <p class="text-5xl font-bold heading-font mb-8">Free</p>
        <ul class="space-y-4 mb-10 text-gray-600 dark:text-gray-400 font-medium">
          <li class="flex items-center gap-3"><i class="fas fa-check text-primary"></i> Access to truck schedule</li>
          <li class="flex items-center gap-3"><i class="fas fa-check text-primary"></i> Basic container tracking</li>
        </ul>
        <button class="w-full py-4 rounded-2xl bg-gray-200 dark:bg-gray-800 font-bold hover:bg-gray-300 transition-colors">Current Plan</button>
      </div>
      
      <div class="p-10 rounded-[3rem] bg-footerDark text-bgLight shadow-[0_20px_50px_rgba(45,106,79,0.3)] transform md:-translate-y-6 relative border border-primary/20">
        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">Most Popular</div>
        <h3 class="text-2xl font-bold heading-font mb-2">Eco-Warrior</h3>
        <p class="text-gray-400 text-sm mb-6">For the dedicated environmentalist.</p>
        <p class="text-5xl font-bold heading-font mb-2">$12<span class="text-xl text-gray-400 font-normal">/mo</span></p>
        <ul class="space-y-4 mb-10 text-gray-300 mt-8 font-medium">
          <li class="flex items-center gap-3"><i class="fas fa-check text-accent"></i> Priority truck reservations</li>
          <li class="flex items-center gap-3"><i class="fas fa-check text-accent"></i> 10% off all bulk liquids</li>
          <li class="flex items-center gap-3"><i class="fas fa-check text-accent"></i> 2 free home deliveries/mo</li>
        </ul>
        <button class="w-full py-4 rounded-2xl bg-primary text-white font-bold hover:bg-secondary transition-colors shadow-lg shadow-primary/30">Go Premium</button>
      </div>
      
      <div class="p-10 rounded-[3rem] bg-bgLight dark:bg-footerDark border border-gray-100 dark:border-gray-800">
        <h3 class="text-2xl font-bold heading-font mb-2">Family</h3>
        <p class="text-gray-500 text-sm mb-6">For households committed to zero-waste.</p>
        <p class="text-5xl font-bold heading-font mb-8">$29<span class="text-xl text-gray-400 font-normal">/mo</span></p>
        <ul class="space-y-4 mb-10 text-gray-600 dark:text-gray-400 font-medium">
          <li class="flex items-center gap-3"><i class="fas fa-check text-primary"></i> Unlimited home delivery</li>
          <li class="flex items-center gap-3"><i class="fas fa-check text-primary"></i> 15% off entire catalog</li>
          <li class="flex items-center gap-3"><i class="fas fa-check text-primary"></i> Free starter jar kit</li>
        </ul>
        <button class="w-full py-4 rounded-2xl bg-gray-200 dark:bg-gray-800 font-bold hover:bg-gray-300 transition-colors">Select Family</button>
      </div>
    </div>
  </div>
</section>

<!-- EXTRA SECTION ADDED: Membership Perks -->
<section class="py-24 bg-primary/5 dark:bg-primary/10">
  <div class="container mx-auto px-6 md:px-12 text-center">
    <h2 class="text-4xl font-bold heading-font mb-16">Exclusive Member Perks</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
      <div>
        <i class="fas fa-gift text-4xl text-primary mb-4"></i>
        <h4 class="font-bold mb-2">Birthday Rewards</h4>
        <p class="text-sm text-gray-500">Free specialty items on your birthday.</p>
      </div>
      <div>
        <i class="fas fa-ticket-alt text-4xl text-primary mb-4"></i>
        <h4 class="font-bold mb-2">Event Access</h4>
        <p class="text-sm text-gray-500">VIP entry to local farm tours and eco-workshops.</p>
      </div>
      <div>
        <i class="fas fa-shipping-fast text-4xl text-primary mb-4"></i>
        <h4 class="font-bold mb-2">Priority Routing</h4>
        <p class="text-sm text-gray-500">Suggest routing logic for the trucks.</p>
      </div>
      <div>
        <i class="fas fa-star text-4xl text-primary mb-4"></i>
        <h4 class="font-bold mb-2">Early Access</h4>
        <p class="text-sm text-gray-500">Try new products before they hit the marketplace.</p>
      </div>
    </div>
  </div>
</section>
`,
sustainability: `
<section class="pt-40 pb-20 overflow-hidden">
  <div class="container mx-auto px-6 md:px-12">
    <div class="bg-primary text-white rounded-[4rem] p-12 md:p-20 relative overflow-hidden shadow-premium">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] opacity-10 mix-blend-overlay"></div>
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
      
      <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 class="text-5xl md:text-7xl font-bold heading-font mb-6 leading-tight">Live <br> Impact <br> Tracker</h1>
          <p class="text-xl opacity-90 max-w-md">Every refill counts. Watch our collective impact grow in real-time as our trucks serve communities.</p>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
            <i class="fas fa-bottle-water text-3xl mb-4 text-accent"></i>
            <p class="text-4xl font-bold heading-font mb-1">542,019</p>
            <p class="text-sm font-bold uppercase tracking-wider opacity-80">Bottles Saved</p>
          </div>
          <div class="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
            <i class="fas fa-cloud text-3xl mb-4 text-accent"></i>
            <p class="text-4xl font-bold heading-font mb-1">128.4t</p>
            <p class="text-sm font-bold uppercase tracking-wider opacity-80">CO2 Reduced</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- EXTRA SECTION ADDED: Supply Chain Transparency -->
<section class="py-24 bg-bgLight dark:bg-footerDark">
  <div class="container mx-auto px-6 md:px-12 text-center max-w-4xl">
    <h2 class="text-4xl font-bold heading-font mb-10">Our Supply Chain</h2>
    <div class="flex flex-col md:flex-row gap-8 justify-center items-center">
      <div class="p-6">
        <div class="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl mx-auto mb-4"><i class="fas fa-tractor"></i></div>
        <h4 class="font-bold">1. Local Farms</h4>
        <p class="text-sm text-gray-500">Sourced within 100 miles.</p>
      </div>
      <div class="hidden md:block w-16 h-1 bg-gray-200 dark:bg-gray-800"></div>
      <div class="p-6">
        <div class="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl mx-auto mb-4"><i class="fas fa-warehouse"></i></div>
        <h4 class="font-bold">2. Zero-Waste Hub</h4>
        <p class="text-sm text-gray-500">Bulk sorting, no plastic.</p>
      </div>
      <div class="hidden md:block w-16 h-1 bg-gray-200 dark:bg-gray-800"></div>
      <div class="p-6">
        <div class="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl mx-auto mb-4"><i class="fas fa-truck-moving"></i></div>
        <h4 class="font-bold">3. EV Trucks</h4>
        <p class="text-sm text-gray-500">Delivered directly to you.</p>
      </div>
    </div>
  </div>
</section>
`,
blog: `
<section class="pt-40 pb-20">
  <div class="container mx-auto px-6 md:px-12">
    <h1 class="text-6xl font-bold heading-font mb-4 text-center">Eco Journal</h1>
    <p class="text-xl text-gray-500 mb-20 text-center">Insights, tips, and stories from the frontlines of sustainability.</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <article class="bg-bgLight dark:bg-footerDark rounded-[2rem] overflow-hidden shadow-premium hover-lift">
        <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=400&fit=crop" class="w-full h-64 object-cover" alt="Blog">
        <div class="p-8">
          <div class="flex items-center gap-4 text-sm text-gray-500 mb-4 font-bold uppercase tracking-wider">
            <span>Guide</span> • <span>Oct 12</span>
          </div>
          <h3 class="text-2xl font-bold heading-font mb-4 hover:text-primary transition-colors cursor-pointer">A Beginner's Guide to Pantry Organization</h3>
        </div>
      </article>
      
      <article class="bg-bgLight dark:bg-footerDark rounded-[2rem] overflow-hidden shadow-premium hover-lift">
        <div class="bg-primary h-64 flex items-center justify-center text-white">
          <i class="fas fa-quote-left text-6xl opacity-20 absolute"></i>
          <p class="text-2xl font-bold heading-font relative z-10 px-8 text-center">"We don't need a handful of people doing zero waste perfectly."</p>
        </div>
        <div class="p-8">
          <div class="flex items-center gap-4 text-sm text-gray-500 mb-4 font-bold uppercase tracking-wider">
            <span>Interview</span> • <span>Oct 05</span>
          </div>
          <h3 class="text-2xl font-bold heading-font mb-4 hover:text-primary transition-colors cursor-pointer">Chat with Chef Marcus on Sustainable Cooking</h3>
        </div>
      </article>
    </div>
  </div>
</section>

<!-- EXTRA SECTION ADDED: Newsletter Inline -->
<section class="py-24 bg-white dark:bg-black/20">
  <div class="container mx-auto px-6 md:px-12">
    <div class="bg-gradient-to-br from-primary to-footerDark text-white p-12 rounded-[3rem] text-center max-w-4xl mx-auto shadow-2xl">
      <i class="fas fa-envelope-open-text text-5xl text-accent mb-6"></i>
      <h2 class="text-3xl font-bold heading-font mb-4">Never Miss an Update</h2>
      <p class="opacity-80 mb-8">Weekly tips on zero-waste living delivered straight to your inbox.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <input type="email" placeholder="Your email address" class="px-6 py-3 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 ring-accent w-full text-white">
        <button class="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-accent transition-colors">Subscribe</button>
      </div>
    </div>
  </div>
</section>
`,
contact: `
<section class="pt-40 pb-20">
  <div class="container mx-auto px-6 md:px-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div>
        <h1 class="text-6xl font-bold heading-font mb-8">Let's Connect</h1>
        <p class="text-xl text-gray-500 mb-12">Have questions about our routes, products, or just want to say hi? We'd love to hear from you.</p>
        
        <div class="space-y-8">
          <div class="flex items-center gap-6">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl text-primary"><i class="fas fa-map-marker-alt"></i></div>
            <div>
              <p class="font-bold text-lg">HQ Office</p>
              <p class="text-gray-500">123 Eco Blvd, Brooklyn, NY 11201</p>
            </div>
          </div>
          <div class="flex items-center gap-6">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl text-primary"><i class="fas fa-envelope"></i></div>
            <div>
              <p class="font-bold text-lg">Email Us</p>
              <p class="text-gray-500">hello@ecorefill.app</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-bgLight dark:bg-footerDark p-10 md:p-12 rounded-[3rem] shadow-premium">
        <form class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold mb-2">First Name</label>
              <input type="text" class="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors">
            </div>
            <div>
              <label class="block text-sm font-bold mb-2">Last Name</label>
              <input type="text" class="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors">
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Message</label>
            <textarea rows="4" class="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors"></textarea>
          </div>
          <button type="button" class="w-full btn-eco text-white py-4 rounded-2xl font-bold text-lg">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- EXTRA SECTION ADDED: Quick Help / FAQ Snippet -->
<section class="py-24 bg-white dark:bg-black/20">
  <div class="container mx-auto px-6 md:px-12 text-center">
    <h2 class="text-4xl font-bold heading-font mb-10">Quick Help</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="p-8 border border-gray-100 dark:border-gray-800 rounded-3xl hover:border-primary transition-colors cursor-pointer" onclick="navigateTo('faq')">
        <i class="fas fa-truck-loading text-3xl text-primary mb-4"></i>
        <h4 class="font-bold mb-2">How do Refills Work?</h4>
        <p class="text-sm text-gray-500">Read our comprehensive guide.</p>
      </div>
      <div class="p-8 border border-gray-100 dark:border-gray-800 rounded-3xl hover:border-primary transition-colors cursor-pointer" onclick="navigateTo('faq')">
        <i class="fas fa-box-open text-3xl text-primary mb-4"></i>
        <h4 class="font-bold mb-2">Container Policy</h4>
        <p class="text-sm text-gray-500">What jars are accepted?</p>
      </div>
      <div class="p-8 border border-gray-100 dark:border-gray-800 rounded-3xl hover:border-primary transition-colors cursor-pointer" onclick="navigateTo('contact')">
        <i class="fas fa-headset text-3xl text-primary mb-4"></i>
        <h4 class="font-bold mb-2">Live Support</h4>
        <p class="text-sm text-gray-500">Chat with an agent now.</p>
      </div>
    </div>
  </div>
</section>
`,
dashboard: `
<section class="pt-40 pb-20">
  <div class="container mx-auto px-6 md:px-12">
    <div class="flex flex-col md:flex-row gap-12">
      <!-- Sidebar -->
      <div class="w-full md:w-80 space-y-4">
        <div class="bg-bgLight dark:bg-footerDark p-8 rounded-[2rem] shadow-premium text-center">
          <div class="w-24 h-24 bg-accent/20 rounded-full mx-auto flex items-center justify-center text-3xl text-primary mb-4 font-bold">JD</div>
          <h2 class="text-2xl font-bold heading-font mb-1">John Doe</h2>
          <p class="text-accent text-sm font-bold uppercase tracking-widest mb-6">Eco-Warrior Member</p>
          <div class="flex justify-between text-left text-sm pt-6 border-t border-gray-200 dark:border-gray-800">
            <span class="text-gray-500">Member Since</span>
            <span class="font-bold">Oct 2023</span>
          </div>
        </div>
        <div class="bg-bgLight dark:bg-footerDark rounded-[2rem] shadow-premium overflow-hidden p-4">
           <a href="#" class="block px-6 py-4 rounded-xl bg-primary/10 text-primary font-bold"><i class="fas fa-chart-line w-6"></i> Impact Overview</a>
           <a href="#" class="block px-6 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 font-bold transition-colors"><i class="fas fa-history w-6"></i> Order History</a>
           <a href="#" class="block px-6 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 font-bold transition-colors"><i class="fas fa-cog w-6"></i> Settings</a>
        </div>
      </div>
      
      <!-- Content -->
      <div class="flex-1 space-y-8">
        <h1 class="text-4xl font-bold heading-font mb-8">Your Impact Wallet</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-gradient-to-br from-primary to-secondary p-8 rounded-[2rem] text-white shadow-[0_20px_50px_rgba(45,106,79,0.3)]">
            <i class="fas fa-leaf text-4xl mb-4 opacity-50"></i>
            <p class="text-5xl font-bold heading-font mb-2">240</p>
            <p class="font-medium">Total Plastic Items Saved</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- EXTRA SECTION ADDED: Badges & Achievements -->
<section class="py-16 bg-white dark:bg-black/20">
  <div class="container mx-auto px-6 md:px-12 md:pl-[360px]"> <!-- Offset for sidebar -->
    <h3 class="text-2xl font-bold heading-font mb-6">Your Eco-Badges</h3>
    <div class="flex gap-4 overflow-x-auto pb-4">
      <div class="flex-shrink-0 w-32 bg-bgLight dark:bg-footerDark p-4 rounded-2xl text-center border border-primary/30">
        <i class="fas fa-medal text-4xl text-yellow-500 mb-2"></i>
        <p class="text-xs font-bold uppercase">100+ Refills</p>
      </div>
      <div class="flex-shrink-0 w-32 bg-bgLight dark:bg-footerDark p-4 rounded-2xl text-center">
        <i class="fas fa-award text-4xl text-gray-400 mb-2"></i>
        <p class="text-xs font-bold text-gray-500 uppercase">1 Year Active</p>
      </div>
    </div>
  </div>
</section>
`,
cart: `
<section class="pt-40 pb-20">
  <div class="container mx-auto px-6 md:px-12">
    <h1 class="text-5xl font-bold heading-font mb-12">Your Cart</h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Items -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Item 1 -->
        <div class="bg-bgLight dark:bg-footerDark p-6 rounded-[2rem] flex items-center gap-6 shadow-premium">
          <div class="w-24 h-24 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-primary text-3xl"><i class="fas fa-seedling"></i></div>
          <div class="flex-1">
            <h3 class="text-xl font-bold heading-font mb-1">Organic Basmati Rice</h3>
            <p class="text-sm text-gray-500 mb-3">Container: Medium Glass Jar</p>
            <div class="flex items-center gap-4">
              <button class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"><i class="fas fa-minus text-xs"></i></button>
              <span class="font-bold">2 lbs</span>
              <button class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"><i class="fas fa-plus text-xs"></i></button>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xl font-bold text-primary mb-2">$8.40</p>
            <button class="text-red-500 text-sm hover:underline"><i class="fas fa-trash"></i> Remove</button>
          </div>
        </div>
      </div>
      
      <!-- Summary -->
      <div>
        <div class="bg-footerDark text-bgLight p-8 rounded-[2rem] shadow-premium sticky top-32">
          <h3 class="text-2xl font-bold heading-font mb-6">Order Summary</h3>
          <div class="space-y-4 mb-6 text-gray-400">
            <div class="flex justify-between"><span>Subtotal</span><span class="text-white font-bold">$8.40</span></div>
            <div class="flex justify-between"><span>Container Deposit</span><span class="text-white font-bold">$2.00</span></div>
            <div class="flex justify-between"><span>Eco-Delivery</span><span class="text-green-400 font-bold">FREE</span></div>
          </div>
          <div class="border-t border-gray-700 pt-6 mb-8 flex justify-between items-end">
            <span class="text-xl">Total</span>
            <span class="text-3xl font-bold text-accent">$10.40</span>
          </div>
          <button class="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-secondary transition-colors">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- EXTRA SECTION ADDED: Frequently Bought Together -->
<section class="py-16">
  <div class="container mx-auto px-6 md:px-12">
    <h3 class="text-2xl font-bold heading-font mb-8">Frequently Bought Together</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div class="bg-bgLight dark:bg-footerDark p-6 rounded-3xl text-center hover-lift cursor-pointer">
        <i class="fas fa-pepper-hot text-4xl text-primary mb-4"></i>
        <h4 class="font-bold">Organic Quinoa</h4>
        <p class="text-primary mt-2">$6.00/lb</p>
      </div>
      <div class="bg-bgLight dark:bg-footerDark p-6 rounded-3xl text-center hover-lift cursor-pointer">
        <i class="fas fa-seedling text-4xl text-primary mb-4"></i>
        <h4 class="font-bold">Lentils</h4>
        <p class="text-primary mt-2">$3.50/lb</p>
      </div>
    </div>
  </div>
</section>
`,
faq: `<section class="pt-40 pb-20"><div class="container mx-auto px-6"><h1 class="text-5xl font-bold heading-font mb-8">FAQ</h1><p>Find answers to common questions here.</p></div></section>`,
rewards: `<section class="pt-40 pb-20"><div class="container mx-auto px-6"><h1 class="text-5xl font-bold heading-font mb-8">Loyalty Rewards</h1><p>Earn points with every refill.</p></div></section>`,
privacy: `<section class="pt-40 pb-20"><div class="container mx-auto px-6"><h1 class="text-5xl font-bold heading-font mb-8">Privacy Policy</h1><p>We respect your data.</p></div></section>`,
terms: `<section class="pt-40 pb-20"><div class="container mx-auto px-6"><h1 class="text-5xl font-bold heading-font mb-8">Terms of Service</h1><p>Rules of the road.</p></div></section>`,
404: `<section class="pt-40 pb-20 text-center"><div class="container mx-auto px-6"><h1 class="text-9xl font-bold text-primary mb-8">404</h1><p>Page not found.</p><button onclick="navigateTo('home')" class="mt-8 btn-eco text-white px-8 py-3 rounded-full">Go Home</button></div></section>`,
comingSoon: `<section class="pt-40 pb-20 text-center"><div class="container mx-auto px-6"><h1 class="text-5xl font-bold heading-font mb-8">Coming Soon</h1><p>We're expanding to your city soon!</p></div></section>`
};

for (const [name, content] of Object.entries(pages)) {
    fs.writeFileSync(path.join(pagesDir, name + '.html'), content, 'utf8');
}
console.log('Successfully created all extra HTML files in pages/ directory.');
