'use strict';
// Static design navigation only. No API, data intake, job or module execution.
const screens = Array.from(document.querySelectorAll('.screen'));
const links = Array.from(document.querySelectorAll('[data-screen]'));
function showScreen() {
  const requested = location.hash.slice(1);
  const selected = screens.find(s => s.id === requested) || screens[0];
  screens.forEach(s => s.classList.toggle('active', s === selected));
  links.forEach(a => {
    if (a.dataset.screen === selected.id) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  document.title = selected.querySelector('h1').textContent + ' · QRW Terminal thiết kế';
}
window.addEventListener('hashchange', showScreen);
showScreen();
const theme = document.getElementById('theme');
theme.addEventListener('click', () => {
  const light = document.documentElement.classList.toggle('light');
  theme.textContent = light ? 'Giao diện tối' : 'Giao diện sáng';
});
const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').toLowerCase();
document.getElementById('search').addEventListener('input', e => {
  const term = normalize(e.target.value.trim());
  links.forEach(a => { a.hidden = !normalize(a.textContent).includes(term); });
  document.getElementById('noresults').hidden = links.some(a => !a.hidden);
});
