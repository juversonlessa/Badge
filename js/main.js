/**
 * PORTFOLIO - MAIN SCRIPT
 * Renders projects and companies from data files.
 * Handles navigation, scroll effects, and interactions.
 */

(function () {
  'use strict';

  // ========== DOM Ready ==========
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // ========== Render Projects ==========
  function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid || typeof projects === 'undefined') return;

    grid.innerHTML = projects
      .map(function (project) {
        const imgSrc = project.logo || project.image;
        const hasImage = !!imgSrc;
        const isBrandLogo = !!project.logo;
        const hasLogoScale = isBrandLogo && typeof project.logoScale === 'number' && project.logoScale > 0;
        const imageWrapperClass =
          'project-image-wrapper' +
          (isBrandLogo ? ' project-image-wrapper--logo' : '') +
          (hasLogoScale ? ' project-image-wrapper--logo-scaled' : '');
        const logoScaleStyle = hasLogoScale
          ? ' style="--project-logo-scale:' + String(project.logoScale) + '"'
          : '';
        const imageHtml = hasImage
          ? '<img src="' + escapeHtml(imgSrc) + '" alt="' + escapeHtml(project.name) + ' logo" loading="lazy" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">'
          : '';

        const placeholderHtml =
          '<div class="project-image-placeholder" style="' + (hasImage ? 'display:none;' : '') + '">' +
          '<span>' + escapeHtml(project.name.charAt(0)) + '</span>' +
          '</div>';

        const projectUrl = project.live || project.github || '#';
        const cardLink = project.live || project.github
          ? '<a href="' + escapeHtml(projectUrl) + '" target="_blank" rel="noopener noreferrer" class="project-card-link">'
          : '<div class="project-card-link">';
        const cardLinkClose = project.live || project.github ? '</a>' : '</div>';

        const githubBtn = project.github && project.live
          ? '<a href="' + escapeHtml(project.github) + '" target="_blank" rel="noopener noreferrer">GitHub</a>'
          : '';

        const techTags = (project.tech || [])
          .map(function (t) {
            return '<span>' + escapeHtml(t) + '</span>';
          })
          .join('');

        return (
          '<article class="project-card">' +
          cardLink +
          '<div class="project-card-row">' +
          '<div class="' + imageWrapperClass + '"' + logoScaleStyle + '>' +
          imageHtml +
          placeholderHtml +
          '</div>' +
          '<div class="project-content">' +
          '<h3 class="project-name">' + escapeHtml(project.name) + '</h3>' +
          '<p class="project-description">' + escapeHtml(project.description) + '</p>' +
          (techTags ? '<div class="project-tech">' + techTags + '</div>' : '') +
          '</div>' +
          '</div>' +
          cardLinkClose +
          (githubBtn ? '<div class="project-links">' + githubBtn + '</div>' : '') +
          '</article>'
        );
      })
      .join('');
  }

  // ========== Render Companies ==========
  function renderCompanies() {
    const grid = document.getElementById('companies-grid');
    if (!grid || typeof companies === 'undefined') return;

    grid.innerHTML = companies
      .map(function (company) {
        return (
          '<a href="' +
          escapeHtml(company.link) +
          '" target="_blank" rel="noopener noreferrer" class="company-card">' +
          '<img src="' +
          escapeHtml(company.logo) +
          '" alt="' +
          escapeHtml(company.name) +
          '" loading="lazy" onerror="this.src=\'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2248%22 height=%2248%22 viewBox=%220 0 48 48%22%3E%3Crect fill=%22%23333%22 width=%2248%22 height=%2248%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%23666%22 font-size=%2220%22 text-anchor=%22middle%22 dy=%22.3em%22%3E' +
          escapeHtml(company.name.charAt(0)) +
          '%3C/text%3E%3C/svg%3E\';">' +
          '<span>' +
          escapeHtml(company.name) +
          '</span>' +
          '</a>'
        );
      })
      .join('');
  }

  // ========== Utilities ==========
  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ========== Mobile Navigation ==========
  function initMobileNav() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelector('.nav-links');
    if (!header || !navLinks) return;

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'nav-mobile';
    mobileMenu.setAttribute('role', 'navigation');
    mobileMenu.setAttribute('aria-label', 'Mobile menu');
    mobileMenu.innerHTML = navLinks.innerHTML;
    header.appendChild(mobileMenu);

    const toggle = document.querySelector('.nav-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !expanded);
        mobileMenu.classList.toggle('open', !expanded);
      });
    }

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ========== Header Scroll Effect ==========
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    window.addEventListener(
      'scroll',
      function () {
        const scroll = window.scrollY;
        if (scroll > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        lastScroll = scroll;
      },
      { passive: true }
    );
  }

  // ========== Contact Links (from contact.js) ==========
  function initContactLinks() {
    if (typeof contact === 'undefined') return;

    const links = document.querySelectorAll('[data-contact]');
    links.forEach(function (link) {
      const key = link.getAttribute('data-contact');
      const url = contact[key];
      if (!url) return;

      if (key === 'email') {
        link.href = 'mailto:' + url;
      } else if (key === 'whatsapp') {
        link.href = 'https://wa.me/' + url.replace(/\D/g, '');
      } else {
        link.href = url;
      }
    });
  }

  // ========== Footer Year ==========
  function setFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // ========== Init ==========
  ready(function () {
    renderProjects();
    renderCompanies();
    initContactLinks();
    initMobileNav();
    initHeaderScroll();
    setFooterYear();
  });
})();
