CREATE TABLE diary (
    id INT GENERATED ALWAYS AS IDENTITY,
    category VARCHAR(30) UNIQUE NOT NULL,
    entry VARCHAR(500),
    date DATE DEFAULT '2000-01-01',
    PRIMARY KEY (id)
);

INSERT INTO diary (category, entry, date)
VALUES
    ('Recon', 'Reached vantage point before dawn. Wind steady. No movement yet.', '2024-02-01'),
    ('Observation', 'Target building active. Guards rotating every 20 minutes.', '2024-02-02'),
    ('Patience', 'Held position for 6 hours. Fingers numb, but focus intact.', '2024-02-03'),
    ('Weather', 'Light rain reduced visibility. Adjusted scope and position.', '2024-02-04'),
    ('Movement', 'Relocated silently at dusk. No signs of detection.', '2024-02-05'),
    ('Target', 'Confirmed visual. Waiting for clear line and minimal risk.', '2024-02-06'),
    ('Night Watch', 'City quiet. Only distant engines and passing shadows.', '2024-02-07'),
    ('Discipline', 'Ignored easy shot. Mission requires certainty, not impulse.', '2024-02-08'),
    ('Extraction', 'Exit route secured. Timing will be critical tomorrow.', '2024-02-09'),
    ('Focus', 'Heartbeat steady. Breath control improving under pressure.', '2024-02-10'),
    ('Delay', 'Mission postponed. New intel expected at sunrise.', '2024-02-11'),
    ('Stealth', 'Blended into surroundings. No trace left behind.', '2024-02-12'),
    ('Aftermath', 'One shot. Clean. Already moving to extraction point.', '2024-02-13');
