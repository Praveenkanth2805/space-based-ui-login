from django.urls import path
from .views import login_view, forgot_password_view

urlpatterns = [
    path('login/', login_view, name='login'),
    path('forgot-password/', forgot_password_view, name='forgot-password'),
]