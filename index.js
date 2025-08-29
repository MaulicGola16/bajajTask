
const express = require('express');
const app = express();

app.use(express.json());

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id: "your_full_name_your_dob_ddmmyyyy", 
                message: "Invalid input: 'data' must be an array."
            });
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_string = "";

        data.forEach(item => {
            if (!isNaN(item)) { 
                const num = parseInt(item);
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
                sum += num;
            } else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) { 
                alphabets.push(item.toUpperCase());
                alphabet_string += item;
                special_characters.push(item);
            }
        });
        const reversed_alphabets = alphabet_string.split('').reverse().join('');
        
        let concat_string = "";
        for (let i = 0; i < reversed_alphabets.length; i++) {
            if ((i + 1) % 2 === 0) { 
                concat_string += reversed_alphabets[i].toLowerCase();
            } else { 
                concat_string += reversed_alphabets[i].toUpperCase();
            }
        }

        const response = {
            is_success: true,
            user_id: "maulic_gola_16082004", 
            email: "maulicgola2022@vitbhopal.ac.in", 
            roll_number: "22BAI10248", 
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        };

        res.status(200).json(response); 

    } catch (error) {
        res.status(500).json({
            is_success: false,
            user_id: "jane_doe_17091999", 
            message: "An unexpected error occurred."
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});