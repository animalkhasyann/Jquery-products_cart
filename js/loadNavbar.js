function loadNavbar(containerId = 'navbar-container', file = 'navbar.html') {

  fetch(file)
    .then(response => response.text())
    .then(html => {
      document.getElementById(containerId).innerHTML = html;
    })
    .catch(error => console.error('Navbar load error:', error));
}



