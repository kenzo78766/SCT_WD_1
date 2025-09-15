https://kenzo78766.github.io/SCT_WD_1/


# Interactive Navigation Menu

A modern, responsive navigation menu with dynamic scroll effects and interactive hover animations, developed as part of an internship project at **SkillCraft Technology**.

## 🚀 Features

- **Fixed Navigation Bar**: Stays visible at the top of the page while scrolling
- **Dynamic Scroll Effects**: Navigation background transitions from transparent to solid with shadow
- **Interactive Hover Effects**: Smooth color transitions and animations on menu items
- **Smooth Scrolling**: Seamless navigation between sections
- **Mobile Responsive**: Hamburger menu for mobile devices
- **Active Section Highlighting**: Automatically highlights current section in navigation
- **Modern Design**: Clean, professional styling with CSS custom properties
- **Performance Optimized**: Throttled scroll events and smooth CSS transitions

## 🛠️ Technologies Used

- **HTML5**: Semantic structure and accessibility
- **CSS3**: Custom properties, Flexbox, Grid, animations, and transitions
- **Vanilla JavaScript**: ES6+ classes and modern JavaScript features
- **Google Fonts**: Inter font family for modern typography

## 📁 Project Structure

```
interactive-navigation-menu/
├── index.html          # Main HTML structure
├── style.css           # CSS styles and animations
├── app.js             # JavaScript functionality
└── README.md          # Project documentation
```

## 🎯 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML, CSS, and JavaScript (for modifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/interactive-navigation-menu.git
   ```

2. **Navigate to project directory**
   ```bash
   cd interactive-navigation-menu
   ```

3. **Open in browser**
   - Open `index.html` in your preferred web browser
   - Or use a local development server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have live-server installed)
   live-server
   ```

## 🎨 Customization

### Colors
The project uses CSS custom properties for easy color customization. Modify the `:root` variables in `style.css`:

```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #1e40af;
  --color-accent: #3b82f6;
  /* ... other color variables */
}
```

### Navigation Items
To add or modify navigation items, edit the navigation menu in `index.html`:

```html
<ul class="nav-menu" id="nav-menu">
  <li class="nav-item">
    <a href="#your-section" class="nav-link" data-section="your-section">Your Item</a>
  </li>
</ul>
```

### Scroll Threshold
Adjust the scroll threshold for navigation background change in `app.js`:

```javascript
this.scrollThreshold = 100; // Change this value (in pixels)
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Key JavaScript Functions

- **NavigationController**: Main class handling all navigation functionality
- **handleScroll()**: Manages scroll-triggered effects and active section detection
- **toggleMobileMenu()**: Handles mobile hamburger menu functionality
- **smoothScrollTo()**: Provides smooth scrolling between sections
- **updateActiveSection()**: Updates active navigation item based on scroll position

## 🎪 Demo Features

The demo includes five main sections:

1. **Home**: Hero section with welcome message
2. **About**: Company/personal information
3. **Services**: Service offerings display
4. **Portfolio**: Project showcase
5. **Contact**: Contact form with validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SkillCraft Technology** - For providing the internship opportunity and project guidance
- **Google Fonts** - For the Inter font family
- **MDN Web Docs** - For comprehensive web development documentation
- **CSS-Tricks** - For modern CSS techniques and best practices

## 📞 Contact

**Intern Project at SkillCraft Technology**

- Project Type: Frontend Development Internship
- Company: SkillCraft Technology
- Technologies: HTML5, CSS3, Vanilla JavaScript

---

**Made with ❤️ during internship at SkillCraft Technology**
