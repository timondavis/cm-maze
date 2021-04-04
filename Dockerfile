FROM captainhowdy/cm-library-main

RUN apk add git

RUN mkdir -p /usr/local/lib/cm
COPY ./ /usr/local/lib/cm/cm-maze/
WORKDIR /usr/local/lib/cm/cm-maze
CMD /bin/sh -c "[ ! -d 'node_modules' ] && npm install; exec tsc -w"
