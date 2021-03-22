FROM node:alpine3.10 as intermediate
LABEL state=intermediate

RUN apk update && \
     apk add --update git && \
     apk add --update openssh

ARG SSH_KEY
RUN mkdir /root/.ssh/
RUN echo ${SSH_PRIVATE_KEY} > /root/.ssh/id_rsa
RUN mkdir -p /root/.ssh/ && \
    echo "$SSH_KEY" > /root/.ssh/id_rsa && \
    chmod -R 600 /root/.ssh/ && \
    ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

#DEPLOY MODE
RUN git clone git@github.com:timondavis/cm-maze.git

#DEV MODE
#COPY ./ cm-maze

#Either Way
FROM node:alpine3.10

RUN mkdir -p /usr/local/lib/cm

COPY --from=intermediate cm-maze/ /usr/local/lib/cm/cm-maze/

RUN yarn global add concurrently nodemon ts-node typescript @types/node@12.12.14 @types/chai@4.2.6 @types/mocha@5.2.7
WORKDIR /usr/local/lib/cm/cm-maze

CMD /bin/sh -c "yarn install; exec tsc -w"
