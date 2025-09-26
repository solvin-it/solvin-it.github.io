# Portfolio Website - Jose Fernando Gonzales

A modern, responsive portfolio website built with **Astro 4**, **Tailwind CSS**, and **React**. Showcases my journey from Technical Solutions Engineer to AI/ML Engineer.

🌐 **Live Site**: [https://solvin-it.github.io](https://solvin-it.github.io)

## ✨ Features

- **Modern Tech Stack**: Astro 4 + Tailwind CSS + TypeScript + React islands
- **Fully Responsive**: Mobile-first design with dark mode support
- **Performance Optimized**: Lighthouse scores >90 for Performance & Accessibility
- **Interactive Elements**: AI chatbot widget, smooth animations, real-time features
- **SEO Optimized**: Complete meta tags, sitemap, structured data
- **GitHub Pages Ready**: Automated deployment with GitHub Actions

## 🏗️ Architecture

### Pages & Routes
- `/` - Hero, stats, featured projects, how I work
- `/projects` - Project portfolio with case studies
- `/projects/[slug]` - Detailed project case studies
- `/experience` - Professional timeline and skills
- `/resume` - HTML resume + PDF download
- `/notes` - Blog posts and technical insights  
- `/contact` - Contact form and information

### Key Components
- **Navbar**: Sticky navigation with mobile hamburger menu
- **ChatWidget**: AI-powered CV assistant (React island)
- **ProjectCard**: Interactive project showcases with outcomes
- **StatCard**: Animated statistics with hover effects
- **ThemeToggle**: Dark/light mode with system preference

### Content Management
- Configuration-driven content in `src/content/site.ts`
- MDX support for blog posts and case studies
- Type-safe content with TypeScript interfaces

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/solvin-it/solvin-it.github.io.git
cd solvin-it.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.astro
│   ├── Footer.astro
│   ├── ProjectCard.astro
│   ├── StatCard.astro
│   ├── ChatWidget.tsx   # React component
│   └── ThemeToggle.tsx  # React component
├── content/
│   └── site.ts          # Site configuration and content
├── layouts/
│   ├── BaseLayout.astro # HTML foundation
│   ├── MainLayout.astro # Main site layout
│   └── ProjectLayout.astro # Project case studies
├── pages/               # File-based routing
│   ├── index.astro      # Home page
│   ├── projects/
│   ├── experience.astro
│   ├── resume.astro
│   ├── notes/
│   └── contact.astro
├── styles/
│   └── globals.css      # Tailwind + custom styles
public/
├── favicon.svg
├── resume.pdf           # Downloadable resume
└── og-image.jpg         # Social sharing image
```

## 🎨 Design System

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: Inter regular, optimized for readability  
- **Code**: DM Mono for technical content

### Colors
- **Primary**: Blue gradient (blue-600 to blue-700)
- **Neutral**: Warm grays for text and backgrounds
- **Dark Mode**: Sophisticated dark grays with proper contrast

### Components
- **Cards**: Subtle shadows, rounded corners, hover effects
- **Buttons**: Primary/secondary variants with micro-interactions
- **Forms**: Consistent styling with focus states
- **Navigation**: Sticky header with backdrop blur

## 🔧 Configuration

### Site Configuration
Edit `src/content/site.ts` to customize:
- Personal information and contact details
- Featured projects and achievements  
- Navigation structure
- SEO metadata and social links

### Styling
- Tailwind config in `tailwind.config.mjs`
- Global styles in `src/styles/globals.css`
- Component-scoped styles in `.astro` files

### Deployment
- Automated deployment via GitHub Actions
- Configures GitHub Pages automatically
- Builds on every push to `main` branch

## 🎯 Performance

- **Lighthouse Scores**: Performance >90, Accessibility >95
- **Core Web Vitals**: Optimized for CLS, LCP, FID
- **Bundle Size**: Minimal JS with Astro's partial hydration
- **Image Optimization**: Lazy loading and responsive images

## 🤖 AI Features

### CV Chatbot Widget
- Interactive assistant for portfolio questions
- Context-aware conversations with memory
- Mobile-responsive drawer interface
- Accessibility compliant with focus management

### Future Enhancements
- Real RAG integration with actual CV data
- Voice interface capabilities
- Advanced conversation analytics

## 📈 SEO & Analytics

- **Meta Tags**: Complete OpenGraph and Twitter cards
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Auto-generated with Astro integration
- **Analytics Ready**: Easy to add Google Analytics or similar

## 🛠️ Development

### Tech Stack Decisions
- **Astro**: Optimal for content-heavy sites with minimal JS
- **Tailwind**: Rapid styling with excellent developer experience  
- **TypeScript**: Type safety across the entire codebase
- **React Islands**: Interactive components where needed

### Code Quality
- **ESLint**: Code linting and formatting
- **TypeScript**: Strict type checking enabled
- **Git Hooks**: Pre-commit formatting and linting

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile**: iOS Safari, Android Chrome
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🚀 Deployment

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to `main` branch triggers automatic deployment
4. Site available at `https://[username].github.io`

### Custom Domain (Optional)
1. Add `CNAME` file to `public/` folder
2. Configure DNS records for your domain
3. Enable HTTPS in GitHub Pages settings

## 📝 Content Updates

### Adding Projects
1. Add project data to `src/content/site.ts`
2. Create case study page in `src/pages/projects/[slug].astro`
3. Use `ProjectLayout` for consistent formatting

### Adding Blog Posts
1. Create MDX file in `src/pages/notes/`
2. Add frontmatter with metadata
3. Content appears automatically in notes index

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request with detailed description

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Jose Fernando Gonzales**  
*Showcasing the intersection of technical solutions and AI/ML innovation*