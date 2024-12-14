const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = require('./models/user');
const Subscription = require('./models/Subscription');
const Experience = require('./models/Experience');
const Feedback = require('./models/Feedback');
const PORT = 3001;
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/gym', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'kuchbhidaaldotum',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

const successHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Successful</title>
    <style>
        body {
            font-family: Verdana, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .message-box {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .message-box h1 {
            color: #4CAF50;
        }
    </style>
</head>
<body>
    <div class="message-box">
        <h1>Registration Successful!</h1>
        <p>You will be redirected to the login page shortly.</p>
    </div>
    <script>
        setTimeout(() => {
            window.location.href = '/login';
        }, 3000);
    </script>
</body>
</html>
`;

const errorHTML = (errorMessage) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Error</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .message-box {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .message-box h1 {
            color: #f44336;
        }
    </style>
</head>
<body>
    <div class="message-box">
        <h1>Registration Error</h1>
        <p>${errorMessage}</p>
        <p>You will be redirected to the registration page shortly.</p>
    </div>
    <script>
        setTimeout(() => {
            window.location.href = '/register';
        }, 3000);
    </script>
</body>
</html>
`;

// Authorization middleware
const authorization = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.redirect('/login');
    }
};


app.get('/community-page', authorization, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'community-page.html'))
})

app.post('/community', (req, res) => {
    const { name, email, feedback } = req.body;
    console.log(`Feedback received from ${name} (${email}): ${feedback}`);
    res.redirect('/community');
});

app.get('/community', (req, res) => {
    res.send('<h1>Community Posts</h1><p>This is where the community posts will be displayed.</p>');
});

// Registration route
app.post('/register', async(req, res) => {
    try {
        const { displayName, email, password, confirmPassword } = req.body;

        if (!displayName || !email || !password || !confirmPassword) {
            return res.status(400).send(errorHTML("All fields are required"));
        }
        if (password !== confirmPassword) {
            return res.status(400).send(errorHTML("Passwords do not match"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ displayName, email, password: hashedPassword });

        await newUser.save();

        req.session.user = newUser;
        req.session.displayName = displayName;

        console.log('User registered successfully, redirecting to login');
        res.send(successHTML);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).send(errorHTML(error.message));
    }
});


app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.get('/blogs', (req, res) => {
    const blogs = [{
            id: 1,
            title: 'The Ultimate Guide to Gym Workouts',
            image: 'https://static.vecteezy.com/system/resources/thumbnails/026/781/389/small_2x/gym-interior-background-of-dumbbells-on-rack-in-fitness-and-workout-room-photo.jpg',
            content: 'Explore our ultimate guide to gym workouts. Whether you are a beginner or an advanced athlete, these workouts will help you achieve your fitness goals.'
        },
        {
            id: 2,
            title: 'Nutrition Tips for Optimal Performance',
            image: 'https://www.starhealth.in/blog/wp-content/uploads/2022/01/NUTRITION-copy.jpg',
            content: 'Discover essential nutrition tips that will fuel your workouts and enhance your overall performance. Learn what to eat before and after your gym sessions.'
        },
    ];

    res.json(blogs);
});


// Login route
app.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send(errorHTML("Email and Password are required"));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send(errorHTML("Invalid email or password"));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send(errorHTML("Invalid email or password"));
        }

        user.loginHistory.push({ timestamp: new Date() });
        await user.save();

        req.session.user = user;
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error logging in', error);
        res.status(400).send(errorHTML(error.message));
    }
});

// Dashboard route
app.get('/dashboard', authorization, (req, res) => {
    const user = req.session.user;
    const displayName = req.session.displayName;
    res.render('dashboard', { user, displayName });
});


app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required.' });
    }

    if (!email) {
        return res.status(400).json({ error: 'Email address is required.' });
    }

    if (!subject) {
        return res.status(400).json({ error: 'Subject is required.' });
    }

    if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    // Simulate sending email or saving to database
    // Here you would normally handle the email sending or save the message to your database

    // If everything is successful, send a success message
    return res.status(200).json({ success: 'Thank you for your message. We will get back to you shortly.' });
});



//subscribe route
app.post('/subscribe', async(req, res) => {
    const { email } = req.body;
    if (!email) {
        console.log('Email is required');
        return res.status(400).render('notification', { success: false, message: 'Email is required' });
    }

    try {
        const existingSubscription = await Subscription.findOne({ email });
        if (existingSubscription) {
            console.log('Email already subscribed:', email);
            return res.status(400).render('notification', { success: false, message: 'This email is already subscribed.' });
        }

        // Store the email in the database
        const newSubscription = new Subscription({ email });
        await newSubscription.save();

        // Configure SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'insightarcai@gmail.com', // Your SMTP email
                pass: 'qedixeckisticjap' // Your SMTP password
            }
        });

        const mailOptions = {
            from: 'insightarcai@gmail.com', // Use a valid email address
            to: email,
            subject: 'Welcome to FitFusionHub!',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Welcome to FitFusionHub</title>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            background-color: #f6f6f6;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            padding-bottom: 20px;
                        }
                        .header h1 {
                            margin: 0;
                            color: #333;
                        }
                        .content {
                            text-align: left;
                            color: #555;
                        }
                        .content p {
                            margin: 10px 0;
                        }
                        .content ul {
                            list-style-type: none;
                            padding: 0;
                        }
                        .content ul li {
                            background-color: #f0f0f0;
                            margin: 5px 0;
                            padding: 10px;
                            border-radius: 4px;
                        }
                        .footer {
                            text-align: center;
                            padding-top: 20px;
                            color: #888;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Welcome to FitFusionHub!</h1>
                        </div>
                        <div class="content">
                            <p>Thank you for subscribing to our newsletter. We're excited to have you on board!</p>
                            <p>Here's what you can expect:</p>
                            <ul>
                                <li>Weekly fitness tips and advice</li>
                                <li>Exclusive discounts and promotions</li>
                                <li>Early access to new classes and events</li>
                                <li>Get your customized meals at an affordable price</li>
                                <li>Free access to exercise and gym plans</li>
                            </ul>
                            <p>Let's get started on your fitness journey!</p>
                            <p>Best regards,<br>The FitFusionHub Team</p>
                        </div>
                        <div class="footer">
                            <p>&copy; 2024 FitFusionHub. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).render('notification', { success: false, message: 'Error sending email' });
            }
            console.log('Email sent: ' + info.response);
            return res.status(200).render('notification', { success: true, message: 'Subscription successful! Please check your email.' });
        });
    } catch (error) {
        console.error('Error subscribing:', error);
        return res.status(500).render('notification', { success: false, message: 'Error subscribing' });
    }
});

//login history
app.get('/history', authorization, async(req, res) => {
    try {
        const loginHistory = req.session.user.loginHistory || [];
        res.render('history', { loginHistory });
    } catch (error) {
        console.error('Error fetching login history', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/feedback', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'feedback.html'));
});

app.post('/api/feedback', async(req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        const newFeedback = new Feedback({
            name,
            email,
            message,
        });
        await newFeedback.save();
        res.status(200).json({ message: 'Feedback received successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving feedback.' });
    }
});


app.get('/privacy', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'privacy.html'));
});


app.get('/community', async(req, res) => {
    try {
        const experiences = await Experience.find().sort({ createdAt: -1 });
        res.json(experiences);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/community', async(req, res) => {
    const { experience } = req.body;
    const newExperience = new Experience({ experience });
    try {
        await newExperience.save();
        res.status(201).send('Experience saved');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/community-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'community.html'));
});

app.get('/public/yoga.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'yoga.html'));
});

app.get('/public/workout.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'workout.html'));
});

app.get('/public/dance.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dance.html'));
});

app.get('/lostpassword', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/lostpassword.html'));
});

app.get('/lostpassword', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/lostpassword.html'));
});

// Dummy database for demonstration
const users = [
    { email: 'user@example.com', name: 'John Doe' },
    // Add more users as needed
];

// Nodemailer setup (use your email provider's SMTP settings)
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

// API endpoint to handle password reset requests
app.post('/api/lostpassword', (req, res) => {
    const { email } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).json({ error: 'No user found with that email address.' });
    }

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        text: `Hello ${user.name},\n\nYou requested a password reset. Click the link below to reset your password:\n\nhttp://yourwebsite.com/resetpassword?token=dummy-token\n\nIf you did not request this, please ignore this email.\n\nThank you,\nFitFusionHub Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Error sending email. Please try again later.' });
        }
        res.json({ message: 'Password reset link has been sent to your email address.' });
    });
});

app.get('/terms', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tos.html'));
});

app.get('/training', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'training.html'));
});

// Logout route
app.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy(err => {
            if (err) {
                console.log('Error destroying session:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/');
        });
    } else {
        res.redirect('/login');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Express Server started on port: ${PORT}`);
});