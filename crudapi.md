# CRUD API:

### **Create a review**
  * POST `/api/review-listings/:id/reviews`

**Path Parameters:**
  * `id` listing id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "name": "String",
      "email": "String",
      "avatar_url": "String",
      "address": "String",
      "listing_id": "Number",
      "text": "String",
      "date": "String",
      "ratings": {
        "cleanliness": "Number",
        "communication": "Number",
        "check-in": "Number",
        "accuracy": "Number",
        "location": "Number",
        "value": "Number"
      }
    }
```


### **Get a listing's reviews**
  * GET `/api/review-listings/:id/reviews`  

**Path Parameters:**
  * `id` listing id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "id": "Number",
      "address": "String",
      "reviews": [{
        "review": {
          "listing_id": "Number",
          "text": "String",
          "date": "String"
        },
        "user": {
          "name": "String",
          "email": "String",
          "avatar_url": "String"
        },
        "ratings": {
          "cleanliness": "Number",
          "communication": "Number",
          "check-in": "Number",
          "accuracy": "Number",
          "location": "Number",
          "value": "Number"
        }
      }]
    }
```


### **Update review info**
  * PUT `/api/review-listings/:id/reviews/:id`

**Path Parameters:**
  * `id` listing id
  * `id` review id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "text": "String",
      "ratings": {
        "cleanliness": "Number",
        "communication": "Number",
        "check-in": "Number",
        "accuracy": "Number",
        "location": "Number",
        "value": "Number"
      }
    }
```


### **Delete review**
  * DELETE `/api/review-listings/:id/reviews/:id`

**Path Parameters:**
  * `id` listing id
  * `id` review id

**Success Status Code:** `204`
