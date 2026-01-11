from pymilvus import connections, Collection, utility
from src.config import Config

def connect_milvus():
    try:
        connections.connect(
            alias="default", 
            uri=Config.MILVUS_URI,
            token=Config.MILVUS_TOKEN
        )
        print("Connected to Milvus")
    except Exception as e:
        print(f"Failed to connect to Milvus: {e}")

def disconnect_milvus():
    connections.disconnect("default")

def get_milvus_collection(collection_name: str):
    if utility.has_collection(collection_name):
        return Collection(collection_name)
    return None
