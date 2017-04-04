/*
* Manually add each field for each unit.
*/
INSERT INTO unit_data
	(unit_id, unit_key, value, timestamp)
SELECT
    (SELECT id FROM units WHERE name = 'Cluster1'),
    (SELECT id FROM unit_keys WHERE 
        name = 'F15_AS3_CCtrl_Unit1_P_L2' 
        AND 
        unit_id = (
            SELECT id FROM units WHERE name = 'Cluster1'
        )
    ),
    col2,
    col1
FROM
    Cluster_1_1;


/*
* Automatically add fields for each unit.
* TODO loop the row instead of looping the column over and over.
*/
INSERT INTO unit_data
	(unit_id, unit_key, value, timestamp)
SELECT
    (SELECT id FROM units WHERE name = 'Cluster1'),
    (SELECT id FROM unit_keys WHERE 
        name IN (
            SELECT name FROM unit_keys WHERE unit_id = (
                SELECT id FROM units WHERE name = 'Cluster1'
            )
        )
    ),
    col_2,
    col_1
FROM
    Cluster_1_1;