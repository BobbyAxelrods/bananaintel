from motor.motor_asyncio import AsyncIOMotorClient
from src.config import Config

class MongoDB:
    client: AsyncIOMotorClient = None
    db = None

    def connect(self):
        self.client = AsyncIOMotorClient(Config.MONGO_URL)
        self.db = self.client[Config.MONGO_DB_NAME]
        print("Connected to MongoDB")

    def close(self):
        if self.client:
            self.client.close()
            print("Closed MongoDB connection")

mongo_db = MongoDB()

async def get_mongo_db():
    return mongo_db.db
