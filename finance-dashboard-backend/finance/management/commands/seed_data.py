import random
from django.core.management.base import BaseCommand
from django.utils import timezone
from users.models import User
from finance.models import FinancialRecord

class Command(BaseCommand):
    help = 'Seeds the database with sample users and financial records'

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding data...")
        
        # 1. Create a sample Analyst if they don't exist
        analyst, created = User.objects.get_or_create(
            email="analyst@example.com",
            defaults={"full_name": "Alice Analyst", "role": "analyst"}
        )
        if created:
            analyst.set_password("password123")
            analyst.save()

        # 2. Create sample records
        categories = ['salary', 'food', 'transport', 'entertainment', 'utilities']
        types = ['income', 'expense']

        for i in range(30):
            t_type = random.choice(types)
            # Income is usually higher than daily expenses
            amount = random.randint(500, 5000) if t_type == 'income' else random.randint(10, 200)
            
            FinancialRecord.objects.create(
                created_by=analyst,
                amount=amount,
                transaction_type=t_type,
                category=random.choice(categories),
                date=timezone.now().date() - timezone.timedelta(days=random.randint(0, 90)),
                notes=f"Sample {t_type} record {i}"
            )

        self.stdout.write(self.style.SUCCESS("Successfully seeded 30 records and 1 analyst!"))