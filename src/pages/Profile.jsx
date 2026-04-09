import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { authService } from '../services/wordpressApi';

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
    country: user?.country || 'South Africa',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // If user has WordPress ID, update in WordPress
    if (user?.id) {
      authService.updateCustomer(user.id, formData)
        .then((updatedCustomer) => {
          const updatedUser = {
            id: updatedCustomer.id,
            email: updatedCustomer.email,
            firstName: updatedCustomer.first_name,
            lastName: updatedCustomer.last_name,
            username: updatedCustomer.username,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
          };
          updateUser(updatedUser);
          setSuccess('Profile updated successfully!');
          setIsEditing(false);
        })
        .catch((err) => {
          setError('Failed to update profile. Please try again.');
          console.error('Update error:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Just update locally if not a WordPress user
      updateUser(formData);
      setIsEditing(false);
      setLoading(false);
      setSuccess('Profile updated locally!');
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      postalCode: user?.postalCode || '',
      country: user?.country || 'South Africa',
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };

  if (!user && !isEditing) {
    return (
      <Layout>
        <div className="profile-page">
          <div className="profile-empty">
            <div className="profile-empty-icon">👤</div>
            <h2>No Profile Found</h2>
            <p>Please login or register to view your profile</p>
            <button onClick={() => navigate('/login')} className="btn-create-profile">
              Login / Register
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="profile-page">
        <div className="profile-header">
          <h1>My Profile</h1>
          {user && !isEditing && (
            <div className="profile-actions">
              <button onClick={() => setIsEditing(true)} className="btn-edit-profile">
                Edit Profile
              </button>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="profile-content">
          {error && (
            <div className="alert alert-error" style={{ marginBottom: '2rem' }}>
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success" style={{ marginBottom: '2rem' }}>
              {success}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <h2>{user ? 'Edit Profile' : 'Create Profile'}</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Street Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Profile'}
                </button>
                {user && (
                  <button type="button" onClick={handleCancel} className="btn-cancel" disabled={loading}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div className="profile-display">
              {user?.id && (
                <div className="profile-section">
                  <h2>Account Information</h2>
                  <div className="profile-info">
                    <div className="info-row">
                      <span className="info-label">WordPress ID:</span>
                      <span className="info-value">{user.id}</span>
                    </div>
                    {user.username && (
                      <div className="info-row">
                        <span className="info-label">Username:</span>
                        <span className="info-value">{user.username}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="profile-section">
                <h2>Personal Information</h2>
                <div className="profile-info">
                  <div className="info-row">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{user.firstName} {user.lastName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="info-row">
                      <span className="info-label">Phone:</span>
                      <span className="info-value">{user.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {(user.address || user.city || user.postalCode) && (
                <div className="profile-section">
                  <h2>Shipping Address</h2>
                  <div className="profile-info">
                    {user.address && (
                      <div className="info-row">
                        <span className="info-label">Address:</span>
                        <span className="info-value">{user.address}</span>
                      </div>
                    )}
                    {user.city && (
                      <div className="info-row">
                        <span className="info-label">City:</span>
                        <span className="info-value">{user.city}</span>
                      </div>
                    )}
                    {user.postalCode && (
                      <div className="info-row">
                        <span className="info-label">Postal Code:</span>
                        <span className="info-value">{user.postalCode}</span>
                      </div>
                    )}
                    <div className="info-row">
                      <span className="info-label">Country:</span>
                      <span className="info-value">{user.country}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
