const symbols = ["✦", "✧", "·", "✷"];

export function particleMarkup(count = 24) {
  return `<div class="particle-field" aria-hidden="true">${Array.from({ length: count }, (_, i) =>
    `<i class="particle" style="--i:${i};--x:${(i * 37 + 9) % 100}%;--y:${(i * 61 + 7) % 100}%;--d:${2.6 + (i % 5) * .8}s;--delay:${-(i % 7)}s">${symbols[i % symbols.length]}</i>`
  ).join("")}</div>`;
}

export function confettiMarkup(count = 54) {
  return `<div class="confetti-layer" aria-hidden="true">${Array.from({ length: count }, (_, i) =>
    `<i class="confetti-piece" style="--i:${i};--x:${(i * 41 + 3) % 100}%;--h:${(i * 57) % 360}deg;--delay:${(i % 11) * .09}s;--fall:${2.3 + (i % 9) * .19}s"></i>`
  ).join("")}</div>`;
}
