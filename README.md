# Secure Cypher

Secure Cypher is a web application that leverages hybrid cryptography to provide secure file encryption and decryption. This project was created as a personal endeavor to enhance my knowledge in cryptography and backend development. It incorporates React, TypeScript, Vite, and Shadcn for beautifully designed components.

## Features

- **File Encryption**: Secure Cypher allows users to encrypt their files using hybrid cryptography techniques. Files are encrypted on the client-side for enhanced security.

- **Client-Side Password Generation**: The application generates file passwords on the client-side, ensuring that the server never has access to the decryption keys.

- **Customizable Components**: It makes use of Shadcn components, which are accessible and customizable. You can easily integrate these components into your applications.

## Getting Started

To get started with Secure Cypher, follow these steps:

1. Visit the live demo: [https://secure-cipher.vercel.app/](https://secure-cipher.vercel.app/).

2. Note that some features may require you to allow insecure content in your browser settings since the API used on AWS is hosted on an HTTP server, not HTTPS.

3. Upload the file you want to encrypt.

4. Enter a password for the file or click the button for a randomly generated password. This password is generated on the client-side.

5. This password will be used to generate the private and public keys

6. Click the "Encrypt" button to encrypt the file.

7. Download the password and the private key for decryption.

8. To decrypt the file, upload the encrypted file and provide the password and private key.

## Technologies Used

- React
- TypeScript
- Vite
- Shadcn (Beautifully designed components)
- AWS (for hosting)

## Security

Secure Cypher takes security seriously by performing client-side encryption and ensuring that decryption keys are never transmitted to the server. However, please be aware of the limitations due to the HTTP server hosting the API.

## Contributing

Contributions are welcome! If you'd like to contribute to Secure Cypher, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is open-source and available under the [MIT License](LICENSE).

## Contact

If you have any questions or suggestions, feel free to contact us at [aidelojejoshua@gmail.com](mailto:aidelojejoshua@gmail.com).
