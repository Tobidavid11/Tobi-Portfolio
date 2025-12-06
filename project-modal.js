const projectsData = {
  mizora: {
    id: "mizora",
    title: "Mizora AI – Intelligent Study Companion Website",
    category: "Website Design",
    description:
      "A modern, intuitive website designed to introduce Mizora AI — an adaptive study companion that understands learning speed, mood, and knowledge gaps. The interface highlights its personalized learning engine, real-time guidance, and student-centric features, communicating intelligence, warmth, and trust.",
    challenge:
      "The challenge was to create a modern interface that clearly communicates Mizora's intelligence and empathetic learning capabilities while maintaining clarity and simplicity. We focused on building trust through intuitive design patterns and progressive disclosure of features.",
    image: "/assets/Mizora Website Design.svg",
    tech: ["Figma", "Photoroom", "Inkscape"],
    type: "UI/UX Design",
    year: "2025",
    client: "Mizora AI",
    link: "#",
  },
  playmax: {
    id: "playmax",
    title: "ZianVogue Brand Identity",
    category: "Brand Identity",
    description:
      "A refined brand identity crafted for ZianVogue, a contemporary fashion house blending African originality with global sophistication. The identity reflects the brand's evolution from Khaff Couture into a modern fashion label defined by essence, artistry, and intentional style. The visual system embodies elegance, confidence, and individuality — capturing fashion not just as clothing, but as expression, aura, and power.",
    challenge:
      "Creating a cohesive brand identity that honors African heritage while appealing to a global audience. The challenge was balancing luxury aesthetics with accessibility, ensuring every design element communicated sophistication and individuality.",
    image: "/assets/ZianVogue Brand Identity.svg",
    tech: ["Figma", "Photoroom"],
    type: "Brand Design",
    year: "2025",
    client: "ZianVogue",
    link: "#",
  },
  squareup: {
    id: "squareup",
    title: "Mizora AI – Adaptive Learning Brand Identity",
    category: "Brand Identity",
    description:
      "A full brand identity system built to express Mizora's personality as a friendly, intelligent, and emotionally aware learning companion. The identity conveys clarity and mentorship, blending tech sophistication with human warmth. From the logo to the visual language, the brand reflects adaptability, guidance, and a supportive study experience.",
    challenge:
      "Designing a brand identity that bridges technology and human emotion. The challenge was creating visual systems that feel both cutting-edge and approachable, ensuring the brand resonates with students while maintaining professional credibility.",
    image: "/assets/Mizora brand identity.svg",
    tech: ["Figma", "Inkscape", "Photoshop"],
    type: "Brand Design",
    year: "2025",
    client: "Mizora AI",
    link: "#",
  },
  creamella: {
    id: "creamella",
    title: "Verse AI – Dual-Intelligence Website Design",
    category: "Website Design",
    description:
      "A sleek and futuristic website design showcasing Verse AI — a dual-intelligence system built for both everyday users and cybersecurity professionals. The interface highlights its two core modes: a creative assistant for writing, learning, and ideation, and a high-performance cybersecurity AI built for ethical hacking, system diagnostics, and real-time digital defence. The design communicates power, clarity, and technological depth while ensuring users easily understand both sides of Verse AI's intelligence.",
    challenge:
      "The main challenge was designing an interface that communicates two distinct capabilities without overwhelming users. We created separate visual languages for each mode while maintaining cohesive branding and intuitive navigation between them.",
    image: "/assets/Verse AI Website Design.svg",
    tech: ["Figma"],
    type: "Website Design",
    year: "2024",
    client: "Verse AI",
    link: "#",
  },
  estatein: {
    id: "estatein",
    title: "Fetchit – All in One Web App Design",
    category: "Web App Design",
    description:
      "A complete web app design for Fetchit, a lifestyle platform built to simplify daily living for the people of Owerri. The project includes a dynamic landing page and a full app interface that brings grocery shopping, home services, and real-time tracking into one seamless ecosystem. The design focuses on clarity, speed, and trust — capturing Fetchit's mission to offer fast deliveries, reliable service providers, transparent pricing, and community-driven convenience.",
    challenge:
      "Designing a multifunctional platform that simplifies complexity. The challenge was creating intuitive flows for multiple service categories while maintaining fast loading times and ensuring accessibility for diverse user groups with varying tech literacy.",
    image: "/assets/Fetchit Website Design.svg",
    tech: ["Web App Design", "Figma"],
    type: "Full-Stack Design",
    year: "2024",
    client: "Fetchit",
    link: "#",
  },
}

class ProjectModal {
  constructor() {
    this.modal = document.getElementById("project-modal")
    this.overlay = document.querySelector(".project-modal-overlay")
    this.closeBtn = document.querySelector(".project-modal-close")
    this.scrollContainer = document.querySelector(".modal-scroll-container")

    this.setupEventListeners()
  }

  setupEventListeners() {
    // Close modal on overlay click
    if (this.overlay) {
      this.overlay.addEventListener("click", () => this.closeModal())
    }

    // Close modal on close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closeModal())
    }

    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal && this.modal.classList.contains("active")) {
        this.closeModal()
      }
    })

    // Add view button listeners to all project items
    document.querySelectorAll(".work-item").forEach((item) => {
      const viewBtn = item.querySelector(".work-view-btn")
      if (viewBtn) {
        viewBtn.addEventListener("click", (e) => {
          e.preventDefault()
          const projectId = item.dataset.projectId
          this.openModal(projectId)
        })
      }
    })
  }

  openModal(projectId) {
    const project = projectsData[projectId]
    if (!project) {
      console.warn(`Project with ID "${projectId}" not found`)
      return
    }

    // Populate modal content
    const modalTitle = document.getElementById("modal-title")
    const modalCategory = document.getElementById("modal-category")
    const modalHeroImage = document.getElementById("modal-hero-image")
    const modalDescription = document.getElementById("modal-description")
    const modalChallenge = document.getElementById("modal-challenge")
    const modalType = document.getElementById("modal-type")
    const modalYear = document.getElementById("modal-year")
    const modalClient = document.getElementById("modal-client")
    const modalLink = document.getElementById("modal-link")
    const techContainer = document.getElementById("modal-tech")

    if (modalTitle) modalTitle.textContent = project.title
    if (modalCategory) modalCategory.textContent = project.category
    if (modalHeroImage) {
      modalHeroImage.src = project.image
      modalHeroImage.alt = project.title
    }
    if (modalDescription) modalDescription.textContent = project.description
    if (modalChallenge) modalChallenge.textContent = project.challenge
    if (modalType) modalType.textContent = project.type
    if (modalYear) modalYear.textContent = project.year
    if (modalClient) modalClient.textContent = project.client

    if (modalLink) {
      modalLink.href = project.link
    }

    // Populate tech tags
    if (techContainer) {
      techContainer.innerHTML = project.tech.map((tech) => `<span class="tech-tag-modal">${tech}</span>`).join("")
    }

    // Open modal with animation
    if (this.modal) {
      this.modal.classList.add("active")
      document.body.style.overflow = "hidden"
    }

    // Reset scroll to top
    if (this.scrollContainer) {
      this.scrollContainer.scrollTop = 0
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.remove("active")
    }
    document.body.style.overflow = "auto"
  }
}

// Initialize modal when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ProjectModal()
})