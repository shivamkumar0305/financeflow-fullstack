from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer, UserCreateSerializer, ChangePasswordSerializer
from .permissions import IsAdmin, IsActiveUser

class UserViewSet(viewsets.ModelViewSet):
    # FIXED: Corrected order_by syntax
    queryset = User.objects.all().order_by('-date_joined')
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        if self.action in ['me', 'change_password']:
            return [IsActiveUser()]
        return [IsAdmin()]

    def perform_destroy(self, instance):
        """Override delete to perform a soft-delete."""
        instance.is_active = False
        instance.save()

    @action(detail=False, methods=['get'], url_path='me')
    def me(self, request):
        """GET /api/users/me/"""
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='me/change-password')
    def change_password(self, request):
        """POST /api/users/me/change-password/"""
        serializer = ChangePasswordSerializer(data=request.data)
        # FIXED: Corrected is_valid syntax
        if serializer.is_valid(raise_exception=True):
            user = request.user
            if not user.check_password(serializer.validated_data['old_password']):
                return Response(
                    {"detail": "Old password is incorrect."}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)