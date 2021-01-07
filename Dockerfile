FROM node:current

ARG buildno
ARG commitsha

LABEL maintainer="Jordan Jones <me@jordanjones.org>" \
      repository="https://github.com/Kashalls/MinecraftAFKBot"

RUN mkdir /opt/minecraftafkbot
# Copy files and install modules
COPY . /opt/minecraftafkbot
WORKDIR /opt/minecraftafkbot
RUN npm ci --production

CMD ["node", "."]