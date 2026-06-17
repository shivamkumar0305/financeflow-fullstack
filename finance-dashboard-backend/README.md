# Finance Dashboard Backend

A Django REST Framework backend for managing financial records with Role-Based Access Control (RBAC).

---

## Setup Instructions

### 1. Clone and Install

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Database Setup

```bash
python manage.py makemigrations
python manage.py migrate
```

### 3. Seed Data

```bash
# Option A: create a superuser manually
python manage.py createsuperuser

# Option B: load sample data
python manage.py seed_data
```

### 4. Run the Server

```bash
python manage.py runserver
```

---

## Role Access Table

| Feature                        | Viewer | Analyst | Admin |
|--------------------------------|:------:|:-------:|:-----:|
| View records & dashboard       | ✅     | ✅      | ✅    |
| Create / edit / delete records | ❌     | ✅      | ✅    |
| Manage users                   | ❌     | ❌      | ✅    |

---

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login/` | Login with `{email, password}` — returns JWT tokens |
| `POST` | `/api/auth/refresh/` | Refresh an expired access token |

### Users

> User management requires **Admin** role. The `/me/` endpoint is available to any active user.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users/` | List all users |
| `POST` | `/api/users/` | Create a new user |
| `GET` | `/api/users/me/` | Get your own profile |
| `DELETE` | `/api/users/<id>/` | Soft-delete a user |

### Financial Records

> Requires **Analyst** or **Admin** role to write. All active users can read.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/finance/records/` | List records (see filters below) |
| `POST` | `/api/finance/records/` | Create a record (creator set automatically) |

**Available filters:**

| Param | Example | Description |
|-------|---------|-------------|
| `category` | `?category=food` | Filter by category |
| `transaction_type` | `?transaction_type=expense` | `income` or `expense` |
| `date_after` | `?date_after=2024-01-01` | Records on or after this date |
| `date_before` | `?date_before=2024-12-31` | Records on or before this date |

### Dashboard

> Available to any active user.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard/summary/` | Total income, expenses, and net balance |
| `GET` | `/api/dashboard/by-category/` | Aggregated totals grouped by category |
| `GET` | `/api/dashboard/trends/` | Monthly income vs expense breakdown for the current year |

---

## Key Assumptions & Tradeoffs

1. **Soft delete** — records and users are never hard-deleted, preserving audit trails.
2. **Decimal precision** — `DecimalField` is used for all currency values to avoid floating-point rounding errors.
3. **Database-level aggregation** — dashboard endpoints use Django ORM `aggregate` and `annotate` to push calculations to SQLite rather than processing in Python.
4. **Stateless auth** — JWT tokens are used so the backend has no session state, making it straightforward to integrate with any frontend.