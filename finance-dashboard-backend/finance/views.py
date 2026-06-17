from rest_framework import viewsets, filters as drf_filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import FinancialRecord
from .serializers import FinancialRecordSerializer
from .filters import FinancialRecordFilter
from users.permissions import IsAnalystOrAdmin, IsActiveUser

class FinancialRecordViewSet(viewsets.ModelViewSet):
    filter_backends = [DjangoFilterBackend, drf_filters.SearchFilter, drf_filters.OrderingFilter]
    filterset_class = FinancialRecordFilter
    search_fields = ['notes']
    ordering_fields = ['date', 'amount']
    ordering = ['-date']

    def get_queryset(self):
        # Always exclude soft-deleted records
        queryset = FinancialRecord.objects.filter(is_deleted=False)
        if self.request.user.is_authenticated:
            # Regular users only see their own records
            if self.request.user.role not in ['admin', 'analyst']:
                queryset = queryset.filter(created_by=self.request.user)
        return queryset

    def get_serializer_class(self):
        return FinancialRecordSerializer

    def get_permissions(self):
        return [IsActiveUser()]

    def perform_create(self, serializer):
        # Automatically set the creator from the request user
        serializer.save(created_by=self.request.user)

    def perform_destroy(self, instance):
        # Soft delete logic
        instance.is_deleted = True
        instance.save()