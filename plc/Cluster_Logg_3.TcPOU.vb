<?xml version="1.0" encoding="utf-8"?>
<TcPlcObject Version="1.1.0.1" ProductVersion="3.1.4020.12">
  <POU Name="Cluster_Logg_3" Id="{420234db-e1a5-45cb-84d3-61ec6def0532}" SpecialFunc="None">
    <Declaration><![CDATA[PROGRAM Cluster_Logg_3
VAR
	
fbLogg1 		:FB_SaveToCSV_ClusterCtrl;
	bExecute1		:BOOL:=TRUE;
	tUpdateTime1	:TIME:=T#5S;
	sFileName1		:STRING(255):='Unit3_1';
	
	fbLogg2 		:FB_SaveToCSV_ClusterCtrl;
	bExecute2		:BOOL:=TRUE;
	tUpdateTime2	:TIME:=T#5S;
	sFileName2		:STRING(255):='Unit3_2';
	
	fbLogg3 		:FB_SaveToCSV_ClusterCtrl;
	bExecute3		:BOOL:=TRUE;
	tUpdateTime3	:TIME:=T#5S;
	sFileName3		:STRING(255):='Unit3_3';
	

	sColumn8: STRING;
END_VAR
]]></Declaration>
    <Implementation>
      <ST><![CDATA[fbLogg1(
	bChangeSeparatorToComma:= FALSE, 
	bExecute:= bExecute1, 
	tUpdateTime:= tUpdateTime1, 
	sFileName:= sFileName1, 
	nDayOfWeek:= Main_loggning.fbTime.systemTime.wDayOfWeek,
	sColumn1TimeStamp:= Main_loggning.systemTime, 
	sColumn2:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_P_L1), 
	sColumn3:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_P_L2), 
	sColumn4:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_P_L3), 
	sColumn5:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_Volt_L1_N), 
	sColumn6:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_Volt_L2_N), 
	sColumn7:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_Volt_L3_N),
	sColumn8:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_HZ));
	
	fbLogg2(
	bChangeSeparatorToComma:= FALSE, 
	bExecute:= bExecute2, 
	tUpdateTime:= tUpdateTime2, 
	sFileName:= sFileName2, 
	nDayOfWeek:= Main_loggning.fbTime.systemTime.wDayOfWeek,
	sColumn1TimeStamp:= Main_loggning.systemTime, 
	sColumn2:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_Volt_L1_L2), 
	sColumn3:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_Volt_L2_L3), 
	sColumn4:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_Volt_L3_L1), 
	sColumn5:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_LineCurrent_L1), 
	sColumn6:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_LineCurrent_L2), 
	sColumn7:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_LineCurrent_L3));
	
	fbLogg3(
	bChangeSeparatorToComma:= FALSE, 
	bExecute:= bExecute3, 
	tUpdateTime:= tUpdateTime3, 
	sFileName:= sFileName3, 
	nDayOfWeek:= Main_loggning.fbTime.systemTime.wDayOfWeek,
	sColumn1TimeStamp:= Main_loggning.systemTime, 
	sColumn2:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_Total_AC_energy_all_conductors_Wh), 
	sColumn3:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_Total_AC_energy_all_conductors_kWh), 
	sColumn4:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_Total_AC_energy_all_conductors_MWh), 
	sColumn5:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_Energy_current_day_all_conductors_Wh), 
	sColumn6:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_Energy_current_day_all_conductors_kWh), 
	sColumn7:= REAL_TO_STRING(GVL_ClusterCtrl.F15_AS3_CCtrl_Unit3_PV_Power));

	]]></ST>
    </Implementation>
    <LineIds Name="Cluster_Logg_3">
      <LineId Id="27" Count="12" />
      <LineId Id="42" Count="0" />
      <LineId Id="44" Count="12" />
      <LineId Id="58" Count="13" />
      <LineId Id="57" Count="0" />
      <LineId Id="41" Count="0" />
      <LineId Id="5" Count="0" />
    </LineIds>
  </POU>
</TcPlcObject>