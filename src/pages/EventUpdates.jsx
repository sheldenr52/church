import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function EventUpdates() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    date: '',
    times: '',
    location: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('churchEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
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
          id: 6,
          date: '2026-03-19',
          title: "Youth Ministry - Game Night",
          times: "Friday @ 7:30 pm",
          location: "Recreation Center, 72 Fairlight Road, Queensburgh"
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
          title: "Community Service Day",
          times: "Wednesday @ 9:00 am",
          location: "Meet at Church, 72 Fairlight Road, Queensburgh"
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
          times: "Wednesday @ 6:30 pm",
          location: "Main Sanctuary, 72 Fairlight Road, Queensburgh"
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
          title: "Youth & Young Adults Retreat",
          times: "Thursday @ 5:00 pm",
          location: "Mountain View Camp, KwaZulu-Natal"
        }
      ];
      localStorage.setItem('churchEvents', JSON.stringify(defaultEvents));
      setEvents(defaultEvents);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.times || !formData.location) {
      alert('Please fill in all fields');
      return;
    }

    let updatedEvents;
    if (isEditing) {
      // Update existing event
      updatedEvents = events.map(event => 
        event.id === formData.id ? formData : event
      );
    } else {
      // Add new event
      const newEvent = {
        ...formData,
        id: Date.now() // Simple ID generation
      };
      updatedEvents = [...events, newEvent];
    }

    // Sort events by date
    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    setEvents(updatedEvents);
    localStorage.setItem('churchEvents', JSON.stringify(updatedEvents));
    
    // Reset form
    setFormData({
      id: null,
      title: '',
      date: '',
      times: '',
      location: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (event) => {
    setFormData(event);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(event => event.id !== id);
      setEvents(updatedEvents);
      localStorage.setItem('churchEvents', JSON.stringify(updatedEvents));
    }
  };

  const handleCancel = () => {
    setFormData({
      id: null,
      title: '',
      date: '',
      times: '',
      location: ''
    });
    setIsEditing(false);
  };

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Layout>
      <div className="event-updates-container">
        <div className="event-updates-header">
          <h1>Event Management</h1>
          <p>Add, edit, or remove upcoming church events</p>
        </div>

        <div className="event-form-section">
          <h2>{isEditing ? 'Edit Event' : 'Add New Event'}</h2>
          <form onSubmit={handleSubmit} className="event-form">
            <div className="form-group">
              <label htmlFor="title">Event Title *</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., Sabbath Worship Service"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="times">Time *</label>
              <input
                type="text"
                id="times"
                value={formData.times}
                onChange={(e) => setFormData({...formData, times: e.target.value})}
                placeholder="e.g., Saturday @ 10:00 am"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="e.g., Local Church, 72 Fairlight Road, Queensburgh"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                {isEditing ? 'Update Event' : 'Add Event'}
              </button>
              {isEditing && (
                <button type="button" onClick={handleCancel} className="btn-cancel">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="events-list-section">
          <h2>Current Events ({events.length})</h2>
          {events.length === 0 ? (
            <p className="no-events">No events scheduled. Add your first event above!</p>
          ) : (
            <div className="events-table">
              {events.map((event) => (
                <div key={event.id} className="event-row">
                  <div className="event-info">
                    <h3>{event.title}</h3>
                    <p className="event-date">{formatDisplayDate(event.date)}</p>
                    <p className="event-time">{event.times}</p>
                    <p className="event-location">{event.location}</p>
                  </div>
                  <div className="event-actions">
                    <button onClick={() => handleEdit(event)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(event.id)} className="btn-delete">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
