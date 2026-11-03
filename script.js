"use strict";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const motionToggle = document.getElementById("motion-toggle");
const videos = Array.from(document.querySelectorAll("video"));
const demoViewer = document.getElementById("demo-viewer");
let motionPausedByUser = false;
const motionIsPaused = () => motionPausedByUser || reducedMotion.matches || document.hidden;

function updateMotion() {
  const paused = motionIsPaused();
  document.documentElement.dataset.motion = paused ? "paused" : "playing";
  motionToggle.hidden = reducedMotion.matches;
  motionToggle.setAttribute("aria-pressed", String(paused));
  motionToggle.setAttribute("aria-label", paused ? "Resume decorative motion and video autoplay" : "Pause decorative motion and video autoplay");
  motionToggle.title = paused ? "Resume motion" : "Pause motion";
  videos.forEach((video) => {
    if (paused) video.pause();
    else if (!demoViewer.open && video.dataset.inView === "true" && video.dataset.userPaused !== "true") video.play().catch(() => {});
  });
  if (paused) demoViewer.querySelector("video")?.pause();
}

motionToggle.addEventListener("click", () => {
  motionPausedByUser = !motionPausedByUser;
  updateMotion();
});
reducedMotion.addEventListener("change", updateMotion);
document.addEventListener("visibilitychange", updateMotion);
updateMotion();

const backToTop = document.querySelector(".back-to-top");
let scrollFrame = 0;
function updateReadingProgress() {
  scrollFrame = 0;
  const page = document.documentElement;
  const distance = page.scrollHeight - page.clientHeight;
  const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
  page.style.setProperty("--reading-progress", progress.toFixed(4));
  backToTop.hidden = window.scrollY < 600;
}
function scheduleReadingProgress() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateReadingProgress);
}
window.addEventListener("scroll", scheduleReadingProgress, { passive: true });
window.addEventListener("resize", scheduleReadingProgress);
window.addEventListener("load", scheduleReadingProgress);
updateReadingProgress();

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
document.querySelectorAll(".showcase-item, .demo-card, .method-image").forEach((card) => {
  let pointerFrame = 0;
  let pointerX = 0;
  let pointerY = 0;
  card.addEventListener("pointermove", (event) => {
    if (!finePointer.matches || motionIsPaused()) return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--pointer-x", `${pointerX - bounds.left}px`);
      card.style.setProperty("--pointer-y", `${pointerY - bounds.top}px`);
      card.classList.add("is-lit");
    });
  });
  card.addEventListener("pointerleave", () => {
    cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    card.classList.remove("is-lit");
  });
});

const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = [document.getElementById("top"), ...navLinks.map((link) => document.querySelector(link.getAttribute("href")))];

if ("IntersectionObserver" in window) {
  const arrivalObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      arrivalObserver.unobserve(target);
      if (motionIsPaused()) return;
      target.classList.add("is-entering");
      window.setTimeout(() => target.classList.remove("is-entering"), 700);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".section-heading, .abstract-heading, .showcase-item, .method-figure, .demo-card").forEach((element) => arrivalObserver.observe(element));

  const sectionObserver = new IntersectionObserver((entries) => {
    const current = entries.find((entry) => entry.isIntersecting);
    if (!current) return;
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${current.target.id}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target: video, isIntersecting }) => {
      video.dataset.inView = String(isIntersecting);
      if (isIntersecting && !demoViewer.open && !motionIsPaused() && video.dataset.userPaused !== "true") {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.15 });

  videos.forEach((video) => {
    video.muted = true;
    video.removeAttribute("autoplay");
    video.pause();
    video.addEventListener("pause", (event) => {
      if (event.isTrusted && document.activeElement === video) {
        video.dataset.userPaused = "true";
      }
    });
    video.addEventListener("play", () => {
      delete video.dataset.userPaused;
    });
    videoObserver.observe(video);
  });
}

if (typeof demoViewer.showModal === "function") {
  const viewerTitle = document.getElementById("viewer-title");
  const viewerDataset = document.getElementById("viewer-dataset");
  const viewerMedia = document.getElementById("viewer-media");
  const previousButton = demoViewer.querySelector(".viewer-prev");
  const nextButton = demoViewer.querySelector(".viewer-next");
  let activeScenes = [];
  let activeIndex = 0;
  let returnFocus = null;

  function sceneFromCard(card) {
    const media = card.querySelector("video, img");
    const section = card.closest("section")?.id;
    const previewName = card.querySelector("figcaption strong")?.textContent.replace("↗", "").trim();
    const dataset = { womd: "WOMD", interaction: "INTERACTION", onsite: "OnSite" }[section] || previewName;
    return {
      source: media.querySelector("source")?.src || media.currentSrc || media.src,
      video: media.tagName === "VIDEO",
      title: card.querySelector(".card-title")?.textContent || `${dataset} · Representative example`,
      dataset,
    };
  }

  function releaseViewerMedia() {
    const oldVideo = viewerMedia.querySelector("video");
    if (oldVideo) {
      oldVideo.pause();
      oldVideo.removeAttribute("src");
      oldVideo.load();
    }
    viewerMedia.replaceChildren();
  }

  function renderScene() {
    releaseViewerMedia();
    const scene = activeScenes[activeIndex];
    viewerTitle.textContent = scene.title;
    viewerDataset.textContent = scene.dataset;
    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === activeScenes.length - 1;
    const media = document.createElement(scene.video ? "video" : "img");
    if (scene.video) {
      media.controls = true;
      media.muted = true;
      media.loop = true;
      media.playsInline = true;
      media.setAttribute("aria-label", scene.title);
    } else {
      media.alt = scene.title;
    }
    media.src = scene.source;
    viewerMedia.append(media);
    if (scene.video && !motionIsPaused()) media.play().catch(() => {});
  }

  function moveScene(direction) {
    const next = activeIndex + direction;
    if (next < 0 || next >= activeScenes.length) return;
    activeIndex = next;
    renderScene();
  }

  document.querySelectorAll(".demo-card, .showcase-item").forEach((card) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "expand-demo";
    button.setAttribute("aria-label", `Expand ${sceneFromCard(card).title}`);
    button.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 3H3v4m10-4h4v4M3 13v4h4m10-4v4h-4"/></svg><span>Expand</span>';
    card.querySelector(".media-wrap, .showcase-media").append(button);
    button.addEventListener("click", () => {
      const group = Array.from(card.parentElement.children).filter((item) => item.matches(".demo-card, .showcase-item"));
      activeScenes = group.map(sceneFromCard);
      activeIndex = group.indexOf(card);
      returnFocus = button;
      videos.forEach((video) => video.pause());
      document.documentElement.classList.add("viewer-open");
      demoViewer.showModal();
      renderScene();
    });
  });

  previousButton.addEventListener("click", () => moveScene(-1));
  nextButton.addEventListener("click", () => moveScene(1));
  demoViewer.querySelector(".viewer-close").addEventListener("click", () => demoViewer.close());
  demoViewer.addEventListener("keydown", (event) => {
    if (event.target.tagName === "VIDEO" || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      moveScene(event.key === "ArrowLeft" ? -1 : 1);
    }
  });
  demoViewer.addEventListener("click", (event) => {
    if (event.target !== demoViewer) return;
    const bounds = demoViewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) demoViewer.close();
  });
  demoViewer.addEventListener("close", () => {
    releaseViewerMedia();
    document.documentElement.classList.remove("viewer-open");
    updateMotion();
    returnFocus?.focus({ preventScroll: true });
  });
}
