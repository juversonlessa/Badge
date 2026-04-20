/**
 * PROJECTS DATA
 * Add new projects by appending objects to this array.
 * No layout or structure changes needed — the UI renders dynamically.
 */
const projects = [
  {
    name: "Training Time",
    description: "Application focused on training management and performance tracking. Helps users plan workouts, track progress, and achieve fitness goals with an intuitive interface.",
    tech: ["React", "Firebase"],
    logo: "images/projects/training-time-logo.png",
    /** Zoom past inner margins so the mark fills the tile (see .project-image-wrapper--logo-scaled) */
    logoScale: 1.42,
    live: "https://trainingtime-fcdc6.web.app/",
    github: ""
  },
  {
    name: "Aura Finance",
    description: "Personal finance app with dashboard and insights. Track expenses, visualize your money, and make informed decisions—with a clean, intuitive experience.",
    tech: ["React", "Node.js", "Firebase"],
    logo: "images/projects/aura-finance-logo.png",
    live: "https://jbills-ad5eb.web.app/",
    github: ""
  }
  // Add new projects below — same structure:
  // {
  //   name: "Project Name",
  //   description: "Problem + solution in 1-2 sentences.",
  //   tech: ["React", "Node.js"],
  //   logo: "images/projects/project-logo.png",
  //   logoScale: 1.35, // optional; >1 zooms logo to fill the tile (removes inner padding look)
  //   live: "https://...",
  //   github: "https://github.com/..." // optional
  // }
];
