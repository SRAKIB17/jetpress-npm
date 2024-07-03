import { writeFile } from 'fs';
import jetpress from 'jetpress'; // Import the CommonJS module
const { Request, Response, Router, Server, FormWizard } = jetpress;
const server = new Server();

// Middleware for parsing form data
server.use(FormWizard);

// Static file serving

server.static('/uploads', './uploads');
server.static('/static', path.join(__dirname, 'public'), {
    cacheControl: 'public, max-age=31536000', // 1 year
    headers: {
        'Content-Security-Policy': "default-src 'self'",
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block'
    }
});
// Define routes
server.get('/', (req, res) => {
    res.html('<h1>Welcome to JetPress!</h1>');
});

server.post('/upload', (req, res) => {
    const uploadedFile = req.file;
    if (!uploadedFile) {
        return res.status(400).send('No file uploaded.');
    }

    const newPath = path.join(__dirname, 'uploads', uploadedFile.filename);
    writeFile(newPath, uploadedFile.buffer, err => {
        if (err) throw err;
        console.log('File saved successfully:', newPath);
        res.send('File uploaded and processed successfully.');
    });
});

// Example route using router
const router = new Router();
router.get("/example", (req, res) => {
    res.json({ message: "Hello from the router!" });
});
server.use('/api', router);

// Handle all other routes with a 404
server.use("*", (req, res) => {
    res.html("Not Found");
});

// Start the server
server.listen(3000, () => {
    console.log('JetPress server running at http://localhost:3000');
});