from django.urls import path
from . import views

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('adm_index/', views.AdmIndexView.as_view(), name='adm_index'),
]