import os
import smtplib

def send_email(reciever_email, otp):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(os.getenv('FLASK_APP_EMAIL'), os.getenv('FLASK_APP_PASSWORD'))
    message = f"Your OTP is {otp}"
    print(message)
    server.sendmail(os.getenv('FLASK_APP_EMAIL'), reciever_email, message)