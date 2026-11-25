<?php
// Booking form for One Way, Round Trip, and Rental.
?>

<section class="booking-section" id="booking">
    <div class="booking-container">

        <!-- Booking tabs -->
        <div class="booking-tabs" role="tablist" aria-label="Choose trip type">
            <button class="booking-tab active"
                    id="tab-one-way"
                    type="button"
                    role="tab"
                    aria-selected="true"
                    aria-controls="panel-one-way"
                    data-booking-tab="one-way">
                <span aria-hidden="true">✦</span> One Way
            </button>

            <button class="booking-tab"
                    id="tab-round-trip"
                    type="button"
                    role="tab"
                    aria-selected="false"
                    aria-controls="panel-round-trip"
                    data-booking-tab="round-trip">
                <span aria-hidden="true">⟳</span> Round Trip
            </button>

            <button class="booking-tab"
                    id="tab-rental"
                    type="button"
                    role="tab"
                    aria-selected="false"
                    aria-controls="panel-rental"
                    data-booking-tab="rental">
                <span aria-hidden="true">🚘</span> Rental
            </button>
        </div>

        <!-- ONE WAY -->
        <div class="booking-panel"
             id="panel-one-way"
             role="tabpanel"
             aria-labelledby="tab-one-way">

            <form class="ride-form" id="one-way-form">

                <div class="booking-fields">
                    <input type="text" name="name"
                           placeholder="Your Name"
                           aria-label="Your Name"
                           autocomplete="name" required>

                    <input type="tel" name="phone"
                           placeholder="Phone Number"
                           aria-label="Phone Number"
                           autocomplete="tel" required>

                    <input type="text" name="pickup"
                           placeholder="Pickup Location"
                           aria-label="Pickup Location" required>

                    <input type="text" name="drop"
                           placeholder="Drop Location"
                           aria-label="Drop Location" required>

                    <input type="date" name="pickup_date"
                           aria-label="Pickup Date" required>

                    <input type="time" name="pickup_time"
                           aria-label="Pickup Time" required>
                </div>

                <div class="vehicle-heading">
                    <strong>Select Your Preferred Vehicle</strong>
                    
                </div>

                <div class="vehicle-booking-row">
                    <div class="vehicle-options">

                        <label class="vehicle-option">
                            <input type="radio" name="vehicle" value="Sedan">
                            <img class="vehicle-image"
                                 src="assets/images/vehicles/sedan.png"
                                 alt="Sedan car">
                            <strong>SEDAN</strong>
                        </label>

                        <label class="vehicle-option">
                            <input type="radio" name="vehicle" value="Etios">
                            <img class="vehicle-image"
                                 src="assets/images/vehicles/hatchback.png"
                                 alt="Etios car">
                            <strong>ETIOS</strong>
                        </label>

                        <label class="vehicle-option">
                            <input type="radio" name="vehicle" value="SUV">
                            <img class="vehicle-image"
                                 src="assets/images/vehicles/kia.png"
                                 alt="SUV car">
                            <strong>SUV</strong>
                        </label>

                        <label class="vehicle-option">
                            <input type="radio" name="vehicle" value="Innova">
                            <img class="vehicle-image"
                                 src="assets/images/vehicles/innova.png"
                                 alt="Innova car">
                            <strong>INNOVA</strong>
                        </label>

                    </div>

                    <button class="book-ride-button" type="submit">
                        Book Your Ride <span aria-hidden="true">→</span>
                    </button>
                </div>
            </form>
        </div>

        <!-- ROUND TRIP -->
        <div class="booking-panel"
             id="panel-round-trip"
             role="tabpanel"
             aria-labelledby="tab-round-trip"
             hidden>

            <form class="ride-form" id="round-trip-form">

                <div class="booking-fields">
                    <input type="text" name="name"
                           placeholder="Your Name"
                           aria-label="Your Name"
                           autocomplete="name" required>

                    <input type="tel" name="phone"
                           placeholder="Phone Number"
                           aria-label="Phone Number"
                           autocomplete="tel" required>

                    <input type="text" name="pickup"
                           placeholder="Pickup Location"
                           aria-label="Pickup Location" required>

                    <input type="text" name="drop"
                           placeholder="Drop Location"
                           aria-label="Drop Location" required>

                    <input type="date" name="pickup_date"
                           aria-label="Pickup Date" required>

                    <input type="time" name="pickup_time"
                           aria-label="Pickup Time" required>
                </div>

                <div class="vehicle-heading">
                    <strong>Select Your Preferred Vehicle</strong>
                </div>

                <div class="vehicle-booking-row">
                    <div class="vehicle-options">

                        <label class="vehicle-option">
                            <input type="radio" name="vehicle" value="Sedan">
                            <img class="vehicle-image"
                                 src="assets/images/vehicles/sedan.png"
                                 alt="Sedan car">
                            <strong>SEDAN</strong>
                        </label>

                        <label class="vehicle-option">
                            <input type="radio" name="vehicle" value="Etios">
                            <img class="vehicle-image"
                                 src="assets/images/vehicles/hatchback.png"
                                 alt="Etios car">
                            <strong>ETIOS</strong>
                        </label>

                        <label class="vehicle-option">
                            <input type="radio" name="vehicle" value="SUV">
                            <img class="vehicle-image"
                                 src="assets/images/vehicles/kia.png"
                                 alt="SUV car">
                            <strong>SUV</strong>
                        </label>

                        <label class="vehicle-option">
                            <input type="radio" name="vehicle" value="Innova">
                            <img class="vehicle-image"
                                 src="assets/images/vehicles/innova.png"
                                 alt="Innova car">
                            <strong>INNOVA</strong>
                        </label>

                    </div>

                    <button class="book-ride-button" type="submit">
                        Book Your Ride <span aria-hidden="true">→</span>
                    </button>
                </div>
            </form>
        </div>

        <!-- RENTAL -->
        <div class="booking-panel"
             id="panel-rental"
             role="tabpanel"
             aria-labelledby="tab-rental"
             hidden>

            <form class="ride-form" id="rental-form">

                <div class="booking-fields rental-fields">
                    <input type="text" name="name"
                           placeholder="Your Name"
                           aria-label="Your Name"
                           autocomplete="name" required>

                    <input type="tel" name="phone"
                           placeholder="Phone Number"
                           aria-label="Phone Number"
                           autocomplete="tel" required>

                    <input type="date" name="pickup_date"
                           aria-label="Pickup Date" required>

                    <input type="time" name="pickup_time"
                           aria-label="Pickup Time" required>

                    <select name="rent_from"
                            aria-label="Rent From" required>
                        <option value="">Rent From</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Trichy">Trichy</option>
                    </select>
                </div>

                <div class="vehicle-heading">
                    <strong>Select Your Preferred Vehicle</strong>
                </div>

                <div class="vehicle-booking-row">
                    <div class="vehicle-options">

                        <label class="vehicle-option">
                            <input type="radio" name="vehicle" value="Sedan">
                            <img class="vehicle-image"
                                 src="assets/images/vehicles/sedan.png"
                                 alt="Sedan car">
                            <strong>SEDAN</strong>
                        </label>

                        <label class="vehicle-option">
                            <input type="radio" name="vehicle" value="Etios">
                            <img class="vehicle-image"
                                 src="assets/images/vehicles/hatchback.png"
                                 alt="Etios car">
                            <strong>ETIOS</strong>
                        </label>

                        <label class="vehicle-option">
                            <input type="radio" name="vehicle" value="SUV">
                            <img class="vehicle-image"
                                 src="assets/images/vehicles/kia.png"
                                 alt="SUV car">
                            <strong>SUV</strong>
                        </label>

                        <label class="vehicle-option">
                            <input type="radio" name="vehicle" value="Innova">
                            <img class="vehicle-image"
                                 src="assets/images/vehicles/innova.png"
                                 alt="Innova car">
                            <strong>INNOVA</strong>
                        </label>

                    </div>

                    <button class="book-ride-button" type="submit">
                        Book Your Ride <span aria-hidden="true">→</span>
                    </button>
                </div>
            </form>
        </div>

    </div>
</section>
```