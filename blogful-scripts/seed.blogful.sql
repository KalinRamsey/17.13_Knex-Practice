BEGIN;

INSERT INTO blogful_articles (title, content, date_published) VALUES
  ('Article 1', 'Lorem ipsum dolor sit amet', now()),
  ('Article 2', 'Lorem ipsum dolor sit amet', now() - '2 days'::INTERVAL),
  ('Article 3', 'Lorem ipsum dolor sit amet', now() - '2 days'::INTERVAL),
  ('Article 4', 'Lorem ipsum dolor sit amet', now() - '2 days'::INTERVAL),
  ('Article 5', 'Lorem ipsum dolor sit amet', now() - '2 days'::INTERVAL),
  ('Article 6', 'Lorem ipsum dolor sit amet', now() - '2 days'::INTERVAL),
  ('Article 7', 'Lorem ipsum dolor sit amet', now() - '3 days'::INTERVAL),
  ('Article 8', 'Lorem ipsum dolor sit amet', now() - '3 days'::INTERVAL),
  ('Article 9', 'Lorem ipsum dolor sit amet', now() - '3 days'::INTERVAL),
  ('Article 10', 'Lorem ipsum dolor sit amet', now() - '3 days'::INTERVAL),
  ('Article 11', 'Lorem ipsum dolor sit amet', now() - '3 days'::INTERVAL),
  ('Article 12', 'Lorem ipsum dolor sit amet', now() - '5 days'::INTERVAL),
  ('Article 13', 'Lorem ipsum dolor sit amet', now() - '5 days'::INTERVAL),
  ('Article 14', 'Lorem ipsum dolor sit amet', now() - '5 days'::INTERVAL),
  ('Article 15', 'Lorem ipsum dolor sit amet', now() - '5 days'::INTERVAL),
  ('Article 16', 'Lorem ipsum dolor sit amet', now() - '5 days'::INTERVAL),
  ('Article 17', 'Lorem ipsum dolor sit amet', now() - '10 days'::INTERVAL),
  ('Article 18', 'Lorem ipsum dolor sit amet', now() - '10 days'::INTERVAL),
  ('Article 19', 'Lorem ipsum dolor sit amet', now() - '10 days'::INTERVAL),
  ('Article 20', 'Lorem ipsum dolor sit amet', now() - '10 days'::INTERVAL);


COMMIT;