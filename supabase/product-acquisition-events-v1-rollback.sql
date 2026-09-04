-- Roll back Kinaraidee product acquisition telemetry v1.

drop table if exists public.product_acquisition_events;
drop table if exists public.product_measurement_meta;
