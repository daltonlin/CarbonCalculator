from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('user/<str:user_name>/', views.profile_view, name='profile_detail'),
    path("users/ref", views.ref_view, name="ref"),

    # API Routes
    path("new", views.save, name="save"),
]
