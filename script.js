document.addEventListener("DOMContentLoaded", () => {
  // --- Custom Cursor ---
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  if (cursor && cursorFollower) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
      cursorFollower.style.left = `${e.clientX}px`
      cursorFollower.style.top = `${e.clientY}px`
    })

    document.querySelectorAll("a, button, .social-link, .work-link, .skill-icon-item").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(0)"
        cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)"
        cursorFollower.style.opacity = "1"
      })
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)"
        cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
        cursorFollower.style.opacity = "0.5"
      })
    })
  }

  // --- Scroll Progress Bar ---
  const scrollProgress = document.querySelector(".scroll-progress")
  if (scrollProgress) {
    window.addEventListener("scroll", () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (scrollTop / scrollHeight) * 100
      scrollProgress.style.width = `${scrolled}%`
    })
  }

  // --- Navigation Scroll Effect ---
  const nav = document.querySelector(".nav")
  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled")
      } else {
        nav.classList.remove("scrolled")
      }
    })
  }

  // --- Mobile Menu Toggle ---
  const navToggle = document.querySelector(".nav-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuClose = document.querySelector(".mobile-menu-close")
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link")

  if (navToggle && mobileMenu && mobileMenuClose) {
    const toggleMenu = () => {
      navToggle.classList.toggle("active")
      mobileMenu.classList.toggle("active")
      document.body.classList.toggle("no-scroll") // Prevent scrolling when menu is open
    }

    navToggle.addEventListener("click", toggleMenu)
    mobileMenuClose.addEventListener("click", toggleMenu)
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (mobileMenu.classList.contains("active")) {
          toggleMenu() // Close menu on link click
        }
      })
    })
  }

  // --- Theme Toggle ---
  const themeToggle = document.querySelector(".theme-toggle")
  const currentTheme = localStorage.getItem("theme") || "dark"
  document.documentElement.setAttribute("data-theme", currentTheme)

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const theme = document.documentElement.getAttribute("data-theme")
      if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "light")
        localStorage.setItem("theme", "light")
      } else {
        document.documentElement.setAttribute("data-theme", "dark")
        localStorage.setItem("theme", "dark")
      }
    })
  }

  // --- Smooth Scroll for Nav Links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // --- Testimonials "Show More" Toggle ---
  const testimonialsToggle = document.getElementById("testimonials-toggle")
  const testimonialsGrid = document.getElementById("testimonials-grid")

  if (testimonialsToggle && testimonialsGrid) {
    testimonialsToggle.addEventListener("click", () => {
      testimonialsGrid.classList.toggle("testimonials-expanded")
      testimonialsToggle.classList.toggle("expanded")
      const toggleText = testimonialsToggle.querySelector(".toggle-text")
      const toggleIcon = testimonialsToggle.querySelector(".toggle-icon")

      if (testimonialsGrid.classList.contains("testimonials-expanded")) {
        toggleText.textContent = "Show Less"
        toggleIcon.style.transform = "rotate(180deg)"
      } else {
        toggleText.textContent = "Show More"
        toggleIcon.style.transform = "rotate(0deg)"
      }
    })
  }

  // --- Scroll Animations (Intersection Observer) ---
  const animateOnScrollElements = document.querySelectorAll(".animate-on-scroll")

  const observerOptions = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% of the element is visible
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated")
        observer.unobserve(entry.target) // Stop observing once animated
      }
    })
  }, observerOptions)

  animateOnScrollElements.forEach((el) => {
    observer.observe(el)
  })

  // --- Skill Progress Bar Animation ---
  const skillProgressBars = document.querySelectorAll(".skill-progress")

  const skillObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Trigger when 50% of the skill bar is visible
  }

  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progress = entry.target.dataset.progress
        entry.target.style.width = `${progress}%`
        observer.unobserve(entry.target)
      }
    })
  }, skillObserverOptions)

  skillProgressBars.forEach((bar) => {
    skillObserver.observe(bar)
  })
})
