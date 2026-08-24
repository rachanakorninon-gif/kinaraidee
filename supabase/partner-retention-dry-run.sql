-- Kinaraidee Partner retention dry-run contract
--
-- READ-ONLY BY DESIGN. This file must never delete, truncate, update or insert data.
-- It estimates the impact of future approved retention periods before any cleanup
-- mechanism is implemented.
--
-- Required runtime parameters when executed through psql:
--   partner_click_retention
--   partner_conversion_retention
--   restaurant_demand_retention
--
-- Example values must be supplied by an approved policy decision at execution time.
-- This repository deliberately provides no Production defaults because the retention
-- periods remain TBD pending owner/legal approval under Issues #31, #45 and #123.

\if :{?partner_click_retention}
\else
  \echo 'ERROR: partner_click_retention must be supplied explicitly; no default is allowed.'
  \quit 2
\endif

\if :{?partner_conversion_retention}
\else
  \echo 'ERROR: partner_conversion_retention must be supplied explicitly; no default is allowed.'
  \quit 2
\endif

\if :{?restaurant_demand_retention}
\else
  \echo 'ERROR: restaurant_demand_retention must be supplied explicitly; no default is allowed.'
  \quit 2
\endif

\echo 'Partner retention DRY RUN — no data will be mutated.'

WITH params AS (
  SELECT
    :'partner_click_retention'::interval AS click_retention,
    :'partner_conversion_retention'::interval AS conversion_retention,
    :'restaurant_demand_retention'::interval AS demand_retention,
    now() AS observed_at
),
eligible_clicks AS (
  SELECT clicked_at
  FROM public.partner_clicks c
  CROSS JOIN params p
  WHERE c.clicked_at <= p.observed_at - p.click_retention
),
eligible_conversions AS (
  SELECT created_at
  FROM public.partner_conversions c
  CROSS JOIN params p
  WHERE c.created_at <= p.observed_at - p.conversion_retention
),
eligible_demand AS (
  SELECT created_at
  FROM public.restaurant_search_demand d
  CROSS JOIN params p
  WHERE d.created_at <= p.observed_at - p.demand_retention
)
SELECT
  p.observed_at,
  p.click_retention,
  p.conversion_retention,
  p.demand_retention,
  (SELECT count(*) FROM public.partner_clicks) AS total_partner_clicks,
  (SELECT count(*) FROM eligible_clicks) AS candidate_partner_clicks,
  (SELECT min(clicked_at) FROM eligible_clicks) AS oldest_candidate_click,
  (SELECT max(clicked_at) FROM eligible_clicks) AS newest_candidate_click,
  (SELECT count(*) FROM public.partner_conversions) AS total_partner_conversions,
  (SELECT count(*) FROM eligible_conversions) AS candidate_partner_conversions,
  (SELECT min(created_at) FROM eligible_conversions) AS oldest_candidate_conversion,
  (SELECT max(created_at) FROM eligible_conversions) AS newest_candidate_conversion,
  (SELECT count(*) FROM public.restaurant_search_demand) AS total_restaurant_demand,
  (SELECT count(*) FROM eligible_demand) AS candidate_restaurant_demand,
  (SELECT min(created_at) FROM eligible_demand) AS oldest_candidate_demand,
  (SELECT max(created_at) FROM eligible_demand) AS newest_candidate_demand
FROM params p;

-- Result projections intentionally expose only counts, policy intervals and time
-- boundaries. They do not expose restaurant IDs/slugs, session IDs, food names,
-- source references, coordinates, order amounts or commission amounts.
