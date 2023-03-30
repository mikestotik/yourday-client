# YourdayClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## [SSL](https://msol.io/blog/tech/create-a-self-signed-ssl-certificate-with-openssl/)

To generate SS run next commands:

### Self Signed
```shell
openssl genrsa -out key.pem 2048
openssl req -new -sha256 -key key.pem -out csr.csr
openssl req -x509 -sha256 -days 365 -key key.pem -in csr.csr -out certificate.pem
openssl req -in csr.csr -text -noout | grep -i "Signature.*SHA256" && echo "All is well" || echo "This certificate will stop working in 2024! You must update OpenSSL to generate a widely-compatible certificate"
```
- Country Name (2 letter code): The two-letter country code where your company is legally located.
- State or Province Name (full name):	The state/province where your company is legally located.
- Locality Name (e.g., city):	The city where your company is legally located.
- Organization Name (e.g., company):	Your company's legally registered name (e.g., YourCompany, Inc.).
- Organizational Unit Name (e.g., section):	The name of your department within the organization. (You can leave this option blank; simply press Enter.)
- Common Name (e.g., server FQDN):	The fully-qualified domain name (FQDN) (e.g., www.example.com).
- Email Address:	Your email address. (You can leave this option blank; simply press Enter.)
- A challenge password:	Leave this option blank (simply press Enter).
- An optional company name:	Leave this option blank (simply press Enter).


### Certbot
```shell
sudo certbot certonly --agree-tos --no-eff-email --staple-ocsp -d yourday.me
```
