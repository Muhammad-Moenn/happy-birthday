import { particleMarkup } from "../components/particles.js";
import { mountLottie } from "../components/lottie.js";
import { gsap } from "gsap";
import { reducedMotion } from "../components/transitions.js";

export function template() {
  return `<section class="scene scene--intro">${particleMarkup(38)}<div class="ambient ambient--pink"></div><div class="ambient ambient--blue"></div><div class="scene-center"><div class="gift-visual visual-card"><div class="gift-glow"></div><img class="scene-gif scene-gif--gift" src="/gifs/birthday-gift.gif" alt="" /><span class="gift-spark gift-spark--a">&#x2726;</span><span class="gift-spark gift-spark--b">&#x2727;</span><div class="scene-lottie scene-lottie--gift" id="gift-lottie" data-enter="false"></div></div><p class="eyebrow reveal">a little something, just for you</p><h1 class="intro-title reveal">Hey...<br /><em>I made something</em><br />special for you.</h1><button class="primary-button reveal" data-action="next"><span>Open Surprise</span><span>&#x2728;</span></button></div></section>`;
}

export function mount(scene) {
  mountLottie(scene.querySelector("#gift-lottie"), "gift");
}

export function animate(scene) {
  if (reducedMotion) return;
  gsap.to(scene.querySelector(".scene-gif--gift"), { y: -7, rotation: 2, scale: 1.06, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(scene.querySelector(".gift-glow"), { opacity: .7, scale: 1.2, duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.fromTo(scene.querySelectorAll(".gift-spark"), { scale: .5, opacity: .3, rotation: -18 }, { scale: 1.25, opacity: 1, rotation: 18, duration: .9, repeat: -1, yoyo: true, stagger: .35, ease: "sine.inOut" });
}
