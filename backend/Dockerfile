FROM python:3.10-slim

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./src /code/src

# Create .env file if not exists (or rely on docker-compose)
# ENV settings are usually passed via docker-compose

CMD ["uvicorn", "src:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
