# User Authentication & Registration

This application now includes full user registration and authentication that integrates with your WordPress/WooCommerce database.

## Features

- **User Registration** - New users register and are saved as WooCommerce customers
- **User Login** - Existing users can login with their WordPress credentials
- **Profile Management** - Users can view and edit their profile information
- **WordPress Integration** - All user data is stored in your WordPress database
- **Persistent Sessions** - User sessions persist across page refreshes

## How It Works

### Registration Process

1. User fills out registration form at `/login`
2. Data is sent to WooCommerce API endpoint (`POST /wp-json/wc/v3/customers`)
3. New customer is created in WordPress database
4. User is automatically logged in
5. User data is stored in browser localStorage and app context

### Login Process

1. User enters email and password at `/login`
2. Email is verified against WooCommerce customers
3. If found, user data is loaded from WordPress
4. User session is created and stored locally

### Profile Updates

1. User edits profile at `/profile`
2. Changes are sent to WooCommerce API (`PUT /wp-json/wc/v3/customers/{id}`)
3. WordPress database is updated
4. Local user data is refreshed

## API Integration

### Authentication Service (`authService`)

Located in `src/services/wordpressApi.js`:

```javascript
import { authService } from '../services/wordpressApi';

// Register new user
const user = await authService.register({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'secure123',
  phone: '123-456-7890',
  address: '123 Main St',
  city: 'Durban',
  postalCode: '4001',
  country: 'South Africa'
});

// Login existing user
const user = await authService.login('john@example.com', 'password');

// Update user profile
const updated = await authService.updateCustomer(userId, {
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@example.com'
  // ... other fields
});

// Get customer data
const customer = await authService.getCustomer(customerId);
```

### WooCommerce Customer Fields

When a user registers, the following data is saved to WordPress:

**Customer Table:**
- Email
- First Name
- Last Name
- Username (auto-generated from email if not provided)
- Password (hashed by WordPress)

**Billing Information:**
- Name
- Email
- Phone
- Address
- City
- Postal Code
- Country

**Shipping Information:**
- Name
- Address
- City
- Postal Code
- Country

## User Context

User data is managed through the Cart Context:

```javascript
import { useCart } from '../context/CartContext';

function MyComponent() {
  const { user, updateUser, logout } = useCart();
  
  // Check if user is logged in
  if (user) {
    console.log(user.firstName, user.email);
  }
  
  // Update user
  updateUser(newUserData);
  
  // Logout
  logout();
}
```

### User Object Structure

```javascript
{
  id: 123,                    // WordPress customer ID
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  username: 'john',
  phone: '123-456-7890',
  address: '123 Main St',
  city: 'Durban',
  postalCode: '4001',
  country: 'South Africa'
}
```

## Pages

### Login/Register Page (`/login`)

- Toggle between login and registration forms
- Form validation
- Error and success messages
- Redirects to profile after successful login/registration

### Profile Page (`/profile`)

- View mode: Display user information
- Edit mode: Update user details
- Shows WordPress customer ID and username
- Logout functionality
- Saves changes to WordPress database

## Navigation

The navigation bar automatically adapts based on login status:

- **Not logged in**: Shows "Login" button
- **Logged in**: Shows profile icon (👤) with user's name on hover

## Security Notes

### Important for Production

⚠️ **Current Implementation**: This is a simplified authentication system for demonstration. For production use, you should:

1. **Implement JWT Authentication**
   - Install WordPress JWT plugins (e.g., JWT Authentication for WP REST API)
   - Use tokens for secure API requests
   - Store tokens securely

2. **Password Security**
   - Never send passwords in plain text
   - Use HTTPS for all API requests
   - Implement proper password hashing server-side

3. **API Security**
   - Use WordPress nonces for CSRF protection
   - Implement rate limiting
   - Validate all inputs server-side
   - Use proper CORS settings

4. **Session Management**
   - Use secure cookies or tokens
   - Implement session timeouts
   - Add refresh token logic

### Recommended WordPress Plugins

For production authentication:
- **JWT Authentication for WP REST API**
- **WP REST API Controller**
- **Application Passwords** (built into WordPress 5.6+)

## Testing

### Test Registration

1. Go to `/login`
2. Click "Register here"
3. Fill out the registration form
4. Submit
5. Check WordPress Admin → WooCommerce → Customers to see the new user

### Test Login

1. Go to `/login`
2. Enter registered email
3. Click Login
4. Should redirect to `/profile`

### Test Profile Update

1. Login first
2. Go to `/profile`
3. Click "Edit Profile"
4. Change any field
5. Click "Save Profile"
6. Check WordPress admin to verify changes

## Troubleshooting

### "Registration failed"
- Check that WooCommerce REST API is enabled
- Verify consumer key and secret in `.env`
- Check browser console for detailed error

### "Login failed"
- Verify user exists in WordPress
- Check email is correct
- Ensure WooCommerce customer API is accessible

### Profile not updating
- Check user has valid WordPress ID
- Verify API credentials
- Check browser console for errors

## Future Enhancements

Potential improvements:

- Email verification
- Password reset functionality
- Two-factor authentication
- Social login (Google, Facebook)
- Order history integration
- Saved addresses
- Wishlist functionality
