FROM mysql:latest

WORKDIR /app

USER mysql 

#Env variables
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_Database=test_database

# Expose port 3306 to allow connections to the database
EXPOSE 3306

# Start the MySQL server when the container is run
CMD ["mysqld"]


#docker build -t custom-mysql .

#docker run -d -p 3306:3306 --name mysql-container custom-mysql