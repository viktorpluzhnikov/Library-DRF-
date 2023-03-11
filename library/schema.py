import graphene
from graphene_django import DjangoObjectType
from mainapp.models import Book, Author


#DjangoObjectType позволяет автоматически создавать схемы на основе полей в БД
class BookType(DjangoObjectType):
    class Meta:
        model = Book
        fields = '__all__'


class AuthorType(DjangoObjectType):
    class Meta:
        model = Author
        fields = '__all__'


class Query(graphene.ObjectType):
    all_books = graphene.List(BookType)
    all_authors = graphene.List(AuthorType)
    author_by_id = graphene.Field(AuthorType, id=graphene.Int(required=True))
    books_by_author_name = graphene.List(BookType, name=graphene.String(required=False))

    def resolve_all_books(self, info):
        return Book.objects.all()

    def resolve_all_authors(self, info):
        return Author.objects.all()

    def resolve_author_by_id(self, id):
        try:
            return Author.objects.get(pk=id)
        except Author.DoesNotExist:
            return None

    def resolve_book_by_author_name(self, info, name=None):
        books = Book.objects.all()
        if name:
            books = books.filter(author__first_name=name)
        return books


class AuthorMutation(graphene.Mutation):
    class Arguments:
        first_name = graphene.String()
        last_name = graphene.String()
        birthday_year = graphene.Int()

    author = graphene.Field(AuthorType)

    @classmethod
    def mutate(cls, root, info, first_name, last_name, birthday_year):
        author = Author.objects.get(pk=id)
        author.first_name = first_name
        author.last_name = last_name
        author.birthday_year = birthday_year
        author.save()
        return AuthorMutation(author=author)


class Mutation(graphene.ObjectType):
    update_author = AuthorMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)


