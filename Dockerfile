FROM captainhowdy/cm-library-main

RUN mkdir -p /usr/local/lib/cm
COPY ./ /usr/local/lib/cm/cm-maze/
WORKDIR /usr/local/lib/cm/cm-maze
CMD /bin/sh -c "npm install; exec tsc -w"
