# Femmans webbshop API

## Introduktion
> Detta API används för att CRUDA **Femmans** webbshop. I denna guide ska vi gå igenom allt du behöver veta för att använda detta API.

## Bas-URL
> http://localhost:3000/api

## Autentisering
> Just nu finns ingen autentisering men det kommer.

## Metoder
> # Produkter 
> ## Få alla produkter
> Den här endpointen ger dig en array med alla produkter.
> #### HTTP-anrop
> > GET /products
> #### Respons
>        [
>         {
>           "_id": "Produktid",
>           "title": "Produktnamn",
>           "description": "Beskrivning av produkt.",
>           "price": 3000,
>           "brand": "Märke på produkt",
>           "categories": [
>             {
>               "_id": "Kategoriid",
>               "title": "Kategorinamn",
>               "thumbnail": "URL till bild",
>               "description": "Beskrivning av kategori",
>               "__v": 0
>             }
>           ],
>           "weight": 10,
>           "photos": [
>             "URL till bild"
>           ],
>           "__v": 0
>         },
>        ]
> ## Få specifik produkt
> Den här endpointen ger dig ett objekt med önskad produkt.
> #### HTTP-anrop
> > GET /products/``<PRODUKTID>``
> #### Respons
>       {
>         "_id": "Produktid",
>         "title": "Produktnamn",
>         "description": "Beskrivning av produktt",
>         "price": 3000,
>         "brand": "Märke på produkt",
>         "categories": [
>           {
>             "_id": "Kategoriid",
>             "title": "Kategorinamn"
>           }
>         ],
>         "weight": 10,
>         "photos": [  
>           "URL till bild"  
>         ],
>         "__v": 0
>       }
> ## Få produkter i önskad kategori
> Den här endpointen ger dig en array med produkter som tillhör önskad kategori.
> #### HTTP-anrop
> > GET /products/category/``<KATEGORINAMN>``
> #### Respons
>       [
>        {
>         "_id": "Produktid",
>         "title": "Produktnamn",
>         "description": "Beskrivning av produkt",
>         "price": 3000,
>         "brand": "Märke på produkt",
>         "categories": [
>           {
>             "_id": "Kategoriid",
>             "title": "Kategorinamn"
>           }
>         ],
>         "weight": 10,
>         "photos": [  
>           "URL till bild"  
>         ],
>         "__v": 0
>        }
>       ]
> ## Sök produkt
> Den här endpointen ger dig en array med produkter som stämmer överens med medskickat sökord
> #### HTTP-anrop
> > GET /products/search?search=``<SÖKORD>``
> #### Respons
>       [
>         {
>           "_id": "Produktid",
>           "title": "Produktnamn",
>           "description": "Beskrivning av produkt",
>           "price": 395,
>           "brand": "Märke på produkt",
>           "categories": [
>               {
>                 "_id": "kategoriid",
>                 "title": "Kategorinamn",
>                 "thumbnail": "https://alphaspel.se/media/products/thumbs/ede9befd-07c4-46ac-a22a-c1c535a87ca4.300x300_q50_fill.png",
>                 "description": "Beskrivning av kategori",
>                 "createdAt": "Tidpunkt för skapandet av kategorin",
>                 "updatedAt": "Tidpunkt för senaste ändring av kategorin",
>                 "__v": 0
>               }
>             ],
>           "weight": 3,
>           "photos": [
>             "URL till bild"
>            ],
>           "createdAt": "Tidpunkt för skapandet av kategorin",
>           "updatedAt": "Tidpunkt för senaste ändring av kategorin",
>           "__v": 0
>         }
>       ]
> ## Lägga till ny produkt
> Den här endpointen skapar en produkt med inmatad data.
> #### Data som förväntas
> > title, description, price, brand, categories, weight och photos
> #### HTTP-anrop
> > POST /products
> ## Uppdatera befintlig produkt
> Den här endponten uppdaterar en befintlig produkt.
> #### HTTP-anrop
> > POST /products/``<PRODUKTID>``
> ## Ta bort produkt 
> Den här endpointen tar bort önskad produkt.
> #### HTTP-anrop
> > DELETE /products/``<PRODUKTID>``
> # Ordrar
> ## Få alla ordrar
> Den här endpointen ger dig en array med alla ordrar.
> #### HTTP-anrop
> > GET /orders
> #### Respons
>        [
>         {
>           "address": {
>             "street": "Gatuadress",
>             "postalCode": "00000",
>             "city": "Stad",
>             "country": "Land"
>           },
>           "_id": "Orderid",
>           "user": {
>             "address": {
>               "street": "Gatuadress",
>               "postalCode": "00000",
>               "city": "stad",
>               "country": "Land"
>             },
>             "_id": "Användarid",
>             "fullName": "Användares fulla namn",
>             "displayName": "Namn",
>             "email": "mail@mail.com",
>             "role": "admin",
>             "__v": 0
>           },
>           "orderRows": [
>             {
>               "product": {
>                 "_id": "Produktid",
>                 "title": "Produktnamn",
>                 "description": "Produktbeskrivning",
>                 "price": 3000,
>                 "brand": "Produktmärke",
>                 "categories": [
>                   "Kategoriid"
>                 ],
>                 "weight": 10,
>                 "photos": [            
>                 ],
>                 "__v": 0
>               },
>               "amount": 1,
>               "priceEach": 1000000,
>               "_id": "Orderradsid"
>             }
>           ],
>           "status": "Registered",
>           "shippingPrice": 0,
>           "__v": 0
>         }
>       ]
> ## Få specifik order
> Den här endpointen ger dig ett objekt med önskad order
> #### HTTP-anrop
> > GET /orders/``<ORDERID>``
> #### Respons
>       {
>         "address": {
>           "street": "Gatuadress",
>           "postalCode": "00000",
>           "city": "Stad",
>           "country": "Land"
>         },
>         "_id": "Orderid",
>         "user": {
>           "address": {
>             "street": "Gatuadress",
>             "postalCode": "00000",
>             "city": "stad",
>             "country": "Land"
>           },
>           "_id": "Användarid",
>           "fullName": "Användares fulla namn",
>           "displayName": "Namn",
>           "email": "mail@mail.com",
>           "role": "admin",
>           "__v": 0
>         },
>         "orderRows": [
>           {
>             "product": {
>               "_id": "Produktid",
>               "title": "Produktnamn",
>               "description": "Produktbeskrivning",
>               "price": 3000,
>               "brand": "Produktmärke",
>               "categories": [
>                 "Kategoriid"
>               ],
>               "weight": 10,
>               "photos": [            
>               ],
>               "__v": 0
>             },
>             "amount": 1,
>             "priceEach": 1000000,
>             "_id": "Orderradsid"
>           }
>         ],
>         "status": "Registered",
>         "shippingPrice": 0,
>         "__v": 0
>       }
> ## Få alla ordrar för specifik användare
> Den här endpointen ger en array med alla ordrar för specifik användare
> #### HTTP-anrop
> > GET /order/users
> #### Respons
>      [
>          {
>              "address": {
>                  "street": "Angiven gata och gatunummer",
>                  "postalCode": "Postkod",
>                  "city": "Stad",
>                  "country": "Land"
>              },
>              "_id": "orderid",
>              "user": "användarid",
>              "orderRows": [
>                  {
>                      "productTitle": "Produktnamn",
>                      "amount": Antal,
>                      "priceEach": Pris,
>                      "_id": "Orderradens id"
>                  },
>              ],
>              "status": "Orderns status",
>              "shippingPrice": Fraktkostnad,
>              "createdAt": "Tidpunkt för när orderns skapades",
>              "updatedAt": "Tid punkt för senast ändring av ordern",
>              "__v": 0
>          }
>      ]
> ## Lägga till order
> Den här endpoint skapar en ny order
> #### Data som förväntas
> > user, orderRows[{product, amout, priceEach}], address{street, postalCode, city, country}, shippingPrice
> #### HTTP-anrop
> > POST /orders
> ## Uppdatera befintlig order
> Den här endpointen uppdaterar en befintlig order
> #### HTTP-anrop
> > POST /orders/``<ORDERID>``
> ## Ta bort order
> #### HTTP-anrop
> > DELETE /orders/``<ORDERID>``
> # Kategorier
> ## Få alla kategorier
> Den här endpointen ger dig en array med alla kategorier
> #### HTTP-anrop
> > GET /categories
> #### Respons
>       [
>         {
>           "_id": "Kategoriid",
>           "title": "Kategorinamn",
>           "thumbnail": "URL till bild",
>           "description": "Kategoribeskrivning",
>           "__v": 0
>         }
>       ]
> ## Få specifik kategori
> Den här endpointen ger dig ett objekt med önskad kategori
> #### HTTP-anrop
> > GET /categories/``<KATEGORIID>``
> #### Respons
>       {
>         "_id": "Kategoriid",
>         "title": "Kategorinamn",
>         "thumbnail": "URL till bild",
>         "description": "Kategoribeskrivning",
>         "__v": 0
>       }
> ## Lägga till kategori
> Den här endpointen skapar en ny kategori
> #### Data som förväntas
> > title, thumbnail, description
> #### HTTP-anrop
> > POST /categories
> ## Uppdatera befintlig kategori
> Den här endpointen uppdaterar en befintlig kategori
> #### HTTP-anrop
> > POST /categories/``<KATEGORIID>``
> ## Ta bort kategori
> Den här enpointen tar bort en specifik kategori
> #### HTTP-anrop
> > DELETE /categories/``<KATEGORIID>``
> # Användare
> ## Få alla användare
> Den här endpointen ger dig en array med alla användare
> #### HTTP-anrop
> > GET /users
> #### Respons
>       [
>         {
>           "_id": "Användarid",
>           "email": "Användares mail",
>           "fullName": "Användares fulla namn",
>           "role": "admin"
>         }
>       ]
> ## Få specifik användare
> Den här enpointen ger dig ett objekt med en önskad användare
> #### HTTP-anrop
> > GET /users/``<ANVÄNDARID>``
> #### Respons
>        {
>          "_id": "Användarid",
>          "email": "Användares mail",
>          "fullName": "Användares fulla namn",
>          "role": "admin"
>        }
> ## Lägga till användare
> Den här enpointen skapar en ny användare
> #### Data som förväntas
> > fullName, displayName, password, email, address{street, postalCode, city, country}
> #### HTTP-anrop
> > POST /users
> ## Uppdatera befintlig användare
> Den här endpointen uppdaterar en befintlig användare
> #### HTTP-anrop
> > POST /users/``<ANVÄNDARID>``
> ## Ta bort användare
> Den här endpointen tar bort en specifik användare
> #### HTTP-anrop
> > DELETE /users/``<ANVÄNDARID>``
> ## Få inloggad användare
> Få inloggad användare
> #### HTTP-anrop
> > GET /users/tokenUser
> #### Respons
>      {
>          "address": {
>              "street": "Gatuadress",
>              "postalCode": "Postkod",
>              "city": "Stad",
>              "country": "Land"
>          },
>          "_id": "användarid",
>          "fullName": "Användarens namn",
>          "displayName": "Användarnamn",
>          "password": "krypterat lösenord",
>          "email": "mail",
>          "role": "roll",
>          "cart": [],
>          "createdAt": "Tidpunkt för när användaren skapades",
>          "updatedAt": "Tidpunkt för senast ändring av användaren",
>          "__v": 0
>      }
> ## Logga in
> Om inskickade värden är godkända erhålls en JWT
> #### Data som förväntas
> > email, password
> #### HTTP-anrop
> > POST /users/login
> ## Validera erhållen JWT
> Skicka erhållen token och du får statuskod 202 om den är ok
> #### HTTP-anrop
> > POST /users/auth
> ## Få Kundvagn
> > Få inloggad användares kundvagn i form av en array
> #### HTTP-anrop
> > GET /users/cart
> #### Respons
>      {
>          "_id": "Användarid",
>          "cart": [
>              {
>                  "product": {
>                      "_id": "produktid",
>                      "title": "Produktnamm",
>                      "description": "Produktbeskrivning",
>                      "price": Pris,
>                      "brand": "Produktens märke",
>                      "categories": [array med kategoriid],
>                      "weight": vikt,
>                      "photos": [Url till bild],
>                      "createdAt": "Tidpunkt för när produktens skapades",
>                      "updatedAt": "Tid punkt för senast ändring av produkten",
>                      "__v": 0
>                  },
>                  "amount": 1
>              }
>          ]
>      }
> ## Lägg till produkt i kundvagnen
> Lägg till vara i inloggad användares kundvagn
> #### HTTP-anrop
> > POST /users/cart/``<PRODUKTID>``
> ## Uppdatera kundvagn
> Uppdatera befintlig produkt i kundvagn
> #### Data som förväntas
> amount
> #### HTTP-anrop
> > POST /users/update/cart/``<PRODUKTID>``
> ## Ta bort produkt från kundvagn
> Ta bort specifik produkt from inloggad användares kundvagn
> #### HTTP-anrop
> > DELETE /users/``<PRODUKTID>``
> ## Töm kundvagn
> Töm inloggad användares kundvagn
> #### HTTP-anrop
> > POST /users/cart/empty