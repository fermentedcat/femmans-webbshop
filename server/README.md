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
> > GET /products/category/``<KATEGORIID>``
> #### Respons
>       [
>        {
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
>        }
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