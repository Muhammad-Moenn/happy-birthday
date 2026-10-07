import { birthdayConfig } from "../config.js";
import { gsap } from "gsap";
import { mountLottie } from "../components/lottie.js";
import { particleMarkup } from "../components/particles.js";
import { reducedMotion } from "../components/transitions.js";
import { escapeHTML } from "../components/text.js";

export function template() {
  const lines = escapeHTML(birthdayConfig.message.trim()).split(/(?<=[.!?])\s+/).map((line) => `<span class="message-line">${line}</span>`).join("");
  return `<section class="scene scene--message">${particleMarkup(28)}<div class="scene-gif-wall scene-gif-wall--hearts" aria-hidden="true"></div><div class="scene-center"><p class="eyebrow reveal">a few words from my heart</p><div class="letter-visual visual-card"><div class="letter-back"></div><div class="letter-front"><span>For you, with love</span><b>♥</b></div><div class="letter-flap"></div><div class="letter-seal">✦</div></div><div class="scene-lottie scene-lottie--hearts" id="hearts-lottie"></div><h1 class="message-title reveal">A little note<br /><em>for you.</em></h1><p class="personal-message" id="personal-message">${lines}</p><button class="primary-button reveal" data-action="open-message"><span>Open My Message</span><span>♥</span></button><button class="primary-button message-next" data-action="next"><span>One More Surprise</span><span>→</span></button></div></section>`;
}

export function mount(scene) {
  mountLottie(scene.querySelector("#hearts-lottie"), "celebration");
}

export function animate(scene) {
  if (reducedMotion) return;
  gsap.to(scene.querySelector(".letter-visual"), { y: -6, rotation: 1.5, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(scene.querySelector(".letter-seal"), { scale: 1.13, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
}

export function openMessage(scene, button) {
  if (button.disabled) return;
  button.disabled = true;
  const lines = scene.querySelectorAll(".message-line");
  if (reducedMotion) {
    gsap.set(scene.querySelector(".letter-seal"), { scale: 0, opacity: 0 });
    gsap.set(scene.querySelector(".letter-flap"), { rotateX: 180 });
    gsap.set(scene.querySelector(".personal-message"), { autoAlpha: 1 });
    gsap.set(lines, { y: 0, opacity: 1, filter: "none" });
    gsap.set(scene.querySelector(".message-next"), { y: 0, autoAlpha: 1 });
    button.remove();
    return;
  }
  gsap.timeline({ onComplete: () => button.remove() })
    .to(scene.querySelector(".letter-seal"), { scale: 0, rotation: 35, opacity: 0, duration: .25, ease: "back.in(2)" })
    .to(scene.querySelector(".letter-flap"), { rotateX: 180, duration: .55, ease: "power2.inOut" }, "<.08")
    .to(scene.querySelector(".letter-visual"), { y: -17, scale: 1.06, duration: .45, ease: "back.out(1.5)" }, "<.15")
    .fromTo(scene.querySelector(".personal-message"), { opacity: 0, y: 8, visibility: "hidden" }, { opacity: 1, y: 0, visibility: "visible", duration: .35 }, ">-.06")
    .fromTo(lines, { y: 14, opacity: 0, filter: "blur(5px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: .45, stagger: .46, ease: "power2.out" }, "<.1")
    .fromTo(scene.querySelector(".message-next"), { y: 12, opacity: 0, visibility: "hidden" }, { y: 0, opacity: 1, visibility: "visible", duration: .45, ease: "back.out(1.5)" }, ">-.05");
}
