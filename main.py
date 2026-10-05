
import uuid
from fastapi import FastAPI,HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel,EmailStr
app=FastAPI()
app.mount("/frontend",StaticFiles(directory="frontend"),name="frontend")
class User(BaseModel):
    name:str
    email:EmailStr
    age:int
users={}
@app.get("/")
def home():
    return{"message":"User API is running"}
@app.post("/users",status_code=201)
def create_user(user:User):
    user_id=str(uuid.uuid4())
    new_user={
        "id":user_id,
        "name":user.name,
        "email":user.email,
        "age":user.age
    }
    users[user_id]=new_user
    return new_user
@app.get("/users")
def get_users():
    return list(users.values())
@app.get("/users/{user_id}")
def get_user(user_id:str):
    if user_id not in users:
        raise HTTPException(status_code=404,detail="User not found")
    return users[user_id]
@app.put("/users/{user_id}")
def update_user(user_id:str,user:User):
    if user_id not in users:
        raise HTTPException(status_code=404,detail="User not found")
    updated_user={
        "id":user_id,
        "name":user.name,
        "email":user.email,
        "age":user.age
    }
    users[user_id]=updated_user
    return updated_user
@app.delete("/users/{user_id}")
def delete_user(user_id:str):
    if user_id not in users:
        raise HTTPException(status_code=404,detail="User not found")
    deleted_user=users.pop(user_id)
    return {"message":"User deleted successfully",
            "user":deleted_user}

