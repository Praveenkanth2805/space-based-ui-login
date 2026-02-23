from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
User = get_user_model()

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        return Response({'success': True, 'message': 'Login success!'})
    else:
        return Response({'success': False, 'message': 'Invalid credentials'})

@api_view(['POST'])
def forgot_password_view(request):
    email = request.data.get('email')
    if User.objects.filter(email=email).exists():
        # Normally we send email here
        return Response({'success': True, 'message': 'Reset email sent'})
    else:
        return Response({'success': False, 'message': 'Email not found'})