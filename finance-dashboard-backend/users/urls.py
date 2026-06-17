from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
# This handles /api/users/ and /api/users/<id>/
router.register(r'', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
]