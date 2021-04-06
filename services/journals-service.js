// /*
// Journal{
//     _id
//     title
//     text
//     author
//     date
//     liker
//     placeDetails
//
// }
// https://maps.googleapis.com/maps/api/place/details/json?language=en&field=name,address_component,formatted_address,geometry,photo,place_id,type&place_id=ChIJ9T_5iuTKj4ARe3GfygqMnbk&key=AIzaSyALbP3N77VMBFd7FxF2ppkLc9qpjjZ8qL4
//  */
// const {Client} = require("@googlemaps/google-maps-services-js")
//
// const client = new Client({});
//
// client.placeDetails({
//                         params: {
//                             language: "en",
//                             field: "name,address_component,formatted_address,geometry,photo,place_id,type",
//                             place_id: "ChIJ9T_5iuTKj4ARe3GfygqMnbk",
//                             key: "AIzaSyALbP3N77VMBFd7FxF2ppkLc9qpjjZ8qL4"
//                         },
//                         timeout: 1000
//                     }).then((r) => {
//     console.log(r);
// }).catch((e) => {
//     console.log(e.response);
// });
