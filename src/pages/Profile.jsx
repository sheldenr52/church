import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';

export default function Profile() {
  const { user, updateUser, logout } = useCart();
  const [isEditing, setIsEditing] = useState(false);
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
    updateUser(formData);
    setIsEditing(false);
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
    }
  };

  if (!user && !isEditing) {
    return (
      <Layout>
        <div className="profile-page">
          <div className="profile-empty">
            <div className="profile-empty-icon">👤</div>
            <h2>No Profile Found</h2>
            <p>Create your profile to manage your orders and preferences</p>
            <button onClick={() => setIsEditing(true)} className="btn-create-profile">
              Create Profile
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
                <button type="submit" className="btn-save">
                  Save Profile
                </button>
                {user && (
                  <button type="button" onClick={handleCancel} className="btn-cancel">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div className="profile-display">
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
