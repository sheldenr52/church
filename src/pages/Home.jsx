import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Home() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [scriptureIndex, setScriptureIndex] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const [eventFilter, setEventFilter] = React.useState('byWeek');
  const [currentWeekOffset, setCurrentWeekOffset] = React.useState(0);
  const [events, setEvents] = React.useState([]);
  
  const videoIds = [
    'C__vhMIefR8',
    'ev0NnoDQnn0',
    '54QtuhHU_Rc',
    'QGzLQd1IWak',
  ];

  // Load events from localStorage
  React.useEffect(() => {
    const savedEvents = localStorage.getItem('churchEvents');
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      // Convert date strings back to Date objects
      const eventsWithDates = parsedEvents.map(event => ({
        ...event,
        date: new Date(event.date + 'T00:00:00')
      }));
      setEvents(eventsWithDates);
    } else {
      // Initialize with default events if none exist
      const defaultEvents = [
        {
          id: 1,
          date: '2026-03-02',
          title: "Sabbath Worship Service",
          times: "Saturday @ 10:00 am",
          location: "Local Church, 72 Fairlight Road, Queensburgh, South Africa"
        },
        {
          id: 2,
          date: '2026-03-05',
          title: "Community Potluck & Fellowship",
          times: "Wednesday @ 6:00 pm",
          location: "Fellowship Hall, 72 Fairlight Road, Queensburgh"
        },
        {
          id: 3,
          date: '2026-03-09',
          title: "Sabbath Worship Service",
          times: "Saturday @ 10:00 am",
          location: "Local Church, 72 Fairlight Road, Queensburgh, South Africa"
        },
        {
          id: 4,
          date: '2026-03-12',
          title: "Wednesday Bible Study",
          times: "Wednesday @ 7:00 pm",
          location: "Youth Room, 72 Fairlight Road, Queensburgh"
        },
        {
          id: 5,
          date: '2026-03-16',
          title: "Sabbath Worship Service",
          times: "Saturday @ 10:00 am",
          location: "Local Church, 72 Fairlight Road, Queensburgh, South Africa"
        },
        {
          id: 1,
          date: '2026-03-02',
          title: "Sabbath Worship Service",
          times: "Saturday @ 10:00 am",
          location: "Local Church, 72 Fairlight Road, Queensburgh, South Africa"
        },
        {
          id: 2,
          date: '2026-03-05',
          title: "Community Potluck & Fellowship",
          times: "Wednesday @ 6:00 pm",
          location: "Fellowship Hall, 72 Fairlight Road, Queensburgh"
        },
        {
          id: 3,
          date: '2026-03-09',
          title: "Sabbath Worship Service",
          times: "Saturday @ 10:00 am",
          location: "Local Church, 72 Fairlight Road, Queensburgh, South Africa"
        },
        {
          id: 4,
          date: '2026-03-12',
          title: "Wednesday Bible Study",
          times: "Wednesday @ 7:00 pm",
          location: "Youth Room, 72 Fairlight Road, Queensburgh"
        },
        {
          id: 5,
          date: '2026-03-16',
          title: "Sabbath Worship Service",
          times: "Saturday @ 10:00 am",
          location: "Local Church, 72 Fairlight Road, Queensburgh, South Africa"
        },
        {
          id: 6,
          date: '2026-03-19',
          title: "Community Outreach Day",
          times: "Thursday @ 9:00 am - Thursday @ 5:00 pm",
          location: "Meet at Church, 72 Fairlight Road, Queensburgh"
        },
        {
          id: 7,
          date: '2026-03-23',
          title: "Sabbath Worship Service",
          times: "Saturday @ 10:00 am",
          location: "Local Church, 72 Fairlight Road, Queensburgh, South Africa"
        },
        {
          id: 8,
          date: '2026-03-26',
          title: "Youth Group Meeting",
          times: "Wednesday @ 6:30 pm",
          location: "Youth Center, 72 Fairlight Road, Queensburgh"
        },
        {
          id: 9,
          date: '2026-03-30',
          title: "Sabbath Worship Service",
          times: "Saturday @ 10:00 am",
          location: "Local Church, 72 Fairlight Road, Queensburgh, South Africa"
        },
        {
          id: 10,
          date: '2026-04-02',
          title: "Prayer Meeting",
          times: "Wednesday @ 7:00 pm",
          location: "Sanctuary, 72 Fairlight Road, Queensburgh"
        },
        {
          id: 11,
          date: '2026-04-06',
          title: "Sabbath Worship Service",
          times: "Saturday @ 10:00 am",
          location: "Local Church, 72 Fairlight Road, Queensburgh, South Africa"
        },
        {
          id: 12,
          date: '2026-04-09',
          title: "Mission Sabbath",
          times: "Saturday @ 10:00 am",
          location: "Local Church, 72 Fairlight Road, Queensburgh, South Africa"
        }
      ];
      localStorage.setItem('churchEvents', JSON.stringify(defaultEvents));
      // Convert to Date objects for component use
      const eventsWithDates = defaultEvents.map(event => ({
        ...event,
        date: new Date(event.date + 'T00:00:00')
      }));
      setEvents(eventsWithDates);
    }
  }, []);

  const scriptures = [
    { text: "For God so loved the world that he gave his one and only Son", reference: "John 3:16" },
    { text: "I can do all things through Christ who strengthens me", reference: "Philippians 4:13" },
    { text: "Trust in the LORD with all your heart", reference: "Proverbs 3:5" },
    { text: "Be strong and courageous. Do not be afraid", reference: "Joshua 1:9" },
    { text: "The LORD is my shepherd; I shall not want", reference: "Psalm 23:1" },
    { text: "Love the Lord your God with all your heart", reference: "Matthew 22:37" },
    { text: "Cast all your anxiety on him because he cares for you", reference: "1 Peter 5:7" },
    { text: "Whoever believes in me will never be thirsty", reference: "John 6:35" },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setScriptureIndex((idx) => (idx + 1) % scriptures.length);
        setIsVisible(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [scriptures.length]);

  function prevVideo() {
    setCurrentIndex((idx) => (idx - 1 + videoIds.length) % videoIds.length);
  }

  function nextVideo() {
    setCurrentIndex((idx) => (idx + 1) % videoIds.length);
  }

  function getFilteredEvents() {
    const today = new Date(2026, 2, 1); // March 1, 2026
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    switch(eventFilter) {
      case 'byWeek': {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() + (currentWeekOffset * 7));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        return events.filter(e => e.date >= weekStart && e.date < weekEnd);
      }
      case 'thisWeek':
        return events.filter(e => e.date >= today && e.date < nextWeek);
      case 'nextWeek':
        return events.filter(e => e.date >= nextWeek && e.date < new Date(nextWeek.getTime() + 7 * 24 * 60 * 60 * 1000));
      case 'thisMonth':
        return events.filter(e => e.date >= today && e.date <= endOfMonth);
      case 'nextMonth':
        return events.filter(e => e.date >= nextMonth && e.date <= endOfNextMonth);
      default:
        return events;
    }
  }

  function getWeekLabel() {
    const today = new Date(2026, 2, 1);
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + (currentWeekOffset * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    const formatDate = (date) => {
      return `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`;
    };
    
    return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
  }

  function prevWeek() {
    setCurrentWeekOffset(offset => offset - 1);
  }

  function nextWeek() {
    setCurrentWeekOffset(offset => offset + 1);
  }

  function formatEventDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    return { day, month };
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome Home</h1>
          <p>Choose the right way together with our community of faith</p>
          <Link to="/contact" className="btn">Join Us This Sunday</Link>
        </div>
        <div className={`scripture-popup ${isVisible ? 'visible' : ''}`}>
          <div className="scripture-text">{scriptures[scriptureIndex].text}</div>
          <div className="scripture-reference">— {scriptures[scriptureIndex].reference}</div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
        <div className="about-us-content">
          <h2>About Our Church</h2>
          <p>
            At QSDA Seventh Day Adventist Church, we are a vibrant community dedicated to
            growing in faith, serving others, and sharing God's love. Our mission is to create
            a welcoming space where everyone can encounter Christ, build meaningful relationships,
            and discover their purpose.
          </p>
          <p>
            Whether you're seeking spiritual guidance, looking for a church family, or want to
            make a difference in the community, you'll find a home here with us.
          </p>
        </div>
      </section>

      {/* Mission Cards Section */}
      <section className="mission-section">
        <div className="mission-cards">
          <div className="mission-card">
            <div className="mission-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
              </svg>
            </div>
            <h3>Our Community</h3>
            <p>Our church is open and friendly with many social activities. To keep our church running smoothly we have committees anyone can join.</p>
            <Link to="/contact" className="mission-btn">MORE</Link>
          </div>
          
          <div className="mission-card">
            <div className="mission-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L4 9v12h16V9l-8-6zm0 2.5l6 4.5v9h-3v-5h-6v5H6v-9l6-4.5zM10 16h4v3h-4v-3z"/>
              </svg>
            </div>
            <h3>Church Mission</h3>
            <p>The mission of our church is to bring guidance about God's existence to people of all ages and encourage them to watch. We don't just...</p>
            <Link to="/contact" className="mission-btn">MORE</Link>
          </div>
          
          <div className="mission-card">
            <div className="mission-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </div>
            <h3>Join a Group</h3>
            <p>The key idea in becoming a part of our church is a volunteer! So if you have in need, our community is around to give, with our open hearts.</p>
            <Link to="/contact" className="mission-btn">MORE</Link>
          </div>
        </div>
      </section>

      {/* Featured Video Carousel Section */}
      <section>
        <h2>Life-Changing Sermons</h2>
        <div className="carousel">
          <button className="carousel-btn prev" onClick={() => prevVideo()}>&lt;</button>
          <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
            {videoIds.map((id, index) => (
              <div className="carousel-slide" key={index}>
                <div className="video-container">
                  <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    title={`Sermon video ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-btn next" onClick={() => nextVideo()}>&gt;</button>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section">
        <div className="events-header">
          <h2>UPCOMING EVENTS</h2>
        </div>
        
        <div className="events-filter">
          <button 
            className={`filter-btn ${eventFilter === 'byWeek' ? 'active' : ''}`}
            onClick={() => { setEventFilter('byWeek'); setCurrentWeekOffset(0); }}
          >
            By Week
          </button>
          <button 
            className={`filter-btn ${eventFilter === 'thisMonth' ? 'active' : ''}`}
            onClick={() => { setEventFilter('thisMonth'); setCurrentWeekOffset(0); }}
          >
            This Month
          </button>
          <button 
            className={`filter-btn ${eventFilter === 'nextMonth' ? 'active' : ''}`}
            onClick={() => { setEventFilter('nextMonth'); setCurrentWeekOffset(0); }}
          >
            Next Month
          </button>
        </div>
        
        {eventFilter === 'byWeek' && (
          <div className="week-navigation">
            <button className="week-nav-btn" onClick={prevWeek}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <div className="week-label">{getWeekLabel()}</div>
            <button className="week-nav-btn" onClick={nextWeek}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>
        )}

        <div className="events-list">
          {getFilteredEvents().map((event, index) => {
            const { day, month } = formatEventDate(event.date);
            return (
              <div className="event-card" key={index}>
                <div className="event-date-box">
                  <div className="event-day">{day}</div>
                  <div className="event-month">{month}</div>
                </div>
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <div className="event-info">
                    <div className="event-time">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                      </svg>
                      <span>{event.times}</span>
                    </div>
                    <div className="event-location">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gallery Section */}
      <section>
        <h2>Our Community in Action</h2>
        <div className="gallery-grid">
          <img src="/church.jpg" alt="Church building exterior" />
          <img src="/church-pic.jpg" alt="Worship service" />
          <img src="/genta-4.jpg" alt="Community gathering" />
          <img src="/masking.jpg" alt="Church activities" />
        </div>
      </section>

      {/* Social Media Section */}
      <section className="social-media-section">
        <h2>Connect With Us</h2>
        <p className="social-subtitle">Stay updated with our latest events, sermons, and community activities</p>
        <div className="social-cards">
          <a href="https://www.youtube.com/@queensburghsda283" target="_blank" rel="noopener noreferrer" className="social-card youtube">
            <div className="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <div className="social-content">
              <h3>YouTube</h3>
              <p>Watch our sermons and events</p>
            </div>
          </a>
          
          <a href="http://facebook.com/QSDAYouth" target="_blank" rel="noopener noreferrer" className="social-card facebook">
            <div className="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div className="social-content">
              <h3>Facebook</h3>
              <p>Join our community page</p>
            </div>
          </a>
          
          <a href="https://www.instagram.com/qsda_youth" target="_blank" rel="noopener noreferrer" className="social-card instagram">
            <div className="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </div>
            <div className="social-content">
              <h3>Instagram</h3>
              <p>Follow our youth ministry</p>
            </div>
          </a>
        </div>
      </section>

      {/* Map & Location Section */}
      <section className="visit-section">
        <h2>Visit Us</h2>
        <div className="map-location">
          <div className="map-container">
            <iframe
              src="https://maps.google.com/maps?q=72+Fairlight+Road,+Queensburgh,+South+Africa&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="location-details">
            <h3>Our Location</h3>
            <p><strong>Address:</strong><br />72 Fairlight Road<br />Queensburgh, South Africa</p>
            
            <h3>Service Times</h3>
            <ul>
              <li>📅 Sabbath Worship: Saturday 10:00 AM</li>
              <li>📅 Sabbath School: Saturday 9:15 AM</li>
              <li>📅 Wednesday Prayer: 7:00 PM</li>
            </ul>
            
            <h3>Contact Us</h3>
            <p>
              📧 <a href="mailto:queensburgh@knfc.adventist.org">queensburgh@knfc.adventist.org</a><br />
              📞 (123) 456-7890
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>New Here?</h2>
        <p>
          We'd love to meet you! Join one of our groups or reach out to learn more
          about our church family and how you can get connected.
        </p>
        <Link to="/contact" className="btn">Join a Group</Link>
      </section>
    </Layout>
  );
}
