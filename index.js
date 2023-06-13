var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
  ];

const topMenuEl = document.getElementById('top-menu');

menuLinks.forEach(function(link) {
  var linkEl = document.createElement('a');
  linkEl.setAttribute('href', link.href);
  linkEl.textContent = link.text;
  topMenuEl.appendChild(linkEl);
});


const mainEl = document.querySelector('main');

const mainBgColor = getComputedStyle(mainEl).getPropertyValue('--main-bg');

mainEl.style.backgroundColor = mainBgColor;

mainEl.innerHTML = '<h1>DOM Manipulation</h1>';

mainEl.classList.add('flex-ctr');


const topMenuLinks = topMenuEl.querySelectorAll('a');

topMenuEl.addEventListener('click', function(event) {
  event.preventDefault();

  if (!event.target.matches('a')) return;

  const clickedLink = event.target;

  topMenuLinks.forEach(function(link) {
    link.classList.remove('active');
  });

  if (clickedLink.classList.contains('active')) {
    clickedLink.classList.remove('active');
    showingSubMenu = false;
    subMenuEl.style.top = '0';
    mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
  } else {
    topMenuLinks.forEach(function(link) {
      link.classList.remove('active');
    });

    clickedLink.classList.add('active');
    const clickedText = clickedLink.textContent;

    const clickedLinkObject = menuLinks.find(function(link) {
      return link.text === clickedText;
    });

    showingSubMenu = clickedLinkObject && clickedLinkObject.hasOwnProperty('subLinks');

    if (showingSubMenu) {
      buildSubMenu(clickedLinkObject.subLinks);
      subMenuEl.classList.add('active');
      subMenuEl.style.top = '100%';
    } else {
      subMenuEl.classList.remove('active');
      subMenuEl.style.top = '0';
    }
    if (clickedText.toLowerCase() === 'about') {
      mainEl.innerHTML = '<h1>About</h1>';
    } else {
      mainEl.innerHTML = '<h1>' + clickedText.charAt(0).toUpperCase() + clickedText.slice(1).toLowerCase() + '</h1>';
    }
  }
});

const subMenuEl = document.getElementById('sub-menu');

subMenuEl.style.height = '100%';

const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--sub-menu-bg');

subMenuEl.style.backgroundColor = backgroundColor;

subMenuEl.classList.add('flex-around');

subMenuEl.style.position = 'absolute';

subMenuEl.style.top = '0';

function buildSubMenu(subLinks) {
  subMenuEl.innerHTML = "";

  subLinks.forEach(function(link) {

    const subLinkElement = document.createElement('a'); 

    subLinkElement.setAttribute('href', link.href);

    subLinkElement.textContent = link.text;

    subMenuEl.appendChild(subLinkElement);
});

}

topMenuEl.style.height = '100%';

const topMenuBgColor = getComputedStyle(document.documentElement).getPropertyValue('--top-menu-bg');

topMenuEl.style.setProperty('background-color', topMenuBgColor);

topMenuEl.classList.add('flex-around');

subMenuEl.addEventListener('click', function(event) {
  event.preventDefault();

  if (!event.target.matches('a')) return;

  showingSubMenu = false;
  subMenuEl.style.top = '0';

  topMenuLinks.forEach(function(link) {
    link.classList.remove('active');
  });

  const clickedLink = event.target;
  clickedLink.classList.add('active');

  const clickedContent = clickedLink.textContent;
  mainEl.innerHTML = `<h1>${clickedContent.charAt(0).toUpperCase() + clickedContent.slice(1).toLowerCase()}</h1>`;
});




