FROM debian:latest

ENV TZ=Europe/Malta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update && apt-get install -qq -y \
  shellcheck \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app/

COPY . /usr/src/app/