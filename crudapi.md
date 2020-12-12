# CRUD API:

### **Create a review**
  * POST `/api/listings/:listing_id/reviews`

**Path Parameters:**
  * `listing_id` listing id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "name": "String",
      "email": "String",
      "avatar_url": "String",
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
  * GET `/api/listings/:listing_id/reviews`  

**Path Parameters:**
  * `listing_id` listing id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "listing_id": "Number",
      "address": "String",
      "reviews": [{
        "review": {
          "review_id": "Number",
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
  * PUT `/api/listings/:listing_id/reviews/:reviews_id`

**Path Parameters:**
  * `listing_id` listing id
  * `reviews_id` review id

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
  * DELETE `/api/listings/:listing_id/reviews/:reviews_id`

**Path Parameters:**
  * `listing_id` listing id
  * `reviews_id` review id

**Success Status Code:** `204`
