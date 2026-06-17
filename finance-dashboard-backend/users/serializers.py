from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    """Used for listing and retrieving users."""
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'role', 'is_active', 'date_joined']
        read_only_fields = ['id', 'date_joined']

class UserCreateSerializer(serializers.ModelSerializer):
    """Used for creating users with a password."""
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'role', 'password']

    def create(self, validated_data):
        # We use create_user to ensure the password gets hashed!
        return User.objects.create_user(**validated_data)

class ChangePasswordSerializer(serializers.Serializer):
    """Used for the /me/change-password/ endpoint."""
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=8)