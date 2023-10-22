<!-- get routes  -->
# Product Routes 

## POST 
- Create New Product
`/products`

## GET
-  Get all Products
 `/products`

-  Get all Products by price 
 /products?price=min&price=max

-  Get all Products Filter by Categories and price
/products?categories=id1,id2,idN?price=min&price=max

-  Get all Products Filter by Brand 
/products/brand/brandname

-  Get all Products Filter by Brand and category
/products/brand/brandname?categories=id1,id2,idN

-  Get all Products Filter by Brand and category and price
/products/brand/brandname?categories=id1,id2,idN?price=min&price=max

-  Get all Products Filter by Brand and Price 
/products/brand/brandname?price=min&price=max


-  get single product by id
/products/:id

-  Get only Featured Products
/products/get/featured

-  Filter featured products by Categories
/products/get/featured?categories=id1,id2,idN

-  Filter featured products by Brand
/products/get/featured/brand/brandname

## DELETE

- Delete one or more product(s) by id
`/products/delete?id=id1,id2,idN`

- Delete all products at once
`/products/delete`

# Category Routes
Here is the Supported HTTP Routes (GET, POST, PUT and DELETE)

- Create New Category
`/categories`

- Get all Categories
`/categories`

- Get Single Category by id
`/categories/:id`

- Update single category by id 
`/categories/:id`

- Delete one or more Categories  
`/categories/delete?id=id1,id2,idN`

- Delete all at once
`/categories/delete`
