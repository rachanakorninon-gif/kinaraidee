-- Kinaraidee partner/location coordinate-range contract
--
-- Live migration applied to the connected Supabase project on 2026-08-24 after a
-- read-only pre-check found zero out-of-range latitude/longitude rows in both tables.
-- This file records the intended constraint contract for future review/regression.
-- Repository CI does not prove live database state; re-check the connected project
-- after future DDL changes.

alter table public.restaurant_search_demand
  add constraint restaurant_search_demand_latitude_range_check
    check (latitude is null or latitude between -90 and 90),
  add constraint restaurant_search_demand_longitude_range_check
    check (longitude is null or longitude between -180 and 180);

alter table public.partner_restaurants
  add constraint partner_restaurants_latitude_range_check
    check (latitude is null or latitude between -90 and 90),
  add constraint partner_restaurants_longitude_range_check
    check (longitude is null or longitude between -180 and 180);
