from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
import json
import os.path
from django.contrib.auth.decorators import login_required


from .models import User, Trip


def index(request):

    #json_data = '/static/calculator/airport_data/data.json'
    #airports_data = json.loads(json_data)
    #json_data.close()


    f_path = os.path.abspath("calculator/static/calculator/airport_data/data.json")

    with open(f_path) as json_file:
        json_data = json.load(json_file)

    airports_data = json_data

    return render(request, "calculator/index.html", {
        "airports": airports_data,
    })


@login_required
def profile_view(request, user_name):
    requested_user = User.objects.get(username=user_name)
    trips = Trip.objects.all().filter(user=requested_user)

    return render(request, "calculator/user.html", {
        'trips': trips,
    })



def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "calculator/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "calculator/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "calculator/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "calculator/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "calculator/register.html")






