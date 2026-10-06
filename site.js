const navToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}
document.querySelectorAll('[data-demo-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const note = form.querySelector('.form-note');
    note.textContent = 'Ejemplo listo: el formulario se conectará al sistema de captación en desarrollo.';
  });
});
document.querySelectorAll('[data-parallax]').forEach((stage) => {
  stage.addEventListener('pointermove', (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    stage.querySelectorAll('.float-card').forEach((card, index) => {
      const depth = (index + 1) * 3;
      card.style.translate = `${x * depth}px ${y * depth}px`;
    });
  });
  stage.addEventListener('pointerleave', () => {
    stage.querySelectorAll('.float-card').forEach((card) => card.style.translate = '0 0');
  });
});
const rotator = document.querySelector('[data-word-rotator]');
if (rotator) {
  const words = JSON.parse(rotator.dataset.wordRotator);
  let index = 0;
  setInterval(() => {
    index = (index + 1) % words.length;
    rotator.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-12px)' }], { duration: 220 }).finished.then(() => {
      rotator.textContent = words[index];
      rotator.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260 });
      document.querySelectorAll('[data-reel]').forEach((img) => img.classList.toggle('active', Number(img.dataset.reel) === index));
    });
  }, 1700);
}
document.querySelectorAll('[data-before-after]').forEach((widget) => {
  const range = widget.querySelector('input[type="range"]');
  const after = widget.querySelector('.after-layer');
  const handle = widget.querySelector('.compare-handle');
  const update = () => {
    const value = range.value;
    after.style.clipPath = `inset(0 0 0 ${value}%)`;
    handle.style.left = `${value}%`;
  };
  range.addEventListener('input', update);
  update();
});