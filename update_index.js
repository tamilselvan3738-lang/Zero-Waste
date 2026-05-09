const fs = require('fs');

let html = fs.readFileSync('Index.html', 'utf8');

// Find the start of const pages = {
const pagesStart = html.indexOf('const pages = {');
// Find the function navigateTo
const navStart = html.indexOf('function navigateTo(pageId) {');
const navEnd = html.indexOf('}', html.indexOf('updateNavScroll();', navStart)) + 2;

if (pagesStart !== -1 && navStart !== -1) {
    const newNav = `
    // --- NAVIGATION LOGIC ---
    async function navigateTo(pageId) {
      const content = document.getElementById('mainContent');
      
      if (typeof isMobileMenuOpen !== 'undefined' && isMobileMenuOpen) {
        toggleMobileMenu();
      }
      
      gsap.to(content, { opacity: 0, y: 20, duration: 0.3, onComplete: async () => {
        try {
          const response = await fetch('pages/' + pageId + '.html');
          if (!response.ok) throw new Error('Not found');
          content.innerHTML = await response.text();
        } catch (e) {
          content.innerHTML = '<section class="pt-40 pb-40 text-center"><div class="container mx-auto"><h1 class="text-4xl font-bold text-red-500">Error Loading Page</h1><p class="mt-4">Please run via a Local Web Server (like VS Code Live Server) to load separate files via fetch.</p></div></section>';
        }
        window.scrollTo(0, 0);
        gsap.to(content, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
        if (typeof updateNavScroll === 'function') updateNavScroll();
      }});
    }
    `;

    // Replace from pagesStart to the end of navigateTo function
    html = html.substring(0, pagesStart) + newNav + html.substring(navEnd);
    
    // Also, auto-init to 'home' on load
    if (!html.includes('window.addEventListener("DOMContentLoaded"')) {
        html = html.replace('</script>', `
    window.addEventListener('DOMContentLoaded', () => {
        navigateTo('home');
    });
  </script>`);
    }

    fs.writeFileSync('Index.html', html, 'utf8');
    console.log('Successfully updated Index.html for fetch API.');
} else {
    console.log('Could not find strings to replace in Index.html');
}
