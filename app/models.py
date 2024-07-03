from django.db import models


class Upload(models.Model):
    name = models.CharField(max_length=100)
    document = models.FileField(upload_to="documents/")
    image = models.ImageField(upload_to="images/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
