redis: redis-server config/redis.conf
react: npm start
resque: env RAILS_ENV=development QUEUE=sla_high,sla_medium,sla_low,airbrake,make_statements VERBOSE=1 INTERVAL=1 bundle exec rake environment resque:work
resque_scheduler: env VERBOSE=1 TICK=1 bundle exec rake environment resque:scheduler
sphinx: bundle exec rake ts:start NODETACH=true --trace
realtime_updater: env RAILS_ENV=development bundle exec script/realtime_updater run
drivers_pubnub: env RAILS_ENV=development bundle exec script/drivers_pubnub run
# mongo: mongod
