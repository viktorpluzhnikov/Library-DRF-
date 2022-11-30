from django.db import models
from uuid import uuid4


class Author(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday_year = models.PositiveIntegerField()


class Biography(models.Model):
    text = models.TextField()
    author = models.OneToOneField(Author, on_delete=models.CASCADE)


class Book(models.Model):
    name = models.CharField(max_length=32)
    author = models.ManyToManyField(Author)
    #author = models.ForeignKey(Author, on_delete=models.CASCADE)


#Статья
class Article(models.Model):
    name = models.CharField(max_length=32)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)