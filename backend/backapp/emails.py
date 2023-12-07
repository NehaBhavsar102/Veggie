from django.core.mail import send_mail
from django.conf import settings
import random
def send_otp_via_email(email):
    subject = "Veggie Sign Up"
    otp=random.randint(1000,9999)       
    message = f"Your OTP is {otp}"
    from_email = settings.EMAIL_HOST
    to_email = [email]
    send_mail(subject, message, from_email, to_email)