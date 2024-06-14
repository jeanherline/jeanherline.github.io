document.addEventListener('DOMContentLoaded', function() {
  // Handle navigation menu toggle
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const menuBtnIcon = menuBtn.querySelector("i");

  menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
  });

  navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Image slider for reviews section
  let current = 0;
  const images = document.querySelectorAll('.special_review__image-slider img');
  setInterval(() => {
      for (let i = 0; i < images.length; i++) {
          images[i].style.display = 'none'; // Hide all images
      }
      current = (current + 1) % images.length; // Increment the index
      images[current].style.display = 'block'; // Show the next image
  }, 3000); // Change image every 3000 milliseconds (3 seconds)

  // Scroll to top button
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("myBtn").style.display = "block";
    } else {
      document.getElementById("myBtn").style.display = "none";
    }
  }

  document.getElementById('myBtn').addEventListener('click', topFunction);

  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  }

  // ScrollReveal animations
  const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
  };

  ScrollReveal().reveal(".header__image img", {
    ...scrollRevealOption,
    origin: "right",
  });
  ScrollReveal().reveal(".header__content p", {
    ...scrollRevealOption,
    origin: "right",
  });

  ScrollReveal().reveal(".header__content h2", {
    ...scrollRevealOption,
    delay: 500,
  });

  ScrollReveal().reveal(".header__content h1", {
    ...scrollRevealOption,
    delay: 1000,
  });

  ScrollReveal().reveal(".order__card", {
    ...scrollRevealOption,
    interval: 500,
  });

  ScrollReveal().reveal(".event__content", {
    duration: 1000,
  });

  // Form submissions
  const reservationForm = document.getElementById('reservation-form');
  reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      reservationType: document.querySelector('input[name="reservationType"]:checked').value,
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
      guests: document.getElementById('guests').value
    };
    
    fetch('http://127.0.0.1:5500/reservation', { // Change URL to your server endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      alert('Reservation successfully submitted!');
      reservationForm.reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while submitting the reservation.');
    });
  });

  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('contact-name').value,
      email: document.getElementById('contact-email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    fetch('http://127.0.0.1:5500/contact', { // Change URL to your server endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      alert('Message successfully sent!');
      contactForm.reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while sending the message.');
    });
  });
});
