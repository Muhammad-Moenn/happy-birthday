import { birthdayConfig } from "../config.js";
import { mountLottie } from "../components/lottie.js";
import { particleMarkup, confettiMarkup } from "../components/particles.js";
import { escapeHTML } from "../components/text.js";
import { gsap } from "gsap";
import { reducedMotion } from "../components/transitions.js";

export function template() {
  return `<section class="scene scene--reveal">${particleMarkup(28)}${confettiMarkup(38)}<div class="scene-gif-wall scene-gif-wall--confetti" aria-hidden="true"></div><div class="scene-center"><div class="scene-lottie" id="birthday-lottie"></div><img class="scene-gif scene-gif--cake" src="/gifs/birthday-cake.gif" alt="" /><div class="scene-lottie scene-lottie--balloons" id="balloons-lottie"></div><p class="eyebrow reveal">the stars had this one circled</p><p class="scene-kicker reveal">Today is a special day...</p><h1 class="birthday-title reveal"><span class="birthday-line">HAPPY</span><span class="birthday-line birthday-line--accent">BIRTHDAY,</span><span class="birthday-line">${escapeHTML(birthdayConfig.name)}!</span></h1><button class="primary-button reveal" data-action="next"><span>Continue</span><span>&#x2192;</span></button></div><div class="balloon balloon--one"></div><div class="balloon balloon--two"></div><div class="balloon balloon--three"></div></section>`;
}

export function mount(scene) {
  mountLottie(scene.querySelector("#birthday-lottie"), "birthday");
  mountLottie(scene.querySelector("#balloons-lottie"), "balloons");
}

export function animate(scene) {
  if (reducedMotion) return;
  gsap.fromTo(scene.querySelectorAll(".birthday-line"), { y: 30, opacity: 0, rotationX: -28, transformOrigin: "center bottom" }, { y: 0, opacity: 1, rotationX: 0, duration: .8, stagger: .14, ease: "back.out(1.65)" });
  gsap.to(scene.querySelector(".scene-kicker"), { y: -5, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(scene.querySelector(".scene-gif--cake"), { y: -6, rotation: 1.5, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
  scene.querySelectorAll(".balloon").forEach((balloon, index) => gsap.to(balloon, { x: index % 2 ? 12 : -12, y: index % 2 ? -10 : 9, rotation: index % 2 ? 7 : -7, duration: 2.4 + index * .35, repeat: -1, yoyo: true, ease: "sine.inOut" }));
}
