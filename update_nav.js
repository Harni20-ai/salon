const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname);

function getHeader(filename) {
    const isHome = filename === 'index.html' || filename === 'home-2.html' ? 'active' : '';
    const isServices = filename === 'services.html' ? 'active' : '';
    const isGallery = filename === 'gallery.html' ? 'active' : '';
    const isAbout = filename === 'about.html' ? 'active' : '';
    const isContact = filename === 'contact.html' ? 'active' : '';

    const isTeam = filename === 'team.html' ? 'active' : '';
    const isPricing = filename === 'pricing.html' ? 'active' : '';

    return `    <header>
        <div class="nav-container">
            <a href="index.html" class="nav-logo">
                <i class="ph ph-sparkle"></i>
                Aura<span>.</span>
            </a>
            
            <nav class="nav-links">
                <div class="has-dropdown">
                    <a href="index.html" class="nav-link ${isHome}">Home <i class="ph ph-caret-down" style="font-size: 0.8em; margin-left: 4px;"></i></a>
                    <div class="dropdown">
                        <a href="index.html">Home 1</a>
                        <a href="home-2.html">Home 2</a>
                    </div>
                </div>
                <a href="about.html" class="nav-link ${isAbout}">About</a>
                <a href="services.html" class="nav-link ${isServices}">Services</a>
                <a href="team.html" class="nav-link ${isTeam}">Our Team</a>
                <a href="gallery.html" class="nav-link ${isGallery}">Gallery</a>
                <a href="pricing.html" class="nav-link ${isPricing}">Pricing</a>
                <a href="contact.html" class="nav-link ${isContact}">Contact</a>
                
                <div class="nav-actions mobile-only" style="display: none;">
                    <a href="contact.html" class="btn btn-cta">BOOK APPOINTMENT</a>
                    <button class="action-btn rtl-toggle rtl-toggle-mobile">LTR</button>
                    <button class="action-btn theme-toggle theme-toggle-mobile"><i class="ph ph-moon"></i></button>
                </div>
            </nav>
            
            <div class="nav-actions desktop-only">
                <a href="contact.html" class="btn btn-cta">BOOK APPOINTMENT</a>
                <button class="action-btn rtl-toggle">LTR</button>
                <button class="action-btn theme-toggle"><i class="ph ph-moon"></i></button>
            </div>
            
            <button class="menu-toggle action-btn">
                <i class="ph ph-list"></i>
            </button>
        </div>
    </header>`;
}

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Regex to replace <header> ... </header> block
        content = content.replace(/<header>[\s\S]*?<\/header>/, getHeader(file));
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated nav in', file);
    }
});
