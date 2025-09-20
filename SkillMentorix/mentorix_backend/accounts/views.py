from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


# Create your views here.
def login_page(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        if not User.objects.filter(username=username).exists():
            messages.error(request, 'User does not exist. Please sign up.')
            return render(request, 'login_page.html')

        user = authenticate(request, username=username, password=password)
        if user is None:
            messages.error(request, 'Invalid username or password.')
            return render(request, 'login_page.html')
        else:
            # Start session
            login(request, user)
            request.session['username'] = user.username
            request.session.save()

        return render(request, 'login_page.html')
    return render(request, 'login_page.html')

def logout_page(request):
    logout(request)
    return render(request,'login_page.html')

def signup_page(request):
    if request.method == 'POST':
        name = request.POST.get('signupName')
        username = request.POST.get('signupUsername')
        password = request.POST.get('signupPassword')

        user = User.objects.filter(username=username)
        if user.exists():
            messages.info(request, 'Username already exists')
            return render(request,'signup_page.html')

        user = User.objects.create_user(
            first_name = name,
            username = username,
            )
        user.set_password(password)
        user.save()

        messages.info(request, "user created successfully")

    return render(request, 'signup_page.html')

