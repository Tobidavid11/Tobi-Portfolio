// Utility Functions
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// Custom Cursor
class CustomCursor {
  constructor() {
    this.cursor = $(".cursor")
    this.follower = $(".cursor-follower")
    this.init()
  }

  init() {
    if (!this.cursor || !this.follower) return

    document.addEventListener("mousemove", (e) => {
      this.cursor.style.left = e.clientX + "px"
      this.cursor.style.top = e.clientY + "px"

      setTimeout(() => {
        this.follower.style.left = e.clientX + "px"
        this.follower.style.top = e.clientY + "px"
      }, 100)
    })

    // Cursor interactions
    const interactiveElements = $$("a, button, .work-item, .skill-item, .testimonial-item")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        this.cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
        this.follower.style.transform = "translate(-50%, -50%) scale(1.5)"
      })

      el.addEventListener("mouseleave", () => {
        this.cursor.style.transform = "translate(-50%, -50%) scale(1)"
        this.follower.style.transform = "translate(-50%, -50%) scale(1)"
      })
    })
  }
}

// Scroll Progress
class ScrollProgress {
  constructor() {
    this.progressBar = $(".scroll-progress")
    this.init()
  }

  init() {
    if (!this.progressBar) return

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / scrollHeight) * 100
      this.progressBar.style.width = `${progress}%`
    })
  }
}

// Navigation
class Navigation {
  constructor() {
    this.nav = $(".nav")
    this.navToggle = $(".nav-toggle")
    this.mobileMenu = $(".mobile-menu")
    this.mobileLinks = $$(".mobile-menu-link")
    this.themeToggle = $(".theme-toggle")
    this.init()
  }

  init() {
    if (!this.nav || !this.navToggle || !this.mobileMenu) return

    // Scroll effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        this.nav.classList.add("scrolled")
      } else {
        this.nav.classList.remove("scrolled")
      }
    })

    // Mobile menu toggle
    this.navToggle.addEventListener("click", () => {
      this.toggleMobileMenu()
    })

    // Close mobile menu on link click
    this.mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu()
      })
    })

    // Close mobile menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.mobileMenu.classList.contains("active")) {
        this.closeMobileMenu()
      }
    })

    // Theme toggle
    if (this.themeToggle) {
      this.themeToggle.addEventListener("click", () => {
        this.toggleTheme()
      })

      // Initialize theme
      this.initTheme()
    }

    // Smooth scroll for anchor links
    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const target = $(link.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  toggleMobileMenu() {
    this.navToggle.classList.toggle("active")
    this.mobileMenu.classList.toggle("active")
    document.body.style.overflow = this.mobileMenu.classList.contains("active") ? "hidden" : ""
  }

  closeMobileMenu() {
    this.navToggle.classList.remove("active")
    this.mobileMenu.classList.remove("active")
    document.body.style.overflow = ""
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "light" ? "dark" : "light"

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)

    // Add transition effect
    document.body.style.transition = "all 0.3s ease"
    setTimeout(() => {
      document.body.style.transition = ""
    }, 300)
  }

  initTheme() {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const theme = savedTheme || (prefersDark ? "dark" : "light")

    document.documentElement.setAttribute("data-theme", theme)
  }
}

// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.elements = $$(".animate-on-scroll, .section-tag, .section-title, .section-description")
    this.init()
  }

  init() {
    if (!this.elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    this.elements.forEach((el) => {
      el.classList.add("animate-on-scroll")
      observer.observe(el)
    })

    // Animate skill bars
    this.animateSkillBars()
  }

  animateSkillBars() {
    const skillBars = $$(".skill-progress")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progress = entry.target.dataset.progress
            entry.target.style.width = `${progress}%`
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    skillBars.forEach((bar) => observer.observe(bar))
  }
}

// Parallax Effects
class ParallaxEffects {
  constructor() {
    this.shapes = $$(".shape")
    this.init()
  }

  init() {
    if (!this.shapes.length) return

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5

      this.shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.2
        shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`
      })
    })
  }
}

// Work Items Hover Effects
class WorkEffects {
  constructor() {
    this.workItems = $$(".work-item")
    this.init()
  }

  init() {
    if (!this.workItems.length) return

    this.workItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        this.workItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.style.opacity = "0.5"
            otherItem.style.transform = "scale(0.95)"
          }
        })
      })

      item.addEventListener("mouseleave", () => {
        this.workItems.forEach((otherItem) => {
          otherItem.style.opacity = "1"
          otherItem.style.transform = "scale(1)"
        })
      })
    })
  }
}

// Contact Form
class ContactForm {
  constructor() {
    this.form = $(".contact-form")
    this.init()
  }

  init() {
    if (!this.form) return

    this.form.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleSubmit()
    })
  }

  async handleSubmit() {
    const formData = new FormData(this.form)
    const submitBtn = this.form.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    // Show loading state
    submitBtn.innerHTML = "<span>Sending...</span>"
    submitBtn.disabled = true

    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success message
      this.showMessage("Message sent successfully! I'll get back to you soon.", "success")
      this.form.reset()
    } catch (error) {
      // Show error message
      this.showMessage("Something went wrong. Please try again.", "error")
    } finally {
      // Reset button
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }
  }

  showMessage(text, type) {
    const message = document.createElement("div")
    message.className = `form-message form-message--${type}`
    message.textContent = text
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      color: white;
      font-weight: 500;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      ${type === "success" ? "background: #10b981;" : "background: #ef4444;"}
    `

    document.body.appendChild(message)

    // Animate in
    setTimeout(() => {
      message.style.transform = "translateX(0)"
    }, 100)

    // Remove after 5 seconds
    setTimeout(() => {
      message.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(message)
      }, 300)
    }, 5000)
  }
}

// Typing Animation
class TypingAnimation {
  constructor() {
    this.element = $(".hero-title .gradient-text")
    this.texts = ["Web3 Aesthetics", "Modern Design", "Digital Innovation", "Creative Solutions"]
    this.currentIndex = 0
    this.init()
  }

  init() {
    if (!this.element) return

    setInterval(() => {
      this.typeText()
    }, 4000)
  }

  async typeText() {
    const text = this.texts[this.currentIndex]
    this.element.textContent = ""

    for (let i = 0; i < text.length; i++) {
      this.element.textContent += text[i]
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    this.currentIndex = (this.currentIndex + 1) % this.texts.length
  }
}

// Performance Optimization
class PerformanceOptimizer {
  constructor() {
    this.init()
  }

  init() {
    // Lazy load images
    this.lazyLoadImages()

    // Preload critical resources
    this.preloadResources()

    // Optimize scroll events
    this.optimizeScrollEvents()
  }

  lazyLoadImages() {
    const images = $$('img[loading="lazy"]')

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.dataset.src || img.src
            img.classList.remove("lazy")
            imageObserver.unobserve(img)
          }
        })
      })

      images.forEach((img) => imageObserver.observe(img))
    }
  }

  preloadResources() {
    // Preload critical fonts
    const fontLinks = [
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap",
    ]

    fontLinks.forEach((href) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "style"
      link.href = href
      document.head.appendChild(link)
    })
  }

  optimizeScrollEvents() {
    let ticking = false

    const optimizedScroll = () => {
      // Batch scroll-related updates
      if (!ticking) {
        requestAnimationFrame(() => {
          // Scroll updates happen here
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", optimizedScroll, { passive: true })
  }
}

// Testimonials Carousel
class TestimonialsCarousel {
  constructor() {
    this.container = $("#testimonials-grid")
    this.toggleBtn = $("#testimonials-toggle")
    this.toggleText = this.toggleBtn?.querySelector(".toggle-text")
    this.isExpanded = false
    this.init()
  }

  init() {
    if (!this.container || !this.toggleBtn) return

    this.toggleBtn.addEventListener("click", () => {
      this.toggleTestimonials()
    })
  }

  toggleTestimonials() {
    this.isExpanded = !this.isExpanded

    if (this.isExpanded) {
      this.container.classList.add("testimonials-expanded")
      this.toggleBtn.classList.add("expanded")
      this.toggleText.textContent = "Show"
    } else {
      this.container.classList.remove("testimonials-expanded")
      this.toggleBtn.classList.remove("expanded")
      this.toggleText.textContent = "Show More"
    }

    // Smooth scroll to keep the section in view
    setTimeout(() => {
      this.container.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }, 300)
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  new CustomCursor()
  new ScrollProgress()
  new Navigation()
  new ScrollAnimations()
  new ParallaxEffects()
  new WorkEffects()
  new ContactForm()
  new TypingAnimation()
  new TestimonialsCarousel()
  new PerformanceOptimizer()

  // Add loading animation
  const loader = document.createElement("div")
  loader.className = "page-loader"
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-spinner"></div>
      <p>Loading amazing things...</p>
    </div>
  `
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gray-900);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    transition: opacity 0.5s ease;
  `

  document.body.appendChild(loader)

  // Remove loader after page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.opacity = "0"
      setTimeout(() => {
        document.body.removeChild(loader)
      }, 500)
    }, 1000)
  })

  // Add some CSS for the loader
  const loaderStyles = document.createElement("style")
  loaderStyles.textContent = `
    .loader-content {
      text-align: center;
      color: white;
    }
    
    .loader-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(139, 92, 246, 0.3);
      border-top: 3px solid var(--primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .loader-content p {
      margin: 0;
      font-size: 0.875rem;
      color: var(--gray-400);
    }
  `
  document.head.appendChild(loaderStyles)

  console.log("🚀 Portfolio loaded successfully!")
})

// Add some easter eggs
document.addEventListener("keydown", (e) => {
  // Konami code easter egg
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
  window.konamiIndex = window.konamiIndex || 0

  if (e.keyCode === konamiCode[window.konamiIndex]) {
    window.konamiIndex++
    if (window.konamiIndex === konamiCode.length) {
      // Activate party mode
      document.body.style.animation = "rainbow 2s infinite"
      const style = document.createElement("style")
      style.textContent = `
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `
      document.head.appendChild(style)

      setTimeout(() => {
        document.body.style.animation = ""
        document.head.removeChild(style)
      }, 10000)

      window.konamiIndex = 0
    }
  } else {
    window.konamiIndex = 0
  }
})
