<?xml version="1.0" encoding="utf-8"?>
<TcPlcObject Version="1.1.0.1" ProductVersion="3.1.4020.12">
  <POU Name="iEM3255_Logg" Id="{8ebe9c49-000a-4622-ae26-f44e17849809}" SpecialFunc="None">
    <Declaration><![CDATA[PROGRAM iEM3255_Logg
VAR
	
	fbLogg1 		:FB_SaveToCSV_Schneider;
	bExecute1		:BOOL:=TRUE;
	tUpdateTime1	:TIME:=T#5S;
	sFileName1		:STRING(255):='Schneider1';
	
	fbLogg2 		:FB_SaveToCSV_Schneider;
	bExecute2		:BOOL:=TRUE;
	tUpdateTime2	:TIME:=T#5S;
	sFileName2		:STRING(255):='Schneider2';
	
	fbLogg3 		:FB_SaveToCSV_Schneider;
	bExecute3		:BOOL:=TRUE;
	tUpdateTime3	:TIME:=T#5S;
	sFileName3		:STRING(255):='Schneider3';
	
	fbLogg4 		:FB_SaveToCSV_Schneider;
	bExecute4		:BOOL:=TRUE;
	tUpdateTime4	:TIME:=T#5S;
	sFileName4		:STRING(255):='Schneider4';

	
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
	sColumn2:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_I1), ' Fastighet 15 _ Husnamn _ MQ41 (schneider) _ Ström 
	sColumn3:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_I2), 
	sColumn4:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_I3), 
	sColumn5:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_U1_U2), 
	sColumn6:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_U2_U3), 
	sColumn7:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_U3_U1));
	
	
fbLogg2(
	bChangeSeparatorToComma:= FALSE, 
	bExecute:= bExecute2, 
	tUpdateTime:= tUpdateTime2, 
	sFileName:= sFileName2, 
	nDayOfWeek:= Main_loggning.fbTime.systemTime.wDayOfWeek,
	sColumn1TimeStamp:= Main_loggning.systemTime, 
	sColumn2:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_P1), 
	sColumn3:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_P2), 
	sColumn4:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_P3), 
	sColumn5:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_PVAR), 
	sColumn6:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_PVA), 
	sColumn7:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_Pfa));
	
	
	fbLogg3(
	bChangeSeparatorToComma:= FALSE, 
	bExecute:= bExecute3, 
	tUpdateTime:= tUpdateTime3, 
	sFileName:= sFileName3, 
	nDayOfWeek:= Main_loggning.fbTime.systemTime.wDayOfWeek,
	sColumn1TimeStamp:= Main_loggning.systemTime, 
	sColumn2:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_HZ), 
	sColumn3:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_WHAI), 
	sColumn4:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_WHAE), 
	sColumn5:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_VARHI), 
	sColumn6:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_VARHE), 
	sColumn7:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_WHPAI));
	
	fbLogg4(
	bChangeSeparatorToComma:= FALSE, 
	bExecute:= bExecute4, 
	tUpdateTime:= tUpdateTime4, 
	sFileName:= sFileName4, 
	nDayOfWeek:= Main_loggning.fbTime.systemTime.wDayOfWeek,
	sColumn1TimeStamp:= Main_loggning.systemTime, 
	sColumn2:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_WHPAE), 
	sColumn3:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_WHAEI1), 
	sColumn4:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_WHAEI2), 
	sColumn5:= REAL_TO_STRING(GVL_MQ41.F15_AS3_MQ41_WHAEI3)); 
	]]></ST>
    </Implementation>
    <LineIds Name="iEM3255_Logg">
      <LineId Id="6" Count="10" />
      <LineId Id="28" Count="15" />
      <LineId Id="50" Count="0" />
      <LineId Id="64" Count="0" />
      <LineId Id="51" Count="12" />
      <LineId Id="75" Count="12" />
      <LineId Id="5" Count="0" />
    </LineIds>
  </POU>
</TcPlcObject>