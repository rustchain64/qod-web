# qod-web

Quote of the Day web front end

### Ports
This web service listens on port `8080`. Please set the service for this deployment to use port 8080, and to open any route or ingress to use this port too. This is the default for deployments through OpenShift.

### Environment Variables
This deployment requires a single environment variable to access the qod-api deployment:
- **VUE_APP_QOD_API_URL** - the URL of the API service for the Quote of the Day application, usually 'http://' or 'https://' then the name of the service and the port (ie `http://qod-api:8080`) - DO NOT USE trailing slash at the end (ie `http://qod-api:8080/`). Typically, in case of OpenShift this URL will be the route URL of the QOD API service.


# vue-openshif

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

########################################################################################
# example creates table successfully in PsQl
CREATE TABLE users
(
  id bigserial NOT NULL,
  firstName text NOT NULL,
  lastName text NOT NULL,
  username text NOT NULL,
  agentCode text NOT NULL,
  persona text NOT NULL,
  hash text NOT NULL,
  password text NOT NULL,
  CONSTRAINT user_pkey PRIMARY KEY (id)
);


    persona: { type: String, required: true },
    agentCode: { type: String, optional: true },
    username: { type: String, unique: true, required: true },
   
    hash: { type: String, required: true },
   
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }


SELECT * FROM users WHERE id='3'
('Carson', 'Cook', 'captain', 'testcode', 'admin', 'cook', 'cook1234'),
# #########################################################################
POSTGRESS USERS TABLE
INSERT INTO users (firstName,lastName,username,agentCode,persona,hash,password)
VALUES
('James', 'Bond', 'secret', 'testcode', 'agent', 'agent','agent123'),
('Super', 'Admin', 'superman', 'testcode', 'admin', 'hero123', 'hero1234'),
('Carson', 'Cook', 'captain', 'testcode', 'admin', 'cook', 'cook1234'),
('Briton', 'Stender', 'thai', 'testcode', 'admin', 'land', 'land1234'),
('Whan', 'Valdez', 'oil', 'testCode', 'admin', 'tanker', 'tanker1234');

INSERT INTO users (firstName,lastName,username,agentCode,persona,hash,password)
VALUES
('Peter', 'Sellers', 'funny', 'testCode', 'merchant', 'fun', 'fun123');

# ##############################################################################
POSTGRESS REFERRAL TABLE
INSERT INTO referrals (yourName,referralName,agentName,agentCode,businessName,phone,email,ss,bankName,routingNumber,accountNumber,title,description,published)
 VALUES
 ('Wesley Parr', 'James Conn', 'James Bond', 'tempCode', 'ACME GUN SUPPLY', '9997775555', 'conn@gmail.com', '444556666', 'Wells Fargo', '123000876', '1111222233334444', 'Western Flicks', 'Gun Slingers', false),
 ('Wesley Parr', 'Brendon Frazier', 'James Bond', 'tempCode', 'ACME MUMMY SUPPLY', '9997775555', 'bfrazier@gmail.com', '444556666', 'Wells Fargo', '123000876', '5555222233334444', 'Adventure Movies', 'Adventure Guy', false);


# #####################################################################################################
POSTGRES REFERRALS TABLE
CREATE TABLE referrals
(
  id bigserial NOT NULL,
  yourName text NOT NULL,
  referralName text NOT NULL,
  agentName text NOT NULL,
  agentCode text NOT NULL,
  businessName text NOT NULL,  
  phone text NOT NULL,
  email text NOT NULL,
  ss text NOT NULL,
  bankName text NOT NULL,
  routingNumber text NOT NULL,
  accountNumber text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  published text NOT NULL,
  CONSTRAINT referral_pkey PRIMARY KEY (id)
);


# #######################################################################################


********************************************************************************************

 INSERT INTO referrals (id, yourName, referralName, agentName, agentCode, businessName, phone, email, ss, bankName, routingNumber, accountNumber, title, description, published)

 INSERT INTO referrals (id,yourName,referralName,agentName,agentCode,businessName,phone,email,ss,bankName,routingNumber,accountNumber,title,description,published)
 VALUES
 (1, 'Wesley Parr', 'James Conn', 'James Bond', 'tempCode', 'ACME GUN SUPPLY', '9997775555', 'conn@gmail.com', '444556666', 'Wells Fargo', '123000876', '1111222233334444', 'Western Flicks', 'Gun Slingers', false),
 (2, 'Wesley Parr', 'Brendon Frazier', 'James Bond', 'tempCode', 'ACME MUMMY SUPPLY', '9997775555', 'bfrazier@gmail.com', '444556666', 'Wells Fargo', '123000876', '5555222233334444', 'Adventure Movies', 'Adventure Guy', false);

var record= { yourName: 'Rahul', referralName: 'Rahul', agentName: 'Kumar', email: 'abc@domain.com' };
var record= { (yourName: "Brian James", referralName: "Glen Armstrong", agentName: "Sharon Stone", agentCode: "temCode", businessName: "Spade Junkers", phone: "3334445566", email: "glen@gmail.com", ss: "333547788", bankName: "Sterling", routingNumber: "145000654", accountNumber: "654364757533", title: "car dealer", descriptio: "shady charachter", published: false }
 **********************************************************************************************************
