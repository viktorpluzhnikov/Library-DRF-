import json                         # для чтения содержимого ответа от сервера
from django.test import TestCase    # базовый класс для создания Django-теста
from rest_framework import status   # содержит константы для ответов сервера
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
#from mixer.backend.django import mixer     # библиотека для генерации тестовых данных
from django.contrib.auth.models import User
from .views import AuthorModelViewSet
from .models import Author, Book


class TestAuthorViewSet(TestCase):
    '''
    Метод test_get_list будет проверять страницу со списком авторов
    '''
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/authors/')
        view = AuthorModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    '''
    Метод test_create_guest будет проверять запрос на создание автора, который отправляет
    неавторизованный пользователь
    '''
    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors/', {
            'first_name': 'Александр',
            'last_name': 'Пушкин',
            'birthday_year': 1799}, format='json')
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    '''
    Для авторизованного пользователя
    '''
    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors/', {
            'first_name': 'Александр',
            'last_name': 'Пушкин',
            'birthday_year': 1799}, format='json')
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        force_authenticate(request, admin)
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    '''
    Тест для проверки страницы с детальной информацией об авторе
    '''
    def test_get_detail(self):
        author = Author.objects.create(first_name='Александр', last_name='Пушкин', birthday_year=1799)
        client = APIClient()
        response = client.get(f'/api/authors/{author.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    '''
    Тест для редактирования автора неавторизованным пользователем
    '''
    def test_edit_guest(self):
        author = Author.objects.create(first_name='Александр', last_name='Пушкин', birthday_year=1799)
        client = APIClient
        response = client.put(f'/api/authors/{author.id}/', {'first_name': 'Грин', 'last_name': 'Алекс', 'birthday_year': 1880})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    '''
    Тест для редактирования автора авторизованным пользователем
    '''
    def test_edit_admin(self):
        author = Author.objects.create(first_name='Александр',last_name='Пушкин', birthday_year=1799)
        client = APIClient
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = client.put(f'/api/authors/{author.id}/', {'first_name': 'Грин', 'birthday_year': 1880})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        author = Author.objects.get(pk=author.id)
        self.assertEqual(author.first_name, 'Грин')
        self.assertEqual(author.birthday_year, 1880)
        client.logout()


class TestBookViewSet(APITestCase):
    '''
    Тест для получения списка книг
    '''
    def test_get_list(self):
        response = self.client.get('/api/books/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_book_admin(self):
        author = Author.objects.create(first_name='Александр',last_name='Пушкин', birthday_year=1799)
        book = Book.objects.create(name='Рус и Люд')
        book.author.add(author)
        book.save()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/books/{book.id}/',
                              {'name': 'Пиковая дама', 'author': author.id})
        book = Book.objects.get(pk=book.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(book.name, 'Пиковая дама')
        self.client.logout()