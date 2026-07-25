document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if(menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // Theme Toggle (Dark/Light)
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  };
  
  const updateThemeIcon = (theme) => {
    const iconClass = theme === 'dark' ? 'ph-sun' : 'ph-moon';
    themeToggles.forEach(toggle => {
      toggle.innerHTML = `<i class="ph ${iconClass}"></i>`;
    });
  };

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleTheme);
  });

  // Initialize Theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  // RTL/LTR Toggle
  const rtlToggles = document.querySelectorAll('.rtl-toggle');

  const toggleRTL = () => {
    const currentDir = document.documentElement.getAttribute('dir');
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('dir', newDir);
    updateRTLLabel(newDir);
  };

  const updateRTLLabel = (dir) => {
    // Show the opposite of the current direction
    const label = dir === 'rtl' ? 'LTR' : 'RTL';
    rtlToggles.forEach(toggle => {
      toggle.textContent = label;
    });
  };

  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleRTL);
  });

  // Initialize RTL
  const savedDir = localStorage.getItem('dir') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);
  updateRTLLabel(savedDir);
});
