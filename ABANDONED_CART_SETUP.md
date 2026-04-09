# Abandoned Cart Integration Setup

This guide explains how to integrate the **Abandoned Cart Lite for WooCommerce** plugin with your React frontend.

## How It Works

The Abandoned Cart Lite plugin tracks when customers add items to their cart but don't complete the purchase. For a headless setup (React frontend + WordPress backend), we need to sync cart data from your React app to WordPress.

**Flow:**
1. User adds items to cart in React app
2. Cart data is automatically synced to WordPress (every 2 seconds after changes)
3. Abandoned Cart Lite plugin tracks the cart
4. If user doesn't complete purchase, plugin sends reminder emails
5. When user completes purchase, cart is marked as "recovered"

## Installation Steps

### 1. WordPress Setup

Add the cart tracking code to WordPress:

**Option A: Add to functions.php**
1. Go to WordPress Admin → Appearance → Theme Editor
2. Open `functions.php`
3. Copy the entire content from `wordpress-integration/abandoned-cart-integration.php`
4. Paste it at the end of your `functions.php` file
5. Save

**Option B: Create Custom Plugin (Recommended)**
1. Create a new file: `wp-content/plugins/acl-headless-integration/acl-headless-integration.php`
2. Copy the content from `wordpress-integration/abandoned-cart-integration.php`
3. Go to WordPress Admin → Plugins
4. Activate "Abandoned Cart Lite Headless Integration"

### 2. Configure Abandoned Cart Lite Plugin

1. Go to **WooCommerce → Abandoned Carts**
2. Configure settings:
   - **Enable Cart Tracking**: Yes
   - **Cart Abandonment Time**: 10 minutes (recommended)
   - **Email Template**: Customize your reminder emails
   - **Send Test Email**: Test the email delivery

3. Set up email reminders:
   - First reminder: 1 hour after abandonment
   - Second reminder: 6 hours after abandonment
   - Third reminder: 24 hours after abandonment

### 3. Test the Integration

1. **Add items to cart** in your React app
2. **Wait 2 seconds** - cart should sync to WordPress
3. **Check WordPress Admin** → WooCommerce → Abandoned Carts
4. You should see your cart listed
5. **Don't complete checkout** - wait for the abandonment time
6. **Check for reminder email** (sent to user's email if provided)

## Frontend Integration

The integration is already set up in your React app:

### Automatic Cart Syncing

```javascript
// In CartContext.jsx - already implemented
useEffect(() => {
  if (cartItems.length > 0) {
    // Syncs cart to WordPress every 2 seconds after changes
    const timeoutId = setTimeout(() => {
      abandonedCartService.syncCartWithWordPress(cartItems, user);
    }, 2000);
    
    return () => clearTimeout(timeoutId);
  }
}, [cartItems, user]);
```

### Email Capture (Optional Enhancement)

To capture emails from guest users during checkout:

```javascript
import { abandonedCartService } from '../services/abandonedCart';

// When user enters email in checkout form
const handleEmailCapture = async (email) => {
  await abandonedCartService.captureEmail(
    email,
    cartItems,
    localStorage.getItem('wc_cart_session_id')
  );
};
```

### Mark Cart as Recovered (Optional Enhancement)

When checkout is completed:

```javascript
import { abandonedCartService, clearCartSession } from '../services/abandonedCart';

// After successful payment
const sessionId = localStorage.getItem('wc_cart_session_id');
await abandonedCartService.markCartRecovered(sessionId);
clearCartSession();
```

## API Endpoints

The WordPress integration creates these REST API endpoints:

### Track Cart
```
POST /wp-json/abandoned-cart/v1/track
```
Syncs cart data from React to WordPress

**Request Body:**
```json
{
  "session_id": "session_1234567890_abc123",
  "user_email": "customer@example.com",
  "user_first_name": "John",
  "user_last_name": "Doe",
  "cart_items": [
    {
      "product_id": 123,
      "quantity": 2,
      "product_name": "Book Title",
      "product_price": 25.00,
      "line_total": 50.00
    }
  ],
  "cart_total": 50.00,
  "cart_currency": "ZAR"
}
```

### Capture Email
```
POST /wp-json/abandoned-cart/v1/capture-email
```
Associates an email with a cart session (for guest users)

### Mark Recovered
```
POST /wp-json/abandoned-cart/v1/recovered
```
Marks a cart as recovered when purchase completes

## Important Notes

### For Registered Users
- If user is logged in, their email is automatically included in cart tracking
- Abandoned cart emails will be sent to their registered email
- Cart history is associated with their WordPress user account

### For Guest Users
- Cart is tracked with a session ID
- Email is captured when they:
  - Register an account
  - Enter email in checkout
  - Enter email in any form
- Without email, cart is tracked but no reminder emails can be sent

### Session Management
- Each cart session gets a unique ID
- Session ID is stored in localStorage: `wc_cart_session_id`
- Session is cleared when cart is completed or cleared
- One session per browser/device

## Customization

### Adjust Sync Timing

In `CartContext.jsx`, change the debounce time:
```javascript
setTimeout(() => {
  abandonedCartService.syncCartWithWordPress(cartItems, user);
}, 5000); // Change from 2000 to 5000 for 5 seconds
```

### Disable Syncing for Specific Conditions

```javascript
useEffect(() => {
  // Only sync if cart has items AND user has email
  if (cartItems.length > 0 && user?.email) {
    const timeoutId = setTimeout(() => {
      abandonedCartService.syncCartWithWordPress(cartItems, user);
    }, 2000);
    
    return () => clearTimeout(timeoutId);
  }
}, [cartItems, user]);
```

## Abandoned Cart Lite Plugin Settings

Recommended settings in WordPress:

- **Cart abandonment time**: 10 minutes
- **Delete abandoned carts after**: 30 days
- **Send recovery emails**: Yes
- **Email template**: Customize with your branding
- **Coupon code**: Optional - include discount code in reminder emails
- **GDPR compliance**: Enable if required in your region

## Troubleshooting

### Carts not appearing in WordPress
1. Check WordPress admin → Abandoned Carts
2. Verify the plugin is activated
3. Check browser console for API errors
4. Verify API credentials in `.env` file

### Emails not sending
1. Check Abandoned Cart Lite settings
2. Verify SMTP is configured in WordPress
3. Test email delivery with plugin's test feature
4. Check spam folder

### CORS Errors
The PHP code includes CORS headers. If you still get errors:
1. Update the CORS headers in `abandoned-cart-integration.php`
2. Add your specific domain instead of `*`
3. Clear browser cache

### Session ID Issues
If cart tracking seems inconsistent:
1. Clear browser localStorage
2. Clear WordPress transients
3. Check for conflicts with other plugins

## Advanced Features

### Coupon Codes in Reminder Emails

Configure in Abandoned Cart Lite:
1. Go to WooCommerce → Abandoned Carts → Settings
2. Enable "Send coupon code in email"
3. Set discount percentage (e.g., 10%)
4. Customize email template to include coupon

### Analytics Integration

Track abandoned cart recovery:
```javascript
// In checkout success handler
if (sessionId) {
  // Track in Google Analytics
  gtag('event', 'cart_recovered', {
    'cart_value': getCartTotal(),
    'session_id': sessionId
  });
  
  await abandonedCartService.markCartRecovered(sessionId);
}
```

## Security Considerations

1. **API Access**: Endpoints are public but validate all inputs
2. **Email Validation**: All emails are sanitized before storage
3. **Session IDs**: Use secure random generation
4. **Data Privacy**: Comply with GDPR/POPIA - inform users about cart tracking
5. **HTTPS**: Always use HTTPS in production

## Support

If you encounter issues:
1. Check WordPress error logs
2. Enable WP_DEBUG in wp-config.php
3. Check browser console for JS errors
4. Review abandoned-cart.js service for API call errors

## Further Reading

- [Abandoned Cart Lite Documentation](https://www.tychesoftwares.com/docs/docs/abandoned-cart-lite-for-woocommerce/)
- [WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
