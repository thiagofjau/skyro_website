//darkmode
const $html = document.querySelector('html');
const $checkbox = document.querySelector('#switch');

// Apply light theme by default
$html.classList.remove('dark-theme');

$checkbox.addEventListener('change', function(){
    $html.classList.toggle('dark-theme');
});

//menu toggle to hamburger
//vars
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute(id);

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href*=' + id + ' ]').classList.add('active')
            })
        }
    })
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    if (navbar.classList.contains('active')) {
        menuIcon.style.opacity = '0';
        setTimeout(() => {
            menuIcon.style.opacity = '1';
        }, 100);
    } else {
        menuIcon.style.opacity = '0';
        setTimeout(() => {
            menuIcon.style.opacity = '1';
        }, 100);
    }
};
menuIcon.style.transition = 'transform 0.3s ease';
menuIcon.addEventListener('click', () => {
    menuIcon.style.transform = menuIcon.classList.contains('bx-x') ? 'rotate(180deg)' : 'rotate(0)';
});
