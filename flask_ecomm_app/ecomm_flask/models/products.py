from ecomm_flask import db 
from ecomm_flask import app

#user model for database
class Products(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(80), nullable=False)
    product_description = db.Column(db.String(80), nullable=False)
    product_img = db.Column(db.String(120), nullable=False)
    product_price = db.Column(db.Integer, primary_key=False)
    
    def __init__(self,product_name,product_description,product_img,product_price) -> None:
        self.product_name = product_name
        self.product_description = product_description
        self.product_img = product_img 
        self.product_price = product_price

    def __repr__(self) -> str:
        return f"<User {self.product_name}>"