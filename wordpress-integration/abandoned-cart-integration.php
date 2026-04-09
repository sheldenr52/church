<?php
/**
 * Abandoned Cart Tracking Integration for Headless WooCommerce
 * 
 * This code integrates your React frontend with the Abandoned Cart Lite plugin.
 * Add this to your WordPress theme's functions.php or create a custom plugin.
 * 
 * Installation:
 * 1. Copy this code to your theme's functions.php file, OR
 * 2. Create a custom plugin and activate it
 * 
 * Requirements:
 * - Abandoned Cart Lite for WooCommerce plugin installed and activated
 * - WooCommerce installed and activated
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register custom REST API endpoint for cart tracking
 */
add_action('rest_api_init', function () {
    
    // Track cart endpoint
    register_rest_route('abandoned-cart/v1', '/track', array(
        'methods' => 'POST',
        'callback' => 'acl_track_cart_from_frontend',
        'permission_callback' => '__return_true', // Allow public access
    ));
    
    // Capture email endpoint
    register_rest_route('abandoned-cart/v1', '/capture-email', array(
        'methods' => 'POST',
        'callback' => 'acl_capture_email_from_frontend',
        'permission_callback' => '__return_true',
    ));
    
    // Mark cart as recovered
    register_rest_route('abandoned-cart/v1', '/recovered', array(
        'methods' => 'POST',
        'callback' => 'acl_mark_cart_recovered',
        'permission_callback' => '__return_true',
    ));
});

/**
 * Track cart from frontend
 */
function acl_track_cart_from_frontend($request) {
    global $wpdb;
    
    $params = $request->get_json_params();
    
    // Extract data
    $session_id = sanitize_text_field($params['session_id'] ?? '');
    $user_email = sanitize_email($params['user_email'] ?? '');
    $user_first_name = sanitize_text_field($params['user_first_name'] ?? '');
    $user_last_name = sanitize_text_field($params['user_last_name'] ?? '');
    $cart_items = $params['cart_items'] ?? array();
    $cart_total = floatval($params['cart_total'] ?? 0);
    
    // Validate required fields
    if (empty($session_id) || empty($cart_items)) {
        return new WP_Error('invalid_data', 'Session ID and cart items are required', array('status' => 400));
    }
    
    // Get the Abandoned Cart Lite table name
    $cart_table = $wpdb->prefix . 'ac_abandoned_cart_history_lite';
    
    // Check if table exists
    if ($wpdb->get_var("SHOW TABLES LIKE '$cart_table'") != $cart_table) {
        return new WP_Error('plugin_not_active', 'Abandoned Cart Lite plugin not found', array('status' => 500));
    }
    
    // Prepare cart info
    $cart_info = json_encode($cart_items);
    $cart_status = 'abandoned'; // Will be marked as abandoned
    $current_time = current_time('mysql');
    
    // Check if cart already exists for this session
    $existing_cart = $wpdb->get_row($wpdb->prepare(
        "SELECT id FROM $cart_table WHERE session_id = %s",
        $session_id
    ));
    
    if ($existing_cart) {
        // Update existing cart
        $wpdb->update(
            $cart_table,
            array(
                'abandoned_cart_info' => $cart_info,
                'abandoned_cart_time' => $current_time,
                'cart_total' => $cart_total,
            ),
            array('session_id' => $session_id),
            array('%s', '%s', '%f'),
            array('%s')
        );
        
        $cart_id = $existing_cart->id;
    } else {
        // Insert new cart
        $wpdb->insert(
            $cart_table,
            array(
                'user_id' => 0, // Guest user
                'user_email' => $user_email,
                'abandoned_cart_info' => $cart_info,
                'abandoned_cart_time' => $current_time,
                'cart_total' => $cart_total,
                'session_id' => $session_id,
                'user_type' => empty($user_email) ? 'GUEST' : 'REGISTERED',
            ),
            array('%d', '%s', '%s', '%s', '%f', '%s', '%s')
        );
        
        $cart_id = $wpdb->insert_id;
    }
    
    // If user email is provided, update the email tracking table
    if (!empty($user_email)) {
        $email_table = $wpdb->prefix . 'ac_guest_abandoned_cart_history_lite';
        
        // Check if table exists
        if ($wpdb->get_var("SHOW TABLES LIKE '$email_table'") == $email_table) {
            $existing_email = $wpdb->get_row($wpdb->prepare(
                "SELECT id FROM $email_table WHERE email_address = %s",
                $user_email
            ));
            
            if (!$existing_email) {
                $wpdb->insert(
                    $email_table,
                    array(
                        'email_address' => $user_email,
                        'session_id' => $session_id,
                    ),
                    array('%s', '%s')
                );
            }
        }
    }
    
    return new WP_REST_Response(array(
        'success' => true,
        'cart_id' => $cart_id,
        'message' => 'Cart tracked successfully',
    ), 200);
}

/**
 * Capture email from frontend (for guest checkout)
 */
function acl_capture_email_from_frontend($request) {
    global $wpdb;
    
    $params = $request->get_json_params();
    
    $email = sanitize_email($params['email'] ?? '');
    $session_id = sanitize_text_field($params['session_id'] ?? '');
    $cart_items = $params['cart_items'] ?? array();
    
    if (empty($email) || empty($session_id)) {
        return new WP_Error('invalid_data', 'Email and session ID are required', array('status' => 400));
    }
    
    // Update the cart with email
    $cart_table = $wpdb->prefix . 'ac_abandoned_cart_history_lite';
    
    $wpdb->update(
        $cart_table,
        array('user_email' => $email, 'user_type' => 'GUEST'),
        array('session_id' => $session_id),
        array('%s', '%s'),
        array('%s')
    );
    
    // Update email tracking table
    $email_table = $wpdb->prefix . 'ac_guest_abandoned_cart_history_lite';
    
    if ($wpdb->get_var("SHOW TABLES LIKE '$email_table'") == $email_table) {
        $existing = $wpdb->get_row($wpdb->prepare(
            "SELECT id FROM $email_table WHERE session_id = %s",
            $session_id
        ));
        
        if ($existing) {
            $wpdb->update(
                $email_table,
                array('email_address' => $email),
                array('session_id' => $session_id),
                array('%s'),
                array('%s')
            );
        } else {
            $wpdb->insert(
                $email_table,
                array(
                    'email_address' => $email,
                    'session_id' => $session_id,
                ),
                array('%s', '%s')
            );
        }
    }
    
    return new WP_REST_Response(array(
        'success' => true,
        'message' => 'Email captured successfully',
    ), 200);
}

/**
 * Mark cart as recovered (when purchase is completed)
 */
function acl_mark_cart_recovered($request) {
    global $wpdb;
    
    $params = $request->get_json_params();
    $session_id = sanitize_text_field($params['session_id'] ?? '');
    
    if (empty($session_id)) {
        return new WP_Error('invalid_data', 'Session ID is required', array('status' => 400));
    }
    
    $cart_table = $wpdb->prefix . 'ac_abandoned_cart_history_lite';
    
    // Mark cart as recovered
    $wpdb->update(
        $cart_table,
        array('recovered_cart' => current_time('mysql')),
        array('session_id' => $session_id),
        array('%s'),
        array('%s')
    );
    
    return new WP_REST_Response(array(
        'success' => true,
        'message' => 'Cart marked as recovered',
    ), 200);
}

/**
 * Optional: Add CORS headers if needed
 */
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        return $value;
    });
}, 15);
