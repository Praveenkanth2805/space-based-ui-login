from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'success': False, 'message': 'Username and password required'}, status=400)

    user = authenticate(username=username, password=password)
    if user is not None:
        return Response({
            'success': True,
            'message': f'Welcome back, {username}! 🚀'
        })
    return Response({
        'success': False,
        'message': 'Invalid credentials. Try again!'
    }, status=401)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not all([username, email, password]):
        return Response({'success': False, 'message': 'All fields are required'}, status=400)

    if len(password) < 6:
        return Response({'success': False, 'message': 'Password must be at least 6 characters'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'success': False, 'message': 'Username already taken'}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({'success': False, 'message': 'Email already taken'}, status=400)

    try:
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        user.save()
        return Response({
            'success': True,
            'message': 'Account created successfully!'
        })
    except ValidationError as e:
        return Response({'success': False, 'message': str(e)}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password_view(request):
    email = request.data.get('email')
    if not email:
        return Response({'success': False, 'message': 'Email is required'}, status=400)

    # For now just fake success - in real app send email here
    return Response({
        'success': True,
        'message': 'Reset instructions sent to your email!'
    })