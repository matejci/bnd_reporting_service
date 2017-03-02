-- --------------------------------------
-- create table for jMeter tests results
-- --------------------------------------

DROP TABLE IF EXISTS reporting.jmeter_results;

CREATE TABLE reporting.jmeter_results (
  uuid string primary key,
  test_name string,
  test_run_at timestamp,
  elapsed integer,
  label string,
  response_code integer,
  response_message string,
  thread_name string,
  data_type string,
  success boolean,
  failure_message string,
  bytes integer,
  sent_bytes integer,
  grp_threads integer,
  all_threads integer,
  latency integer,
  idle_time integer,
  connect integer,
  created_at timestamp,
  updated_at timestamp

  -- add indeces

) with (column_policy = 'strict');
