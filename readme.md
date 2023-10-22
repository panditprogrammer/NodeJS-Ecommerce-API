<!-- get routes  -->
## Get all Products
 /products

## Get all Products by price 
 /products?price=min&price=max

## Get all Products Filter by Categories and price
/products?categories=id1,id2,idN?price=min&price=max

## Get all Products Filter by Brand 
/products/brand/brandname

## Get all Products Filter by Brand and category
/products/brand/brandname?categories=id1,id2,idN

## Get all Products Filter by Brand and category and price
/products/brand/brandname?categories=id1,id2,idN?price=min&price=max

## Get all Products Filter by Brand and Price 
/products/brand/brandname?price=min&price=max


## get single product by id
/products/:id

## Get only Featured Products
/products/get/featured

## Filter featured products by Categories
/products/get/featured?categories=id1,id2,idN

## Filter featured products by Brand
/products/get/featured/brand/brandname