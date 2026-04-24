/**
 * EVNT — Premium Event Management
 * script.js — Complete JavaScript Logic
 * =============================================
 */

/* =============================================
   SAMPLE EVENT DATA
   ============================================= */
const EVENTS_DATA = [
  {
    id: 1,
    title: "TechSphere Summit 2025",
    category: "Tech",
    date: "2025-08-15",
    time: "09:00 AM",
    location: "San Francisco, CA",
    venue: "Moscone Center",
    price: 299,
    spots: 1200,
    spotsLeft: 87,
    description: "The premier technology conference bringing together the world's leading innovators, engineers, and startup founders. Three days of keynotes, workshops, and networking across AI, Web3, and deep tech.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    organizer: "TechSphere Inc.",
    tags: ["AI", "Blockchain", "Cloud", "Networking"]
  },
  {
    id: 2,
    title: "Neon Beats Music Festival",
    category: "Music",
    date: "2025-09-06",
    time: "06:00 PM",
    location: "Miami, FL",
    venue: "Bayside Amphitheater",
    price: 149,
    spots: 5000,
    spotsLeft: 340,
    description: "An electric weekend of electronic music, live performances, and immersive art installations under the Miami sky. Featuring world-class DJs and emerging indie artists across 4 stages.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    organizer: "Neon Events LLC",
    tags: ["EDM", "Live Music", "Art", "Outdoor"]
  },
  {
    id: 3,
    title: "Modern Art Gala — Futures",
    category: "Art",
    date: "2025-07-28",
    time: "07:00 PM",
    location: "New York, NY",
    venue: "MoMA — The Garden",
    price: 220,
    spots: 400,
    spotsLeft: 22,
    description: "An exclusive evening showcasing the most provocative contemporary artists redefining the boundaries of expression. Black-tie event with live performances, auction, and curated after-party.",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80",
    organizer: "Arthaus Collective",
    tags: ["Contemporary Art", "Black Tie", "Auction", "Gallery"]
  },
  {
    id: 4,
    title: "Global Food & Culture Fair",
    category: "Food",
    date: "2025-10-12",
    time: "11:00 AM",
    location: "Chicago, IL",
    venue: "Millennium Park",
    price: 45,
    spots: 8000,
    spotsLeft: 2100,
    description: "A celebration of world cuisines featuring 200+ vendors from 50 countries. Cooking demos by Michelin-starred chefs, wine tastings, fermentation workshops, and live cultural performances.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    organizer: "Flavors of the World",
    tags: ["Food", "Culture", "Wine", "Family"]
  },
  {
    id: 5,
    title: "APEX Marathon & Run Expo",
    category: "Sports",
    date: "2025-11-02",
    time: "05:30 AM",
    location: "Boston, MA",
    venue: "Boston Common Start",
    price: 85,
    spots: 3000,
    spotsLeft: 456,
    description: "Join thousands of runners for a scenic 26.2-mile journey through Boston's iconic streets. Includes expo, professional timing, medals, and finish-line celebration with live music and food trucks.",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
    organizer: "APEX Athletics",
    tags: ["Marathon", "Running", "Fitness", "Community"]
  },
  {
    id: 6,
    title: "Haute Couture Fashion Week",
    category: "Fashion",
    date: "2025-08-30",
    time: "04:00 PM",
    location: "Los Angeles, CA",
    venue: "The Hollywood Palladium",
    price: 350,
    spots: 600,
    spotsLeft: 60,
    description: "LA's most anticipated fashion event showcasing avant-garde collections from established designers and rising stars. Runway shows, pop-up boutiques, and an exclusive afterparty for attendees.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    organizer: "Vogue West Studios",
    tags: ["Fashion", "Runway", "Luxury", "Networking"]
  },
  {
    id: 7,
    title: "Founders & Funders Forum",
    category: "Business",
    date: "2025-09-20",
    time: "08:00 AM",
    location: "Austin, TX",
    venue: "Austin Convention Center",
    price: 499,
    spots: 900,
    spotsLeft: 130,
    description: "Connecting the most ambitious startup founders with leading venture capitalists and angel investors. Pitch competitions, panel discussions, and 1:1 networking sessions over two intensive days.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    organizer: "Venture Tribe",
    tags: ["Startups", "VC", "Investment", "Entrepreneurship"]
  },
  {
    id: 8,
    title: "Jazz in the Park — Autumn Edition",
    category: "Music",
    date: "2025-10-05",
    time: "03:00 PM",
    location: "New Orleans, LA",
    venue: "City Park Great Meadow",
    price: 35,
    spots: 2500,
    spotsLeft: 980,
    description: "New Orleans' beloved outdoor jazz series returns for its autumn edition. Bring a blanket, enjoy artisanal food & drink vendors, and experience world-class jazz performers in a serene park setting.",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
    organizer: "NOLA Cultural Arts",
    tags: ["Jazz", "Outdoor", "Family", "Live Music"]
  }
];

/* =============================================
   STATE
   ============================================= */
let allEvents = [...EVENTS_DATA];
let filteredEvents = [...EVENTS_DATA];
let bookings = JSON.parse(localStorage.getItem('evnt_bookings') || '[]');
let currentTheme = localStorage.getItem('evnt_theme') || 'dark';

/* =============================================
   LOADER
   ============================================= */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initApp();
  }, 1600);
});

function initApp() {
  applyTheme(currentTheme);
  setupNavbar();
  populateFilters();
  renderEvents(filteredEvents);
  renderBookings();
  setupSearch();
  setupModal();
  updateNavActive();
}

/* =============================================
   THEME TOGGLE
   ============================================= */
function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('evnt_theme', theme);
  const icon = document.querySelector('.theme-icon');
  icon.textContent = theme === 'dark' ? '☾' : '☀';
}

document.getElementById('themeToggle').addEventListener('click', () => {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

/* =============================================
   NAVBAR
   ============================================= */
function setupNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Sticky + scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateNavActive();
  });

  // Hamburger
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on nav link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

function updateNavActive() {
  const sections = document.querySelectorAll('section, footer');
  const links = document.querySelectorAll('.nav-link');
  let currentSection = '';

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      currentSection = section.id;
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* =============================================
   FILTER POPULATION
   ============================================= */
function populateFilters() {
  const locations = [...new Set(EVENTS_DATA.map(e => e.location))].sort();
  const categories = [...new Set(EVENTS_DATA.map(e => e.category))].sort();

  const locationSelect = document.getElementById('locationFilter');
  const categorySelect = document.getElementById('categoryFilter');

  locations.forEach(loc => {
    const opt = document.createElement('option');
    opt.value = loc;
    opt.textContent = loc;
    locationSelect.appendChild(opt);
  });

  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });

  // Filter listeners
  [locationSelect, document.getElementById('dateFilter'), categorySelect].forEach(el => {
    el.addEventListener('change', applyFilters);
  });

  document.getElementById('resetFilters').addEventListener('click', resetAllFilters);
}

/* =============================================
   SEARCH
   ============================================= */
function setupSearch() {
  const input = document.getElementById('searchInput');
  const clear = document.getElementById('searchClear');

  input.addEventListener('input', () => {
    clear.style.display = input.value ? 'block' : 'none';
    applyFilters();
  });

  clear.addEventListener('click', () => {
    input.value = '';
    clear.style.display = 'none';
    applyFilters();
  });
}

/* =============================================
   FILTER LOGIC
   ============================================= */
function applyFilters() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const location = document.getElementById('locationFilter').value;
  const dateFilter = document.getElementById('dateFilter').value;
  const category = document.getElementById('categoryFilter').value;
  const now = new Date();

  filteredEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date);
    const eventMonth = eventDate.getMonth();
    const eventYear = eventDate.getFullYear();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();

    // Search
    const matchSearch = !query ||
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query) ||
      event.category.toLowerCase().includes(query) ||
      event.tags.some(t => t.toLowerCase().includes(query));

    // Location
    const matchLocation = !location || event.location === location;

    // Category
    const matchCategory = !category || event.category === category;

    // Date
    let matchDate = true;
    if (dateFilter === 'this-month') {
      matchDate = eventMonth === nowMonth && eventYear === nowYear;
    } else if (dateFilter === 'next-month') {
      const nextMonth = (nowMonth + 1) % 12;
      const nextYear = nowMonth === 11 ? nowYear + 1 : nowYear;
      matchDate = eventMonth === nextMonth && eventYear === nextYear;
    } else if (dateFilter === 'future') {
      matchDate = eventDate > now;
    }

    return matchSearch && matchLocation && matchCategory && matchDate;
  });

  renderEvents(filteredEvents);
}

function resetAllFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('searchClear').style.display = 'none';
  document.getElementById('locationFilter').value = '';
  document.getElementById('dateFilter').value = '';
  document.getElementById('categoryFilter').value = '';
  filteredEvents = [...allEvents];
  renderEvents(filteredEvents);
}

/* =============================================
   RENDER EVENTS
   ============================================= */
function renderEvents(events) {
  const grid = document.getElementById('eventsGrid');
  const empty = document.getElementById('emptyState');

  grid.innerHTML = '';

  if (events.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  events.forEach((event, index) => {
    const isBooked = bookings.some(b => b.eventId === event.id);
    const card = document.createElement('div');
    card.className = 'event-card';
    card.style.animationDelay = `${index * 0.07}s`;
    card.innerHTML = buildEventCard(event, isBooked);

    // Card click → open modal
    card.querySelector('.card-image-wrap').addEventListener('click', () => openModal(event));
    card.querySelector('.card-title').addEventListener('click', () => openModal(event));

    // Book button
    card.querySelector('.card-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      if (!isBooked) {
        bookEvent(event);
        renderEvents(filteredEvents);
        renderBookings();
      }
    });

    // Wishlist
    card.querySelector('.card-wishlist').addEventListener('click', (e) => {
      e.stopPropagation();
      const btn = e.currentTarget;
      btn.classList.toggle('active');
      btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
      showToast(btn.classList.contains('active') ? '❤️ Added to wishlist' : '💔 Removed from wishlist', 'info');
    });

    grid.appendChild(card);
  });
}

function buildEventCard(event, isBooked) {
  const date = formatDate(event.date);
  const urgency = event.spotsLeft < 50 ? `<strong style="color:var(--accent-3)">${event.spotsLeft}</strong>` : `<strong>${event.spotsLeft}</strong>`;

  return `
    <div class="card-image-wrap" style="cursor:pointer">
      <img class="card-image" src="${event.image}" alt="${event.title}" loading="lazy" />
      <span class="card-category category-${event.category.toLowerCase()}">${event.category}</span>
      <button class="card-wishlist" aria-label="Wishlist">♡</button>
      <span class="card-price-badge">${event.price === 0 ? 'Free' : '$' + event.price}</span>
    </div>
    <div class="card-body">
      <div class="card-meta">
        <span class="card-meta-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          ${date}
        </span>
        <span class="card-meta-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${event.location}
        </span>
      </div>
      <h3 class="card-title">${event.title}</h3>
      <p class="card-desc">${event.description}</p>
      <div class="card-footer">
        <span class="card-spots">${urgency} spots left</span>
        <button class="card-btn ${isBooked ? 'booked' : ''}">${isBooked ? '✓ Booked' : 'Book Now'}</button>
      </div>
    </div>
  `;
}

/* =============================================
   MODAL
   ============================================= */
function setupModal() {
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(event) {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  const isBooked = bookings.some(b => b.eventId === event.id);

  content.innerHTML = buildModalContent(event, isBooked);

  // Book from modal
  content.querySelector('.modal-book-btn')?.addEventListener('click', () => {
    if (!isBooked) {
      bookEvent(event);
      closeModal();
      renderEvents(filteredEvents);
      renderBookings();
      setTimeout(() => scrollToSection('bookings'), 300);
    }
  });

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function buildModalContent(event, isBooked) {
  const date = formatDate(event.date);
  const tags = event.tags.map(t => `<span style="padding:3px 10px;background:var(--bg-glass);border:1px solid var(--border);border-radius:99px;font-size:0.75rem;color:var(--text-secondary)">${t}</span>`).join('');

  return `
    <img class="modal-img" src="${event.image}" alt="${event.title}" />
    <div class="modal-body">
      <span class="modal-category category-${event.category.toLowerCase()}">${event.category}</span>
      <h2 class="modal-title">${event.title}</h2>
      <div class="modal-info-grid">
        <div class="modal-info-item">
          <span class="modal-info-icon">📅</span>
          <div>
            <div class="modal-info-label">Date & Time</div>
            <div class="modal-info-value">${date} · ${event.time}</div>
          </div>
        </div>
        <div class="modal-info-item">
          <span class="modal-info-icon">📍</span>
          <div>
            <div class="modal-info-label">Location</div>
            <div class="modal-info-value">${event.venue}, ${event.location}</div>
          </div>
        </div>
        <div class="modal-info-item">
          <span class="modal-info-icon">👤</span>
          <div>
            <div class="modal-info-label">Organizer</div>
            <div class="modal-info-value">${event.organizer}</div>
          </div>
        </div>
        <div class="modal-info-item">
          <span class="modal-info-icon">🎟️</span>
          <div>
            <div class="modal-info-label">Spots Left</div>
            <div class="modal-info-value" style="color:${event.spotsLeft < 50 ? 'var(--accent-3)' : 'inherit'}">${event.spotsLeft} of ${event.spots}</div>
          </div>
        </div>
      </div>
      <p class="modal-desc">${event.description}</p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:24px">${tags}</div>
      <div class="modal-footer">
        <div>
          <div class="modal-price-label">Ticket Price</div>
          <div class="modal-price">${event.price === 0 ? 'Free' : '$' + event.price}</div>
        </div>
        <button class="btn-primary modal-book-btn ${isBooked ? 'booked' : ''}" ${isBooked ? 'disabled style="opacity:0.7;cursor:default"' : ''}>
          ${isBooked ? '✓ Already Booked' : '🎟️ Book This Event'}
        </button>
      </div>
    </div>
  `;
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

/* =============================================
   BOOKING SYSTEM
   ============================================= */
function bookEvent(event) {
  if (bookings.some(b => b.eventId === event.id)) {
    showToast('⚠️ You have already booked this event', 'error');
    return;
  }

  const booking = {
    id: 'EVT-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    eventId: event.id,
    eventTitle: event.title,
    eventDate: event.date,
    eventTime: event.time,
    eventLocation: event.location,
    eventImage: event.image,
    category: event.category,
    price: event.price,
    bookedAt: new Date().toISOString(),
  };

  bookings.push(booking);
  localStorage.setItem('evnt_bookings', JSON.stringify(bookings));

  showToast(`🎉 Booked: ${event.title}!`, 'success');
  renderBookings();
}

/* =============================================
   RENDER BOOKINGS
   ============================================= */
function renderBookings() {
  const grid = document.getElementById('bookingsGrid');
  const empty = document.getElementById('bookingsEmpty');

  grid.innerHTML = '';

  if (bookings.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  bookings.forEach((booking, index) => {
    const card = document.createElement('div');
    card.className = 'booking-card';
    card.style.animationDelay = `${index * 0.08}s`;
    card.innerHTML = buildBookingCard(booking);

    card.querySelector('.btn-cancel').addEventListener('click', () => {
      cancelBooking(booking.id);
    });

    grid.appendChild(card);
  });
}

function buildBookingCard(booking) {
  const date = formatDate(booking.eventDate);
  const qrData = encodeURIComponent(`EVNT|${booking.id}|${booking.eventTitle}|${booking.eventDate}`);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${qrData}&bgcolor=ffffff&color=080810`;

  return `
    <div class="booking-card-header">
      <img class="booking-card-img" src="${booking.eventImage}" alt="${booking.eventTitle}" loading="lazy" />
      <div class="booking-card-overlay">
        <div class="booking-card-title">${booking.eventTitle}</div>
      </div>
    </div>
    <div class="booking-card-body">
      <div class="booking-meta">
        <div class="booking-meta-row">📅 ${date} · ${booking.eventTime}</div>
        <div class="booking-meta-row">📍 ${booking.eventLocation}</div>
        <div class="booking-meta-row">💰 ${booking.price === 0 ? 'Free' : '$' + booking.price}</div>
      </div>
      <div class="booking-id">ID: ${booking.id}</div>
      <div class="booking-qr">
        <img src="${qrUrl}" alt="QR Code for ${booking.eventTitle}" loading="lazy" />
      </div>
      <div class="booking-status">
        <span style="width:6px;height:6px;border-radius:50%;background:var(--accent);animation:blink 2s ease infinite;display:inline-block"></span>
        Confirmed
      </div>
    </div>
    <div class="booking-footer">
      <button class="btn-cancel" data-booking-id="${booking.id}">Cancel Booking</button>
    </div>
  `;
}

function cancelBooking(bookingId) {
  bookings = bookings.filter(b => b.id !== bookingId);
  localStorage.setItem('evnt_bookings', JSON.stringify(bookings));
  renderBookings();
  renderEvents(filteredEvents);
  showToast('🗑️ Booking cancelled', 'error');
}

/* =============================================
   TOAST NOTIFICATIONS
   ============================================= */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || '•'}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* =============================================
   CONTACT FORM
   ============================================= */
function handleContactSubmit(e) {
  e.preventDefault?.();
  showToast('📨 Message sent! We\'ll be in touch soon.', 'success');
  // Clear inputs
  document.querySelectorAll('.contact-input').forEach(input => {
    input.value = '';
  });
}

/* =============================================
   UTILITY: Date Formatter
   ============================================= */
function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/* =============================================
   SMOOTH SCROLL FOR ALL INTERNAL LINKS
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* =============================================
   INTERSECTION OBSERVER — REVEAL ANIMATIONS
   ============================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.section-header').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  revealObserver.observe(el);
});