import { gsap } from "gsap";
import "./style.css";
import { destroySceneLotties } from "./components/lottie.js";
import {
  enterScene,
  reducedMotion,
  switchScene,
} from "./components/transitions.js";
import * as scene1 from "./scenes/scene1.js";
import * as scene2 from "./scenes/scene2.js";
import * as scene3 from "./scenes/scene3.js";
import * as scene4 from "./scenes/scene4.js";
import * as scene5 from "./scenes/scene5.js";

const scenes = [scene1, scene2, scene3, scene4, scene5];
const root = document.querySelector("#experience");
let current = 0;
let busy = false;
let wishMade = false;

function progressMarkup() {
  const number = String(current + 1).padStart(2, "0");
  return `<div class="scene-status"><div class="progress" aria-label="Scene ${number} of 05"><span>${number}</span><i></i>05</div><div class="progress-dots">${scenes.map((_, i) => `<i class="${i === current ? "is-active" : ""}"></i>`).join("")}</div></div>`;
}

function render(index) {
  current = index;
  const status = root.querySelector(".scene-status");
  if (status) status.outerHTML = progressMarkup();
  else root.insertAdjacentHTML("afterbegin", progressMarkup());

  const template = document.createElement("template");
  template.innerHTML = scenes[index].template();
  const scene = template.content.firstElementChild;
  root.append(scene);
  scenes[index].mount?.(scene);
  enterScene(scene);
  scenes[index].animate?.(scene);
  return scene;
}

function goNext() {
  if (busy || current >= scenes.length - 1) return;
  busy = true;
  const old = root.querySelector(".scene");
  const next = current + 1;
  switchScene(
    old,
    () => render(next),
    () => {
      busy = false;
    },
  );
  destroySceneLotties(old);
}

function blowCandles(button, scene) {
  if (wishMade) {
    goNext();
    return;
  }
  wishMade = true;
  button.disabled = true;
  gsap.killTweensOf(scene.querySelector(".candle-flames"));
  scene.classList.add("is-wish-made", "fireworks-active");

  const celebrate = () => {
    button.disabled = false;
    button.innerHTML = "<span>Let's Celebrate</span><span>&#x2192;</span>";
    button.dataset.action = "next";
  };
  if (reducedMotion) {
    gsap.set(scene.querySelectorAll(".candle-flames i"), {
      scale: 0,
      autoAlpha: 0,
    });
    gsap.set(scene.querySelector(".scene-gif--cake"), {
      filter: "grayscale(.35) brightness(.7)",
    });
    gsap.set(scene.querySelector(".wish-made"), { autoAlpha: 1, y: 0 });
    gsap.set(scene.querySelector(".confetti-layer"), { opacity: 1 });
    gsap.set(scene.querySelector(".scene-lottie--wish-balloons"), {
      opacity: 0.8,
    });
    celebrate();
    return;
  }

  gsap
    .timeline({ onComplete: celebrate })
    .to(scene, { filter: "brightness(.28)", duration: 0.42, ease: "power2.in" })
    .to(
      scene.querySelectorAll(".candle-flames i"),
      { scale: 0, opacity: 0, duration: 0.24, stagger: 0.07 },
      "<",
    )
    .to(
      scene.querySelector(".scene-gif--cake"),
      { filter: "grayscale(.35) brightness(.7)", duration: 0.4 },
      "<",
    )
    .to(
      scene.querySelector(".wish-title"),
      { y: -7, scale: 1.06, duration: 0.3, ease: "back.out(1.6)" },
      "<",
    )
    .to(
      scene.querySelector(".wish-made"),
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "back.out(1.8)" },
      ">-.14",
    )
    .to(
      scene.querySelector(".confetti-layer"),
      { opacity: 1, duration: 0.18 },
      "<",
    )
    .to(
      scene,
      { filter: "brightness(1)", duration: 0.65, ease: "power2.out" },
      ">-.08",
    );
  gsap.fromTo(
    scene.querySelector(".scene-gif--wish-confetti"),
    { opacity: 0, scale: 0.72 },
    { opacity: 0.76, scale: 1, duration: 1.15, ease: "back.out(1.25)" },
  );
  gsap.fromTo(
    scene.querySelector(".scene-lottie--wish-balloons"),
    { y: 70, opacity: 0, scale: 0.65 },
    { y: -22, opacity: 0.78, scale: 1, duration: 1.6, ease: "back.out(1.3)" },
  );
}

root.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  if (button.dataset.action === "next") goNext();
  if (button.dataset.action === "wish")
    blowCandles(button, root.querySelector(".scene"));
  if (button.dataset.action === "open-message")
    scenes[current].openMessage?.(root.querySelector(".scene"), button);
  if (button.dataset.action === "replay") goToStart();
});

function goToStart() {
  if (busy) return;
  busy = true;
  wishMade = false;
  const old = root.querySelector(".scene");
  switchScene(
    old,
    () => render(0),
    () => {
      busy = false;
    },
  );
  destroySceneLotties(old);
}

render(0);
