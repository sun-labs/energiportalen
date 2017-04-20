/*
* Misc queries
*/
SELECT id FROM units WHERE name = 'Cluster1';

SELECT Cluster_1_1.col_1, Cluster_1_1.col_2 FROM Cluster_1_1;

INSERT INTO unit_keys
	(unit_id, name, log_no)
SELECT 3, name, log_no FROM unit_keys WHERE unit_id = 1;

SELECT * FROM unit_keys WHERE unit_id IN (SELECT id FROM units WHERE name LIKE 'Cluster%');

SELECT * FROM unit_data;

-- clear table from data
DELETE FROM unit_data;

-- reset auto_increment
ALTER TABLE unit_data AUTO_INCREMENT = 1;

/*
* Manually add each field for each unit.
*/
INSERT INTO unit_data
	(unit_id, unit_key, value, timestamp)
SELECT
    (SELECT id FROM units WHERE name = 'Cluster1'), -- (CHANGE)
    (SELECT id FROM unit_keys WHERE 
        name = 'F15_AS3_CCtrl_Unit1_Volt_L1_N' -- (CHANGE)
        AND 
        unit_id = (
            SELECT id FROM units WHERE name = 'Cluster1' -- (CHANGE)
        )
    ),
    col_5, -- value of data key (CHANGE)
    col_1 -- timestamp
FROM
    Cluster_1_1;


/*
* Automatically add fields for each unit.
* TODO loop the row instead of looping the column over and over.
*/
INSERT INTO unit_data
	(unit_id, 
    unit_key, 
    value, 
    timestamp)
SELECT
    (SELECT id FROM units WHERE name = 'Cluster1'), -- Unit_id
    (SELECT id FROM unit_keys WHERE 
        name IN (
            SELECT name FROM unit_keys WHERE unit_id = (
                SELECT id FROM units WHERE name = 'Cluster1'
            )
        )
    ),
    col_2, -- value of key
    col_1 -- timestamp
FROM
    Cluster_1_1;

/*
* Räkna ut average på ett visst data för en viss enhet
*/
SELECT avg(value) FROM unit_data WHERE 
	unit_id = (
		SELECT id FROM units WHERE name = 'Cluster2'
	) AND 
	unit_key = (
		SELECT id FROM unit_keys WHERE name = 'F15_AS3_CCtrl_Unit1_P_L3' AND 
		unit_id = (
			SELECT id FROM units WHERE name = 'Cluster2'
		)
	);
	
/*
* Plockar ut all data som finns för en viss enhet
*/
SELECT DISTINCT ud.unit_key, uk.name 
FROM unit_data as ud
INNER JOIN unit_keys as uk
ON ud.unit_key = uk.id
WHERE ud.unit_id = (
	SELECT id FROM units WHERE name = 'Cluster3'
);

-- Cluster1, Cluster2, Cluster3, Schneider, Vader
-- Cluster1 => [ 1, 2, 3, 4, 5, 6, 7, 8 ];

/*
* Convert unit_data to database with a resolution of one minute per data point
*/
INSERT INTO unit_data_minute
	(unit_id, 
    unit_key, 
    value, 
    timestamp)
SELECT 
	unit_id, 
	unit_key, 
	ROUND(AVG(value)) as value, 
	DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:00') as new_timestamp
FROM unit_data
GROUP BY 
    new_timestamp, 
    unit_key, 
    unit_id;

-- DELETE FROM unit_data_minute;

INSERT INTO unit_data_hour
	(unit_id, 
    unit_key, 
    value, 
    timestamp)
SELECT 
	unit_id, 
	unit_key, 
	ROUND(AVG(value)) as value, 
	DATE_FORMAT(timestamp, '%Y-%m-%d %H:00:00') as new_timestamp
FROM unit_data_minute 
GROUP BY 
    new_timestamp, 
    unit_key, 
    unit_id;

-- DELETE FROM unit_data_hour;