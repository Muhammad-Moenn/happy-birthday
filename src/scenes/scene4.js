import { gsap } from "gsap";
import { mountLottie } from "../components/lottie.js";
import { particleMarkup, confettiMarkup } from "../components/particles.js";
import { reducedMotion } from "../components/transitions.js";

export function template() {
  return `<section class="scene scene--wish">${particleMarkup(24)}${confettiMarkup(72)}<div class="scene-gif-wall scene-gif-wall--hearts" aria-hidden="true"></div><div class="scene-center"><p class="eyebrow reveal">close your eyes for a moment</p><div class="wish-cake-art"><div class="scene-lottie" id="cake-lottie" data-enter="false"></div><img class="scene-gif scene-gif--cake" src="/gifs/birthday-cake.gif" alt="Birthday cake with candles" /><div class="candle-flames" aria-hidden="true"><i></i><i></i><i></i></div></div><h1 class="wish-title reveal">Make a wish <em>&#x2728;</em></h1><p class="wish-made">Wish made? &#x2728;</p><button class="primary-button reveal" data-action="wish"><span>Blow the Candles</span><span>&#x2728;</span></button></div><div class="fireworks" aria-hidden="true"></div><img class="scene-gif scene-gif--wish-confetti" src="/gifs/confetti.gif" alt="" /><div class="scene-lottie scene-lottie--fireworks" id="fireworks-lottie" data-enter="false"></div><div class="scene-lottie scene-lottie--wish-balloons" id="wish-balloons-lottie" data-enter="false"></div></section>`;
}

export function mount(scene) {
  mountLottie(scene.querySelector("#cake-lottie"), "cake");
  mountLottie(scene.querySelector("#fireworks-lottie"), "celebration");
  mountLottie(scene.querySelector("#wish-balloons-lottie"), "balloons");
}

export function animate(scene) {
  if (reducedMotion) return;
  gsap.to(scene.querySelector(".scene-gif--cake"), { y: -7, rotation: 1, duration: 2.3, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(scene.querySelector(".candle-flames"), { y: -2, scale: 1.08, duration: .6, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(scene.querySelector(".wish-title em"), { rotation: 18, scale: 1.15, duration: 1.3, repeat: -1, yoyo: true, ease: "sine.inOut" });
}
