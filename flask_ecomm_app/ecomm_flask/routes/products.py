from ecomm_flask.models import Products
from ecomm_flask import app
import json
#route to get products by id
@app.route('/products/<id>')
def get_product_by_id(id):
    product = Products.query.get(int(id))
    return product.to_json()

#route to get all products
@app.route('/products')
def get_all_products():
    products = Products.query.all()
    res = []
    if products:
        for product in products:
            pro_dict= {
            "id": product.id,
            "product_name": product.product_name,
            "product_description": product.product_description,
            "product_img": product.product_img,
            "product_price": product.product_price
            }
            res.append(pro_dict)

    print(res)
    return json.dumps(res)
