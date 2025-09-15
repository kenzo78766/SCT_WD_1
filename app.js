// Navigation functionality
class NavigationController {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.hamburger = document.getElementById('hamburger');
    this.navMenu = document.getElementById('nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('.section');
    this.scrollThreshold = 100;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateActiveSection();
  }

  setupEventListeners() {
    // Scroll event for navbar background change
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
    
    // Mobile menu toggle
    if (this.hamburger) {
      this.hamburger.addEventListener('click', this.toggleMobileMenu.bind(this));
    }
    
    // Navigation link clicks - prevent default and handle custom scrolling
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleNavClick(e);
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', this.handleOutsideClick.bind(this));

    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this));

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit(e);
      });
    }
  }

  handleScroll() {
    const scrollPosition = window.scrollY;
    
    // Toggle scrolled class on navbar
    if (scrollPosition > this.scrollThreshold) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }

    // Update active section
    this.updateActiveSection();
  }

  updateActiveSection() {
    const scrollPosition = window.scrollY + 150; // Offset for fixed navbar
    
    let activeSection = 'home'; // Default to home
    
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        activeSection = section.id;
      }
    });

    // Update active navigation link
    this.navLinks.forEach(link => {
      const sectionId = link.getAttribute('data-section');
      
      if (sectionId === activeSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  toggleMobileMenu() {
    this.hamburger.classList.toggle('active');
    this.navMenu.classList.toggle('active');
    
    // Prevent body scroll when mobile menu is open
    if (this.navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  handleNavClick(event) {
    const targetSection = event.target.getAttribute('data-section');
    const targetElement = document.getElementById(targetSection);
    
    if (targetElement) {
      // Close mobile menu if open
      this.closeMobileMenu();
      
      // Smooth scroll to section
      this.smoothScrollTo(targetElement);
      
      // Update active link immediately
      this.navLinks.forEach(link => link.classList.remove('active'));
      event.target.classList.add('active');
    }
  }

  handleOutsideClick(event) {
    const isNavbarClick = this.navbar.contains(event.target);
    
    if (!isNavbarClick && this.navMenu.classList.contains('active')) {
      this.closeMobileMenu();
    }
  }

  handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 1200 && this.navMenu.classList.contains('active')) {
      this.closeMobileMenu();
    }
  }

  closeMobileMenu() {
    if (this.hamburger) {
      this.hamburger.classList.remove('active');
    }
    this.navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  smoothScrollTo(element) {
    const navbarHeight = this.navbar.offsetHeight;
    const targetPosition = element.offsetTop - navbarHeight;
    
    // Use native smooth scroll
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Simple form validation
    if (!name || !email || !message) {
      this.showNotification('Please fill in all fields', 'error');
      return;
    }
    
    if (!this.isValidEmail(email)) {
      this.showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Simulate form submission success
    this.showNotification('Thank you! Your message has been sent successfully.', 'success');
    
    // Reset form
    document.getElementById('contact-form').reset();
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification status status--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 90px;
      right: 20px;
      z-index: 10000;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 500;
      font-size: 14px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
      max-width: 300px;
      word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 4000);
  }

  // Throttle function for better scroll performance
  throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Intersection Observer for scroll animations
class ScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('.feature-card, .service-item, .portfolio-item, .contact-item');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.createObserver();
    } else {
      // Fallback for older browsers
      this.animatedElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }
  }

  createObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });
  }
}

// Smooth reveal animation for sections
class SectionReveal {
  constructor() {
    this.sections = document.querySelectorAll('.section');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.createObserver();
    }
  }

  createObserver() {
    const options = {
      threshold: 0.15,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section--visible');
        }
      });
    }, options);

    this.sections.forEach(section => {
      observer.observe(section);
    });
  }
}

// Enhanced button hover effects
class ButtonEffects {
  constructor() {
    this.buttons = document.querySelectorAll('.btn');
    this.init();
  }

  init() {
    this.buttons.forEach(button => {
      button.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      button.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
      
      // Handle navigation buttons specifically
      if (button.getAttribute('href')) {
        button.addEventListener('click', (e) => {
          const href = button.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
              const navbar = document.getElementById('navbar');
              const navbarHeight = navbar ? navbar.offsetHeight : 70;
              const targetPosition = targetElement.offsetTop - navbarHeight;
              
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
            }
          }
        });
      }
    });
  }

  handleMouseEnter(event) {
    const button = event.target;
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
  }

  handleMouseLeave(event) {
    const button = event.target;
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '';
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation controller
  new NavigationController();
  
  // Initialize scroll animations
  new ScrollAnimations();
  
  // Initialize section reveal
  new SectionReveal();
  
  // Initialize button effects
  new ButtonEffects();
  
  // Add CSS for section reveal animation
  const style = document.createElement('style');
  style.textContent = `
    .section {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .section--visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .section:first-child {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
});

// Handle page load
window.addEventListener('load', () => {
  // Ensure first section is visible immediately
  const firstSection = document.querySelector('.section');
  if (firstSection) {
    firstSection.classList.add('section--visible');
  }
  
  // Force update active section on load
  const navController = new NavigationController();
  navController.updateActiveSection();
});