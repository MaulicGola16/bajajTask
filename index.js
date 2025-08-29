// index.js

const express = require('express');
const app = express();

// This middleware is necessary to parse JSON bodies from POST requests
app.use(express.json());

// Define the POST endpoint for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        // Extract the 'data' array from the request body
        const { data } = req.body;

        // --- 1. Basic Validation ---
        // Check if data exists and is an array
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id: "your_full_name_your_dob_ddmmyyyy", // Replace with your details
                message: "Invalid input: 'data' must be an array."
            });
        }

        // --- 2. Initialize Response Arrays and Variables ---
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_string = "";

        // --- 3. Process the Input Array ---
        data.forEach(item => {
            if (!isNaN(item)) { // Check if the item is a number
                const num = parseInt(item);
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
                sum += num;
            } else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) { // Check if it's an alphabet string
                alphabets.push(item.toUpperCase());
                alphabet_string += item;
            } else { // Otherwise, it's a special character
                special_characters.push(item);
            }
        });
        
        // --- 4. Logic for 'concat_string' ---
        // Reverse the collected alphabetic characters
        const reversed_alphabets = alphabet_string.split('').reverse().join('');
        
        // Apply alternating caps
        let concat_string = "";
        for (let i = 0; i < reversed_alphabets.length; i++) {
            if ((i + 1) % 2 === 0) { // Even position (2nd, 4th, etc.) -> lowercase
                concat_string += reversed_alphabets[i].toLowerCase();
            } else { // Odd position (1st, 3rd, etc.) -> uppercase
                concat_string += reversed_alphabets[i].toUpperCase();
            }
        }

        // --- 5. Construct the Final Response ---
        const response = {
            is_success: true,
            user_id: "jane_doe_17091999", // IMPORTANT: Replace with your details
            email: "jane.doe@example.com", // IMPORTANT: Replace with your email
            roll_number: "RA123456789",    // IMPORTANT: Replace with your roll number
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(), // Sum must be a string [cite: 57]
            concat_string
        };

        // Send the successful response
        res.status(200).json(response); // Expected success code is 200 [cite: 31]

    } catch (error) {
        // Graceful exception handling [cite: 27]
        res.status(500).json({
            is_success: false,
            user_id: "jane_doe_17091999", // Replace with your details
            message: "An unexpected error occurred."
        });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});