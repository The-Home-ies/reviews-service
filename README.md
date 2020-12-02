# spicy boiz - rareBnB

> Project description

## Related Projects

  - https://github.com/spicy-boiz/photo-carousel-service
  - https://github.com/spicy-boiz/reservations-service
  - https://github.com/spicy-boiz/places-to-stay-service
  - https://github.com/spicy-boiz/reviews-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```


# Ricky's CRUD API:

Method:
`POST`
Endpoint:
`/api/review-listings/post`
Path params:
`none`
Request body:
Response object:

Method:
`GET`
Endpoints:
`/api/review-listings/reviews`
`/api/review-listings/:id/reviews`
Path params:
`id`
Request body:
Response object:
```json
{
  reviews: [
    {...}, {...}, {
      id: 1,
      review: {
        id: 1,
        listing_id: 10,
        text: "...",
        date: "September 2017"
      },
      user: {
        name: "Mike",
        email: "email@gmail.com",
        avatar_url: "..."
      },
      ratings: {
        cleanliness: 6,
        communication: 6,
        check-in: 3,
        accuracy: 3,
        location: 4,
        value: 6
      }
    }
  ],
  id: 1
}
```

Method:
`PUT`
Endpoint: 
`/api/review-listings/reviews/:id/update`
Path params:
Request body:
Response object:

Method:
`DELETE`
Endpoint: 
`/api/review-listings/reviews/:id/delete`
Path params:
Request body:
Response object: