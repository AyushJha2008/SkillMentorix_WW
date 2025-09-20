from django.db import models
import mysql.connector
# Create your models here.

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="spartans@123",
    database="SkillMentorix"
)
