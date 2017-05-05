USE energiportalen;

INSERT INTO units 
	(id, name)
VALUES
	(1,'Cluster1'),
	(2,'Cluster2'),
	(3,'Cluster3'),
	(4,'Schneider'),
	(6,'Sun Labs'),
	(5,'Vader');

INSERT INTO locations 
	(id, name, image, description, country, city)
VALUES
	(1, 'Akademiska Sjukhuset', NULL, 'The academic hospital of Uppsala has 50% of their roof covered with solar panels.', 'SWE', 'Uppsala'),
	(3, 'Origo', NULL, 'Panels on the roof are tilted 45 degrees (under construction).', 'SWE', 'Uppsala'),
	(2, 'Base10', NULL, 'Base is the place if youre among the top 1 per mille, the roof is covered in sunlight and happiness 24 hours a day.', 'SWE', 'Uppsala');

INSERT INTO unit_locations 
	(unit_id, location_id)
VALUES
	(1, 1),
	(2, 1),
	(3, 1),
	(4, 1),
	(5, 1),
	(6, 2);

INSERT INTO users
  (id, email, password)
VALUES
  -- password: ***REMOVED***
  (1, 'asdf@asdf.com', '***REMOVED***');

INSERT INTO unit_keys 
	(id, unit_id, name, log_no, notes)
VALUES
	(1,1,'F15_AS3_CCtrl_Unit1_P_L1',1,NULL),
	(2,1,'F15_AS3_CCtrl_Unit1_P_L2',1,NULL),
	(3,1,'F15_AS3_CCtrl_Unit1_P_L3',1,NULL),
	(4,1,'F15_AS3_CCtrl_Unit1_Volt_L1_N',1,NULL),
	(5,1,'F15_AS3_CCtrl_Unit1_Volt_L2_N',1,NULL),
	(6,1,'F15_AS3_CCtrl_Unit1_Volt_L3_N',1,NULL),
	(7,1,'F15_AS3_CCtrl_Unit1_HZ',1,NULL),
	(8,1,'F15_AS3_CCtrl_Unit1_Volt_L1_L2',2,NULL),
	(9,1,'F15_AS3_CCtrl_Unit1_Volt_L2_L3',2,NULL),
	(10,1,'F15_AS3_CCtrl_Unit1_Volt_L3_L1',2,NULL),
	(11,1,'F15_AS3_CCtrl_Unit1_LineCurrent_L1',2,NULL),
	(12,1,'F15_AS3_CCtrl_Unit1_LineCurrent_L2',2,NULL),
	(13,1,'F15_AS3_CCtrl_Unit1_LineCurrent_L3',2,NULL),
	(14,1,'F15_AS3_CCtrl_Unit1_Total_AC_energy_all_conductors_Wh',3,NULL),
	(15,1,'F15_AS3_CCtrl_Unit1_Total_AC_energy_all_conductors_kWh',3,NULL),
	(16,1,'F15_AS3_CCtrl_Unit1_Total_AC_energy_all_conductors_MWh',3,NULL),
	(17,1,'F15_AS3_CCtrl_Unit1_Energy_current_day_all_conductors_Wh',3,NULL),
	(18,1,'F15_AS3_CCtrl_Unit1_Energy_current_day_all_conductors_kWh',3,NULL),
	(19,1,'F15_AS3_CCtrl_Unit1_PV_Power',3,NULL),
	(20,2,'F15_AS3_CCtrl_Unit1_P_L1',1,NULL),
	(21,2,'F15_AS3_CCtrl_Unit1_P_L2',1,NULL),
	(22,2,'F15_AS3_CCtrl_Unit1_P_L3',1,NULL),
	(23,2,'F15_AS3_CCtrl_Unit1_Volt_L1_N',1,NULL),
	(24,2,'F15_AS3_CCtrl_Unit1_Volt_L2_N',1,NULL),
	(25,2,'F15_AS3_CCtrl_Unit1_Volt_L3_N',1,NULL),
	(26,2,'F15_AS3_CCtrl_Unit1_HZ',1,NULL),
	(27,2,'F15_AS3_CCtrl_Unit1_Volt_L1_L2',2,NULL),
	(28,2,'F15_AS3_CCtrl_Unit1_Volt_L2_L3',2,NULL),
	(29,2,'F15_AS3_CCtrl_Unit1_Volt_L3_L1',2,NULL),
	(30,2,'F15_AS3_CCtrl_Unit1_LineCurrent_L1',2,NULL),
	(31,2,'F15_AS3_CCtrl_Unit1_LineCurrent_L2',2,NULL),
	(32,2,'F15_AS3_CCtrl_Unit1_LineCurrent_L3',2,NULL),
	(33,2,'F15_AS3_CCtrl_Unit1_Total_AC_energy_all_conductors_Wh',3,NULL),
	(34,2,'F15_AS3_CCtrl_Unit1_Total_AC_energy_all_conductors_kWh',3,NULL),
	(35,2,'F15_AS3_CCtrl_Unit1_Total_AC_energy_all_conductors_MWh',3,NULL),
	(36,2,'F15_AS3_CCtrl_Unit1_Energy_current_day_all_conductors_Wh',3,NULL),
	(37,2,'F15_AS3_CCtrl_Unit1_Energy_current_day_all_conductors_kWh',3,NULL),
	(38,2,'F15_AS3_CCtrl_Unit1_PV_Power',3,NULL),
	(51,3,'F15_AS3_CCtrl_Unit1_P_L1',1,NULL),
	(52,3,'F15_AS3_CCtrl_Unit1_P_L2',1,NULL),
	(53,3,'F15_AS3_CCtrl_Unit1_P_L3',1,NULL),
	(54,3,'F15_AS3_CCtrl_Unit1_Volt_L1_N',1,NULL),
	(55,3,'F15_AS3_CCtrl_Unit1_Volt_L2_N',1,NULL),
	(56,3,'F15_AS3_CCtrl_Unit1_Volt_L3_N',1,NULL),
	(57,3,'F15_AS3_CCtrl_Unit1_HZ',1,NULL),
	(58,3,'F15_AS3_CCtrl_Unit1_Volt_L1_L2',2,NULL),
	(59,3,'F15_AS3_CCtrl_Unit1_Volt_L2_L3',2,NULL),
	(60,3,'F15_AS3_CCtrl_Unit1_Volt_L3_L1',2,NULL),
	(61,3,'F15_AS3_CCtrl_Unit1_LineCurrent_L1',2,NULL),
	(62,3,'F15_AS3_CCtrl_Unit1_LineCurrent_L2',2,NULL),
	(63,3,'F15_AS3_CCtrl_Unit1_LineCurrent_L3',2,NULL),
	(64,3,'F15_AS3_CCtrl_Unit1_Total_AC_energy_all_conductors_Wh',3,NULL),
	(65,3,'F15_AS3_CCtrl_Unit1_Total_AC_energy_all_conductors_kWh',3,NULL),
	(66,3,'F15_AS3_CCtrl_Unit1_Total_AC_energy_all_conductors_MWh',3,NULL),
	(67,3,'F15_AS3_CCtrl_Unit1_Energy_current_day_all_conductors_Wh',3,NULL),
	(68,3,'F15_AS3_CCtrl_Unit1_Energy_current_day_all_conductors_kWh',3,NULL),
	(69,3,'F15_AS3_CCtrl_Unit1_PV_Power',3,NULL),
	(82,4,'F15_AS3_MQ41_I1',1,NULL),
	(83,4,'F15_AS3_MQ41_I2',1,NULL),
	(84,4,'F15_AS3_MQ41_I3',1,NULL),
	(85,4,'F15_AS3_MQ41_U1_U2',1,NULL),
	(86,4,'F15_AS3_MQ41_U2_U3',1,NULL),
	(87,4,'F15_AS3_MQ41_U3_U1',1,NULL),
	(88,4,'F15_AS3_MQ41_P1',2,NULL),
	(89,4,'F15_AS3_MQ41_P2',2,NULL),
	(90,4,'F15_AS3_MQ41_P3',2,NULL),
	(91,4,'F15_AS3_MQ41_PVAR',2,NULL),
	(92,4,'F15_AS3_MQ41_PVA',2,NULL),
	(93,4,'F15_AS3_MQ41_Pfa',2,NULL),
	(94,4,'F15_AS3_MQ41_HZ',3,NULL),
	(95,4,'F15_AS3_MQ41_WHAI',3,NULL),
	(96,4,'F15_AS3_MQ41_WHAE',3,NULL),
	(97,4,'F15_AS3_MQ41_VARHI',3,NULL),
	(98,4,'F15_AS3_MQ41_VARHE',3,NULL),
	(99,4,'F15_AS3_MQ41_WHPAI',3,NULL),
	(100,4,'F15_AS3_MQ41_WHPAE',4,NULL),
	(101,4,'F15_AS3_MQ41_WHAEI1',4,NULL),
	(102,4,'F15_AS3_MQ41_WHAEI2',4,NULL),
	(103,4,'F15_AS3_MQ41_WHAEI3',4,NULL),
	(104,5,'F15_AS3_GW3U_Dn',1,NULL),
	(105,5,'F15_AS3_GW3U_Dm',1,NULL),
	(106,5,'F15_AS3_GW3U_Dx',1,NULL),
	(107,5,'F15_AS3_GW3U_Sn',1,NULL),
	(108,5,'F15_AS3_GW3U_Sm',1,NULL),
	(109,5,'F15_AS3_GW3U_Sx',1,NULL),
	(110,5,'F15_AS3_GW3U_Ta',2,NULL),
	(111,5,'F15_AS3_GW3U_Tp',2,NULL),
	(112,5,'F15_AS3_GW3U_Ua',2,NULL),
	(113,5,'F15_AS3_GW3U_Pa',2,NULL),
	(114,5,'F15_AS3_GW3U_Rc',2,NULL),
	(115,5,'F15_AS3_GW3U_Rd',2,NULL),
	(116,5,'F15_AS3_GW3U_Ri',3,NULL),
	(117,5,'F15_AS3_GW3U_Hc',3,NULL),
	(118,5,'F15_AS3_GW3U_Hd',3,NULL),
	(119,5,'F15_AS3_GW3U_Hi',3,NULL),
	(120,5,'F15_AS3_GW3U_Rp',3,NULL),
	(121,5,'F15_AS3_GW3U_Hp',3,NULL);