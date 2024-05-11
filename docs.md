create docker postgres
docker run --name nestjs -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres 