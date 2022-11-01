<center><h1>SparkStore (E-commerce Application)</h1></center>

### Abstract:
Increasingly, people are shifting from offline markets to online markets as new websites cater to commercial transactions over the web. The “SparkStore” project is an e-commerce web application that enables consumers to sell and buy electronic goods online. The system is implemented using a 3-tier approach, with a backend database using MySQL, server-side using JavaScript framework (Node.js), and a web browser as the front-end client. The project majorly focuses on the data collections, operations, and business rules/policies for the Frontend Webpages, role-based privileges to the user, Cart Management, Order management, Payment Management, and Content Moderation.

---
## Setup

### To run server:

```sh
cd server
```
### Install packages 
```sh
npm install
```

### Run development

```sh
npm run dev
```

### Run production
```sh
npm run start
```

---

## API Routes:

### API overview: `/api/v1`

### Orders: 
   1. `/api/v1/orders`
   * GET (READ all)
   2. `/api/v1/orders/:Order_ID`
   * GET (READ one)
   3. `/api/v1/orders/?search=`
   * GET (READ -> search DB)
   4. `/api/v1/orders/create`
   * POST (Create one)
   5. `/api/v1/orders/edit/:Order_ID`
   * PUT (Edit one)
