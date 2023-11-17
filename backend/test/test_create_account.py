import pytest
from fastapi.testclient import TestClient
import sys, os
import random, string

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import main

def random_string(stringLength=10):
    letters = string.ascii_lowercase
    return "".join(random.choice(letters) for i in range(stringLength))

@pytest.fixture
def client():
    return TestClient(main.app)


def test_get(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == "Hemlo world!"


def test_create_account(client):
    # remote account if exists
    username = "test"
    response = client.get(f"/users/username/{username}")
    if response.status_code == 200:
        # get user id
        user_id = response.json()["id"]
        # delete user
        response = client.delete(f"/users/{user_id}")
        assert response.status_code == 200

    response = client.post(
        "/signup",
        json={
            "username": "test",
            "password": "test",
            "email": "test",
            "phone": "test",
            "date_of_birth": "2023-11-17",
            "first_name": "test",
            "last_name": "test",
            "address": "test",
        },
    )
    assert response.status_code == 200
    assert response.json()["username"] == "test"

def test_create_exist_account(client):
    username = "test"
    client.post(
        "/signup",
        json={
            "username": "test",
            "password": "test",
            "email": "test",
            "phone": "test",
            "date_of_birth": "2023-11-17",
            "first_name": "test",
            "last_name": "test",
            "address": "test",
        },
    )
    
    response = client.post(
        "/signup",
        json={
            "username": "test",
            "password": "test",
            "email": "test",
            "phone": "test",
            "date_of_birth": "2023-11-17",
            "first_name": "test",
            "last_name": "test",
            "address": "test",
        },
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Username already registered"
    
def test_create_exist_email(client):
    rand_str = random_string()
    email = "test@test.com"
    client.post(
        "/signup",
        json={
            "username": f"{rand_str}",
            "password": f"{rand_str}",
            "email": f"{email}",
            "phone": f"{rand_str}",
            "date_of_birth": "2023-11-17",
            "first_name": f"{rand_str}",
            "last_name": f"{rand_str}",
            "address": f"{rand_str}",
        },
    )
    rand_str2 = random_string()
    response = client.post(
        "/signup",
        json={
            "username": f"{rand_str2}",
            "password": f"{rand_str2}",
            "email": f"{email}",
            "phone": f"{rand_str2}",
            "date_of_birth": "2023-11-17",
            "first_name": f"{rand_str2}",
            "last_name": f"{rand_str2}",
            "address": f"{rand_str2}",
        },
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Email already registered"