from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import AllowAny
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from .models import Author, Biography, Book, Article
from .serializers import AuthorModelSerializer, BiographyModelSerializer, BookModelSerializer, ArticleModelSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class AuthorPaginator(LimitOffsetPagination):       #Отвечает за постраничный вывод
    default_limit = 10


class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer
    pagination_class = AuthorPaginator
    filterset_fields = ['first_name', 'last_name']


class BiographyModelViewSet(ModelViewSet):
    queryset = Biography.objects.all()
    serializer_class = BiographyModelSerializer


class BookModelViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Book.objects.all()
    serializer_class = BookModelSerializer


class ArticleModelViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleModelSerializer


# class ArticleApiView(APIView):
#     serializer_class = ArticleModelSerializer
#     renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
#     queryset = Article.objects.all()
#     def get(self, request, format=None):
#         articles = Article.objects.all()
#         serializer = ArticleModelSerializer(articles, many=True)
#         return Response(serializer.data)
#
#     def get_queryset(self):
#         return Article.objects.filter(name_contains='Pushkin')