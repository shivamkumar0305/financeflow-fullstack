from django.urls import path
from .views import (
    SummaryView, 
    CategoryBreakdownView, 
    MonthlyTrendsView, 
    RecentActivityView
)

urlpatterns = [
    path('summary/', SummaryView.as_view(), name='dashboard-summary'),
    path('by-category/', CategoryBreakdownView.as_view(), name='dashboard-category'),
    path('trends/', MonthlyTrendsView.as_view(), name='dashboard-trends'),
    path('recent/', RecentActivityView.as_view(), name='dashboard-recent'),
]