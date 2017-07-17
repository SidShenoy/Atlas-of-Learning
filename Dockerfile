FROM ubuntu:latest
MAINTAINER Siddhant Shenoy
RUN apt-get update
RUN apt-get install -y python-pip
ADD Atlas_of_learning /home/Atlas_of_learning
RUN pip install -r /home/Atlas_of_learning/requirements.txt
ENV GRAPHENEDB_URL="http://172.25.0.2:7474"
ENV NEO4J_USERNAME=neo4j
ENV NEO4J_PASSWORD=HBCSE
EXPOSE 5000
