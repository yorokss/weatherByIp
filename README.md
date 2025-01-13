Weather By IP

Weather By IP is a simple Node.js application that fetches weather information based on the IP address provided. The project includes an API endpoint that takes an IP address as input and returns weather details for the corresponding location.

Features

Retrieve weather details using an IP address.

Easy integration with any application or system.

Lightweight and fast API calls using axios.

Installation

Clone the repository from GitHub:

git clone https://github.com/yorokss/weatherByIp.git

Navigate to the project directory:

cd weatherByIp

Install the required dependencies:

npm install

Start the application:

node app.js

Usage

To fetch weather information using the API:

Request

Make a GET request to the following endpoint:

http://localhost:5000/api/weather-by-ip?ip=<IP_ADDRESS>

Replace <IP_ADDRESS> with the IP address you want to fetch the weather information for.

Example

Here is an example using axios:

const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:5000/api/weather-by-ip?ip=110.224.237.122',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

Response

The API will return a JSON object containing weather information for the specified IP address.

Running Tests

If you want to run the test cases for this project, follow these steps:

Make sure you have installed all dependencies:

npm install

Run the code  using the following command:

npx nodemon

Run the test cases using the following command:

npm test

This will execute the predefined test suite and output the results.

Repository

You can find the source code on GitHub:

Weather By IP GitHub Repository

Contributing

Contributions are welcome! If you find any issues or have suggestions, feel free to create a pull request or open an issue in the GitHub repository.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Enjoy using Weather By IP!

