import { birthdayConfig } from "../config.js";
import { mountLottie } from "../components/lottie.js";
import { particleMarkup, confettiMarkup } from "../components/particles.js";
import { escapeHTML } from "../components/text.js";
import { gsap } from "gsap";
import { reducedMotion } from "../components/transitions.js";

export function template() {
  const finalMessage = escapeHTML(birthdayConfig.finalMessage)
    .split("\n")
    .map((line) => `<span class="final-line">${line}</span>`)
    .join("");
  return `<section class="scene scene--final">${particleMarkup(36)}${confettiMarkup(48)}<div class="scene-gif-wall scene-gif-wall--hearts" aria-hidden="true"></div><div class="scene-center"><img class="scene-gif scene-gif--final-cake" src="/gifs/birthday-cake.gif" alt="Birthday cake" /><div class="scene-lottie scene-lottie--final" id="celebration-lottie"></div><div class="scene-lottie scene-lottie--final-balloons" id="final-balloons-lottie"></div><p class="eyebrow reveal">today, the whole universe celebrates you</p><h1 class="final-title reveal">&#x1F389; HAPPY<br /><em>BIRTHDAY,</em><br />${escapeHTML(birthdayConfig.name)}! &#x1F389;</h1><p class="final-message reveal">${finalMessage}</p><p class="signature reveal">With lots of love <span>&#x2764;&#xFE0F;</span></p><button class="primary-button primary-button--replay reveal" data-action="replay"><span>Replay the Surprise</span><span>&#x21BB;</span></button></div><img class="scene-gif scene-gif--final-confetti" src="/gifs/confetti.gif" alt="" /></section>`;
}

export function mount(scene) {
  mountLottie(scene.querySelector("#celebration-lottie"), "celebration");
  mountLottie(scene.querySelector("#final-balloons-lottie"), "balloons");
}

export function animate(scene) {
  if (reducedMotion) return;
  gsap.fromTo(
    scene.querySelector(".final-title"),
    { scale: 0.76, rotation: -3, filter: "blur(12px)" },
    {
      scale: 1,
      rotation: 0,
      filter: "blur(0px)",
      duration: 1.1,
      ease: "elastic.out(1,.72)",
      delay: 0.16,
    },
  );
  gsap.to(scene.querySelector(".scene-lottie--final"), {
    rotation: 12,
    scale: 1.12,
    duration: 1.7,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
  gsap.fromTo(
    scene.querySelectorAll(".final-line"),
    { y: 13, opacity: 0, filter: "blur(5px)" },
    {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.55,
      stagger: 0.18,
      delay: 0.36,
      ease: "power2.out",
    },
  );
  gsap.to(
    scene.querySelectorAll(
      ".scene-lottie--final-balloons, .scene-gif--final-cake",
    ),
    {
      y: -9,
      rotation: 2,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      stagger: 0.3,
      ease: "sine.inOut",
    },
  );
  gsap.fromTo(
    scene.querySelector(".scene-gif--final-confetti"),
    { opacity: 0, scale: 0.86 },
    { opacity: 0.3, scale: 1, duration: 1.2, ease: "power2.out", delay: 0.2 },
  );
  gsap.to(scene.querySelector(".scene-gif--final-confetti"), {
    opacity: 0.18,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1.4,
  });
}
