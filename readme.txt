# Kisaan Connect - Front-End Prototype

A complete front-end prototype of a Farmer ⇄ Consumer marketplace.

## Technologies Used
- **HTML5**: Semantic structure.
- **CSS3**: Custom styling, Flexbox/Grid, Responsive design (no frameworks).
- **Vanilla JavaScript (ES6+)**: Logic, State management (localStorage), DOM manipulation.

## How to Run
1. Open `index.html` in your browser.
2. Or use the Replit Preview window.

## Features
- **Role-based Access**: Separate dashboards for Farmers, Consumers, and Admins.
- **Farmer Workflow**: Add/Edit/Delete products, Accept/Reject orders.
- **Consumer Workflow**: Browse products, Filter listings, Place orders (send requests).
- **Data Persistence**: Uses `localStorage` to simulate a database. Data persists across page reloads.

## Test Credentials (Demo Data)
The app initializes with dummy data if localStorage is empty. You can use these accounts:

- **Farmer**: `ramesh@kisaan.com` / `password`
- **Consumer**: `sita@kisaan.com` / `password`
- **Admin**: `admin@kisaan.com` / `password`

## Reset Data
To reset the demo data, open the browser console (F12) and run:
```javascript
localStorage.clear();
location.reload();
```

## File Structure
- `client/index.html` - Landing page
- `client/css/styles.css` - Main stylesheet
- `client/js/app.js` - Main logic and data store
- `client/*.html` - Individual pages for different flows

## Developer Notes
This is a **static prototype** designed to demonstrate UI flows and user experience.
- No server-side code is used.
- No real payments or emails are sent.
- Security is simulated (passwords stored in plain text in localStorage).
