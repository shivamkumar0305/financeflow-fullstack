from django_filters import rest_framework as filters
from .models import FinancialRecord

class FinancialRecordFilter(filters.FilterSet):
    date_after = filters.DateFilter(field_name="date", lookup_expr='gte')
    date_before = filters.DateFilter(field_name="date", lookup_expr='lte')
    amount_min = filters.NumberFilter(field_name="amount", lookup_expr='gte')
    amount_max = filters.NumberFilter(field_name="amount", lookup_expr='lte')

    class Meta:
        model = FinancialRecord
        fields = ['transaction_type', 'category']