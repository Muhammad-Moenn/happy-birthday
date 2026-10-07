import { gsap } from "gsap";

export const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function enterScene(scene) {
  const items = scene.querySelectorAll(".reveal, .visual-card, .scene-lottie:not([data-enter='false']), .scene-art");
  if (reducedMotion) return gsap.set(items, { opacity: 1, clearProps: "transform,filter" });
  return gsap.fromTo(items, { y: 24, scale: .97, opacity: 0, filter: "blur(8px)" }, {
    y: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: .78, stagger: .075, ease: "power3.out", clearProps: "filter",
  });
}

export function switchScene(current, next, done) {
  if (reducedMotion) { current.remove(); next(); done?.(); return; }
  const veil = document.createElement("div");
  veil.className = "scene-transition-veil";
  current.parentElement.append(veil);
  next();
  gsap.timeline({ onComplete: () => { gsap.killTweensOf([current, ...current.querySelectorAll("*")]); current.remove(); veil.remove(); done?.(); } })
    .to(current, { opacity: 0, scale: .92, y: -18, rotationX: 4, filter: "blur(12px)", duration: .48, ease: "power3.in" })
    .fromTo(veil, { opacity: 0, scale: .7, rotation: -8 }, { opacity: .8, scale: 1.25, rotation: 0, duration: .48, ease: "power2.inOut" }, "<.08")
    .to(veil, { opacity: 0, scale: 1.45, duration: .3, ease: "power2.out" }, ">-.08");
}
