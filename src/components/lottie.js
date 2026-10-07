import lottie from "lottie-web";

const mounted = new WeakMap();
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function mountLottie(container, file, options = {}) {
  if (!container) return null;
  const animation = lottie.loadAnimation({
    container,
    renderer: "svg",
    loop: options.loop ?? true,
    autoplay: !reducedMotion,
    path: `/animations/${file}.json`,
    rendererSettings: { preserveAspectRatio: "xMidYMid meet", progressiveLoad: true },
  });
  if (reducedMotion) animation.addEventListener("DOMLoaded", () => animation.goToAndStop(0, true), { once: true });
  const list = mounted.get(container.closest(".scene")) ?? [];
  list.push(animation);
  mounted.set(container.closest(".scene"), list);
  return animation;
}

export function destroySceneLotties(scene) {
  mounted.get(scene)?.forEach((animation) => animation.destroy());
  mounted.delete(scene);
}
