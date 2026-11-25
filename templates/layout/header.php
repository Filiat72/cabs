<?php
// Shared site header template.
$phoneNumber = '+91 9876543210';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#050505">

    <title>Banu Kabi Cabs | Comfortable Rides for Every Destination</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">

    <!-- Base typography (load first) -->
    <?php $assetVersion = '20260326u'; ?>
    <link rel="stylesheet" href="assets/css/base.css?v=<?php echo $assetVersion; ?>">
    <!-- Main website stylesheet -->
    <link rel="stylesheet" href="assets/css/main.css?v=<?php echo $assetVersion; ?>">
    <!-- Service section stylesheet -->
    <link rel="stylesheet" href="assets/css/sections/services.css?v=<?php echo $assetVersion; ?>">

    <!-- Fleet carousel stylesheet -->
    <link rel="stylesheet" href="assets/css/sections/fleet.css?v=<?php echo $assetVersion; ?>">

    <!-- Booking form stylesheet -->
    <link rel="stylesheet" href="assets/css/sections/booking-form.css?v=<?php echo $assetVersion; ?>">

    <!-- tariff section stylesheet -->
    <link rel="stylesheet" href="assets/css/sections/tariff.css?v=<?php echo $assetVersion; ?>">

    <!-- about us section stylesheet -->
    <link rel="stylesheet" href="assets/css/sections/about.css?v=<?php echo $assetVersion; ?>">

    <!-- Booking form tab functionality -->
    <script src="assets/js/booking.js" defer></script>
    <script src="assets/js/modules/navigation.js?v=<?php echo $assetVersion; ?>" defer></script>
    <!--footer section stylesheet -->
    <link rel="stylesheet" href="assets/css/sections/footer.css?v=<?php echo $assetVersion; ?>">
    <link rel="stylesheet" href="assets/css/compact.css?v=<?php echo $assetVersion; ?>">

    
</head>
<body>

<header class="site-header">
    <div class="header-inner">

        <div class="header-mobile-bar">
            <a class="brand-logo" href="#home" aria-label="Banu Kabi Cabs Home">
                <img
                    src="assets/images/branding/logo.png"
                    alt="Banu Kabi Cabs"
                >
            </a>

            <button
                class="mobile-menu-toggle"
                type="button"
                aria-label="Toggle navigation"
                aria-expanded="false"
                aria-controls="primary-navigation"
            >
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>
        </div>

        <nav
            class="primary-navigation"
            id="primary-navigation"
            aria-label="Main navigation"
        >
            <div class="nav-links">
                <a class="nav-link active" href="#home">Home</a>
                <a class="nav-link" href="#booking">Book Ride</a>
                <a class="nav-link" href="#tariff">Tariff</a>
                <a class="nav-link" href="#fleet">Our Fleet</a>
                <a class="nav-link" href="#services">Our Services</a>
                <a class="nav-link" href="#about">About Us</a>
                <a class="nav-link" href="#contact">Contact</a>
            </div>

            <a class="header-phone" href="tel:+919876543210">
                <span class="phone-icon" aria-hidden="true">☎</span>
                <span class="header-phone-number">
                    <?php echo htmlspecialchars($phoneNumber, ENT_QUOTES, 'UTF-8'); ?>
                </span>
            </a>
        </nav>

    </div>
</header>
