<?xml version="1.0" encoding="utf-8"?>
<TcPlcObject Version="1.1.0.1" ProductVersion="3.1.4020.12">
  <POU Name="WXT530_Logg" Id="{1dad376d-83a6-4d8e-bf5e-d81ac5482c60}" SpecialFunc="None">
    <Declaration><![CDATA[PROGRAM WXT530_Logg
VAR
	
	fbLogg1 		:FB_SaveToCSV_WXT530;
	bExecute1		:BOOL:=TRUE;
	tUpdateTime1	:TIME:=T#5S;
	sFileName1		:STRING(255):='WXT5301';
	
	fbLogg2 		:FB_SaveToCSV_WXT530;
	bExecute2		:BOOL:=TRUE;
	tUpdateTime2	:TIME:=T#5S;
	sFileName2		:STRING(255):='WXT5302';
	
	fbLogg3 		:FB_SaveToCSV_WXT530;
	bExecute3		:BOOL:=TRUE;
	tUpdateTime3	:TIME:=T#5S;
	sFileName3		:STRING(255):='WXT5303';
	
END_VAR]]></Declaration>
    <Implementation>
      <ST><![CDATA[fbLogg1(
	bChangeSeparatorToComma:= FALSE, 
	bExecute:= bExecute1, 
	tUpdateTime:= tUpdateTime1, 
	sFileName:= sFileName1, 
	nDayOfWeek:= Main_loggning.fbTime.systemTime.wDayOfWeek,
	sColumn1TimeStamp:= Main_loggning.systemTime, 
	sColumn2:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Dn), 
	sColumn3:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Dm), 
	sColumn4:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Dx), 
	sColumn5:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Sn), 
	sColumn6:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Sm), 
	sColumn7:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Sx));
	
	
fbLogg2(
	bChangeSeparatorToComma:= FALSE, 
	bExecute:= bExecute2, 
	tUpdateTime:= tUpdateTime2, 
	sFileName:= sFileName2, 
	nDayOfWeek:= Main_loggning.fbTime.systemTime.wDayOfWeek,
	sColumn1TimeStamp:= Main_loggning.systemTime, 
	sColumn2:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Ta), 
	sColumn3:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Tp), 
	sColumn4:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Ua), 
	sColumn5:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Pa), 
	sColumn6:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Rc), 
	sColumn7:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Rd));
	
	
	fbLogg3(
	bChangeSeparatorToComma:= FALSE, 
	bExecute:= bExecute3, 
	tUpdateTime:= tUpdateTime3, 
	sFileName:= sFileName3, 
	nDayOfWeek:= Main_loggning.fbTime.systemTime.wDayOfWeek,
	sColumn1TimeStamp:= Main_loggning.systemTime, 
	sColumn2:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Ri), 
	sColumn3:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Hc), 
	sColumn4:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Hd), 
	sColumn5:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Hi), 
	sColumn6:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Rp), 
	sColumn7:= REAL_TO_STRING(GVL_WXT530.F15_AS3_GW3U_Hp));]]></ST>
    </Implementation>
    <LineIds Name="WXT530_Logg">
      <LineId Id="19" Count="25" />
      <LineId Id="61" Count="0" />
      <LineId Id="46" Count="14" />
      <LineId Id="5" Count="0" />
    </LineIds>
  </POU>
</TcPlcObject>