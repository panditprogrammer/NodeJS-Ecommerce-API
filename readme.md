<!-- get routes  -->
# An Ecommerce Restful API created by Pandit Programmer using NodeJS (ExpressJS) and MongoDB Database 

## POST 

- Create New Product

```
/products
```

use these fields to create new product


```
{
   "name": "",
    "description":"",
    "richDescription": "",
    "image": [],
    "brand": "",
    "price": Number,
    "category": "document_id",
    "stock": number,
    "rating": number,
    "review": number,
    "featured": false
}
```

## GET

-  Get all Products

 ```
 /products
 ```

-  get single product by id

```
/products/:id
```

## Filter Products with query parameters

- Filter products by category (id)

```
/products?categories=id1,id2,idN
```

- Filter Products by Brands

```
/products?brands=intel
```

- Filter Products by featured (true, false)

```
/products?featured=true
```

- Filter products by Price range

```
/products?min=500&max=1500
```

-- Limit and offset Products list

```
/products?limit=10&offset=5
```


## PUT 

- Update Product by id

```
/products/:id
```

## DELETE

- Delete one or more product(s) by id
```
/products/delete?id=id1,id2,idN
```

- Delete all products at once
```
/products/delete
```



# Category Routes

Here is the Supported HTTP Routes (GET, POST, PUT and DELETE) for category

- Create New Category

## POST
```
/categories
```


## GET
- Get all Categories

```
/categories
```

- Get Single Category by id

```
/categories/:id
```

## PUT

- Update single category by id 

```
/categories/:id
```

## DELETE

- Delete one or more Categories  

```
/categories/delete?id=id1,id2,idN
```

- Delete all at once

```
/categories/delete
```
