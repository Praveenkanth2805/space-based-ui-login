from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'success': False, 'message': 'Username and password required!'}, status=400)

    user = authenticate(username=username, password=password)
    if user is not None:
        return Response({
            'success': True,
            'message': 'Welcome back, Astronaut! 🚀'
        })
    return Response({
        'success': False,
        'message': 'Invalid credentials. Try again!'
    }, status=401)


@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password_view(request):
    email = request.data.get('email')
    if not email:
        return Response({'success': False, 'message': 'Email is required!'}, status=400)

    # In production: send real email with reset link
    return Response({
        'success': True,
        'message': 'Reset instructions sent to your cosmic email! 📧'
    })