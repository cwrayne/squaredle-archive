
window.addEventListener('DOMContentLoaded', () => {
  const toc = document.getElementById('toc');

  const h2s = [];
  const h3s = [];
  for (const heading of document.querySelectorAll('h2, h3')) {
    const a = document.createElement('a');
    const text = heading.textContent;
    a.name = text.replaceAll(' ', '-').replaceAll('?', '');
    a.textContent = text;
    heading.textContent = '';
    heading.appendChild(a);
    if (heading.tagName == 'H2') {
      h2s.push(heading);
      h3s.push([]);
    } else {
      h3s[h3s.length - 1].push(heading);
    }
  }

  for (let i = 0; i < h2s.length; i++) {
    // Add link to TOC.
    const li = document.createElement('li');
    const title = document.createElement('a');
    title.textContent = h2s[i].textContent;
    title.href = '#' + h2s[i].children[0].name;
    li.appendChild(title);
    const ul = document.createElement('ul');
    for (const h3 of h3s[i]) {
      // Add link to TOC.
      const innerLi = document.createElement('li');
      const innerA = document.createElement('a');
      innerA.textContent = h3.textContent;
      innerA.href = '#' + h3.children[0].name;
      innerLi.appendChild(innerA);
      ul.appendChild(innerLi);
    }
    li.appendChild(ul);
    toc.appendChild(li);
  }

  document.querySelector('main').hidden = false;

  if (location.hash) {
    const heading = document.querySelector(
      `a[name="${location.hash.slice(1)}"]`);
    if (heading)
      heading.scrollIntoView();
  }
});
