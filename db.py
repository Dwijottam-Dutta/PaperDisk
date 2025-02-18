import os
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv

# LOADING PASSWORD FOR ACCESSING MONGO DB
load_dotenv(find_dotenv())
mongo_password = os.environ.get("MONGODB_PASSWORD")

MONGO_URI = (
    f"mongodb+srv://dj_dwazz:{mongo_password}@cluster0.mi3ncby.mongodb.net/?retryWrites=true&w=majority"
    f"&appName=Cluster0"
)
client = MongoClient(MONGO_URI)

paper_db = client.paper
collection = paper_db.data
