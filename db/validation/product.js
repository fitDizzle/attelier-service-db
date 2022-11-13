const Product = {
  "id": null,
  "campus": null,
  "name": null,
  "slogan": null,
  "description": null,
  "category": null,
  "default_price": null,
  "created_at": {
    default: new Date(),
  },
  "updated_at": {
    default: new Date(),
  },
  "features": [],
  "results": []
};

module.exports = { Product };

// db.createCollection("students", {
//   validator: {
//      $jsonSchema: {
//         bsonType: "object",
//         title: "Product Object Validation",
//         required: [ "address", "major", "name", "year" ],
//         properties: {
//            name: {
//               bsonType: "string",
//               description: "'name' must be a string and is required"
//            },
//            year: {
//               bsonType: "int",
//               minimum: 2017,
//               maximum: 3017,
//               description: "'year' must be an integer in [ 2017, 3017 ] and is required"
//            },
//            gpa: {
//               bsonType: [ "double" ],
//               description: "'gpa' must be a double if the field exists"
//            }
//         }
//      }
//   }
// } )