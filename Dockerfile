FROM shapigor/ubuntu-rvm-nvm
RUN     $RVM_DIR/bin/rvm alias create default ruby-1.9.3
WORKDIR /deploy
ENTRYPOINT ["bash", "-l"]
