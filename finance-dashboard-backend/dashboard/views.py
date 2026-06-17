from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum, Count, Q
from django.db.models.functions import TruncMonth
from django.utils import timezone
from finance.models import FinancialRecord
from finance.serializers import FinancialRecordSerializer
from users.permissions import IsActiveUser

class DashboardBaseView(APIView):
    permission_classes = [IsActiveUser]

    def get_filtered_queryset(self, request):
        """Helper to apply user and date filters to the records."""
        queryset = FinancialRecord.objects.filter(is_deleted=False)
        
        # Regular users only see their own records
        if request.user.role not in ['admin', 'analyst']:
            queryset = queryset.filter(created_by=request.user)
            
        date_after = request.query_params.get('date_after')
        date_before = request.query_params.get('date_before')

        if date_after:
            queryset = queryset.filter(date__gte=date_after)
        if date_before:
            queryset = queryset.filter(date__lte=date_before)
        return queryset

class SummaryView(DashboardBaseView):
    def get(self, request):
        qs = self.get_filtered_queryset(request)
        stats = qs.aggregate(
            total_income=Sum('amount', filter=Q(transaction_type='income')),
            total_expenses=Sum('amount', filter=Q(transaction_type='expense')),
            record_count=Count('id')
        )
        
        income = stats['total_income'] or 0
        expenses = stats['total_expenses'] or 0
        
        return Response({
            "total_income": income,
            "total_expenses": expenses,
            "net_balance": income - expenses,
            "record_count": stats['record_count']
        })

class CategoryBreakdownView(DashboardBaseView):
    def get(self, request):
        qs = self.get_filtered_queryset(request)
        breakdown = qs.values('category').annotate(
            total=Sum('amount'),
            count=Count('id')
        ).order_by('-total')
        return Response(breakdown)

class MonthlyTrendsView(DashboardBaseView):
    def get(self, request):
        # Filter for the current year
        current_year = timezone.now().year
        qs = self.get_filtered_queryset(request).filter(date__year=current_year)
        
        trends = qs.annotate(month=TruncMonth('date')).values('month').annotate(
            income=Sum('amount', filter=Q(transaction_type='income')),
            expenses=Sum('amount', filter=Q(transaction_type='expense'))
        ).order_by('month')
        
        return Response(trends)

class RecentActivityView(DashboardBaseView):
    def get(self, request):
        # Return last 10 records using the existing finance serializer
        qs = self.get_filtered_queryset(request).order_by('-created_at')[:10]
        serializer = FinancialRecordSerializer(qs, many=True)
        return Response(serializer.data)