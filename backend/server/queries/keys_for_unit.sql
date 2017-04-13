SELECT DISTINCT ud.unit_key, uk.name 
FROM unit_data as ud
INNER JOIN unit_keys as uk
ON ud.unit_key = uk.id
WHERE ud.unit_id = (
	SELECT id FROM units WHERE name = ?
);