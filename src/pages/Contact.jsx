import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Contact() {
  return (
    <Layout>
      <section>
        <div className="container">
          <h2>Get In Touch</h2>
          <p style={{ textAlign: 'center', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
            We'd love to hear from you! Whether you have questions, need prayer,
            or want to learn more about our church, don't hesitate to reach out.
          </p>

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
              <h3>Visit Us</h3>
              <p>
                <strong>QSDA Church</strong><br />
                72 Fairlight Road<br />
                Queensburgh, South Africa
              </p>
              
              <h3>Service Times</h3>
              <ul>
                <li>Sabbath Worship: Saturday 10:00 AM</li>
                <li>Sabbath School: Saturday 9:15 AM</li>
                <li>Wednesday Prayer: 7:00 PM</li>
              </ul>
              
              <h3>Contact Information</h3>
              <p>
                <strong>Email:</strong><br />
                <a href="mailto:info@qsda.org">info@qsda.org</a>
              </p>
              <p>
                <strong>Phone:</strong><br />
                <a href="tel:+11234567890">(123) 456-7890</a>
              </p>
              
              <div style={{ marginTop: '2rem' }}>
                <Link to="/" className="btn">Plan Your Visit</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Contact Section */}
      <section style={{ background: '#f8f9fa' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Connect With Us</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            Follow us on social media to stay updated with our latest events and messages.
          </p>
          <div className="social-links" style={{ fontSize: '1.3rem' }}>
            <a href="https://www.youtube.com/channel/UCXXXXXXXXXXXX" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
