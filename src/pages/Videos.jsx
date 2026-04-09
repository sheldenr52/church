import Layout from '../components/Layout';

export default function Videos() {
  return (
    <Layout>
      <section>
        <div className="container">
          <h2>Watch Our Messages</h2>
          <p style={{ textAlign: 'center', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
            Catch up on our latest sermons, special events, and inspiring messages.
            Subscribe to our YouTube channel to stay connected!
          </p>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <a 
              href="https://www.youtube.com/channel/UCXXXXXXXXXXXX" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn"
            >
              Visit Our YouTube Channel
            </a>
          </div>

          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/QGzLQd1IWak"
              title="QSDA Church Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div style={{ marginTop: '4rem' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Recent Messages</h3>
            <div className="events-list">
              <div className="event-card">
                <div className="event-title">Sunday Worship Service</div>
                <div className="event-details">Latest sermon on faith and community</div>
              </div>
              <div className="event-card">
                <div className="event-title">Midweek Bible Study</div>
                <div className="event-details">Deep dive into scripture and application</div>
              </div>
              <div className="event-card">
                <div className="event-title">Special Event Highlights</div>
                <div className="event-details">Community outreach and celebrations</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
