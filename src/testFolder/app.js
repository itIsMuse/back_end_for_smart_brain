import http from 'http'; // Corrected the import syntax

// Create the server
const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' }); // Set response headers
    res.end('Hi there'); // Send response and end the request
});

// Start the server and listen on port 4000

const port = process.env.port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

