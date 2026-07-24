const fs = require('fs');
const path = require('path');

const dir = 'd:\\DUMP WEB\\SALON';

// Define the generic head content to inject
const generateHeadAdditions = (title, urlPath, isLocalBusiness = false) => {
    let schema = `
    <!-- Schema.org -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Luxe Aura Salon",
      "url": "https://luxeaura.com/"
    }
    </script>`;

    if (isLocalBusiness) {
        schema += `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      "name": "Luxe Aura Salon",
      "image": "https://luxeaura.com/images/luxe_aura_logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Luxury Ave",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "postalCode": "10021",
        "addressCountry": "US"
      },
      "telephone": "+15551234567",
      "priceRange": "$$$"
    }
    </script>`;
    }

    return `
    <!-- SEO Meta Tags -->
    <meta name="keywords" content="Luxury Salon, Hair Styling, Beauty Parlour, Bridal Makeup, Skin Care, Luxe Aura">
    <meta name="author" content="Luxe Aura Salon">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://luxeaura.com/${urlPath}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://luxeaura.com/${urlPath}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="Where luxury meets unparalleled expertise. Elevating beauty standards with personalized care.">
    <meta property="og:image" content="https://luxeaura.com/images/cta_reception_background.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://luxeaura.com/${urlPath}">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="Where luxury meets unparalleled expertise. Elevating beauty standards with personalized care.">
    <meta property="twitter:image" content="https://luxeaura.com/images/cta_reception_background.png">

    ${schema}
`;
};

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        let content = fs.readFileSync(path.join(dir, file), 'utf8');

        // 1. Inject Meta and Schema
        const titleMatch = content.match(/<title>(.*?)<\/title>/);
        const title = titleMatch ? titleMatch[1] : 'Luxe Aura Salon';
        
        // Remove existing old meta if we had any basic ones to avoid duplicates (optional, we only added description before)
        
        const headAdditions = generateHeadAdditions(title, file, file === 'index.html' || file === 'contact.html');
        
        // Insert right before </head>
        if (!content.includes('og:title')) { // Check to prevent double injection
            content = content.replace('</head>', headAdditions + '\n</head>');
        }

        // 2. Add loading="lazy" to images that don't have it, and aren't in hero sections
        // Simple regex to find img tags
        content = content.replace(/<img([^>]*)>/g, (match, p1) => {
            if (!p1.includes('loading=') && !p1.includes('logo') && !p1.includes('hero')) {
                // If the class contains 'hero' or 'gh-img', we skip lazy loading (it's above the fold)
                if (p1.includes('hero') || p1.includes('h-image')) {
                    return match;
                }
                return `<img${p1} loading="lazy">`;
            }
            return match;
        });

        // 3. Add ARIA labels to social icons & hamburger
        content = content.replace(/<div class="hamburger">/g, '<button class="hamburger" aria-label="Toggle navigation menu" aria-expanded="false">');
        content = content.replace(/<\/div>\s*<\/div>\s*<\/nav>/g, '</button>\n            </div>\n        </div>\n    </nav>'); // Fix div -> button closing for hamburger
        
        content = content.replace(/<a href="#" class="social-icon"><i data-lucide="instagram"><\/i><\/a>/g, '<a href="#" class="social-icon" aria-label="Instagram"><i data-lucide="instagram"></i></a>');
        content = content.replace(/<a href="#" class="social-icon"><i data-lucide="facebook"><\/i><\/a>/g, '<a href="#" class="social-icon" aria-label="Facebook"><i data-lucide="facebook"></i></a>');
        content = content.replace(/<a href="#" class="social-icon"><i data-lucide="twitter"><\/i><\/a>/g, '<a href="#" class="social-icon" aria-label="Twitter"><i data-lucide="twitter"></i></a>');

        // Lightbox buttons ARIA
        content = content.replace(/<button class="lb-close">/g, '<button class="lb-close" aria-label="Close Lightbox">');
        content = content.replace(/<button class="lb-nav lb-prev">/g, '<button class="lb-nav lb-prev" aria-label="Previous Image">');
        content = content.replace(/<button class="lb-nav lb-next">/g, '<button class="lb-nav lb-next" aria-label="Next Image">');

        fs.writeFileSync(path.join(dir, file), content);
        console.log(`Processed ${file}`);
    }
});
